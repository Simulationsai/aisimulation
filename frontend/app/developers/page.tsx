'use client'

import Link from 'next/link'
import { ArrowLeft, Code, BookOpen, Github, Terminal, Zap, FileCode, Key, Sparkles, Copy, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function DevelopersPage() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-black text-white py-20 px-8">
      {/* Hero Section */}
      <section className="relative py-32 px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-cyan-900/20"></div>
          <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-cyan-500/30 mb-6">
              <Code className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300">Developer Tools</span>
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Code className="w-16 h-16 text-cyan-500" />
              <h1 className="text-6xl md:text-7xl font-bold">Developer Tools</h1>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Integrate SimulationAI into your applications with our comprehensive SDK and APIs
            </p>
          </div>
        </div>
      </section>

      {/* Developer Tools Grid */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-effect rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-xl bg-cyan-600/20 border border-cyan-500/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold mb-3">API Documentation</h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Complete REST API reference with examples, authentication, and endpoints
              </p>
              <Link
                href="/developers/api-docs"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                View Docs
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-xl bg-cyan-600/20 border border-cyan-500/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileCode className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold mb-3">SDK Downloads</h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Official SDKs for JavaScript, Python, Go, and Rust
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-cyan-600/20 rounded text-sm border border-cyan-500/30">JavaScript</span>
                <span className="px-3 py-1 bg-cyan-600/20 rounded text-sm border border-cyan-500/30">Python</span>
                <span className="px-3 py-1 bg-cyan-600/20 rounded text-sm border border-cyan-500/30">Go</span>
                <span className="px-3 py-1 bg-cyan-600/20 rounded text-sm border border-cyan-500/30">Rust</span>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-8 border border-green-500/20 hover:border-green-500/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-xl bg-green-600/20 border border-green-500/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Github className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-3">GitHub Integration</h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Open source examples, node integration guides, and community contributions
              </p>
              <a
                href="https://github.com/simulationai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300"
              >
                Visit GitHub
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </a>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-8 border border-yellow-500/20 hover:border-yellow-500/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-xl bg-yellow-600/20 border border-yellow-500/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Key className="w-8 h-8 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold mb-3">API Keys</h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Generate and manage API keys for your applications
              </p>
              <Link
                href="/dashboard/api-keys"
                className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300"
              >
                Manage Keys
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-xl bg-cyan-600/20 border border-cyan-500/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Terminal className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold mb-3">API Playground</h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Test API endpoints interactively with our playground
              </p>
              <Link
                href="/developers/playground"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                Open Playground
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-xl bg-cyan-600/20 border border-cyan-500/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Node Integration</h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Guides for integrating Lite and Ultra nodes into your infrastructure
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                View Integration
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <section className="max-w-7xl mx-auto glass-effect rounded-2xl p-8 mb-16 border border-cyan-500/20">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Zap className="w-8 h-8 text-cyan-500" />
          Quick Start
        </h2>
        <div className="space-y-4">
          <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-cyan-400">1.</span> Install SDK
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <code className="flex-1 p-3 bg-black rounded text-sm text-green-400 border border-gray-800">
                npm install @simulationai/sdk
              </code>
              <button
                onClick={() => copyToClipboard('npm install @simulationai/sdk')}
                className="p-2 hover:bg-gray-900 rounded border border-gray-800"
              >
                {copied ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-400" />}
              </button>
            </div>
          </div>
          <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-cyan-400">2.</span> Initialize Client
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <code className="flex-1 p-3 bg-black rounded text-sm text-green-400 border border-gray-800">
                import SimulationAI from '@simulationai/sdk';{'\n'}const client = new SimulationAI({'{'} apiKey: 'your_key' {'}'});
              </code>
              <button
                onClick={() => copyToClipboard("import SimulationAI from '@simulationai/sdk';\nconst client = new SimulationAI({ apiKey: 'your_key' });")}
                className="p-2 hover:bg-gray-900 rounded border border-gray-800"
              >
                {copied ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-400" />}
              </button>
            </div>
          </div>
          <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-cyan-400">3.</span> Run Workload
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <code className="flex-1 p-3 bg-black rounded text-sm text-green-400 border border-gray-800">
                const result = await client.run({'{'} workload: 'simulation' {'}'});
              </code>
              <button
                onClick={() => copyToClipboard("const result = await client.run({ workload: 'simulation' });")}
                className="p-2 hover:bg-gray-900 rounded border border-gray-800"
              >
                {copied ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-400" />}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
