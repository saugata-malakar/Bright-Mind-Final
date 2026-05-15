"""
Multi-Agent Orchestrator - Routes student queries to specialized Gemma 4 tutor agents.
This is the brain of CogniCore's agentic architecture.

Each agent has a unique system prompt tuned for its discipline:
  - MathTutorAgent: Step-by-step problem decomposition, visual aids
  - ScienceTutorAgent: Hypothesis-driven Socratic method
  - HumanitiesTutorAgent: Critical thinking, source analysis
  - MetaCognitiveAgent: Teaches students HOW to learn (study strategies)
"""

import logging
from enum import Enum
from app.services.gemma_service import GemmaService

logger = logging.getLogger(__name__)


class AgentType(str, Enum):
    MATH = "math"
    SCIENCE = "science"
    HUMANITIES = "humanities"
    META_COGNITIVE = "meta_cognitive"


AGENT_PROMPTS = {
    AgentType.MATH: """You are a world-class Mathematics tutor inside CogniCore.
RULES:
1. NEVER give the final answer directly. Guide with questions.
2. Break complex problems into visual, bite-sized steps.
3. Use real-world analogies (pizza slices for fractions, building blocks for algebra).
4. When the student is stuck, offer exactly ONE hint, then wait.
5. Celebrate small victories with encouragement.
6. If you detect a foundational gap, STOP and address it first before continuing.
7. Always end your response with a guiding question back to the student.""",

    AgentType.SCIENCE: """You are a world-class Science tutor inside CogniCore.
RULES:
1. Use the scientific method: Observe → Hypothesize → Test → Conclude.
2. Turn every question into a mini-experiment the student can reason through.
3. Relate abstract concepts to the student's everyday life.
4. Ask "What do you think would happen if...?" before explaining.
5. Encourage curiosity. There are no stupid questions.
6. When explaining processes, use sequential numbered steps.
7. Always end with "What else do you wonder about this?".""",

    AgentType.HUMANITIES: """You are a world-class Humanities tutor inside CogniCore.
RULES:
1. Encourage critical thinking over memorization.
2. Ask students to consider multiple perspectives on any historical event.
3. Help students build arguments with evidence, not opinions.
4. Use primary source analysis techniques.
5. Connect historical events to modern-day parallels.
6. For literature, ask about character motivations before themes.
7. Always end with a thought-provoking question.""",

    AgentType.META_COGNITIVE: """You are a Meta-Cognitive Learning Coach inside CogniCore.
RULES:
1. Your job is to teach students HOW to learn, not WHAT to learn.
2. Introduce study techniques: Pomodoro, active recall, spaced repetition, Feynman technique.
3. Help students identify their learning style (visual, auditory, kinesthetic).
4. Coach them on self-assessment: "How confident are you on a scale of 1-5?"
5. Teach them to break large assignments into smaller tasks.
6. Help them build a study schedule.
7. Encourage growth mindset: "You can't do it YET."."""
}

# Keywords used for basic routing (enhanced by Gemma classification in production)
ROUTING_KEYWORDS = {
    AgentType.MATH: [
        "math", "algebra", "geometry", "calculus", "fraction", "equation",
        "multiply", "divide", "add", "subtract", "number", "percent",
        "ratio", "proportion", "graph", "slope", "area", "volume",
        "triangle", "circle", "angle", "decimal", "integer", "exponent"
    ],
    AgentType.SCIENCE: [
        "science", "biology", "chemistry", "physics", "atom", "molecule",
        "cell", "organism", "energy", "force", "gravity", "evolution",
        "ecosystem", "photosynthesis", "chemical", "reaction", "experiment",
        "hypothesis", "planet", "solar", "element", "periodic", "dna"
    ],
    AgentType.HUMANITIES: [
        "history", "geography", "literature", "essay", "war", "revolution",
        "civilization", "culture", "democracy", "government", "poem",
        "novel", "character", "theme", "philosophy", "society", "rights",
        "constitution", "ancient", "medieval", "renaissance", "colonialism"
    ],
    AgentType.META_COGNITIVE: [
        "study", "learn", "remember", "memorize", "focus", "concentrate",
        "procrastinate", "exam", "test prep", "homework", "motivation",
        "schedule", "organize", "notes", "revision", "confused", "overwhelmed"
    ]
}


class AgentOrchestrator:
    """
    Routes incoming student messages to the most appropriate specialized
    Gemma 4 tutor agent based on content analysis.
    """

    def __init__(self):
        self.gemma = GemmaService()

    def classify_intent(self, message: str) -> AgentType:
        """Classify which agent should handle this message."""
        message_lower = message.lower()
        scores = {}

        for agent_type, keywords in ROUTING_KEYWORDS.items():
            score = sum(1 for kw in keywords if kw in message_lower)
            scores[agent_type] = score

        best = max(scores, key=scores.get)

        # Default to meta-cognitive if no strong signal
        if scores[best] == 0:
            return AgentType.META_COGNITIVE

        logger.info(f"Routed to {best.value} agent (score: {scores[best]})")
        return best

    async def process(self, message: str, student_context: str = "") -> dict:
        """Process a student message through the appropriate agent."""
        agent_type = self.classify_intent(message)
        system_prompt = AGENT_PROMPTS[agent_type]

        full_prompt = (
            f"System: {system_prompt}\n\n"
            f"Student Context: {student_context}\n\n"
            f"Student: {message}\n\n"
            f"Tutor:"
        )

        try:
            result = await self.gemma.generate(prompt=full_prompt)
            return {
                "agent": agent_type.value,
                "response": result.get("response", "I need a moment to think about that. Can you rephrase?"),
                "routing_confidence": "high"
            }
        except Exception as e:
            logger.error(f"Agent processing failed: {e}")
            return {
                "agent": agent_type.value,
                "response": "I'm having trouble connecting to my knowledge base right now. Let's try again in a moment.",
                "routing_confidence": "error"
            }
