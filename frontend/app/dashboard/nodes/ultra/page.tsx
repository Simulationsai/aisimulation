'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Container, KeyRound, Copy, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'
import api from '@/lib/api'

export default function UltraNodeSetupPage() {
  const [error, setError] = useState('')
  const [creatingKey, setCreatingKey] = useState(false)
  const [nodeKey, setNodeKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const [creatingNode, setCreatingNode] = useState(false)
  const [createdNode, setCreatedNode] = useState<any | null>(null)

  const keyLabel = useMemo(() => {
    if (!nodeKey) return null
    return nodeKey.length > 18 ? `${nodeKey.slice(0, 8)}...${nodeKey.slice(-6)}` : nodeKey
  }, [nodeKey])

  const handleGenerateKey = async () => {
    setError('')
    setCreatingKey(true)
    try {
      const created = await api.apiKeys.create(`ultra-node-${Date.now()}`)
      setNodeKey(created.key)
    } catch (e: any) {
      setError(e?.message || 'Failed to generate node key')
    } finally {
      setCreatingKey(false)
    }
  }

  const handleCopy = async () => {
    if (!nodeKey) return
    await navigator.clipboard.writeText(nodeKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleCreateNode = async () => {
    if (!nodeKey) {
      setError('Generate a node key first')
      return
    }
    setError('')
    setCreatingNode(true)
    try {
      const node = await api.nodes.createUltra(nodeKey)
      setCreatedNode(node)
    } catch (e: any) {
      setError(e?.message || 'Failed to create Ultra node')
    } finally {
      setCreatingNode(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard/nodes" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Node Management
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Container className="w-9 h-9 text-cyan-500" />
            <h1 className="text-4xl font-bold">Ultra Node</h1>
          </div>
          <p className="text-gray-400">Generate a key, start the node in the extension/app, then monitor performance.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="glass-effect rounded-lg p-6 border border-cyan-500/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-gray-400">Step 1</div>
                <div className="text-xl font-semibold">You selected Ultra Node</div>
                <div className="text-sm text-gray-400 mt-1">Next: generate a node key.</div>
              </div>
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="glass-effect rounded-lg p-6 border border-cyan-500/20">
            <div className="text-sm text-gray-400">Step 2</div>
            <div className="text-xl font-semibold mb-3">Generate your node key</div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGenerateKey}
                disabled={creatingKey}
                className="px-5 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {creatingKey ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <KeyRound className="w-5 h-5" />
                    Generate Key
                  </>
                )}
              </button>

              <button
                onClick={handleCopy}
                disabled={!nodeKey}
                className="px-5 py-3 border border-cyan-500/40 text-cyan-200 rounded-lg hover:border-cyan-400 hover:text-cyan-100 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Copy className="w-5 h-5" />
                {copied ? 'Copied' : 'Copy Key'}
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-300">
              Key: <span className="font-semibold text-cyan-200">{keyLabel || '—'}</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="glass-effect rounded-lg p-6 border border-cyan-500/20">
            <div className="text-sm text-gray-400">Step 3</div>
            <div className="text-xl font-semibold mb-2">Start your node in the Extension or Mobile App</div>
            <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
              <li>Download the Extension or Mobile App (coming soon).</li>
              <li>Paste your node key.</li>
              <li>Tap “Start Node”.</li>
            </ol>

            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                disabled
                className="px-5 py-3 border border-gray-800 text-gray-400 rounded-lg opacity-60 cursor-not-allowed"
                title="Coming soon"
              >
                Download Extension (Coming soon)
              </button>
              <button
                type="button"
                disabled
                className="px-5 py-3 border border-gray-800 text-gray-400 rounded-lg opacity-60 cursor-not-allowed"
                title="Coming soon"
              >
                Download Mobile App (Coming soon)
              </button>
            </div>
          </div>

          {/* Step 4 */}
          <div className="glass-effect rounded-lg p-6 border border-cyan-500/20">
            <div className="text-sm text-gray-400">Step 4</div>
            <div className="text-xl font-semibold mb-2">Go to your node dashboard</div>
            <p className="text-sm text-gray-400 mb-4">
              After you’ve entered the key in the extension/app, create your Ultra node record here and open its dashboard to view performance.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCreateNode}
                disabled={!nodeKey || creatingNode || !!createdNode}
                className="px-5 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {creatingNode ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating...
                  </>
                ) : createdNode ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Node Created
                  </>
                ) : (
                  <>
                    Create Node Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {createdNode?.id ? (
                <Link
                  href={`/dashboard/nodes/${createdNode.id}`}
                  className="px-5 py-3 border border-cyan-500/40 text-cyan-200 rounded-lg hover:border-cyan-400 hover:text-cyan-100 transition-all flex items-center justify-center gap-2"
                >
                  Open Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="px-5 py-3 border border-gray-800 text-gray-400 rounded-lg opacity-60 cursor-not-allowed"
                  title="Create the node first"
                >
                  Open Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

