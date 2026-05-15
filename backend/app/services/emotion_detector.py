"""
Emotion-Aware Adaptation Engine

Detects student frustration, confusion, or confidence from text
and adapts the tutor's tone and pacing in real-time.
"""

import logging

logger = logging.getLogger(__name__)


EMOTION_KEYWORDS = {
    "frustrated": ["i give up", "this is stupid", "i hate", "ugh", "i can't", "impossible", "too hard", "quit"],
    "confused": ["i don't understand", "what?", "huh", "lost", "confused", "makes no sense", "help me", "i'm stuck"],
    "confident": ["i got it", "easy", "i know", "of course", "obviously", "makes sense", "let me try"],
    "bored": ["boring", "whatever", "who cares", "pointless", "why do i need", "so what"],
}

TONE_ADAPTATIONS = {
    "frustrated": (
        "The student seems frustrated. Be extra patient and encouraging. "
        "Simplify your language. Break the problem into the tiniest possible step. "
        "Validate their effort: 'I can see you're working hard on this.' "
        "Offer to try a completely different approach or analogy."
    ),
    "confused": (
        "The student is confused. Do NOT repeat the same explanation. "
        "Try a completely different analogy or visual approach. "
        "Go back one step and verify understanding before continuing. "
        "Ask: 'Which part specifically is tripping you up?'"
    ),
    "confident": (
        "The student is feeling confident! Challenge them with a slightly harder variation. "
        "Ask them to explain the concept in their own words (Feynman technique). "
        "Introduce a related concept to build on their momentum."
    ),
    "bored": (
        "The student seems disengaged. Make the content more relevant to THEIR life. "
        "Use a fun challenge, game-like problem, or real-world application. "
        "Ask about their interests and connect the topic to something they care about."
    ),
    "neutral": "The student's emotional state is neutral. Proceed normally with Socratic questioning."
}


class EmotionDetector:
    """Detects student emotional state from text to adapt tutoring style."""

    def detect(self, message: str) -> str:
        message_lower = message.lower()
        scores = {}
        for emotion, keywords in EMOTION_KEYWORDS.items():
            scores[emotion] = sum(1 for kw in keywords if kw in message_lower)

        best = max(scores, key=scores.get)
        if scores[best] == 0:
            return "neutral"

        logger.info(f"Detected emotion: {best} (score: {scores[best]})")
        return best

    def get_tone_modifier(self, message: str) -> str:
        emotion = self.detect(message)
        return TONE_ADAPTATIONS.get(emotion, TONE_ADAPTATIONS["neutral"])
