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
    student_response: str
    topic: str
    expected_concepts: list[str] = []
    history: list[ChatMessage] = []


class AnalyzeResponse(BaseModel):
    gaps: list[str]
    recommendations: list[str]
    bloom_level: str
    follow_up_question: str
    context_used: list[str] = []


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
@app.post("/api/v1/analyze", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest):
    """
    Knowledge gap analyzer endpoint.
    Identifies missing prerequisite concepts and returns Socratic follow-up.
    """
    try:
        # RAG context for the topic
        context_chunks = await rag_service.search(
            f"{request.topic} prerequisites foundational concepts",
            n=settings.RAG_TOP_K,
        )

        # Gap analysis via orchestrator
        analysis = await orchestrator.analyze_gaps(
            student_response=request.student_response,
            topic=request.topic,
            expected_concepts=request.expected_concepts,
            context=context_chunks,
            history=[m.dict() for m in request.history],
        )

        # Bloom's level for the student's response
        bloom_result = await bloom_classifier.classify(request.student_response)

        return AnalyzeResponse(
            gaps=analysis.get("gaps", []),
            recommendations=analysis.get("recommendations", []),
            bloom_level=bloom_result.get("level", "Remember"),
            follow_up_question=analysis.get("follow_up_question", ""),
            context_used=context_chunks[:2],
        )

    except Exception as e:
        logger.exception("Analyze endpoint error")
        raise HTTPException(status_code=500, detail=str(e))


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
