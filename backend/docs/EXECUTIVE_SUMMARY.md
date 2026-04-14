# Executive Summary

Valuto is a two-service application:
- `frontend/`: Next.js 15 app
- `backend/`: Express API + Socket.IO + MongoDB

## Current Outcome

The current platform supports:
- Clerk-authenticated onboarding and profile sync
- a single effective user role (`student`)
- same-school privacy boundaries for cross-user stats
- learning modules and progress tracking
- daily, weekly, and monthly challenges
- trivia game creation, live play, verified result submission, and leaderboards
- billing endpoints (Stripe), AI chat (Gemini), and contact email delivery when configured

## Security/Integrity Highlights

- verified trivia results must come from a finished server-side session
- results are deduplicated per `clerkUserId + sessionId`
- public leaderboard endpoints strip email addresses
- challenge rewards are awarded once, including duplicate/concurrent request paths
- school is locked after first set and used as the stats-sharing boundary
- contact form input is sanitized and validated before mail delivery is attempted

## Deployment Model

- Frontend: Railway
- Backend: Railway
- Database: MongoDB Atlas or equivalent managed MongoDB
- Auth: Clerk

## Operational Priorities

1. Keep `NEXT_PUBLIC_BACKEND_URL`, `NEXT_PUBLIC_APP_URL`, and `FRONTEND_URL` explicit in every environment.
2. Rehearse `migrate:single-role` and `verify:single-role` on staging before production changes.
3. Run `smoke:post-deploy` after deploys.
4. Use `test:real-mongo` when validating race-sensitive persistence behavior.

## Primary Risks to Watch

- missing or incorrect frontend/backend base URLs
- CORS/socket origin env mismatch blocking API or live trivia traffic
- missing Stripe, Gemini, or SMTP/contact env vars for optional features
- running production without rehearsing single-role migration and smoke checks

## Source of Truth

For implementation details, use:
- `backend/src/server.js`
- `backend/src/routes/*`
- `backend/src/controllers/*`
- `backend/docs/API_DOCUMENTATION.md`
- `backend/docs/ops-testing-runbook.md`
