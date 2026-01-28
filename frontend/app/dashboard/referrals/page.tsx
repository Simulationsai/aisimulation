import Link from 'next/link'
import { ArrowLeft, Users, Share2, Gift } from 'lucide-react'

export default function ReferralsPage() {
  return (
    <main className="min-h-screen bg-black text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary-600 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Referral System</h1>
          <p className="text-gray-400">Manage referrals and track rewards</p>
        </div>

        {/* Referral Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="glass-effect rounded-lg p-6 shadow-lg">
            <Users className="w-8 h-8 text-primary-600 mb-4" />
            <p className="text-3xl font-bold">24</p>
            <p className="text-gray-400">Total Referrals</p>
          </div>
          <div className="glass-effect rounded-lg p-6 shadow-lg">
            <Gift className="w-8 h-8 text-accent-600 mb-4" />
            <p className="text-3xl font-bold">300</p>
            <p className="text-gray-400">XP Earned (pre-SIMU)</p>
          </div>
          <div className="glass-effect rounded-lg p-6 shadow-lg">
            <Share2 className="w-8 h-8 text-primary-600 mb-4" />
            <p className="text-3xl font-bold">18</p>
            <p className="text-gray-400">Active Users</p>
          </div>
        </div>

        {/* Referral Link */}
        <div className="glass-effect rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Your Referral Link</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value="https://aisimulation.com/ref/ABC123"
              readOnly
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-black text-white"
            />
            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              Copy
            </button>
          </div>
        </div>

        {/* Referral List */}
        <div className="glass-effect rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Recent Referrals</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black text-white rounded-lg">
                <div>
                  <p className="font-semibold">user{i}@example.com</p>
                  <p className="text-sm text-gray-400">Joined {i} days ago</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">+10 XP</p>
                  <p className="text-sm text-gray-400">Active</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
