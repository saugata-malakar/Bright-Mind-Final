# MediGuide AI - Architecture Document

## 🎯 Project Overview

**MediGuide AI** is an offline-first medical assistant powered by Gemma 4 that provides healthcare workers in rural and remote areas with instant access to medical expertise, symptom analysis, and treatment recommendations.

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
│  │  PostgreSQL  │  │  Medical KB  │  │  User Data   │      │
│  │  Database    │  │  (RAG)       │  │  Storage     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Technology Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **UI Library:** Tailwind CSS + shadcn/ui
- **State Management:** Zustand
- **Offline Support:** PWA with Service Workers
- **Local Storage:** IndexedDB (Dexie.js)
- **Image Processing:** TensorFlow.js (preprocessing)

### Backend
- **Framework:** FastAPI (Python 3.11+)
- **API Documentation:** OpenAPI/Swagger
- **WebSocket:** FastAPI WebSockets
- **Authentication:** JWT tokens
- **Caching:** Redis
- **Task Queue:** Celery (for async processing)

### AI/ML
- **Primary Model:** Gemma 4 (via Ollama)
- **Model Variants:** 
  - Gemma 4 9B for general queries
  - Gemma 4 27B for complex medical analysis
- **Vector Database:** ChromaDB for RAG
- **Embeddings:** Gemma embeddings
- **Image Analysis:** Gemma 4 Vision capabilities

### Database
- **Primary DB:** PostgreSQL 15
- **Vector Storage:** ChromaDB
- **Cache:** Redis
- **File Storage:** MinIO (S3-compatible)

### DevOps
- **Containerization:** Docker + Docker Compose
- **Orchestration:** Kubernetes (optional)
- **CI/CD:** GitHub Actions
- **Monitoring:** Prometheus + Grafana
- **Logging:** ELK Stack (Elasticsearch, Logstash, Kibana)

## 🎨 Frontend Architecture

### Component Structure
```
src/
├── components/
│   ├── chat/
│   │   ├── ChatInterface.tsx
│   │   ├── MessageList.tsx
│   │   └── InputBox.tsx
│   ├── diagnosis/
│   │   ├── SymptomChecker.tsx
│   │   ├── ImageUpload.tsx
│   │   └── ResultsDisplay.tsx
│   ├── knowledge/
│   │   ├── MedicalDatabase.tsx
│   │   └── DrugInteractions.tsx
│   └── common/
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── LoadingSpinner.tsx
├── hooks/
│   ├── useGemma.ts
│   ├── useOffline.ts
│   └── useIndexedDB.ts
├── services/
│   ├── api.ts
│   ├── gemma.ts
│   └── storage.ts
├── store/
│   ├── chatStore.ts
│   ├── userStore.ts
│   └── settingsStore.ts
└── utils/
    ├── imageProcessing.ts
    ├── offline.ts
    └── validation.ts
```

### Key Features
1. **Offline-First Design**
   - Service Worker caches all assets
   - IndexedDB stores conversations and medical data
   - Background sync when connection restored

2. **Progressive Web App**
   - Installable on mobile devices
   - Works offline
   - Push notifications for critical updates

3. **Responsive Design**
   - Mobile-first approach
   - Works on tablets and desktops
   - Touch-optimized interface

## 🔌 Backend Architecture

### API Structure
```
backend/
├── app/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── endpoints/
│   │   │   │   ├── chat.py
│   │   │   │   ├── diagnosis.py
│   │   │   │   ├── knowledge.py
│   │   │   │   └── users.py
│   │   │   └── api.py
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── logging.py
│   ├── models/
│   │   ├── user.py
│   │   ├── conversation.py
│   │   └── diagnosis.py
│   ├── services/
│   │   ├── gemma_service.py
│   │   ├── rag_service.py
│   │   └── image_service.py
│   ├── db/
│   │   ├── session.py
│   │   └── init_db.py
│   └── main.py
├── tests/
├── alembic/
└── requirements.txt
```

### Key Services

#### 1. Gemma Service
- Manages Ollama connection
- Handles prompt engineering
- Implements function calling
- Manages context windows

#### 2. RAG Service
- Medical knowledge base retrieval
- Vector similarity search
- Context augmentation
- Citation tracking

#### 3. Image Service
- Medical image preprocessing
- Gemma 4 Vision integration
- Result interpretation
- DICOM support (future)

## 🤖 AI/ML Architecture

### Gemma 4 Integration

#### Model Selection Strategy
```python
def select_model(query_complexity: str, offline_mode: bool):
    if offline_mode:
        if query_complexity == "simple":
            return "gemma4:2b"  # Fast, edge-optimized
        elif query_complexity == "medium":
            return "gemma4:9b"  # Balanced
        else:
            return "gemma4:27b"  # Complex medical reasoning
    else:
        return "gemma4:27b"  # Always use best when online
```

