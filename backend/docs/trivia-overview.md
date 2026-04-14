# Trivia System Overview (Current)

This file replaces the old frontend-discovery report that described mock-data-only trivia.

## Current Status

Trivia is implemented with:
- REST endpoints under `/api/trivia/*`
- Socket.IO events for real-time gameplay
- Clerk-authenticated access
- MongoDB persistence for sessions and results
- separate verified result submission under `/api/game/result`

## Frontend Trivia Surface

- `frontend/app/dashboard/trivia/page.tsx`
- `frontend/app/dashboard/trivia/create/page.tsx`
- `frontend/app/dashboard/trivia/play/[code]/page.tsx`
- `frontend/app/dashboard/trivia/host/[sessionId]/page.tsx`
- `frontend/app/dashboard/trivia/session/[sessionId]/results/page.tsx`

## Backend Trivia Surface

- Routes: `backend/src/routes/triviaRoutes.js`
- Socket handlers: `backend/src/sockets/triviaSocketHandlers.js`
- Core game logic: `backend/src/controllers/triviaGameController.js`
- Verified result controller: `backend/src/controllers/gameController.js`

## Operational Requirements

- Backend must be reachable from frontend via `NEXT_PUBLIC_BACKEND_URL`.
- Backend CORS env vars must include frontend URL:
  - `NEXT_PUBLIC_APP_URL`
  - `FRONTEND_URL`
- Clerk keys must be configured in both services.

## Source of Truth

- REST details: `backend/docs/API_DOCUMENTATION.md`
- Socket event contract: `backend/docs/SOCKETS-API.md`
- Runtime composition: `backend/src/server.js`
- Result verification rules: `backend/src/controllers/gameController.js`
