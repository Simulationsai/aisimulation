# 🚀 Deploy to Render - FREE Web Service Method

## ✅ No Payment Required!

This method uses Render's **free Web Service** (not Blueprint). Follow these steps:

---

## Step 1: Go to Render Dashboard

**Visit:** https://dashboard.render.com

---

## Step 2: Create New Web Service

1. **Click "New +"** → **"Web Service"** (NOT Blueprint)

2. **Connect GitHub Repository:**
   - Click "Connect account" if not connected
   - Select repository: **`Simulationsai/aisimulation`**
   - Click "Connect"

---

## Step 3: Configure Service

Fill in these settings:

### Basic Settings:
- **Name:** `simulationai-api`
- **Environment:** `Node`
- **Region:** Choose closest to you (e.g., `Oregon (US West)`)
- **Branch:** `main`
- **Root Directory:** `backend` ⚠️ **IMPORTANT!**

### Build & Deploy:
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run start:prod`

### Health Check:
- **Health Check Path:** `/api/health`

---

## Step 4: Set Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add these:

### Required Variables:

1. **NODE_ENV**
   - Key: `NODE_ENV`
   - Value: `production`

2. **PORT**
   - Key: `PORT`
   - Value: `3001`

3. **DATABASE_URL**
   - Key: `DATABASE_URL`
   - Value: `postgresql://simulationai_user:3Yef2G29571FrsJtdWEGe5vWeQQkdw2k@dpg-d5qbgtp4tr6s73dcaru0-a/simulationai`

4. **JWT_SECRET**
   - Key: `JWT_SECRET`
   - Value: `fd39fe54e8c01c89a96f7522e1ea8ad2214b4bb4806dbeeefa95156b0f4cf07c`

5. **FRONTEND_URL**
   - Key: `FRONTEND_URL`
   - Value: `https://frontend-umber-phi-ejhswkr2lv.vercel.app`

### Optional (can add later):
- **REDIS_URL** (if you have Redis)

---

## Step 5: Choose Plan

- Select **"Free"** plan (no payment required)
- Click **"Create Web Service"**

---

## Step 6: Wait for Deployment

- Render will build and deploy automatically
- Wait 5-10 minutes
- Watch the build logs in real-time

---

## ✅ After Deployment

Your backend will be available at:
```
https://simulationai-api.onrender.com
```

### Test Your API:

```bash
# Health check
curl https://simulationai-api.onrender.com/api/health

# API info
curl https://simulationai-api.onrender.com/
```

---

## 📋 Quick Checklist

- ✅ Name: `simulationai-api`
- ✅ Root Directory: `backend` ⚠️ **CRITICAL!**
- ✅ Build: `npm install && npm run build`
- ✅ Start: `npm run start:prod`
- ✅ Health Check: `/api/health`
- ✅ Environment Variables: All 5 added
- ✅ Plan: Free

---

## 🆘 Troubleshooting

### Build Fails
- Check Root Directory is set to `backend`
- Verify build command is correct
- Check build logs for errors

### Service Won't Start
- Verify start command: `npm run start:prod`
- Check PORT is set to `3001`
- Review application logs

### Database Connection Error
- Verify `DATABASE_URL` is correct
- Check database is running
- Ensure SSL is enabled

---

## 🔄 Update Frontend After Deployment

Once backend is deployed:

1. **Get Backend URL:**
   - From Render dashboard
   - Example: `https://simulationai-api.onrender.com`

2. **Update Vercel:**
   - Go to Vercel Dashboard
   - Settings → Environment Variables
   - Update `NEXT_PUBLIC_API_URL` to your Render URL
   - Redeploy frontend

---

**This method is FREE and works perfectly!** 🚀
