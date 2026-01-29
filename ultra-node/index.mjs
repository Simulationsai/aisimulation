/* Ultra Node (local dev) runner.
 *
 * This is a lightweight simulator that:
 * - Registers a node using a generated node key (API key)
 * - Periodically reports uptime + metrics to the backend
 *
 * Required env:
 * - SIMU_NODE_KEY: the node key generated in the dashboard
 *
 * Optional env:
 * - SIMU_API_URL: backend base URL (default: http://localhost:3001)
 * - SIMU_NODE_TYPE: ultra|lite (default: ultra)
 * - SIMU_NODE_NAME: display name (default: Ultra Node (Docker))
 * - SIMU_REPORT_INTERVAL_SECONDS: report interval in seconds (default: 30)
 */

const SIMU_API_URL = (process.env.SIMU_API_URL || 'http://localhost:3001').replace(/\/+$/, '')
const SIMU_NODE_KEY = (process.env.SIMU_NODE_KEY || '').trim()
const SIMU_NODE_TYPE = (process.env.SIMU_NODE_TYPE || 'ultra').trim()
const SIMU_NODE_NAME = (process.env.SIMU_NODE_NAME || 'Ultra Node (Docker)').trim()
const SIMU_REPORT_INTERVAL_SECONDS = Number(process.env.SIMU_REPORT_INTERVAL_SECONDS || 30)

if (!SIMU_NODE_KEY) {
  console.error('Missing SIMU_NODE_KEY. Set it to the node key you generated in the dashboard.')
  process.exit(1)
}

if (!['ultra', 'lite'].includes(SIMU_NODE_TYPE)) {
  console.error('SIMU_NODE_TYPE must be "ultra" or "lite"')
  process.exit(1)
}

if (!Number.isFinite(SIMU_REPORT_INTERVAL_SECONDS) || SIMU_REPORT_INTERVAL_SECONDS < 5) {
  console.error('SIMU_REPORT_INTERVAL_SECONDS must be a number >= 5')
  process.exit(1)
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function httpJson(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    // ignore
  }
  if (!res.ok) {
    const msg = data?.message || data?.error || text || res.statusText
    throw new Error(`${res.status} ${msg}`)
  }
  return data
}

function randomMetrics() {
  return {
    cpu: Math.round((5 + Math.random() * 85) * 10) / 10,
    memory: Math.round((10 + Math.random() * 80) * 10) / 10,
    bandwidth: Math.round(50 + Math.random() * 950),
    latency: Math.round((5 + Math.random() * 60) * 10) / 10,
    tasksCompleted: Math.floor(Math.random() * 5000),
  }
}

async function main() {
  console.log(`SIMU_API_URL=${SIMU_API_URL}`)
  console.log(`SIMU_NODE_TYPE=${SIMU_NODE_TYPE}`)
  console.log(`SIMU_NODE_NAME=${SIMU_NODE_NAME}`)

  const registerUrl = `${SIMU_API_URL}/api/nodes/client/register`
  const reportUrl = `${SIMU_API_URL}/api/nodes/client/report`

  console.log('Registering node...')
  const reg = await httpJson(registerUrl, { nodeKey: SIMU_NODE_KEY, type: SIMU_NODE_TYPE, name: SIMU_NODE_NAME })
  const nodeId = reg?.node?.id
  if (!nodeId) throw new Error('Register failed: missing node.id in response')
  console.log(`Registered nodeId=${nodeId}`)

  const intervalMs = Math.floor(SIMU_REPORT_INTERVAL_SECONDS * 1000)
  const uptimeHoursPerReport = SIMU_REPORT_INTERVAL_SECONDS / 3600

  // Report loop
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const metrics = randomMetrics()
    const result = await httpJson(reportUrl, {
      nodeKey: SIMU_NODE_KEY,
      nodeId,
      uptimeHours: uptimeHoursPerReport,
      metrics,
    })
    const xp = result?.xpAwarded ?? 0
    console.log(`[report] +${xp} XP | cpu=${metrics.cpu}% mem=${metrics.memory}% lat=${metrics.latency}ms`)
    await sleep(intervalMs)
  }
}

main().catch((e) => {
  console.error('Ultra node runner failed:', e?.message || e)
  process.exit(1)
})

