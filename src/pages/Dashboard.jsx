import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Star, Heart, Bell, LogOut, Package, Calendar, Gift } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { providers, products } from '../data/mockData'
import ProductCard from '../components/ProductCard'
import ProviderCard from '../components/ProviderCard'

const mockBookings = [
  { id: '#RJF40221', service: 'Knotless Braids', provider: 'Amara Okafor', date: '28 Jun 2025', time: '10:00', status: 'confirmed', price: 150 },
  { id: '#RJF40108', service: 'Deep Conditioning', provider: 'Temi Adeyemi', date: '14 Jun 2025', time: '14:00', status: 'completed', price: 55 },
]
const mockOrders = [
  { id: '#ORD50441', product: 'Luxe Silk Lace Front Wig', date: '20 Jun 2025', status: 'dispatched', price: 299 },
  { id: '#ORD50380', product: 'Deep Moisture Mask', date: '15 Jun 2025', status: 'delivered', price: 28 },
]

function StatusBadge({ status }) {
  const styles = {
    confirmed: 'bg-blue-50 text-blue-700',
    completed: 'bg-green-50 text-green-700',
    dispatched: 'bg-amber-50 text-amber-700',
    delivered: 'bg-green-50 text-green-700',
    pending: 'bg-outline-variant/20 text-on-surface-variant',
  }
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${styles[status] || styles.pending}`}>{status}</span>
}

export function MyBookings() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-display text-2xl font-bold text-on-surface mb-8">My Bookings</h1>
        <div className="space-y-4">
          {mockBookings.map(b => (
            <div key={b.id} className="bg-surface-container-lowest rounded-2xl p-5 shadow-ambient">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1"><Calendar size={14} className="text-primary" /><span className="font-semibold text-on-surface">{b.service}</span></div>
                  <p className="text-sm text-on-surface-variant">{b.provider} · {b.date} at {b.time}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">{b.id}</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={b.status} />
                  <p className="font-bold text-on-surface mt-2">£{b.price}</p>
                </div>
              </div>
              {b.status === 'confirmed' && (
                <div className="flex gap-2 mt-3">
                  <button className="text-xs border border-outline-variant/40 text-on-surface-variant px-3 py-1.5 rounded-full hover:border-primary hover:text-primary transition-all">Reschedule</button>
                  <button className="text-xs border border-error/30 text-error px-3 py-1.5 rounded-full hover:bg-error-container transition-all">Cancel</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function MyOrders() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-display text-2xl font-bold text-on-surface mb-8">My Orders</h1>
        <div className="space-y-4">
          {mockOrders.map(o => (
            <div key={o.id} className="bg-surface-container-lowest rounded-2xl p-5 shadow-ambient">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1"><Package size={14} className="text-primary" /><span className="font-semibold text-on-surface">{o.product}</span></div>
                  <p className="text-sm text-on-surface-variant">{o.date} · {o.id}</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={o.status} />
                  <p className="font-bold text-on-surface mt-2">£{o.price}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Link to="/track-order" className="text-xs border border-outline-variant/40 text-on-surface-variant px-3 py-1.5 rounded-full hover:border-primary hover:text-primary transition-all">Track Order</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Wishlist() {
  const { wishlist } = useApp()
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-display text-2xl font-bold text-on-surface mb-8">My Wishlist ({wishlist.length})</h1>
        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={48} className="text-outline-variant mx-auto mb-4" />
            <p className="text-on-surface-variant mb-4">Your wishlist is empty</p>
            <Link to="/shop" className="bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold">Browse Shop</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}

export function Account() {
  const { user, setUser } = useApp()
  const [tab, setTab] = useState('profile')
  const [notifs, setNotifs] = useState({ bookingUpdates: true, promotions: true, newProviders: false, reviews: true })

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-display text-2xl font-bold text-on-surface mb-8">My Account</h1>
        <div className="flex gap-1 bg-surface-container-low p-1 rounded-xl mb-6 w-fit overflow-x-auto">
          {['profile', 'security', 'notifications'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-all ${tab === t ? 'bg-surface-container-lowest shadow-ambient text-primary' : 'text-on-surface-variant hover:text-primary'}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'profile' && (
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center text-2xl font-display font-bold text-primary">
                {user?.name?.charAt(0) || 'T'}
              </div>
              <div>
                <p className="font-semibold text-on-surface">{user?.name || 'Tsemaye Okoroh'}</p>
                <p className="text-sm text-on-surface-variant">{user?.email || 'tsemaye@example.com'}</p>
              </div>
            </div>
            {[['Full Name', 'Tsemaye Okoroh'], ['Email Address', 'tsemaye@example.com'], ['Phone', '+44 7700 900123'], ['City', 'London, UK']].map(([label, val]) => (
              <div key={label}>
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1">{label}</label>
                <input defaultValue={val} className="w-full border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm bg-surface-container-lowest focus:outline-none focus:border-primary" />
              </div>
            ))}
            <button className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">Save Changes</button>
          </div>
        )}

        {tab === 'security' && (
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient space-y-4">
            {[['Current Password', '••••••••'], ['New Password', ''], ['Confirm Password', '']].map(([label, val]) => (
              <div key={label}>
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1">{label}</label>
                <input type="password" defaultValue={val} className="w-full border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm bg-surface-container-lowest focus:outline-none focus:border-primary" />
              </div>
            ))}
            <button className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">Update Password</button>
          </div>
        )}

        {tab === 'notifications' && (
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient space-y-4">
            {Object.entries(notifs).map(([key, val]) => (
              <label key={key} className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-medium text-sm text-on-surface capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                </div>
                <div onClick={() => setNotifs(n => ({ ...n, [key]: !n[key] }))} className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${val ? 'bg-primary' : 'bg-surface-container-highest'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${val ? 'translate-x-7' : 'translate-x-1'}`} />
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function Referrals() {
  const [copied, setCopied] = useState(false)
  const code = 'RJFTSEMAYE'
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-display text-2xl font-bold text-on-surface mb-2">Referral Programme</h1>
        <p className="text-on-surface-variant mb-8">Invite friends and earn beauty credits together</p>

        {/* Credit balance */}
        <div className="bg-gradient-to-r from-primary to-on-primary-container rounded-3xl p-6 text-white mb-6">
          <p className="text-sm text-white/70 mb-1">Your Referral Credit</p>
          <p className="font-display text-3xl font-bold">£20.00</p>
          <p className="text-xs text-white/60 mt-1">Available to use on bookings and shop orders</p>
        </div>

        {/* Referral code */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient mb-6">
          <div className="flex items-center gap-2 mb-3"><Gift size={16} className="text-primary" /><h2 className="font-semibold text-on-surface">Your Referral Code</h2></div>
          <div className="flex gap-3">
            <div className="flex-1 bg-primary-fixed/30 rounded-xl px-4 py-3 font-mono font-bold text-primary text-center text-lg tracking-widest">{code}</div>
            <button onClick={copy} className="bg-primary text-white px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity">
              <Copy size={14} /> {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-surface-container-low rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-on-surface mb-4">How It Works</h2>
          <div className="space-y-3">
            {[
              { step: '1', text: 'Share your unique referral code with friends' },
              { step: '2', text: 'They sign up and make their first booking or purchase' },
              { step: '3', text: 'You both receive £10 credit automatically' },
            ].map(item => (
              <div key={item.step} className="flex items-center gap-3">
                <div className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">{item.step}</div>
                <p className="text-sm text-on-surface-variant">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full bg-primary text-white py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity">Invite a Friend</button>
      </div>
    </div>
  )
}

// ── CUSTOMER DASHBOARD ─────────────────────────────────────────────────────
export default function Dashboard() {
  const { user, wishlist } = useApp()
  const name = user?.name || 'Tsemaye'

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-primary-fixed/40 to-surface rounded-3xl p-6 mb-8">
          <p className="text-on-surface-variant text-sm mb-1">Welcome back 👋</p>
          <h1 className="font-display text-2xl font-bold text-on-surface">{name}</h1>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Bookings', val: '4', icon: Calendar, path: '/bookings' },
            { label: 'Orders', val: '3', icon: Package, path: '/orders' },
            { label: 'Wishlist', val: wishlist.length, icon: Heart, path: '/wishlist' },
            { label: 'Referral Credit', val: '£20', icon: Gift, path: '/referrals' },
          ].map(({ label, val, icon: Icon, path }) => (
            <Link key={label} to={path} className="luxury-card bg-surface-container-lowest rounded-2xl p-4 shadow-ambient flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-container/30 rounded-xl flex items-center justify-center shrink-0"><Icon size={16} className="text-primary" /></div>
              <div><p className="font-bold text-on-surface">{val}</p><p className="text-xs text-on-surface-variant">{label}</p></div>
            </Link>
          ))}
        </div>

        {/* Upcoming bookings */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-on-surface">Upcoming Appointments</h2>
            <Link to="/bookings" className="text-xs text-primary font-semibold">View all</Link>
          </div>
          <div className="space-y-3">
            {mockBookings.filter(b => b.status === 'confirmed').map(b => (
              <div key={b.id} className="bg-surface-container-lowest rounded-2xl p-4 shadow-ambient flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-container/30 rounded-xl flex items-center justify-center text-xl shrink-0">💆</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-on-surface">{b.service}</p>
                  <p className="text-xs text-on-surface-variant">{b.provider} · {b.date} at {b.time}</p>
                </div>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Saved providers */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-on-surface">Saved Providers</h2>
            <Link to="/providers" className="text-xs text-primary font-semibold">Browse all</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {providers.slice(0, 2).map(p => <ProviderCard key={p.id} provider={p} />)}
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[{ label: 'Book a Service', icon: '📅', path: '/book' }, { label: 'Browse Shop', icon: '🛍️', path: '/shop' }, { label: 'AI Analyzer', icon: '✨', path: '/ai-analyzer' }, { label: 'My Account', icon: '👤', path: '/account' }, { label: 'Referrals', icon: '🎁', path: '/referrals' }, { label: 'Contact Support', icon: '💬', path: '/contact' }].map(item => (
            <Link key={item.label} to={item.path} className="luxury-card bg-surface-container-lowest rounded-2xl p-4 shadow-ambient flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium text-sm text-on-surface">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

