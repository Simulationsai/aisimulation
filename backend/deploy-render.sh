#!/bin/bash

# Automated Render Deployment Script
# This script attempts to deploy via Render API if credentials are available

set -e

echo "🚀 SimulationAI Backend - Render Deployment"
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check for Render API key
if [ -z "$RENDER_API_KEY" ]; then
    echo -e "${YELLOW}⚠${NC} RENDER_API_KEY not found"
    echo ""
    echo "To deploy via API:"
    echo "1. Get API key from: https://dashboard.render.com/account/api-keys"
    echo "2. Export: export RENDER_API_KEY='your-key'"
    echo "3. Run this script again"
    echo ""
    echo -e "${BLUE}📋 Manual Deployment (Recommended):${NC}"
    echo "1. Go to: https://dashboard.render.com"
    echo "2. Click 'New +' → 'Blueprint'"
    echo "3. Connect: Simulationsai/aisimulation"
    echo "4. Review config (already in render.yaml)"
    echo "5. Add JWT_SECRET environment variable"
    echo "6. Click 'Apply'"
    echo ""
    echo "See: DEPLOY-AUTOMATED.md for full instructions"
    exit 0
fi

RENDER_API="https://api.render.com/v1"

echo -e "${GREEN}✓${NC} Render API key found"
echo ""

# Check if service exists
echo "Checking for existing service..."
SERVICE_ID=$(curl -s -H "Authorization: Bearer $RENDER_API_KEY" \
    "$RENDER_API/services?name=simulationai-api" | jq -r '.[0].id' 2>/dev/null || echo "")

if [ -n "$SERVICE_ID" ] && [ "$SERVICE_ID" != "null" ]; then
    echo -e "${YELLOW}⚠${NC} Service 'simulationai-api' already exists (ID: $SERVICE_ID)"
    echo ""
    echo "Triggering manual deploy..."
    DEPLOY_ID=$(curl -s -X POST \
        -H "Authorization: Bearer $RENDER_API_KEY" \
        -H "Content-Type: application/json" \
        "$RENDER_API/services/$SERVICE_ID/deploys" | jq -r '.id' 2>/dev/null || echo "")
    
    if [ -n "$DEPLOY_ID" ] && [ "$DEPLOY_ID" != "null" ]; then
        echo -e "${GREEN}✓${NC} Deploy triggered! Deploy ID: $DEPLOY_ID"
        echo "Check status at: https://dashboard.render.com"
    else
        echo -e "${RED}❌${NC} Failed to trigger deploy"
        echo "Please deploy manually via Render dashboard"
    fi
    exit 0
fi

echo -e "${GREEN}✓${NC} No existing service found"
echo ""

# Get owner ID
echo "Getting account information..."
OWNER_ID=$(curl -s -H "Authorization: Bearer $RENDER_API_KEY" \
    "$RENDER_API/owners" | jq -r '.[0].id' 2>/dev/null || echo "")

if [ -z "$OWNER_ID" ] || [ "$OWNER_ID" = "null" ]; then
    echo -e "${RED}❌${NC} Could not get owner ID"
    echo "Please check your API key"
    exit 1
fi

echo -e "${GREEN}✓${NC} Owner ID: $OWNER_ID"
echo ""

# Note: Creating a service via API requires repository connection
# which is complex. Recommend manual deployment via Blueprint.
echo -e "${BLUE}ℹ${NC} Service creation via API requires repository setup"
echo ""
echo "For first-time deployment, use Render Blueprint:"
echo "1. Go to: https://dashboard.render.com"
echo "2. Click 'New +' → 'Blueprint'"
echo "3. Connect: Simulationsai/aisimulation"
echo "4. Render will read backend/render.yaml automatically"
echo "5. Add JWT_SECRET and deploy"
echo ""
echo "See: DEPLOY-AUTOMATED.md for detailed steps"
