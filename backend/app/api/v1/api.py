"""API router"""
from fastapi import APIRouter

api_router = APIRouter()

@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "message": "MediGuide AI API is running",
        "gemma4": "Ready to connect"
    }

@api_router.get("/test")
async def test():
    """Test endpoint"""
    return {
        "message": "API is working!",
        "features": [
            "Chat with Gemma 4",
            "Symptom Analysis",
            "Drug Interactions",
            "Medical Knowledge Base"
        ]
    }
