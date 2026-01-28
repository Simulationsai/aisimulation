import Link from 'next/link'
import { ArrowLeft, Container, CheckCircle, Zap, Server, Download, Cpu } from 'lucide-react'

export default function UltraNodePage() {
  return (
    <main className="min-h-screen bg-black text-white py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Container className="w-12 h-12 text-cyan-500" />
              <h1 className="text-5xl font-bold">Ultra Node</h1>
            </div>
            <p className="text-xl text-gray-400">
              High-performance Docker node for advanced users. Maximum rewards with dedicated compute resources.
            </p>
          </div>

          {/* Specs */}
          <section className="glass-effect rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6">Docker Specifications</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Deployment</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Docker container</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Local machine or VPS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Full control</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Hardware Requirements</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>4+ CPU cores</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>8GB+ RAM</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>GPU optional (recommended)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Stable internet connection</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Setup Guide */}
          <section className="glass-effect rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6">Docker Setup Guide</h2>
            <div className="space-y-4">
              <div className="p-4 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-cyan-400">1</span>
                  <h3 className="text-xl font-semibold">Install Docker</h3>
                </div>
                <p className="text-gray-300 ml-12">Install Docker Desktop or Docker Engine on your machine</p>
                <code className="block mt-2 ml-12 p-2 bg-black rounded text-sm text-green-400">
                  curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh
                </code>
              </div>
              <div className="p-4 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-cyan-400">2</span>
                  <h3 className="text-xl font-semibold">Get Node Token</h3>
                </div>
                <p className="text-gray-300 ml-12">Generate your node token from the dashboard</p>
              </div>
              <div className="p-4 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-cyan-400">3</span>
                  <h3 className="text-xl font-semibold">Run Docker Container</h3>
                </div>
                <p className="text-gray-300 ml-12 mb-2">Pull and run the Ultra Node container</p>
                <code className="block mt-2 ml-12 p-2 bg-black rounded text-sm text-green-400">
                  docker run -d --name simulationai-ultra -e NODE_TOKEN=your_token simulationai/ultra-node:latest
                </code>
              </div>
            <div className="p-4 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-cyan-400">4</span>
                <h3 className="text-xl font-semibold">Monitor & Earn</h3>
              </div>
              <p className="text-gray-300 ml-12">Monitor node status in dashboard and start earning XP that will later convert to SIMU tokens</p>
            </div>
            </div>
          </section>

          {/* Performance Benefits */}
          <section className="glass-effect rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6">Performance Benefits</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-cyan-600/10 rounded-lg border border-cyan-500/20 text-center">
                <Cpu className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-cyan-400">2-3x</p>
                <p className="text-sm text-gray-400">Higher Rewards</p>
              </div>
              <div className="p-4 bg-cyan-600/10 rounded-lg border border-cyan-500/20 text-center">
                <Zap className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-cyan-400">GPU</p>
                <p className="text-sm text-gray-400">Acceleration</p>
              </div>
              <div className="p-4 bg-cyan-600/10 rounded-lg border border-cyan-500/20 text-center">
                <Server className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-cyan-400">1K+</p>
                <p className="text-sm text-gray-400">Concurrent Tasks</p>
              </div>
            </div>
          </section>

          {/* Reward Range */}
          <section className="glass-effect rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6">Earnings Estimate</h2>
            <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Estimated Monthly Earnings</span>
                <span className="text-4xl font-bold text-cyan-400">1,500-3,000 XP</span>
              </div>
              <p className="text-sm text-gray-400">
                Earnings vary based on uptime, compute performance, GPU availability, and network demand. 
                Ultra nodes typically earn 2-3x more than Lite nodes. XP earned here will convert to SIMU tokens at TGE.
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="flex gap-4">
            <Link
              href="/register"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all"
            >
              <Download className="w-5 h-5" />
              Start Running Ultra Node
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-4 border-2 border-cyan-600 text-cyan-400 rounded-lg hover:bg-cyan-600/10 transition-all"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
