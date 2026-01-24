# Valuto Frontend

Next.js 14 (App Router) frontend for the Valuto financial education platform.

## Features

- Marketing home page with branded sections
- Clerk authentication and user context
- Authenticated dashboard shell (subscription-gated)
- Onboarding and subscription pages
- News & events feed UI (consumes backend `/api/news`)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Clerk authentication
- Framer Motion
- Socket.IO client (for trivia)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
cd frontend
npm install
```

### Environment Variables

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

### Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## Project Structure

```
frontend/
├── app/
│   ├── page.tsx               # Marketing homepage
│   ├── dashboard/             # Authenticated dashboard shell
│   ├── onboarding/            # Onboarding flow
│   ├── subscribe/             # Subscription flow
│   └── layout.tsx             # Clerk + user context provider
├── components/                # UI components
├── lib/                       # API clients, context, helpers
└── public/                    # Static assets
```

## Deployment

This app is configured for Vercel. Set the root directory to `frontend` and define the same environment variables in your hosting provider.

