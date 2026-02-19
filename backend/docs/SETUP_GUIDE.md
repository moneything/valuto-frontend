# Valuto Full-Stack Setup Guide

Current setup guide for local development and production deployment.

## Prerequisites

- Node.js >= 18
- npm >= 9
- MongoDB local or Atlas
- Clerk account

## Local Setup

### 1) Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2) Backend env (`backend/.env`)

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/valuto-dev
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000

# Optional
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-1.5-flash
```

### 3) Frontend env (`frontend/.env.local`)

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Important: set `NEXT_PUBLIC_BACKEND_URL` explicitly.

### 4) Start services

Terminal 1:

```bash
cd backend
npm run dev
```

Terminal 2:

```bash
cd frontend
npm run dev
```

### 5) Verify

- Backend health: `http://localhost:5000/api/health`
- Frontend: `http://localhost:3000`
- Sign in and confirm dashboard data loads from backend.

## Production Setup (High Level)

- Deploy backend from `backend/` on Railway
- Deploy frontend from `frontend/` on Railway
- Set backend production env vars before go-live
- Set frontend `NEXT_PUBLIC_BACKEND_URL` to deployed backend URL
- Update backend CORS env vars to deployed frontend URL

For detailed deployment steps, see `DEPLOYMENT_CHECKLIST.md`.
