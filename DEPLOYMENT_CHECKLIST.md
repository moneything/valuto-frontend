# Deployment Checklist - Valuto

Current deployment checklist for the monorepo (`frontend/` + `backend/`).

## Recommended Hosting

- Frontend: Vercel (root dir `frontend`)
- Backend: Render Web Service (root dir `backend`)
- Database: MongoDB Atlas
- Auth: Clerk

Reason: backend uses Socket.IO and should run on a persistent server process.

## 1) Backend Deployment Checklist (Render)

### Build/runtime settings
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Node version: `>=18`

### Required env vars

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_APP_URL=https://your-frontend.vercel.app
FRONTEND_URL=https://your-frontend.vercel.app
```

### Optional env vars

```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-1.5-flash
```

### Smoke tests
- `GET /api/health` returns success
- `POST /api/billing/webhook` reachable (for Stripe)
- Socket.IO connection succeeds from deployed frontend

## 2) Frontend Deployment Checklist (Vercel)

### Project settings
- Root Directory: `frontend`
- Framework Preset: Next.js

### Required env vars

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
```

Optional:

```env
NEXT_PUBLIC_APP_URL=https://your-frontend.vercel.app
```

### Smoke tests
- Sign-in/sign-up works
- Dashboard loads with real user profile
- Learning modules/challenges/leaderboard load from backend
- Trivia create/join/play works across two browser sessions

## 3) Post-Deploy Validation

- Confirm backend CORS allows frontend URL:
  - `NEXT_PUBLIC_APP_URL`
  - `FRONTEND_URL`
- Confirm Clerk production keys are used on both services
- Confirm MongoDB Atlas network access and credentials are correct
- Confirm Stripe webhooks are configured with backend webhook URL

## 4) Rollback Plan

- Keep last successful Render deployment available for instant rollback
- Keep last successful Vercel deployment promoted/tagged
- Revert env var changes first if outage is config-related