#### Prompt Engineering
```python
MEDICAL_SYSTEM_PROMPT = """
You are MediGuide AI, a medical assistant designed to help healthcare 
workers in rural areas. You provide:

1. Symptom analysis and triage (emergency vs non-emergency)
2. Evidence-based treatment recommendations
3. Drug interaction warnings
4. Medical image interpretation guidance

CRITICAL RULES:
- Always recommend seeking professional medical care for emergencies
- Cite medical sources when available
- Express uncertainty when appropriate
- Use simple, clear language
- Consider resource constraints in rural settings

Current context: {context}
Medical knowledge base: {rag_context}
"""
```

#### RAG Implementation
```
Medical Knowledge Base
├── WHO Guidelines
├── CDC Resources
├── Medical Textbooks (open source)
├── Drug Databases
└── Emergency Protocols

→ Chunked and Embedded
→ Stored in ChromaDB
→ Retrieved based on query similarity
→ Augmented into Gemma 4 context
```

## 💾 Data Architecture

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    organization VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
);
```

#### Conversations Table
```sql
CREATE TABLE conversations (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    title VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    is_archived BOOLEAN DEFAULT FALSE
);
```

#### Messages Table
```sql
CREATE TABLE messages (
    id UUID PRIMARY KEY,
    conversation_id UUID REFERENCES conversations(id),
    role VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### Diagnoses Table
```sql
CREATE TABLE diagnoses (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    symptoms JSONB NOT NULL,
    analysis TEXT NOT NULL,
    recommendations TEXT NOT NULL,
    urgency_level VARCHAR(50),
    image_urls TEXT[],
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔒 Security Architecture

### Authentication Flow
1. User registers/logs in
2. Backend generates JWT token
3. Token stored in httpOnly cookie
4. Token validated on each request
5. Refresh token for long sessions

### Data Privacy
- All medical data encrypted at rest
- TLS/SSL for data in transit
- HIPAA-compliant data handling
- User data anonymization options
- Local-first processing (data stays on device when offline)

### API Security
- Rate limiting (100 requests/minute)
- CORS configuration
- Input validation and sanitization
- SQL injection prevention
- XSS protection

## 📊 Monitoring & Observability

### Metrics
- API response times
- Gemma 4 inference latency
- Error rates
- User engagement metrics
- Offline usage statistics

### Logging
- Structured JSON logs
- Request/response logging
- Error tracking with stack traces
- Audit logs for medical queries

### Alerting
- High error rates
- Slow response times
- Service downtime
- Database connection issues

## 🚀 Deployment Architecture

### Development
```
docker-compose.yml
├── frontend (Vite dev server)
├── backend (FastAPI with hot reload)
├── postgres
├── redis
├── chromadb
└── ollama (with Gemma 4 models)
```

### Production
```
Kubernetes Cluster
├── Frontend (Nginx + React build)
├── Backend (Gunicorn + FastAPI)
├── PostgreSQL (StatefulSet)
├── Redis (StatefulSet)
├── ChromaDB (StatefulSet)
└── Ollama (GPU-enabled pods)
```

### Edge Deployment
- Lightweight Docker containers
- Gemma 4 2B/9B models
- SQLite for local storage
- Sync to cloud when connected

## 🌐 Offline-First Strategy

### Service Worker Strategy
```javascript
// Cache-first for static assets
// Network-first for API calls with fallback
// Background sync for failed requests
```

### Data Synchronization
1. User works offline
2. Data stored in IndexedDB
3. Connection restored
4. Background sync uploads data
5. Conflict resolution if needed

## 📈 Scalability Considerations

### Horizontal Scaling
- Stateless backend services
- Load balancer (Nginx/HAProxy)
- Database read replicas
- Redis cluster for caching

### Performance Optimization
- Response caching
- Database query optimization
- CDN for static assets
- Lazy loading for frontend
- Model quantization for edge devices

## 🔄 CI/CD Pipeline

```
GitHub Push
    ↓
GitHub Actions
    ↓
├── Run Tests
├── Build Docker Images
├── Security Scanning
└── Deploy to Staging
    ↓
Manual Approval
    ↓
Deploy to Production
```

## 📱 Mobile Strategy

### Progressive Web App
- Installable on iOS and Android
- Offline functionality
- Push notifications
- Camera access for medical images

### Future Native Apps
- React Native version
- Better performance
- Native device integration
- App store distribution

## 🎯 Success Metrics

### Technical Metrics
- 99.9% uptime
- <500ms API response time
- <2s Gemma 4 inference time
- 100% offline functionality

### Impact Metrics
- Number of healthcare workers using the system
- Number of patients helped
- Time saved in diagnosis
- Accuracy of recommendations

## 🔮 Future Enhancements

1. **Voice Interface**
   - Speech-to-text for hands-free operation
   - Multi-language voice support

2. **Telemedicine Integration**
   - Video consultations
   - Remote specialist access

3. **Wearable Integration**
   - Vital signs monitoring
   - Real-time health tracking

4. **Advanced Imaging**
   - X-ray analysis
   - Ultrasound interpretation
   - Skin condition diagnosis

5. **Predictive Analytics**
   - Disease outbreak prediction
   - Patient risk assessment
   - Resource allocation optimization
