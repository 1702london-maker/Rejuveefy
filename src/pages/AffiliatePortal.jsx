import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart2,
  CheckCircle,
  Copy,
  DollarSign,
  ExternalLink,
  Link2,
  Lock,
  ShieldCheck,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { fetchAffiliateApplication } from '../lib/db'

function MetricCard({ icon: Icon, label }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">{label}</p>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-pink-50 text-pink-600">
          <Icon size={15} />
        </div>
      </div>
      <p className="font-display text-2xl font-bold text-gray-900 mb-1">--</p>
      <p className="text-xs text-gray-400">Available after approval</p>
    </div>
  )
}

export default function AffiliatePortal() {
  const { user, userDisplay } = useApp()
  const [application, setApplication] = useState(null)
  const [loadingApplication, setLoadingApplication] = useState(false)

  useEffect(() => {
    if (!user?.email) return
    setLoadingApplication(true)
    fetchAffiliateApplication({ userId: user.id, email: user.email })
      .then(setApplication)
      .catch(() => setApplication(null))
      .finally(() => setLoadingApplication(false))
  }, [user?.id, user?.email])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-card">
          <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center mx-auto mb-4">
            <Lock size={24} />
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Affiliate Portal</h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            Sign in to manage your affiliate application, referral links, commission reporting and payouts.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/login" className="bg-pink-500 text-white rounded-full px-5 py-3 text-sm font-semibold hover:bg-pink-600 transition-colors">
              Sign In
            </Link>
            <Link to="/affiliate#apply" className="border border-pink-200 text-pink-600 rounded-full px-5 py-3 text-sm font-semibold hover:bg-pink-50 transition-colors">
              Apply as Affiliate
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-pink-500 text-lg">Rejuveefy</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600 text-sm font-semibold">Affiliate Portal</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
            <ShieldCheck size={16} className="text-pink-500" />
            {userDisplay?.name || user.email}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white">
          <div>
            <p className="text-pink-100 text-xs font-semibold uppercase tracking-wide mb-1">Affiliate setup</p>
            <p className="font-display text-2xl font-bold">
              {application ? `Application ${application.status}` : 'No approved affiliate account connected yet'}
            </p>
            <p className="text-pink-100 text-sm mt-1">
              {loadingApplication
                ? 'Checking your latest affiliate application...'
                : application
                  ? `Submitted ${new Date(application.created_at).toLocaleDateString('en-GB')}. Referral tools unlock after approval.`
                  : 'Once approved, this portal will show live referral links, clicks, conversions, commissions and payouts.'}
            </p>
          </div>
          <Link to="/affiliate#apply" className="bg-white text-pink-600 rounded-full px-5 py-2.5 text-sm font-bold hover:bg-pink-50 transition-colors">
            Complete Application
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard icon={DollarSign} label="Total earned" />
          <MetricCard icon={BarChart2} label="Clicks" />
          <MetricCard icon={ExternalLink} label="Conversions" />
          <MetricCard icon={CheckCircle} label="Payouts" />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">Referral link</h2>
          <div className="flex gap-3 flex-col sm:flex-row">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-400 font-mono truncate">
              Generated after approval
            </div>
            <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-100 text-gray-400 font-semibold text-sm cursor-not-allowed">
              <Copy size={15} /> Copy Link
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Link2 size={22} />
          </div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-2">No affiliate activity yet</h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Transactions, campaign assets and payout history should come from Supabase after the affiliate tables are created and applications are reviewed.
          </p>
        </div>
      </div>
    </div>
  )
}
