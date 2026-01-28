'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import api from '@/lib/api'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAuthed, setIsAuthed] = useState(false)
  const [displayName, setDisplayName] = useState<string | null>(null)

  const isActive = (path: string) => pathname === path

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAuthed(!!localStorage.getItem('auth_token'))
    }
  }, [pathname])

  useEffect(() => {
    const loadProfile = async () => {
      if (!isAuthed) {
        setDisplayName(null)
        return
      }
      try {
        const profile = await api.users.getMe()
        const fallback = profile.email?.split('@')[0] || 'Profile'
        setDisplayName(profile.username || profile.name || fallback)
      } catch (error) {
        setDisplayName(null)
      }
    }
    loadProfile()
  }, [isAuthed])

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'auth_token') {
        setIsAuthed(!!event.newValue)
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  

  return (
    <nav className="bg-black/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="SimulationAI Logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-2xl font-bold gradient-text hidden sm:inline">
                Simulation<span className="text-cyan-400">AI</span>
              </span>
            </Link>
            <span className="hidden h-6 w-px bg-gray-700 md:inline-block" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-6">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/products') ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              Products
            </Link>
            <Link
              href="/how-it-works"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/how-it-works') ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              How It Works
            </Link>
            <Link
              href="/airdrop"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/airdrop') ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              Earn
            </Link>
            <Link
              href="/developers"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/developers') ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              Developers
            </Link>
            {/* Blog - Hidden for now */}
            {/* <Link
              href="/blog"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/blog') ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              Blog
            </Link> */}
            {/* Community - Hidden for now */}
            {/* <Link
              href="/community"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/community') ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              Community
            </Link> */}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthed ? (
              <>
                <Link
                  href="/dashboard/settings"
                  className="px-4 py-2 border border-cyan-500/40 text-cyan-200 rounded-md text-sm font-medium hover:border-cyan-400 hover:text-cyan-100 transition-colors"
                >
                  {displayName || 'Profile'}
                </Link>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-gray-300 rounded-md text-sm font-medium hover:text-cyan-400 transition-colors"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-300 rounded-md text-sm font-medium hover:text-cyan-400 transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-900 hover:text-cyan-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-900 hover:text-cyan-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/how-it-works"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-900 hover:text-cyan-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/airdrop"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-900 hover:text-cyan-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Earn
            </Link>
            <Link
              href="/developers"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-900 hover:text-cyan-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Developers
            </Link>
            {/* Blog - Hidden for now */}
            {/* <Link
              href="/blog"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-900 hover:text-cyan-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link> */}
            {/* Community - Hidden for now */}
            {/* <Link
              href="/community"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-900 hover:text-cyan-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Community
            </Link> */}
            {isAuthed ? (
              <>
                <Link
                  href="/dashboard/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-cyan-200 hover:bg-gray-900 hover:text-cyan-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {displayName || 'Profile'}
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-900 hover:text-cyan-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-900 hover:text-cyan-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
