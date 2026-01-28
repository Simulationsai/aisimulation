# Deploy Backend to Render - Step by Step Guide

## Prerequisites

- GitHub account
- Render account (sign up at https://render.com - free tier available)
- Code pushed to GitHub repository

---

## Step 1: Push Code to GitHub

If you haven't already, push your code to GitHub:

```bash
cd "/Users/santosh/SimulationAI Depin/AISimulation"
git init
git add .
git commit -m "Initial AISimulation backend setup"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

**Note:** Make sure `.env` is in `.gitignore` (it should be already).

---

## Step 2: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub (recommended) or email
3. Verify your email if needed

---

## Step 3: Create PostgreSQL Database (Optional but Recommended)

Even though the backend works without a database initially, it's good to set it up:

1. In Render Dashboard, click **"New +"** → **"PostgreSQL"**
2. Configure:
   - **Name:** `aisimulation-db`
   - **Database:** `aisimulation`
   - **User:** (auto-generated)
   - **Region:** Choose closest to you (e.g., `Oregon (US West)`)
   - **PostgreSQL Version:** Latest (15 or 16)
   - **Plan:** Free (for testing) or Starter ($7/month for production)
3. Click **"Create Database"**
4. Wait for database to be created (1-2 minutes)
5. **Copy the Internal Database URL** - you'll need this in the next step
   - It looks like: `postgresql://user:password@dpg-xxxxx-a/aisimulation`

---

## Step 4: Create Web Service

### Option A: Using render.yaml (Recommended - Automatic)

1. In Render Dashboard, click **"New +"** → **"Blueprint"**
2. Connect your GitHub repository
3. Render will detect `render.yaml` automatically
4. Click **"Apply"**
5. Render will create the web service with the configuration from `render.yaml`

### Option B: Manual Setup

1. In Render Dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure the service:

   **Basic Settings:**
   - **Name:** `aisimulation-api`
   - **Region:** Same as your database (or closest to users)
   - **Branch:** `main` (or your main branch)
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start:prod`

   **Advanced Settings:**
   - **Health Check Path:** `/api/health`
   - **Auto-Deploy:** `Yes` (deploys on every push)

4. Click **"Create Web Service"**

---

## Step 5: Set Environment Variables

In your Render web service dashboard:

1. Go to **"Environment"** tab
2. Add the following environment variables:

### Required Variables:

```env
NODE_ENV=production
PORT=3001
```

### Database (if you created PostgreSQL):

```env
DATABASE_URL=<paste-internal-database-url-from-step-3>
```

**To get the Internal Database URL:**
- Go to your PostgreSQL service in Render
- Copy the "Internal Database URL" (not the External one)

### JWT Secret (Generate a strong secret):

```bash
# Generate a random secret (run this locally):
openssl rand -base64 32
```

Then add:
```env
JWT_SECRET=<paste-generated-secret>
```

### Frontend URL (for CORS - set later or use placeholder):

```env
FRONTEND_URL=https://placeholder.vercel.app
```

### Optional Variables (can add later):

```env
REDIS_URL=<redis-url-if-you-create-redis>
AI_SERVICE_URL=http://localhost:8000
```

3. Click **"Save Changes"**

---

## Step 6: Deploy

1. Render will automatically start building when you save environment variables
2. Watch the build logs in real-time
3. Wait for deployment to complete (usually 2-5 minutes)

**Build Process:**
- Installs dependencies (`npm install`)
- Builds TypeScript (`npm run build`)
- Starts the service (`npm run start:prod`)

---

## Step 7: Verify Deployment

### Check Health Endpoint:

Visit: `https://your-service-name.onrender.com/api/health`

You should see:
```json
{
  "status": "ok",
  "timestamp": "2026-01-24T...",
  "service": "AISimulation API",
  "version": "1.0.0"
}
```

### Check API Documentation:

Visit: `https://your-service-name.onrender.com/api/docs`

You should see Swagger API documentation.

### Check Root Endpoint:

Visit: `https://your-service-name.onrender.com/api`

You should see:
```
AISimulation API v1.0 - AI-Powered Performance Optimization for Mobile Gaming
```

---

## Step 8: Get Your Backend URL

1. In Render dashboard, go to your web service
2. Copy the service URL (e.g., `https://aisimulation-api.onrender.com`)
3. **Save this URL** - you'll need it for:
   - Frontend deployment (as `NEXT_PUBLIC_API_URL`)
   - Testing API endpoints
   - Documentation

---

## Troubleshooting

### Build Fails

**Error: "Cannot find module"**
- Check that `package.json` has all dependencies
- Verify `npm install` completes successfully
- Check build logs for specific missing modules

**Error: "TypeScript compilation failed"**
- Check for TypeScript errors locally: `cd backend && npm run build`
- Fix any TypeScript errors before deploying

### Service Won't Start

**Error: "Port already in use"**
- Render sets PORT automatically - don't hardcode it
- Make sure your code uses `process.env.PORT || 3001`

**Error: "Database connection failed"**
- Verify `DATABASE_URL` is correct
- Check database is running in Render
- Use Internal Database URL (not External) for Render services

### Health Check Fails

**404 on /api/health**
- Verify health check path is `/api/health` (with `/api` prefix)
- Check that `main.ts` sets global prefix to `api`
- Check service logs for errors

### Service Sleeps (Free Tier)

**Service is slow to respond after inactivity**
- Free tier services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds (cold start)
- Upgrade to paid plan for always-on service

---

## Environment Variables Checklist

Before deployment, ensure you have:

- [ ] `NODE_ENV=production`
- [ ] `PORT=3001` (or let Render set it automatically)
- [ ] `DATABASE_URL` (if using database)
- [ ] `JWT_SECRET` (strong random secret)
- [ ] `FRONTEND_URL` (placeholder or actual URL)

---

## Next Steps After Deployment

1. **Test all endpoints:**
   - Health: `/api/health`
   - API Docs: `/api/docs`
   - Root: `/api`

2. **Set up monitoring:**
   - Check Render logs regularly
   - Set up alerts (Render Pro)

3. **Update frontend:**
   - Use backend URL as `NEXT_PUBLIC_API_URL`
   - Deploy frontend to Vercel

4. **Configure custom domain (optional):**
   - In Render: Settings → Custom Domains
   - Add your domain
   - Update DNS records

---

## Quick Reference

**Your Backend URL:** `https://<service-name>.onrender.com`

**Health Check:** `https://<service-name>.onrender.com/api/health`

**API Docs:** `https://<service-name>.onrender.com/api/docs`

**Service Dashboard:** https://dashboard.render.com

---

## Support

- **Render Docs:** https://render.com/docs
- **Render Status:** https://status.render.com
- **Render Community:** https://community.render.com

---

**Ready to deploy? Follow the steps above!** 🚀
