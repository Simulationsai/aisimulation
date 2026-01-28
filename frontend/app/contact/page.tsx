import Link from 'next/link'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-20">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Contact</h1>
        <p className="text-gray-300">
          Reach out with product questions, node support issues, or partnership inquiries.
        </p>
        <div className="space-y-3 text-gray-400">
          <p>Email: support@aisimulation.com</p>
          <p>X (Twitter): <a className="text-cyan-400 hover:text-cyan-300" href="https://x.com/Simulationsnod" target="_blank" rel="noopener noreferrer">Simulationsnod</a></p>
          <p>Discord: <a className="text-cyan-400 hover:text-cyan-300" href="https://discord.gg/Eg65AEfF" target="_blank" rel="noopener noreferrer">Join server</a></p>
        </div>
        <div>
          <Link href="/waitlist" className="text-cyan-400 hover:text-cyan-300">
            Join the waitlist
          </Link>
        </div>
      </div>
    </main>
  )
}
