"""
Application Configuration
Loads settings from environment variables
"""

from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    """Application settings"""
    
    # Application
    APP_NAME: str = "CogniCore"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    SECRET_KEY: str = "your-secret-key-change-in-production"
    
    # Database
    DATABASE_URL: str = "postgresql://cognicore:cognicore123@localhost:5432/cognicore"
    DB_POOL_SIZE: int = 20
    DB_MAX_OVERFLOW: int = 0
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    REDIS_MAX_CONNECTIONS: int = 50
    
    # Ollama / Gemma 4
    OLLAMA_URL: str = "http://localhost:11434"
    GEMMA_MODEL: str = "gemma4:9b"
    GEMMA_TEMPERATURE: float = 0.7
    GEMMA_MAX_TOKENS: int = 2048
    
    # ChromaDB
    CHROMA_URL: str = "http://localhost:8001"
    CHROMA_COLLECTION: str = "educational_knowledge"
    
    # Authentication
    JWT_SECRET_KEY: str = "your-jwt-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    RATE_LIMIT_PER_HOUR: int = 1000
    
    # File Upload
    MAX_UPLOAD_SIZE: int = 10485760  # 10MB
    ALLOWED_EXTENSIONS: List[str] = ["jpg", "jpeg", "png", "pdf", "docx"]
    
    # Logging
    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "json"
    
    # Monitoring
    SENTRY_DSN: str = ""
    PROMETHEUS_ENABLED: bool = True
    
    # Educational Knowledge Base
    EDUCATIONAL_KB_PATH: str = "./educational-kb"
    AUTO_SYNC_KB: bool = True
    
    # Feature Flags
    ENABLE_IMAGE_ANALYSIS: bool = True
    ENABLE_VOICE_INPUT: bool = False
    ENABLE_PARENT_PORTAL: bool = False
    ENABLE_ANALYTICS: bool = True
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Create settings instance
settings = Settings()
