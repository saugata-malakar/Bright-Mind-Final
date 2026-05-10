# 🚀 Deployment Guide - MediGuide AI

## Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel CLI (Fastest)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Deploy
```bash
# From project root
vercel

# For production
vercel --prod
```

---

### Option 2: Deploy via GitHub (Easiest)

#### Step 1: Go to Vercel
Visit: https://vercel.com/new

#### Step 2: Import Repository
- Click "Import Project"
- Select "Import Git Repository"
- Enter: `https://github.com/saugata-malakar/GEMMA-HACKATHON-2`
- Click "Import"

#### Step 3: Configure Project
- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

#### Step 4: Environment Variables (Optional)
Add these if needed:
- `VITE_API_URL` = Your backend URL
- `VITE_WS_URL` = Your WebSocket URL

#### Step 5: Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Your app will be live!

---

## 🌐 Deployment URLs

After deployment, you'll get:
- **Frontend:** `https://your-project.vercel.app`
- **Preview:** Automatic for each commit
- **Production:** Main branch deployments

---

## 📦 What Gets Deployed

### Frontend
- ✅ React application
- ✅ Beautiful UI
- ✅ All pages (Dashboard, Chat, Diagnosis, etc.)
- ✅ Optimized build
- ✅ Static assets

### Backend (Optional - Vercel Serverless)
- ✅ FastAPI endpoints
- ✅ API routes
- ✅ Serverless functions

---

## 🔧 Alternative Deployment Options

### Option 3: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd frontend
netlify deploy --prod
```

**Configuration:**
- Build command: `npm run build`
- Publish directory: `dist`

### Option 4: Railway
1. Visit: https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway auto-detects and deploys

### Option 5: Render
1. Visit: https://render.com
2. Click "New Static Site"
3. Connect GitHub repository
4. Configure:
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`

---

## 🐳 Docker Deployment

### Deploy with Docker Compose
```bash
# Build and run
docker-compose up -d

# Access at
http://localhost:3000  # Frontend
http://localhost:8000  # Backend
```

### Deploy to Cloud with Docker

#### AWS ECS
```bash
# Build image
docker build -t mediguide-ai .

# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account.dkr.ecr.us-east-1.amazonaws.com
docker tag mediguide-ai:latest your-account.dkr.ecr.us-east-1.amazonaws.com/mediguide-ai:latest
docker push your-account.dkr.ecr.us-east-1.amazonaws.com/mediguide-ai:latest
```

#### Google Cloud Run
```bash
# Build and deploy
gcloud builds submit --tag gcr.io/your-project/mediguide-ai
gcloud run deploy mediguide-ai --image gcr.io/your-project/mediguide-ai --platform managed
```

---

## 🔌 Backend Deployment Options

### Option 1: Vercel Serverless (Included)
- Automatic with frontend deployment
- Serverless functions
- API routes at `/api/*`

### Option 2: Railway (Recommended for Backend)
1. Visit: https://railway.app
2. New Project → Deploy from GitHub
3. Select `backend` folder
4. Railway auto-detects Python/FastAPI
5. Add environment variables
6. Deploy!

### Option 3: Render (Free Tier Available)
1. Visit: https://render.com
2. New Web Service
3. Connect repository
4. Configure:
   - Build Command: `cd backend && pip install -r requirements.txt`
   - Start Command: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Option 4: Heroku
```bash
# Install Heroku CLI
heroku login

# Create app
heroku create mediguide-ai-backend

# Deploy
git subtree push --prefix backend heroku main
```

---

## 🌍 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.railway.app
VITE_WS_URL=wss://your-backend.railway.app
```

### Backend (.env)
```env
DATABASE_URL=postgresql://user:pass@host:5432/mediguide
REDIS_URL=redis://host:6379/0
OLLAMA_URL=http://localhost:11434
SECRET_KEY=your-secret-key
CORS_ORIGINS=https://your-frontend.vercel.app
```

---

## 📊 Deployment Checklist

### Before Deployment
- [ ] Test locally (`npm run dev`)
- [ ] Build successfully (`npm run build`)
- [ ] Check all environment variables
- [ ] Update API URLs
- [ ] Test production build (`npm run preview`)

### After Deployment
- [ ] Test live URL
- [ ] Check all pages work
- [ ] Test API endpoints
- [ ] Verify mobile responsiveness
- [ ] Check console for errors
- [ ] Test Ollama connection (if applicable)

---

## 🚀 Quick Deploy Commands

### Vercel (Fastest)
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Netlify
```bash
npm install -g netlify-cli
netlify login
cd frontend && netlify deploy --prod
```

### Railway (Backend)
```bash
# Just connect GitHub repo at railway.app
# Railway auto-deploys on push
```

---

## 🎯 Recommended Setup

**For Hackathon Demo:**

1. **Frontend:** Vercel
   - Fast deployment
   - Automatic HTTPS
   - Global CDN
   - Free tier

2. **Backend:** Railway
   - Easy Python deployment
   - Free tier available
   - Automatic deployments
   - Built-in database

3. **Database:** Railway PostgreSQL
   - Included with backend
   - Automatic backups
   - Easy setup

---

## 📱 Mobile/PWA Deployment

The app is already configured as a PWA:
- ✅ Service workers
- ✅ Offline support
- ✅ Installable
- ✅ App manifest

Users can install it on mobile:
1. Visit your Vercel URL
2. Click "Add to Home Screen"
3. App installs like native app

---

## 🔍 Monitoring & Analytics

### Add to Vercel Dashboard
- Automatic performance monitoring
- Error tracking
- Analytics
- Deployment logs

### Optional: Add Sentry
```bash
npm install @sentry/react
```

---

## 🎉 You're Ready to Deploy!

**Fastest Method:**
```bash
vercel --prod
```

**Your app will be live in 2-3 minutes!**

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test build locally first
4. Check CORS settings

---

**Good luck with your deployment! 🚀**
