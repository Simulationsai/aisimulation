# AISimulation Backend

NestJS backend API for AISimulation - AI-Powered Performance Optimization for Mobile Gaming.

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Server runs on http://localhost:3001
# API Docs: http://localhost:3001/api/docs
```

### Build for Production

```bash
# Build
npm run build

# Start production server
npm run start:prod
```

## Deployment to Render

See **[DEPLOY-RENDER.md](./DEPLOY-RENDER.md)** for complete step-by-step instructions.

### Quick Deploy Steps:

1. **Push to GitHub:**
```bash
git add .
git commit -m "Backend ready for Render"
git push origin main
```

2. **Create Render Service:**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect GitHub repo
   - Root Directory: `backend`
   - Build: `npm install && npm run build`
   - Start: `npm run start:prod`

3. **Set Environment Variables:**
   - `NODE_ENV=production`
   - `JWT_SECRET=<generate-random-secret>`
   - `DATABASE_URL=<from-postgresql-service>` (optional)

4. **Deploy!**

## API Endpoints

### Health Checks
- `GET /api/health` - Basic health check
- `GET /api/health/ready` - Readiness probe
- `GET /api/health/live` - Liveness probe

### API Documentation
- `GET /api/docs` - Swagger UI documentation

### Root
- `GET /api` - API info

## Environment Variables

See `.env.example` for all available environment variables.

**Required for Production:**
- `NODE_ENV=production`
- `PORT` (auto-set by Render)
- `JWT_SECRET` (generate with: `openssl rand -base64 32`)

**Optional:**
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `FRONTEND_URL` - Frontend URL for CORS

## Project Structure

```
backend/
├── src/
│   ├── main.ts              # Application entry point
│   ├── app.module.ts        # Root module
│   ├── health/              # Health check endpoints
│   ├── auth/                # Authentication module
│   └── users/               # User management module
├── render.yaml              # Render deployment config
├── package.json
└── tsconfig.json
```

## Testing

```bash
# Run tests
npm test

# Run e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Troubleshooting

### Build Fails
- Check Node.js version (18+ required)
- Run `npm install` to ensure dependencies are installed
- Check for TypeScript errors: `npm run build`

### Service Won't Start
- Verify all environment variables are set
- Check Render logs for specific errors
- Ensure PORT is not hardcoded (use `process.env.PORT`)

### Health Check Fails
- Verify endpoint is `/api/health` (with `/api` prefix)
- Check that service is listening on `0.0.0.0`

## Documentation

- **Deployment Guide:** [DEPLOY-RENDER.md](./DEPLOY-RENDER.md)
- **Deployment Checklist:** [RENDER-CHECKLIST.md](./RENDER-CHECKLIST.md)
- **Full Backend Architecture:** [../AISimulation/02-BACKEND-STRUCTURE.md](../AISimulation/02-BACKEND-STRUCTURE.md)

## Support

- **Render Docs:** https://render.com/docs
- **NestJS Docs:** https://docs.nestjs.com
- **TypeScript Docs:** https://www.typescriptlang.org/docs

---

**Ready to deploy? Follow [DEPLOY-RENDER.md](./DEPLOY-RENDER.md)!** 🚀
