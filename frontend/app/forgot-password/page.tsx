import Link from 'next/link'

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-20">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Forgot password</h1>
        <p className="text-gray-300">
          Password reset is handled through the login system. If you need help, contact support.
        </p>
        <div className="space-y-3 text-gray-400">
          <p>Email: support@aisimulation.com</p>
        </div>
        <Link href="/login" className="text-cyan-400 hover:text-cyan-300">
          Back to login
        </Link>
      </div>
    </main>
  )
}
