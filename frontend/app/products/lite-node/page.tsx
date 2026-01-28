import Link from 'next/link'
import { ArrowRight, Cloud, Zap } from 'lucide-react'

export default function LiteNodePage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-20">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Lite Node</p>
          <h1 className="text-4xl md:text-5xl font-bold">Cloud-based node for quick onboarding.</h1>
          <p className="text-lg text-gray-300">
            Lite Nodes are optimized for contributors who want a simple setup with reliable rewards and minimal configuration.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-effect rounded-2xl p-6 border border-cyan-500/20">
            <Cloud className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Cloud-first</h3>
            <p className="text-gray-400 text-sm">Deploy quickly without managing local hardware.</p>
          </div>
          <div className="glass-effect rounded-2xl p-6 border border-cyan-500/20">
            <Zap className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Managed uptime</h3>
            <p className="text-gray-400 text-sm">Automatic updates and monitoring keep you in the network.</p>
          </div>
          <div className="glass-effect rounded-2xl p-6 border border-cyan-500/20">
            <ArrowRight className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Earn XP</h3>
            <p className="text-gray-400 text-sm">Rewards scale with consistent uptime and participation.</p>
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-8 border border-cyan-500/20">
          <h2 className="text-2xl font-bold mb-3">Get started</h2>
          <p className="text-gray-300 mb-6">
            Create an account to access Lite Node setup and begin earning XP.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/register"
              className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-all"
            >
              Create account
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 border border-cyan-500 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-600/10 transition-all"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
