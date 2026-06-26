import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Calendar, Heart, ShoppingBag, Settings, Star, Gift,
  ChevronRight, Clock, MapPin, ShieldCheck, Phone, Mail, Copy, Share2,
  Plus, CheckCircle, TrendingUp, Users, Zap, ArrowRight, X, BarChart2
} from 'lucide-react'
import { bookings, referrals, clientReviews } from '../data/mockData'
import { useApp } from '../context/AppContext'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Calendar, label: 'My Bookings', href: '/bookings' },
  { icon: Heart, label: 'Wishlist', href: '/wishlist' },
  { icon: ShoppingBag, label: 'My Orders', href: '/orders' },
  { icon: Star, label: 'Reviews', href: '/reviews' },
  { icon: Gift, label: 'Refer & Earn', href: '/referrals' },
  { icon: Settings, label: 'Account Settings', href: '/settings' },
]

function Sidebar() {
  const { pathname } = useLocation()
  const { user } = useApp()

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-card overflow-hidden sticky top-24">
        {/* User profile */}
        <div className="p-5 bg-gradient-to-br from-pink-50 to-white border-b border-pink-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-pink-200 rounded-2xl flex items-center justify-center">
              <span className="text-pink-600 font-bold text-lg">{user.name[0]}</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
              <p className="text-xs text-gray-400">Beauty Enthusiast</p>
            </div>
          </div>
          {/* Points */}
          <div className="mt-3 bg-pink-500 rounded-xl px-3 py-2 flex items-center justify-between">
            <div>
              <p className="text-[9px] text-pink-100 font-semibold uppercase tracking-wider">Beauty Points</p>
              <p className="text-white font-bold text-lg leading-none">{user.points.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-pink-100">Next Reward</p>
              <p className="text-xs text-white font-semibold">250 pts</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="p-3">
          {navItems.map(({ icon: Icon, label, href }) => (
            <Link key={href} to={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-colors text-sm font-medium
                ${pathname === href ? 'bg-pink-50 text-pink-500' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
              <Icon size={16} className={pathname === href ? 'text-pink-500' : 'text-gray-400'} />
              {label}
              {pathname === href && <ChevronRight size={13} className="ml-auto text-pink-400" />}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

// ── MAIN DASHBOARD ────────────────────────────────────────────────────────────
export function DashboardHome() {
  const { user } = useApp()
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
        <div className="flex lg:gap-6">
          <Sidebar />
          <div className="flex-1 min-w-0 space-y-5">
            {/* Welcome */}
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-xs mb-1">Welcome back,</p>
                  <h1 className="font-display text-2xl font-bold">Hello, {user.name}! 👋</h1>
                  <p className="text-pink-100 text-sm mt-1">You have 1 upcoming appointment this week.</p>
                </div>
                <div className="hidden sm:block text-right">
                  <div className="bg-white/20 rounded-xl px-4 py-2">
                    <p className="text-xs text-pink-100">Beauty Points</p>
                    <p className="font-bold text-2xl">{user.points}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { icon: Calendar, label: 'Total Bookings', value: '12', sub: '+2 this month', color: 'bg-blue-50 text-blue-500' },
                { icon: Star, label: 'Reviews Given', value: '8', sub: '4.8 avg rating', color: 'bg-amber-50 text-amber-500' },
                { icon: Gift, label: 'Points Earned', value: user.points, sub: '2 rewards available', color: 'bg-pink-50 text-pink-500' },
                { icon: ShoppingBag, label: 'Products Ordered', value: '5', sub: '1 on its way', color: 'bg-green-50 text-green-500' },
              ].map((s) => (
                <div key={s.label} className="bg-white border border-gray-100 rounded-2xl shadow-card p-4">
                  <div className={`w-9 h-9 ${s.color} rounded-xl flex items-center justify-center mb-3`}>
                    <s.icon size={16} />
                  </div>
                  <p className="text-xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs font-semibold text-gray-600">{s.label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Upcoming appointments */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-900">Upcoming Appointments</h2>
                <Link to="/bookings" className="text-xs text-pink-500 font-semibold flex items-center gap-1">View All <ArrowRight size={12} /></Link>
              </div>
              {bookings.filter(b => b.status === 'upcoming').map((b) => (
                <div key={b.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl mb-2 last:mb-0 card-hover">
                  <img src={b.providerImg} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{b.service}</p>
                    <p className="text-xs text-gray-500">{b.provider}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] text-gray-400 flex items-center gap-0.5"><Calendar size={10} /> {b.date}</span>
                      <span className="text-[10px] text-gray-400 flex items-center gap-0.5"><Clock size={10} /> {b.time}</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-[10px] font-bold px-2 py-1 bg-blue-50 text-blue-500 rounded-full">{b.status}</span>
                    <p className="text-sm font-bold text-gray-900 mt-1">£{b.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Refer */}
            <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-14 h-14 bg-pink-500 rounded-2xl flex items-center justify-center shrink-0">
                <Gift size={24} className="text-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-base font-bold text-gray-900 mb-1">Refer a Friend & Earn £10!</h3>
                <p className="text-xs text-gray-500">Share your code and both of you get £10 off your next booking.</p>
              </div>
              <Link to="/referrals" className="bg-pink-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors whitespace-nowrap">
                Refer Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── MY BOOKINGS ───────────────────────────────────────────────────────────────
export default function MyBookings() {
  const [activeTab, setActiveTab] = useState('All')
  const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled']

  const filtered = activeTab === 'All' ? bookings : bookings.filter(b => b.status.toLowerCase() === activeTab.toLowerCase())

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
        <div className="flex lg:gap-6">
          <Sidebar />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <h1 className="font-display text-xl font-bold text-gray-900">My Bookings</h1>
              <Link to="/book" className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors">
                <Plus size={14} /> New Booking
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: 'Total Bookings', value: bookings.length },
                { label: 'Upcoming', value: bookings.filter(b => b.status === 'upcoming').length },
                { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length },
              ].map((s) => (
                <div key={s.label} className="bg-white border border-gray-100 rounded-xl shadow-card p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-4 bg-gray-100 rounded-xl p-1">
              {tabs.map(t => (
                <button key={t} onClick={() => setActiveTab(t)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors
                    ${activeTab === t ? 'bg-white text-pink-500 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>
                  {t}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filtered.map((b) => (
                <div key={b.id} className="bg-white border border-gray-100 rounded-2xl shadow-card overflow-hidden card-hover">
                  <div className="flex gap-4 p-4">
                    <img src={b.providerImg} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{b.service}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <ShieldCheck size={10} className="text-pink-400" /> {b.provider}
                          </p>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0
                          ${b.status === 'upcoming' ? 'bg-blue-50 text-blue-500' :
                            b.status === 'completed' ? 'bg-green-50 text-green-500' :
                            'bg-gray-100 text-gray-500'}`}>
                          {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <span className="text-[10px] text-gray-400 flex items-center gap-0.5"><Calendar size={10} /> {b.date}</span>
                        <span className="text-[10px] text-gray-400 flex items-center gap-0.5"><Clock size={10} /> {b.time}</span>
                        <span className="text-[10px] text-gray-400 flex items-center gap-0.5"><MapPin size={10} /> {b.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-50 px-4 py-3 flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-900">£{b.price}</p>
                    <div className="flex gap-2">
                      {b.status === 'completed' && !b.reviewed && (
                        <Link to="/reviews" className="text-xs bg-amber-50 text-amber-500 font-semibold px-3 py-1.5 rounded-full hover:bg-amber-100 transition-colors">
                          Leave Review
                        </Link>
                      )}
                      {b.status === 'upcoming' && (
                        <>
                          <button className="text-xs border border-gray-200 text-gray-500 font-semibold px-3 py-1.5 rounded-full hover:border-pink-300 hover:text-pink-500 transition-colors">
                            Reschedule
                          </button>
                          <button className="text-xs text-red-400 font-semibold px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors">
                            Cancel
                          </button>
                        </>
                      )}
                      {b.status === 'completed' && (
                        <Link to={`/providers/${b.providerSlug}/book`}
                          className="text-xs bg-pink-500 text-white font-semibold px-3 py-1.5 rounded-full hover:bg-pink-600 transition-colors">
                          Book Again
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Calendar size={40} className="mx-auto mb-3 text-gray-200" />
                  <p className="text-sm font-semibold">No {activeTab.toLowerCase()} bookings</p>
                  <p className="text-xs mt-1">Book a service to get started</p>
                  <Link to="/book" className="inline-block mt-4 bg-pink-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors">
                    Book Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── REFER & EARN ──────────────────────────────────────────────────────────────
export function ReferAndEarn() {
  const { user, showToast } = useApp()
  const [copied, setCopied] = useState(false)
  const refCode = 'JESSICA2024'
  const refLink = `https://rejuveefy.com/join?ref=${refCode}`

  const copy = () => {
    navigator.clipboard.writeText(refCode)
    setCopied(true)
    showToast('Referral code copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
        <div className="flex lg:gap-6">
          <Sidebar />
          <div className="flex-1 min-w-0 space-y-5">
            {/* Hero */}
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-8 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift size={32} />
              </div>
              <h1 className="font-display text-2xl font-bold mb-2">Refer & Earn</h1>
              <p className="text-pink-100 text-sm mb-1">Share your unique referral link with friends</p>
              <p className="text-white text-sm font-semibold">Both you & your friend get <strong className="text-xl">£10</strong> off!</p>
            </div>

            {/* How it works */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">How It Works</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { n: '1', icon: Share2, title: 'Share Your Link', sub: 'Share your unique referral link or code with friends' },
                  { n: '2', icon: Users, title: 'Friend Signs Up', sub: 'Your friend creates an account and makes their first booking' },
                  { n: '3', icon: Gift, title: 'Both Earn £10', sub: 'You both receive £10 credit to use on your next booking' },
                ].map((s) => (
                  <div key={s.n} className="text-center">
                    <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <s.icon size={20} className="text-pink-500" />
                    </div>
                    <p className="text-xs font-bold text-gray-800 mb-1">{s.title}</p>
                    <p className="text-[10px] text-gray-400 leading-relaxed">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Referral code */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">Your Referral Code</h2>
              <div className="bg-pink-50 border border-dashed border-pink-300 rounded-xl p-4 flex items-center justify-between mb-3">
                <span className="font-bold text-pink-500 text-lg tracking-widest">{refCode}</span>
                <button onClick={copy}
                  className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors
                    ${copied ? 'bg-green-500 text-white' : 'bg-pink-500 text-white hover:bg-pink-600'}`}>
                  {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <div className="flex gap-2">
                {['WhatsApp', 'Instagram', 'Facebook', 'Email', 'Copy Link'].map((s) => (
                  <button key={s} className="flex-1 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:border-pink-300 hover:text-pink-500 transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Referral history */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-900">Referral History</h2>
                <div className="text-right">
                  <p className="text-xs font-bold text-pink-500">{referrals.length} referrals</p>
                  <p className="text-[10px] text-gray-400">£{referrals.filter(r => r.status === 'rewarded').length * 10} earned</p>
                </div>
              </div>
              <div className="space-y-3">
                {referrals.map((r) => (
                  <div key={r.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                    <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-pink-500 font-bold">{r.name[0]}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{r.name}</p>
                      <p className="text-xs text-gray-400">{r.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-bold px-2 py-1 rounded-full
                        ${r.status === 'rewarded' ? 'bg-green-50 text-green-500' :
                          r.status === 'pending' ? 'bg-amber-50 text-amber-500' :
                          'bg-gray-100 text-gray-400'}`}>
                        {r.status === 'rewarded' ? '+ £10' : r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Points summary */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Your Rewards Summary</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Total Earned', value: '£40', icon: TrendingUp, color: 'bg-green-50 text-green-500' },
                  { label: 'Points Balance', value: user.points, icon: Zap, color: 'bg-pink-50 text-pink-500' },
                  { label: 'Friends Referred', value: referrals.length, icon: Users, color: 'bg-blue-50 text-blue-500' },
                ].map((s) => (
                  <div key={s.label} className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                      <s.icon size={18} />
                    </div>
                    <p className="font-bold text-lg text-gray-900">{s.value}</p>
                    <p className="text-[10px] text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── REVIEWS & RATINGS ─────────────────────────────────────────────────────────
export function ReviewsRatings() {
  const [showForm, setShowForm] = useState(false)
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
        <div className="flex lg:gap-6">
          <Sidebar />
          <div className="flex-1 min-w-0 space-y-5">
            <div className="flex items-center justify-between">
              <h1 className="font-display text-xl font-bold text-gray-900">Reviews & Ratings</h1>
              <button onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors">
                <Plus size={14} /> Write a Review
              </button>
            </div>

            {/* Stats */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="font-display text-4xl font-bold text-gray-900">4.8</p>
                  <div className="flex gap-0.5 justify-center my-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={16} className={i <= 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-200 text-amber-200'} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">{clientReviews.length} reviews given</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5,4,3,2,1].map(n => (
                    <div key={n} className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-3">{n}★</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: n===5?'80%':n===4?'15%':'5%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Write review form */}
            {showForm && (
              <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-gray-900">Write a Review</h2>
                  <button onClick={() => setShowForm(false)}><X size={16} className="text-gray-400" /></button>
                </div>
                {/* Select booking */}
                <div className="mb-4">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Select Booking</label>
                  <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400">
                    {bookings.filter(b => b.status === 'completed').map(b => (
                      <option key={b.id}>{b.service} — {b.provider} ({b.date})</option>
                    ))}
                  </select>
                </div>
                {/* Rating */}
                <div className="mb-4">
                  <label className="text-xs font-semibold text-gray-600 mb-2 block">Your Rating</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(n => (
                      <button key={n} onClick={() => setRating(n)}>
                        <Star size={28} className={n <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
                      </button>
                    ))}
                  </div>
                </div>
                {/* Text */}
                <div className="mb-4">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Your Review</label>
                  <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} rows={4}
                    placeholder="Share your experience with this provider..."
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400 resize-none" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setShowForm(false); setReviewText('') }}
                    className="flex-1 bg-pink-500 text-white py-3 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors">
                    Submit Review
                  </button>
                  <button onClick={() => setShowForm(false)}
                    className="border border-gray-200 text-gray-500 px-5 py-3 rounded-full text-sm font-semibold hover:border-pink-300 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Review list */}
            <div className="space-y-3">
              {clientReviews.map((r) => (
                <div key={r.id} className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
                  <div className="flex items-start gap-4 mb-3">
                    <img src={r.providerImg} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{r.service}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <ShieldCheck size={10} className="text-pink-400" /> {r.provider}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400">{r.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={14} className={i <= r.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
                  {r.providerResponse && (
                    <div className="mt-3 bg-pink-50 rounded-xl p-3 border-l-2 border-pink-500">
                      <p className="text-[10px] font-bold text-pink-500 mb-1">Provider Response</p>
                      <p className="text-xs text-gray-600">{r.providerResponse}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
