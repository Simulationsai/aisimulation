'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Activity, AlertCircle, Play, Square, RefreshCw, Server, Cloud, Container } from 'lucide-react'
import api from '@/lib/api'

export default function NodeDashboardPage() {
  const params = useParams<{ id: string }>()
  const nodeId = params?.id

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [node, setNode] = useState<any | null>(null)
  const [metrics, setMetrics] = useState<{ cpu: number; memory: number; bandwidth: number; latency: number; tasksCompleted: number } | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [metricsLoading, setMetricsLoading] = useState(false)

  const load = async () => {
    if (!nodeId) return
    setError('')
    setLoading(true)
    try {
      const [n, m] = await Promise.all([api.nodes.get(nodeId), api.nodes.getMetrics(nodeId)])
      setNode(n)
      setMetrics(m)
    } catch (e: any) {
      setError(e?.message || 'Failed to load node dashboard')
    } finally {
      setLoading(false)
    }
  }

  const refreshMetrics = async () => {
    if (!nodeId) return
    setError('')
    setMetricsLoading(true)
    try {
      // Refresh BOTH node and metrics so earnings/status update live.
      const [n, m] = await Promise.all([api.nodes.get(nodeId), api.nodes.getMetrics(nodeId)])
      setNode(n)
      setMetrics(m)
    } catch (e: any) {
      setError(e?.message || 'Failed to refresh metrics')
    } finally {
      setMetricsLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId])

  // Keep node + metrics fresh while this page is open.
  useEffect(() => {
    if (!nodeId) return
    const interval = setInterval(() => {
      // Avoid spamming errors if user navigates away
      if (document.visibilityState !== 'visible') return
      refreshMetrics()
    }, 8000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId])

  const handleStartStop = async () => {
    if (!nodeId || !node) return
    setError('')
    setActionLoading(true)
    try {
      const updated = node.status === 'active' ? await api.nodes.stop(nodeId) : await api.nodes.start(nodeId)
      setNode(updated)
    } catch (e: any) {
      setError(e?.message || 'Failed to update node status')
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white py-8 px-4 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-purple-500 rounded-full animate-spin" />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <Link href="/dashboard/nodes" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Node Management
          </Link>

          <Link
            href="/dashboard/performance"
            className="inline-flex items-center gap-2 border border-gray-800 rounded-lg px-4 py-2 hover:bg-gray-900 transition-colors text-sm"
          >
            <Activity className="w-4 h-4" />
            Performance
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="glass-effect rounded-lg p-6 border border-cyan-500/20 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              {node?.type === 'lite' ? (
                <Cloud className="w-8 h-8 text-cyan-500" />
              ) : node?.type === 'ultra' ? (
                <Container className="w-8 h-8 text-cyan-500" />
              ) : (
                <Server className="w-8 h-8 text-cyan-500" />
              )}
              <div>
                <h1 className="text-3xl font-bold">{node?.name || 'Node Dashboard'}</h1>
                <p className="text-sm text-gray-400">
                  <span className="capitalize">{node?.type || 'node'}</span> •{' '}
                  <span className={node?.status === 'active' ? 'text-green-400' : 'text-gray-400'}>
                    {node?.status || 'unknown'}
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={handleStartStop}
              disabled={actionLoading || !node}
              className="px-4 py-2 rounded-lg border border-gray-800 hover:bg-gray-900 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {actionLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : node?.status === 'active' ? (
                <>
                  <Square className="w-4 h-4 text-red-400" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-green-400" />
                  Start
                </>
              )}
            </button>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-6 text-sm">
            <div className="rounded-lg border border-gray-800 p-4">
              <div className="text-gray-400">Uptime</div>
              <div className="text-xl font-semibold">{node?.uptime ?? 0}%</div>
            </div>
            <div className="rounded-lg border border-gray-800 p-4">
              <div className="text-gray-400">Earnings (XP)</div>
              <div className="text-xl font-semibold text-green-400">
                {Number(node?.earnings ?? 0).toFixed(4)} XP
              </div>
            </div>
            <div className="rounded-lg border border-gray-800 p-4">
              <div className="text-gray-400">Created</div>
              <div className="text-xl font-semibold">
                {node?.createdAt ? new Date(node.createdAt).toLocaleDateString() : '—'}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-effect rounded-lg p-6 border border-cyan-500/20">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-2xl font-bold">Live Metrics</h2>
            <button
              onClick={refreshMetrics}
              disabled={metricsLoading}
              className="px-4 py-2 rounded-lg border border-gray-800 hover:bg-gray-900 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
            >
              {metricsLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Refresh
            </button>
          </div>

          {metrics ? (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-gray-800 p-4">
                <div className="text-gray-400 text-sm">CPU</div>
                <div className="text-2xl font-semibold">{metrics.cpu.toFixed(1)}%</div>
              </div>
              <div className="rounded-lg border border-gray-800 p-4">
                <div className="text-gray-400 text-sm">Memory</div>
                <div className="text-2xl font-semibold">{metrics.memory.toFixed(1)}%</div>
              </div>
              <div className="rounded-lg border border-gray-800 p-4">
                <div className="text-gray-400 text-sm">Bandwidth</div>
                <div className="text-2xl font-semibold">{metrics.bandwidth.toFixed(0)} MB</div>
              </div>
              <div className="rounded-lg border border-gray-800 p-4">
                <div className="text-gray-400 text-sm">Latency</div>
                <div className="text-2xl font-semibold">{metrics.latency.toFixed(1)} ms</div>
              </div>
              <div className="rounded-lg border border-gray-800 p-4 md:col-span-2">
                <div className="text-gray-400 text-sm">Tasks Completed</div>
                <div className="text-2xl font-semibold">{metrics.tasksCompleted.toLocaleString()}</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-400">No metrics available yet.</div>
          )}
        </div>
      </div>
    </main>
  )
}

