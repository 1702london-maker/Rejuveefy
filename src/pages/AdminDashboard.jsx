import { useState } from 'react'
import { LayoutDashboard, Calendar, ShoppingBag, Users, Star, Tag, Gift, BarChart3, Settings, Menu, X, AlertCircle, Package } from 'lucide-react'
import { providers, products } from '../data/mockData'

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'providers', label: 'Providers', icon: Users },
  { id: 'applications', label: 'Provider Applications', icon: Users },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'complaints', label: 'Complaints', icon: AlertCircle },
  { id: 'promos', label: 'Promo Codes', icon: Tag },
  { id: 'referrals', label: 'Referral Rewards', icon: Gift },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const stats = [
  { label: 'Total Bookings', value: '3,841', change: '+12%', up: true },
  { label: 'Total Orders', value: '6,210', change: '+8%', up: true },
  { label: 'Providers', value: '856', change: '+24', up: true },
  { label: 'Pending Applications', value: '18', change: '3 today', up: false },
  { label: 'Customers', value: '12,441', change: '+5%', up: true },
  { label: 'Revenue (Jun)', value: '£89,210', change: '+15%', up: true },
  { label: 'Open Complaints', value: '7', change: '-3', up: true },
  { label: 'Avg Rating', value: '4.87', change: '↑0.02', up: true },
]

const mockBookings = [
  { id: '#RJF40221', customer: 'Ngozi A.', service: 'Knotless Braids', provider: 'Amara Okafor', date: '28 Jun 2025', status: 'confirmed', amount: 150 },
  { id: '#RJF40219', customer: 'Blessing O.', service: 'Wig Installation', provider: 'Zoe Williams', date: '27 Jun 2025', status: 'completed', amount: 80 },
  { id: '#RJF40210', customer: 'Fatima K.', service: 'Loc Retwist', provider: 'Temi Adeyemi', date: '26 Jun 2025', status: 'pending', amount: 60 },
]
const mockOrders = [
  { id: '#ORD50441', customer: 'Aisha M.', product: 'Luxe Silk Lace Front Wig', date: '22 Jun 2025', status: 'dispatched', amount: 299 },
  { id: '#ORD50380', customer: 'Tola B.', product: 'Deep Moisture Mask', date: '20 Jun 2025', status: 'delivered', amount: 28 },
]
const mockCustomers = [
  { name: 'Ngozi Adeola', email: 'ngozi@email.com', bookings: 5, orders: 3, joined: 'Jan 2025' },
  { name: 'Blessing Osei', email: 'blessing@email.com', bookings: 2, orders: 7, joined: 'Mar 2025' },
  { name: 'Fatima Kamara', email: 'fatima@email.com', bookings: 8, orders: 1, joined: 'Dec 2024' },
]
const mockApplications = [
  { name: 'Kezia Mensah', service: 'Braids & Twists', location: 'London', date: '20 Jun 2025', status: 'pending' },
  { name: 'Amina Bello', service: 'Makeup Artist', location: 'Manchester', date: '18 Jun 2025', status: 'under-review' },
]

