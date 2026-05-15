"""
Student Analytics Service

Real-time learning analytics for teacher dashboards.
Tracks mastery progression, session engagement, and predictive at-risk alerts.
"""

import logging
from datetime import datetime

logger = logging.getLogger(__name__)


class AnalyticsService:
    """Generates learning analytics for teacher dashboard."""

    def get_class_overview(self, students: list[dict]) -> dict:
        if not students:
            return {"total": 0, "avg_mastery": 0, "at_risk": 0}

        scores = [s.get("mastery_score", 0) for s in students]
        return {
            "total_students": len(students),
            "avg_mastery": round(sum(scores) / len(scores), 1),
            "at_risk_count": len([s for s in scores if s < 50]),
            "excelling_count": len([s for s in scores if s >= 85]),
            "needs_attention": [s for s in students if s.get("mastery_score", 0) < 50],
        }

    def get_subject_breakdown(self, assessments: list[dict]) -> dict:
        subjects = {}
        for a in assessments:
            subj = a.get("subject", "unknown")
            if subj not in subjects:
                subjects[subj] = {"scores": [], "sessions": 0}
            subjects[subj]["scores"].append(a.get("mastery_score", 0))
            subjects[subj]["sessions"] += 1

        result = {}
        for subj, data in subjects.items():
            result[subj] = {
                "avg_score": round(sum(data["scores"]) / len(data["scores"]), 1),
                "total_sessions": data["sessions"],
                "weakest_area": subj if sum(data["scores"]) / len(data["scores"]) < 60 else None,
            }
        return result

    def predict_at_risk(self, student_history: list[dict]) -> dict:
        """Simple trend analysis to predict at-risk students."""
        if len(student_history) < 2:
            return {"risk_level": "unknown", "trend": "insufficient_data"}

        recent = student_history[-3:]
        scores = [h.get("mastery_score", 0) for h in recent]

        if all(scores[i] > scores[i+1] for i in range(len(scores)-1)):
            return {"risk_level": "high", "trend": "declining", "recommendation": "Immediate intervention needed"}
        elif scores[-1] < 40:
            return {"risk_level": "high", "trend": "low_performance", "recommendation": "Schedule 1-on-1 session"}
        elif scores[-1] < 60:
            return {"risk_level": "medium", "trend": "below_average", "recommendation": "Assign remedial modules"}
        else:
            return {"risk_level": "low", "trend": "stable_or_improving", "recommendation": "Continue current path"}
