## Ultra Node (Docker/CLI) — Local Dev Runner

This folder contains a **simple Ultra Node runner** that works with your backend.

It will:
- Register an Ultra node using your **Node Key**
- Periodically report uptime + metrics to the backend (awards Node XP)

### Prerequisites
- Backend running on `http://localhost:3001`
- A **Node Key** generated from the app: `Dashboard → Nodes → Ultra Node → Generate Key`

### Option A: Run via Docker (recommended)

Build the image:

```bash
docker build -t aisimulation-ultra-node ./ultra-node
```

Run it (macOS):

```bash
docker run --rm \
  -e SIMU_API_URL="http://host.docker.internal:3001" \
  -e SIMU_NODE_KEY="YOUR_NODE_KEY_HERE" \
  -e SIMU_NODE_NAME="Ultra Node (Docker)" \
  aisimulation-ultra-node
```

### Option B: Run via CLI (Node.js)

```bash
export SIMU_API_URL="http://localhost:3001"
export SIMU_NODE_KEY="YOUR_NODE_KEY_HERE"
export SIMU_NODE_NAME="Ultra Node (CLI)"
node ./ultra-node/index.mjs
```

### Where to see it in the UI

1. Go to `Dashboard → Nodes`
2. Your node should appear in **Your Nodes**
3. Click **Dashboard** to view metrics and status

### Notes
- This runner is a **simulator** (random metrics) and is meant for local development until the real Ultra Node runtime is shipped.
- The backend endpoints used are:
  - `POST /api/nodes/client/register`
  - `POST /api/nodes/client/report`

