# Frontend API Integration Status

This file tracks current API integration status (replacing the old one-time "complete" snapshot).

## Current State

Frontend is integrated with backend APIs using `NEXT_PUBLIC_BACKEND_URL`.

Primary integration points:
- `frontend/lib/api.ts`
- `frontend/lib/userContext.tsx`
- `frontend/lib/api/*.ts`
- `frontend/lib/socket.ts`

## Functional Areas Using Live Backend

- User/profile sync (`/api/user/*`)
- Dashboard stats
- Learning modules and progress (`/api/learning/*`)
- Challenges (`/api/challenges/*`)
- Leaderboards (`/api/leaderboard/*`)
- Trivia REST + Socket.IO (`/api/trivia/*` + socket events)
- Subscription flows (`/api/billing/*`)
- AI chat (`/api/ai/chat`)

## Required Frontend Env

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Also required for auth-enabled pages:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## Integration Verification

1. Start backend and frontend.
2. Sign in and confirm user profile loads.
3. Confirm dashboard stats and leaderboard fetch successfully.
4. Create/join trivia session and validate real-time updates.

## Notes

- Some files still include fallback backend ports in code. Keep `NEXT_PUBLIC_BACKEND_URL` set in all environments to avoid mismatches.
- API endpoint details are in `backend/docs/API_DOCUMENTATION.md`.
