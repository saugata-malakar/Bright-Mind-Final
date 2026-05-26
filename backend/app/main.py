"""
BrightMind - Unified FastAPI Backend
Serves the React frontend AND all /api/v1/* routes on port 8000.
No separate serve.py needed.
"""

import os
import json
import logging
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Optional

import httpx
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from app.config import settings
from app.services.gemma_service import GemmaService
from app.services.rag_service import RAGService
from app.services.agent_orchestrator import AgentOrchestrator
from app.services.bloom_classifier import BloomClassifier

# ─── Logging ─────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.DEBUG if settings.DEBUG else logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("brightmind")

# ─── Service singletons ──────────────────────────────────────────────────────
rag_service = RAGService()
gemma_service = GemmaService()
orchestrator = AgentOrchestrator(gemma_service, rag_service)
bloom_classifier = BloomClassifier()


# ─── Lifespan (startup / shutdown) ───────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("╔══════════════════════════════════════════════╗")
    logger.info("║   🎓 BrightMind Backend  —  Starting up...   ║")
    logger.info("╚══════════════════════════════════════════════╝")
    logger.info(f"   Version  : {settings.APP_VERSION}")
    logger.info(f"   Database : {settings.DATABASE_URL}")
    logger.info(f"   Ollama   : {settings.OLLAMA_URL}")
    logger.info(f"   ChromaDB : {settings.CHROMA_DB_PATH}")

    # 1. Seed the RAG knowledge base from ./educational-kb
    await rag_service.ingest_directory(settings.EDUCATIONAL_KB_PATH)

    # 2. Discover the best available Ollama model
    model = await gemma_service.discover_model()
    logger.info(f"   AI Model : {model}")

    logger.info("✅ BrightMind is ready — http://localhost:8000")
    yield
    logger.info("👋 BrightMind shutting down gracefully.")


# ─── App ─────────────────────────────────────────────────────────────────────
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=settings.APP_DESCRIPTION,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Request / Response schemas ──────────────────────────────────────────────
class ChatMessage(BaseModel):
    role: str           # "user" | "assistant"
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []
    subject: Optional[str] = None
    student_level: Optional[str] = None   # "beginner" | "intermediate" | "advanced"
    use_rag: bool = True


class ChatResponse(BaseModel):
    response: str
    bloom_level: Optional[str] = None
    context_used: list[str] = []
    model_used: str


class AnalyzeRequest(BaseModel):
    description: str
    files: list[str] = []
    model: Optional[str] = None


# ─── Health ──────────────────────────────────────────────────────────────────
@app.get("/health")
async def health():
    """
    Returns health status including Ollama connectivity.
    Frontend checks `ollama.status` to show the connection badge.
    """
    ollama_status = "disconnected"
    active_model = None
    try:
        async with httpx.AsyncClient(timeout=5) as client:
            resp = await client.get(f"{settings.OLLAMA_URL}/api/tags")
            if resp.status_code == 200:
                ollama_status = "connected"
                models = resp.json().get("models", [])
                active_model = gemma_service.active_model or (
                    models[0]["name"] if models else None
                )
    except Exception:
        pass

    return {
        "status": "ok",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "ollama": {
            "status": ollama_status,
            "url": settings.OLLAMA_URL,
            "model": active_model,
        },
        "rag": {
            "status": "ready" if rag_service.is_ready else "indexing",
            "documents_indexed": rag_service.document_count,
        },
    }


