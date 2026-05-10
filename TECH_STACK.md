# MediGuide AI - Technology Stack

## 📚 Complete Technology Stack

### Frontend Technologies

#### Core Framework
- **React 18.2.0** - UI library
- **TypeScript 5.0+** - Type safety
- **Vite 4.3+** - Build tool and dev server

#### UI & Styling
- **Tailwind CSS 3.3+** - Utility-first CSS
- **shadcn/ui** - Component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library
- **Framer Motion** - Animations

#### State Management
- **Zustand 4.3+** - Lightweight state management
- **React Query (TanStack Query)** - Server state management
- **Immer** - Immutable state updates

#### Forms & Validation
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

#### Offline & PWA
- **Workbox** - Service worker library
- **Dexie.js** - IndexedDB wrapper
- **idb-keyval** - Simple key-value storage

#### Image Processing
- **TensorFlow.js** - ML in browser
- **Sharp** (via API) - Image optimization
- **React Dropzone** - File uploads

#### Routing
- **React Router v6** - Client-side routing
- **React Router DOM** - DOM bindings

#### HTTP Client
- **Axios** - HTTP requests
- **Socket.io-client** - WebSocket client

#### Testing
- **Vitest** - Unit testing
- **React Testing Library** - Component testing
- **Playwright** - E2E testing
- **MSW (Mock Service Worker)** - API mocking

#### Development Tools
- **ESLint** - Linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting

---

### Backend Technologies

#### Core Framework
- **FastAPI 0.100+** - Modern Python web framework
- **Python 3.11+** - Programming language
- **Uvicorn** - ASGI server
- **Gunicorn** - Production server

#### API & Documentation
- **Pydantic v2** - Data validation
- **OpenAPI** - API documentation
- **Swagger UI** - Interactive API docs

#### Database
- **PostgreSQL 15** - Primary database
- **SQLAlchemy 2.0** - ORM
- **Alembic** - Database migrations
- **asyncpg** - Async PostgreSQL driver

#### Caching & Queue
- **Redis 7.0** - Caching and sessions
- **Celery** - Task queue
- **Redis Queue (RQ)** - Alternative task queue

#### Authentication & Security
- **python-jose** - JWT tokens
- **passlib** - Password hashing
- **bcrypt** - Hashing algorithm
- **python-multipart** - File uploads

#### AI/ML Integration
- **Ollama** - Local LLM runtime
- **LangChain** - LLM orchestration
- **ChromaDB** - Vector database
- **Sentence Transformers** - Embeddings

#### Image Processing
- **Pillow (PIL)** - Image manipulation
- **OpenCV** - Computer vision
- **scikit-image** - Image processing

#### Testing
- **pytest** - Testing framework
- **pytest-asyncio** - Async testing
- **httpx** - Async HTTP client for testing
- **faker** - Test data generation

#### Monitoring & Logging
- **Prometheus Client** - Metrics
- **Structlog** - Structured logging
- **Sentry** - Error tracking

#### Development Tools
- **Black** - Code formatting
- **isort** - Import sorting
- **mypy** - Type checking
- **pylint** - Linting
- **pre-commit** - Git hooks

---

### AI/ML Stack

#### LLM Runtime
- **Ollama 0.1.29+** - Local model serving
- **Gemma 4 Models:**
  - `gemma4:2b` - Edge/mobile deployment
  - `gemma4:9b` - Balanced performance
  - `gemma4:27b` - Maximum capability

#### LLM Orchestration
- **LangChain 0.1+** - LLM framework
- **LangSmith** - LLM observability
- **LangServe** - LLM deployment

#### Vector Database
- **ChromaDB 0.4+** - Vector storage
- **FAISS** - Alternative vector search
- **Qdrant** - Production vector DB (optional)

#### Embeddings
- **Sentence Transformers** - Text embeddings
- **all-MiniLM-L6-v2** - Lightweight embeddings
- **Gemma embeddings** - Native embeddings

#### RAG Components
- **LlamaIndex** - Data framework
- **Unstructured** - Document parsing
- **PyPDF2** - PDF processing
- **python-docx** - Word document processing

#### Model Optimization
- **ONNX Runtime** - Model optimization
- **Quantization** - Model compression
- **TensorRT** - GPU acceleration (optional)

