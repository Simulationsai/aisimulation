'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Key, Plus, Trash2, Copy, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'
import api from '@/lib/api'

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [copied, setCopied] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadApiKeys()
  }, [])

  const loadApiKeys = async () => {
    try {
      setLoading(true)
      const keys = await api.apiKeys.list()
      setApiKeys(keys)
    } catch (err: any) {
      setError(err.message || 'Failed to load API keys')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    setError('')

    try {
      const newKey = await api.apiKeys.create(newKeyName)
      setApiKeys([...apiKeys, newKey])
      setNewKeyName('')
    } catch (err: any) {
      setError(err.message || 'Failed to create API key')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this API key?')) return

    try {
      await api.apiKeys.delete(id)
      setApiKeys(apiKeys.filter(k => k.id !== id))
    } catch (err: any) {
      setError(err.message || 'Failed to delete API key')
    }
  }

  const toggleVisibility = (id: string) => {
    const newVisible = new Set(visibleKeys)
    if (newVisible.has(id)) {
      newVisible.delete(id)
    } else {
      newVisible.add(id)
    }
    setVisibleKeys(newVisible)
  }

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    setCopied(key)
    setTimeout(() => setCopied(''), 2000)
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

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">API Keys</h1>
          <p className="text-gray-400">Generate and manage API keys for your applications</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Create New Key */}
        <div className="glass-effect rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Key className="w-6 h-6 text-cyan-500" />
              API Keys
            </h2>
            <form onSubmit={handleCreate} className="flex gap-3">
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="Key name (e.g., Production Key)"
                required
                className="px-4 py-2 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-white"
                disabled={creating}
              />
              <button
                type="submit"
                disabled={creating}
                className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {creating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Generate New Key
                  </>
                )}
              </button>
            </form>
          </div>
          <p className="text-sm text-gray-400">
            API keys allow you to access SimulationAI APIs programmatically. Keep your keys secure and never share them publicly.
          </p>
        </div>

        {/* API Keys List */}
        <div className="glass-effect rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Your API Keys</h3>
          {apiKeys.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No API keys yet. Create one above.</p>
          ) : (
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{apiKey.name}</h4>
                      <div className="flex items-center gap-2">
                        <code className="text-sm text-gray-400 bg-black px-2 py-1 rounded">
                          {visibleKeys.has(apiKey.id) ? apiKey.key : `${apiKey.key.substring(0, 20)}...`}
                        </code>
                        <button onClick={() => copyKey(apiKey.key)} className="p-1 hover:bg-gray-800 rounded">
                          {copied === apiKey.key ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-cyan-400" />
                          )}
                        </button>
                        <button onClick={() => toggleVisibility(apiKey.id)} className="p-1 hover:bg-gray-800 rounded">
                          {visibleKeys.has(apiKey.id) ? (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(apiKey.id)}
                      className="p-2 hover:bg-red-600/20 rounded text-red-400"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 mb-1">Created</p>
                      <p className="font-semibold">{new Date(apiKey.created).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Usage</p>
                      <p className="font-semibold">{apiKey.usage || 0} requests</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Limit</p>
                      <p className="font-semibold">{apiKey.limit}/month</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Usage Limits */}
        <div className="glass-effect rounded-lg p-6 mt-6">
          <h3 className="text-xl font-semibold mb-4">Usage Limits</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-2">Rate Limit</p>
              <p className="text-2xl font-bold">100 requests/minute</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Monthly Limit</p>
              <p className="text-2xl font-bold">10,000 requests</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
