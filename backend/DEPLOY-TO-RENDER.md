# 🚀 Deploy SimulationAI Backend to Render

## Quick Deployment Steps

### Option 1: Deploy via Render Dashboard (Recommended)

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Sign in or create account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository: `Simulationsai/aisimulation`

3. **Configure Service**
   - **Name:** `simulationai-api`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start:prod`
   - **Health Check Path:** `/api/health`

4. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=3001
   DATABASE_URL=<your-postgres-url>
   REDIS_URL=<your-redis-url> (optional)
   JWT_SECRET=<generate-a-secure-secret>
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy automatically
   - Wait for deployment to complete (5-10 minutes)

### Option 2: Deploy via render.yaml (Blueprint)

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Click "New +" → "Blueprint"

2. **Connect Repository**
   - Connect your GitHub repository
   - Render will detect `backend/render.yaml`

3. **Review Configuration**
   - Render will read the blueprint
   - Review and confirm settings

4. **Set Environment Variables**
   - Add all required environment variables
   - (Same as Option 1)

5. **Deploy**
   - Click "Apply"
   - Render will deploy automatically

---

## Environment Variables

### Required
- `NODE_ENV` = `production`
- `PORT` = `3001`
- `DATABASE_URL` = PostgreSQL connection string
- `JWT_SECRET` = Secure random string (use: `openssl rand -hex 32`)
- `FRONTEND_URL` = Your Vercel frontend URL

### Optional
- `REDIS_URL` = Redis connection string (for caching/queues)

---

## Generate JWT Secret

```bash
openssl rand -hex 32
```

Or use an online generator: https://generate-secret.vercel.app/32

---

## Database Setup

### Create PostgreSQL Database on Render

1. Go to Render Dashboard
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name:** `simulationai-db`
   - **Database:** `simulationai`
   - **User:** Auto-generated
   - **Region:** Choose closest to your API
4. Copy the **Internal Database URL** for `DATABASE_URL`

---

## Verify Deployment

Once deployed, test these endpoints:

1. **API Info:**
   ```
   GET https://simulationai-api.onrender.com/
   ```

2. **Health Check:**
   ```
   GET https://simulationai-api.onrender.com/api/health
   ```

3. **API Documentation:**
   ```
   GET https://simulationai-api.onrender.com/api/docs
   ```

---

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Service Won't Start
- Check start command: `npm run start:prod`
- Verify PORT environment variable
- Check application logs in Render dashboard

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check database is running
- Ensure database allows connections from Render

### CORS Issues
- Verify `FRONTEND_URL` environment variable
- Check CORS configuration in `main.ts`

---

## Post-Deployment

1. **Update Frontend API URL**
   - Update `NEXT_PUBLIC_API_URL` in Vercel
   - Point to your new Render backend URL

2. **Test Integration**
   - Test API calls from frontend
   - Verify authentication flow
   - Test wallet, nodes, API keys endpoints

3. **Monitor**
   - Set up monitoring/alerts in Render
   - Monitor API response times
   - Check error logs regularly

---

## Your Backend URL

After deployment, your backend will be available at:
```
https://simulationai-api.onrender.com
```

API endpoints:
- API Info: `https://simulationai-api.onrender.com/`
- Health: `https://simulationai-api.onrender.com/api/health`
- Docs: `https://simulationai-api.onrender.com/api/docs`
- Wallet: `https://simulationai-api.onrender.com/api/wallet/*`
- API Keys: `https://simulationai-api.onrender.com/api/api-keys/*`
- Nodes: `https://simulationai-api.onrender.com/api/nodes/*`

---

**Ready to deploy!** 🚀