---

### Database & Storage

#### Primary Database
- **PostgreSQL 15**
  - pgvector extension (vector similarity)
  - Full-text search
  - JSONB support
  - Partitioning

#### Vector Storage
- **ChromaDB** - Development
- **Qdrant** - Production (optional)
- **Pinecone** - Cloud option (optional)

#### Caching
- **Redis 7.0**
  - Session storage
  - API response caching
  - Rate limiting
  - Pub/Sub messaging

#### Object Storage
- **MinIO** - S3-compatible storage
- **AWS S3** - Cloud option
- **Local filesystem** - Development

#### Search
- **PostgreSQL Full-Text Search** - Built-in
- **Elasticsearch** - Advanced search (optional)

---

### DevOps & Infrastructure

#### Containerization
- **Docker 24+** - Containerization
- **Docker Compose** - Local orchestration
- **Multi-stage builds** - Optimized images

#### Orchestration
- **Kubernetes 1.27+** - Production orchestration
- **Helm** - K8s package manager
- **kubectl** - K8s CLI

#### CI/CD
- **GitHub Actions** - CI/CD pipeline
- **Docker Hub** - Container registry
- **GitHub Container Registry** - Alternative registry

#### Monitoring
- **Prometheus** - Metrics collection
- **Grafana** - Metrics visualization
- **Loki** - Log aggregation
- **Tempo** - Distributed tracing

#### Logging
- **Elasticsearch** - Log storage
- **Logstash** - Log processing
- **Kibana** - Log visualization
- **Filebeat** - Log shipping

#### Security
- **Trivy** - Container scanning
- **OWASP ZAP** - Security testing
- **Snyk** - Dependency scanning
- **HashiCorp Vault** - Secrets management

#### Infrastructure as Code
- **Terraform** - Infrastructure provisioning
- **Ansible** - Configuration management

---

### Development Tools

#### Version Control
- **Git** - Version control
- **GitHub** - Code hosting
- **Git LFS** - Large file storage

#### Code Quality
- **SonarQube** - Code quality analysis
- **CodeClimate** - Code review
- **Codecov** - Code coverage

#### Documentation
- **MkDocs** - Documentation site
- **Swagger/OpenAPI** - API docs
- **Storybook** - Component docs
- **JSDoc** - Code documentation

#### Project Management
- **GitHub Projects** - Project tracking
- **GitHub Issues** - Issue tracking
- **GitHub Discussions** - Community

---

### Third-Party Services

#### Medical Data
- **WHO API** - Health guidelines
- **CDC API** - Disease information
- **OpenFDA** - Drug information
- **PubMed API** - Medical research

#### Maps & Location
- **OpenStreetMap** - Mapping
- **Nominatim** - Geocoding

#### Communication
- **Twilio** - SMS notifications (optional)
- **SendGrid** - Email service (optional)

#### Analytics
- **Plausible** - Privacy-friendly analytics
- **PostHog** - Product analytics

---

## 📦 Package Versions

### Frontend (package.json)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.11.0",
    "@tanstack/react-query": "^4.29.0",
    "zustand": "^4.3.8",
    "axios": "^1.4.0",
    "socket.io-client": "^4.6.1",
    "react-hook-form": "^7.44.0",
    "zod": "^3.21.4",
    "@hookform/resolvers": "^3.1.0",
    "dexie": "^3.2.4",
    "dexie-react-hooks": "^1.1.6",
    "workbox-window": "^7.0.0",
    "@radix-ui/react-dialog": "^1.0.4",
    "@radix-ui/react-dropdown-menu": "^2.0.5",
    "@radix-ui/react-select": "^1.2.2",
    "lucide-react": "^0.263.1",
    "framer-motion": "^10.12.16",
    "tailwindcss": "^3.3.2",
    "class-variance-authority": "^0.6.0",
    "clsx": "^1.2.1",
    "tailwind-merge": "^1.13.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.14",
    "@types/react-dom": "^18.2.6",
    "@typescript-eslint/eslint-plugin": "^5.60.0",
    "@typescript-eslint/parser": "^5.60.0",
    "@vitejs/plugin-react": "^4.0.1",
    "typescript": "^5.1.3",
    "vite": "^4.3.9",
    "vite-plugin-pwa": "^0.16.4",
    "vitest": "^0.32.2",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^5.16.5",
    "playwright": "^1.35.1",
    "eslint": "^8.43.0",
    "prettier": "^2.8.8"
  }
}
```

### Backend (requirements.txt)
```txt
# Core Framework
fastapi==0.100.0
uvicorn[standard]==0.23.0
gunicorn==21.2.0
python-multipart==0.0.6

