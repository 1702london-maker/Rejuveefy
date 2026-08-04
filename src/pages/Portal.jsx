import { Link } from 'react-router-dom'
import { ArrowRight, BriefcaseBusiness, ShieldCheck, Sparkles, UserRoundCheck, Users } from 'lucide-react'
import { useApp } from '../context/AppContext'

const portalCards = [
  {
    title: 'Client Portal',
    body: 'Sign in to view bookings, referrals, reviews and wishlist activity.',
    href: '/dashboard',
    action: 'Open Client Dashboard',
    icon: UserRoundCheck,
  },
  {
    title: 'Provider Portal',
    body: 'Apply to join as a provider, or manage approved bookings, services, profile and availability.',
    href: '/providers-portal',
    action: 'Open Provider Portal',
    icon: ShieldCheck,
  },
  {
    title: 'Affiliate Portal',
    body: 'Apply to join the affiliate programme, or access approved referral tools.',
    href: '/affiliate-portal',
    action: 'Open Affiliate Portal',
    icon: Users,
  },
]

export default function Portal() {
  const { user } = useApp()

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-pink-50 via-white to-rose-50 border-b border-pink-100 py-12">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <p className="text-xs text-gray-400 mb-4">
            <Link to="/" className="hover:text-pink-500">Home</Link>
            <span className="mx-1.5">/</span>
            <span>Portal</span>
          </p>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-1.5 text-xs font-bold text-pink-600 mb-4">
              <Sparkles size={13} /> Rejuveefy access hub
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-3">Portal</h1>
            <p className="text-gray-500 leading-relaxed">
              Choose the right Rejuveefy portal. Clients can manage accounts, providers can apply or manage approved tools, and affiliates can apply or access referral links after review.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-10">
        {!user && (
          <div className="mb-6 rounded-2xl border border-pink-100 bg-pink-50 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900">Sign in or create an account</h2>
              <p className="text-sm text-gray-500 mt-1">Provider and affiliate access is reviewed after account creation.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/login" className="rounded-full border border-pink-200 bg-white px-5 py-2.5 text-sm font-bold text-pink-600 hover:bg-pink-50">Login</Link>
              <Link to="/register" className="rounded-full bg-pink-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-pink-600">Create Account</Link>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-5">
          {portalCards.map(({ title, body, href, action, icon: Icon }) => (
            <Link key={title} to={href} className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-card hover:border-pink-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center mb-5">
                <Icon size={22} />
              </div>
              <h2 className="font-display text-xl font-bold text-gray-900 mb-2">{title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">{body}</p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-pink-600">
                {action} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-5 flex items-start gap-3">
          <BriefcaseBusiness size={20} className="text-pink-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-500 leading-relaxed">
            New providers and affiliates should create an account first, then submit the relevant application from the portal. Approved accounts unlock the working tools.
          </p>
        </div>
      </section>
    </div>
  )
}
