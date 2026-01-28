# 🚀 Automated Deployment to Render

## ✅ Pre-Deployment Checklist

All configuration is ready:
- ✅ Database URL configured in `render.yaml`
- ✅ Frontend URL configured
- ✅ Build commands set
- ✅ Health check path configured

---

## 🎯 Quick Deploy (2 Steps)

### Step 1: Push to GitHub

```bash
cd "/Users/santosh/SimulationAI Depin/AISimulation"
git add -A
git commit -m "Backend ready for Render deployment with PostgreSQL"
git push origin main
```

### Step 2: Deploy via Render Blueprint

1. **Go to Render Dashboard:**
   - Visit: https://dashboard.render.com
   - Sign in (or create account)

2. **Create Blueprint:**
   - Click "New +" → "Blueprint"
   - Connect GitHub repository: `Simulationsai/aisimulation`
   - Render will auto-detect `backend/render.yaml`

3. **Review Configuration:**
   - Service name: `simulationai-api`
   - Root directory: `backend`
   - Build: `npm install && npm run build`
   - Start: `npm run start:prod`
   - Health check: `/api/health`

4. **Set JWT Secret:**
   - In Environment Variables section
   - Add: `JWT_SECRET` = `<generate-below>`

5. **Deploy:**
   - Click "Apply"
   - Wait 5-10 minutes for deployment

---

## 🔑 Generate JWT Secret

Run this command to generate a secure JWT secret:

```bash
openssl rand -hex 32
```

Copy the output and paste it as the `JWT_SECRET` value in Render.

---

## 📋 Environment Variables (Auto-Configured)

These are already set in `render.yaml`:
- ✅ `NODE_ENV` = `production`
- ✅ `PORT` = `3001`
- ✅ `DATABASE_URL` = Your PostgreSQL URL
- ✅ `FRONTEND_URL` = Your Vercel frontend URL

**You only need to add:**
- `JWT_SECRET` = (generate with command above)

---

## 🧪 Verify Deployment

After deployment completes, test:

1. **API Info:**
   ```
   GET https://simulationai-api.onrender.com/
   ```

2. **Health Check:**
   ```
   GET https://simulationai-api.onrender.com/api/health
   ```

3. **Test Waitlist:**
   ```bash
   curl -X POST https://simulationai-api.onrender.com/api/waitlist/join \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```

---

## ✅ What Happens on Deploy

1. **Build Phase:**
   - Installs dependencies
   - Compiles TypeScript
   - Builds production bundle

2. **Database Connection:**
   - Connects to PostgreSQL
   - Creates all tables automatically
   - Sets up relationships

3. **Service Start:**
   - Starts NestJS server
   - Health check passes
   - API ready to use

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

## 🆘 Troubleshooting

### Build Fails
- Check Render build logs
- Verify Node.js version (should be 18+)
- Ensure all dependencies in `package.json`

### Database Connection Error
- Verify `DATABASE_URL` is correct
- Check database is running in Render
- Ensure SSL is enabled

### Service Won't Start
- Check start command: `npm run start:prod`
- Verify PORT environment variable
- Check application logs in Render

---

**Ready to deploy!** Follow Step 1 and Step 2 above. 🚀
