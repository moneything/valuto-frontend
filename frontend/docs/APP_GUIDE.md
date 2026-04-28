# Valuto Frontend App Guide

Last validated against code: April 28, 2026


Current guide for the frontend app in `frontend/`.

## Tech Stack

- Next.js 15 (App Router)
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

Public marketing:
- `/`
- `/about`
- `/features`
- `/contact`
- `/pricing`
- `/privacy-policy`
- `/terms-and-conditions`

Auth and onboarding:
- `/sign-in/[[...sign-in]]`
- `/sign-up/[[...sign-up]]`
- `/auth/[[...rest]]`
- `/onboarding`

Authenticated but subscription-exempt:
- `/subscribe`

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
- `/dashboard/news`
- `/dashboard/build-your-life`
- `/dashboard/build-your-business`

## Access Model

- Clerk middleware protects all non-public app routes.
- A shared subscription gate redirects signed-in users without onboarding completion to `/onboarding`.
- After onboarding, users without `active` or `trialing` subscription status are redirected to `/subscribe`.
- Public marketing pages remain accessible without auth or subscription.

## Data + Integration

- Frontend consumes backend API at `${NEXT_PUBLIC_BACKEND_URL}/api/*`.
- User/session sync is managed in `frontend/lib/userContext.tsx`.
- Subscription routing helpers live in `frontend/lib/subscriptionAccess.ts`.
- App-wide paywall enforcement is mounted via `frontend/components/SubscriptionGate.tsx`.
- API helpers are in `frontend/lib/api.ts` and `frontend/lib/api/*.ts`.
- Trivia real-time connection is in `frontend/lib/socket.ts`.

## Source-of-Truth Docs

- `frontend/README.md`
- `backend/README.md`
- `backend/docs/API_DOCUMENTATION.md`
- `backend/docs/SOCKETS-API.md`
