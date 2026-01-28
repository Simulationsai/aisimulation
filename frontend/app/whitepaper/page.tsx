import Link from 'next/link'
import { ArrowLeft, FileText, Download } from 'lucide-react'

export default function WhitepaperPage() {
  return (
    <main className="min-h-screen bg-black text-white py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-cyan-500" />
              <h1 className="text-5xl font-bold">Whitepaper v1.0</h1>
            </div>
            <p className="text-xl text-gray-400">
              AI-Powered Simulation Infrastructure for Mobile Gaming Performance
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all">
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>

          <section className="glass-effect rounded-2xl p-8 space-y-4">
            <h2 className="text-3xl font-bold">Abstract</h2>
            <p className="text-gray-300 leading-relaxed">
              AISimulation is an AI-powered simulation infrastructure that optimizes mobile gaming performance 
              by predicting and preventing latency, reducing device load, and intelligently offloading computation 
              to a distributed network of simulation nodes. Unlike game engines or game studios, AISimulation 
              operates as an external optimization layer that game developers integrate to enhance gameplay for 
              millions of mobile gamers facing performance challenges.
            </p>
            <p className="text-gray-300 leading-relaxed">
              <strong>Key Innovation:</strong> AISimulation uses machine learning to predict performance issues 
              before they occur and proactively optimizes gameplay through distributed simulation, resulting in 
              60% average latency reduction and 40% device load reduction without requiring game modifications.
            </p>
          </section>

          <section className="glass-effect rounded-2xl p-8 space-y-4">
            <h2 className="text-3xl font-bold">Problem Statement</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">The Mobile Gaming Performance Crisis</h3>
                <p className="text-gray-300 leading-relaxed">
                  Mobile gaming has exploded to become the largest segment of the gaming industry, with over 
                  2.7 billion mobile gamers globally. However, this growth has exposed critical performance challenges:
                </p>
              </div>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li><strong>Device Limitations:</strong> Low-end and mid-range devices struggle with modern games</li>
                <li><strong>Network Challenges:</strong> Unstable connections cause lag spikes and disconnects</li>
                <li><strong>Server Bottlenecks:</strong> Game servers cannot handle peak loads</li>
                <li><strong>Developer Burden:</strong> Building optimization infrastructure is expensive and time-consuming</li>
              </ul>
            </div>
          </section>

          <section className="glass-effect rounded-2xl p-8 space-y-4">
            <h2 className="text-3xl font-bold">Market Opportunity</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                <p className="text-4xl font-bold text-cyan-400 mb-2">$152B</p>
                <p className="text-gray-300">Mobile Gaming Market (2024)</p>
              </div>
              <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                <p className="text-4xl font-bold text-cyan-400 mb-2">2.7B</p>
                <p className="text-gray-300">Mobile Gamers Worldwide</p>
              </div>
              <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                <p className="text-4xl font-bold text-cyan-400 mb-2">8-10%</p>
                <p className="text-gray-300">Annual Growth Rate</p>
              </div>
              <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                <p className="text-4xl font-bold text-cyan-400 mb-2">70%</p>
                <p className="text-gray-300">Gamers Report Regular Lag</p>
              </div>
            </div>
          </section>

          <section className="glass-effect rounded-2xl p-8 space-y-4">
            <h2 className="text-3xl font-bold">Solution Overview</h2>
            <p className="text-gray-300 leading-relaxed">
              AISimulation is an <strong>AI-powered simulation infrastructure</strong> that:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-cyan-500 mt-1">•</span>
                <span><strong>Predicts Performance Issues:</strong> Uses machine learning to anticipate latency spikes, device overload, and network congestion before they impact gameplay.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-500 mt-1">•</span>
                <span><strong>Optimizes in Real-Time:</strong> Proactively adjusts game performance parameters and offloads computation to distributed simulation nodes.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-500 mt-1">•</span>
                <span><strong>Integrates Seamlessly:</strong> Works as an external layer that game developers integrate via lightweight SDK—no game modifications required.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-500 mt-1">•</span>
                <span><strong>Scales Globally:</strong> Distributed network of simulation nodes handles traffic spikes and provides low-latency optimization worldwide.</span>
              </li>
            </ul>
          </section>

          <section className="glass-effect rounded-2xl p-8 space-y-4">
            <h2 className="text-3xl font-bold">AISimulation Architecture</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">System Components</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                    <h4 className="font-semibold mb-2">Client SDK</h4>
                    <p className="text-sm text-gray-400">Lightweight library integrated into games</p>
                  </div>
                  <div className="p-4 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                    <h4 className="font-semibold mb-2">Edge Layer</h4>
                    <p className="text-sm text-gray-400">Cloudflare CDN for global distribution</p>
                  </div>
                  <div className="p-4 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                    <h4 className="font-semibold mb-2">AI Orchestration</h4>
                    <p className="text-sm text-gray-400">Machine learning models for prediction</p>
                  </div>
                  <div className="p-4 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                    <h4 className="font-semibold mb-2">Simulation Nodes</h4>
                    <p className="text-sm text-gray-400">Distributed nodes for computation offloading</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="glass-effect rounded-2xl p-8 space-y-4">
            <h2 className="text-3xl font-bold">AI Modules</h2>
            <div className="space-y-4">
              <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                <h3 className="text-xl font-semibold mb-2">Latency Prediction</h3>
                <p className="text-gray-300">Predict network lag before it happens using regression models. 90%+ accuracy within ±10ms.</p>
              </div>
              <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                <h3 className="text-xl font-semibold mb-2">Load Simulation</h3>
                <p className="text-gray-300">Time-series forecasting to predict server load spikes and prevent performance degradation.</p>
              </div>
              <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                <h3 className="text-xl font-semibold mb-2">Action Prediction</h3>
                <p className="text-gray-300">Classification model that predicts player actions for faster response times.</p>
              </div>
              <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                <h3 className="text-xl font-semibold mb-2">Network Optimization</h3>
                <p className="text-gray-300">Packet routing and size optimization for maximum efficiency on slow networks.</p>
              </div>
              <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                <h3 className="text-xl font-semibold mb-2">Device Offload Decision</h3>
                <p className="text-gray-300">Intelligent decision engine that determines what computation should be offloaded from mobile devices to AI nodes.</p>
              </div>
            </div>
          </section>

          <section className="glass-effect rounded-2xl p-8 space-y-4">
            <h2 className="text-3xl font-bold">Node Network (Lite & Ultra)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                <h3 className="text-xl font-semibold mb-3">Cloud Lite Nodes</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Low compute, fast inference</li>
                  <li>• Used for latency/load predictions</li>
                  <li>• Cloud-hosted (Render/VPS)</li>
                  <li>• Less than 10ms response time</li>
                  <li>• 10K+ concurrent users per node</li>
                </ul>
              </div>
              <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                <h3 className="text-xl font-semibold mb-3">Ultra Nodes (Docker)</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Heavy compute, GPU optional</li>
                  <li>• Used for real-time simulations</li>
                  <li>• Docker-based deployment</li>
                  <li>• Less than 50ms response time</li>
                  <li>• 1K+ concurrent heavy tasks</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="glass-effect rounded-2xl p-8 space-y-4">
            <h2 className="text-3xl font-bold">XP → SIMU Token System</h2>
            <div className="space-y-4">
              <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Reward Unit Now</p>
                    <p className="text-2xl font-bold">XP</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Total Supply</p>
                    <p className="text-2xl font-bold">1 Billion</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Distribution</p>
                    <p className="text-2xl font-bold">XP to Node Runners + Airdrops (later minted as SIMU)</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                The XP model incentivizes network participation today, while SIMU is the future on-chain token. 
                Node runners and community members earn XP for providing computation resources, referrals, ambassador activity, 
                and community participation. At Token Generation Event (TGE), accumulated XP will convert to SIMU tokens.
              </p>
            </div>
          </section>

          <section className="glass-effect rounded-2xl p-8 space-y-4">
            <h2 className="text-3xl font-bold">Security & Trust</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="font-semibold mb-2">Data Privacy</h3>
                <p>We collect performance metrics (device, network) but NOT gameplay content, player actions, or game state. All data is anonymized and GDPR/CCPA compliant.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Infrastructure Security</h3>
                <p>End-to-end encryption (TLS 1.3), database encryption at rest, API key authentication, rate limiting, and DDoS protection via Cloudflare.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Reliability</h3>
                <p>99.9% uptime SLA, redundant infrastructure, automatic failover, and real-time monitoring.</p>
              </div>
            </div>
          </section>

          <section className="glass-effect rounded-2xl p-8 space-y-4">
            <h2 className="text-3xl font-bold">Business Model</h2>
            <div className="space-y-4">
              <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                <h3 className="text-xl font-semibold mb-3">Revenue Streams</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• <strong>Game Studio Subscriptions:</strong> Freemium model with usage-based pricing</li>
                  <li>• <strong>Premium User Features:</strong> Advanced optimization for power users</li>
                  <li>• <strong>Node Operator Fees:</strong> Platform fee from node operations</li>
                  <li>• <strong>Analytics & Insights:</strong> Premium analytics for game studios</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="glass-effect rounded-2xl p-8 space-y-4">
            <h2 className="text-3xl font-bold">Roadmap</h2>
            <div className="space-y-4">
              <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                <h3 className="text-xl font-semibold mb-2">Phase 1: MVP (Months 1-6)</h3>
                <p className="text-gray-300 text-sm">Launch core optimization features, support top game engines, basic analytics, ambassador program.</p>
              </div>
              <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                <h3 className="text-xl font-semibold mb-2">Phase 2: Growth (Months 7-18)</h3>
                <p className="text-gray-300 text-sm">Advanced AI models, real-time analytics, white-label solutions, mobile app for gamers.</p>
              </div>
              <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                <h3 className="text-xl font-semibold mb-2">Phase 3: Scale (Months 19-36)</h3>
                <p className="text-gray-300 text-sm">Multi-modal AI, predictive maintenance, AI-powered game testing, industry leadership.</p>
              </div>
            </div>
          </section>

          <section className="glass-effect rounded-2xl p-8 space-y-4">
            <h2 className="text-3xl font-bold">Conclusion</h2>
            <p className="text-gray-300 leading-relaxed">
              AISimulation represents a paradigm shift in mobile gaming performance optimization. By combining 
              AI-powered prediction, distributed simulation, and seamless integration, we enable game developers 
              to deliver exceptional experiences to billions of mobile gamers worldwide.
            </p>
            <div className="flex gap-4 pt-4">
              <Link
                href="/waitlist"
                className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all"
              >
                Join Waitlist
              </Link>
              <Link
                href="/dashboard"
                className="px-6 py-3 border-2 border-cyan-600 text-cyan-400 rounded-lg hover:bg-cyan-600/10 transition-all"
              >
                View Dashboard
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
