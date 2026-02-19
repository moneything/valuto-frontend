# Valuto Backend API

Express + MongoDB backend for Valuto, with Clerk auth, Socket.IO trivia, Stripe billing, and Gemini chat.

## Tech

- Node.js (CommonJS)
- Express
- MongoDB + Mongoose
- Clerk server SDK
- Socket.IO
- Stripe
- Google Generative AI (Gemini)

## Scripts

From `backend/`:

```bash
npm run dev
npm start
npm run format
npm run format:check
npm test
```

## Environment

Create `backend/.env`.

Core:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/valuto-dev
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```

Optional:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Gemini
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-1.5-flash
```

## Run Locally

```bash
cd backend
npm install
npm run dev
```

- Server root: `http://localhost:5000/`
- API health: `http://localhost:5000/api/health`

## Route Mounts (Current)

Mounted in `src/server.js`:
- `/api/auth`
- `/api/user`
- `/api/game`
- `/api/leaderboard`
- `/api/learning`
- `/api/challenges`
- `/api/trivia`
- `/api/news`
- `/api/categories`
- `/api/billing`
- `/api/ai`
- `/api/webhooks`

Special handling:
- `POST /api/billing/webhook` uses raw body middleware for Stripe signature verification.

## Realtime

Socket.IO is initialized on the same HTTP server and currently used for trivia session gameplay.

## Structure

```text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── sockets/
│   ├── utils/
│   └── server.js
├── docs/
└── package.json
```
