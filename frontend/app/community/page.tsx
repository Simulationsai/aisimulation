import Link from 'next/link'
import { ArrowLeft, Users, MessageCircle, Twitter, Github, Mail, ExternalLink } from 'lucide-react'

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-black text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-12 h-12 text-cyan-500" />
            <h1 className="text-5xl font-bold">Community</h1>
          </div>
          <p className="text-xl text-gray-400">
            Join thousands of developers, node operators, and contributors building the future of decentralized compute
          </p>
        </div>

        {/* Community Links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <a
            href="https://discord.gg/Eg65AEfF"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-effect rounded-2xl p-8 text-center hover:bg-cyan-600/10 transition-all group"
          >
            <MessageCircle className="w-16 h-16 text-cyan-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold mb-2">Discord</h3>
            <p className="text-gray-400 mb-4">Join our Discord server for real-time discussions</p>
            <span className="inline-flex items-center gap-2 text-cyan-400">
              Join Now
              <ExternalLink className="w-4 h-4" />
            </span>
          </a>

          <a
            href="#"
            className="glass-effect rounded-2xl p-8 text-center hover:bg-cyan-600/10 transition-all group"
          >
            <MessageCircle className="w-16 h-16 text-cyan-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold mb-2">Telegram</h3>
            <p className="text-gray-400 mb-4">Connect with the community on Telegram</p>
            <span className="inline-flex items-center gap-2 text-cyan-400">
              Join Now
              <ExternalLink className="w-4 h-4" />
            </span>
          </a>

          <a
            href="https://x.com/Simulationsnod"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-effect rounded-2xl p-8 text-center hover:bg-cyan-600/10 transition-all group"
          >
            <Twitter className="w-16 h-16 text-cyan-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold mb-2">Twitter</h3>
            <p className="text-gray-400 mb-4">Follow us for updates and announcements</p>
            <span className="inline-flex items-center gap-2 text-cyan-400">
              Follow
              <ExternalLink className="w-4 h-4" />
            </span>
          </a>

          <a
            href="#"
            className="glass-effect rounded-2xl p-8 text-center hover:bg-green-600/10 transition-all group"
          >
            <Github className="w-16 h-16 text-green-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold mb-2">GitHub</h3>
            <p className="text-gray-400 mb-4">Contribute to open source projects</p>
            <span className="inline-flex items-center gap-2 text-green-400">
              Contribute
              <ExternalLink className="w-4 h-4" />
            </span>
          </a>
        </div>

        {/* Community Stats */}
        <section className="glass-effect rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Community Stats</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">10K+</div>
              <p className="text-gray-400">Community Members</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">5K+</div>
              <p className="text-gray-400">Active Nodes</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">500+</div>
              <p className="text-gray-400">Developers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">50M+</div>
            <p className="text-gray-400">XP Distributed (pre-SIMU)</p>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="glass-effect rounded-2xl p-8 text-center">
          <Mail className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-6">Subscribe to our newsletter for the latest updates and announcements</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-white"
            />
            <button className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
