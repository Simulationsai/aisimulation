import Link from 'next/link'
import { ArrowRight, Zap, Smartphone, Server, Brain, TrendingUp, Cloud, Container, Coins, Users, Code, BookOpen, Network, Sparkles, Cpu, Activity } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section with Enhanced Visuals */}
      <section className="relative min-h-screen flex items-center justify-center px-8 py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-cyan-900/30"></div>
          {/* Hexagonal Grid Pattern - Logo Inspired */}
          <div className="absolute inset-0 hexagon-bg opacity-30"></div>
          {/* Animated Grid Pattern - Geometric */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
          {/* Floating Orbs - Cyan/Blue Theme */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-6 animate-fade-in">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-cyan-500/30 mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300">Decentralized Compute Network</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Power the Future of{' '}
              <span className="gradient-text inline-block">
                Simulation & AI
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A contribution-first infrastructure layer for simulation workloads. Earn <span className="text-cyan-400 font-semibold">XP</span> through verified participation. XP is reputation, not a token.
            </p>
          </div>

          {/* Visual Elements */}
          <div className="flex items-center justify-center gap-8 my-12">
            <div className="glass-effect rounded-2xl p-6 border border-cyan-500/20">
              <Cpu className="w-12 h-12 text-cyan-400 mb-2" />
              <p className="text-sm text-gray-400">CPU/GPU</p>
            </div>
            <div className="glass-effect rounded-2xl p-6 border border-cyan-500/20">
              <Network className="w-12 h-12 text-cyan-400 mb-2" />
              <p className="text-sm text-gray-400">Bandwidth</p>
            </div>
            <div className="glass-effect rounded-2xl p-6 border border-green-500/20">
              <Server className="w-12 h-12 text-green-400 mb-2" />
              <p className="text-sm text-gray-400">Storage</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/register"
              className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-lg font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-purple-500/50"
            >
              Start Running Node
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 border-2 border-cyan-600 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-600/10 transition-all backdrop-blur-sm"
            >
              View Dashboard
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="glass-effect rounded-xl p-4 border border-cyan-500/20">
              <div className="text-3xl font-bold text-cyan-400">10K+</div>
              <div className="text-sm text-gray-400">Active Nodes</div>
            </div>
            <div className="glass-effect rounded-xl p-4 border border-cyan-500/20">
              <div className="text-3xl font-bold text-cyan-400">50M+</div>
              <div className="text-sm text-gray-400">XP Earned (pre-SIMU)</div>
            </div>
            <div className="glass-effect rounded-xl p-4 border border-green-500/20">
              <div className="text-3xl font-bold text-green-400">99.9%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
            <div className="glass-effect rounded-xl p-4 border border-yellow-500/20">
              <div className="text-3xl font-bold text-yellow-400">5K+</div>
              <div className="text-sm text-gray-400">Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Built on contribution-first principles.</h2>
              <p className="text-lg text-gray-400">
                Access and influence are earned progressively. Transparency and opt-in participation come before scale.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Contribution before reward',
                'Access before scale',
                'Trust before growth',
                'Transparency over hype',
              ].map((item) => (
                <div key={item} className="glass-effect rounded-xl p-5 border border-cyan-500/20">
                  <p className="text-gray-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Phased rollout */}
      <section className="py-20 px-8 bg-gradient-to-b from-black via-cyan-900/10 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-3">Phased rollout</h2>
            <p className="text-gray-400 text-lg">Progressive access from disclosure to public registration.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { title: 'Phase 1', desc: 'Public disclosure, read-only access.' },
              { title: 'Phase 2', desc: 'Waitlist with optional wallet/social.' },
              { title: 'Phase 3', desc: 'Invite-based alpha access.' },
              { title: 'Phase 4', desc: 'Public registration and onboarding.' },
            ].map((phase) => (
              <div key={phase.title} className="glass-effect rounded-xl p-6 border border-cyan-500/20">
                <p className="text-cyan-300 text-sm font-semibold">{phase.title}</p>
                <p className="text-gray-300 mt-2 text-sm">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is SimulationAI */}
      <section className="py-20 px-8 bg-black relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">What is SimulationAI</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A decentralized compute platform where users contribute CPU, GPU, bandwidth, and storage to run simulation workloads and earn rewards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-effect rounded-2xl p-8 text-center border border-cyan-500/20 hover:border-cyan-500/50 transition-all group">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                <Coins className="w-16 h-16 text-cyan-500 mx-auto relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Earn Rewards</h3>
              <p className="text-gray-400">Earn XP for contributing compute resources and running nodes. XP will later convert to SIMU tokens.</p>
            </div>
            <div className="glass-effect rounded-2xl p-8 text-center border border-cyan-500/20 hover:border-cyan-500/50 transition-all group">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                <Server className="w-16 h-16 text-cyan-500 mx-auto relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Contribute Compute</h3>
              <p className="text-gray-400">Run Lite or Ultra nodes to power simulation workloads and AI processing</p>
            </div>
            <div className="glass-effect rounded-2xl p-8 text-center border border-green-500/20 hover:border-green-500/50 transition-all group">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                <Network className="w-16 h-16 text-green-500 mx-auto relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Decentralized Network</h3>
              <p className="text-gray-400">Join a global network of compute providers powering the future of simulation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Node Types with Enhanced Visuals */}
      <section className="py-32 px-8 bg-gradient-to-b from-black via-cyan-900/10 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)`
        }}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Choose Your Node Type</h2>
            <p className="text-xl text-gray-400">Run nodes and earn rewards based on your setup</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Lite Node */}
            <div className="glass-effect rounded-2xl p-8 border-2 border-cyan-500/30 hover:border-cyan-500/60 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-600/30 to-cyan-800/30 border border-cyan-500/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Cloud className="w-10 h-10 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">Lite Node</h3>
                    <p className="text-gray-400">Cloud-based</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-6 text-gray-300">
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-cyan-500" />
                    <span>Easy setup, cloud-based</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-cyan-500" />
                    <span>Medium rewards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-cyan-500" />
                    <span>Auto-managed</span>
                  </li>
                </ul>
                <Link
                  href="/products/lite-node"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-lg hover:from-cyan-700 hover:to-cyan-800 transition-all shadow-lg shadow-purple-500/30"
                >
                  Run Lite Node
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Ultra Node */}
            <div className="glass-effect rounded-2xl p-8 border-2 border-cyan-500/30 hover:border-cyan-500/60 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-600/30 to-cyan-800/30 border border-cyan-500/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Container className="w-10 h-10 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">Ultra Node</h3>
                    <p className="text-gray-400">Docker / Local</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-6 text-gray-300">
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-cyan-500" />
                    <span>Docker-based, local machine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-cyan-500" />
                    <span>High performance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-cyan-500" />
                    <span>High rewards</span>
                  </li>
                </ul>
                <Link
                  href="/products/ultra-node"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-lg hover:from-cyan-700 hover:to-cyan-800 transition-all shadow-lg shadow-cyan-500/30"
                >
                  Run Ultra Node
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up and verify your account', icon: Users },
              { step: '02', title: 'Choose Node', desc: 'Select Lite or Ultra node type', icon: Server },
              { step: '03', title: 'Install & Run', desc: 'Install node software and start', icon: Zap },
              { step: '04', title: 'Earn Rewards', desc: 'Earn XP automatically that later converts to SIMU tokens', icon: Coins },
            ].map((item, idx) => (
              <div key={idx} className="glass-effect rounded-2xl p-6 text-center border border-cyan-500/20 hover:border-cyan-500/50 transition-all group relative">
                <div className="absolute top-4 right-4 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="text-6xl font-bold text-gray-700 mb-4 relative z-10">{item.step}</div>
                <div className="relative z-10 mb-4">
                  <item.icon className="w-12 h-12 text-cyan-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold mb-2 relative z-10">{item.title}</h3>
                <p className="text-gray-400 relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Token Economy / XP → SIMU */}
      <section className="py-32 px-8 bg-gradient-to-b from-black via-cyan-900/10 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">XP → SIMU Token Economy</h2>
            <p className="text-xl text-gray-400">You earn XP today. At Token Generation Event (TGE), your XP will convert to SIMU tokens on Base (1,000,000,000 total supply).</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Coins, title: 'Earn', desc: 'Node rewards & compute payments', color: 'purple' },
              { icon: TrendingUp, title: 'Stake', desc: 'Stake tokens for additional rewards', color: 'cyan' },
              { icon: Users, title: 'Governance', desc: 'Vote on platform decisions', color: 'green' },
              { icon: Zap, title: 'Payments', desc: 'Pay for compute & API access', color: 'yellow' },
            ].map((item, idx) => (
              <div key={idx} className={`glass-effect rounded-xl p-6 text-center border border-${item.color}-500/20 hover:border-${item.color}-500/50 transition-all group`}>
                <div className="relative mb-4">
                  <div className={`absolute inset-0 bg-${item.color}-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all`}></div>
                  <item.icon className={`w-12 h-12 text-${item.color}-500 mx-auto relative z-10 group-hover:scale-110 transition-transform`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards System */}
      <section className="py-32 px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Rewards System</h2>
            <p className="text-xl text-gray-400">Earn based on performance and contribution</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-effect rounded-2xl p-8 border border-cyan-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <Activity className="w-12 h-12 text-cyan-500 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Uptime Factor</h3>
                <p className="text-gray-400 mb-4">Rewards increase with consistent node uptime</p>
                <div className="text-4xl font-bold text-cyan-400">99.9%</div>
              </div>
            </div>
            <div className="glass-effect rounded-2xl p-8 border border-cyan-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <Cpu className="w-12 h-12 text-cyan-500 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Compute Score</h3>
                <p className="text-gray-400 mb-4">CPU/GPU performance impacts earnings</p>
                <div className="text-4xl font-bold text-cyan-400">High</div>
              </div>
            </div>
            <div className="glass-effect rounded-2xl p-8 border border-green-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <Network className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Bandwidth</h3>
                <p className="text-gray-400 mb-4">Network contribution adds to rewards</p>
                <div className="text-4xl font-bold text-green-400">1 Gbps</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Preview */}
      <section className="py-32 px-8 bg-gradient-to-b from-black via-cyan-900/10 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Roadmap</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-effect rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all">
              <div className="text-sm text-cyan-400 mb-2 font-semibold">Phase 1</div>
              <h3 className="text-2xl font-bold mb-4">User Network</h3>
              <p className="text-gray-400">Build user base and node network</p>
            </div>
            <div className="glass-effect rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all">
              <div className="text-sm text-cyan-400 mb-2 font-semibold">Phase 2</div>
              <h3 className="text-2xl font-bold mb-4">Scaling Compute</h3>
              <p className="text-gray-400">Expand compute capacity and features</p>
            </div>
            <div className="glass-effect rounded-2xl p-8 border border-green-500/20 hover:border-green-500/50 transition-all">
              <div className="text-sm text-green-400 mb-2 font-semibold">Phase 3</div>
              <h3 className="text-2xl font-bold mb-4">Business Integration</h3>
              <p className="text-gray-400">Enterprise solutions and partnerships</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-cyan-600 text-cyan-400 rounded-lg hover:bg-cyan-600/10 transition-all"
            >
              View Full Roadmap
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Community - Hidden for now */}
      {/* <section className="py-32 px-8 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-gray-400 mb-12">Connect with developers, node operators, and the SimulationAI community</p>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://discord.gg/Eg65AEfF" target="_blank" rel="noopener noreferrer" className="glass-effect rounded-lg px-8 py-4 hover:bg-cyan-600/10 transition-all border border-cyan-500/20 hover:border-cyan-500/50">
              <Users className="w-6 h-6 inline mr-2" />
              Discord
            </a>
            <a href="#" className="glass-effect rounded-lg px-8 py-4 hover:bg-cyan-600/10 transition-all border border-cyan-500/20 hover:border-cyan-500/50">
              <Users className="w-6 h-6 inline mr-2" />
              Telegram
            </a>
            <a href="https://x.com/Simulationsnod" target="_blank" rel="noopener noreferrer" className="glass-effect rounded-lg px-8 py-4 hover:bg-cyan-600/10 transition-all border border-cyan-500/20 hover:border-cyan-500/50">
              <Users className="w-6 h-6 inline mr-2" />
              Twitter
            </a>
            <a href="/blog" className="glass-effect rounded-lg px-8 py-4 hover:bg-green-600/10 transition-all border border-green-500/20 hover:border-green-500/50">
              <BookOpen className="w-6 h-6 inline mr-2" />
              Blog
            </a>
          </div>
        </div>
      </section> */}
    </main>
  )
}
