# Project Documentation Status Report

This file replaces the old dated completion report with a maintenance-oriented status snapshot.

## Current State

The repository currently contains:
- Frontend app in `frontend/` (Next.js 15)
- Backend API + Socket.IO in `backend/` (Express + MongoDB)
- Clerk auth integration across both services
- Current-state documentation for setup, deployment, REST APIs, and Socket.IO trivia

## Canonical Setup Docs

- `README.md`
- `frontend/README.md`
- `backend/README.md`
- `backend/docs/SETUP_GUIDE.md`
- `DEPLOYMENT_CHECKLIST.md`

## Canonical API Docs

- `backend/docs/API_DOCUMENTATION.md`
- `backend/docs/SOCKETS-API.md`
- `backend/docs/trivia-overview.md`

## Maintenance Rules

1. Treat code as source of truth over narrative docs.
2. When routes/env vars/scripts change, update docs in the same PR.
3. Keep environment examples explicit (`NEXT_PUBLIC_BACKEND_URL`, Clerk keys, CORS vars).
4. Avoid dated “complete” claims; prefer current-state documentation.
5. Prefer operational summaries over planning documents once features are live.
