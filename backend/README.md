# Valuto Backend API

Express + MongoDB backend for Valuto, with Clerk auth, Socket.IO trivia, Stripe billing, and Gemini chat.

## Tech

- Node.js (CommonJS)
- Express
- MongoDB + Mongoose
- Clerk server SDK
- Socket.IO
- Stripe
- Nodemailer
- Google Generative AI (Gemini)

## Scripts

From `backend/`:

```bash
npm run dev
npm start
npm run migrate:single-role
npm run verify:single-role
npm run smoke:post-deploy
npm run format
npm run format:check
npm test
npm run test:real-mongo
```

Runtime requirements:
- Node.js `>=18`
- npm `>=9`

## Environment

Create `backend/.env`.

Core:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/valuto-dev
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```

Optional:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Contact captcha
TURNSTILE_SECRET_KEY=...

# Gemini
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-1.5-flash
```

## Run Locally

```bash
cd backend
npm install
npm run dev
```

- Server root: `http://localhost:5000/`
- API health: `http://localhost:5000/api/health`

## Route Mounts (Current)

Mounted in `src/server.js`:
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

Special handling:
- `POST /api/billing/webhook` uses raw body middleware for Stripe signature verification.

## Key Endpoints

Auth:
- `POST /api/auth/verify`
- `GET /api/auth/session`
- `GET /api/auth/health`

User:
- `GET /api/user/me`
- `POST /api/user/onboarding`
- `GET /api/user/stats`
- `GET /api/user/:id/stats`

Trivia / games:
- `POST /api/game/result`
- `GET /api/game/history`
- `GET /api/game/stats`
- `POST /api/trivia/session`
- `GET /api/trivia/session/code/:joinCode`
- `GET /api/trivia/session/:sessionId`
- `GET /api/trivia/session/:sessionId/results`
- `POST /api/trivia/session/:sessionId/restart`

Learning / leaderboard:
- `GET /api/learning/modules`
- `GET /api/learning/progress`
- `GET /api/leaderboard`
- `GET /api/leaderboard/with-context`

Other:
- `GET /api/news/all`
- `GET /api/categories`
- `POST /api/billing/checkout`
- `POST /api/billing/portal`
- `POST /api/contact`
- `POST /api/webhooks/clerk`

## Realtime

Socket.IO is initialized on the same HTTP server and currently used for trivia session gameplay.

## Current Platform Rules

- The app currently operates with a single user role in practice: all users are treated as `student`.
- Any authenticated user can create trivia sessions.
- Custom challenge creation is disabled for all users.
- Learning module create/update/delete routes are disabled for all users.
- `GET /api/user/:id/stats` is restricted by same-school access.
- Verified trivia result submission is deduplicated per `clerkUserId + sessionId`.
- Public leaderboard routes do not expose email addresses.

## Operational Testing

- `npm test` runs the normal backend suite.
- `npm run test:real-mongo` runs real-Mongo integration and concurrency tests when `MONGODB_URI_TEST` is set.
- `npm run verify:single-role` verifies that a migrated database has no non-student users remaining.
- `npm run smoke:post-deploy` runs authenticated post-deploy smoke checks against a deployed backend.

See:
- [API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md)
- [SOCKETS-API.md](./docs/SOCKETS-API.md)
- [ops-testing-runbook.md](./docs/ops-testing-runbook.md)
- [SETUP_GUIDE.md](./docs/SETUP_GUIDE.md)

## Structure

```text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── sockets/
│   ├── utils/
│   └── server.js
├── docs/
└── package.json
```
