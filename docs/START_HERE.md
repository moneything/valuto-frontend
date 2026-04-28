# Start Here

Shortest path for a new developer to get Valuto running locally and understand the current access model.

## What This Repo Is

- `frontend/`: Next.js 15 app
- `backend/`: Express + MongoDB API with Socket.IO
- Clerk handles authentication
- Stripe handles subscriptions and billing

## Local Setup In 10 Minutes

1. Install dependencies.

```bash
cd backend && npm install
cd ../frontend && npm install
```

2. Create `backend/.env`.

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/valuto-dev
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```

3. Create `frontend/.env.local`.

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

4. Start backend.

```bash
cd backend
npm run dev
```

5. Start frontend.

```bash
cd frontend
npm run dev
```

6. Open:
- frontend: `http://localhost:3000`
- backend health: `http://localhost:5000/api/health`

## First Things To Verify

1. Sign in through Clerk.
2. Confirm a new account is redirected to `/onboarding`.
3. Complete onboarding.
4. Confirm an unsubscribed account is redirected to `/subscribe`.
5. Confirm a subscribed account can reach `/dashboard`.

## Current Access Model

- Public marketing pages are open without auth.
- All other app routes require Clerk authentication.
- Onboarding must be completed before the main app is available.
- Most authenticated app routes also require an active or trialing subscription.
- `/subscribe` is authenticated but exempt from the subscription gate.

## Most Useful Docs

- `README.md`
- `docs/ACCESS_AND_BILLING_FLOW.md`
- `backend/docs/SETUP_GUIDE.md`
- `frontend/docs/APP_GUIDE.md`
- `DEPLOYMENT_CHECKLIST.md`

## Common Gotchas

- Always set `NEXT_PUBLIC_BACKEND_URL` explicitly.
- Backend CORS depends on both `NEXT_PUBLIC_APP_URL` and `FRONTEND_URL`.
- Stripe webhooks require `STRIPE_WEBHOOK_SECRET` on the backend.
- Stripe webhook deliveries are server-to-server and may arrive without an `Origin` header.
