import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  DollarSign, Users, TrendingUp, Copy, ExternalLink, Download,
  Calendar, ArrowUpRight, ArrowDownRight, ChevronDown, Bell,
  BarChart2, Gift, CheckCircle, Clock, AlertCircle
} from 'lucide-react'

const stats = [
  { label: 'Total Earned', value: '£1,284.50', change: '+12%', up: true, icon: DollarSign, color: 'bg-green-50 text-green-600' },
  { label: 'This Month', value: '£342.00', change: '+8%', up: true, icon: TrendingUp, color: 'bg-pink-50 text-pink-600' },
  { label: 'Total Clicks', value: '4,821', change: '+23%', up: true, icon: BarChart2, color: 'bg-blue-50 text-blue-600' },
  { label: 'Conversions', value: '187', change: '-3%', up: false, icon: Users, color: 'bg-purple-50 text-purple-600' },
]

const transactions = [
  { id: 'TXN-0091', date: '22 Jun 2026', type: 'Booking', customer: 'S. Williams', amount: '£18.50', status: 'paid', commission: '12%' },
  { id: 'TXN-0090', date: '20 Jun 2026', type: 'Product', customer: 'A. Johnson', amount: '£9.20', status: 'paid', commission: '10%' },
  { id: 'TXN-0089', date: '18 Jun 2026', type: 'Booking', customer: 'P. Okafor', amount: '£24.00', status: 'pending', commission: '12%' },
  { id: 'TXN-0088', date: '15 Jun 2026', type: 'Product', customer: 'D. Clarke', amount: '£6.50', status: 'paid', commission: '10%' },
  { id: 'TXN-0087', date: '14 Jun 2026', type: 'Booking', customer: 'T. Mensah', amount: '£31.00', status: 'paid', commission: '12%' },
  { id: 'TXN-0086', date: '10 Jun 2026', type: 'Product', customer: 'F. Adesanya', amount: '£12.30', status: 'processing', commission: '10%' },
]

