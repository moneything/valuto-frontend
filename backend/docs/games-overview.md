# Games & Features Overview

## Executive Summary
This document provides a comprehensive analysis of all game-related features, scoring systems, and backend integration requirements for the Valuto financial education platform.

---

## 1. Existing Games & Interactive Modules

### 1.1 **Trivia Games** (Kahoot-Style Quiz System)
- **Location**: `frontend/app/dashboard/trivia/`
- **Components**:
  - Main Hub: `page.tsx` - Game listing and join interface
  - Create Game: `create/page.tsx` - Authenticated user game creation interface
  - Play Game: `play/[code]/page.tsx` - Real-time game play interface

**Key Features**:
- Any authenticated user can create games with multiple-choice questions
- Players join using 6-character game codes (e.g., ABC123)
- Timer-based questions (10-120 seconds per question)
- Point system based on correctness and speed
- End-of-game results with percentage scores

**Data Storage Needs**:
- Game metadata (title, code, creator, status, participant count)
- Questions (text, options, correct answer, points, time limit)
- Game results (user ID, game ID, score, accuracy, timestamp)
- Real-time participant data

**Current State**: Backed by live session, result, and leaderboard APIs

---

### 1.2 **Investment Calculator**
- **Location**: `frontend/app/dashboard/calculator/page.tsx`
- **Type**: Educational tool (not a scored game)

**Key Features**:
- Compound interest calculations
- Interactive sliders for inputs
- Real-time result visualization
- Achievement unlocks (e.g., "Future Millionaire" at £50K+)

**Data Storage Needs**:
- Usage tracking (number of times used per user)
- Calculator session data (for challenges/achievements)
- Optional: Save calculations for later reference

**Current State**: Client-side only, no backend tracking

---

### 1.3 **Learning Modules**
- **Location**: `frontend/app/dashboard/learn/`
- **Components**:
  - Module Hub: `page.tsx` - Module listing with progress
  - Individual Module: `[topic]/page.tsx` - Lesson content with quizzes

**Available Modules** (9 total):
1. Stocks & Shares (Beginner, 15 min)
2. Bonds & Fixed Income (Beginner, 12 min)
3. ETFs & Index Funds (Intermediate, 18 min)
4. Risk Management (Intermediate, 20 min)
5. Compound Interest (Beginner, 10 min)
6. Portfolio Diversification (Advanced, 25 min)
7. Cryptocurrency Basics (Intermediate, 20 min)
8. Real Estate Investing (Intermediate, 22 min)
9. Retirement Planning (Beginner, 18 min)

**Key Features**:
- Multi-lesson structure with 3-5 lessons per module
- Quiz at end of each lesson
- Progress tracking per module
- Difficulty levels (Beginner, Intermediate, Advanced)

**Data Storage Needs**:
- Module completion status per user
- Lesson progress within modules
- Quiz results (correct/incorrect answers)
- Time spent on each module
- Overall learning progress percentage

**Current State**: Read/progress flows are live; create/update/delete mutations are disabled for all users

---

### 1.4 **AI Chat Assistant** ("Valuto AI")
- **Location**: `frontend/app/dashboard/ai-chat/page.tsx`
- **Type**: Educational support tool

**Key Features**:
- Financial advice chatbot
- Pre-programmed responses for common topics
- Message history within session

**Data Storage Needs**:
- Conversation history per user
- Usage analytics (topics discussed, messages sent)
- Popular questions/topics

**Current State**: Client-side simulation with hardcoded responses

---

### 1.5 **Daily, Weekly and Monthly Challenges**
- **Location**: `frontend/app/dashboard/challenges/page.tsx`

**Challenge Types**:
- Daily Trivia (50 points)
- Learning Streak - 3 lessons/week (200 points)
- Calculator Expert - 5 uses (100 points)
- Monthly Build Your Life
- Monthly Build Your Business
- Monthly Investment Simulation

**Data Storage Needs**:
- Challenge completion status per user per day
- Streak tracking
- Bonus points earned

**Current State**: Live challenge seeding, completion tracking, and once-only reward claims

---

### 1.6 **Leaderboard**
- **Location**: `frontend/app/dashboard/leaderboard/page.tsx`

**Key Features**:
- Global ranking by total points
- Display: rank, name, school, points

**Data Storage Needs**:
- Aggregated user points from all activities
- School/class filtering capability
- Historical ranking data

**Current State**: Live aggregated leaderboard with public email stripping

---

## 2. Current Score & Progress Tracking

### 2.1 **Point Sources**
Based on code analysis, users earn points from:
- **Trivia Games**: 100 points per correct answer (varies by question)
- **Daily and Weekly Challenges**: 50-200 points per challenge
- **Learning Modules**: Points for completion (not explicitly defined in code)

