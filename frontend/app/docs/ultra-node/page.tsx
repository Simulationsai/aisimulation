import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function UltraNodeDocsPage() {
  return (
    <main className="min-h-screen bg-black text-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard/nodes/ultra" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Ultra Node setup
        </Link>

        <h1 className="text-4xl font-bold mb-3">Ultra Node (Docker / CLI) Setup</h1>
        <p className="text-gray-400 mb-10">
          Ultra Node runs via Docker or CLI. Generate a node key in the dashboard, start the node runtime, then monitor performance.
        </p>

        <div className="space-y-6">
          <section className="glass-effect rounded-lg p-6 border border-cyan-500/20">
            <h2 className="text-2xl font-bold mb-2">1) Generate a Node Key</h2>
            <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
              <li>Go to <span className="text-cyan-200">Dashboard → Nodes → Ultra Node</span></li>
              <li>Click <span className="text-cyan-200">Generate Key</span> and copy it</li>
              <li>You will use it as <span className="text-cyan-200">SIMU_NODE_KEY</span></li>
            </ul>
          </section>

          <section className="glass-effect rounded-lg p-6 border border-cyan-500/20">
            <h2 className="text-2xl font-bold mb-3">2) Run via Docker (recommended)</h2>
            <p className="text-sm text-gray-400 mb-3">From the repo root:</p>
            <pre className="text-xs bg-black/60 border border-gray-800 rounded-lg p-4 overflow-x-auto">
{`docker build -t aisimulation-ultra-node ./ultra-node

docker run --rm \\
  -e SIMU_API_URL="http://host.docker.internal:3001" \\
  -e SIMU_NODE_KEY="YOUR_NODE_KEY_HERE" \\
  -e SIMU_NODE_NAME="Ultra Node (Docker)" \\
  aisimulation-ultra-node`}
            </pre>
            <p className="text-xs text-gray-500 mt-3">
              Tip: on macOS, Docker can reach your local backend via <code>host.docker.internal</code>.
            </p>
          </section>

          <section className="glass-effect rounded-lg p-6 border border-cyan-500/20">
            <h2 className="text-2xl font-bold mb-3">3) Or run via CLI (Node.js)</h2>
            <pre className="text-xs bg-black/60 border border-gray-800 rounded-lg p-4 overflow-x-auto">
{`export SIMU_API_URL="http://localhost:3001"
export SIMU_NODE_KEY="YOUR_NODE_KEY_HERE"
export SIMU_NODE_NAME="Ultra Node (CLI)"
node ./ultra-node/index.mjs`}
            </pre>
          </section>

          <section className="glass-effect rounded-lg p-6 border border-cyan-500/20">
            <h2 className="text-2xl font-bold mb-2">4) Open your Node Dashboard</h2>
            <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
              <li>Go to <span className="text-cyan-200">Dashboard → Nodes</span></li>
              <li>Find your node under <span className="text-cyan-200">Your Nodes</span></li>
              <li>Click <span className="text-cyan-200">Dashboard</span> to view live metrics</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}

