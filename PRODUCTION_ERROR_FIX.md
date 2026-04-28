# Production Notes

This file now serves as a current-state production note instead of the old one-off learning-module 404 fix report.

## Current Production-Critical Behaviors

- Frontend must set `NEXT_PUBLIC_BACKEND_URL` explicitly.
- Backend CORS must allow the deployed frontend origin via:
  - `NEXT_PUBLIC_APP_URL`
  - `FRONTEND_URL`
- Backend CORS must also allow server-to-server requests with no `Origin` header for Stripe webhook delivery.
- Trivia result submission is verified against a finished server-side session.
- Public leaderboard endpoints strip email addresses.
- Cross-user stats access is restricted by same-school membership.
- Learning module create/update/delete routes are disabled for all users.
- Custom challenge creation is disabled for all users.
- Contact form delivery requires SMTP/contact env vars on the backend.
- Most authenticated app routes now require an active subscription and redirect unsubscribed users to `/subscribe`.

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
2. Sign in with a new or unsubscribed account and confirm redirect to `/subscribe`.
3. Sign in with a subscribed account and open the dashboard.
4. Open learning modules.
5. Create a trivia session.
6. Open leaderboard.
7. Open challenges.
8. If Stripe is enabled, verify recent webhook deliveries succeed in the Stripe Dashboard.
9. If applicable, submit a verified trivia result from a finished session.
10. If SMTP is configured, submit a contact-form test message.

## Railway

For production/staging operational checks, use:

```bash
cd backend
npm run smoke:post-deploy
```

See:
- `backend/docs/ops-testing-runbook.md`
- `DEPLOYMENT_CHECKLIST.md`
