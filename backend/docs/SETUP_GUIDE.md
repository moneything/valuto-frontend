# Valuto Full-Stack Setup Guide

Complete step-by-step guide to set up the Valuto platform locally and deploy to production.

---

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] **Node.js** (v18+) and **npm** (v9+) installed
- [ ] **MongoDB** installed locally OR a MongoDB Atlas account
- [ ] **Clerk** account (free tier is sufficient)
- [ ] **Git** installed
- [ ] Code editor (VS Code recommended)

---

## 🚀 Part 1: Local Development Setup

### Step 1: Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd valuto-frontend-test

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Set Up MongoDB

**Option A: Local MongoDB**

1. Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Start MongoDB:
   ```bash
   # macOS/Linux
   mongod --dbpath ~/data/db
   
   # Windows
   mongod --dbpath C:\data\db
   ```
3. Your connection string will be: `mongodb://localhost:27017/valuto-dev`

**Option B: MongoDB Atlas (Recommended for Production)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Example: `mongodb+srv://username:password@cluster.mongodb.net/valuto?retryWrites=true&w=majority`

### Step 3: Set Up Clerk Authentication

1. Go to https://clerk.com and sign up for free
2. Create a new application
3. From the dashboard, get your keys:
   - **Publishable Key**: Starts with `pk_test_...`
   - **Secret Key**: Starts with `sk_test_...`

### Step 4: Configure Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/valuto-dev  # Or your Atlas URI
CLERK_SECRET_KEY=sk_test_your_key_here
CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
FRONTEND_URL=http://localhost:3000
```

### Step 5: Configure Frontend Environment

```bash
cd frontend
```

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 6: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Valuto Backend Server Running
🌐 Server URL: http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
ready - started server on 0.0.0.0:3000
```

### Step 7: Test the Setup

1. **Backend Health Check:**
   - Visit: http://localhost:5000/api/health
   - Should return: `{"success": true, "message": "API is healthy"}`

2. **Frontend:**
   - Visit: http://localhost:3000
   - You should see the Valuto landing page

3. **Authentication Flow:**
   - Click "Launch App" → "Sign Up"
   - Create a test account
   - Complete onboarding
   - Access the dashboard

---

## 🌐 Part 2: Production Deployment

### Backend Deployment (Render.com)

1. **Prepare for Deployment:**
   - Ensure all code is committed to Git
   - Push to GitHub/GitLab

2. **Create Render Account:**
   - Go to https://render.com
   - Sign up with GitHub

3. **Create Web Service:**
   - Click "New +" → "Web Service"
   - Connect your repository
   - Configure:
     - **Name**: `valuto-backend`
     - **Root Directory**: `backend`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free

4. **Add Environment Variables:**
   - Go to "Environment" tab
   - Add all variables from `.env.example`:
     ```
     NODE_ENV=production
     PORT=5000
     MONGODB_URI=<your-atlas-uri>
     CLERK_SECRET_KEY=sk_live_...  (use LIVE keys!)
     CLERK_PUBLISHABLE_KEY=pk_live_...
     FRONTEND_URL=<your-frontend-url>
     ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for build and deployment
   - Note your backend URL: `https://valuto-backend.onrender.com`

### Frontend Deployment (Vercel)

1. **Prepare Frontend:**
   - Ensure `vercel.json` exists in `frontend/` directory

2. **Deploy to Vercel:**
   ```bash
   cd frontend
   npm install -g vercel
   vercel login
   vercel
   ```

3. **Configure Environment Variables:**
   - Go to Vercel dashboard → Your Project → Settings → Environment Variables
   - Add all variables from `.env.local`:
     ```
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
     CLERK_SECRET_KEY=sk_live_...
     NEXT_PUBLIC_API_URL=https://valuto-backend.onrender.com/api
     ```

4. **Redeploy:**
   ```bash
   vercel --prod
   ```

### Update Clerk Settings

1. Go to Clerk Dashboard
2. Update URLs:
   - **Home URL**: `https://your-frontend.vercel.app`
   - **Allowed Origins**: Add your frontend and backend URLs
   - **Redirect URLs**: Add your production URLs

### Final Production Checks

