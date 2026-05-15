"""
Gemma 4 Service - Core LLM integration via Ollama.
Provides the base generate() method used by all tutor agents.
"""

import httpx
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)

SOCRATIC_SYSTEM_PROMPT = (
    "You are CogniCore, an advanced Socratic AI Tutor. "
    "Your goal is to guide students to discover answers on their own. "
    "NEVER give the direct answer to a math or science problem immediately. "
    "Instead, break the problem down into smaller foundational steps. "
    "Ask guiding questions. Be encouraging, patient, and clear. "
    "If a student struggles, provide a helpful analogy."
)


class GemmaService:
    def __init__(self):
        self.base_url = settings.OLLAMA_URL
        self.model = settings.GEMMA_MODEL
        self.system_prompt = SOCRATIC_SYSTEM_PROMPT

    async def health_check(self) -> bool:
        async with httpx.AsyncClient(timeout=5.0) as client:
            try:
                response = await client.get(f"{self.base_url}/api/tags")
                return response.status_code == 200
            except Exception:
                return False

    async def generate(self, prompt: str, context: str = "") -> dict:
        full_prompt = f"System: {self.system_prompt}\n\nContext: {context}\n\nStudent: {prompt}\n\nTutor:"
        async with httpx.AsyncClient(timeout=60.0) as client:
            try:
                response = await client.post(
                    f"{self.base_url}/api/generate",
                    json={
                        "model": self.model,
                        "prompt": full_prompt,
                        "stream": False,
                    },
                )
                return response.json()
            except Exception as e:
                logger.error(f"Gemma generation failed: {e}")
                return {
                    "response": "I'm having trouble connecting to my AI model. Please try again."
                }
