'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TrendingUp, Award, Users, Server, Zap, Activity } from 'lucide-react'
import api from '@/lib/api'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    latency: 12,
    totalXP: 0,
    nodeXP: 0,
    referrals: 0,
    nodes: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [airdrop, nodes] = await Promise.all([api.airdrop.getStatus(), api.nodes.list()])
      
      setStats({
        latency: 12,
        totalXP: Number(airdrop?.airdropUser?.totalXP || 0),
        nodeXP: Number(airdrop?.airdropUser?.nodeXP || 0),
        referrals: 0, // TODO: Load from referrals API
        nodes: nodes.length,
      })
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white py-8 px-4 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-purple-500 rounded-full animate-spin"></div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">Overview of your SimulationAI activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-effect rounded-lg p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-cyan-500" />
              <span className="text-2xl font-bold">{stats.latency}ms</span>
            </div>
            <p className="text-sm text-gray-400">Average Latency</p>
            <p className="text-xs text-green-600 mt-2">↓ 60% improvement</p>
          </div>

          <div className="glass-effect rounded-lg p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-cyan-500" />
              <span className="text-2xl font-bold">{stats.totalXP.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-400">Total XP</p>
            <p className="text-xs text-gray-400 mt-2">Includes tasks + node + referrals</p>
          </div>

          <div className="glass-effect rounded-lg p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-cyan-500" />
              <span className="text-2xl font-bold">{stats.nodeXP.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-400">Node XP</p>
            <p className="text-xs text-gray-400 mt-2">Earned from Lite/Ultra nodes</p>
          </div>

          <div className="glass-effect rounded-lg p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-4">
              <Server className="w-8 h-8 text-cyan-500" />
              <span className="text-2xl font-bold">{stats.nodes}</span>
            </div>
            <p className="text-sm text-gray-400">Active Nodes</p>
            <p className="text-xs text-gray-400 mt-2">{stats.nodes > 0 ? 'Running' : 'No nodes'}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/dashboard/performance" className="glass-effect rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-cyan-500/20 hover:border-cyan-500/50 group">
            <TrendingUp className="w-8 h-8 text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">Performance Metrics</h3>
            <p className="text-sm text-gray-400">View node contribution metrics and performance insights</p>
          </Link>

          <Link href="/airdrop" className="glass-effect rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-cyan-500/20 hover:border-cyan-500/50 group">
            <Award className="w-8 h-8 text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">Airdrop</h3>
            <p className="text-sm text-gray-400">Complete tasks and track XP-based eligibility</p>
          </Link>

          <Link href="/dashboard/referrals" className="glass-effect rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-cyan-500/20 hover:border-cyan-500/50 group">
            <Users className="w-8 h-8 text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">Referral System</h3>
            <p className="text-sm text-gray-400">Manage referrals and track rewards</p>
          </Link>

          <Link href="/dashboard/nodes" className="glass-effect rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-cyan-500/20 hover:border-cyan-500/50 group">
            <Server className="w-8 h-8 text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">Node Management</h3>
            <p className="text-sm text-gray-400">View node type, status, and performance</p>
          </Link>

          <Link href="/dashboard/api-keys" className="glass-effect rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-cyan-500/20 hover:border-cyan-500/50 group">
            <Activity className="w-8 h-8 text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">API Keys</h3>
            <p className="text-sm text-gray-400">Manage your API keys</p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="glass-effect rounded-lg p-6 border border-cyan-500/20">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
              <div>
                <p className="font-semibold">New referral joined</p>
                <p className="text-sm text-gray-400">5 hours ago</p>
              </div>
              <span className="text-green-600 font-semibold">+10 XP</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-cyan-600/10 rounded-lg border border-cyan-500/20">
              <div>
                <p className="font-semibold">Performance optimization</p>
                <p className="text-sm text-gray-400">1 day ago</p>
              </div>
              <span className="text-cyan-500 font-semibold">Latency: 45ms → 12ms</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
