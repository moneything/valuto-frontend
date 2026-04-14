# Valuto Frontend

Next.js 15 App Router frontend for Valuto.

## Tech

- Next.js 15
- React 18 + TypeScript
- Tailwind CSS
- Clerk auth
- Framer Motion
- Vercel AI SDK + OpenAI integration
- Socket.IO client

## Scripts

From `frontend/`:

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test:e2e
```

Runtime requirements:
- Node.js `>=18`
- npm `>=9`

## Environment

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Important: define `NEXT_PUBLIC_BACKEND_URL` explicitly. The codebase has mixed fallback defaults in a few files.

## Run Locally

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## App Surface (Current)

Public/auth routes:
- `/`
- `/about`
- `/features`
- `/news`
- `/contact`
- `/pricing`
- `/sign-in/[[...sign-in]]`
- `/sign-up/[[...sign-up]]`
- `/auth/[[...rest]]`
- `/onboarding`
- `/subscribe`
- `/privacy-policy`
- `/terms-and-conditions`

Dashboard routes:
- `/dashboard`
- `/dashboard/news`
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
- `/dashboard/build-your-life`
- `/dashboard/build-your-business`
- `/dashboard/students`
- `/dashboard/ai-chat`

## Structure

```text
frontend/
├── app/                 # App Router pages/layouts
├── components/          # Reusable UI and feature components
├── lib/                 # API utilities, context, helpers
├── public/              # Static assets
├── package.json
└── next.config.mjs
```

## Notes

- Root layout wraps app with `ClerkProvider` and custom `UserProvider`.
- Frontend expects backend APIs under `${NEXT_PUBLIC_BACKEND_URL}/api/*`.
- Real-time trivia host/player flows use Socket.IO against the backend server.
