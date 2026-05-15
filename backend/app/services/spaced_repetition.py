"""
Spaced Repetition Engine (SM-2 Algorithm)

Implements the SuperMemo SM-2 spaced repetition algorithm to schedule
optimal review times for each student concept. This ensures students
retain what they learn by reviewing at scientifically-proven intervals.

This is a key offline feature: the schedule is computed locally and
stored in IndexedDB/PostgreSQL, requiring zero internet connectivity.
"""

import logging
from datetime import datetime, timedelta
from dataclasses import dataclass, field

logger = logging.getLogger(__name__)


@dataclass
class ReviewCard:
    """A single concept card in the spaced repetition system."""
    concept: str
    subject: str
    easiness_factor: float = 2.5  # EF starts at 2.5
    interval: int = 1  # Days until next review
    repetitions: int = 0
    next_review: datetime = field(default_factory=datetime.utcnow)
    last_quality: int = 0  # Last quality score (0-5)


class SpacedRepetitionEngine:
    """
    SM-2 Algorithm Implementation.

    Quality scores:
      0 - Complete blackout, no recall
      1 - Incorrect, but recognized the concept
      2 - Incorrect, but close
      3 - Correct with significant difficulty
      4 - Correct with minor hesitation
      5 - Perfect recall
    """

    def __init__(self):
        self.student_decks: dict[int, list[ReviewCard]] = {}

    def add_concept(self, student_id: int, concept: str, subject: str) -> ReviewCard:
        """Add a new concept to a student's review deck."""
        card = ReviewCard(concept=concept, subject=subject)

        if student_id not in self.student_decks:
            self.student_decks[student_id] = []

        # Don't add duplicates
        existing = [c for c in self.student_decks[student_id] if c.concept == concept]
        if existing:
            return existing[0]

        self.student_decks[student_id].append(card)
        logger.info(f"Added concept '{concept}' to student {student_id}'s deck")
        return card

    def review(self, student_id: int, concept: str, quality: int) -> ReviewCard:
        """
        Process a review attempt using the SM-2 algorithm.

        Args:
            student_id: The student's ID
            concept: The concept being reviewed
            quality: Quality of recall (0-5)

        Returns:
            Updated ReviewCard with new schedule
        """
        quality = max(0, min(5, quality))  # Clamp to 0-5

        deck = self.student_decks.get(student_id, [])
        card = next((c for c in deck if c.concept == concept), None)

        if not card:
            card = self.add_concept(student_id, concept, "general")

        card.last_quality = quality

        # SM-2 Algorithm
        if quality >= 3:
            # Correct response
            if card.repetitions == 0:
                card.interval = 1
            elif card.repetitions == 1:
                card.interval = 6
            else:
                card.interval = round(card.interval * card.easiness_factor)

            card.repetitions += 1
        else:
            # Incorrect response - reset
            card.repetitions = 0
            card.interval = 1

        # Update easiness factor
        card.easiness_factor = max(
            1.3,
            card.easiness_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
        )

        # Schedule next review
        card.next_review = datetime.utcnow() + timedelta(days=card.interval)

        logger.info(
            f"Student {student_id} reviewed '{concept}': "
            f"quality={quality}, next_review={card.next_review.date()}, "
            f"interval={card.interval}d, EF={card.easiness_factor:.2f}"
        )

        return card

    def get_due_cards(self, student_id: int) -> list[ReviewCard]:
        """Get all concepts due for review today."""
        now = datetime.utcnow()
        deck = self.student_decks.get(student_id, [])
        due = [card for card in deck if card.next_review <= now]
        return sorted(due, key=lambda c: c.easiness_factor)  # Hardest first

    def get_study_stats(self, student_id: int) -> dict:
        """Get study statistics for a student."""
        deck = self.student_decks.get(student_id, [])
        if not deck:
            return {"total_concepts": 0, "due_today": 0, "mastered": 0, "struggling": 0}

        now = datetime.utcnow()
        return {
            "total_concepts": len(deck),
            "due_today": len([c for c in deck if c.next_review <= now]),
            "mastered": len([c for c in deck if c.repetitions >= 5 and c.easiness_factor >= 2.5]),
            "struggling": len([c for c in deck if c.easiness_factor < 1.8]),
        }
