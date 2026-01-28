# Render Deployment Checklist

Use this checklist to ensure successful deployment to Render.

## Pre-Deployment

- [ ] Code is pushed to GitHub repository
- [ ] `.env` file is in `.gitignore` (not committed)
- [ ] `render.yaml` exists in backend directory
- [ ] `package.json` has correct build/start scripts
- [ ] Backend builds locally: `npm run build` succeeds
- [ ] Backend starts locally: `npm run start:prod` works

## Render Setup

- [ ] Render account created (https://render.com)
- [ ] GitHub repository connected to Render
- [ ] PostgreSQL database created (optional but recommended)
- [ ] Database Internal URL copied

## Web Service Configuration

- [ ] Web service created in Render
- [ ] Root directory set to: `backend`
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `npm run start:prod`
- [ ] Health check path: `/api/health`
- [ ] Auto-deploy enabled

## Environment Variables

- [ ] `NODE_ENV=production`
- [ ] `PORT=3001` (or let Render auto-set)
- [ ] `DATABASE_URL` set (if using database)
- [ ] `JWT_SECRET` set (strong random secret)
- [ ] `FRONTEND_URL` set (placeholder or actual URL)

## Deployment

- [ ] Build completes successfully
- [ ] Service starts without errors
- [ ] Health check passes: `/api/health` returns 200
- [ ] API docs accessible: `/api/docs` loads
- [ ] Service URL copied and saved

## Post-Deployment Verification

- [ ] Health endpoint works: `https://your-service.onrender.com/api/health`
- [ ] API docs accessible: `https://your-service.onrender.com/api/docs`
- [ ] Root endpoint works: `https://your-service.onrender.com/api`
- [ ] No errors in Render logs
- [ ] Service stays running (check after 5 minutes)

## Next Steps

- [ ] Backend URL saved for frontend deployment
- [ ] Frontend `NEXT_PUBLIC_API_URL` updated
- [ ] CORS configured correctly
- [ ] Monitoring set up (optional)

---

**Quick Test Commands:**

```bash
# Test health endpoint
curl https://your-service.onrender.com/api/health

# Test root endpoint
curl https://your-service.onrender.com/api
```

---

**Your Backend URL:** `https://____________________.onrender.com`

**Save this URL for frontend deployment!**