# Database
sqlalchemy==2.0.19
alembic==1.11.1
asyncpg==0.28.0
psycopg2-binary==2.9.6

# Caching & Queue
redis==4.6.0
celery==5.3.1

# Authentication
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6

# AI/ML
langchain==0.0.267
chromadb==0.4.6
sentence-transformers==2.2.2
ollama==0.1.7

# Image Processing
Pillow==10.0.0
opencv-python==4.8.0.74

# Validation
pydantic==2.1.1
pydantic-settings==2.0.2
email-validator==2.0.0

# HTTP Client
httpx==0.24.1
aiohttp==3.8.5

# Monitoring
prometheus-client==0.17.1
sentry-sdk==1.29.2

# Logging
structlog==23.1.0
python-json-logger==2.0.7

# Testing
pytest==7.4.0
pytest-asyncio==0.21.1
faker==19.2.0
httpx==0.24.1

# Development
black==23.7.0
isort==5.12.0
mypy==1.4.1
pylint==2.17.4
pre-commit==3.3.3
```

---

## 🔧 Configuration Files

### Frontend Configuration

#### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'MediGuide AI',
        short_name: 'MediGuide',
        description: 'Offline Medical Assistant',
        theme_color: '#2563EB',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})
```

#### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
        },
      },
    },
  },
  plugins: [],
}
```

### Backend Configuration

#### pyproject.toml
```toml
[tool.black]
line-length = 88
target-version = ['py311']
include = '\.pyi?$'

[tool.isort]
profile = "black"
multi_line_output = 3

[tool.mypy]
python_version = "3.11"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true

[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py"]
python_classes = ["Test*"]
python_functions = ["test_*"]
```

---

## 🐳 Docker Configuration

### docker-compose.yml
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - VITE_API_URL=http://localhost:8000

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/mediguide
      - REDIS_URL=redis://redis:6379
      - OLLAMA_URL=http://ollama:11434
    depends_on:
      - postgres
      - redis
      - ollama

  postgres:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mediguide
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

  chromadb:
    image: chromadb/chroma:latest
    ports:
      - "8001:8000"
    volumes:
      - chroma_data:/chroma/chroma

volumes:
  postgres_data:
  redis_data:
  ollama_data:
  chroma_data:
```

---

## 🚀 Deployment Options

### Option 1: Docker Compose (Development)
- Quick setup
- All services in containers
- Easy to tear down and rebuild

### Option 2: Kubernetes (Production)
- Scalable
- High availability
- Auto-healing
- Load balancing

### Option 3: Edge Deployment
- Raspberry Pi 4/5
- NVIDIA Jetson
- Intel NUC
- Lightweight containers

### Option 4: Cloud Deployment
- AWS ECS/EKS
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform

---

## 📊 Performance Targets

### Frontend
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90

### Backend
- API Response Time: < 200ms (p95)
- Gemma 4 Inference: < 2s (p95)
- Database Queries: < 50ms (p95)

### Offline
- Service Worker Install: < 5s
- Offline Page Load: < 1s
- IndexedDB Operations: < 100ms

---

## 🔐 Security Measures

- HTTPS everywhere
- JWT authentication
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection
- CORS configuration
- Security headers
- Dependency scanning
- Container scanning

---

## 📈 Scalability Strategy

### Horizontal Scaling
- Stateless backend services
- Load balancer
- Database read replicas
- Redis cluster

### Vertical Scaling
- GPU for Gemma 4
- More RAM for caching
- Faster storage (SSD/NVMe)

### Caching Strategy
- Redis for API responses
- Browser caching
- CDN for static assets
- Database query caching

---

This tech stack provides a solid foundation for building a production-ready, scalable, and maintainable medical AI assistant!
