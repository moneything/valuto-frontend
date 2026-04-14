# Valuto Setup Guide

Current setup guide for local development, staging verification, and production operations.

## Prerequisites

- Node.js >= 18
- npm >= 9
- MongoDB local/Atlas, or Railway-connected MongoDB
- Clerk account and keys

## Local Setup

### 1. Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Backend env (`backend/.env`)

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
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=mailer@example.com
SMTP_PASS=...
CONTACT_FROM_EMAIL=hello@example.com
CONTACT_TO_EMAIL=team@example.com
```

### 3. Frontend env (`frontend/.env.local`)

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Important:
- always set `NEXT_PUBLIC_BACKEND_URL` explicitly
- backend HTTP CORS depends on `NEXT_PUBLIC_APP_URL`
- backend Socket.IO CORS depends on both `NEXT_PUBLIC_APP_URL` and `FRONTEND_URL`
- several frontend files still have mixed `5000`/`5001` fallbacks, so missing `NEXT_PUBLIC_BACKEND_URL` causes avoidable local/runtime bugs

### 4. Start services

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

### 5. Verify locally

- Backend health: `http://localhost:5000/api/health`
- Frontend: `http://localhost:3000`
- Sign in and confirm dashboard/profile/challenges/leaderboard data load
- If SMTP is configured, verify the `/contact` form sends successfully

## Backend Scripts

Run from `backend/`:

```bash
npm test
npm run test:real-mongo
npm run migrate:single-role
npm run verify:single-role
npm run smoke:post-deploy
```

What they do:
- `npm test`: standard backend suite
- `npm run test:real-mongo`: real Mongo integration + concurrency tests when `MONGODB_URI_TEST` is set
- `npm run migrate:single-role`: converts non-student users to `student`
- `npm run verify:single-role`: verifies that all users are now `student`
- `npm run smoke:post-deploy`: authenticated post-deploy smoke checks against a deployed backend

`smoke:post-deploy` env:

```env
SMOKE_BASE_URL=https://your-backend.example.com
SMOKE_BEARER_TOKEN=...
SMOKE_SAME_SCHOOL_USER_ID=optional-user-id
SMOKE_VERIFIED_SESSION_ID=optional-session-id
SMOKE_VERIFIED_GAME_CODE=optional-game-code
SMOKE_PROFILE_TITLE=optional-title
SMOKE_ALLOW_PROFILE_UPDATE=false
```

## Staging / Migration Rehearsal

Before production:

```bash
cd backend
MONGODB_URI="your-staging-uri" npm run migrate:single-role
MONGODB_URI="your-staging-uri" npm run verify:single-role
```

Recommended staging checks:
- all users end up as `student`
- same-school stats still work
- trivia session creation works
- leaderboard loads
- challenges seed and load correctly
- if SMTP is configured, contact form delivery works

## Railway Production

For Railway:

1. Deploy the code that contains the migration.
2. Open the backend service shell.
3. Run:

```bash
npm run migrate:single-role
```

4. Then verify:

```bash
npm run verify:single-role
```

5. Run post-deploy smoke checks with the required env vars:

```bash
npm run smoke:post-deploy
```

Production note:
- Stripe billing, Gemini chat, and contact-form email delivery are optional integrations and will return configuration errors until their env vars are set correctly.

## Real Mongo Testing

If you have a disposable Mongo instance:

```bash
cd backend
MONGODB_URI_TEST="mongodb://127.0.0.1:27017/valuto_real_mongo_tests" npm run test:real-mongo
```

These tests cover:
- unique `GameResult` session dedupe
- one-time challenge reward claims
- day/month challenge seeding persistence
- concurrent result/challenge writes

## Related Docs

- `README.md`
- `backend/README.md`
- `backend/docs/API_DOCUMENTATION.md`
- `backend/docs/ops-testing-runbook.md`
- `DEPLOYMENT_CHECKLIST.md`
