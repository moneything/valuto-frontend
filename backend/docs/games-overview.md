# Games & Features Overview

## Executive Summary
This document provides a comprehensive analysis of all game-related features, scoring systems, and backend integration requirements for the Valuto financial education platform.

---

## 1. Existing Games & Interactive Modules

### 1.1 **Trivia Games** (Kahoot-Style Quiz System)
- **Location**: `frontend/app/dashboard/trivia/`
- **Components**:
  - Main Hub: `page.tsx` - Game listing and join interface
  - Create Game: `create/page.tsx` - Teacher game creation interface
  - Play Game: `play/[code]/page.tsx` - Real-time game play interface

**Key Features**:
- Teacher creates games with multiple-choice questions
- Students join using 6-character game codes (e.g., ABC123)
- Timer-based questions (10-120 seconds per question)
- Point system based on correctness and speed
- End-of-game results with percentage scores

**Data Storage Needs**:
- Game metadata (title, code, creator, status, participant count)
- Questions (text, options, correct answer, points, time limit)
- Game results (user ID, game ID, score, accuracy, timestamp)
- Real-time participant data

**Current State**: Uses mock data from `lib/mockData.ts`

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

**Current State**: Mock data with completed flags, no actual progress tracking

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

### 1.5 **Daily Challenges**
- **Location**: `frontend/app/dashboard/challenges/page.tsx`

**Challenge Types**:
- Daily Trivia (50 points)
- Learning Streak - 3 lessons/week (200 points)
- Calculator Expert - 5 uses (100 points)

**Data Storage Needs**:
- Challenge completion status per user per day
- Streak tracking
- Bonus points earned

**Current State**: Hardcoded mock challenges with static completion flags

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

**Current State**: Mock data with 5 hardcoded users

---

## 2. Current Score & Progress Tracking

### 2.1 **Point Sources**
Based on code analysis, users earn points from:
- **Trivia Games**: 100 points per correct answer (varies by question)
- **Daily Challenges**: 50-200 points per challenge
- **Learning Modules**: Points for completion (not explicitly defined in code)

### 2.2 **Profile Statistics** (from `dashboard/profile/page.tsx`)
Currently displaying:
- Total Points: 2,450
- Games Played: 12
- Lessons Completed: 8/20
- Average Score: 85%
- Current Streak: 3 days
- Class Rank: #15

**All currently hardcoded - needs backend integration**

---

## 3. Data Models Needed

### 3.1 **User Profile** (from `lib/localStorage.ts`)
```typescript
{
  userId: string (Clerk ID)
  name: string
  email: string
  role: 'student' | 'teacher'
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
}
```

### 3.2 **Game Result**
```typescript
{
  gameResultId: string
  userId: string
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

### 5.1 **HIGH PRIORITY**
- ✅ User profile CRUD with Clerk integration
- ✅ Trivia game creation and retrieval
- ✅ Game result submission and storage
- ✅ Leaderboard aggregation API
- ✅ Points calculation and tracking

### 5.2 **MEDIUM PRIORITY**
- ✅ Learning module progress tracking
- ✅ Challenge completion tracking
- ✅ User statistics aggregation

### 5.3 **LOW PRIORITY** (future enhancements)
- Real-time game synchronization (WebSocket)
- AI chat backend integration
- Advanced analytics and reporting
- Social features (friend lists, etc.)

---

## 6. Current Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Auth**: Clerk (already integrated)
- **State**: React Context API (`lib/userContext.tsx`)
- **Storage**: localStorage (temporary)
- **Styling**: Tailwind CSS

### Backend (To Be Built)
- **Runtime**: Node.js + Express
- **Database**: MongoDB
- **Auth**: Clerk Server SDK
- **Architecture**: MVC pattern

---

## 7. Recommendations

1. **Immediate Action**: Build REST API with the following endpoints:
   - `POST /api/auth/verify` - Verify Clerk tokens
   - `GET/POST /api/user` - User profile management
   - `POST /api/game` - Submit game results
   - `GET /api/leaderboard` - Retrieve rankings
   - `GET/POST /api/progress` - Learning progress

2. **Data Migration**: Replace all mock data and localStorage calls with API calls

3. **Real-time Features**: Consider WebSocket implementation for live trivia games (Phase 2)

4. **Analytics**: Add event tracking for user engagement metrics

---

## Summary Statistics

- **Total Game Types**: 3 (Trivia, Learning Modules, Challenges)
- **Total Learning Modules**: 9 modules with 25+ lessons
- **Mock Games Available**: 4 trivia games
- **Point-Earning Activities**: 5+ types
- **Pages Needing Backend**: 10+ routes
- **Current Data**: 100% mock/localStorage
- **Authentication**: ✅ Clerk (production-ready)

---

**Document Version**: 1.0  
**Last Updated**: October 22, 2025  
**Author**: Senior Full-Stack Engineer