const banners = [
  { name: 'Square 300×300', size: '300×300', format: 'PNG', preview: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop' },
  { name: 'Leaderboard 728×90', size: '728×90', format: 'PNG', preview: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=728&h=90&fit=crop' },
  { name: 'Story 1080×1920', size: '1080×1920', format: 'PNG', preview: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=300&h=400&fit=crop' },
  { name: 'Banner 970×250', size: '970×250', format: 'PNG', preview: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=200&fit=crop' },
]

const monthlyData = [62, 48, 75, 90, 55, 110, 95, 130, 88, 142, 120, 160]
const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

export default function AffiliatePortal() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [copied, setCopied] = useState(false)
  const referralLink = 'https://rejuveefy.com/ref/jade2026'

  const copyLink = () => {
    navigator.clipboard?.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const maxVal = Math.max(...monthlyData)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Portal header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-pink-500 text-lg">Rejuveefy</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600 text-sm font-semibold">Affiliate Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg text-gray-400 hover:text-pink-500 hover:bg-pink-50">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop" alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 leading-none">Jade M.</p>
                <p className="text-xs text-pink-500">Growth Affiliate</p>
              </div>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white border border-gray-100 rounded-xl p-1 w-fit">
          {['dashboard', 'transactions', 'links', 'assets', 'payouts'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
                activeTab === tab ? 'bg-pink-500 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tier badge */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white">
          <div>
            <p className="text-pink-200 text-xs font-semibold uppercase tracking-wide mb-1">Current Tier</p>
            <p className="font-display text-2xl font-bold">Growth Affiliate</p>
            <p className="text-pink-100 text-sm mt-1">Earning 15% commission · £342 this month</p>
          </div>
          <div className="text-right">
            <p className="text-pink-200 text-xs mb-1">Next tier: Elite at £2,000/mo</p>
            <div className="w-48 bg-white/20 rounded-full h-2 mb-1">
              <div className="bg-white h-2 rounded-full" style={{ width: '17%' }} />
            </div>
            <p className="text-pink-100 text-xs">£342 / £2,000</p>
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
                {s.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {s.change} vs last month
              </p>
            </div>
          ))}
        </div>

        {/* Referral link */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Your Referral Link</h3>
          <div className="flex gap-3 flex-col sm:flex-row">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 font-mono truncate">
              {referralLink}
            </div>
            <button onClick={copyLink}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-colors ${
                copied ? 'bg-green-500 text-white' : 'bg-pink-500 text-white hover:bg-pink-600'
              }`}>
              {copied ? <CheckCircle size={15} /> : <Copy size={15} />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <a href={referralLink} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-500 font-semibold text-sm transition-colors">
              <ExternalLink size={15} /> Preview
            </a>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-5">
            {[
              { label: 'Clicks this month', val: '892' },
              { label: 'Conversion rate', val: '4.2%' },
              { label: 'Avg. order value', val: '£68' },
            ].map(m => (
              <div key={m.label} className="text-center p-3 bg-gray-50 rounded-xl">
                <p className="font-display text-xl font-bold text-gray-900">{m.val}</p>
                <p className="text-gray-500 text-xs mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chart + recent transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">

          {/* Chart */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Earnings (12 months)</h3>
              <span className="text-xs text-gray-400">£1,175 total</span>
            </div>
            <div className="flex items-end gap-1.5 h-36">
              {monthlyData.map((v, i) => (
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

          {/* Quick stats */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Pending Payouts</h3>
            <div className="text-center py-6 border border-dashed border-gray-200 rounded-xl mb-4">
              <p className="font-display text-4xl font-bold text-gray-900">£89.70</p>
              <p className="text-gray-400 text-sm mt-1">Next payout: 1 Jul 2026</p>
            </div>
            <button className="w-full bg-pink-500 text-white font-semibold py-3 rounded-xl hover:bg-pink-600 transition-colors text-sm flex items-center justify-center gap-2">
              <Download size={15} /> Request Early Payout
            </button>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Available balance</span>
                <span className="font-semibold text-gray-900">£89.70</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Processing</span>
                <span className="font-semibold text-yellow-600">£42.50</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Lifetime paid</span>
                <span className="font-semibold text-green-600">£1,152.30</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-8">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
            <button className="text-pink-500 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wide">
                  <th className="px-6 py-3 text-left">Transaction</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Commission</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {transactions.map(t => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5">
                      <p className="font-medium text-gray-900">{t.id}</p>
                      <p className="text-gray-400 text-xs">{t.customer}</p>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500">{t.date}</td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        t.type === 'Booking' ? 'bg-pink-50 text-pink-600' : 'bg-blue-50 text-blue-600'
                      }`}>{t.type}</span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500">{t.commission}</td>
                    <td className="px-4 py-3.5 font-semibold text-gray-900">{t.amount}</td>
                    <td className="px-4 py-3.5">
                      <span className={`flex items-center gap-1 text-xs font-semibold w-fit ${
                        t.status === 'paid' ? 'text-green-600' :
                        t.status === 'pending' ? 'text-yellow-600' : 'text-blue-600'
                      }`}>
                        {t.status === 'paid' ? <CheckCircle size={12} /> :
                         t.status === 'pending' ? <Clock size={12} /> : <AlertCircle size={12} />}
                        {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Creative assets */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-900">Creative Assets</h3>
            <span className="text-xs text-gray-400">4 assets available</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {banners.map(b => (
              <div key={b.name} className="border border-gray-100 rounded-xl overflow-hidden group">
                <div className="h-28 bg-gray-100 overflow-hidden">
                  <img src={b.preview} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-gray-900">{b.name}</p>
                  <p className="text-xs text-gray-400">{b.format}</p>
                  <button className="mt-2 w-full text-xs text-pink-500 font-semibold border border-pink-200 py-1.5 rounded-lg hover:bg-pink-50 transition-colors flex items-center justify-center gap-1">
                    <Download size={11} /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