### 2.2 **Profile Statistics** (from `dashboard/profile/page.tsx`)
Currently displaying:
- Total Points: 2,450
- Games Played: 12
- Lessons Completed: 8/20
- Average Score: 85%
- Current Streak: 3 days
- Class Rank: #15

These stats are now generated from live backend user, game, learning, and challenge data.

---

## 3. Data Models Needed

### 3.1 **User Profile** (from `lib/localStorage.ts`)
```typescript
{
  userId: string (Clerk ID)
  name: string
  email: string
  role: 'student'
  age?: number
  school?: string
  grade?: string
  subject?: string
  completedOnboarding: boolean
  createdAt: string
  
  // Additional fields for backend:
  totalPoints: number
  gamesPlayed: number
  lessonsCompleted: number
  currentStreak: number
  lastActiveDate: string
  longestStreak: number
}
```

### 3.2 **Game Result**
```typescript
{
  gameResultId: string
  userId: string
  clerkUserId: string
  sessionId: string
  gameId: string
  gameCode: string
  gameTitle: string
  score: number
  maxPossibleScore: number
  accuracy: number (percentage)
  questionsAnswered: number
  correctAnswers: number
  timeTaken: number (seconds)
  completedAt: string
}
```

### 3.3 **Learning Progress**
```typescript
{
  progressId: string
  userId: string
  moduleId: string
  lessonId: string
  completed: boolean
  quizScore?: number
  timeSpent: number (seconds)
  lastAccessedAt: string
  completedAt?: string
}
```

### 3.4 **Challenge Completion**
```typescript
{
  challengeId: string
  userId: string
  challengeType: string
  completedAt: string
  pointsEarned: number
  rewardGranted: boolean
  rewardedAt?: string
}
```

---

## 4. Routes Requiring Backend Integration

### 4.1 **Critical Routes** (immediate backend needs)
1. `/dashboard` - Needs real user stats
2. `/dashboard/trivia` - Needs game CRUD operations
3. `/dashboard/trivia/play/[code]` - Needs real-time game state
4. `/dashboard/leaderboard` - Needs aggregated user data
5. `/dashboard/profile` - Needs complete user profile and stats
6. `/dashboard/learn/[topic]` - Needs progress tracking

### 4.2 **Secondary Routes** (can work with minimal backend)
1. `/dashboard/calculator` - Only needs usage tracking
2. `/dashboard/ai-chat` - Can work client-side initially
3. `/dashboard/challenges` - Needs completion tracking

---

## 5. Backend Integration Gaps & Priorities

### 5.1 **Implemented**
- ✅ User profile CRUD with Clerk integration
- ✅ Single-role onboarding flow
- ✅ Same-school stats access boundary
- ✅ Trivia session creation and retrieval
- ✅ Verified game result submission from finished sessions
- ✅ Duplicate result protection per `clerkUserId + sessionId`
- ✅ Leaderboard aggregation with email stripping on public endpoints
- ✅ Daily, weekly, and monthly challenge seeding
- ✅ One-time challenge reward claiming
- ✅ User statistics aggregation

### 5.2 **Operational Tooling**
- ✅ Single-role migration script
- ✅ Single-role verification script
- ✅ Post-deploy smoke script
- ✅ Real-Mongo and concurrency test coverage

### 5.3 **LOW PRIORITY** (future enhancements)
- Real-time game synchronization (WebSocket)
- AI chat backend integration
- Advanced analytics and reporting
- Social features (friend lists, etc.)

---

## 6. Current Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Auth**: Clerk (already integrated)
- **State**: React Context API (`lib/userContext.tsx`)
- **Storage**: Mixed backend APIs plus local cached profile state where needed
- **Styling**: Tailwind CSS

### Backend
- **Runtime**: Node.js + Express
- **Database**: MongoDB
- **Auth**: Clerk Server SDK
- **Architecture**: MVC pattern

---

## 7. Recommendations

1. **Operational Action**: Rehearse `migrate:single-role` and `verify:single-role` against staging before production rollout.
2. **Testing Action**: Run `test:real-mongo` against a disposable Mongo instance to exercise unique result/session and one-time reward behavior.
3. **Frontend Action**: Replace the remaining client-side mock flows where still present, especially AI chat simulation and any residual mock dashboard widgets.
4. **Analytics**: Add event tracking for user engagement metrics.

---

## Summary Statistics

- **Total Game Types**: 3 (Trivia, Learning Modules, Challenges)
- **Total Learning Modules**: 9 modules with 25+ lessons
- **Mock Games Available**: 4 trivia games
- **Point-Earning Activities**: 5+ types
- **Pages Needing Backend**: 10+ routes
- **Current Data**: Core trivia, leaderboard, profile, challenge, and learning progress flows are backend-backed
- **Authentication**: ✅ Clerk (production-ready)
- **Single-Role Migration**: ✅ Implemented with verification and smoke tooling

---

**Document Version**: 1.1  
**Last Updated**: April 14, 2026  
**Author**: Senior Full-Stack Engineer
