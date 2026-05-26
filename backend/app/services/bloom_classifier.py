"""
Bloom's Taxonomy Adaptive Engine

Classifies student cognitive level in real-time and adapts question difficulty.
This is a GROUNDBREAKING feature: BrightMind doesn't just tutor — it dynamically
escalates or de-escalates complexity based on WHERE the student is on Bloom's Taxonomy.

Levels (lowest to highest):
  1. Remember   → "What is 2+2?"
  2. Understand  → "Explain why 2+2=4 using objects."
  3. Apply       → "If you have 2 apples and get 2 more, how many?"
  4. Analyze     → "What patterns do you see in addition?"
  5. Evaluate    → "Is there a faster way to add large numbers?"
  6. Create      → "Invent your own math problem using addition."
"""

import logging
from enum import IntEnum

logger = logging.getLogger(__name__)


class BloomLevel(IntEnum):
    REMEMBER = 1
    UNDERSTAND = 2
    APPLY = 3
    ANALYZE = 4
    EVALUATE = 5
    CREATE = 6


# Prompt modifiers injected into the tutor prompt based on detected level
BLOOM_PROMPT_MODIFIERS = {
    BloomLevel.REMEMBER: (
        "The student is at the REMEMBER level. Ask simple recall questions. "
        "Use fill-in-the-blank or yes/no format. Keep vocabulary simple."
    ),
    BloomLevel.UNDERSTAND: (
        "The student is at the UNDERSTAND level. Ask them to explain concepts "
        "in their own words. Use 'Why?' and 'How?' questions."
    ),
    BloomLevel.APPLY: (
        "The student is at the APPLY level. Present real-world scenarios "
        "where they must use the concept. Use word problems."
    ),
    BloomLevel.ANALYZE: (
        "The student is at the ANALYZE level. Ask them to compare, contrast, "
        "and find patterns. Challenge them to break problems into parts."
    ),
    BloomLevel.EVALUATE: (
        "The student is at the EVALUATE level. Ask them to judge, critique, "
        "and defend their reasoning. Present alternative solutions to debate."
    ),
    BloomLevel.CREATE: (
        "The student is at the CREATE level. Challenge them to design, invent, "
        "or compose original work. Ask them to teach the concept to someone else."
    ),
}

# Keywords that suggest student is operating at each level
LEVEL_INDICATORS = {
    BloomLevel.REMEMBER: [
        "what is", "define", "list", "name", "who", "when", "where",
        "tell me", "what are", "i don't know", "i forgot"
    ],
    BloomLevel.UNDERSTAND: [
        "explain", "describe", "why", "how does", "what does it mean",
        "in other words", "so basically", "i think it means"
    ],
    BloomLevel.APPLY: [
        "how do i", "solve", "calculate", "use", "show me how",
        "what if", "example", "try", "practice"
    ],
    BloomLevel.ANALYZE: [
        "compare", "difference", "similar", "pattern", "relationship",
        "because", "the reason", "break down", "parts"
    ],
    BloomLevel.EVALUATE: [
        "better", "best", "agree", "disagree", "opinion", "judge",
        "worth", "effective", "prefer", "critique", "is it correct"
    ],
    BloomLevel.CREATE: [
        "design", "create", "invent", "imagine", "what if we",
        "my idea", "build", "compose", "i made", "original"
    ],
}


class BloomClassifier:
    """Classifies student cognitive level and provides adaptive prompt modifiers."""

    def __init__(self):
        self.student_levels: dict[int, BloomLevel] = {}  # student_id -> current level

    def classify(self, message: str) -> BloomLevel:
        """Classify the cognitive level of a student message."""
        message_lower = message.lower()
        scores = {}

        for level, indicators in LEVEL_INDICATORS.items():
            score = sum(1 for ind in indicators if ind in message_lower)
            scores[level] = score

        best_level = max(scores, key=scores.get)

        if scores[best_level] == 0:
            return BloomLevel.UNDERSTAND  # Safe default

        logger.info(f"Bloom classification: {best_level.name} (score: {scores[best_level]})")
        return best_level

    def get_prompt_modifier(self, message: str) -> str:
        """Get the prompt modifier for the detected cognitive level."""
        level = self.classify(message)
        return BLOOM_PROMPT_MODIFIERS[level]

    def adapt_for_student(self, student_id: int, message: str) -> str:
        """Track and adapt difficulty for a specific student over time."""
        current = self.classify(message)
        previous = self.student_levels.get(student_id, BloomLevel.REMEMBER)

        # If student shows higher level thinking, gradually escalate
        if current > previous:
            self.student_levels[student_id] = current
            logger.info(f"Student {student_id} escalated: {previous.name} → {current.name}")
        else:
            self.student_levels[student_id] = current

        return BLOOM_PROMPT_MODIFIERS[self.student_levels[student_id]]
