# 🚀 Deploy Backend to Render with PostgreSQL

## Quick Deployment Steps

### 1. Go to Render Dashboard
Visit: https://dashboard.render.com

### 2. Create New Web Service
- Click "New +" → "Web Service"
- Connect GitHub repository: `Simulationsai/aisimulation`
- Root Directory: `backend`

### 3. Configure Service
- **Name:** `simulationai-api`
- **Environment:** `Node`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run start:prod`
- **Health Check Path:** `/api/health`

### 4. Set Environment Variables

**Required:**
```
DATABASE_URL=postgresql://simulationai_user:3Yef2G29571FrsJtdWEGe5vWeQQkdw2k@dpg-d5qbgtp4tr6s73dcaru0-a/simulationai
NODE_ENV=production
PORT=3001
JWT_SECRET=<generate-with-openssl-rand-hex-32>
FRONTEND_URL=https://frontend-umber-phi-ejhswkr2lv.vercel.app
```

**Generate JWT Secret:**
```bash
openssl rand -hex 32
```

### 5. Deploy
- Click "Create Web Service"
- Render will build and deploy
- Wait 5-10 minutes for deployment

---

## ✅ Database Connection

The backend will automatically:
- Connect to your PostgreSQL database
- Create all tables on first run (synchronize mode)
- Set up relationships and indexes

---

## 🧪 Test After Deployment

1. **Health Check:**
   ```
   GET https://your-backend-url.onrender.com/api/health
   ```

2. **API Info:**
   ```
   GET https://your-backend-url.onrender.com/
   ```

3. **Test Waitlist:**
   ```
   POST https://your-backend-url.onrender.com/api/waitlist/join
   Body: { "email": "test@example.com" }
   ```

---

## 📝 Update Frontend API URL

After backend is deployed:

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Update `NEXT_PUBLIC_API_URL` to your Render backend URL
5. Redeploy frontend

---

## ✅ Status

- ✅ Database entities created
- ✅ TypeORM configured
- ✅ All services use database
- ✅ Password hashing with bcrypt
- ✅ Ready for deployment

**Your backend is ready to deploy with PostgreSQL!** 🚀
