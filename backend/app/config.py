"""
BrightMind - Application Configuration
Offline-first adaptive education platform powered by Gemma 4
"""

import os
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # ─── App Identity ────────────────────────────────────────────────────────
    APP_NAME: str = "BrightMind"
    APP_VERSION: str = "1.0.0"
    APP_DESCRIPTION: str = (
        "Offline-first adaptive education platform powered by Gemma 4"
    )
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"

    # ─── Server ──────────────────────────────────────────────────────────────
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))

    # ─── Database (SQLite by default — zero setup required) ──────────────────
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite+aiosqlite:///./brightmind.db"   # offline-first default
    )
    # Set to True only when migrating to PostgreSQL in production
    USE_POSTGRES: bool = os.getenv("USE_POSTGRES", "false").lower() == "true"

    # ─── Ollama / Gemma 4 ────────────────────────────────────────────────────
    OLLAMA_URL: str = os.getenv("OLLAMA_URL", "http://localhost:11434")
    # Preferred model — runtime auto-discovery will fall back if not available
    OLLAMA_MODEL: str = os.getenv("OLLAMA_MODEL", "gemma4:9b")
    OLLAMA_TIMEOUT: int = int(os.getenv("OLLAMA_TIMEOUT", "60"))

    # Ordered list of fallback models tried if OLLAMA_MODEL is not pulled
    OLLAMA_FALLBACK_MODELS: list[str] = [
        "gemma4:9b",
        "gemma3:4b",
        "gemma2:9b",
        "gemma2:2b",
        "gemma:7b",
        "gemma:2b",
    ]

    # ─── Cloud LLM Fallback (For Render/Production Deployment) ───────────────
    OPENAI_API_KEY: Optional[str] = os.getenv("OPENAI_API_KEY")
    OPENAI_API_BASE: Optional[str] = os.getenv("OPENAI_API_BASE")  # e.g., https://api.groq.com/openai/v1 or OpenRouter
    OPENAI_MODEL: str = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")  # default cloud fallback model

    # ─── ChromaDB RAG ────────────────────────────────────────────────────────
    CHROMA_DB_PATH: str = os.getenv("CHROMA_DB_PATH", "./chroma_db")
    EDUCATIONAL_KB_PATH: str = os.getenv("EDUCATIONAL_KB_PATH", "./educational-kb")
    RAG_CHUNK_SIZE: int = int(os.getenv("RAG_CHUNK_SIZE", "500"))
    RAG_CHUNK_OVERLAP: int = int(os.getenv("RAG_CHUNK_OVERLAP", "50"))
    RAG_TOP_K: int = int(os.getenv("RAG_TOP_K", "5"))

    # Embedding model (sentence-transformers) — falls back to TF-IDF offline
    EMBEDDING_MODEL: str = os.getenv(
        "EMBEDDING_MODEL", "all-MiniLM-L6-v2"
    )

    # ─── JWT Auth ────────────────────────────────────────────────────────────
    JWT_SECRET_KEY: str = os.getenv(
        "JWT_SECRET_KEY", "brightmind-dev-secret-change-in-production"
    )
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = int(os.getenv("JWT_EXPIRE_MINUTES", "1440"))  # 24h

    # ─── CORS ────────────────────────────────────────────────────────────────
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",   # React dev server
        "http://localhost:8000",   # FastAPI (serves built frontend)
        "http://localhost:5173",   # Vite dev server
        "https://bright-mind.onrender.com",
    ]

    # ─── Spaced Repetition ───────────────────────────────────────────────────
    SR_INITIAL_INTERVAL_DAYS: int = 1
    SR_EASY_MULTIPLIER: float = 2.5
    SR_HARD_MULTIPLIER: float = 1.2

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


# Singleton — import this everywhere
settings = Settings()
