const DEFAULTS = {
  apiUrl: 'http://localhost:3001',
  nodeKey: '',
  nodeId: '',
  nodeName: 'Lite Node (Extension)',
  running: false,
  intervalMinutes: 1, // Chrome alarms minimum is 1 minute
  lastReportAt: '',
  lastXpAwarded: 0,
  lastError: '',
}

const ALARM_NAME = 'liteNodeReport'

function normalizeApiUrl(url) {
  return String(url || '').trim().replace(/\/+$/, '')
}

async function getState() {
  const stored = await chrome.storage.local.get(Object.keys(DEFAULTS))
  return { ...DEFAULTS, ...stored, apiUrl: normalizeApiUrl(stored.apiUrl ?? DEFAULTS.apiUrl) }
}

async function setState(patch) {
  await chrome.storage.local.set(patch)
}

function randomMetrics() {
  return {
    cpu: Math.round((5 + Math.random() * 85) * 10) / 10,
    memory: Math.round((10 + Math.random() * 80) * 10) / 10,
    bandwidth: Math.round(50 + Math.random() * 950),
    latency: Math.round((5 + Math.random() * 40) * 10) / 10,
    tasksCompleted: Math.floor(Math.random() * 5000),
  }
}

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

async function ensureNodeRegistered(state) {
  if (state.nodeId) return state.nodeId

  const registerUrl = `${state.apiUrl}/api/nodes/client/register`
  const resp = await httpJson(registerUrl, {
    nodeKey: state.nodeKey,
    type: 'lite',
    name: state.nodeName || DEFAULTS.nodeName,
  })
  const nodeId = resp?.node?.id || ''
  if (!nodeId) throw new Error('Register failed: missing node.id')
  await setState({ nodeId })
  return nodeId
}

async function doReportTick() {
  const state = await getState()
  if (!state.running) return
  if (!state.nodeKey) {
    await setState({ running: false, lastError: 'Missing node key' })
    await chrome.alarms.clear(ALARM_NAME)
    return
  }

  try {
    await setState({ lastError: '' })
    const nodeId = await ensureNodeRegistered(state)
    const reportUrl = `${state.apiUrl}/api/nodes/client/report`
    const uptimeHours = (state.intervalMinutes || 1) / 60
    const metrics = randomMetrics()
    const resp = await httpJson(reportUrl, {
      nodeKey: state.nodeKey,
      nodeId,
      uptimeHours,
      metrics,
    })
    await setState({
      lastReportAt: new Date().toISOString(),
      lastXpAwarded: Number(resp?.xpAwarded || 0),
    })
  } catch (e) {
    const msg = e?.message ? String(e.message) : String(e)
    // If user stopped the node from the dashboard, pause the extension.
    if (msg.includes('409') && msg.toLowerCase().includes('stopped')) {
      await chrome.alarms.clear(ALARM_NAME)
      await setState({ running: false, lastError: 'Stopped from dashboard. Click Start to resume.' })
      return
    }
    await setState({ lastError: msg })
  }
}

async function start() {
  const state = await getState()
  if (!state.nodeKey) throw new Error('Enter your Node Key first')

  await setState({ running: true, lastError: '' })

  // Kick an immediate report (and register)
  await doReportTick()

  // Schedule repeating reports
  const intervalMinutes = Math.max(1, Number(state.intervalMinutes || 1))
  await chrome.alarms.create(ALARM_NAME, { periodInMinutes: intervalMinutes })
}

async function stop() {
  await chrome.alarms.clear(ALARM_NAME)
  await setState({ running: false })
}

async function resetNode() {
  await chrome.alarms.clear(ALARM_NAME)
  await setState({ nodeId: '', running: false })
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm?.name === ALARM_NAME) {
    doReportTick()
  }
})

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  ;(async () => {
    try {
      if (msg?.type === 'GET_STATE') {
        sendResponse({ ok: true, state: await getState() })
        return
      }
      if (msg?.type === 'SAVE_SETTINGS') {
        const apiUrl = normalizeApiUrl(msg?.apiUrl)
        const nodeKey = String(msg?.nodeKey || '').trim()
        const nodeName = String(msg?.nodeName || '').trim() || DEFAULTS.nodeName
        const intervalMinutes = Math.max(1, Number(msg?.intervalMinutes || 1))
        await setState({ apiUrl, nodeKey, nodeName, intervalMinutes })
        sendResponse({ ok: true })
        return
      }
      if (msg?.type === 'START') {
        await start()
        sendResponse({ ok: true })
        return
      }
      if (msg?.type === 'STOP') {
        await stop()
        sendResponse({ ok: true })
        return
      }
      if (msg?.type === 'RESET_NODE') {
        await resetNode()
        sendResponse({ ok: true })
        return
      }
      if (msg?.type === 'TEST') {
        const state = await getState()
        const url = `${state.apiUrl}/api/health`
        const res = await fetch(url)
        sendResponse({ ok: res.ok, status: res.status })
        return
      }

      sendResponse({ ok: false, error: 'Unknown message' })
    } catch (e) {
      sendResponse({ ok: false, error: e?.message ? String(e.message) : String(e) })
    }
  })()

  // keep message channel open for async
  return true
})

