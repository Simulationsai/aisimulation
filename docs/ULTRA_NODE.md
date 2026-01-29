## Ultra Node — Docker / CLI Setup Guide

### 1) Generate a Node Key

In the web app:
- Go to `Dashboard → Nodes`
- Select **Ultra Node**
- Click **Generate Key**
- Copy the key (this is your `SIMU_NODE_KEY`)

### 2) Run the Ultra Node (Docker)

From the repo root:

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

### 3) Or run via CLI (Node.js)

```bash
export SIMU_API_URL="http://localhost:3001"
export SIMU_NODE_KEY="YOUR_NODE_KEY_HERE"
export SIMU_NODE_NAME="Ultra Node (CLI)"
node ./ultra-node/index.mjs
```

### 4) Open your Node Dashboard and monitor performance

- Go to `Dashboard → Nodes`
- Find your node under **Your Nodes**
- Click **Dashboard**

### What this does (today)

This current Ultra Node runner is a **local dev simulator**:
- Registers a node under your account using the node key
- Reports uptime and mock metrics periodically
- Updates your node’s “Live Metrics” in the UI
- Awards **Node XP** via the backend’s node XP logic

### Backend endpoints used

- `POST /api/nodes/client/register`
- `POST /api/nodes/client/report`

