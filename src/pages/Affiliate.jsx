import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  DollarSign, Users, BarChart2, Gift, CheckCircle, ArrowRight,
  Star, Copy, Share2, TrendingUp, Award, Zap, Globe, ChevronDown
} from 'lucide-react'

const tiers = [
  {
    name: 'Starter',
    commission: '10%',
    minSales: '£0',
    color: 'from-gray-50 to-gray-100',
    badge: 'bg-gray-100 text-gray-600',
    perks: ['Unique referral link', 'Real-time dashboard', 'Monthly payouts', 'Email support'],
  },
  {
    name: 'Growth',
    commission: '15%',
    minSales: '£500/mo',
    color: 'from-pink-50 to-rose-50',
    badge: 'bg-pink-100 text-pink-600',
    popular: true,
    perks: ['Everything in Starter', 'Priority support', 'Custom landing page', 'Bi-weekly payouts', 'Bonus on milestones'],
  },
  {
    name: 'Elite',
    commission: '22%',
    minSales: '£2,000/mo',
    color: 'from-purple-50 to-pink-50',
    badge: 'bg-purple-100 text-purple-600',
    perks: ['Everything in Growth', 'Dedicated manager', 'Co-branded content', 'Weekly payouts', 'Exclusive offers for your audience'],
  },
]

const steps = [
  { num: '01', title: 'Apply & Get Approved', desc: 'Fill out our short application. Most approvals happen within 24 hours.', icon: CheckCircle },
  { num: '02', title: 'Share Your Link', desc: 'Get your unique referral link and share it on social, blog, or email.', icon: Share2 },
  { num: '03', title: 'Track Conversions', desc: 'Watch bookings and purchases roll in through your real-time dashboard.', icon: BarChart2 },
  { num: '04', title: 'Earn Commissions', desc: 'Receive payouts directly to your bank or PayPal every month.', icon: DollarSign },
]

const faqs = [
  { q: 'Who can apply to the Rejuveefy Affiliate Programme?', a: 'Anyone with an audience interested in beauty, hair care, wellness, or lifestyle — bloggers, influencers, salon owners, and content creators are all welcome.' },
  { q: 'How are commissions calculated?', a: 'You earn a percentage of every completed booking or purchase made through your referral link. Commissions are tracked for 30 days after a click.' },
  { q: 'When do I get paid?', a: 'Starter affiliates are paid monthly (on the 15th). Growth and Elite affiliates can request bi-weekly or weekly payouts once they hit the threshold.' },
  { q: 'Is there a minimum payout amount?', a: 'Yes, the minimum payout is £25. Earnings below this roll over to the next period.' },
  { q: 'Can I promote Rejuveefy on multiple platforms?', a: 'Absolutely. You can share your link on Instagram, TikTok, YouTube, your blog, newsletter — anywhere your audience hangs out.' },
]