- [ ] Backend health check works: `https://your-backend/api/health`
- [ ] Frontend loads correctly
- [ ] Sign up flow works
- [ ] User can complete onboarding
- [ ] Dashboard loads with user data
- [ ] Games can be played and scores saved
- [ ] Leaderboard displays correctly

---

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error**: `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions:**
1. Ensure MongoDB is running locally: `mongod --version`
2. Check connection string in `.env`
3. For Atlas: Whitelist your IP address in Network Access
4. Verify database user credentials

### Clerk Authentication Errors

**Error**: `Invalid publishable key`

**Solutions:**
1. Verify you're using the correct keys (test for dev, live for prod)
2. Ensure keys are in the correct environment files
3. Restart both servers after changing environment variables
4. Check Clerk dashboard for correct instance

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solutions:**
```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or change port in backend/.env
PORT=5001
```

### CORS Errors

**Error**: `Access to fetch at '...' from origin '...' has been blocked by CORS`

**Solutions:**
1. Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
2. For production, update to production frontend URL
3. Restart backend server after changes

### Module Not Found Errors

**Error**: `Cannot find module '...'`

**Solutions:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Clear npm cache
npm cache clean --force
npm install
```

### Frontend Won't Build

**Error**: Build failures in Next.js

**Solutions:**
1. Delete `.next` folder: `rm -rf .next`
2. Reinstall dependencies
3. Check for TypeScript errors: `npm run type-check`
4. Ensure all environment variables are set

---

## 📊 Monitoring and Maintenance

### Backend Monitoring

1. **Check Server Health:**
   ```bash
   curl https://your-backend/api/health
   ```

2. **Monitor Logs:**
   - Render: Dashboard → Logs tab
   - Look for errors or warnings

3. **Database Monitoring:**
   - MongoDB Atlas: Dashboard → Metrics
   - Monitor connections, operations, storage

### Frontend Monitoring

1. **Vercel Dashboard:**
   - Check deployment status
   - Monitor bandwidth and requests
   - View error logs

2. **Analytics:**
   - Consider adding Google Analytics or Vercel Analytics
   - Track user behavior and errors

---

## 🔄 Updating the Application

### Backend Updates

```bash
cd backend
git pull origin main
npm install  # If dependencies changed
npm run dev  # Test locally
git push  # Deploy to production (auto-deploys on Render)
```

### Frontend Updates

```bash
cd frontend
git pull origin main
npm install  # If dependencies changed
npm run dev  # Test locally
vercel --prod  # Deploy to production
```

---

## 📝 Backup and Recovery

### Database Backups

**MongoDB Atlas (Automatic):**
- Free tier includes automatic backups
- Configure in Atlas: Clusters → Backup tab

**Local MongoDB:**
```bash
# Backup
mongodump --uri="mongodb://localhost:27017/valuto-dev" --out=./backup

# Restore
mongorestore --uri="mongodb://localhost:27017/valuto-dev" ./backup
```

### Code Backups

- Use Git for version control
- Push to GitHub/GitLab regularly
- Tag releases: `git tag v1.0.0`

---

## 🎓 Next Steps

After successful deployment:

1. **Test all features thoroughly**
   - Sign up and onboarding flow
   - All game types
   - Leaderboards
   - Learning modules
   - Daily challenges

2. **Set up monitoring**
   - Error tracking (Sentry)
   - Uptime monitoring (UptimeRobot)
   - Performance monitoring

3. **Configure domain**
   - Purchase custom domain
   - Configure DNS in Vercel/Render
   - Set up SSL (automatic with Vercel/Render)

4. **User testing**
   - Invite beta users
   - Gather feedback
   - Iterate on features

---

## 📞 Support

If you encounter issues not covered here:

1. Check the [Backend README](./backend/README.md)
2. Review [API Documentation](./backend/API_DOCUMENTATION.md)
3. Check [Games Overview](./games-overview.md)
4. Search GitHub issues
5. Contact the development team

---

**Setup Guide Version**: 1.0.0  
**Last Updated**: October 22, 2025  
**Tested On**: Node.js v18+, MongoDB 7.0+, Next.js 14+

