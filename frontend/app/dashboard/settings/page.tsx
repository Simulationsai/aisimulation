'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, User, Bell, Shield } from 'lucide-react'
import api from '@/lib/api'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    walletAddress: '',
    twitterHandle: '',
    discordHandle: '',
  })

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await api.users.getMe()
        setForm({
          name: profile.name || '',
          username: profile.username || '',
          email: profile.email || '',
          walletAddress: profile.walletAddress || '',
          twitterHandle: profile.twitterHandle || '',
          discordHandle: profile.discordHandle || '',
        })
      } catch (error) {
        setMessage('Unable to load profile. Please sign in again.')
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [])

  const handleSave = async () => {
    try {
      setSaving(true)
      setMessage('')
      await api.users.updateMe({
        name: form.name,
        username: form.username,
        email: form.email,
        walletAddress: form.walletAddress,
        twitterHandle: form.twitterHandle,
        discordHandle: form.discordHandle,
      })
      setMessage('Profile updated successfully.')
    } catch (error: any) {
      setMessage(error?.message || 'Failed to update profile.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary-600 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-gray-400">Profile, preferences, and account settings</p>
        </div>

        {/* Profile Settings */}
        <div className="glass-effect rounded-lg p-6 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold">Profile</h2>
          </div>
          {message && (
            <div className="mb-4 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
              {message}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Display name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-black text-white"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-black text-white"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-black text-white"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Wallet address</label>
              <input
                type="text"
                value={form.walletAddress}
                onChange={(e) => setForm({ ...form, walletAddress: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-black text-white"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Twitter handle</label>
              <input
                type="text"
                value={form.twitterHandle}
                onChange={(e) => setForm({ ...form, twitterHandle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-black text-white"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Discord handle</label>
              <input
                type="text"
                value={form.discordHandle}
                onChange={(e) => setForm({ ...form, discordHandle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-black text-white"
                disabled={loading}
              />
            </div>
            <button
              onClick={handleSave}
              disabled={saving || loading}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="glass-effect rounded-lg p-6 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold">Preferences</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-400">Receive updates via email</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Performance Alerts</p>
                <p className="text-sm text-gray-400">Get notified of performance issues</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Reward Notifications</p>
                <p className="text-sm text-gray-400">Alert when you earn tokens</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="glass-effect rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold">Security</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full px-6 py-2 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20">
              Change Password
            </button>
            <button className="w-full px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
