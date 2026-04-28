# Access And Billing Flow

Current source-of-truth for how users move through auth, onboarding, subscription gating, and Stripe billing.

## Public Routes

These pages are accessible without authentication:

- `/`
- `/about`
- `/features`
- `/contact`
- `/pricing`
- `/privacy-policy`
- `/terms-and-conditions`

## Authenticated Flow

1. A user opens a protected app route.
2. Clerk middleware requires sign-in.
3. After sign-in, the frontend loads the backend user profile.
4. If onboarding is incomplete, the user is redirected to `/onboarding`.
5. If onboarding is complete but subscription is not `active` or `trialing`, the user is redirected to `/subscribe`.
6. Subscribed users continue into the protected app route.

## Subscription-Exempt Routes

These routes remain reachable after sign-in even without an active subscription:

- `/auth/[[...rest]]`
- `/sign-in/[[...sign-in]]`
- `/sign-up/[[...sign-up]]`
- `/onboarding`
- `/subscribe`

## App-Wide Paywall

- The paywall is no longer scoped to selected modules.
- It applies across protected app routes.
- Public marketing pages remain outside the paywall.

## Stripe Billing Endpoints

Backend routes:

- `POST /api/billing/checkout`
- `POST /api/billing/portal`
- `POST /api/billing/webhook`

Behavior:

- Checkout starts a Stripe subscription flow.
- Billing portal opens Stripe billing management for existing customers.
- Webhook events update backend subscription state.

## Stripe Webhook Requirements

- `STRIPE_SECRET_KEY` must be set for billing features.
- `STRIPE_PRICE_ID` must be set for checkout.
- `STRIPE_WEBHOOK_SECRET` must match the Stripe endpoint secret.
- The webhook endpoint is mounted directly in `backend/src/server.js`.
- Webhook signature verification depends on raw request body handling.
- Stripe deliveries may have no browser `Origin` header.

## Key Frontend Files

- `frontend/proxy.ts`
- `frontend/lib/userContext.tsx`
- `frontend/lib/subscriptionAccess.ts`
- `frontend/components/SubscriptionGate.tsx`
- `frontend/app/subscribe/page.tsx`

## Key Backend Files

- `backend/src/server.js`
- `backend/src/controllers/billingController.js`
- `backend/src/routes/billingRoutes.js`