function StatusBadge({ status }) {
  const map = {
    confirmed: 'bg-blue-50 text-blue-700', completed: 'bg-green-50 text-green-700',
    pending: 'bg-amber-50 text-amber-700', dispatched: 'bg-purple-50 text-purple-700',
    delivered: 'bg-green-50 text-green-700', 'under-review': 'bg-blue-50 text-blue-700',
    rejected: 'bg-red-50 text-red-700',
  }
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize whitespace-nowrap ${map[status] || 'bg-surface-container text-on-surface-variant'}`}>{status?.replace('-', ' ')}</span>
}

function Table({ cols, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead><tr className="border-b border-outline-variant/20">{cols.map(c => <th key={c} className="text-left py-3 px-3 text-on-surface-variant font-semibold uppercase tracking-wide whitespace-nowrap">{c}</th>)}</tr></thead>
        <tbody>{rows.map((row, i) => <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">{row.map((cell, j) => <td key={j} className="py-3 px-3 whitespace-nowrap">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

export default function AdminDashboard() {
  const [active, setActive] = useState('overview')
  const [sideOpen, setSideOpen] = useState(false)

  return (
    <div className="pt-16 min-h-screen flex bg-surface-container-low">
      {/* Sidebar overlay mobile */}
      {sideOpen && <div className="fixed inset-0 z-40 bg-on-surface/20 lg:hidden" onClick={() => setSideOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 bottom-0 z-40 w-60 bg-surface-container-lowest border-r border-outline-variant/20 overflow-y-auto transition-transform lg:translate-x-0 ${sideOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:translate-x-0 lg:flex-shrink-0`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <span className="font-semibold text-sm text-on-surface">Admin Panel</span>
            <button onClick={() => setSideOpen(false)}><X size={16} /></button>
          </div>
          <nav className="space-y-0.5">
            {sidebarItems.map(item => (
              <button key={item.id} onClick={() => { setActive(item.id); setSideOpen(false) }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${active === item.id ? 'bg-primary text-white' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}`}>
                <item.icon size={15} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 lg:pb-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setSideOpen(true)} className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:text-primary"><Menu size={20} /></button>
          <h1 className="font-display text-xl font-bold text-on-surface capitalize">{active.replace('-', ' ')}</h1>
        </div>

        {active === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {stats.map(s => (
                <div key={s.label} className="bg-surface-container-lowest rounded-2xl p-4 shadow-ambient">
                  <p className="text-xs text-on-surface-variant mb-1">{s.label}</p>
                  <p className="font-display font-bold text-xl text-on-surface">{s.value}</p>
                  <p className={`text-xs font-medium mt-1 ${s.up ? 'text-green-600' : 'text-amber-600'}`}>{s.change}</p>
                </div>
              ))}
            </div>
            {/* Recent bookings */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-ambient p-5">
              <h2 className="font-semibold text-sm text-on-surface mb-4">Recent Bookings</h2>
              <Table cols={['ID', 'Customer', 'Service', 'Provider', 'Date', 'Status', 'Amount']}
                rows={mockBookings.map(b => [b.id, b.customer, b.service, b.provider, b.date, <StatusBadge status={b.status} />, `£${b.amount}`])} />
            </div>
          </div>
        )}

        {active === 'bookings' && (
          <div className="bg-surface-container-lowest rounded-2xl shadow-ambient p-5">
            <div className="flex items-center gap-3 mb-4">
              <input placeholder="Search bookings..." className="flex-1 border border-outline-variant/30 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary bg-surface-container-lowest" />
              <select className="border border-outline-variant/30 rounded-xl px-3 py-2 text-xs bg-surface-container-lowest"><option>All Status</option><option>Confirmed</option><option>Completed</option><option>Pending</option></select>
            </div>
            <Table cols={['ID', 'Customer', 'Service', 'Provider', 'Date', 'Status', 'Amount', 'Actions']}
              rows={mockBookings.map(b => [b.id, b.customer, b.service, b.provider, b.date, <StatusBadge status={b.status} />, `£${b.amount}`,
                <div className="flex gap-1"><button className="text-[10px] text-primary border border-primary px-2 py-0.5 rounded-full">View</button><button className="text-[10px] text-error border border-error/30 px-2 py-0.5 rounded-full">Cancel</button></div>])} />
          </div>
        )}

        {active === 'orders' && (
          <div className="bg-surface-container-lowest rounded-2xl shadow-ambient p-5">
            <div className="flex items-center gap-3 mb-4">
              <input placeholder="Search orders..." className="flex-1 border border-outline-variant/30 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary bg-surface-container-lowest" />
            </div>
            <Table cols={['Order ID', 'Customer', 'Product', 'Date', 'Status', 'Amount', 'Actions']}
              rows={mockOrders.map(o => [o.id, o.customer, o.product, o.date, <StatusBadge status={o.status} />, `£${o.amount}`,
                <button className="text-[10px] text-primary border border-primary px-2 py-0.5 rounded-full">View</button>])} />
          </div>
        )}

        {active === 'providers' && (
          <div className="bg-surface-container-lowest rounded-2xl shadow-ambient p-5">
            <Table cols={['Name', 'Specialty', 'Location', 'Rating', 'Reviews', 'Status', 'Actions']}
              rows={providers.map(p => [p.name, p.title, p.location, `⭐ ${p.rating}`, p.reviews, <StatusBadge status="active" />,
                <div className="flex gap-1"><button className="text-[10px] text-primary border border-primary px-2 py-0.5 rounded-full">View</button><button className="text-[10px] text-error border border-error/30 px-2 py-0.5 rounded-full">Suspend</button></div>])} />
          </div>
        )}

        {active === 'applications' && (
          <div className="bg-surface-container-lowest rounded-2xl shadow-ambient p-5">
            <Table cols={['Name', 'Service', 'Location', 'Applied', 'Status', 'Actions']}
              rows={mockApplications.map(a => [a.name, a.service, a.location, a.date, <StatusBadge status={a.status} />,
                <div className="flex gap-1"><button className="text-[10px] text-green-700 border border-green-200 px-2 py-0.5 rounded-full">Approve</button><button className="text-[10px] text-error border border-error/30 px-2 py-0.5 rounded-full">Reject</button></div>])} />
          </div>
        )}

        {active === 'customers' && (
          <div className="bg-surface-container-lowest rounded-2xl shadow-ambient p-5">
            <Table cols={['Name', 'Email', 'Bookings', 'Orders', 'Joined', 'Actions']}
              rows={mockCustomers.map(c => [c.name, c.email, c.bookings, c.orders, c.joined,
                <button className="text-[10px] text-primary border border-primary px-2 py-0.5 rounded-full">View</button>])} />
          </div>
        )}

        {active === 'products' && (
          <div className="bg-surface-container-lowest rounded-2xl shadow-ambient p-5">
            <Table cols={['Product', 'Category', 'Price', 'Rating', 'Reviews', 'Stock', 'Actions']}
              rows={products.map(p => [p.name, p.category, `£${p.price}`, `⭐ ${p.rating}`, p.reviews, <StatusBadge status="active" />,
                <div className="flex gap-1"><button className="text-[10px] text-primary border border-primary px-2 py-0.5 rounded-full">Edit</button></div>])} />
          </div>
        )}

        {['reviews', 'complaints', 'promos', 'referrals', 'analytics', 'settings'].includes(active) && (
          <div className="bg-surface-container-lowest rounded-2xl shadow-ambient p-10 text-center">
            <div className="text-4xl mb-4">🚧</div>
            <p className="font-semibold text-on-surface mb-1 capitalize">{active} Module</p>
            <p className="text-sm text-on-surface-variant">This section is ready for backend integration.</p>
          </div>
        )}
      </main>
    </div>
  )
}
