"""
BrightMind - Agent Orchestrator
Coordinates specialized agents for Socratic tutoring and gap analysis.
All old branding references removed.
"""

import json
import logging
import re
from typing import Optional

from app.services.gemma_service import GemmaService
from app.services.rag_service import RAGService

logger = logging.getLogger("brightmind.orchestrator")


class AgentOrchestrator:
    def __init__(self, gemma: GemmaService, rag: RAGService):
        self._gemma = gemma
        self._rag = rag

    # ─── Socratic Tutor Agent ────────────────────────────────────────────────
    async def socratic_response(
        self,
        message: str,
        history: list[dict],
        context: list[str],
        subject: Optional[str] = None,
        student_level: Optional[str] = None,
    ) -> str:
        """
        Generates a Socratic tutoring response.
        Guides the student with questions rather than giving direct answers.
        """
        system_prompt = self._build_socratic_system_prompt(
            subject=subject,
            student_level=student_level,
            context=context,
        )

        # Build message history — do NOT re-wrap already-formatted dicts
        messages = self._prepare_messages(history, message)

        response = await self._gemma.generate(
            system_prompt=system_prompt,
            messages=messages,
            temperature=0.75,
            max_tokens=1024,
        )
        return response

    def _build_socratic_system_prompt(
        self,
        subject: Optional[str],
        student_level: Optional[str],
        context: list[str],
    ) -> str:
        subject_line = f"Subject: {subject}" if subject else "Subject: General"
        level_line = (
            f"Student level: {student_level}" if student_level else "Student level: unknown"
        )

        context_block = ""
        if context:
            excerpts = "\n\n".join(f"— {c[:400]}" for c in context[:3])
            context_block = f"""
─── Knowledge Base Context ───────────────────────────────
{excerpts}
──────────────────────────────────────────────────────────
Use the above context to inform your questions. Do not quote it directly.
"""

        return f"""You are BrightMind's Socratic Tutor — an AI teaching assistant that guides
students to discover answers through thoughtful questioning rather than lecturing.

{subject_line}
{level_line}
{context_block}
## Your Rules
1. NEVER give the direct answer. Always ask a guiding question instead.
2. Ask ONE clear question per response — do not overwhelm the student.
3. Acknowledge what the student got right before probing what they got wrong.
4. If the student is frustrated (says "I don't know", "just tell me"), give a
   small hint and then ask a simpler scaffolding question.
5. Keep responses concise — 2 to 4 sentences maximum.
6. Match vocabulary to the student's level.
7. When the student demonstrates mastery, celebrate it briefly and introduce
   the next concept with a new question.

Begin guiding the student now."""

    # ─── Gap Analyzer Agent ───────────────────────────────────────────────────
    async def analyze_gaps(
        self,
        student_response: str,
        topic: str,
        expected_concepts: list[str],
        context: list[str],
        history: list[dict],
    ) -> dict:
        """
        Identifies prerequisite knowledge gaps in the student's response.
        Returns structured JSON: {gaps, recommendations, follow_up_question}.
        """
        system_prompt = self._build_gap_analyzer_system_prompt(
            topic=topic,
            expected_concepts=expected_concepts,
            context=context,
        )

        prompt = f"""Analyze this student response for knowledge gaps.

Topic: {topic}
Student response: "{student_response}"

Return ONLY valid JSON — no markdown, no explanation, no preamble:
{{
  "gaps": ["gap 1", "gap 2"],
  "recommendations": ["recommendation 1", "recommendation 2"],
  "follow_up_question": "A single Socratic question to help the student"
}}"""

        raw = await self._gemma.complete(
            prompt=prompt,
            system_prompt=system_prompt,
            temperature=0.3,
            max_tokens=768,
        )

        return self._parse_json_response(raw, fallback={
            "gaps": ["Unable to identify gaps — please try again."],
            "recommendations": ["Review the fundamentals of " + topic],
            "follow_up_question": f"What do you already know about {topic}?",
        })

    def _build_gap_analyzer_system_prompt(
        self,
        topic: str,
        expected_concepts: list[str],
        context: list[str],
    ) -> str:
        concepts_line = (
            "Expected concepts: " + ", ".join(expected_concepts)
            if expected_concepts
            else ""
        )

        context_block = ""
        if context:
            excerpts = "\n".join(f"- {c[:300]}" for c in context[:3])
            context_block = f"\nCurriculum context:\n{excerpts}\n"

        return f"""You are BrightMind's Knowledge Gap Analyzer.
Your job is to identify MISSING prerequisite concepts in a student's response.

Topic: {topic}
{concepts_line}
{context_block}
## Guidelines
- Focus on FOUNDATIONAL gaps — what prerequisite knowledge is missing?
- Be specific: name the exact concept missing, not vague descriptions.
- Recommendations should be actionable (e.g. "Review the definition of X").
- The follow-up question must be Socratic — guide, not tell.
- Return ONLY valid JSON. No markdown fences, no extra text."""

    # ─── Concept Linker Agent ────────────────────────────────────────────────
    async def link_concepts(
        self,
        concept_a: str,
        concept_b: str,
        context: list[str],
    ) -> str:
        """
        Explains how two concepts are related using Socratic dialogue.
        """
        context_text = "\n".join(context[:2]) if context else ""
        prompt = f"""A student is trying to understand how "{concept_a}" connects to "{concept_b}".
        
Context from curriculum:
{context_text}

Explain the connection using the Socratic method — use an analogy or example,
then end with a question that helps the student verify their understanding."""

        return await self._gemma.complete(
            prompt=prompt,
            system_prompt=(
                "You are BrightMind's Concept Linker. "
                "You help students see connections between ideas using Socratic questions."
            ),
            temperature=0.7,
        )

    # ─── Helpers ─────────────────────────────────────────────────────────────
    @staticmethod
    def _prepare_messages(history: list[dict], new_message: str) -> list[dict]:
        """
        Converts history to clean message dicts and appends the new user message.
        Filters out any malformed entries to prevent double-wrapping.
        """
        messages = []
        for msg in history:
            if (
                isinstance(msg, dict)
                and msg.get("role") in ("user", "assistant")
                and isinstance(msg.get("content"), str)
                and msg["content"].strip()
            ):
                messages.append({
                    "role": msg["role"],
                    "content": msg["content"].strip(),
                })
        messages.append({"role": "user", "content": new_message.strip()})
        return messages

    @staticmethod
    def _parse_json_response(raw: str, fallback: dict) -> dict:
        """
        Robustly extracts JSON from a model response.
        Handles markdown code fences and minor formatting issues.
        """
        # Strip markdown code fences
        cleaned = re.sub(r"```(?:json)?", "", raw).strip().rstrip("`").strip()

        # Find the first {...} block
        match = re.search(r"\{.*\}", cleaned, re.DOTALL)
        if match:
            try:
                return json.loads(match.group())
            except json.JSONDecodeError:
                pass

        # Try parsing the whole cleaned string
        try:
            return json.loads(cleaned)
        except json.JSONDecodeError:
            logger.warning(f"Could not parse JSON from model response: {raw[:200]}")
            return fallback
