# Valuto Frontend

A modern, professional Next.js website for Valuto - teaching money skills to young people aged 11-18.

## Features

- ✨ **Modern Design**: Clean, professional green and white theme
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop
- 🎨 **Professional Typography**: Times New Roman headers with Poppins body text
- 🖼️ **Image Integration**: Beautiful imagery showcasing student engagement and financial growth
- 🎯 **Accessible**: Designed to be readable for students, teachers, and finance professionals
- ⚡ **Fast Performance**: Built with Next.js 14 and optimized assets
- 🔄 **Gradient Theme**: Unified green gradient across entire page

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: 
  - Headers: Times New Roman (serif)
  - Body: Poppins (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Sticky pill-shaped header
│   ├── Hero.tsx            # Hero section with CTA
│   ├── CompanyCarousel.tsx # Partner companies carousel
│   ├── ImpactStats.tsx     # Impact statistics cards
│   ├── WhatMakesUsDifferent.tsx  # Features with icons
│   ├── WhatWeDo.tsx        # How it works & promise
│   └── Footer.tsx          # Footer with links
├── public/
│   ├── study.png           # Students learning image
│   ├── study1.png          # Financial growth image
│   └── study2.png          # Calculator/budgeting image
└── tailwind.config.ts      # Tailwind configuration
```

## Key Sections

1. **Hero Section**: Compelling headline with italic accent, CTA buttons, and key metrics
2. **Company Carousel**: Animated scrolling showcase of partner institutions
3. **Impact by Numbers**: Statistics in gradient green cards
4. **What Makes Us Different**: Six key differentiators with professional SVG icons
5. **How It Works**: 4-step process with financial planning imagery
6. **Our Promise**: Image-rich section showing student outcomes

## Design Theme

- **Primary Color**: Valuto Green (#16a34a)
- **Background**: Gradient from green-50 via white to green-50
- **Typography**: 
  - Headers: Times New Roman (bold, serif)
  - Body: Poppins
  - Italic accent on "Late" in main headline
- **Header**: Floating pill-shaped navigation with backdrop blur
- **Spacing**: Consistent, professional spacing throughout
- **Components**: Rounded corners, shadows, smooth transitions, glassmorphism effects

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Deployment

This project is optimized for deployment on Vercel.

### Deploy to Vercel

1. **Push your code to GitHub** (from root directory):
```bash
cd ..
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your repository
   - Set **Root Directory** to `frontend`
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Environment Variables** (if needed):
   - In Vercel dashboard, go to your project settings
   - Navigate to "Environment Variables"
   - Add any required variables

4. **Custom Domain** (optional):
   - Go to Settings → Domains
   - Add your custom domain
   - Follow Vercel's DNS configuration instructions

### Automatic Deployments

- Every push to `main` branch triggers a production deployment
- Pull requests get automatic preview deployments
- Vercel provides unique URLs for each deployment

### Build Settings (Auto-configured)

- **Framework Preset**: Next.js
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### Performance Optimization

✅ Automatic image optimization  
✅ Edge caching enabled  
✅ Global CDN distribution  
✅ Automatic HTTPS  
✅ Server-side rendering (SSR)  

## License

© 2025 Valuto. All rights reserved.
