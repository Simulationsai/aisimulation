import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SimulationAI - Decentralized Compute Platform for Simulation Workloads',
  description: 'SimulationAI is a decentralized compute platform where users contribute CPU, GPU, bandwidth, and storage to run simulation workloads and earn XP that will later convert to SIMU tokens.',
  keywords: ['decentralized compute', 'simulation', 'AI', 'blockchain', 'XP rewards', 'SIMU token', 'node network', 'Base chain'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
