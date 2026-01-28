import Link from 'next/link'
import { ArrowLeft, Map, CheckCircle, Circle, Clock } from 'lucide-react'

export default function RoadmapPage() {
  const phases = [
    {
      title: 'Phase 1: MVP Launch',
      period: 'Months 1-6',
      status: 'in-progress',
      items: [
        { text: 'Launch MVP with core optimization features', completed: true },
        { text: 'Support for top 10 mobile game engines', completed: true },
        { text: 'Basic analytics dashboard', completed: false },
        { text: 'Ambassador program launch', completed: false },
        { text: 'Deploy 100+ Cloud Lite Nodes globally', completed: false },
        { text: 'Launch Ultra Node operator program', completed: false },
        { text: 'Achieve 99.9% uptime', completed: false },
        { text: 'Scale to 1M+ concurrent users', completed: false },
        { text: 'Onboard 100+ game studios', completed: false },
        { text: 'Reach 1M+ active users', completed: false },
      ]
    },
    {
      title: 'Phase 2: Growth & Expansion',
      period: 'Months 7-18',
      status: 'planned',
      items: [
        { text: 'Advanced AI models (federated learning, transfer learning)', completed: false },
        { text: 'Real-time analytics and insights', completed: false },
        { text: 'White-label solutions for enterprise', completed: false },
        { text: 'Mobile app for gamers', completed: false },
        { text: '500+ nodes globally', completed: false },
        { text: 'Decentralized node network', completed: false },
        { text: 'GPU-accelerated Ultra Nodes', completed: false },
        { text: 'Support for 10M+ concurrent users', completed: false },
        { text: 'Onboard 500+ game studios', completed: false },
        { text: 'Reach 5M+ active users', completed: false },
        { text: 'Expand to new markets (Asia, Europe)', completed: false },
      ]
    },
    {
      title: 'Phase 3: Market Leadership',
      period: 'Months 19-36',
      status: 'planned',
      items: [
        { text: 'Multi-modal AI (combining device, network, game data)', completed: false },
        { text: 'Predictive maintenance for game servers', completed: false },
        { text: 'AI-powered game testing and QA', completed: false },
        { text: 'Industry-leading performance optimization', completed: false },
        { text: 'Global node network (1,000+ nodes)', completed: false },
        { text: 'Edge AI inference (on-device models)', completed: false },
        { text: 'Quantum-ready architecture (future-proofing)', completed: false },
        { text: 'Support for 50M+ concurrent users', completed: false },
        { text: 'Market leadership in mobile game optimization', completed: false },
        { text: '2,000+ game integrations', completed: false },
        { text: '20M+ active users', completed: false },
        { text: 'Potential IPO or acquisition', completed: false },
      ]
    }
  ]

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) return <CheckCircle className="w-5 h-5 text-green-500" />
    if (status === 'in-progress') return <Clock className="w-5 h-5 text-cyan-500" />
    return <Circle className="w-5 h-5 text-gray-600" />
  }

  return (
    <main className="min-h-screen bg-black text-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="space-y-12 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Map className="w-8 h-8 text-cyan-500" />
              <h1 className="text-5xl font-bold">Roadmap</h1>
            </div>
            <p className="text-xl text-gray-400">
              Our journey to transform mobile gaming performance worldwide
            </p>
          </div>
        </div>

        <div className="space-y-16">
          {phases.map((phase, phaseIndex) => (
            <div key={phaseIndex} className="glass-effect rounded-2xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{phase.title}</h2>
                  <p className="text-gray-400">{phase.period}</p>
                </div>
                <div className="px-4 py-2 rounded-lg bg-cyan-600/20 border border-cyan-500/50">
                  <span className="text-cyan-400 font-semibold capitalize">{phase.status.replace('-', ' ')}</span>
                </div>
              </div>

              <div className="space-y-4">
                {phase.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-cyan-600/5 transition-colors"
                  >
                    {getStatusIcon(phase.status, item.completed)}
                    <span className={`flex-1 ${item.completed ? 'text-gray-400 line-through' : 'text-gray-300'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Key Milestones */}
        <div className="mt-16 glass-effect rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8">Key Milestones</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
              <div className="text-4xl font-bold text-cyan-400 mb-2">Q1 2026</div>
              <p className="text-gray-300">MVP Launch</p>
              <p className="text-sm text-gray-500 mt-2">Core features, first 100 studios</p>
            </div>
            <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
              <div className="text-4xl font-bold text-cyan-400 mb-2">Q2 2026</div>
              <p className="text-gray-300">Beta Testing</p>
              <p className="text-sm text-gray-500 mt-2">Public beta, 1M users</p>
            </div>
            <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
              <div className="text-4xl font-bold text-cyan-400 mb-2">Q3 2026</div>
              <p className="text-gray-300">Mainnet Launch</p>
              <p className="text-sm text-gray-500 mt-2">Full production, token launch</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center space-y-6">
          <h2 className="text-3xl font-bold">Join Us on This Journey</h2>
          <p className="text-gray-400 text-lg">
            Be part of the future of mobile gaming performance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/waitlist"
              className="px-8 py-4 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-all"
            >
              Join Waitlist
            </Link>
            <Link
              href="/ambassador"
              className="px-8 py-4 border-2 border-cyan-600 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-600/10 transition-all"
            >
              Become an Ambassador
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
