# 🎓 BrightMind - Offline Adaptive Education Platform

[![Gemma 4](https://img.shields.io/badge/Powered%20by-Gemma%204-blue)](https://ai.google.dev/gemma)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-ready-brightgreen)](docker-compose.yml)

> **Empowering students and teachers in remote areas with AI-powered, hyper-adaptive offline education.**

BrightMind is an offline-first educational platform powered by Gemma 4. It acts as an orchestrator of specialized AI tutors, providing students with personalized learning, knowledge gap analysis, and interactive diagram evaluation—all without requiring an internet connection.

## 🎯 Problem Statement

Remote and rural classrooms face critical educational challenges:
- **High student-to-teacher ratios** preventing personalized instruction.
- **No internet connectivity** for online learning resources.
- **Language barriers** and static curriculums that leave struggling students behind.
- **Lack of immediate feedback** on complex subjects like math and science.

## 💡 Solution

BrightMind addresses these challenges by providing:

✅ **Offline-First Design** - Works completely offline using local Gemma 4 models  
✅ **Socratic Virtual Tutors** - AI that guides rather than just gives answers  
✅ **Knowledge Gap Analyzer** - Identifies foundational concepts the student is missing  
✅ **Concept Linker** - Connects topics across subjects dynamically  
✅ **Diagram & Formula Analysis** - Visual interpretation of handwritten math or science charts  
✅ **Robust Educational RAG** - Curriculum standards, offline encyclopedias, and OER textbooks  

## 🏆 Hackathon Submission

This project is submitted for the **Gemma 4 Good Hackathon** on Kaggle.

**Tracks:**
- 🎯 Main Track - Overall Innovation
- 📚 Impact Track - Future of Education
- 🔧 Special Technology Track - Ollama

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- 8GB+ RAM (16GB recommended)
- Ollama installed locally

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/saugata-malakar/Bright-Mind.git
cd Bright-Mind
```

2. **Install Ollama and pull Gemma 4 models**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
ollama pull gemma4:9b
```

3. **Build the frontend and start the application**
```bash
cd "Design a Form"
npm install
npm run build
cd ..
python serve.py
```

4. **Access the application**
- Frontend & Dashboard: http://localhost:5000

## 📁 Project Structure

```
Bright-Mind/
├── Design a Form/            # React + TypeScript commercial frontend
├── serve.py                  # Python backend server + Ollama proxy
└── README.md                 # This file
```

## 🤖 Gemma 4 Integration

- ✅ **Function Calling** - Structured mastery metrics extraction
- ✅ **Multimodal** - Text + diagram/formula analysis
- ✅ **Long Context** - Full student session history consideration
- ✅ **Offline Inference** - No cloud dependency
- ✅ **Robust Vector DB** - ChromaDB for curriculum RAG

## 🔒 Security & Privacy

- 🛡️ **Local-first processing** - child data stays on device
- 🔐 **Anonymized Analytics** - privacy-focused synchronization
- 🔑 **JWT authentication** for teacher dashboards

---

**Built with ❤️ for the Gemma 4 Good Hackathon**
*Empowering the next generation, one lesson at a time.*
