# Valuto Backend API Documentation

This document reflects the current route implementation in `backend/src/routes/*`.

## Base URL

- Development: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

## Authentication

Protected endpoints require a Clerk session JWT in the `Authorization` header:

```
Authorization: Bearer <clerk_session_token>
```

Some endpoints allow optional auth (they work without a token but can personalize results).

## Response Shape

Success responses follow:

```json
{
  "success": true,
  "message": "...optional...",
  "data": { }
}
```

Errors are formatted by `utils/errorHandler.js`:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "name", "message": "Name is required" }
  ]
}
```

## Endpoints

### Health

- GET `/health` - API health check
- GET `/` - Root status (non-API)

### Auth (`/api/auth`)

- POST `/verify` - Verify Clerk token
- GET `/session` - Get Clerk session info
- GET `/health` - Auth service health

### Users (`/api/user`)

- GET `/me` - Sync Clerk user to Mongo and return profile
- POST `/onboarding` - Complete onboarding
- POST `/` - Create or update profile
- GET `/` - Get profile
- PUT `/` - Update profile
- GET `/stats` - Current user stats
- GET `/:id/stats` - Stats by user id (teacher use)
- POST `/points` - Add points
- POST `/game-played` - Increment game count
- POST `/lesson-completed` - Increment lesson count
- POST `/achievement` - Add achievement
- GET `/achievements` - List achievements
- GET `/activity` - Activity feed
- DELETE `/` - Soft delete account

### Games (`/api/game`)

- POST `/result` - Submit game result
- GET `/history` - User game history
- GET `/result/:id` - Game result by id
- GET `/leaderboard/:gameCode` - Game leaderboard (auth optional)
- GET `/stats` - User game stats
- GET `/recent` - Recent games (auth optional)

### Leaderboards (`/api/leaderboard`)

- GET `/` - Global leaderboard (auth optional)
- GET `/rank` - Current user rank
- GET `/school/:schoolName` - School leaderboard (auth optional)
- GET `/top` - Top performers (auth optional)
- GET `/with-context` - Leaderboard with user context
- GET `/stats` - Leaderboard statistics (auth optional)

### Learning (`/api/learning`)

Content modules:
- GET `/modules`
- GET `/modules/:id`
- POST `/modules`
- PUT `/modules/:id`
- DELETE `/modules/:id`

Progress tracking:
- POST `/progress`
- GET `/progress/:moduleId`
- GET `/progress`
- PUT `/time/:moduleId`
- GET `/leaderboard/:moduleId` (auth optional)
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
- POST `/news` (auth required)
- POST `/events` (auth required)

### Categories (`/api/categories`)

- GET `/`
- GET `/:id`
- POST `/` (auth required)
- PUT `/:id` (auth required)
- DELETE `/:id` (auth required)

### Billing (`/api/billing`)

- POST `/checkout` - Stripe Checkout session
- POST `/portal` - Stripe billing portal
- POST `/webhook` - Stripe webhook (raw body)

### AI (`/api/ai`)

- POST `/chat` - Gemini chat (auth required)

### Webhooks (`/api/webhooks`)

- POST `/clerk` - Clerk webhook receiver

## Socket.IO

Real-time trivia events are documented in `docs/SOCKETS-API.md`.

