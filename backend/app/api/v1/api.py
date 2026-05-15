from fastapi import APIRouter
from app.api.v1.endpoints import tutor, analyzer, analytics, sync

api_router = APIRouter()

# ── Socratic Tutor (Multi-Agent + Bloom + Emotion) ─────────────────────
api_router.include_router(
    tutor.router,
    prefix="/tutor",
    tags=["Socratic Tutor"],
)

# ── Gap Analyzer (Learning Path + Concept Linker + Spaced Repetition) ──
api_router.include_router(
    analyzer.router,
    prefix="/analyzer",
    tags=["Gap Analyzer"],
)

# ── Teacher Analytics (Class Overview + At-Risk Prediction) ────────────
api_router.include_router(
    analytics.router,
    prefix="/analytics",
    tags=["Teacher Analytics"],
)

# ── Offline Sync (Queue + Process + Status) ────────────────────────────
api_router.include_router(
    sync.router,
    prefix="/sync",
    tags=["Offline Sync"],
)
