# Production Notes

This file now serves as a current-state production note instead of the old one-off learning-module 404 fix report.

## Current Production-Critical Behaviors

- Frontend must set `NEXT_PUBLIC_BACKEND_URL` explicitly.
- Backend CORS must allow the deployed frontend origin via:
  - `NEXT_PUBLIC_APP_URL`
  - `FRONTEND_URL`
- Trivia result submission is verified against a finished server-side session.
- Public leaderboard endpoints strip email addresses.
- Cross-user stats access is restricted by same-school membership.
- Learning module create/update/delete routes are disabled for all users.
- Custom challenge creation is disabled for all users.

## Learning Modules

The original route mismatch (`/api/learning-modules/*` vs `/api/learning/*`) has been resolved in the current codebase.

Current learning API shape:

```text
/api/learning/
├── modules/
│   ├── GET /
│   └── GET /:id
└── progress/
    ├── POST /
    ├── GET /
    ├── GET /:moduleId
    ├── PUT /time/:moduleId
    ├── GET /leaderboard/:moduleId
    └── GET /stats
```

Mutation routes still exist in the backend surface, but module creation, update, and deletion are intentionally disabled for all users.

## Recommended Production Checks

After each deploy:

1. Load `/api/health`.
2. Sign in and open the dashboard.
3. Open learning modules.
4. Create a trivia session.
5. Open leaderboard.
6. Open challenges.
7. If applicable, submit a verified trivia result from a finished session.

## Railway

For production/staging operational checks, use:

```bash
cd backend
npm run smoke:post-deploy
```

See:
- `backend/docs/ops-testing-runbook.md`
- `DEPLOYMENT_CHECKLIST.md`
