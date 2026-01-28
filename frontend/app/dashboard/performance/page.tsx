import Link from 'next/link'
import { ArrowLeft, TrendingUp, Activity } from 'lucide-react'

export default function PerformancePage() {
  return (
    <main className="min-h-screen bg-black text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary-600 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Performance Metrics</h1>
          <p className="text-gray-400">Node contribution metrics and performance insights</p>
        </div>

        {/* Performance Heatmap Placeholder */}
        <div className="glass-effect rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary-600" />
            Node Performance Heatmap
          </h2>
          <div className="h-64 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Performance heatmap visualization coming soon</p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-effect rounded-lg p-6 shadow-lg">
            <h3 className="font-semibold mb-2">Average Latency</h3>
            <p className="text-3xl font-bold text-primary-600">12ms</p>
            <p className="text-sm text-green-600 mt-2">↓ 60% improvement</p>
          </div>
          <div className="glass-effect rounded-lg p-6 shadow-lg">
            <h3 className="font-semibold mb-2">Device Load Reduction</h3>
            <p className="text-3xl font-bold text-primary-600">40%</p>
            <p className="text-sm text-green-600 mt-2">↓ Reduced</p>
          </div>
          <div className="glass-effect rounded-lg p-6 shadow-lg">
            <h3 className="font-semibold mb-2">FPS Stability</h3>
            <p className="text-3xl font-bold text-primary-600">99%</p>
            <p className="text-sm text-green-600 mt-2">↑ Consistent</p>
          </div>
        </div>
      </div>
    </main>
  )
}
