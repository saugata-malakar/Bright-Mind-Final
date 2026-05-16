"""
BrightMind - Local Server with Gemma 4 AI (via Ollama)
Serves frontend + proxies AI chat to local Ollama instance.
"""

import http.server
import socketserver
import os
import json
import webbrowser
import urllib.request
import urllib.error

PORT = int(os.environ.get("PORT", 5000))
DIST_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Design a Form", "dist")
OLLAMA_URL = "http://localhost:11434"
MODEL = "gemma3:4b"  # Change to gemma4:9b if you have it pulled

SYSTEM_PROMPT = """You are BrightMind, an expert Socratic AI tutor powered by Gemma 4.
You are built for offline classrooms in rural and remote areas.

CRITICAL RULES:
- Use the Socratic method: guide students with questions, don't just give answers directly.
- Be warm, encouraging, and patient.
- Adapt your language to the student's level.
- When a student is frustrated, be extra supportive.
- Use emojis sparingly to keep it engaging.
- For math: show step-by-step reasoning.
- For science: use real-world analogies.
- For humanities: encourage critical thinking.
- Always end with a follow-up question to keep the student thinking.
- Keep responses concise but thorough (2-4 paragraphs max).
- You are an educational AI — refuse non-educational requests politely.
"""


class BrightMindHandler(http.server.SimpleHTTPRequestHandler):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)

    def do_GET(self):
        path = self.path.split("?")[0]

        if path == "/health":
            self._json({"status": "healthy", "app": "BrightMind", "ollama": self._check_ollama()})
            return
        if path == "/api/v1/models":
            self._json({"models": [MODEL], "ollama_url": OLLAMA_URL})
            return
        if path.startswith("/api/"):
            self._json({"status": "ok"})
            return

        file_path = os.path.join(DIST_DIR, path.lstrip("/"))
        if os.path.isfile(file_path):
            super().do_GET()
            return
        self.path = "/index.html"
        super().do_GET()

    def do_POST(self):
        path = self.path.split("?")[0]

        if path == "/api/v1/chat":
            content_length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(content_length)) if content_length else {}
            message = body.get("message", "")
            history = body.get("history", [])

            # Build messages array for Ollama
            messages = [{"role": "system", "content": SYSTEM_PROMPT}]
            for h in history[-10:]:  # Last 10 messages for context
                messages.append({
                    "role": "user" if h.get("sender") == "user" else "assistant",
                    "content": h.get("text", "")
                })
            messages.append({"role": "user", "content": message})

            # Call Ollama
            try:
                ollama_body = json.dumps({
                    "model": MODEL,
                    "messages": messages,
                    "stream": False,
                    "options": {"temperature": 0.7, "num_predict": 1024}
                }).encode("utf-8")

                req = urllib.request.Request(
                    f"{OLLAMA_URL}/api/chat",
                    data=ollama_body,
                    headers={"Content-Type": "application/json"},
                    method="POST"
                )
                with urllib.request.urlopen(req, timeout=120) as resp:
                    result = json.loads(resp.read().decode("utf-8"))
                    ai_text = result.get("message", {}).get("content", "I couldn't generate a response.")

                self._json({
                    "response": ai_text,
                    "model": MODEL,
                    "status": "success",
                })

            except urllib.error.URLError:
                self._json({
                    "response": "⚠️ Ollama is not running. Please start Ollama and pull the model:\n\n```\nollama serve\nollama pull " + MODEL + "\n```\n\nThen try again!",
                    "model": MODEL,
                    "status": "ollama_offline",
                })
            except Exception as e:
                self._json({
                    "response": f"Error connecting to Gemma 4: {str(e)}",
                    "model": MODEL,
                    "status": "error",
                })
            return

        if path == "/api/v1/analyze":
            content_length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(content_length)) if content_length else {}
            description = body.get("description", "")
            files = body.get("files", [])
            model = body.get("model", MODEL)

            analyze_prompt = f"""You are BrightMind, an expert educational gap analysis AI powered by Gemma. 
You specialize in identifying EXACTLY where a student's understanding breaks down using prerequisite knowledge chains and Bloom's Taxonomy.

STUDENT WORK TO ANALYZE:
Description: {description}
Files submitted: {', '.join(files) if files else 'None (text description only)'}

ANALYSIS FRAMEWORK — Apply ALL of these:
1. PREREQUISITE CHAIN: Identify which foundational concepts the student is missing that block progress.
2. BLOOM'S TAXONOMY: Classify the student's current level (Remember/Understand/Apply/Analyze/Evaluate/Create).
3. ERROR PATTERN: What specific mistakes is the student making? What misconception causes them?
4. REMEDIATION PATH: Create a concrete step-by-step learning path from current level to mastery.
5. CROSS-SUBJECT LINKS: How does this topic connect to other subjects for deeper understanding?

Respond with ONLY valid JSON:
{{
  "mastery": <number 0-100, be precise based on evidence>,
  "summary": "<3-4 sentence assessment explaining the student's current level, what they understand, what they're struggling with, and the root cause of difficulty>",
  "bloomLevel": "<REMEMBER|UNDERSTAND|APPLY|ANALYZE|EVALUATE|CREATE>",
  "gaps": [
    {{"concept": "<specific concept>", "severity": "<critical|high|moderate>", "detail": "<what the student does wrong and WHY — reference specific errors or misconceptions>"}}
  ],
  "strengths": ["<specific thing student CAN do>"],
  "learningPath": [
    {{"name": "<numbered step with specific activity>", "status": "<mastered|review|learn|target>"}}
  ],
  "crossLinks": [
    {{"subject": "<related subject>", "connection": "<specific way this topic appears in that subject>"}}
  ],
  "recommendations": "<2-3 sentences of concrete next steps the teacher should take>"
}}

RULES: Give 3-5 gaps, 2-4 strengths, 5-7 learning path steps, 2-3 cross-links. Be specific and actionable."""

            try:
                # Check which models are available and fallback if needed
                actual_model = model
                try:
                    tag_req = urllib.request.Request(f"{OLLAMA_URL}/api/tags")
                    with urllib.request.urlopen(tag_req, timeout=5) as tag_resp:
                        tag_data = json.loads(tag_resp.read().decode())
                        available = [m["name"] for m in tag_data.get("models", [])]
                        if actual_model not in available:
                            # Try to find any available gemma model
                            fallback = next((m for m in available if "gemma" in m.lower()), None)
                            if fallback:
                                actual_model = fallback
                            elif available:
                                actual_model = available[0]
                except Exception:
                    pass  # If check fails, try the requested model anyway

                ollama_body = json.dumps({
                    "model": actual_model,
                    "messages": [
                        {"role": "system", "content": "You are a precise educational assessment AI. Always respond with valid JSON only."},
                        {"role": "user", "content": analyze_prompt}
                    ],
                    "stream": False,
                    "options": {"temperature": 0.3, "num_predict": 2048},
                    "format": "json"
                }).encode("utf-8")

                req = urllib.request.Request(
                    f"{OLLAMA_URL}/api/chat",
                    data=ollama_body,
                    headers={"Content-Type": "application/json"},
                    method="POST"
                )
                with urllib.request.urlopen(req, timeout=180) as resp:
                    result = json.loads(resp.read().decode("utf-8"))
                    ai_text = result.get("message", {}).get("content", "{}")

                # Parse the JSON response
                try:
                    analysis = json.loads(ai_text)
                except json.JSONDecodeError:
                    analysis = {"mastery": 50, "gaps": [{"concept": "Analysis parsing error", "severity": "moderate", "detail": ai_text[:200]}], "strengths": ["Student engaged"], "learningPath": [], "crossLinks": [], "summary": ai_text[:300]}

                self._json({
                    "analysis": analysis,
                    "model": actual_model,
                    "requested_model": model,
                    "status": "success",
                })

            except urllib.error.URLError:
                self._json({
                    "analysis": None,
                    "model": model,
                    "status": "ollama_offline",
                    "error": "Ollama is not running. Start it with: ollama serve"
                })
            except Exception as e:
                self._json({
                    "analysis": None,
                    "model": model,
                    "status": "error",
                    "error": str(e)
                })
            return

        self._json({"status": "ok"})

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def _json(self, data, code=200):
        body = json.dumps(data).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def _check_ollama(self):
        try:
            req = urllib.request.Request(f"{OLLAMA_URL}/api/tags")
            with urllib.request.urlopen(req, timeout=3) as resp:
                data = json.loads(resp.read().decode())
                models = [m["name"] for m in data.get("models", [])]
                return {"status": "connected", "models": models}
        except Exception:
            return {"status": "offline"}

    def log_message(self, fmt, *args):
        print(f"  {args[0]}")


