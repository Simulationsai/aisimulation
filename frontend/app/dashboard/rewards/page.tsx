import Link from 'next/link'
import { ArrowLeft, Award, TrendingUp } from 'lucide-react'

export default function RewardsPage() {
  return (
    <main className="min-h-screen bg-black text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary-600 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">XP Rewards</h1>
          <p className="text-gray-400">Track your XP earnings and airdrops that will later convert to SIMU tokens</p>
        </div>

        {/* Token Balance */}
        <div className="bg-gradient-to-br from-primary-600 to-accent-600 text-white rounded-lg p-8 mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 mb-2">Total XP Balance</p>
              <p className="text-5xl font-bold">1,200</p>
              <p className="text-primary-100 mt-2">XP (converts to SIMU at TGE)</p>
            </div>
            <Award className="w-16 h-16 text-white/80" />
          </div>
        </div>

        {/* Token Graph Placeholder */}
        <div className="glass-effect rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary-600" />
            XP Balance Graph
          </h2>
          <div className="h-64 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Token balance graph coming soon</p>
          </div>
        </div>

        {/* Rewards Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="glass-effect rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Earnings Breakdown</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Node Operations</span>
                <span className="font-semibold">800 XP</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Referrals</span>
                <span className="font-semibold">300 XP</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Ambassador Rewards</span>
                <span className="font-semibold">100 XP</span>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Airdrops</h3>
            <div className="space-y-4">
              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <p className="font-semibold mb-1">Early Adopter Airdrop</p>
                <p className="text-sm text-gray-400">+50 XP - 2 days ago</p>
              </div>
              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <p className="font-semibold mb-1">Community Airdrop</p>
                <p className="text-sm text-gray-400">+25 XP - 1 week ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
