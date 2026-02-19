# Executive Summary

Valuto is a two-service application:
- `frontend/`: Next.js 14 app
- `backend/`: Express API + Socket.IO + MongoDB

## Current Outcome

The backend/frontend integration is active and supports:
- Clerk-authenticated user lifecycle and profile sync
- Learning modules and progress tracking
- Challenges and leaderboards
- Trivia game flow with REST + real-time socket events
- Billing endpoints (Stripe) and AI chat endpoint (Gemini) when configured

## Deployment Model

- Frontend: Railway (`frontend` root)
- Backend: Railway (`backend` root)
- Database: MongoDB Atlas
- Auth: Clerk

## Risks to Watch

- Missing `NEXT_PUBLIC_BACKEND_URL` in frontend environments can cause calls to wrong fallback ports.
- CORS misconfiguration on backend (`NEXT_PUBLIC_APP_URL` / `FRONTEND_URL`) can block API and socket traffic.
- Stripe webhook verification fails if `STRIPE_WEBHOOK_SECRET` is missing/mismatched.

## Operational Priorities

1. Keep environment variables explicit in every environment.
2. Validate health endpoint and trivia socket flow after each deployment.
3. Keep API and route docs aligned with `src/server.js` and `src/routes/*`.

## Source of Truth

For implementation details, use:
- `backend/src/server.js`
- `backend/src/routes/*`
- `backend/docs/API_DOCUMENTATION.md`
- `backend/docs/SOCKETS-API.md`
