from fastapi import APIRouter, Request

router = APIRouter()


@router.get("/class-overview")
async def class_overview(request: Request):
    """Get class-wide learning analytics for the teacher dashboard."""
    analytics = request.app.state.services["analytics"]

    # Simulated student data for hackathon demo
    students = [
        {"name": "Timmy", "mastery_score": 35},
        {"name": "Sarah", "mastery_score": 88},
        {"name": "John", "mastery_score": 52},
        {"name": "Emily", "mastery_score": 91},
        {"name": "Carlos", "mastery_score": 44},
    ]
    return analytics.get_class_overview(students)


@router.get("/at-risk/{student_id}")
async def at_risk_prediction(student_id: int, request: Request):
    """Predict if a student is at risk of falling behind using trend analysis."""
    analytics = request.app.state.services["analytics"]

    # Simulated declining performance history
    history = [
        {"mastery_score": 65},
        {"mastery_score": 55},
        {"mastery_score": 42},
    ]
    return analytics.predict_at_risk(history)


@router.get("/subject-breakdown")
async def subject_breakdown(request: Request):
    """Get per-subject analytics breakdown."""
    analytics = request.app.state.services["analytics"]

    assessments = [
        {"subject": "math", "mastery_score": 45},
        {"subject": "math", "mastery_score": 62},
        {"subject": "science", "mastery_score": 78},
        {"subject": "science", "mastery_score": 82},
        {"subject": "humanities", "mastery_score": 55},
    ]
    return analytics.get_subject_breakdown(assessments)
