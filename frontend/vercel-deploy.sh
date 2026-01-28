#!/bin/bash

# AISimulation Frontend Vercel Deployment Script

set -e

echo "🚀 AISimulation Frontend Deployment to Vercel"
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if we're in frontend directory
if [ ! -f "package.json" ] || [ ! -f "next.config.js" ]; then
    echo -e "${RED}❌ Error: Not in frontend directory${NC}"
    echo "Please run this script from the frontend directory"
    exit 1
fi

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠${NC} Vercel CLI not found. Installing..."
    npm install -g vercel
    echo -e "${GREEN}✓${NC} Vercel CLI installed"
fi

# Check if build works
echo -e "${GREEN}✓${NC} Building frontend..."
npm run build
echo -e "${GREEN}✓${NC} Build successful"

# Check if .env.production exists
if [ -f ".env.production" ]; then
    echo -e "${GREEN}✓${NC} Production environment file found"
    echo "API URL configured: $(grep NEXT_PUBLIC_API_URL .env.production)"
else
    echo -e "${YELLOW}⚠${NC} .env.production not found"
    echo "Creating .env.production..."
    echo "NEXT_PUBLIC_API_URL=https://aisimulation.onrender.com" > .env.production
    echo "NODE_ENV=production" >> .env.production
fi

echo ""
echo "================================================"
echo -e "${GREEN}✅ Frontend is ready for Vercel deployment!${NC}"
echo ""
echo "Next steps:"
echo ""
echo "1. Login to Vercel (if not already):"
echo "   vercel login"
echo ""
echo "2. Deploy to Vercel:"
echo "   vercel"
echo ""
echo "3. Set environment variable (if not set):"
echo "   vercel env add NEXT_PUBLIC_API_URL production"
echo "   (Enter: https://aisimulation.onrender.com)"
echo ""
echo "4. Deploy to production:"
echo "   vercel --prod"
echo ""
echo "================================================"
echo ""
echo "Or use Vercel Dashboard:"
echo "1. Go to https://vercel.com"
echo "2. Import project from GitHub: Simulationsai/aisimulation"
echo "3. Set Root Directory to: frontend"
echo "4. Set NEXT_PUBLIC_API_URL = https://aisimulation.onrender.com"
echo "5. Deploy!"
echo ""
