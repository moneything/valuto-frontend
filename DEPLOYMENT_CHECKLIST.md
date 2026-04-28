# Deployment Checklist - Valuto

Current deployment checklist for the monorepo (`frontend/` + `backend/`).

## Recommended Hosting

- Frontend: Railway (root dir `frontend`)
- Backend: Railway (root dir `backend`)
- Database: MongoDB Atlas
- Auth: Clerk

Reason: backend uses Socket.IO and should run on a persistent server process.

## 1) Backend Deployment Checklist (Railway)

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
NEXT_PUBLIC_APP_URL=https://your-frontend.up.railway.app
FRONTEND_URL=https://your-frontend.up.railway.app
```

### Optional env vars

```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-1.5-flash
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=mailer@example.com
SMTP_PASS=...
CONTACT_FROM_EMAIL=hello@example.com
CONTACT_TO_EMAIL=team@example.com
```

### Smoke tests
- `GET /api/health` returns success
- `POST /api/billing/webhook` reachable and not returning `500` for valid Stripe deliveries
- Socket.IO connection succeeds from deployed frontend
- `/api/contact` works if SMTP/contact delivery is enabled

## 2) Frontend Deployment Checklist (Railway)

### Project settings
- Root Directory: `frontend`
- Framework Preset: Next.js

### Required env vars

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_BACKEND_URL=https://your-backend.up.railway.app
```

Optional:

```env
NEXT_PUBLIC_APP_URL=https://your-frontend.up.railway.app
```

### Smoke tests
- Sign-in/sign-up works
- New users are redirected through onboarding
- Unsubscribed users are redirected to `/subscribe`
- Subscribed users can reach the dashboard with a real user profile
- Learning modules/challenges/leaderboard load from backend
- Trivia create/join/play works across two browser sessions
- AI chat works if Gemini is enabled

## 3) Post-Deploy Validation

- Confirm backend CORS allows frontend URL:
  - `NEXT_PUBLIC_APP_URL`
  - `FRONTEND_URL`
- Confirm Clerk production keys are used on both services
- Confirm MongoDB Atlas network access and credentials are correct
- Confirm Stripe webhooks are configured with backend webhook URL
- Confirm `STRIPE_WEBHOOK_SECRET` matches the configured Stripe endpoint secret
- Confirm Stripe webhook deliveries succeed even though Stripe sends no browser `Origin` header
- Confirm optional Gemini and SMTP/contact env vars are set if those features are expected in production

## 4) Rollback Plan

- Keep last successful Railway backend deployment available for instant rollback
- Keep last successful Railway frontend deployment available for instant rollback
- Revert env var changes first if outage is config-related
