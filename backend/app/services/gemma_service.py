"""
BrightMind - Gemma Service
Handles all communication with the local Ollama instance.
Features:
  - Dynamic model discovery with graceful fallback chain
  - No prompt double-wrapping
  - Streaming + non-streaming support
  - Timeout resilience
"""

import json
import logging
from typing import AsyncIterator, Optional

import httpx

from app.config import settings

logger = logging.getLogger("brightmind.gemma")


class GemmaService:
    def __init__(self):
        self.active_model: Optional[str] = None
        self._client = httpx.AsyncClient(
            base_url=settings.OLLAMA_URL,
            timeout=settings.OLLAMA_TIMEOUT,
        )
        self.use_cloud_fallback = False
        self._openai_client = None
        if settings.OPENAI_API_KEY:
            try:
                from openai import AsyncOpenAI
                self._openai_client = AsyncOpenAI(
                    api_key=settings.OPENAI_API_KEY,
                    base_url=settings.OPENAI_API_BASE or "https://api.openai.com/v1",
                )
                logger.info("☁️ Cloud LLM client initialized as potential fallback")
            except Exception as e:
                logger.error(f"Failed to initialize Cloud LLM client: {e}")

    # ─── Model Discovery ─────────────────────────────────────────────────────
    async def discover_model(self) -> str:
        """
        Queries Ollama for locally available models.
        Tries each model in OLLAMA_FALLBACK_MODELS until one is found.
        If Ollama is unreachable, falls back to OpenAI if key is present.
        """
        try:
            resp = await self._client.get("/api/tags")
            resp.raise_for_status()
            available_names = {
                m["name"] for m in resp.json().get("models", [])
            }
            logger.info(f"Ollama has {len(available_names)} model(s) available")

            for candidate in settings.OLLAMA_FALLBACK_MODELS:
                matched = next(
                    (n for n in available_names if n.startswith(candidate.split(":")[0])),
                    None,
                )
                if matched:
                    self.active_model = matched
                    self.use_cloud_fallback = False
                    logger.info(f"✅ Using local Ollama model: {self.active_model}")
                    return self.active_model

            self.active_model = settings.OLLAMA_MODEL
            self.use_cloud_fallback = False
            logger.warning(
                f"⚠️  No preferred model found. Defaulting to local Ollama {self.active_model}"
            )
        except Exception as e:
            if settings.OPENAI_API_KEY:
                self.active_model = settings.OPENAI_MODEL
                self.use_cloud_fallback = True
                logger.info(f"☁️ Ollama unreachable. Falling back to Cloud Provider: {self.active_model}")
            else:
                self.active_model = settings.OLLAMA_MODEL
                self.use_cloud_fallback = False
                logger.warning(f"⚠️  Ollama unreachable and no cloud fallback configured: {e}")

        return self.active_model

    # ─── Core Generate (non-streaming) ───────────────────────────────────────
    async def generate(
        self,
        system_prompt: str,
        messages: list[dict],
        temperature: float = 0.7,
        max_tokens: int = 1024,
    ) -> str:
        """
        Sends a chat completion request to Ollama, or falls back to Cloud LLM.
        """
        if not self.active_model:
            await self.discover_model()

        # Validate messages — skip anything malformed
        clean_messages = []
        for msg in messages:
            if (
                isinstance(msg, dict)
                and msg.get("role") in ("user", "assistant")
                and isinstance(msg.get("content"), str)
                and msg["content"].strip()
            ):
                clean_messages.append(
                    {"role": msg["role"], "content": msg["content"].strip()}
                )
            else:
                logger.debug(f"Skipping malformed message: {msg}")

        if not clean_messages:
            return "I'm ready to help! What would you like to explore today?"

        if self.use_cloud_fallback and self._openai_client:
            try:
                openai_messages = [{"role": "system", "content": system_prompt}] + clean_messages
                chat_completion = await self._openai_client.chat.completions.create(
                    model=self.active_model,
                    messages=openai_messages,
                    temperature=temperature,
                    max_tokens=max_tokens,
                )
                return chat_completion.choices[0].message.content.strip()
            except Exception as e:
                logger.exception("Error calling Cloud LLM provider")
                return f"An error occurred while generating a response from Cloud: {e}"

        payload = {
            "model": self.active_model,
            "system": system_prompt,
            "messages": clean_messages,
            "stream": False,
            "options": {
                "temperature": temperature,
                "num_predict": max_tokens,
                "top_p": 0.9,
            },
        }

        try:
            resp = await self._client.post("/api/chat", json=payload)
            resp.raise_for_status()
            data = resp.json()
            return data.get("message", {}).get("content", "").strip()

        except httpx.TimeoutException:
            logger.error("Ollama request timed out")
            return (
                "I'm taking a moment to think... Please try again. "
                "(Tip: ensure Ollama is running with `ollama serve`)"
            )
        except httpx.HTTPStatusError as e:
            logger.error(f"Ollama HTTP error {e.response.status_code}: {e.response.text}")
            if e.response.status_code == 404:
                return (
                    f"Model '{self.active_model}' not found. "
                    f"Run: ollama pull {self.active_model}"
                )
            raise
        except Exception as e:
            logger.exception("Unexpected error calling Ollama")
            return f"An error occurred while generating a response: {e}"

    # ─── Streaming Generate ───────────────────────────────────────────────────
    async def generate_stream(
        self,
        system_prompt: str,
        messages: list[dict],
        temperature: float = 0.7,
    ) -> AsyncIterator[str]:
        """
        Streams tokens from Ollama or Cloud LLM as they are generated.
        """
        if not self.active_model:
            await self.discover_model()

        clean_messages = [
            {"role": m["role"], "content": m["content"].strip()}
            for m in messages
            if isinstance(m, dict)
            and m.get("role") in ("user", "assistant")
            and m.get("content", "").strip()
        ]

        if self.use_cloud_fallback and self._openai_client:
            try:
                openai_messages = [{"role": "system", "content": system_prompt}] + clean_messages
                response = await self._openai_client.chat.completions.create(
                    model=self.active_model,
                    messages=openai_messages,
                    temperature=temperature,
                    stream=True,
                )
                async for chunk in response:
                    if chunk.choices and chunk.choices[0].delta.content:
                        yield chunk.choices[0].delta.content
                return
            except Exception as e:
                logger.exception("Cloud streaming error")
                yield f"\n[Cloud stream error: {e}]"
                return

        payload = {
            "model": self.active_model,
            "system": system_prompt,
            "messages": clean_messages,
            "stream": True,
            "options": {"temperature": temperature},
        }

        try:
            async with self._client.stream(
                "POST", "/api/chat", json=payload
            ) as response:
                async for line in response.aiter_lines():
                    if not line.strip():
                        continue
                    try:
                        chunk = json.loads(line)
                        token = chunk.get("message", {}).get("content", "")
                        if token:
                            yield token
                        if chunk.get("done"):
                            break
                    except json.JSONDecodeError:
                        continue
        except Exception as e:
            logger.exception("Streaming error")
            yield f"\n[Stream error: {e}]"

    # ─── Quick Completion (single-turn, no history) ───────────────────────────
    async def complete(
        self,
        prompt: str,
        system_prompt: str = "You are a helpful assistant.",
        temperature: float = 0.3,
        max_tokens: int = 512,
    ) -> str:
        """
        Convenience wrapper for single-turn, no-history completions.
        """
        return await self.generate(
            system_prompt=system_prompt,
            messages=[{"role": "user", "content": prompt}],
            temperature=temperature,
            max_tokens=max_tokens,
        )

    async def close(self):
        await self._client.aclose()
        if self._openai_client:
            try:
                await self._openai_client.close()
            except Exception:
                pass
