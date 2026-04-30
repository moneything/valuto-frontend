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

Paid platform endpoints additionally require the authenticated Mongo user profile to have
`subscriptionStatus` of `active` or `trialing`. Missing subscription access returns `402`.

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
- POST `/onboarding` - Complete onboarding using the single-role student flow
- POST `/` - Create or update profile
- GET `/` - Get profile
- PUT `/` - Update profile (`school` is locked after first set)
- GET `/stats` - Current user stats
- GET `/:id/stats` - Stats by user id (same-school access only)
- POST `/points` - Disabled for direct client mutation
- POST `/game-played` - Disabled for direct client mutation
- POST `/lesson-completed` - Disabled for direct client mutation
- POST `/achievement` - Disabled for direct client mutation
- GET `/achievements` - List achievements
- GET `/activity` - Activity feed
- DELETE `/` - Soft delete account

### Games (`/api/game`)

- POST `/result` - Submit a verified trivia result from a finished server-side session
- GET `/history` - User game history
- GET `/result/:id` - Game result by id
- GET `/leaderboard/:gameCode` - Game leaderboard
- GET `/stats` - User game stats
- GET `/recent` - Recent games

### Leaderboards (`/api/leaderboard`)

- GET `/` - Global leaderboard
- GET `/rank` - Current user rank
- GET `/school/:schoolName` - School leaderboard
- GET `/top` - Top performers
- GET `/with-context` - Leaderboard with user context
- GET `/stats` - Leaderboard statistics

### Learning (`/api/learning`)

Content modules:
- GET `/modules`
- GET `/modules/:id`

Progress tracking:
- POST `/progress` - Saves progress only; client input cannot award points or complete modules
- GET `/progress/:moduleId`
- GET `/progress`
- PUT `/time/:moduleId`
- GET `/leaderboard/:moduleId`
- GET `/stats`

### Challenges (`/api/challenges`)

- GET `/daily` - Returns active daily, weekly, and monthly challenges
- PUT `/:challengeId/progress` - Disabled for direct client mutation
- PUT `/:challengeId/complete` - Disabled for direct client mutation
- GET `/completed`
- GET `/stats`
- POST `/create` - Disabled for all users
- DELETE `/:challengeId`

### Trivia (`/api/trivia`)

- POST `/session/:sessionId/restart`
- POST `/session` - Create trivia session (authenticated users)
- GET `/session/code/:joinCode`
- GET `/session/:sessionId`
- GET `/sessions`
- GET `/session/:sessionId/results`
- GET `/history`
- GET `/stats`
- GET `/platform-stats`
- DELETE `/session/:sessionId`

### News & Events (`/api/news`)

- GET `/all`
- GET `/news`
- GET `/events`

### Categories (`/api/categories`)

- GET `/`
- GET `/:id`

### Billing (`/api/billing`)

- POST `/checkout` - Stripe Checkout session, rate limited
- POST `/portal` - Stripe billing portal, rate limited
- POST `/webhook` - Stripe webhook with raw body, mounted directly in `src/server.js`
- Webhook delivery requires `STRIPE_WEBHOOK_SECRET` on the backend
- Server-to-server webhook requests are accepted without a browser `Origin` header

### AI (`/api/ai`)

- POST `/chat` - Gemini chat

### Contact (`/api/contact`)

- POST `/` - Contact form email send attempt, rate limited and Turnstile protected in production

### Webhooks (`/api/webhooks`)

- POST `/clerk` - Clerk webhook receiver

## Socket.IO

Real-time trivia events are documented in `docs/SOCKETS-API.md`.

## Current Access Rules

- The platform uses a single user role in practice: all users are treated as `student`.
- Paid platform data APIs require Clerk authentication and an active or trialing subscription.
- Same-school access is the boundary for `GET /api/user/:id/stats`.
- Leaderboard endpoints do not expose user email addresses.
- Challenge rewards are awarded only by verified server-side flows.
- Category, news/event, and learning-module mutation routes are not mounted.
- Verified trivia results are deduplicated per `clerkUserId + sessionId`.
- Contact form payloads are rate limited, captcha checked, sanitized, and validated before mail delivery is attempted.

## Operations & Testing

Useful scripts from `backend/`:

```bash
npm test
npm run test:real-mongo
npm run migrate:single-role
npm run verify:single-role
npm run smoke:post-deploy
```

See also:
- `docs/SETUP_GUIDE.md`
- `docs/SOCKETS-API.md`
- `docs/ops-testing-runbook.md`
