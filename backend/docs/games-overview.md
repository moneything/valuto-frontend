# Games & Interactive Features Overview

Current-state overview of the interactive product surface in this repository.

## Core Interactive Areas

### Trivia

- Frontend routes:
  - `frontend/app/dashboard/trivia/page.tsx`
  - `frontend/app/dashboard/trivia/create/page.tsx`
  - `frontend/app/dashboard/trivia/play/[code]/page.tsx`
  - `frontend/app/dashboard/trivia/host/[sessionId]/page.tsx`
  - `frontend/app/dashboard/trivia/session/[sessionId]/results/page.tsx`
- Backend:
  - REST routes in `backend/src/routes/triviaRoutes.js`
  - Socket handlers in `backend/src/sockets/triviaSocketHandlers.js`
  - Core runtime logic in `backend/src/controllers/triviaGameController.js`
- Current behavior:
  - Any authenticated user can create a session
  - Players join with a 6-character code
  - Question flow, answer handling, and leaderboard updates are real-time over Socket.IO
  - Verified result submission is tied to a finished server-side session

### Learning Modules

- Frontend routes:
  - `frontend/app/dashboard/learning-modules/page.tsx`
  - `frontend/app/dashboard/learning-modules/[moduleId]/page.tsx`
- Backend:
  - Content and progress routes in `backend/src/routes/learningRoutes.js`
  - Progress logic in `backend/src/controllers/learningController.js`
- Current behavior:
  - Module list and module detail flows are live
  - Progress, quiz score, time spent, and learning stats are persisted
  - Create/update/delete routes exist in the API surface but are intentionally disabled for all users

### Challenges

- Frontend route: `frontend/app/dashboard/challenges/page.tsx`
- Backend:
  - Routes in `backend/src/routes/challengeRoutes.js`
  - Logic in `backend/src/controllers/challengeController.js`
- Current behavior:
  - Daily, weekly, and monthly challenge flows are live
  - Challenge seeding/backfill happens server-side
  - Rewards are guarded against duplicate or concurrent claims
  - Direct manual progress updates are limited to featured monthly challenge types

### Leaderboard

- Frontend route: `frontend/app/dashboard/leaderboard/page.tsx`
- Backend:
  - Routes in `backend/src/routes/leaderboardRoutes.js`
  - Aggregation logic in `backend/src/controllers/leaderboardController.js`
- Current behavior:
  - Global, school, top-performer, and context-aware leaderboard views are live
  - Public responses do not expose email addresses

### AI Chat

- Frontend route: `frontend/app/dashboard/ai-chat/page.tsx`
- Backend:
  - Route in `backend/src/routes/aiRoutes.js`
  - Controller in `backend/src/controllers/aiController.js`
- Current behavior:
  - Frontend sends authenticated requests to `/api/ai/chat`
  - Gemini configuration is required for successful responses
  - Without Gemini env vars, the endpoint returns configuration/runtime errors instead of mock responses

### Calculator and Simulations

- Frontend routes:
  - `frontend/app/dashboard/calculator/page.tsx`
  - `frontend/app/dashboard/investment/page.tsx`
  - `frontend/app/dashboard/build-your-life/page.tsx`
  - `frontend/app/dashboard/build-your-business/page.tsx`
- Current behavior:
  - These flows are primarily frontend-driven experiences
  - They may contribute to challenge flows, but they do not currently have the same persistence model as trivia or learning modules

## Current Data Ownership

- User identity and session auth: Clerk
- Persistent app data: MongoDB via Mongoose
- Real-time trivia state: Socket.IO + persisted `Session` records
- Learning progress: `LearningProgress`
- User points/streaks/activity: backend user and challenge flows

## Current Product Rules

- The product currently operates with one effective role: `student`
- Same-school access is the privacy boundary for cross-user stats
- Custom challenge creation is disabled for all users
- Learning module mutations are disabled for all users

## Source of Truth

- `backend/docs/API_DOCUMENTATION.md`
- `backend/docs/SOCKETS-API.md`
- `backend/docs/trivia-overview.md`
- `backend/src/routes/*`
- `backend/src/controllers/*`
