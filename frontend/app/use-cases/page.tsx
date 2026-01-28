import Link from 'next/link'
import { Smartphone, Wifi, Gamepad2, Users } from 'lucide-react'

export default function UseCasesPage() {
  return (
    <main className="min-h-screen py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Use Cases</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Focused on mobile gamers and game studios
          </p>
        </div>

        {/* For Gamers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Users className="w-8 h-8 text-primary-600" />
            For Mobile Gamers
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <Smartphone className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Low-End Device Users</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Play AAA games on budget phones. AISimulation offloads heavy computation to AI nodes, 
                making your device feel more powerful without upgrading hardware.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 40% device load reduction</li>
                <li>• Stable FPS on low-end devices</li>
                <li>• Reduced heating and battery drain</li>
              </ul>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <Wifi className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Slow Network Gamers</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Optimize gameplay on weak connections. AI predicts network issues and routes packets 
                efficiently for smoother online gaming, even on 3G or unstable WiFi.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 60% latency reduction</li>
                <li>• Better packet routing</li>
                <li>• Stable connection on weak networks</li>
              </ul>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <Gamepad2 className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Competitive Players</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Every millisecond counts in ranked matches. AISimulation's predictive AI gives you 
                the edge with faster response times and reduced lag spikes.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Sub-20ms latency guarantee</li>
                <li>• Predictive action optimization</li>
                <li>• Zero-lag advantage</li>
              </ul>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <Users className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Casual Gamers</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Enjoy smooth gameplay without technical knowledge. AISimulation works automatically 
                in the background, optimizing your gaming experience seamlessly.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Zero configuration required</li>
                <li>• Automatic optimization</li>
                <li>• Works with any mobile game</li>
              </ul>
            </div>
          </div>
        </section>

        {/* For Game Studios */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-primary-600" />
            For Game Studios
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg border-2 border-primary-200 dark:border-primary-800">
              <h3 className="text-2xl font-semibold mb-3">Reduce Infrastructure Costs</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Offload computation to AISimulation's distributed node network. Reduce server costs 
                by up to 40% while improving player experience.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Lower server load</li>
                <li>• Reduced infrastructure spending</li>
                <li>• Better scalability</li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg border-2 border-primary-200 dark:border-primary-800">
              <h3 className="text-2xl font-semibold mb-3">Improve Player Retention</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Better performance means happier players. Studies show 40% increase in Day-7 retention 
                when players experience smooth, lag-free gameplay.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Higher player satisfaction</li>
                <li>• Reduced churn rate</li>
                <li>• Better reviews and ratings</li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg border-2 border-primary-200 dark:border-primary-800">
              <h3 className="text-2xl font-semibold mb-3">Faster Time to Market</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No need to build optimization infrastructure from scratch. Integrate AISimulation SDK 
                in minutes, not months.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 5-minute SDK integration</li>
                <li>• No infrastructure setup required</li>
                <li>• Focus on game development</li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg border-2 border-primary-200 dark:border-primary-800">
              <h3 className="text-2xl font-semibold mb-3">Global Scale</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                AISimulation's distributed node network handles traffic spikes automatically. Scale 
                globally without building your own infrastructure.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Unlimited scalability</li>
                <li>• Global node network</li>
                <li>• Automatic load balancing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-primary-600 text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Join the waitlist or explore the dashboard
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/waitlist"
              className="px-8 py-4 bg-white text-primary-900 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Join Waitlist
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
