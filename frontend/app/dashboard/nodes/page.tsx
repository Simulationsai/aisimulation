'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Server, Cloud, Container, AlertCircle, Play, Square, Activity, ArrowRight } from 'lucide-react'
import api from '@/lib/api'

export default function NodesPage() {
  const [nodes, setNodes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    loadNodes()
  }, [])

  const loadNodes = async () => {
    try {
      setLoading(true)
      const nodesData = await api.nodes.list()
      setNodes(nodesData)
    } catch (err: any) {
      setError(err.message || 'Failed to load nodes')
    } finally {
      setLoading(false)
    }
  }

  const handleStart = async (id: string) => {
    setActionLoading(id)
    try {
      await api.nodes.start(id)
      await loadNodes()
    } catch (err: any) {
      setError(err.message || 'Failed to start node')
    } finally {
      setActionLoading(null)
    }
  }

  const handleStop = async (id: string) => {
    setActionLoading(id)
    try {
      await api.nodes.stop(id)
      await loadNodes()
    } catch (err: any) {
      setError(err.message || 'Failed to stop node')
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white py-8 px-4 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-purple-500 rounded-full animate-spin"></div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Node Management</h1>
            <p className="text-gray-400">Select a node type, generate a key, then monitor performance</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Select node type */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Link
            href="/dashboard/nodes/lite"
            className="glass-effect rounded-lg p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-colors group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Cloud className="w-8 h-8 text-cyan-500" />
                <div>
                  <h2 className="text-2xl font-bold">Lite Node</h2>
                  <p className="text-gray-400 text-sm">Fast, lightweight contribution</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-cyan-300/70 group-hover:text-cyan-200 transition-colors" />
            </div>
            <div className="mt-4 text-sm text-gray-400">
              1) Select Lite Node → 2) Generate key → 3) Start in extension/app → 4) Monitor performance
            </div>
          </Link>

          <Link
            href="/dashboard/nodes/ultra"
            className="glass-effect rounded-lg p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-colors group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Container className="w-8 h-8 text-cyan-500" />
                <div>
                  <h2 className="text-2xl font-bold">Ultra Node</h2>
                  <p className="text-gray-400 text-sm">Heavier compute (Docker / GPU optional)</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-cyan-300/70 group-hover:text-cyan-200 transition-colors" />
            </div>
            <div className="mt-4 text-sm text-gray-400">
              1) Select Ultra Node → 2) Generate key → 3) Start in extension/app → 4) Monitor performance
            </div>
          </Link>
        </div>

        {/* Node List */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Your Nodes</h2>
          <p className="text-sm text-gray-400">Start/stop nodes and open the node dashboard</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {nodes.length === 0 ? (
            <div className="col-span-2 glass-effect rounded-lg p-12 text-center">
              <Server className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Nodes Yet</h3>
              <p className="text-gray-400 mb-6">
                Pick a node type above to generate a key and start your first node.
              </p>
            </div>
          ) : (
            nodes.map((node) => (
              <div key={node.id} className="glass-effect rounded-lg p-6 border border-cyan-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {node.type === 'lite' ? (
                      <Cloud className="w-8 h-8 text-cyan-500" />
                    ) : (
                      <Container className="w-8 h-8 text-cyan-500" />
                    )}
                    <div>
                      <h3 className="text-xl font-bold">{node.name}</h3>
                      <p className="text-sm text-gray-400 capitalize">{node.type} Node</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    node.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {node.status}
                  </span>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="font-semibold text-green-600 capitalize">{node.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="font-semibold capitalize">{node.type === 'lite' ? 'Cloud' : 'Docker'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uptime:</span>
                    <span className="font-semibold">{node.uptime || 0}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Earnings (XP):</span>
                    <span className="font-semibold text-green-600">{node.earnings || 0} XP</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {node.status === 'active' ? (
                    <button
                      onClick={() => handleStop(node.id)}
                      disabled={actionLoading === node.id}
                      className="flex-1 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {actionLoading === node.id ? (
                        <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Square className="w-4 h-4" />
                          Stop
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStart(node.id)}
                      disabled={actionLoading === node.id}
                      className="flex-1 px-4 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {actionLoading === node.id ? (
                        <div className="w-4 h-4 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Start
                        </>
                      )}
                    </button>
                  )}
                  <Link
                    href={`/dashboard/nodes/${node.id}`}
                    className="px-4 py-2 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2"
                  >
                    <Activity className="w-4 h-4" />
                    Dashboard
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Node Types Info */}
        <div className="glass-effect rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Node Types</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Cloud className="w-5 h-5 text-cyan-400" />
                Lite Node (Cloud)
              </h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>- Low compute, fast inference</li>
                <li>- Used for latency/load predictions</li>
                <li>- Cloud-hosted (Render/VPS)</li>
                <li>- Less than 10ms response time</li>
                <li>- 10K+ concurrent users per node</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Container className="w-5 h-5 text-cyan-400" />
                Ultra Node (Docker)
              </h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>- Heavy compute, GPU optional</li>
                <li>- Used for real-time simulations</li>
                <li>- Docker-based deployment</li>
                <li>- Less than 50ms response time</li>
                <li>- 1K+ concurrent heavy tasks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
