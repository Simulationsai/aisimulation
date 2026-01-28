import Link from 'next/link'
import { Award, Users, Gift, TrendingUp, Star } from 'lucide-react'

export default function AmbassadorPage() {
  return (
    <main className="min-h-screen py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Ambassador Program</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Tiered ambassador program with rewards and recognition
          </p>
        </div>

        {/* Program Overview */}
        <section className="mb-16 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6">Why Become an Ambassador?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Award className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Exclusive Rewards</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Earn XP (that later converts to SIMU tokens), NFTs, and special perks based on your tier
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Community Recognition</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get featured on our website and social media as a top ambassador
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Influence Product</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your feedback shapes our roadmap and product direction
              </p>
            </div>
          </div>
        </section>

        {/* Ambassador Tiers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Ambassador Tiers</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Bronze */}
            <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-lg border-2 border-amber-300 dark:border-amber-700">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8 text-amber-600" />
                <h3 className="text-2xl font-bold">Bronze</h3>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Requirements:</p>
                <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• 10+ referrals</li>
                  <li>• Active community participation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Rewards:</p>
                <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• Early access</li>
                  <li>• Basic rewards</li>
                  <li>• Community badge</li>
                </ul>
              </div>
            </div>

            {/* Silver */}
            <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/20 dark:to-gray-700/20 rounded-lg border-2 border-gray-300 dark:border-gray-600">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8 text-gray-600" />
                <h3 className="text-2xl font-bold">Silver</h3>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Requirements:</p>
                <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• 50+ referrals</li>
                  <li>• Content creation</li>
                  <li>• Beta testing participation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Rewards:</p>
                <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• All Bronze benefits</li>
                  <li>• Exclusive content</li>
                  <li>• Priority support</li>
                  <li>• 500 XP (convertible to SIMU)</li>
                </ul>
              </div>
            </div>

            {/* Gold */}
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg border-2 border-yellow-300 dark:border-yellow-700">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
                <h3 className="text-2xl font-bold">Gold</h3>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Requirements:</p>
                <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• 200+ referrals</li>
                  <li>• Run a node</li>
                  <li>• Active leadership</li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Rewards:</p>
                <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• All Silver benefits</li>
                  <li>• Revenue share</li>
                  <li>• Direct team access</li>
                  <li>• 2,000 XP (convertible to SIMU)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Token System */}
        <section className="mb-16 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Gift className="w-8 h-8 text-primary-600" />
            XP → SIMU Token System
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Token Details</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><strong>Reward Unit Now:</strong> XP</li>
                <li><strong>Future Token:</strong> SIMU on Base (1 Billion total supply)</li>
                <li><strong>Distribution:</strong> XP earned by node runners + community airdrops, later converted to SIMU</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">How to Earn</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Run Lite or Ultra nodes</li>
                <li>• Refer new users</li>
                <li>• Complete ambassador tasks</li>
                <li>• Participate in community events</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Program Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2">Multi-Level Referral Tracking</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track referrals across multiple levels. Earn rewards for your network's growth.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2">Twitter/X Auto-Verification</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                OAuth integration for automatic task verification. No screenshots needed.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2">Node Participation Rewards</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Additional rewards for running Lite or Ultra nodes. Contribute to the network and earn.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2">Leaderboard & Recognition</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Compete on the ambassador leaderboard. Top performers get featured and rewarded.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/waitlist"
            className="inline-block px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Apply to Become an Ambassador
          </Link>
        </div>
      </div>
    </main>
  )
}
