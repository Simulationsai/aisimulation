## AISimulation Lite Node — Chrome Extension (MV3)

This is a **Chrome extension** that runs a Lite Node from your browser:
- Registers a node using your **Node Key**
- Periodically reports uptime + metrics to your backend
- Your node will then appear in `Dashboard → Nodes`, and the node dashboard will show metrics

### Prerequisites
- Backend running (local: `http://localhost:3001`)
- A **Node Key** generated from the app:
  - `Dashboard → Nodes → Lite Node → Generate Key`

### Install (Load unpacked)

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select this folder: `lite-node-extension/`

### Configure + Start

1. Click the extension icon
2. Set:
   - **API URL**: `http://localhost:3001`
   - **Node Key**: your generated key (`sk_test_...`)
3. Click **Start**

### View in the app
- `Dashboard → Nodes` → your node should appear
- Click **Dashboard** to view live metrics

### Notes
- Report interval minimum is **1 minute** (Chrome alarm limitation).
- The extension uses:
  - `POST /api/nodes/client/register`
  - `POST /api/nodes/client/report`