export default function Affiliate() {
  const [openFaq, setOpenFaq] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', platform: '', audience: '', niche: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-pink-600 via-pink-500 to-rose-400 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-4 lg:px-6 py-20 lg:py-28 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
            Affiliate Programme
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold mb-5 leading-tight">
            Earn While You Inspire<br />
            <span className="text-pink-200">Beauty Lovers</span>
          </h1>
          <p className="text-lg text-pink-100 max-w-2xl mx-auto mb-8">
            Partner with Rejuveefy and earn up to <strong className="text-white">22% commission</strong> on every booking and purchase your audience makes. Turn your passion for beauty into recurring income.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#apply" className="bg-white text-pink-600 font-bold px-8 py-3.5 rounded-full hover:bg-pink-50 transition-colors shadow-lg">
              Apply Now — It's Free
            </a>
            <Link to="/affiliate-portal" className="border-2 border-white/40 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors">
              Existing Affiliate? Sign In →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-gray-900 text-white py-8">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: '£2M+', label: 'Paid to affiliates' },
            { val: '3,200+', label: 'Active affiliates' },
            { val: '30-day', label: 'Cookie window' },
            { val: '22%', label: 'Max commission' },
          ].map(s => (
            <div key={s.label}>
              <p className="font-display text-3xl font-bold text-pink-400">{s.val}</p>
              <p className="text-gray-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 max-w-[1280px] mx-auto px-4 lg:px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-3">How It Works</h2>
          <p className="text-gray-500 max-w-lg mx-auto">Start earning in four simple steps.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="text-center">
              <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <s.icon size={24} className="text-pink-500" />
              </div>
              <p className="font-display text-5xl font-bold text-pink-100 mb-2">{s.num}</p>
              <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Commission tiers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Commission Tiers</h2>
            <p className="text-gray-500 max-w-lg mx-auto">The more you drive, the more you earn. Upgrade automatically as your referrals grow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((t) => (
              <div key={t.name} className={`relative rounded-2xl bg-gradient-to-br ${t.color} border ${t.popular ? 'border-pink-300 shadow-pink' : 'border-gray-200'} p-7`}>
                {t.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</span>
                )}
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${t.badge}`}>{t.name}</span>
                <p className="font-display text-5xl font-bold text-gray-900 mb-1">{t.commission}</p>
                <p className="text-gray-500 text-sm mb-2">commission per sale</p>
                <p className="text-xs text-gray-400 mb-6">From {t.minSales} monthly referrals</p>
                <ul className="space-y-2.5">
                  {t.perks.map(p => (
                    <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={15} className="text-pink-500 shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Rejuveefy */}
      <section className="py-20 max-w-[1280px] mx-auto px-4 lg:px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Why Partner With Us?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: TrendingUp, title: 'High Conversion', desc: 'Our landing pages convert at 3–5x industry average thanks to trust signals and social proof.' },
            { icon: Globe, title: 'Trusted UK Brand', desc: 'Rejuveefy is loved by thousands of UK women seeking quality hair & beauty services.' },
            { icon: Zap, title: 'Real-Time Tracking', desc: 'See every click, conversion, and commission in your live affiliate dashboard.' },
            { icon: Award, title: 'Exclusive Bonuses', desc: 'Hit monthly milestones and unlock cash bonuses, product hampers, and co-marketing.' },
            { icon: Gift, title: 'Promotional Assets', desc: 'Access a library of branded banners, copy templates, and social media kits.' },
            { icon: Users, title: 'Community Access', desc: 'Join our private Slack community of top affiliates to share tips and strategies.' },
          ].map(item => (
            <div key={item.title} className="flex gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:border-pink-200 hover:shadow-card transition-all">
              <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center shrink-0">
                <item.icon size={18} className="text-pink-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-pink-50">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-8 text-center">What Our Affiliates Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Tamara O.', handle: '@tamarabeautyuk', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop', text: 'I made £840 in my first month just by sharing my link in my newsletter. The dashboard is so easy to use.', stars: 5 },
              { name: 'Jade M.', handle: '@jadehairdiaries', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop', text: 'Rejuveefy converts incredibly well with my audience. The 30-day cookie window means I rarely miss a sale.', stars: 5 },
              { name: 'Precious A.', handle: 'Beauty Blogger', img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=60&h=60&fit=crop', text: 'Reached Elite tier in 3 months. The dedicated account manager is a game changer — they actually help you grow.', stars: 5 },
            ].map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-card">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.stars)].map((_, i) => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.handle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-[1280px] mx-auto px-4 lg:px-6">
        <h2 className="font-display text-3xl font-bold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto divide-y divide-gray-100">
          {faqs.map((f, i) => (
            <div key={i} className="py-4">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between text-left gap-4"
              >
                <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
                <ChevronDown size={16} className={`text-gray-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && <p className="text-gray-500 text-sm mt-3 leading-relaxed">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Apply form */}
      <section id="apply" className="py-20 bg-gradient-to-br from-pink-600 to-rose-500 text-white">
        <div className="max-w-2xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3">Apply to Join</h2>
            <p className="text-pink-100">Takes less than 2 minutes. Free to join. No minimum following required.</p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-2xl p-10 text-center text-gray-900">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">Application Submitted!</h3>
              <p className="text-gray-500 mb-6">We'll review your application and email you within 24 hours. Keep an eye on your inbox.</p>
              <Link to="/affiliate-portal" className="inline-block bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors">
                Go to Affiliate Portal →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 text-gray-900 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name *</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email Address *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Primary Platform *</label>
                <select required value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 text-gray-700">
                  <option value="">Select platform</option>
                  <option>Instagram</option><option>TikTok</option><option>YouTube</option>
                  <option>Blog / Website</option><option>Newsletter</option><option>Facebook</option><option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Audience Size</label>
                <select value={form.audience} onChange={e => setForm({ ...form, audience: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 text-gray-700">
                  <option value="">Select range</option>
                  <option>Under 1,000</option><option>1,000 – 10,000</option>
                  <option>10,000 – 50,000</option><option>50,000 – 100,000</option><option>100,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Your Niche / How You'll Promote Rejuveefy</label>
                <textarea rows={3} value={form.niche} onChange={e => setForm({ ...form, niche: e.target.value })}
                  placeholder="e.g. I create hair tutorials and review beauty products for Black women in the UK..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 resize-none" />
              </div>
              <button type="submit" className="w-full bg-pink-500 text-white font-bold py-3.5 rounded-xl hover:bg-pink-600 transition-colors flex items-center justify-center gap-2">
                Submit Application <ArrowRight size={16} />
              </button>
              <p className="text-center text-gray-400 text-xs">By applying you agree to our Affiliate Terms & Conditions.</p>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
