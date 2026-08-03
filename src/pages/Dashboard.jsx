import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Copy,
  Gift,
  Heart,
  LayoutDashboard,
  Mail,
  Plus,
  ShieldCheck,
  Share2,
  Star,
  Users,
} from 'lucide-react'
import { fetchUserBookings, fetchUserReferrals, fetchUserReviews } from '../lib/db'
import { useApp } from '../context/AppContext'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Calendar, label: 'My Bookings', href: '/bookings' },
  { icon: Heart, label: 'Wishlist', href: '/wishlist' },
  { icon: Star, label: 'Reviews', href: '/reviews' },
  { icon: Gift, label: 'Referrals', href: '/referrals' },
]

const money = (value) => `GBP ${Number(value || 0).toFixed(2)}`

function isUpcoming(booking) {
  return booking.status === 'pending' || booking.status === 'confirmed'
}

function statusLabel(status = 'pending') {
  return status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ')
}

function useUserData(userId) {
  const [bookings, setBookings] = useState([])
  const [referrals, setReferrals] = useState([])
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    if (!userId) {
      setBookings([])
      setReferrals([])
      setReviews([])
      return
    }

    fetchUserBookings(userId).then(setBookings).catch(() => setBookings([]))
    fetchUserReferrals(userId).then(setReferrals).catch(() => setReferrals([]))
    fetchUserReviews(userId).then(setReviews).catch(() => setReviews([]))
  }, [userId])

  return { bookings, referrals, reviews }
}

function Sidebar() {
  const { pathname } = useLocation()
  const { userDisplay } = useApp()
  const name = userDisplay?.name || 'User'

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-card overflow-hidden sticky top-24">
        <div className="p-5 bg-gradient-to-br from-pink-50 to-white border-b border-pink-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-pink-200 rounded-2xl flex items-center justify-center">
              <span className="text-pink-600 font-bold text-lg">{name[0]?.toUpperCase() || 'U'}</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{name}</p>
              <p className="text-xs text-gray-400">Rejuveefy account</p>
            </div>
          </div>
        </div>

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

function AuthRequired() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-8 text-center max-w-md">
        <ShieldCheck size={34} className="text-pink-500 mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Sign in required</h1>
        <p className="text-sm text-gray-500 mb-6">Create or sign in to your Rejuveefy account to see bookings, reviews, wishlist and referrals.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/login" className="bg-pink-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors">Sign In</Link>
          <Link to="/register" className="border border-pink-500 text-pink-500 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-50 transition-colors">Create Account</Link>
        </div>
      </div>
    </div>
  )
}

