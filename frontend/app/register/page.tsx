'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Mail, Lock, User, Github, Twitter, AlertCircle } from 'lucide-react'
import api from '@/lib/api'

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [inviteCode, setInviteCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [walletLoading, setWalletLoading] = useState(false)

  // Check for OAuth errors in URL
  useEffect(() => {
    const oauthError = searchParams?.get('error')
    if (oauthError === 'oauth_failed') {
      setError('OAuth authentication failed. Please try again or use email/password registration.')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }
    if (!inviteCode.trim()) {
      setError('Early access is limited to invited users. Please enter your invite code.')
      setLoading(false)
      return
    }

    try {
      await api.auth.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        inviteCode: inviteCode.trim(),
      })
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-8 py-20">
      <div className="max-w-md w-full space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Create Account</h1>
          <p className="text-gray-400">Start your SimulationAI journey</p>
        </div>

        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
          Early access is limited to the first 500 approved contributors. An invite code is required to create an account.
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="inviteCode" className="block text-sm font-medium mb-2">
              Invite Code
            </label>
            <input
              type="text"
              id="inviteCode"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent text-white"
              placeholder="INVITE-XXXX"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-white"
                placeholder="John Doe"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-white"
                placeholder="your.email@example.com"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-white"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-white"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input type="checkbox" className="w-4 h-4 bg-black border-gray-800 rounded" />
            <span className="ml-2 text-sm text-gray-400">
              I agree to the{' '}
              <Link href="/terms" className="text-cyan-400 hover:text-cyan-300">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300">
                Privacy Policy
              </Link>
            </span>
          </div>

          <button
            type="submit"
            disabled={loading || !inviteCode.trim()}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-lg font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-black text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={async () => {
              try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
                // Check if OAuth is configured
                const response = await fetch(`${apiUrl}/api/auth/github`, { method: 'HEAD' })
                if (response.status === 503) {
                  setError('GitHub OAuth is not configured. Please use email/password registration or contact administrator.')
                  return
                }
                window.location.href = `${apiUrl}/api/auth/github`
              } catch (err) {
                setError('Failed to initiate GitHub login. Please try email/password registration.')
              }
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </button>
          <button
            type="button"
            onClick={async () => {
              try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
                // Check if OAuth is configured
                const response = await fetch(`${apiUrl}/api/auth/google`, { method: 'HEAD' })
                if (response.status === 503) {
                  setError('Google OAuth is not configured. Please use email/password registration or contact administrator.')
                  return
                }
                window.location.href = `${apiUrl}/api/auth/google`
              } catch (err) {
                setError('Failed to initiate Google login. Please try email/password registration.')
              }
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Google</span>
          </button>
        </div>

        <button
          type="button"
          disabled={walletLoading}
          onClick={async () => {
            setError('')
            if (typeof window === 'undefined' || !(window as any).ethereum) {
              setError('MetaMask is not available in this browser.')
              return
            }
            try {
              setWalletLoading(true)
              const ethereum = (window as any).ethereum
              const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
              const walletAddress = accounts[0]
              if (!walletAddress) {
                setError('No wallet address returned from MetaMask.')
                return
              }
              // Wallet login will create or load a user associated with this address
              await api.auth.walletLogin(walletAddress)
              router.push('/dashboard')
            } catch (e: any) {
              setError(e?.message || 'MetaMask signup/login failed. Please try again.')
            } finally {
              setWalletLoading(false)
            }
          }}
          className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50"
        >
          {walletLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Connecting MetaMask...
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              <span>MetaMask</span>
            </>
          )}
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-cyan-400 hover:text-cyan-300">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  )
}
