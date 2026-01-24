# Deployment Checklist - Valuto Real-Time Trivia System

## 📋 Production Stack

This guide uses the following production-ready stack:

| Component | Platform | Why? |
|-----------|----------|------|
| **Frontend** | Vercel | ✅ Next.js native, auto-deploy, CDN, SSL |
| **Backend** | Render.com | ✅ **WebSocket/Socket.IO support, persistent connections** |
| **Database** | MongoDB Atlas | ✅ Free tier, managed, automatic backups |
| **Auth** | Clerk | ✅ Already integrated, secure, easy setup |

**⚠️ Important:** Render.com is **required** for the backend due to Socket.IO's need for persistent WebSocket connections. Vercel's serverless functions cannot maintain the long-lived connections needed for real-time trivia gameplay.

### 🚀 Quick Deployment Flow

```
1️⃣ MongoDB Atlas (5 min)
   └─→ Create free cluster
   └─→ Create database user
   └─→ Whitelist IP (0.0.0.0/0)
   └─→ Copy connection string

2️⃣ Backend → Render.com (3 min)
   └─→ Connect GitHub repository
   └─→ Set root directory: "backend"
   └─→ Add environment variables (MongoDB URI, Clerk key)
   └─→ Deploy (automatic)
   └─→ 📝 Copy backend URL (e.g., https://valuto-backend.onrender.com)

3️⃣ Frontend → Vercel (3 min)
   └─→ Connect GitHub repository
   └─→ Set root directory: "frontend"
   └─→ Add environment variables (Backend URL from Step 2, Clerk keys)
   └─→ Deploy (automatic)
   └─→ 📝 Copy frontend URL

4️⃣ Update Backend CORS (1 min)
   └─→ Go back to Render.com
   └─→ Set NEXT_PUBLIC_APP_URL and FRONTEND_URL with the Vercel URL from Step 3
   └─→ Auto-redeploys

5️⃣ Test End-to-End (2 min)
   └─→ Visit your Vercel URL
   └─→ Login with Clerk
   └─→ Create trivia game (teacher)
   └─→ Join game in new tab (student)
   └─→ Play real-time multiplayer! 🎮
```

**Total Time:** ~15 minutes ⏱️  
**Cost:** $0 (all free tiers!) 💰

---

## 🎯 Pre-Deployment Requirements

### Backend Environment Variables (Render.com)

Add these in **Render Dashboard → Environment**:

```env
# Required
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://valutoadmin:your_password@valuto-cluster.xxxxx.mongodb.net/valuto?retryWrites=true&w=majority
CLERK_SECRET_KEY=sk_live_your_production_clerk_key_from_clerk_dashboard
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
FRONTEND_URL=https://your-app.vercel.app

# Optional
LOG_LEVEL=info
```

**Where to get these values:**
- `MONGODB_URI`: From MongoDB Atlas (see Database Setup section)
- `CLERK_SECRET_KEY`: From https://dashboard.clerk.com → API Keys
- `NEXT_PUBLIC_APP_URL`: Frontend base URL (used for billing redirects + API CORS)
- `FRONTEND_URL`: From Vercel after deploying frontend

### Frontend Environment Variables (Vercel)

Add these in **Vercel Dashboard → Project Settings → Environment Variables**:

```env
# Required
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_clerk_publishable_key
CLERK_SECRET_KEY=sk_live_your_clerk_secret_key
NEXT_PUBLIC_BACKEND_URL=https://valuto-backend.onrender.com

# Optional
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

**Where to get these values:**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: From https://dashboard.clerk.com → API Keys
- `CLERK_SECRET_KEY`: From https://dashboard.clerk.com → API Keys (same as backend)
- `NEXT_PUBLIC_BACKEND_URL`: Your Render.com backend URL (e.g., `https://valuto-backend.onrender.com`)

**⚠️ Important:** After adding environment variables in Vercel, you must redeploy:
```bash
vercel --prod
```

---

## 🚢 Backend Deployment (Render.com)

### Why Render.com for Backend?

