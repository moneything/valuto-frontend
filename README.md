# Valuto - Financial Education Platform

Monorepo for the Valuto product with:
- `frontend/`: Next.js 14 App Router app
- `backend/`: Express + MongoDB API with Socket.IO

## Repository Layout

```text
valuto-frontend/
├── frontend/                      # Next.js client app
├── backend/                       # Express API + Socket.IO
├── README.md
├── frontend/README.md
└── backend/README.md
```

## Current Stack

Frontend:
- Next.js 14
- React 18 + TypeScript
- Tailwind CSS
- Clerk (`@clerk/nextjs`)
- Socket.IO client

Backend:
- Node.js + Express
- MongoDB + Mongoose
- Clerk server SDK (`@clerk/clerk-sdk-node`)
- Socket.IO
- Stripe (billing)
- Google Gemini API

## Local Development

This repo does not use a root workspace script. Run each service in its own terminal.

### 1) Start backend

```bash
cd backend
npm install
npm run dev
```

Backend defaults to `http://localhost:5000`.

### 2) Start frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`.

## Environment Setup

### Backend (`backend/.env`)

Required for normal local use:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/valuto-dev
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```

Optional features:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Gemini
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-1.5-flash
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Important: set `NEXT_PUBLIC_BACKEND_URL` explicitly. Some frontend files still include mixed fallback ports (`5000`/`5001`), so this variable should always be defined.

## Service URLs

- Frontend: `http://localhost:3000`
- Backend root: `http://localhost:5000/`
- Backend health: `http://localhost:5000/api/health`

## Additional Docs

- `frontend/README.md`
- `backend/README.md`
- `FRONTEND_INTEGRATION_GUIDE.md`
- `DEPLOYMENT_CHECKLIST.md`
