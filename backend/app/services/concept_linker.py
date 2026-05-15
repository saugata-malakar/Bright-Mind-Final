"""
Cross-Disciplinary Concept Linker

Discovers connections between subjects to deepen understanding.
E.g., "The Fibonacci sequence appears in both math and nature (sunflowers)."
"""

import logging

logger = logging.getLogger(__name__)

CONCEPT_LINKS = [
    {
        "concept_a": {"subject": "math", "topic": "Ratios & Proportions"},
        "concept_b": {"subject": "science", "topic": "Chemical Equations Balancing"},
        "connection": "Balancing chemical equations uses the same ratio reasoning as solving proportions.",
    },
    {
        "concept_a": {"subject": "math", "topic": "Fibonacci Sequence"},
        "concept_b": {"subject": "science", "topic": "Patterns in Nature"},
        "connection": "The Fibonacci sequence appears in sunflower spirals, pinecone scales, and galaxy arms.",
    },
    {
        "concept_a": {"subject": "math", "topic": "Geometry & Angles"},
        "concept_b": {"subject": "humanities", "topic": "Ancient Greek Architecture"},
        "connection": "The Greeks used the Golden Ratio (1.618) to design the Parthenon.",
    },
    {
        "concept_a": {"subject": "science", "topic": "Climate & Weather"},
        "concept_b": {"subject": "humanities", "topic": "Agricultural Civilizations"},
        "connection": "Understanding climate patterns explains why early civilizations formed near rivers.",
    },
    {
        "concept_a": {"subject": "math", "topic": "Statistics & Probability"},
        "concept_b": {"subject": "humanities", "topic": "Election Analysis"},
        "connection": "Polling, surveys, and election predictions all rely on statistical sampling.",
    },
    {
        "concept_a": {"subject": "math", "topic": "Fractions"},
        "concept_b": {"subject": "science", "topic": "Measurement & Units"},
        "connection": "Scientific measurements use fractions constantly (e.g., 3/4 cup, 1/2 teaspoon).",
    },
    {
        "concept_a": {"subject": "science", "topic": "Forces & Motion"},
        "concept_b": {"subject": "math", "topic": "Linear Equations"},
        "connection": "Newton's Second Law (F=ma) is a linear equation relating force, mass, and acceleration.",
    },
]


class ConceptLinker:
    """Finds cross-disciplinary connections to enrich learning."""

    def find_links(self, subject: str, topic: str) -> list[dict]:
        topic_lower = topic.lower()
        results = []
        for link in CONCEPT_LINKS:
            a = link["concept_a"]
            b = link["concept_b"]
            if (a["subject"] == subject and a["topic"].lower() in topic_lower) or \
               (topic_lower in a["topic"].lower()):
                results.append({"linked_subject": b["subject"], "linked_topic": b["topic"], "connection": link["connection"]})
            elif (b["subject"] == subject and b["topic"].lower() in topic_lower) or \
                 (topic_lower in b["topic"].lower()):
                results.append({"linked_subject": a["subject"], "linked_topic": a["topic"], "connection": link["connection"]})
        return results