**Required for Socket.IO/WebSocket:**
- ✅ **Persistent WebSocket connections** (critical for real-time trivia)
- ✅ Always-on server (not serverless)
- ✅ Free tier available (750 hours/month)
- ✅ Automatic SSL (https://)
- ✅ GitHub auto-deployment
- ✅ Easy environment variables
- ✅ Built-in logs and monitoring

**⚠️ Why not Vercel for backend?** Vercel uses serverless functions that spin down after requests, breaking persistent WebSocket connections needed for Socket.IO.

---

### Step-by-Step Render.com Deployment

#### Step 1: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub (recommended for easy deployment)
3. Verify your email address

#### Step 2: Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select your repository: `valuto-frontend` (or your repo name)

#### Step 3: Configure Service

**Basic Settings:**
- **Name:** `valuto-backend` (or your choice)
- **Region:** Choose closest to your users (e.g., Oregon USA, Frankfurt EU)
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

#### Step 4: Choose Plan

- **Free Plan:** ✅ Select this (750 hours/month free)
- Note: Free tier services spin down after 15 min of inactivity (first request takes 30s to wake up)
- **Upgrade to Starter ($7/mo)** for always-on service if needed

#### Step 5: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add each variable:

| Key | Value | Example |
|-----|-------|---------|
| `NODE_ENV` | `production` | `production` |
| `PORT` | `5000` | `5000` |
| `MONGODB_URI` | Your MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/valuto` |
| `CLERK_SECRET_KEY` | Your Clerk production key | `sk_live_...` |
| `NEXT_PUBLIC_APP_URL` | Your frontend base URL | `https://valuto.vercel.app` |
| `FRONTEND_URL` | Your Vercel frontend URL | `https://valuto.vercel.app` |

**Where to get these:**
- `MONGODB_URI`: From MongoDB Atlas (see Database Setup section below)
- `CLERK_SECRET_KEY`: From https://dashboard.clerk.com → API Keys
- `NEXT_PUBLIC_APP_URL`: Frontend base URL (used for billing redirects + API CORS)
- `FRONTEND_URL`: You'll add this after deploying frontend (can update later)

#### Step 6: Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Run `npm install`
   - Start your server with `npm start`
   - Provide you with a URL

3. **Wait for deployment** (2-3 minutes)

#### Step 7: Note Your Backend URL

After deployment completes:
- You'll see: **"Your service is live at https://valuto-backend.onrender.com"**
- **Copy this URL** - you'll need it for frontend configuration

#### Step 8: Verify Deployment

Test your backend:

```bash
curl https://valuto-backend.onrender.com/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "API is healthy",
  "database": "connected"
}
```

#### Step 9: Check Logs

1. Go to Render Dashboard → Your Service → **Logs**
2. You should see:
   ```
   ✅ MongoDB Connected
   🚀 Valuto Backend Server Running
   🎮 WebSocket: enabled (Socket.IO)
   ```

✅ **Backend deployment complete!**

---

## 🌐 Frontend Deployment (Vercel)

### Deploy Frontend to Vercel - Next.js Native Platform

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend:**
   ```bash
   cd frontend
   vercel
   ```

3. **Production Deployment:**
   ```bash
   vercel --prod
   ```

4. **Configure Environment Variables:**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add all frontend environment variables:
     ```
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
     CLERK_SECRET_KEY=sk_live_...
     NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
     NEXT_PUBLIC_APP_URL=https://your-frontend.vercel.app
     ```

5. **Redeploy After Adding Variables:**
   ```bash
   vercel --prod
   ```

6. **Update Backend CORS:**
   - Go to Render Dashboard → Your Backend Service → **Environment**
   - Update `NEXT_PUBLIC_APP_URL` and `FRONTEND_URL` to your Vercel URL: `https://your-app.vercel.app`
   - Click **"Save Changes"**
   - Render will automatically redeploy

### Auto-Deployment from GitHub

1. **Connect GitHub Repository:**
   - Go to Vercel Dashboard
   - Import Project → Select your repository
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `frontend`

2. **Configure Settings:**
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

3. **Add Environment Variables** (same as above)

4. **Deploy:**
   - Vercel will auto-deploy on every push to `main` branch
   - Preview deployments on pull requests

---

## 🗄️ Database Setup (MongoDB Atlas)

### Setting Up MongoDB Atlas

**MongoDB Atlas is the recommended cloud database for this project.**

#### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Verify email address

#### Step 2: Create a New Cluster

1. Click **"Build a Database"**
2. Choose **FREE M0 tier** (512MB storage)
3. **Select Cloud Provider:** AWS, Google Cloud, or Azure
4. **Select Region:** Choose closest to your backend server location
   - If backend on Render.com: Choose same region (e.g., US East)
5. **Cluster Name:** `valuto-cluster` (or your choice)
6. Click **"Create"** (takes 3-5 minutes)

#### Step 3: Create Database User

1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. **Authentication Method:** Password
4. **Username:** `valutoadmin` (or your choice)
5. **Password:** Generate secure password (save it!)
6. **Database User Privileges:** `Read and write to any database`
7. Click **"Add User"**

#### Step 4: Whitelist IP Addresses

1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. For development: Click **"Add Current IP Address"**
4. **For production deployment:**
   - Click **"Allow Access from Anywhere"**
   - IP Address: `0.0.0.0/0`
   - Comment: "Production access"
   - Click **"Confirm"**

⚠️ **Security Note:** `0.0.0.0/0` allows any IP. This is safe because authentication still requires username/password, but consider restricting to specific IPs in high-security scenarios.

#### Step 5: Get Connection String

1. Go to **Database** → **Clusters**
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. **Driver:** Node.js
5. **Version:** 5.5 or later
6. **Copy the connection string:**
   ```
   mongodb+srv://valutoadmin:<password>@valuto-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

#### Step 6: Configure Connection String

1. **Replace `<password>`** with your database user password
2. **Add database name** after `.net/`:
   ```
   mongodb+srv://valutoadmin:your_password@valuto-cluster.xxxxx.mongodb.net/valuto?retryWrites=true&w=majority
   ```

#### Step 7: Add to Backend Environment

1. **For local development** (`backend/.env`):
   ```env
   MONGODB_URI=mongodb+srv://valutoadmin:your_password@valuto-cluster.xxxxx.mongodb.net/valuto?retryWrites=true&w=majority
   ```

2. **For production** (Render.com environment variables):
   - Go to Render Dashboard → Service → Environment
   - Add variable: `MONGODB_URI`
   - Value: Your full connection string
   - Click "Save Changes"

#### Step 8: Test Connection

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected: valuto-cluster.xxxxx.mongodb.net
```

### MongoDB Atlas Dashboard Features

- **Collections:** View and manage your data
- **Metrics:** Monitor database performance
- **Alerts:** Set up notifications for issues
- **Backups:** Configure automatic backups (paid feature)

---

## 🔐 Security Checklist

### Backend

- [ ] Environment variables set correctly
- [ ] `NODE_ENV=production`
- [ ] MongoDB connection uses strong password
- [ ] CORS configured for specific frontend domain
- [ ] Clerk secret key is production key (sk_live_...)
- [ ] Rate limiting enabled (optional but recommended)
- [ ] Helmet middleware active ✅ (already configured)
- [ ] MongoDB IP whitelist configured
- [ ] WebSocket authentication working

### Frontend

- [ ] Environment variables set correctly
- [ ] Clerk publishable key is production key
- [ ] Backend URL points to production backend
- [ ] No sensitive data in client-side code
- [ ] Socket.IO uses secure connection (wss://)
- [ ] Error messages don't expose sensitive info

---

## 🧪 Post-Deployment Testing

### 1. Health Check
```bash
curl https://your-backend-domain.com/api/health
```
**Expected:** `{"success":true,"message":"API is healthy"}`

### 2. WebSocket Connection
Open browser console on frontend:
```javascript
// Should see in console:
✅ Socket connected: <socket-id>
```

### 3. Create Game Flow
- [ ] Teacher can create game
- [ ] Join code generated
- [ ] Game stored in MongoDB

### 4. Join Game Flow
- [ ] Student can join with code
- [ ] Player added to session
- [ ] Host sees player joined

### 5. Play Game Flow
- [ ] Host starts game
- [ ] Questions broadcast to all players
- [ ] Answers submitted successfully
- [ ] Leaderboard updates in real-time
- [ ] Game ends properly
- [ ] Results saved to database

### 6. Stress Test (Optional)
- [ ] 10+ students join same game
- [ ] All receive questions simultaneously
- [ ] Leaderboard updates correctly
- [ ] No socket disconnections

---

## 📊 Monitoring

### Backend Monitoring

**Recommended Tools:**
- **Render:** Built-in logs and metrics
- **Sentry:** Error tracking (optional)
- **LogRocket:** Session replay (optional)

**Key Metrics to Watch:**
- Socket connection count
- Active game sessions
- MongoDB connection status
- API response times
- Error rates

### Frontend Monitoring

**Recommended Tools:**
- **Vercel Analytics:** Built-in
- **Google Analytics:** User tracking
- **Sentry:** Error tracking

---

## 🚨 Troubleshooting

### Issue: WebSocket not connecting

**Check:**
1. Backend logs show Socket.IO initialization
2. CORS allows frontend domain
3. Clerk token is valid
4. Network allows WebSocket connections

**Solution:**
```javascript
// In browser console
const socket = io('https://your-backend.com', {
  auth: { token: 'your-clerk-token' },
  transports: ['websocket', 'polling']
});
```

### Issue: "MongoNetworkError"

**Check:**
1. MongoDB URI is correct
2. IP whitelist includes deployment server
3. Database user has correct permissions

**Solution:**
- Add `0.0.0.0/0` to MongoDB whitelist
- Verify connection string format

### Issue: CORS errors

**Check:**
1. `NEXT_PUBLIC_APP_URL` matches actual frontend domain
2. Backend CORS middleware configured
3. Credentials enabled

**Solution:**
```javascript
// In backend (REST CORS)
app.use(cors({
  origin: process.env.NEXT_PUBLIC_APP_URL,
  credentials: true,
}));
```

---

## 🔄 CI/CD Setup (Optional)

### GitHub Actions for Backend

Create `.github/workflows/deploy-backend.yml`:

```yaml
name: Deploy Backend

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

### GitHub Actions for Frontend

Create `.github/workflows/deploy-frontend.yml`:

```yaml
name: Deploy Frontend

on:
  push:
    branches: [main]
    paths:
      - 'frontend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 📈 Scaling Considerations

### For 100+ Concurrent Games

1. **Use Redis Adapter for Socket.IO:**
   ```bash
   npm install @socket.io/redis-adapter redis
   ```

2. **Enable Horizontal Scaling:**
   - Multiple backend instances
   - Shared Redis for socket state
   - Sticky sessions enabled

3. **Optimize MongoDB:**
   - Add indexes on frequently queried fields
   - Use MongoDB connection pooling
   - Consider sharding for large datasets

4. **CDN for Frontend:**
   - Vercel has built-in CDN
   - Cloudflare for additional caching

---

## ✅ Final Deployment Checklist

### Backend
- [ ] Deployed to Render.com (recommended for Socket.IO)
- [ ] Environment variables configured in Render Dashboard
- [ ] MongoDB Atlas connection string added
- [ ] Health check passing (`/api/health`)
- [ ] WebSocket working (Socket.IO connected)
- [ ] Logs accessible in Render Dashboard
- [ ] SSL enabled (https://) - automatic on Render

### Frontend
- [ ] Deployed to Vercel
- [ ] Environment variables configured in Vercel Dashboard
- [ ] Backend URL points to Render deployment
- [ ] Clerk authentication working
- [ ] Socket.IO connecting to backend
- [ ] All pages loading correctly
- [ ] SSL enabled (https://) - automatic on Vercel

### Database
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelist configured
- [ ] Connection string working
- [ ] Backups enabled (optional)

### Testing
- [ ] Health check API works
- [ ] Socket connection succeeds
- [ ] Teacher can create game
- [ ] Student can join game
- [ ] Gameplay works end-to-end
- [ ] Results saved correctly
- [ ] Tested on mobile device

### Monitoring
- [ ] Error tracking set up
- [ ] Logs accessible
- [ ] Performance monitoring active
- [ ] Alerts configured (optional)

---

## 🎉 Success Criteria

Your deployment is successful when:

✅ **Backend:**
- Health check returns 200 OK
- WebSocket logs show connections
- MongoDB shows active connections
- No errors in logs

✅ **Frontend:**
- Pages load without errors
- Clerk authentication works
- Socket.IO connects successfully
- UI is responsive and functional

✅ **End-to-End:**
- Teacher creates game → receives join code
- Student joins game → enters waiting lobby
- Host starts game → questions broadcast
- Students submit answers → scores update live
- Game ends → results saved and displayed

**When all criteria met, you're LIVE! 🚀**

---

## 📞 Support

If you encounter issues:

1. Check backend logs
2. Check browser console
3. Verify environment variables
4. Test API endpoints directly
5. Review Socket.IO connection

**Documentation:**
- Backend API: `backend/README.md`
- Socket.IO API: `backend/SOCKETS-API.md`
- Frontend Integration: `FRONTEND_INTEGRATION_GUIDE.md`

---

## 🎯 Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  👥 Users (Browser)                            │
│     │                                          │
│     ├─── HTTPS ───→ Vercel (Frontend)         │
│     │                Next.js App               │
│     │                                          │
│     └─── WSS ─────→ Render.com (Backend)      │
│                      Express + Socket.IO       │
│                           │                     │
│                           │                     │
│                      MongoDB Atlas              │
│                      (Database)                 │
│                                                 │
└─────────────────────────────────────────────────┘

Frontend (Vercel)
  ├─ Serves Next.js pages
  ├─ Handles Clerk authentication
  └─ Connects to backend via Socket.IO

Backend (Render.com)
  ├─ REST API endpoints
  ├─ Socket.IO WebSocket server
  ├─ Game logic & scoring
  └─ Connects to MongoDB

Database (MongoDB Atlas)
  └─ Stores sessions, results, users
```

**Key Points:**
- ✅ Frontend and backend are **separate deployments**
- ✅ Communication via **HTTPS (REST)** and **WSS (WebSocket)**
- ✅ All connections are **SSL encrypted**
- ✅ **Render.com maintains persistent connections** for real-time gameplay
- ✅ **Free tier for everything** (MongoDB, Render, Vercel)

---

**Good luck with your deployment!** 🎓🎮

**Last Updated:** October 22, 2025
