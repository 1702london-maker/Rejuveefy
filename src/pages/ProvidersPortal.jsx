import { useState } from 'react'
import {
  Calendar, DollarSign, Star, Users, TrendingUp, Bell, ChevronDown,
  Clock, CheckCircle, XCircle, AlertCircle, Edit3, Plus, Camera,
  MapPin, Phone, Mail, BarChart2, Settings, ArrowUpRight, Eye,
  Scissors, Package
} from 'lucide-react'

const stats = [
  { label: 'Total Earnings', value: '£3,840', change: '+18%', up: true, icon: DollarSign, color: 'text-green-600 bg-green-50' },
  { label: 'Bookings This Month', value: '47', change: '+12%', up: true, icon: Calendar, color: 'text-pink-600 bg-pink-50' },
  { label: 'Profile Views', value: '1,284', change: '+34%', up: true, icon: Eye, color: 'text-blue-600 bg-blue-50' },
  { label: 'Avg. Rating', value: '4.9 ★', change: '+0.1', up: true, icon: Star, color: 'text-yellow-600 bg-yellow-50' },
]

const upcomingBookings = [
  { id: 'BK-2201', client: 'Simone T.', clientImg: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=40&h=40&fit=crop', service: 'Knotless Braids', date: 'Today', time: '10:00 AM', duration: '5 hrs', price: '£120', status: 'confirmed' },
  { id: 'BK-2202', client: 'Amara N.', clientImg: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=40&h=40&fit=crop', service: 'Wig Installation', date: 'Today', time: '3:30 PM', duration: '2 hrs', price: '£85', status: 'confirmed' },
  { id: 'BK-2203', client: 'Danielle O.', clientImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop', service: 'Hair Treatment', date: 'Tomorrow', time: '11:00 AM', duration: '1.5 hrs', price: '£55', status: 'pending' },
  { id: 'BK-2204', client: 'Fatima B.', clientImg: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=40&h=40&fit=crop', service: 'Passion Twists', date: '28 Jun', time: '9:00 AM', duration: '4 hrs', price: '£95', status: 'confirmed' },
  { id: 'BK-2205', client: 'Tolu A.', clientImg: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=40&h=40&fit=crop', service: 'Knotless Braids', date: '29 Jun', time: '1:00 PM', duration: '5 hrs', price: '£120', status: 'pending' },
]

const services = [
  { name: 'Knotless Braids', category: 'Braids', price: '£120', duration: '5 hrs', bookings: 18, active: true },
  { name: 'Box Braids', category: 'Braids', price: '£100', duration: '4 hrs', bookings: 12, active: true },
  { name: 'Wig Installation', category: 'Wigs', price: '£85', duration: '2 hrs', bookings: 9, active: true },
  { name: 'Passion Twists', category: 'Twists', price: '£95', duration: '4 hrs', bookings: 6, active: true },
  { name: 'Hair Treatment', category: 'Treatments', price: '£55', duration: '1.5 hrs', bookings: 4, active: false },
]

const reviews = [
  { name: 'Simone T.', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=40&h=40&fit=crop', rating: 5, text: 'Absolutely amazing! My braids lasted 8 weeks and looked fresh the whole time.', date: '20 Jun 2026', replied: false },
  { name: 'Precious A.', img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=40&h=40&fit=crop', rating: 5, text: 'Best wig install I have ever had. So natural looking!', date: '15 Jun 2026', replied: true },
]

const earningsData = [55, 80, 65, 110, 90, 140, 125, 160, 105, 175, 150, 210]
const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

export default function ProvidersPortal() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [replyText, setReplyText] = useState('')
  const [replyingTo, setReplyingTo] = useState(null)
  const maxVal = Math.max(...earningsData)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Portal header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-pink-500 text-lg">Rejuveefy</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600 text-sm font-semibold">Provider Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg text-gray-400 hover:text-pink-500 hover:bg-pink-50">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=32&h=32&fit=crop" alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 leading-none">Hair By Amara</p>
                <p className="text-xs text-pink-500">Verified Provider ✓</p>
              </div>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white border border-gray-100 rounded-xl p-1 w-fit overflow-x-auto">
          {['dashboard', 'bookings', 'services', 'reviews', 'profile', 'payouts'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors whitespace-nowrap ${
                activeTab === tab ? 'bg-pink-500 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Profile completeness */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl font-bold">Good morning, Amara 👋</p>
            <p className="text-pink-100 text-sm mt-1">You have <strong className="text-white">2 pending bookings</strong> to confirm today.</p>
          </div>
          <div className="text-right">
            <p className="text-pink-100 text-xs mb-1">Profile completeness: 85%</p>
            <div className="w-40 bg-white/20 rounded-full h-2 mb-1">
              <div className="bg-white h-2 rounded-full" style={{ width: '85%' }} />
            </div>
            <button className="text-xs text-white underline">Complete profile →</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">{s.label}</p>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}>
                  <s.icon size={15} />
                </div>
              </div>
              <p className="font-display text-2xl font-bold text-gray-900 mb-1">{s.value}</p>
              <p className={`text-xs flex items-center gap-0.5 ${s.up ? 'text-green-600' : 'text-red-500'}`}>
                <ArrowUpRight size={12} />{s.change} vs last month
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">

          {/* Earnings chart */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Earnings (12 months)</h3>
              <span className="text-xs text-gray-400">£3,840 total</span>
            </div>
            <div className="flex items-end gap-1.5 h-36">
              {earningsData.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-pink-200 rounded-sm hover:bg-pink-500 transition-colors cursor-pointer relative group"
                    style={{ height: `${(v / maxVal) * 100}%` }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      £{v}
                    </div>
                  </div>
                  <span className="text-[9px] text-gray-400">{months[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Today's schedule */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Today</h3>
              <span className="text-xs text-gray-400">2 appointments</span>
            </div>
            <div className="space-y-3">
              {upcomingBookings.slice(0, 2).map(b => (
                <div key={b.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <img src={b.clientImg} alt={b.client} className="w-9 h-9 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{b.client}</p>
                    <p className="text-gray-400 text-xs">{b.service}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-pink-500 font-bold text-sm">{b.time}</p>
                    <p className="text-gray-400 text-xs">{b.duration}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-pink-50 rounded-xl">
              <p className="text-xs text-pink-600 font-semibold">Next available slot</p>
              <p className="text-gray-900 font-semibold text-sm mt-0.5">Tomorrow, 9:00 AM</p>
              <button className="mt-2 text-xs text-pink-500 font-semibold">Block time →</button>
            </div>
          </div>
        </div>

        {/* Upcoming bookings */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-8">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Upcoming Bookings</h3>
            <button className="text-pink-500 text-sm font-semibold hover:underline">Manage Calendar</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wide">
                  <th className="px-6 py-3 text-left">Client</th>
                  <th className="px-4 py-3 text-left">Service</th>
                  <th className="px-4 py-3 text-left">Date & Time</th>
                  <th className="px-4 py-3 text-left">Duration</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {upcomingBookings.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <img src={b.clientImg} alt={b.client} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="font-medium text-gray-900">{b.client}</p>
                          <p className="text-gray-400 text-xs">{b.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-700">{b.service}</td>
                    <td className="px-4 py-3.5">
                      <p className="font-medium text-gray-900">{b.date}</p>
                      <p className="text-gray-400 text-xs">{b.time}</p>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500">{b.duration}</td>
                    <td className="px-4 py-3.5 font-semibold text-gray-900">{b.price}</td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {b.status === 'pending' ? (
                        <div className="flex gap-2">
                          <button className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                            <CheckCircle size={14} />
                          </button>
                          <button className="p-1.5 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-colors">
                            <XCircle size={14} />
                          </button>
                        </div>
                      ) : (
                        <button className="text-xs text-gray-400 hover:text-pink-500 transition-colors">Details</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-8">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">My Services</h3>
            <button className="flex items-center gap-1.5 bg-pink-500 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-pink-600 transition-colors">
              <Plus size={13} /> Add Service
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wide">
                  <th className="px-6 py-3 text-left">Service</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Duration</th>
                  <th className="px-4 py-3 text-left">Bookings</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Edit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {services.map(s => (
                  <tr key={s.name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-gray-900">{s.name}</td>
                    <td className="px-4 py-3.5 text-gray-500">{s.category}</td>
                    <td className="px-4 py-3.5 font-semibold text-gray-900">{s.price}</td>
                    <td className="px-4 py-3.5 text-gray-500">{s.duration}</td>
                    <td className="px-4 py-3.5 text-gray-700">{s.bookings}</td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        s.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {s.active ? 'Active' : 'Paused'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <button className="p-1.5 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-colors">
                        <Edit3 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-900">Recent Reviews</h3>
            <div className="flex items-center gap-1">
              <Star size={15} className="fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-gray-900 text-sm">4.9</span>
              <span className="text-gray-400 text-xs ml-1">(127 reviews)</span>
            </div>
          </div>
          <div className="space-y-4">
            {reviews.map((r, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img src={r.img} alt={r.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                      <div className="flex gap-0.5 mt-0.5">
                        {[...Array(r.rating)].map((_, j) => <Star key={j} size={11} className="fill-yellow-400 text-yellow-400" />)}
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs shrink-0">{r.date}</span>
                </div>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">"{r.text}"</p>
                {r.replied ? (
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1"><CheckCircle size={12} /> Replied</p>
                ) : (
                  <div className="mt-3">
                    {replyingTo === i ? (
                      <div className="flex gap-2 mt-2">
                        <input value={replyText} onChange={e => setReplyText(e.target.value)}
                          placeholder="Write your reply..." className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-pink-400" />
                        <button onClick={() => { setReplyingTo(null); setReplyText('') }}
                          className="bg-pink-500 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-pink-600 transition-colors">
                          Send
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setReplyingTo(i)}
                        className="text-xs text-pink-500 font-semibold hover:underline">
                        Reply to review
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
