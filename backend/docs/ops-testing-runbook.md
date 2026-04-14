# Ops Testing Runbook

## Real Mongo integration tests

Use a disposable Mongo instance and set `MONGODB_URI_TEST`.

Example:

```bash
cd backend
MONGODB_URI_TEST="mongodb://127.0.0.1:27017/valuto_real_mongo_tests" npm run test:real-mongo
```

These tests verify:
- unique `GameResult` per `clerkUserId + sessionId`
- one-time `rewardGranted` challenge awards
- daily/monthly challenge seeding with real persistence
- concurrent result/challenge submissions awarding once

## Staging single-role verification

Run against the staging database after `migrate:single-role`.

```bash
cd backend
MONGODB_URI="your-staging-uri" npm run verify:single-role
```

This verifies:
- all users are now `student`
- role counts
- users without school
- top school buckets for spot-checking

## Railway post-deploy smoke checks

Set:
- `SMOKE_BASE_URL`
- `SMOKE_BEARER_TOKEN`
- optionally `SMOKE_SAME_SCHOOL_USER_ID`
- optionally `SMOKE_VERIFIED_SESSION_ID` or `SMOKE_VERIFIED_GAME_CODE`
- optionally `SMOKE_ALLOW_PROFILE_UPDATE=true`
- optionally `SMOKE_PROFILE_TITLE`

Use a backend base URL without a trailing `/api`, because the script appends API paths itself.

Run:

```bash
cd backend
SMOKE_BASE_URL="https://your-app.up.railway.app" \
SMOKE_BEARER_TOKEN="your-clerk-jwt" \
SMOKE_SAME_SCHOOL_USER_ID="mongo-user-id" \
SMOKE_VERIFIED_SESSION_ID="finished-session-id" \
npm run smoke:post-deploy
```

Checks:
- get profile
- optional profile update
- same-school stats
- trivia session creation
- verified game result submission
- leaderboard
- challenges

If contact delivery is configured separately, test `/api/contact` as a manual verification step rather than part of the smoke script.

## Browser e2e smoke

Install frontend dependencies first.

Set:
- `PLAYWRIGHT_STORAGE_STATE` to a signed-in Clerk storage-state file
- optionally `PLAYWRIGHT_BASE_URL`

Run:

```bash
cd frontend
npm install
npm run test:e2e
```

Current smoke coverage:
- onboarding page
- dashboard load
- trivia create page
- challenges page
- featured games pages
