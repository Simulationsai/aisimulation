import Link from 'next/link'
import { Mail, ArrowRight, Activity } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}></div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-black mb-3">
                  Subscribe to our newsletter.
                </h3>
                <p className="text-gray-600 text-lg">
                  To get all the latest news, subscribe to our newsletter.
                </p>
              </div>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full border-2 border-gray-300 focus:border-cyan-600 focus:outline-none text-black"
                />
                <button className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition-all flex items-center gap-2">
                  Subscribe
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Brand & CTAs */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img 
                src="/logo.png" 
                alt="SimulationAI Logo" 
                className="h-12 w-12 object-contain"
              />
              <div className="text-3xl font-bold">
                <span className="gradient-text">Simulation</span>
                <span className="text-cyan-400">AI</span>
              </div>
            </Link>
            <div className="space-y-3">
              <Link
                href="/register"
                className="block w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all text-center font-semibold"
              >
                Launch App
              </Link>
              <Link
                href="/rewards"
                className="block w-full px-6 py-3 bg-gray-900 text-white rounded-lg border-2 border-cyan-600 hover:bg-cyan-600/10 transition-all text-center font-semibold"
              >
                Earn Rewards
              </Link>
            </div>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="font-bold text-lg mb-4">Ecosystem</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Developers
                </Link>
              </li>
              <li>
                <Link href="/rewards" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Rewards
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  API Docs
                </Link>
              </li>
              <li>
                <Link href="https://github.com" target="_blank" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="/whitepaper" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Whitepaper
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-bold text-lg mb-4">Community</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://x.com/Simulationsnod" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  X (Twitter)
                </a>
              </li>
              <li>
                <a href="https://discord.gg/Eg65AEfF" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" target="_blank" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Telegram
                </a>
              </li>
              <li>
                <a href="#" target="_blank" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            Copyright © SimulationAI Labs
          </p>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-400">Live Transactions</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
