# Valuto Backend API

Production-ready Express.js + MongoDB backend with Clerk authentication, Stripe billing, Gemini AI chat, and Socket.IO trivia.

## Overview

This backend provides a REST API for user profiles, learning modules, challenges, games, leaderboards, trivia sessions, news/events, categories, billing, and AI chat. It also runs a Socket.IO server for real-time trivia gameplay.

## Architecture

```
backend/
├── src/
│   ├── config/         # Database and Socket.IO setup
│   ├── controllers/    # Business logic
│   ├── middleware/     # Auth + validators
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routes
│   ├── sockets/        # Trivia socket handlers
│   ├── utils/          # Error handling + helpers
│   └── server.js       # App entry
└── docs/               # API + Socket.IO docs
```

## Prerequisites

- Node.js >= 18
- npm >= 9
- MongoDB instance
- Clerk account (JWT secret)

## Environment Variables

Create `backend/.env` manually (no example file in repo).

Required:

```env
MONGODB_URI=mongodb://localhost:27017/valuto-dev
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Recommended for local Socket.IO CORS:

```env
FRONTEND_URL=http://localhost:3000
```

Optional (feature-specific):

```env
# Stripe billing
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Gemini AI chat
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-1.5-flash

# Server
NODE_ENV=development
PORT=5000
```

## Quick Start

```bash
cd backend
npm install
npm run dev
```

- API base: `http://localhost:5000/api`
- Health: `http://localhost:5000/api/health`

## REST API Overview

See `docs/API_DOCUMENTATION.md` for the full list and usage notes. Summary below is kept in sync with route files.

### Auth (`/api/auth`)
- POST `/verify`
- GET `/session`
- GET `/health`

### Users (`/api/user`)
- GET `/me`
- POST `/onboarding`
- POST `/`
- GET `/`
- PUT `/`
- GET `/stats`
- GET `/:id/stats`
- POST `/points`
- POST `/game-played`
- POST `/lesson-completed`
- POST `/achievement`
- GET `/achievements`
- GET `/activity`
- DELETE `/`

### Games (`/api/game`)
- POST `/result`
- GET `/history`
- GET `/result/:id`
- GET `/leaderboard/:gameCode`
- GET `/stats`
- GET `/recent`

### Leaderboards (`/api/leaderboard`)
- GET `/`
- GET `/rank`
- GET `/school/:schoolName`
- GET `/top`
- GET `/with-context`
- GET `/stats`

### Learning (`/api/learning`)
- GET `/modules`
- GET `/modules/:id`
- POST `/modules`
- PUT `/modules/:id`
- DELETE `/modules/:id`
- POST `/progress`
- GET `/progress/:moduleId`
- GET `/progress`
- PUT `/time/:moduleId`
- GET `/leaderboard/:moduleId`
- GET `/stats`

### Challenges (`/api/challenges`)
- GET `/daily`
- PUT `/:challengeId/progress`
- PUT `/:challengeId/complete`
- GET `/completed`
- GET `/stats`
- POST `/create`
- DELETE `/:challengeId`

### Trivia (`/api/trivia`)
- POST `/session/:sessionId/restart`
- POST `/session`
- GET `/session/code/:joinCode`
- GET `/session/:sessionId`
- GET `/sessions`
- GET `/session/:sessionId/results`
- GET `/history`
- GET `/stats`
- DELETE `/session/:sessionId`

### News & Events (`/api/news`)
- GET `/all`
- GET `/news`
- GET `/events`
- POST `/news`
- POST `/events`

### Categories (`/api/categories`)
- GET `/`
- GET `/:id`
- POST `/`
- PUT `/:id`
- DELETE `/:id`

### Billing (`/api/billing`)
- POST `/checkout`
- POST `/portal`
- POST `/webhook` (raw body)

### AI (`/api/ai`)
- POST `/chat`

### Webhooks (`/api/webhooks`)
- POST `/clerk`

## Socket.IO Trivia

See `docs/SOCKETS-API.md` for events and payloads.

