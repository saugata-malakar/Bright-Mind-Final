# BrightMind - Architecture Document

## 🎯 Project Overview

**BrightMind** is an offline-first, hyper-adaptive educational assistant powered by Gemma 4 that provides students and teachers in remote areas with instant access to personalized tutoring, knowledge gap analysis, and interactive curriculum generation.

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   React UI   │  │  PWA Service │  │  IndexedDB   │      │
│  │   (Vite)     │  │    Worker    │  │   Storage    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕ REST API
┌─────────────────────────────────────────────────────────────┐
│                     Backend Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  FastAPI     │  │  WebSocket   │  │   Redis      │      │
│  │  Server      │  │  Handler     │  │   Cache      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   AI/ML Layer                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Gemma 4     │  │  Ollama      │  │  Vector DB   │      │
│  │  (Ollama)    │  │  Runtime     │  │  (ChromaDB)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   Data Layer                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  PostgreSQL  │  │  Curriculum  │  │  Student     │      │
│  │  Database    │  │  KB (RAG)    │  │  Profiles    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Technology Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **UI Library:** Tailwind CSS + shadcn/ui
- **Offline Support:** PWA with Service Workers
- **Local Storage:** IndexedDB (Dexie.js)

### Backend
- **Framework:** FastAPI (Python 3.11+)
- **Database:** PostgreSQL
- **Caching:** Redis

### AI/ML
- **Primary Model:** Gemma 4 (via Ollama)
- **Vector Database:** ChromaDB for robust RAG
- **Embeddings:** Gemma embeddings
- **Vision:** Gemma 4 Vision capabilities for diagram analysis

## 🤖 AI/ML Architecture

### Agentic Routing Strategy
BrightMind utilizes multiple specialized instances of Gemma 4, routed dynamically based on the student's input:
- **Math Tutor Agent:** Prompted to explicitly ask for steps and identify calculation errors.
- **Humanities Agent:** Prompted to encourage critical thinking, historical context, and essay structuring.
- **Assessment Agent:** Uses function calling to extract `mastery_score` and `knowledge_gaps` into structured JSON.

#### Prompt Engineering
```python
EDUCATION_SYSTEM_PROMPT = """
You are BrightMind, an expert Socratic tutor. 

CRITICAL RULES:
- Never give the direct answer.
- Ask probing questions.
- Use simple vocabulary suited for grade level: {grade_level}.

Current curriculum context: {rag_context}
"""
```

## 💾 Data Architecture

### Database Schema

#### Users Table (Teachers/Students)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL, -- 'student' or 'teacher'
    grade_level INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### Learning Sessions Table
```sql
CREATE TABLE sessions (
    id UUID PRIMARY KEY,
    student_id UUID REFERENCES users(id),
    subject VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Assessments & Mastery Table
```sql
CREATE TABLE assessments (
    id UUID PRIMARY KEY,
    student_id UUID REFERENCES users(id),
    competencies_assessed JSONB NOT NULL,
    knowledge_gaps JSONB NOT NULL,
    mastery_level FLOAT NOT NULL,
    recommended_modules TEXT[],
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 🌐 Offline-First Strategy

### Service Worker Strategy
- **Cache-first** for all static assets (React app, CSS, JS).
- **IndexedDB** stores local student profiles, current module progress, and queued analytics.
- **Background Sync** pushes mastery data to the district server when the edge device reconnects to the broader internet.
