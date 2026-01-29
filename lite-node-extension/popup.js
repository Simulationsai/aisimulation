function sendMessage(msg) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(msg, (resp) => resolve(resp))
  })
}

function fmtIso(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

function setText(id, text, cls) {
  const el = document.getElementById(id)
  el.textContent = text
  el.className = cls || ''
}

async function refresh() {
  const resp = await sendMessage({ type: 'GET_STATE' })
  if (!resp?.ok) return
  const s = resp.state

  document.getElementById('apiUrl').value = s.apiUrl || ''
  document.getElementById('nodeKey').value = s.nodeKey || ''
  document.getElementById('nodeName').value = s.nodeName || ''
  document.getElementById('intervalMinutes').value = String(s.intervalMinutes || 1)

  setText('running', s.running ? 'Yes' : 'No', s.running ? 'ok' : 'muted')
  setText('nodeId', s.nodeId || '—', s.nodeId ? 'ok' : 'muted')
  setText('lastReport', fmtIso(s.lastReportAt), s.lastReportAt ? 'ok' : 'muted')
  setText('lastXp', String(s.lastXpAwarded ?? 0), 'ok')
  setText('lastError', s.lastError ? s.lastError : '—', s.lastError ? 'bad' : 'muted')

  document.getElementById('startBtn').disabled = !!s.running
  document.getElementById('stopBtn').disabled = !s.running
}

async function saveSettings() {
  const apiUrl = document.getElementById('apiUrl').value
  const nodeKey = document.getElementById('nodeKey').value
  const nodeName = document.getElementById('nodeName').value
  const intervalMinutes = Number(document.getElementById('intervalMinutes').value || 1)
  const resp = await sendMessage({ type: 'SAVE_SETTINGS', apiUrl, nodeKey, nodeName, intervalMinutes })
  if (!resp?.ok) {
    alert(resp?.error || 'Failed to save')
  }
  await refresh()
}

async function start() {
  await saveSettings()
  const resp = await sendMessage({ type: 'START' })
  if (!resp?.ok) alert(resp?.error || 'Failed to start')
  await refresh()
}

async function stop() {
  const resp = await sendMessage({ type: 'STOP' })
  if (!resp?.ok) alert(resp?.error || 'Failed to stop')
  await refresh()
}

async function test() {
  await saveSettings()
  const resp = await sendMessage({ type: 'TEST' })
  if (resp?.ok) alert(`OK (HTTP ${resp.status})`)
  else alert(resp?.error || 'Test failed')
}

document.getElementById('saveBtn').addEventListener('click', saveSettings)
document.getElementById('startBtn').addEventListener('click', start)
document.getElementById('stopBtn').addEventListener('click', stop)
document.getElementById('testBtn').addEventListener('click', test)

refresh()
setInterval(refresh, 1200)

