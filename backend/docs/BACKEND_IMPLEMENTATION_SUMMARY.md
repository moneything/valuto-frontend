# Backend Implementation Summary

Current summary of the backend in this repository.

## Status

Backend is operational and provides:
- REST API under `/api/*`
- Socket.IO trivia support
- Clerk-protected endpoints
- MongoDB persistence
- Optional Stripe billing endpoints
- Optional Gemini chat endpoint
- Optional contact-form email delivery

## Runtime

- Entry: `backend/src/server.js`
- Language/runtime: Node.js (CommonJS)
- Framework: Express
- Database: MongoDB/Mongoose

## Current Route Mounts

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

Special route behavior:
- `POST /api/billing/webhook` uses raw request body for Stripe signature verification.

## Core Directory Structure

```text
backend/src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── sockets/
├── utils/
└── server.js
```

## Environment Requirements

Required for standard operation:
- `MONGODB_URI`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_APP_URL`
- `FRONTEND_URL`

Common runtime settings:
- `NODE_ENV`
- `PORT`

Feature-specific:
- Stripe: `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET`
- Gemini: `GEMINI_API_KEY`, `GEMINI_MODEL`
- Contact email: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`

## Current Behavioral Rules

- The platform currently behaves as a single-role app: all users are treated as `student`.
- Any authenticated user can create trivia sessions.
- Learning module create/update/delete routes are present but intentionally disabled for all users.
- Custom challenge creation is intentionally disabled for all users.
- Same-school access is the privacy boundary for cross-user stats.
- Verified trivia result submission is tied to finished server-side sessions.

## Related Docs

- `backend/README.md`
- `backend/docs/API_DOCUMENTATION.md`
- `backend/docs/SOCKETS-API.md`
- `backend/docs/SETUP_GUIDE.md`
- `backend/docs/ops-testing-runbook.md`
