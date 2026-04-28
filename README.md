# Valuto - Financial Education Platform

Monorepo for the Valuto product with:
- `frontend/`: Next.js 15 App Router app
- `backend/`: Express + MongoDB API with Socket.IO

## Repository Layout

```text
valuto-frontend/
├── frontend/                      # Next.js client app
├── backend/                       # Express API + Socket.IO
├── README.md
├── frontend/README.md
└── backend/README.md
```

## Current Stack

Frontend:
- Next.js 15
- React 18 + TypeScript
- Tailwind CSS
- Clerk (`@clerk/nextjs`)
- Vercel AI SDK + OpenAI integration
- Framer Motion
- Socket.IO client

Backend:
- Node.js + Express
- MongoDB + Mongoose
- Clerk server SDK (`@clerk/clerk-sdk-node`)
- Socket.IO
- Stripe (billing)
- Nodemailer (contact form)
- Google Gemini API

## Local Development

This repo does not use a root workspace script. Run each service in its own terminal.

Required runtime:
- Node.js `>=18`
- npm `>=9`

### 1) Start backend

```bash
cd backend
npm install
npm run dev
```

Backend defaults to `http://localhost:5000`.

### 2) Start frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`.

## Environment Setup

### Backend (`backend/.env`)

Required for normal local use:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/valuto-dev
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```

Optional features:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Gemini
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-1.5-flash
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Important: set `NEXT_PUBLIC_BACKEND_URL` explicitly. Some frontend files still include mixed fallback ports (`5000`/`5001`), so this variable should always be defined.

## Current Product Rules

- The platform currently uses a single effective user role: all users are treated as `student`.
- Same-school access is the privacy boundary for cross-user stats.
- Any authenticated user can create trivia sessions.
- Custom challenges and learning module mutations are disabled for all users.
- Public leaderboard responses do not expose email addresses.
- Verified trivia results are tied to finished server-side sessions and deduplicated per user/session.

## Current App Surface

Frontend route groups:
- Marketing/public: `/`, `/about`, `/features`, `/contact`, `/pricing`, `/privacy-policy`, `/terms-and-conditions`
- Auth/onboarding: `/sign-in/[[...sign-in]]`, `/sign-up/[[...sign-up]]`, `/auth/[[...rest]]`, `/onboarding`
- Authenticated but subscription-exempt: `/subscribe`
- Legal: `/privacy-policy`, `/terms-and-conditions`
- Dashboard: `/dashboard`, `/dashboard/profile`, `/dashboard/challenges`, `/dashboard/learning-modules`, `/dashboard/learning-modules/[moduleId]`, `/dashboard/trivia`, `/dashboard/trivia/create`, `/dashboard/trivia/play/[code]`, `/dashboard/trivia/host/[sessionId]`, `/dashboard/trivia/session/[sessionId]/results`, `/dashboard/leaderboard`, `/dashboard/calculator`, `/dashboard/investment`, `/dashboard/students`, `/dashboard/ai-chat`, `/dashboard/news`, `/dashboard/build-your-life`, `/dashboard/build-your-business`

Access model:
- Clerk middleware protects all non-public app routes.
- Users without completed onboarding are redirected to `/onboarding`.
- Users without an `active` or `trialing` subscription are redirected to `/subscribe`.
- The paywall is app-wide outside the public marketing surface and auth/onboarding flow.

Backend API mounts:
- `/api/auth`
- `/api/user`
- `/api/game`
- `/api/leaderboard`
- `/api/learning`
- `/api/challenges`
- `/api/trivia`
- `/api/news`
- `/api/categories`
- `/api/billing`
- `/api/ai`
- `/api/contact`
- `/api/webhooks`

## Useful Backend Commands

From `backend/`:

```bash
npm test
npm run test:real-mongo
npm run migrate:single-role
npm run verify:single-role
npm run smoke:post-deploy
```

For operational details, see:
- `backend/docs/API_DOCUMENTATION.md`
- `backend/docs/ops-testing-runbook.md`

## Service URLs

- Frontend: `http://localhost:3000`
- Backend root: `http://localhost:5000/`
- Backend health: `http://localhost:5000/api/health`

## Additional Docs

- `frontend/README.md`
- `backend/README.md`
- `FRONTEND_INTEGRATION_GUIDE.md`
- `DEPLOYMENT_CHECKLIST.md`
- `PRODUCTION_ERROR_FIX.md`
