'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams?.get('token')
    const userParam = searchParams?.get('user')

    if (token && userParam) {
      // Store token
      localStorage.setItem('auth_token', token)
      
      // Store user info
      try {
        const user = JSON.parse(decodeURIComponent(userParam))
        localStorage.setItem('user', JSON.stringify(user))
      } catch (e) {
        console.error('Error parsing user data:', e)
      }

      // Redirect to dashboard
      router.push('/dashboard')
    } else {
      // No token, redirect to login
      router.push('/login?error=oauth_failed')
    }
  }, [searchParams, router])

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Completing authentication...</p>
      </div>
    </main>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </main>
    }>
      <AuthCallbackContent />
    </Suspense>
  )
}
