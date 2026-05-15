from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from typing import List

router = APIRouter()


class AnalyzeRequest(BaseModel):
    student_id: int = 1
    content: str = ""


class Gap(BaseModel):
    concept: str
    severity: str


class AnalyzeResponse(BaseModel):
    mastery_score: float
    gaps: List[Gap]
    strengths: List[str]
    learning_path: list
    cross_links: list


class ReviewRequest(BaseModel):
    student_id: int
    concept: str
    quality: int  # 0-5


class ReviewResponse(BaseModel):
    concept: str
    next_review_days: int
    easiness_factor: float


@router.post("/evaluate", response_model=AnalyzeResponse)
async def evaluate(request_body: AnalyzeRequest, request: Request):
    """
    Full evaluation pipeline:
    1. Gap Analysis (via Gemma 4 in production)
    2. Personalized Learning Path Generation (prerequisite graph)
    3. Cross-Disciplinary Connections
    """
    try:
        svc = request.app.state.services
        path_gen = svc["path_gen"]
        linker = svc["linker"]

        # Simulated gap detection (in production: Gemma 4 multimodal analysis)
        gaps = [
            Gap(concept="Adding fractions with unlike denominators", severity="high"),
            Gap(concept="Simplifying fractions", severity="medium"),
        ]
        strengths = [
            "Identifying numerators and denominators",
            "Basic integer addition",
        ]

        # Generate personalized learning path
        path = path_gen.generate_path(
            target="fractions_unlike",
            mastered=["counting", "addition", "subtraction"],
            subject="math",
        )

        # Find cross-disciplinary connections
        links = linker.find_links("math", "fractions")

        return AnalyzeResponse(
            mastery_score=45.0,
            gaps=gaps,
            strengths=strengths,
            learning_path=path,
            cross_links=links,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/review", response_model=ReviewResponse)
async def review_concept(request_body: ReviewRequest, request: Request):
    """
    Spaced Repetition review endpoint.
    Uses SM-2 algorithm to schedule optimal review intervals.
    """
    try:
        srs = request.app.state.services["srs"]
        card = srs.review(request_body.student_id, request_body.concept, request_body.quality)
        return ReviewResponse(
            concept=card.concept,
            next_review_days=card.interval,
            easiness_factor=round(card.easiness_factor, 2),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/due/{student_id}")
async def get_due_reviews(student_id: int, request: Request):
    """Get concepts due for spaced repetition review today."""
    srs = request.app.state.services["srs"]
    cards = srs.get_due_cards(student_id)
    return {
        "student_id": student_id,
        "due_count": len(cards),
        "concepts": [{"concept": c.concept, "subject": c.subject} for c in cards],
        "stats": srs.get_study_stats(student_id),
    }
