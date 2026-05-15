"""
CogniCore - Main Application Entry Point
FastAPI backend for offline educational platform powered by Gemma 4

Integrated Services:
  - Multi-Agent Orchestrator (Math, Science, Humanities, MetaCognitive)
  - Bloom's Taxonomy Adaptive Engine
  - Emotion-Aware Adaptation
  - Spaced Repetition (SM-2 Algorithm)
  - Learning Path Generator (Prerequisite Graph)
  - Cross-Disciplinary Concept Linker
  - Offline Sync Manager
  - Student Analytics & At-Risk Prediction
  - RAG Service (ChromaDB + Educational KB)
"""

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from contextlib import asynccontextmanager
import time
import logging

from app.core.config import settings
from app.core.logging_config import setup_logging
from app.api.v1.api import api_router
from app.db.session import engine
from app.db.init_db import init_db

# Setup logging
setup_logging()
logger = logging.getLogger(__name__)

# ── Global service instances (initialized during lifespan) ──────────────
from app.services.gemma_service import GemmaService
from app.services.rag_service import RAGService
from app.services.agent_orchestrator import AgentOrchestrator
from app.services.bloom_classifier import BloomClassifier
from app.services.emotion_detector import EmotionDetector
from app.services.spaced_repetition import SpacedRepetitionEngine
from app.services.learning_path import LearningPathGenerator
from app.services.concept_linker import ConceptLinker
from app.services.offline_sync import OfflineSyncManager
from app.services.analytics import AnalyticsService

# Service registry — shared across all endpoints
services = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan: initialize all services on startup, teardown on shutdown."""

    logger.info("=" * 60)
    logger.info("  CogniCore — Starting Application")
    logger.info("=" * 60)

    # ── 1. Database ─────────────────────────────────────────────
    try:
        await init_db()
        logger.info("✅ Database initialized (Users, Sessions, Assessments)")
    except Exception as e:
        logger.error(f"❌ Database init failed: {e}")

    # ── 2. Gemma 4 (Ollama) ────────────────────────────────────
    try:
        gemma = GemmaService()
        healthy = await gemma.health_check()
        services["gemma"] = gemma
        if healthy:
            logger.info("✅ Gemma 4 model connected via Ollama")
        else:
            logger.warning("⚠️  Gemma 4 model not responding — offline mode active")
    except Exception as e:
        logger.warning(f"⚠️  Gemma 4 unavailable: {e}")

    # ── 3. RAG / Educational Knowledge Base ────────────────────
    try:
        rag = RAGService()
        await rag.initialize()
        services["rag"] = rag
        logger.info("✅ Educational Knowledge Base (ChromaDB RAG) initialized")
    except Exception as e:
        logger.warning(f"⚠️  RAG service init failed: {e}")

    # ── 4. Multi-Agent Orchestrator ────────────────────────────
    orchestrator = AgentOrchestrator()
    services["orchestrator"] = orchestrator
    logger.info("✅ Multi-Agent Orchestrator loaded (Math, Science, Humanities, MetaCog)")

    # ── 5. Bloom's Taxonomy Classifier ─────────────────────────
    bloom = BloomClassifier()
    services["bloom"] = bloom
    logger.info("✅ Bloom's Taxonomy Adaptive Engine loaded")

    # ── 6. Emotion Detector ────────────────────────────────────
    emotion = EmotionDetector()
    services["emotion"] = emotion
    logger.info("✅ Emotion-Aware Adaptation Engine loaded")

    # ── 7. Spaced Repetition Engine ────────────────────────────
    srs = SpacedRepetitionEngine()
    services["srs"] = srs
    logger.info("✅ Spaced Repetition Engine (SM-2) loaded")

    # ── 8. Learning Path Generator ─────────────────────────────
    path_gen = LearningPathGenerator()
    services["path_gen"] = path_gen
    logger.info("✅ Learning Path Generator (Prerequisite Graph) loaded")

    # ── 9. Cross-Disciplinary Concept Linker ───────────────────
    linker = ConceptLinker()
    services["linker"] = linker
    logger.info("✅ Cross-Disciplinary Concept Linker loaded")

    # ── 10. Offline Sync Manager ───────────────────────────────
    sync_mgr = OfflineSyncManager()
    services["sync"] = sync_mgr
    logger.info("✅ Offline Sync Manager loaded")

    # ── 11. Analytics Service ──────────────────────────────────
    analytics = AnalyticsService()
    services["analytics"] = analytics
    logger.info("✅ Student Analytics & At-Risk Prediction Engine loaded")

    logger.info("=" * 60)
    logger.info("  CogniCore — All 11 services initialized successfully")
    logger.info("  API Docs: http://localhost:8000/docs")
    logger.info("=" * 60)

    # Store services on app state so endpoints can access them
    app.state.services = services

    yield

    # ── Shutdown ───────────────────────────────────────────────
    logger.info("Shutting down CogniCore application...")
    await engine.dispose()
    logger.info("Application shutdown complete")


# ── Create FastAPI application ──────────────────────────────────────────
app = FastAPI(
    title=settings.APP_NAME,
    description=(
        "CogniCore — An offline-first, hyper-adaptive educational platform "
        "powered by Gemma 4. Features multi-agent Socratic tutoring, Bloom's "
        "Taxonomy adaptation, spaced repetition, and predictive at-risk analytics."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
)

# ── Middleware ──────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(GZipMiddleware, minimum_size=1000)


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    """Add processing time to response headers"""
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(round(process_time, 4))
    return response


# ── Exception Handlers ─────────────────────────────────────────────────
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": exc.errors(), "body": exc.body},
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": "Internal server error",
            "message": str(exc) if settings.DEBUG else "An error occurred",
        },
    )


# ── Root Endpoints ─────────────────────────────────────────────────────
@app.get("/", tags=["Root"])
async def root():
    return {
        "app": "CogniCore",
        "tagline": "Offline-first hyper-adaptive education powered by Gemma 4",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "app_name": settings.APP_NAME,
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT,
        "services_loaded": list(services.keys()),
        "services_count": len(services),
    }


# ── Include API Router ─────────────────────────────────────────────────
app.include_router(api_router, prefix="/api/v1")


# ── Direct run ─────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_level="info",
    )
