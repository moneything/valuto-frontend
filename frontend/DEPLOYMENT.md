# Valuto Frontend - Deployment Guide

## Pre-Deployment Checklist

- [x] All dependencies installed
- [x] Project builds successfully locally
- [x] Environment variables configured (if any)
- [x] Images optimized and in `/public` folder
- [x] All routes working correctly
- [x] Responsive design tested
- [x] Next.js configuration optimized

## Vercel Deployment Steps

### 1. Prepare Your Repository

Ensure your project is pushed to a Git repository (GitHub, GitLab, or Bitbucket):

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Ready for Vercel deployment"

# Add remote repository
git remote add origin YOUR_REPOSITORY_URL

# Push to main branch
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click "Sign Up" or "Log In"
3. Choose "Continue with GitHub" (or your Git provider)
4. Authorize Vercel to access your repositories

### 3. Import Project

1. Click "Add New..." → "Project"
2. Select your `valuto-frontend` repository
3. Vercel will automatically detect it's a Next.js project

### 4. Configure Project

Vercel auto-detects these settings (verify they're correct):

- **Framework Preset**: Next.js
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`

### 5. Environment Variables (Optional)

If you have environment variables:

1. Click "Environment Variables"
2. Add variables from `.env.example`
3. Choose environments (Production, Preview, Development)

### 6. Deploy

1. Click "Deploy"
2. Wait 1-3 minutes for build to complete
3. Get your deployment URL: `https://your-project.vercel.app`

## Post-Deployment

### Custom Domain Setup

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `valuto.com`)
3. Update DNS records as instructed:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (up to 48 hours)

### Continuous Deployment

Automatic deployments are now set up:

- **Production**: Push to `main` branch
- **Preview**: Create a pull request
- **Each commit**: Gets a unique preview URL

### Monitoring & Analytics

Access in Vercel Dashboard:

- **Analytics**: View page views, user metrics
- **Speed Insights**: Monitor performance
- **Logs**: Check build and runtime logs
- **Deployments**: View deployment history

## Environment-Specific Settings

### Production
- URL: Your custom domain or `.vercel.app` URL
- Automatic HTTPS enabled
- Global CDN enabled

### Preview
- Unique URL for each PR
- Test changes before merging
- Share preview links with team

### Development
- Run locally with `npm run dev`
- Hot reload enabled
- Access at `http://localhost:3000`

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Ensure `npm run build` works locally
3. Verify all dependencies are in `package.json`
4. Check Node.js version compatibility

### Images Not Loading

1. Ensure images are in `/public` folder
2. Use correct path: `/image.png` not `./public/image.png`
3. Check image formats are supported (jpg, png, webp)

### Environment Variables Missing

1. Add in Vercel Project Settings → Environment Variables
2. Redeploy after adding variables
3. Use `NEXT_PUBLIC_` prefix for client-side variables

## Performance Optimization

Already implemented:

- ✅ Image optimization (Next.js automatic)
- ✅ Font optimization (Google Fonts)
- ✅ Code splitting (automatic)
- ✅ Static generation where possible
- ✅ Responsive images
- ✅ Tailwind CSS purging

## Rollback

If deployment has issues:

1. Go to Deployments tab
2. Find previous working deployment
3. Click "..." → "Promote to Production"

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)

---

**Ready to Deploy!** 🚀

Your Valuto frontend is optimized and ready for production deployment on Vercel.