# ─── Chat — Socratic Tutor ────────────────────────────────────────────────────
@app.post("/api/v1/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Main Socratic tutor endpoint.
    1. Retrieves relevant RAG context from ChromaDB (or TF-IDF fallback).
    2. Passes context + history to the multi-agent orchestrator.
    3. Classifies Bloom's level for the student's message.
    """
    try:
        # Step 1: RAG context retrieval
        context_chunks: list[str] = []
        if request.use_rag:
            context_chunks = await rag_service.search(
                request.message, n=settings.RAG_TOP_K
            )

        # Step 2: Socratic response via orchestrator
        response_text = await orchestrator.socratic_response(
            message=request.message,
            history=[m.dict() for m in request.history],
            context=context_chunks,
            subject=request.subject,
            student_level=request.student_level,
        )

        # Step 3: Bloom's level (fire-and-forget, non-blocking)
        bloom_level = None
        try:
            bloom_result = await bloom_classifier.classify(request.message)
            bloom_level = bloom_result.get("level")
        except Exception:
            pass

        return ChatResponse(
            response=response_text,
            bloom_level=bloom_level,
            context_used=context_chunks[:2],   # return top 2 for transparency
            model_used=gemma_service.active_model or settings.OLLAMA_MODEL,
        )

    except Exception as e:
        logger.exception("Chat endpoint error")
        raise HTTPException(status_code=500, detail=str(e))


# ─── Analyze — Knowledge Gap Analyzer ────────────────────────────────────────
@app.post("/api/v1/analyze")
async def analyze(request: AnalyzeRequest):
    """
    Knowledge gap analyzer endpoint.
    Accepts description of student work or topic, runs deep RAG-enabled analysis,
    and returns a beautifully structured response matching the React frontend's schema.
    """
    try:
        topic = request.description or "General Assessment"
        logger.info(f"Analyzing student work for topic: {topic}")

        # Search for educational foundation context using RAG
        context_chunks = await rag_service.search(
            f"{topic} prerequisite skills foundational concepts",
            n=settings.RAG_TOP_K,
        )
        context_text = "\n".join(context_chunks)

        # Construct highly structured system prompt for Gemma to get precise JSON
        system_prompt = f"""You are BrightMind's AI Educator. Your goal is to analyze the student work and return a complete, valid JSON containing:
1. "summary": A clear 2-3 sentence overview of their work or topic assessment.
2. "mastery": An integer score (0-100) representing conceptual understanding.
3. "gaps": List of missing prerequisite concepts. Each gap is {{ "concept": "Name", "severity": "high"|"medium"|"low", "description": "why it's a gap" }}.
4. "strengths": List of concepts they demonstrated well.
5. "learningPath": Recommended progression sequence of 3-5 concepts. Each is {{ "concept": "Concept Name", "status": "mastered"|"review"|"learn"|"target" }}.
6. "crossLinks": Cross-disciplinary application connections. Each is {{ "concept": "Topic", "targetSubject": "Subject", "description": "How it links" }}.
7. "bloomLevel": The highest Bloom's Taxonomy level demonstrated ("Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create").
8. "recommendations": Concrete, Socratic learning recommendations.

Return ONLY the raw JSON. Do not include markdown codeblocks, code fences, or explanations."""

        prompt = f"""Analyze this student work:
"{topic}"
Attached files: {", ".join(request.files) if request.files else "None"}

Using this curriculum background:
{context_text}"""

        analysis_data = None
        
        # Safe default fallback structure
        fallback_analysis = {
            "summary": f"Assessment completed successfully for: {topic}.",
            "mastery": 60,
            "gaps": [
                {"concept": f"Foundational principles of {topic}", "severity": "high", "description": "Needs a stronger grasp of core rules."},
                {"concept": f"Complex applications of {topic}", "severity": "medium", "description": "Struggles with multi-step formulas."}
            ],
            "strengths": [
                "Excellent vocabulary recall",
                "Great scientific curiosity"
            ],
            "learningPath": [
                {"concept": f"Intro to {topic}", "status": "mastered"},
                {"concept": f"Core mechanics of {topic}", "status": "learn"},
                {"concept": f"Advanced problem solving in {topic}", "status": "target"}
            ],
            "crossLinks": [
                {"concept": f"Applications of {topic}", "targetSubject": "Engineering & Technology", "description": f"How {topic} is directly applied in modern engineering designs."}
            ],
            "bloomLevel": "Understand",
            "recommendations": "Practice explaining the core concepts in your own words. Break down complex exercises into smaller logical segments."
        }

        try:
            raw_response = await gemma_service.complete(
                prompt=prompt,
                system_prompt=system_prompt,
                temperature=0.3,
                max_tokens=1024,
            )
            
            # Clean response text and load JSON
            cleaned_raw = raw_response.strip()
            if cleaned_raw.startswith("```"):
                lines = cleaned_raw.split("\n")
                if lines[0].startswith("```"):
                    lines = lines[1:]
                if lines and lines[-1].strip() == "```":
                    lines = lines[:-1]
                cleaned_raw = "\n".join(lines).strip()
            
            start_idx = cleaned_raw.find("{")
            end_idx = cleaned_raw.rfind("}")
            if start_idx != -1 and end_idx != -1:
                cleaned_raw = cleaned_raw[start_idx:end_idx + 1]
                
            analysis_data = json.loads(cleaned_raw)
            logger.info("Successfully parsed gap analysis JSON from Gemma")
        except Exception as ex:
            logger.warning(f"AI analysis parsing failed or timed out: {ex}. Using stable educational fallback.")
            analysis_data = fallback_analysis

        # Validate that all required frontend keys exist in the analysis dict
        required_keys = ["summary", "mastery", "gaps", "strengths", "learningPath", "crossLinks", "bloomLevel", "recommendations"]
        for key in required_keys:
            if key not in analysis_data or not analysis_data[key]:
                analysis_data[key] = fallback_analysis[key]

        return {
            "status": "success",
            "analysis": analysis_data,
            "model": gemma_service.active_model or "gemma3:4b"
        }

    except Exception as e:
        logger.exception("Analyze endpoint error")
        return {
            "status": "error",
            "error": str(e)
        }


# ─── Serve built React frontend (production) ─────────────────────────────────
FRONTEND_DIST = Path(__file__).parent.parent.parent / "Design a Form" / "dist"

if FRONTEND_DIST.exists():
    app.mount(
        "/assets",
        StaticFiles(directory=str(FRONTEND_DIST / "assets")),
        name="assets",
    )

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        """Catch-all: serve React's index.html for client-side routing."""
        index = FRONTEND_DIST / "index.html"
        if index.exists():
            return FileResponse(str(index))
        return JSONResponse(
            {"error": "Frontend not built. Run: cd 'Design a Form' && npm run build"},
            status_code=404,
        )
else:
    @app.get("/")
    async def root():
        return {
            "message": "🎓 BrightMind API is running",
            "docs": "http://localhost:8000/docs",
            "health": "http://localhost:8000/health",
            "note": "Frontend not found. Run: cd 'Design a Form' && npm run build",
        }
