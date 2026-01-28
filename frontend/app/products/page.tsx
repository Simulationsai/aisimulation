import Link from 'next/link'
import { ArrowLeft, Cloud, Container, Code, Server, Zap, CheckCircle, Sparkles, TrendingUp } from 'lucide-react'

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-black text-white py-20 px-8">
      {/* Hero Section */}
      <section className="relative py-16 px-8 overflow-hidden">
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
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300">Our Products</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Products & <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose the compute solution that fits your needs. From cloud-based Lite Nodes to high-performance Ultra Nodes.
            </p>
          </div>
        </div>
      </section>

      {/* Product Cards */}
      <div className="max-w-7xl mx-auto mb-12 -mt-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Lite Node */}
          <div className="glass-effect rounded-2xl p-8 border-2 border-cyan-500/30 hover:border-cyan-500/60 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-600/30 to-cyan-800/30 border border-cyan-500/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Cloud className="w-10 h-10 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Lite Node</h2>
                  <p className="text-gray-400">Cloud-based compute</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Easy-to-setup cloud node perfect for beginners. Run simulation workloads with minimal configuration.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Cloud-based, no local setup</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Auto-managed infrastructure</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Medium reward rate</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Perfect for beginners</span>
                </li>
              </ul>
              <Link
                href="/products/lite-node"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-lg hover:from-cyan-700 hover:to-cyan-800 transition-all shadow-lg shadow-purple-500/30"
              >
                Learn More
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>

          {/* Ultra Node */}
          <div className="glass-effect rounded-2xl p-8 border-2 border-cyan-500/30 hover:border-cyan-500/60 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-600/30 to-cyan-800/30 border border-cyan-500/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Container className="w-10 h-10 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Ultra Node</h2>
                  <p className="text-gray-400">Docker / Local machine</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                High-performance Docker node for advanced users. Maximum rewards with dedicated compute resources.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Docker-based deployment</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>GPU support optional</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>High reward rate</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>For advanced users</span>
                </li>
              </ul>
              <Link
                href="/products/ultra-node"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-lg hover:from-cyan-700 hover:to-cyan-800 transition-all shadow-lg shadow-cyan-500/30"
              >
                Learn More
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Services */}
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* SDK & APIs */}
          <div className="glass-effect rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-cyan-600/20 border border-cyan-500/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">SDK & APIs</h2>
                <p className="text-gray-400">Developer tools</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Integrate SimulationAI into your applications with our comprehensive SDK and REST APIs.
            </p>
            <Link
              href="/developers"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              View Documentation
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>

          {/* Future Services */}
          <div className="glass-effect rounded-2xl p-8 border border-gray-800 opacity-60">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center">
                <Server className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Enterprise Solutions</h2>
                <p className="text-gray-400">Coming Soon</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Custom compute solutions for businesses and enterprises. Contact us for early access.
            </p>
            <span className="text-gray-500">Available in Phase 3</span>
          </div>
        </div>
      </div>
    </main>
  )
}
