# Valuto - Financial Education Platform

A monorepo for the Valuto financial education platform with a Next.js frontend and an Express + MongoDB backend.

## Project Structure

```
valuto-frontend/
├── frontend/                      # Next.js app (App Router)
│   ├── app/                        # Routes (home, dashboard, onboarding, subscribe)
│   ├── components/                 # UI + dashboard components
│   └── docs/                       # Frontend notes and guides
├── backend/                        # Express API + Socket.IO server
│   ├── src/                        # Controllers, models, routes, sockets
│   └── docs/                       # API + socket docs and reports
├── DEPLOYMENT_CHECKLIST.md
├── FRONTEND_INTEGRATION_GUIDE.md
├── FRONTEND_API_INTEGRATION_COMPLETE.md
├── PRODUCTION_ERROR_FIX.md
└── README.md
```

## Frontend

Next.js 14 app with Clerk authentication, a marketing home page, and an authenticated dashboard shell.

- App Router + TypeScript + Tailwind CSS
- Clerk auth provider and user context
- Dashboard layout with subscription gating
- News & events feed UI (powered by backend `/api/news`)

Docs: `frontend/README.md`, `frontend/docs/`

## Backend

Express + MongoDB REST API with Socket.IO real-time trivia support.

- Clerk JWT verification (HTTP + sockets)
- REST APIs for users, games, leaderboards, learning modules, challenges, trivia
- News + events aggregation (RSS feeds)
- Stripe billing (checkout, portal, webhook)
- Gemini AI chat endpoint
- Socket.IO trivia game flow

Docs: `backend/README.md`, `backend/docs/API_DOCUMENTATION.md`, `backend/docs/SOCKETS-API.md`

## Quick Start

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with at least:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/valuto-dev
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```

Optional (only required if you use these features):

```env
# Stripe billing
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI chat (Gemini)
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-1.5-flash
```

Run the API:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create `.env.local` in `frontend/`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Run the web app:

```bash
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:5000/api/health`

## Documentation Index

- Backend API reference: `backend/docs/API_DOCUMENTATION.md`
- Socket.IO trivia events: `backend/docs/SOCKETS-API.md`
- Backend setup notes: `backend/README.md`
- Frontend setup notes: `frontend/README.md`

## Tech Stack

**Frontend**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Clerk Authentication

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO
- Clerk SDK (JWT verification)
- Stripe (billing)
- Google Generative AI (Gemini)