if __name__ == "__main__":
    if not os.path.exists(DIST_DIR):
        print("\n  ERROR: Frontend not built!")
        print('  Run:  cd "Design a Form" && npm run build\n')
        exit(1)

    # Check Ollama
    ollama_ok = False
    try:
        req = urllib.request.Request(f"{OLLAMA_URL}/api/tags")
        with urllib.request.urlopen(req, timeout=3) as resp:
            data = json.loads(resp.read().decode())
            models = [m["name"] for m in data.get("models", [])]
            ollama_ok = True
            print(f"\n  ✅ Ollama connected! Models: {', '.join(models)}")
            if not any(MODEL.split(':')[0] in m for m in models):
                print(f"  ⚠️  Model '{MODEL}' not found. Run: ollama pull {MODEL}")
    except Exception:
        print(f"\n  ⚠️  Ollama not running. AI chat will show a helpful error.")
        print(f"     To enable AI: ollama serve && ollama pull {MODEL}")

    print()
    print("=" * 50)
    print("  🎓 BrightMind - Running!")
    print(f"  🔗 Frontend:    http://localhost:{PORT}")
    print(f"  🧠 AI Engine:   Gemma 4 via Ollama")
    print(f"  📁 Serving:     {DIST_DIR}")
    print("="*50)

    print("\nPress CTRL+C to stop the server\n")
    try:
        # Open browser automatically
        webbrowser.open(f"http://localhost:{PORT}")
        
        with socketserver.TCPServer(("", PORT), BrightMindHandler) as s:
            s.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
