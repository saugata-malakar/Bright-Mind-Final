"""
Learning Path Generator

Uses a prerequisite knowledge graph to auto-generate personalized
learning paths for each student based on their identified gaps.
"""

import logging
from collections import deque
from dataclasses import dataclass

logger = logging.getLogger(__name__)


@dataclass
class ConceptNode:
    id: str
    name: str
    subject: str
    grade_level: int
    prerequisites: list[str]
    description: str = ""


MATH_GRAPH: dict[str, ConceptNode] = {
    "counting": ConceptNode("counting", "Counting Numbers", "math", 1, []),
    "addition": ConceptNode("addition", "Basic Addition", "math", 1, ["counting"]),
    "subtraction": ConceptNode("subtraction", "Basic Subtraction", "math", 1, ["counting"]),
    "multiplication": ConceptNode("multiplication", "Multiplication", "math", 3, ["addition"]),
    "division": ConceptNode("division", "Division", "math", 3, ["multiplication", "subtraction"]),
    "fractions_basic": ConceptNode("fractions_basic", "Understanding Fractions", "math", 3, ["division"]),
    "fractions_unlike": ConceptNode("fractions_unlike", "Adding Unlike Fractions", "math", 5, ["fractions_basic", "multiplication"]),
    "decimals": ConceptNode("decimals", "Decimals", "math", 4, ["fractions_basic"]),
    "pemdas": ConceptNode("pemdas", "Order of Operations", "math", 5, ["multiplication", "division"]),
    "variables": ConceptNode("variables", "Variables & Expressions", "math", 6, ["pemdas"]),
    "linear_eq": ConceptNode("linear_eq", "Linear Equations", "math", 7, ["variables", "pemdas"]),
    "graphing": ConceptNode("graphing", "Graphing Lines", "math", 8, ["linear_eq"]),
}


class LearningPathGenerator:
    def __init__(self):
        self.graphs = {"math": MATH_GRAPH}

    def get_prerequisites(self, concept_id: str, subject: str = "math") -> list[str]:
        graph = self.graphs.get(subject, {})
        visited, queue, prereqs = set(), deque([concept_id]), []
        while queue:
            cur = queue.popleft()
            if cur in visited: continue
            visited.add(cur)
            node = graph.get(cur)
            if node:
                for p in node.prerequisites:
                    if p not in visited:
                        queue.append(p)
                        prereqs.append(p)
        return prereqs

    def generate_path(self, target: str, mastered: list[str], subject: str = "math") -> list[dict]:
        graph = self.graphs.get(subject, {})
        needed = [c for c in self.get_prerequisites(target, subject) + [target] if c not in mastered]
        sorted_ids = self._topo_sort(needed, graph)
        return [{"id": n.id, "name": n.name, "grade": n.grade_level, "is_target": n.id == target}
                for cid in sorted_ids if (n := graph.get(cid))]

    def _topo_sort(self, ids: list[str], graph: dict) -> list[str]:
        id_set, visited, result = set(ids), set(), []
        def dfs(cid):
            if cid in visited or cid not in id_set: return
            visited.add(cid)
            node = graph.get(cid)
            if node:
                for p in node.prerequisites: dfs(p)
            result.append(cid)
        for cid in ids: dfs(cid)
        return result

    def find_gaps(self, target: str, scores: dict, subject: str = "math") -> list[dict]:
        graph = self.graphs.get(subject, {})
        gaps = []
        for pid in self.get_prerequisites(target, subject):
            score = scores.get(pid, 0)
            if score < 70:
                node = graph.get(pid)
                if node:
                    sev = "critical" if score < 40 else "moderate" if score < 60 else "minor"
                    gaps.append({"id": pid, "name": node.name, "score": score, "severity": sev})
        return sorted(gaps, key=lambda g: g["score"])
