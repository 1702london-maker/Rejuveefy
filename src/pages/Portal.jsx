import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle,
  ClipboardCheck,
  Gem,
  HeartHandshake,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  Users,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const destinations = [
  {
    eyebrow: 'For clients',
    title: 'Manage your beauty bookings',
    body: 'See appointments, booking status, reviews, wishlist and referral activity from your client dashboard.',
    href: '/dashboard',
    action: 'Open Dashboard',
    icon: CalendarCheck,
    tone: 'bg-pink-500 text-white',
  },
  {
    eyebrow: 'For providers',
    title: 'Apply or manage your provider profile',
    body: 'Submit an application, then manage bookings, services, profile details and availability after approval.',
    href: '/providers-portal',
    action: 'Provider Access',
    icon: ShieldCheck,
    tone: 'bg-gray-900 text-white',
  },
  {
    eyebrow: 'For affiliates',
    title: 'Apply or access referral tools',
    body: 'Join the affiliate programme and access your approved referral link when your application is reviewed.',
    href: '/affiliate-portal',
    action: 'Affiliate Access',
    icon: Users,
    tone: 'bg-white text-gray-900 border border-pink-100',
  },
]

const steps = [
  { icon: UserRoundCheck, title: 'Create account', body: 'Start with a Rejuveefy account using email, Google or Facebook.' },
  { icon: ClipboardCheck, title: 'Choose your access', body: 'Clients can book immediately. Providers and affiliates submit applications.' },
  { icon: CheckCircle, title: 'Review unlocks tools', body: 'Approved users get the right portal tools without fake public data.' },
]

export default function Portal() {
  const { user, userDisplay } = useApp()

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#171116] text-white">
        <div className="absolute inset-0 opacity-30">
          <img src="/assets/hero-beauty.png" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#171116] via-[#171116]/92 to-[#171116]/60" />

        <div className="relative max-w-[1280px] mx-auto px-4 lg:px-6 py-14 lg:py-20">
          <p className="text-xs text-pink-100/70 mb-5">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <span>My Portal</span>
          </p>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold text-pink-50 mb-5">
                <Gem size={13} /> Rejuveefy account access
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">My Portal</h1>
              <p className="max-w-xl text-pink-50/80 leading-relaxed">
                One entrance for clients, providers and affiliates. Sign in, manage your account, submit an application, or continue from the access you already have.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {user ? (
                  <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-6 py-3 text-sm font-bold text-white hover:bg-pink-600">
                    Continue as {userDisplay?.name || 'Client'} <ArrowRight size={16} />
                  </Link>
                ) : (
                  <>
                    <Link to="/login?next=/my-portal" className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-6 py-3 text-sm font-bold text-white hover:bg-pink-600">
                      Sign In <ArrowRight size={16} />
                    </Link>
                    <Link to="/register?next=/my-portal" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/15">
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
              <div className="grid gap-3">
                {[
                  ['Client bookings', 'Dashboard, bookings, reviews and referrals'],
                  ['Provider review', 'Application, profile, services and availability'],
                  ['Affiliate review', 'Application status and referral link access'],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-2xl bg-white/10 border border-white/10 p-4">
                    <p className="text-sm font-bold text-white">{title}</p>
                    <p className="text-xs text-pink-50/70 mt-1">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-10">
        <div className="grid md:grid-cols-3 gap-5">
          {destinations.map(({ eyebrow, title, body, href, action, icon: Icon, tone }) => (
            <Link key={title} to={href} className={`group rounded-3xl p-6 shadow-card hover:shadow-xl transition-all ${tone}`}>
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-8">
                <Icon size={22} />
              </div>
              <p className="text-xs font-black uppercase tracking-wide opacity-70 mb-2">{eyebrow}</p>
              <h2 className="font-display text-2xl font-bold mb-3">{title}</h2>
              <p className="text-sm leading-relaxed opacity-75 mb-8">{body}</p>
              <span className="inline-flex items-center gap-2 text-sm font-bold">
                {action} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-6 items-start">
          <div className="rounded-3xl bg-pink-50 border border-pink-100 p-6">
            <div className="w-12 h-12 rounded-2xl bg-white text-pink-500 flex items-center justify-center mb-5">
              <LockKeyhole size={22} />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Access stays reviewed</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Provider and affiliate tools open after review. This keeps the public site clean while the business fills with real profiles, terms, content and approved activity.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {steps.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-gray-100 p-5">
                <Icon size={22} className="text-pink-500 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-gray-900 text-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-3">
            <HeartHandshake size={22} className="text-pink-300 shrink-0 mt-1" />
            <div>
              <h2 className="font-display text-xl font-bold">Joining Rejuveefy?</h2>
              <p className="text-sm text-gray-300 mt-1">Create an account first, then submit the provider or affiliate application from your portal route.</p>
            </div>
          </div>
          <Link to="/register?next=/my-portal" className="w-fit rounded-full bg-white px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-pink-50">
            Start Account
          </Link>
        </div>
      </section>
    </div>
  )
}
