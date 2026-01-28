import Link from 'next/link'
import { ArrowRight, Cpu, Network, Zap, Brain, Server } from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">How AISimulation Works</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Step-by-step AI simulation workflow for optimal mobile gaming performance
          </p>
        </div>

        {/* Step-by-Step Flow */}
        <div className="space-y-12 mb-16">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <h2 className="text-3xl font-bold">Device Monitoring</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                AISimulation SDK runs on your mobile device, continuously monitoring:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-primary-600" />
                  CPU, GPU, and RAM usage
                </li>
                <li className="flex items-center gap-2">
                  <Network className="w-5 h-5 text-primary-600" />
                  Network latency and bandwidth
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary-600" />
                  Device temperature and battery
                </li>
              </ul>
            </div>
            <div className="flex-1 bg-primary-50 dark:bg-primary-900/20 p-8 rounded-lg">
              <Smartphone className="w-full h-64 text-primary-600" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <h2 className="text-3xl font-bold">AI Prediction & Offload</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                AI models predict performance issues and decide what to offload:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary-600" />
                  <strong>Latency Prediction:</strong> Forecast network lag before it happens
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary-600" />
                  <strong>Load Simulation:</strong> Predict server load to prevent spikes
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary-600" />
                  <strong>Action Prediction:</strong> Predict player actions for faster response
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary-600" />
                  <strong>Device Offload:</strong> Move heavy computation to AI nodes
                </li>
              </ul>
            </div>
            <div className="flex-1 bg-primary-50 dark:bg-primary-900/20 p-8 rounded-lg">
              <Brain className="w-full h-64 text-primary-600" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <h2 className="text-3xl font-bold">Node Processing</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Computation happens on distributed AI nodes:
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Server className="w-5 h-5 text-primary-600" />
                    Lite Node (Cloud)
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Low compute, fast inference. Used for latency/load predictions and quick optimizations.
                  </p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Server className="w-5 h-5 text-accent-600" />
                    Ultra Node (Docker)
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Heavy compute, GPU optional. Used for real-time simulations and complex computations.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-primary-50 dark:bg-primary-900/20 p-8 rounded-lg">
              <Server className="w-full h-64 text-primary-600" />
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <h2 className="text-3xl font-bold">Optimized Experience</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Results flow back to your device in real-time:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary-600" />
                  Faster gameplay with reduced latency
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary-600" />
                  Stable FPS without frame drops
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary-600" />
                  Reduced device heating and battery drain
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary-600" />
                  Better network optimization
                </li>
              </ul>
            </div>
            <div className="flex-1 bg-primary-50 dark:bg-primary-900/20 p-8 rounded-lg">
              <Zap className="w-full h-64 text-primary-600" />
            </div>
          </div>
        </div>

        {/* AI Modules */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">AI Modules</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2">Latency Prediction</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Regression model that predicts network lag before it happens, enabling proactive optimization.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2">Load Simulation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Time-series forecasting to predict server load spikes and prevent performance degradation.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2">Action Prediction</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Classification model that predicts player actions for faster response times.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold mb-2">Network Optimization</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Packet routing and size optimization for maximum efficiency on slow networks.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg md:col-span-2">
              <h3 className="font-semibold mb-2">Device Offload Decision</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Intelligent decision engine that determines what computation should be offloaded from mobile 
                devices to AI nodes for optimal performance.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/waitlist"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Join Waitlist
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </main>
  )
}

function Smartphone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth="2"/>
      <line x1="12" y1="18" x2="12" y2="18" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}
