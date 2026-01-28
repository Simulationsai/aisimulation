import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'

export default function BlogPage() {
  const posts = [
    {
      title: "AISimulation Beta Launch",
      excerpt: "We're excited to announce the beta launch of AISimulation. Join thousands of gamers experiencing smoother mobile gameplay.",
      date: "2026-01-20",
      category: "Product Updates"
    },
    {
      title: "How AI Predicts Gaming Latency",
      excerpt: "Deep dive into our latency prediction models and how they help prevent lag before it happens.",
      date: "2026-01-15",
      category: "AI & Technology"
    },
    {
      title: "Node Runner Rewards Program",
      excerpt: "Learn how to run Lite or Ultra nodes and earn XP (that later converts to SIMU tokens) while contributing to the network.",
      date: "2026-01-10",
      category: "Community"
    }
  ]

  return (
    <main className="min-h-screen py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-primary-600 hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Updates, news, and insights about AISimulation
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post, index) => (
            <article key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
                <span>•</span>
                <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 rounded text-primary-600">
                  {post.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
              <Link
                href="#"
                className="text-primary-600 hover:underline font-semibold"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
