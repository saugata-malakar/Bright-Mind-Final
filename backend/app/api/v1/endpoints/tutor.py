from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class TutorRequest(BaseModel):
    message: str
    student_id: Optional[int] = None
    context: str = ""


class TutorResponse(BaseModel):
    response: str
    agent_used: str
    bloom_level: str
    detected_emotion: str


@router.post("/chat", response_model=TutorResponse)
async def chat(request_body: TutorRequest, request: Request):
    """
    Intelligent tutoring endpoint.
    Full pipeline: Emotion Detection → Bloom Classification → Agent Orchestrator → Gemma 4

    This single endpoint chains together 3 AI services before sending to Gemma 4,
    creating a deeply personalized response for every student interaction.
    """
    try:
        svc = request.app.state.services

        orchestrator = svc["orchestrator"]
        bloom = svc["bloom"]
        emotion = svc["emotion"]

        # Step 1: Detect student emotional state
        detected_emotion = emotion.detect(request_body.message)
        tone_modifier = emotion.get_tone_modifier(request_body.message)

        # Step 2: Classify Bloom's Taxonomy cognitive level
        bloom_modifier = bloom.adapt_for_student(
            request_body.student_id or 0, request_body.message
        )
        bloom_level = bloom.classify(request_body.message)

        # Step 3: Build enriched context with all intelligence layers
        enriched_context = (
            f"{request_body.context}\n\n"
            f"[EMOTIONAL_ADAPTATION]: {tone_modifier}\n"
            f"[BLOOM_LEVEL_ADAPTATION]: {bloom_modifier}"
        )

        # Step 4: Route to the correct specialized agent and generate via Gemma 4
        result = await orchestrator.process(request_body.message, enriched_context)

        return TutorResponse(
            response=result["response"],
            agent_used=result["agent"],
            bloom_level=bloom_level.name,
            detected_emotion=detected_emotion,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
