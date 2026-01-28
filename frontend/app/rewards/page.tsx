'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Coins, TrendingUp, Calculator, PieChart, Zap } from 'lucide-react'

export default function RewardsPage() {
  const [computePower, setComputePower] = useState(100)
  const [uptime, setUptime] = useState(99)
  const estimatedEarnings = Math.round((computePower * uptime / 100) * 10)

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
            <Coins className="w-12 h-12 text-cyan-500" />
            <h1 className="text-5xl font-bold">Rewards & Airdrop</h1>
          </div>
          <p className="text-xl text-gray-400">
            Earn XP by contributing compute resources to the network. All XP will later convert to SIMU tokens.
          </p>
        </div>

        <section className="glass-effect rounded-2xl p-8 mb-12 border border-cyan-500/20">
          <h2 className="text-3xl font-bold mb-4">Airdrop eligibility</h2>
          <p className="text-gray-300 mb-6">
            Airdrop participation is based on XP reputation. Complete tasks, run nodes, and contribute
            consistently to improve eligibility. No fixed allocations are shown.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/airdrop"
              className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-all"
            >
              View airdrop tasks
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 border border-cyan-500 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-600/10 transition-all"
            >
              Back to dashboard
            </Link>
          </div>
        </section>

        {/* Reward Model Explanation */}
        <section className="glass-effect rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8">Reward Model</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-cyan-500" />
                <h3 className="text-xl font-semibold">Uptime Scoring</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Higher uptime percentage increases your reward multiplier. 99%+ uptime = 1.5x multiplier.
              </p>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Uptime</span>
                  <span className="text-cyan-400">Multiplier</span>
                </div>
                <div className="space-y-1 text-xs text-gray-400">
                  <div className="flex justify-between">95-98% <span>1.0x</span></div>
                  <div className="flex justify-between">99-99.5% <span>1.2x</span></div>
                  <div className="flex justify-between">99.5%+ <span>1.5x</span></div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-cyan-500" />
                <h3 className="text-xl font-semibold">Performance Scoring</h3>
              </div>
              <p className="text-gray-300 text-sm">
                CPU/GPU performance, task completion rate, and response time affect your performance score.
              </p>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Performance</span>
                  <span className="text-cyan-400">Multiplier</span>
                </div>
                <div className="space-y-1 text-xs text-gray-400">
                  <div className="flex justify-between">Low <span>0.8x</span></div>
                  <div className="flex justify-between">Medium <span>1.0x</span></div>
                  <div className="flex justify-between">High <span>1.3x</span></div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-green-600/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-green-500" />
                <h3 className="text-xl font-semibold">Bandwidth Scoring</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Network contribution and bandwidth availability add bonus rewards to your earnings.
              </p>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Bandwidth</span>
                  <span className="text-green-400">Bonus</span>
                </div>
                <div className="space-y-1 text-xs text-gray-400">
                  <div className="flex justify-between">100 Mbps <span>+5%</span></div>
                  <div className="flex justify-between">500 Mbps <span>+10%</span></div>
                  <div className="flex justify-between">1 Gbps+ <span>+15%</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reward Calculator */}
        <section className="glass-effect rounded-2xl p-8 mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-cyan-500" />
            <h2 className="text-3xl font-bold">Reward Calculator</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Compute Power (CPU/GPU)</label>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  value={computePower}
                  onChange={(e) => setComputePower(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-1">
                  <span>10</span>
                  <span className="text-cyan-400 font-semibold">{computePower}</span>
                  <span>1000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Uptime Percentage</label>
                <input
                  type="range"
                  min="80"
                  max="100"
                  value={uptime}
                  onChange={(e) => setUptime(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-1">
                  <span>80%</span>
                  <span className="text-cyan-400 font-semibold">{uptime}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            <div className="p-8 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-semibold mb-4">Estimated Monthly Earnings</h3>
              <div className="text-5xl font-bold text-cyan-400 mb-2">
                {estimatedEarnings.toLocaleString()} XP
              </div>
              <p className="text-sm text-gray-400">
                Based on current network demand and your node configuration. XP amounts shown here will convert to SIMU tokens at TGE.
              </p>
              <div className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Base Rewards</span>
                  <span>{Math.round(estimatedEarnings * 0.7).toLocaleString()} XP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Performance Bonus</span>
                  <span>{Math.round(estimatedEarnings * 0.2).toLocaleString()} XP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Uptime Bonus</span>
                  <span>{Math.round(estimatedEarnings * 0.1).toLocaleString()} XP</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* XP Allocation */}
        <section className="glass-effect rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <PieChart className="w-8 h-8 text-cyan-500" />
            <h2 className="text-3xl font-bold">XP Rewards Breakdown</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Reward Sources</h3>
              <div className="space-y-4">
                <div className="p-4 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Base Rewards</span>
                    <span className="text-cyan-400">70%</span>
                  </div>
                  <p className="text-sm text-gray-400">Standard node operation rewards</p>
                </div>
                <div className="p-4 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Performance Bonus</span>
                    <span className="text-cyan-400">20%</span>
                  </div>
                  <p className="text-sm text-gray-400">High compute performance bonus</p>
                </div>
                <div className="p-4 bg-green-600/10 rounded-lg border border-green-500/20">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Uptime Bonus</span>
                    <span className="text-green-400">10%</span>
                  </div>
                  <p className="text-sm text-gray-400">Consistent uptime rewards</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Additional Earnings</h3>
              <div className="space-y-4">
                <div className="p-4 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Referral Rewards</span>
                    <span className="text-cyan-400">+10%</span>
                  </div>
                  <p className="text-sm text-gray-400">Earn from referred users</p>
                </div>
                <div className="p-4 bg-yellow-600/10 rounded-lg border border-yellow-500/20">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Event Bonuses</span>
                    <span className="text-yellow-400">Variable</span>
                  </div>
                  <p className="text-sm text-gray-400">Special campaign rewards</p>
                </div>
                <div className="p-4 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Staking Rewards</span>
                    <span className="text-cyan-400">Coming Soon</span>
                  </div>
                  <p className="text-sm text-gray-400">Stake SIMU (after XP conversion) for additional rewards</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
