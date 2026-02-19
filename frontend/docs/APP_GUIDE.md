# Valuto Frontend App Guide

Last validated against code: February 19, 2026


Current guide for the frontend app in `frontend/`.

## Tech Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Clerk auth
- Socket.IO client (trivia)

## Environment

`frontend/.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## Run

```bash
cd frontend
npm install
npm run dev
```

## App Routes

Public/auth:
- `/`
- `/sign-in/[[...sign-in]]`
- `/sign-up/[[...sign-up]]`
- `/auth/[[...rest]]`
- `/onboarding`
- `/subscribe`
- `/privacy-policy`
- `/terms-and-conditions`

Dashboard:
- `/dashboard`
- `/dashboard/profile`
- `/dashboard/challenges`
- `/dashboard/learning-modules`
- `/dashboard/learning-modules/[moduleId]`
- `/dashboard/trivia`
- `/dashboard/trivia/create`
- `/dashboard/trivia/play/[code]`
- `/dashboard/trivia/host/[sessionId]`
- `/dashboard/trivia/session/[sessionId]/results`
- `/dashboard/leaderboard`
- `/dashboard/calculator`
- `/dashboard/investment`
- `/dashboard/students`
- `/dashboard/ai-chat`

## Data + Integration

- Frontend consumes backend API at `${NEXT_PUBLIC_BACKEND_URL}/api/*`.
- User/session sync is managed in `frontend/lib/userContext.tsx`.
- API helpers are in `frontend/lib/api.ts` and `frontend/lib/api/*.ts`.
- Trivia real-time connection is in `frontend/lib/socket.ts`.

## Source-of-Truth Docs

- `frontend/README.md`
- `backend/README.md`
- `backend/docs/API_DOCUMENTATION.md`
- `backend/docs/SOCKETS-API.md`
