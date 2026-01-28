'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Circle, Copy, Share2, Users, Coins, Gift, ExternalLink, Twitter } from 'lucide-react'
import api from '@/lib/api'

const TWITTER_URL = 'https://x.com/Simulationsnod'
const TWITTER_POST_ID = '' // TODO: Add your Twitter post ID for retweet/like/comment links

function AirdropContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState<string | null>(null)
  const [airdropData, setAirdropData] = useState<any>(null)
  const [referralStats, setReferralStats] = useState<any>(null)
  const [referralCode, setReferralCode] = useState('')
  const [referralInput, setReferralInput] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [applyForm, setApplyForm] = useState({
    email: '',
    twitter: '',
    wallet: '',
  })
  const [applying, setApplying] = useState(false)

  useEffect(() => {
    // Check for referral code in URL
    const refCode = searchParams?.get('ref')
    if (refCode) {
      setReferralInput(refCode.toUpperCase())
    }
    loadAirdropData()
  }, [searchParams])

  const loadAirdropData = async () => {
    try {
      setLoading(true)
      const [status, stats] = await Promise.all([
        api.airdrop.getStatus(),
        api.airdrop.getReferralStats().catch(() => null),
      ])
      setAirdropData(status)
      setReferralStats(stats)
      setReferralCode(status.airdropUser?.referralCode || '')
    } catch (err: any) {
      if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
        router.push('/login?redirect=/airdrop')
      } else {
        setError(err.message || 'Failed to load airdrop data')
      }
    } finally {
      setLoading(false)
    }
  }

  const copyReferralLink = () => {
    const link = `${window.location.origin}/airdrop?ref=${referralCode}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRegisterReferral = async () => {
    if (!referralInput.trim()) {
      setError('Please enter a referral code')
      return
    }

    try {
      setError('')
      setSuccess('')
      await api.airdrop.registerWithReferral(referralInput.trim())
      setSuccess('Referral code registered successfully!')
      setReferralInput('')
      loadAirdropData()
    } catch (err: any) {
      setError(err.message || 'Failed to register referral code')
    }
  }


  const handleCompleteTask = async (taskType: string, isMandatory: boolean) => {
    try {
      setSubmitting(taskType)
      setError('')
      setSuccess('')

      if (isMandatory) {
        await api.airdrop.completeMandatoryTask(taskType)
      } else {
        await api.airdrop.completeOptionalTask(taskType)
      }

      setSuccess('Task completed! Rewards added to your account.')
      loadAirdropData()
    } catch (err: any) {
      setError(err.message || 'Failed to complete task')
    } finally {
      setSubmitting(null)
    }
  }

  const handleApply = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!applyForm.email.trim()) {
      setError('Please enter your email to apply.')
      return
    }
    setError('')
    setSuccess('')
    setApplying(true)
    setTimeout(() => {
      setApplying(false)
      setSuccess('Application received. We will review and notify you by email.')
      setApplyForm({ email: '', twitter: '', wallet: '' })
    }, 600)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading airdrop...</p>
        </div>
      </main>
    )
  }

  const mandatoryTasks = airdropData?.mandatoryTasks || {}
  const optionalTasks = airdropData?.optionalTasks || {}
  const taskHistory = airdropData?.tasks || []
  const taskXpByType = taskHistory.reduce((acc: Record<string, number>, task: any) => {
    acc[task.taskType] = (acc[task.taskType] || 0) + (task.xpReward || 0)
    return acc
  }, {})

  return (
    <main className="min-h-screen bg-black text-white py-20 px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-4 text-cyan-200">
          <p className="text-sm">
            Early access is limited to the first 500 contributors. Airdrop access is read-only until approval.
          </p>
          <form onSubmit={handleApply} className="mt-4 grid gap-3 text-sm md:grid-cols-[1.2fr_1fr_1fr_auto]">
            <input
              type="email"
              placeholder="Email address"
              value={applyForm.email}
              onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
              className="w-full rounded-lg border border-cyan-500/20 bg-black/40 px-3 py-2 text-white placeholder:text-slate-500"
            />
            <input
              type="text"
              placeholder="Twitter handle"
              value={applyForm.twitter}
              onChange={(e) => setApplyForm({ ...applyForm, twitter: e.target.value })}
              className="w-full rounded-lg border border-cyan-500/20 bg-black/40 px-3 py-2 text-white placeholder:text-slate-500"
            />
            <input
              type="text"
              placeholder="Wallet address"
              value={applyForm.wallet}
              onChange={(e) => setApplyForm({ ...applyForm, wallet: e.target.value })}
              className="w-full rounded-lg border border-cyan-500/20 bg-black/40 px-3 py-2 text-white placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={applying}
              className="rounded-lg bg-cyan-600 px-5 py-2 text-white hover:bg-cyan-700 transition disabled:opacity-60"
            >
              {applying ? 'Applying...' : 'Apply'}
            </button>
          </form>
        </div>
        {/* Header */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

          <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="w-12 h-12 text-cyan-500" />
            <h1 className="text-5xl font-bold">Earn XP</h1>
          </div>
          <p className="text-xl text-gray-400">
            Complete tasks and run nodes to earn XP. All XP converts to $SIMU tokens at TGE. Invite friends and earn 10% of their XP!
          </p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400">
            <Circle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-400">
            <CheckCircle className="w-5 h-5" />
            <span>{success}</span>
          </div>
        )}

        {/* XP Summary */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="glass-effect rounded-xl p-6 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Coins className="w-6 h-6 text-cyan-400" />
              <span className="text-sm text-gray-400">Total XP</span>
            </div>
            <div className="text-3xl font-bold text-cyan-400">{airdropData?.airdropUser?.totalXP?.toLocaleString() || 0}</div>
            {typeof airdropData?.airdropUser?.simuTokens === 'number' && (
              <div className="text-sm text-green-400 mt-1">
                = {airdropData.airdropUser.simuTokens.toLocaleString()} $SIMU
              </div>
            )}
          </div>
          <div className="glass-effect rounded-xl p-6 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Twitter className="w-6 h-6 text-cyan-400" />
              <span className="text-sm text-gray-400">Task XP</span>
            </div>
            <div className="text-3xl font-bold text-cyan-400">{airdropData?.airdropUser?.taskXP?.toLocaleString() || 0}</div>
          </div>
          <div className="glass-effect rounded-xl p-6 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Gift className="w-6 h-6 text-cyan-400" />
              <span className="text-sm text-gray-400">Node XP</span>
            </div>
            <div className="text-3xl font-bold text-cyan-400">{airdropData?.airdropUser?.nodeXP?.toLocaleString() || 0}</div>
          </div>
          <div className="glass-effect rounded-xl p-6 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-cyan-400" />
              <span className="text-sm text-gray-400">Referral XP</span>
            </div>
            <div className="text-3xl font-bold text-cyan-400">{airdropData?.airdropUser?.referralXP?.toLocaleString() || 0}</div>
          </div>
        </div>

        {/* TGE Conversion Notice */}
        {airdropData?.airdropUser?.simuTokens === null && (
          <div className="glass-effect rounded-xl p-6 border border-yellow-500/30 bg-yellow-500/5">
            <div className="flex items-start gap-3">
              <Gift className="w-6 h-6 text-yellow-400 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-1">Token Generation Event (TGE)</h3>
                <p className="text-gray-300 text-sm">
                  All your XP will be converted to $SIMU tokens at TGE. Keep earning XP through tasks and running nodes!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Referral Section */}
        <div className="glass-effect rounded-2xl p-8 border border-cyan-500/20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Share2 className="w-6 h-6 text-cyan-400" />
            Your Referral Link
          </h2>
          
          {referralCode ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  readOnly
                  value={`${typeof window !== 'undefined' ? window.location.origin : ''}/airdrop?ref=${referralCode}`}
                  className="flex-1 px-4 py-3 bg-black border border-gray-800 rounded-lg text-white"
                />
                <button
                  onClick={copyReferralLink}
                  className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all flex items-center gap-2"
                >
                  {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="text-sm text-gray-400">
                Share this link and earn 10% of your invitees' XP!
              </p>
            </div>
          ) : (
            <p className="text-gray-400">Generating your referral code...</p>
          )}

          {/* Register with Referral */}
          {!airdropData?.airdropUser?.referredBy && (
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h3 className="text-lg font-semibold mb-4">Have a referral code?</h3>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={referralInput}
                  onChange={(e) => setReferralInput(e.target.value.toUpperCase())}
                  placeholder="Enter referral code"
                  className="flex-1 px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
                />
                <button
                  onClick={handleRegisterReferral}
                  className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all"
                >
                  Register
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mandatory Tasks */}
        <div className="glass-effect rounded-2xl p-8 border border-cyan-500/20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-cyan-400" />
            Mandatory Tasks
            <span className="text-sm font-normal text-gray-400">(Complete all to qualify)</span>
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                id: 'mandatory_follow',
                title: 'Follow @Simulationsnod',
                reward: 100,
                completed: mandatoryTasks.follow,
                link: TWITTER_URL,
                linkLabel: 'Follow',
              },
              {
                id: 'mandatory_retweet',
                title: 'Retweet & tag 3 friends',
                reward: 200,
                completed: mandatoryTasks.retweet,
                link: `https://twitter.com/intent/retweet?tweet_id=${TWITTER_POST_ID}`,
                linkLabel: 'Retweet',
              },
              {
                id: 'mandatory_like_comment',
                title: 'Like & comment',
                reward: 150,
                completed: mandatoryTasks.likeComment,
                link: `https://twitter.com/intent/like?tweet_id=${TWITTER_POST_ID}`,
                linkLabel: 'Like & Comment',
              },
            ].map((task) => (
              <div key={task.id} className="rounded-xl border border-gray-800 bg-black/50 p-5">
                <div className="flex items-center gap-3">
                  {task.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-500" />
                  )}
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-xs text-gray-400">Reward: {task.reward} XP</p>
                  </div>
                </div>
                <div className="mt-3 text-xs text-cyan-200">
                  Earned XP: {taskXpByType[task.id] || 0}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={task.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 border border-cyan-500/30 rounded-lg hover:bg-cyan-600/10 transition-all flex items-center gap-2 text-xs"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {task.linkLabel}
                  </a>
                  {!task.completed && (
                    <button
                      onClick={() => handleCompleteTask(task.id, true)}
                      disabled={submitting === task.id}
                      className="px-3 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all disabled:opacity-50 text-xs"
                    >
                      {submitting === task.id ? 'Verifying...' : 'Verify'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional Tasks */}
        <div className="glass-effect rounded-2xl p-8 border border-cyan-500/20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Gift className="w-6 h-6 text-cyan-400" />
            Optional Tasks
            <span className="text-sm font-normal text-gray-400">(Boost your rewards)</span>
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                id: 'optional_daily_like',
                title: 'Daily Like',
                reward: 50,
                completed: optionalTasks.dailyLike,
                link: `https://twitter.com/intent/like?tweet_id=${TWITTER_POST_ID}`,
                linkLabel: 'Like',
                badge: 'Once per day',
              },
              {
                id: 'optional_repost',
                title: 'Repost',
                reward: 75,
                completed: false,
                link: `https://twitter.com/intent/retweet?tweet_id=${TWITTER_POST_ID}`,
                linkLabel: 'Repost',
                badge: `Count: ${optionalTasks.reposts || 0}`,
              },
              {
                id: 'optional_comment',
                title: 'Comment',
                reward: 50,
                completed: false,
                link: `https://twitter.com/intent/tweet?in_reply_to=${TWITTER_POST_ID}`,
                linkLabel: 'Comment',
                badge: `Count: ${optionalTasks.comments || 0}`,
              },
            ].map((task) => (
              <div key={task.id} className="rounded-xl border border-gray-800 bg-black/50 p-5">
                <div className="flex items-center gap-3">
                  {task.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-500" />
                  )}
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-xs text-gray-400">Reward: {task.reward} XP</p>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">{task.badge}</div>
                <div className="mt-3 text-xs text-cyan-200">
                  Earned XP: {taskXpByType[task.id] || 0}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={task.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 border border-cyan-500/30 rounded-lg hover:bg-cyan-600/10 transition-all flex items-center gap-2 text-xs"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {task.linkLabel}
                  </a>
                  <button
                    onClick={() => handleCompleteTask(task.id, false)}
                    disabled={submitting === task.id || (task.id === 'optional_daily_like' && optionalTasks.dailyLike)}
                    className="px-3 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all disabled:opacity-50 text-xs"
                  >
                    {submitting === task.id
                      ? 'Verifying...'
                      : task.id === 'optional_daily_like' && optionalTasks.dailyLike
                      ? 'Done Today'
                      : 'Verify'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral Stats */}
        {referralStats && referralStats.totalReferrals > 0 && (
          <div className="glass-effect rounded-2xl p-8 border border-cyan-500/20">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-cyan-400" />
              Your Referrals
            </h2>
            <div className="space-y-3">
              {referralStats.referrals.map((ref: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-black/50 rounded-lg border border-gray-800">
                  <div>
                    <p className="font-semibold">{ref.inviteeEmail}</p>
                    <p className="text-sm text-gray-400">
                      Invitee XP: {ref.totalXPByInvitee.toLocaleString()} | 
                      Your Bonus: {ref.referrerXP.toLocaleString()} XP
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default function AirdropPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </main>
    }>
      <AirdropContent />
    </Suspense>
  )
}