function BookingCard({ booking, compact = false }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-card overflow-hidden card-hover">
      <div className="flex gap-4 p-4">
        <div className="w-14 h-14 rounded-xl shrink-0 bg-pink-100 overflow-hidden flex items-center justify-center">
          {booking.providers?.image_url ? (
            <img src={booking.providers.image_url} alt="" className="w-full h-full object-cover" />
          ) : (
            <Calendar size={20} className="text-pink-500" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-gray-900">{booking.service_name || 'Beauty appointment'}</p>
              <p className="text-xs text-gray-500 mt-0.5">{booking.providers?.name || 'Provider to confirm'}</p>
            </div>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0
              ${isUpcoming(booking) ? 'bg-blue-50 text-blue-500' :
                booking.status === 'completed' ? 'bg-green-50 text-green-500' :
                'bg-gray-100 text-gray-500'}`}>
              {statusLabel(booking.status)}
            </span>
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            {booking.booking_date && (
              <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                <Calendar size={10} /> {new Date(booking.booking_date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: compact ? undefined : 'numeric' })}
              </span>
            )}
            {booking.booking_time && (
              <span className="text-[10px] text-gray-400 flex items-center gap-0.5"><Clock size={10} /> {booking.booking_time}</span>
            )}
          </div>
        </div>
      </div>
      {!compact && (
        <div className="border-t border-gray-50 px-4 py-3 flex items-center justify-between">
          <p className="text-sm font-bold text-gray-900">{booking.service_price ? money(booking.service_price) : ''}</p>
          <div className="flex gap-2">
            {booking.status === 'completed' && (
              <Link to="/reviews" className="text-xs bg-amber-50 text-amber-500 font-semibold px-3 py-1.5 rounded-full hover:bg-amber-100 transition-colors">
                Review
              </Link>
            )}
            {booking.providers?.slug && (
              <Link to={`/providers/${booking.providers.slug}/book`}
                className="text-xs bg-pink-500 text-white font-semibold px-3 py-1.5 rounded-full hover:bg-pink-600 transition-colors">
                Book Again
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function DashboardHome() {
  const { user, userDisplay } = useApp()
  const { bookings, referrals, reviews } = useUserData(user?.id)
  const name = userDisplay?.name || 'User'
  const upcoming = bookings.filter(isUpcoming)

  if (!user) return <AuthRequired />

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
        <div className="flex lg:gap-6">
          <Sidebar />
          <div className="flex-1 min-w-0 space-y-5">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-5 text-white">
              <p className="text-pink-100 text-xs mb-1">Welcome back,</p>
              <h1 className="font-display text-2xl font-bold">Hello, {name}</h1>
              <p className="text-pink-100 text-sm mt-1">
                {upcoming.length > 0 ? `You have ${upcoming.length} upcoming appointment${upcoming.length === 1 ? '' : 's'}.` : 'Your client account is ready.'}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { icon: Calendar, label: 'Bookings', value: bookings.length, sub: `${upcoming.length} upcoming`, color: 'bg-blue-50 text-blue-500' },
                { icon: Star, label: 'Reviews', value: reviews.length, sub: 'From completed activity', color: 'bg-amber-50 text-amber-500' },
                { icon: Gift, label: 'Referrals', value: referrals.length, sub: 'Tracked in Supabase', color: 'bg-pink-50 text-pink-500' },
                { icon: Heart, label: 'Wishlist', value: 'Saved', sub: 'Managed on this device', color: 'bg-green-50 text-green-500' },
              ].map(({ icon: Icon, label, value, sub, color }) => (
                <div key={label} className="bg-white border border-gray-100 rounded-2xl shadow-card p-4">
                  <div className={`w-9 h-9 ${color} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon size={16} />
                  </div>
                  <p className="text-xl font-bold text-gray-900">{value}</p>
                  <p className="text-xs font-semibold text-gray-600">{label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-900">Upcoming Appointments</h2>
                <Link to="/bookings" className="text-xs text-pink-500 font-semibold flex items-center gap-1">View All <ArrowRight size={12} /></Link>
              </div>
              <div className="space-y-3">
                {upcoming.slice(0, 3).map((booking) => <BookingCard key={booking.id} booking={booking} compact />)}
                {upcoming.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar size={34} className="mx-auto mb-3 text-gray-200" />
                    <p className="text-sm text-gray-400 mb-4">No upcoming appointments yet.</p>
                    <Link to="/book" className="inline-flex items-center gap-2 bg-pink-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors">
                      Book a Service <Plus size={14} />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-14 h-14 bg-pink-500 rounded-2xl flex items-center justify-center shrink-0">
                <Gift size={24} className="text-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-base font-bold text-gray-900 mb-1">Referral flow is ready to track</h3>
                <p className="text-xs text-gray-500">Share your code and view real referral activity once people register through your link.</p>
              </div>
              <Link to="/referrals" className="bg-pink-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors whitespace-nowrap">
                Open Referrals
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MyBookings() {
  const { user } = useApp()
  const { bookings } = useUserData(user?.id)
  const [activeTab, setActiveTab] = useState('All')
  const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled']

  if (!user) return <AuthRequired />

  const filtered = activeTab === 'All' ? bookings : bookings.filter(booking => {
    if (activeTab === 'Upcoming') return isUpcoming(booking)
    if (activeTab === 'Completed') return booking.status === 'completed'
    if (activeTab === 'Cancelled') return booking.status === 'cancelled'
    return true
  })

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

            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: 'Total', value: bookings.length },
                { label: 'Upcoming', value: bookings.filter(isUpcoming).length },
                { label: 'Completed', value: bookings.filter(booking => booking.status === 'completed').length },
              ].map((stat) => (
                <div key={stat.label} className="bg-white border border-gray-100 rounded-xl shadow-card p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-1 mb-4 bg-gray-100 rounded-xl p-1">
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors
                    ${activeTab === tab ? 'bg-white text-pink-500 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filtered.map((booking) => <BookingCard key={booking.id} booking={booking} />)}
              {filtered.length === 0 && (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-card text-center py-12 text-gray-400">
                  <Calendar size={40} className="mx-auto mb-3 text-gray-200" />
                  <p className="text-sm font-semibold">No {activeTab.toLowerCase()} bookings</p>
                  <p className="text-xs mt-1">Book a service to get started.</p>
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

export function ReferAndEarn() {
  const { user, showToast } = useApp()
  const { referrals } = useUserData(user?.id)
  const [copied, setCopied] = useState(false)

  if (!user) return <AuthRequired />

  const refCode = user.id.slice(0, 8).toUpperCase()
  const refLink = `https://www.rejuveefy.com/register?ref=${refCode}`
  const rewardCount = referrals.filter(referral => referral.reward_paid).length

  const copy = async (value, label) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    showToast(`${label} copied`)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
        <div className="flex lg:gap-6">
          <Sidebar />
          <div className="flex-1 min-w-0 space-y-5">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-8 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift size={32} />
              </div>
              <h1 className="font-display text-2xl font-bold mb-2">Referrals</h1>
              <p className="text-pink-100 text-sm">Share your unique link. Rewards can be configured once the business rule is final.</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">Your Referral Link</h2>
              <div className="bg-pink-50 border border-dashed border-pink-300 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <span className="font-bold text-pink-500 text-sm break-all">{refLink}</span>
                <button onClick={() => copy(refLink, 'Referral link')}
                  className={`flex items-center justify-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors shrink-0
                    ${copied ? 'bg-green-500 text-white' : 'bg-pink-500 text-white hover:bg-pink-600'}`}>
                  {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
                  {copied ? 'Copied' : 'Copy Link'}
                </button>
              </div>
              <button onClick={() => copy(refCode, 'Referral code')} className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-pink-500">
                <Share2 size={12} /> Code: {refCode}
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: 'Tracked Referrals', value: referrals.length, icon: Users },
                { label: 'Rewards Paid', value: rewardCount, icon: Gift },
                { label: 'Reward Value', value: money(referrals.reduce((sum, referral) => sum + Number(referral.reward_paid ? referral.reward_amount || 0 : 0), 0)), icon: ShieldCheck },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-white border border-gray-100 rounded-2xl shadow-card p-5 text-center">
                  <div className="w-10 h-10 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Icon size={18} />
                  </div>
                  <p className="font-bold text-lg text-gray-900">{value}</p>
                  <p className="text-[10px] text-gray-400">{label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Referral History</h2>
              <div className="space-y-3">
                {referrals.length === 0 && <p className="text-sm text-gray-400 text-center py-6">No referrals yet.</p>}
                {referrals.map((referral) => (
                  <div key={referral.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                    <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center shrink-0">
                      <Mail size={16} className="text-pink-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{referral.referred_email || 'Referral pending'}</p>
                      <p className="text-xs text-gray-400">{referral.created_at ? new Date(referral.created_at).toLocaleDateString('en-GB') : ''}</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-500">
                      {statusLabel(referral.status || 'pending')}
                    </span>
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

export function ReviewsRatings() {
  const { user } = useApp()
  const { bookings, reviews } = useUserData(user?.id)
  const completedBookings = bookings.filter(booking => booking.status === 'completed')
  const averageRating = reviews.length
    ? (reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length).toFixed(1)
    : '0.0'

  if (!user) return <AuthRequired />

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
        <div className="flex lg:gap-6">
          <Sidebar />
          <div className="flex-1 min-w-0 space-y-5">
            <div className="flex items-center justify-between">
              <h1 className="font-display text-xl font-bold text-gray-900">Reviews</h1>
              <Link to="/bookings"
                className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors">
                <Calendar size={14} /> View Bookings
              </Link>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="font-display text-4xl font-bold text-gray-900">{averageRating}</p>
                  <div className="flex gap-0.5 justify-center my-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} size={16} className={i <= Math.round(Number(averageRating)) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">{reviews.length} reviews given</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">
                    Reviews should be enabled only for completed bookings. You currently have {completedBookings.length} completed booking{completedBookings.length === 1 ? '' : 's'}.
                  </p>
                </div>
              </div>
            </div>

            {completedBookings.length === 0 && (
              <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-8 text-center">
                <Star size={34} className="text-gray-200 mx-auto mb-3" />
                <p className="text-sm text-gray-400">Complete a booking before leaving a review.</p>
              </div>
            )}

            <div className="space-y-3">
              {reviews.length === 0 && completedBookings.length > 0 && (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-8 text-center">
                  <p className="text-sm text-gray-400">No reviews have been submitted yet.</p>
                </div>
              )}
              {reviews.map((review) => (
                <div key={review.id} className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{review.providers?.name || review.products?.name || 'Rejuveefy experience'}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <ShieldCheck size={10} className="text-pink-400" /> Verified activity
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">{review.created_at ? new Date(review.created_at).toLocaleDateString('en-GB') : ''}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} size={14} className={i <= Number(review.rating || 0) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
