# Frontend Deployment Guide

Last validated against code: February 19, 2026


Current deployment guide for `frontend/`.

## Platform

Deploy on Vercel with:
- Framework: Next.js
- Root Directory: `frontend`

## Required Environment Variables

Set in Vercel Project Settings:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
```

Optional:

```env
NEXT_PUBLIC_APP_URL=https://your-frontend.vercel.app
```

Important: always set `NEXT_PUBLIC_BACKEND_URL` explicitly.

## Deploy Steps

1. Import repository into Vercel.
2. Set Root Directory to `frontend`.
3. Add environment variables above.
4. Deploy.
5. Redeploy after any env var changes.

## Validation Checklist

- Sign-in/sign-up works.
- Dashboard profile and stats load.
- Learning modules/challenges/leaderboards load.
- Trivia create/join/play works with live backend.
- Browser console has no CORS/auth errors.

## Troubleshooting

### API calls failing or hitting wrong host
- Confirm `NEXT_PUBLIC_BACKEND_URL` is set for Preview + Production.
- Rebuild/redeploy frontend.

### CORS or socket connection failures
- Confirm backend env vars match frontend URL:
  - `NEXT_PUBLIC_APP_URL`
  - `FRONTEND_URL`
