# Frontend Integration Guide

Current guide for integrating the `frontend/` app with the live `backend/` API + Socket.IO services.

## Scope

This project already includes:
- REST API integration via `NEXT_PUBLIC_BACKEND_URL`
- Clerk-based auth on frontend and backend
- Socket.IO client integration for trivia flows

Use this guide to validate and maintain integration, not to bootstrap from scratch.

## 1) Required Environment

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Important:
- Always set `NEXT_PUBLIC_BACKEND_URL` explicitly.
- Some frontend files have mixed fallback ports; this env var prevents wrong defaults.

## 2) Local Run Order

Terminal 1:

```bash
cd backend
npm install
npm run dev
```

Terminal 2:

```bash
cd frontend
npm install
npm run dev
```

Expected:
- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:5000/api/health`

## 3) Integration Verification Checklist

### Auth + profile sync
- Sign in from frontend.
- Confirm `GET /api/user/me` is called and user profile loads in dashboard.

### REST API integration
- Dashboard stats load from backend (no hardcoded values).
- Learning modules and progress load from backend.
- Challenges and leaderboard screens load from backend.

### Trivia REST + Socket.IO
- Create trivia session from `/dashboard/trivia/create`.
- Join from `/dashboard/trivia/play/[code]` in a second tab/user.
- Confirm live state changes (join/start/question/score updates).

## 4) Common Issues

### Frontend calling wrong backend port
Cause: missing `NEXT_PUBLIC_BACKEND_URL`.
Fix: set it to `http://localhost:5000`, restart frontend dev server.

### CORS errors in browser
Cause: backend CORS env mismatch.
Fix in `backend/.env`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```

Restart backend.

### Socket connects then fails auth
Cause: missing/invalid Clerk token.
Fix: ensure Clerk keys are valid in frontend and backend; sign out/in and retry.

## 5) Current Integration Files

- Frontend API client: `frontend/lib/api.ts`
- Frontend user sync context: `frontend/lib/userContext.tsx`
- Socket client: `frontend/lib/socket.ts`
- Trivia pages:
  - `frontend/app/dashboard/trivia/page.tsx`
  - `frontend/app/dashboard/trivia/create/page.tsx`
  - `frontend/app/dashboard/trivia/play/[code]/page.tsx`
  - `frontend/app/dashboard/trivia/host/[sessionId]/page.tsx`
  - `frontend/app/dashboard/trivia/session/[sessionId]/results/page.tsx`

## 6) Related Docs

- `frontend/README.md`
- `backend/README.md`
- `backend/docs/API_DOCUMENTATION.md`
- `backend/docs/SOCKETS-API.md`
