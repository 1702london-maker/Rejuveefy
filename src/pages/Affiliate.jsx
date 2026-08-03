import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BarChart2,
  CheckCircle,
  ChevronDown,
  FileText,
  Gift,
  Mail,
  ShieldCheck,
  Share2,
  Users,
} from 'lucide-react'
import { submitAffiliateApplication } from '../lib/db'
import { useApp } from '../context/AppContext'

const steps = [
  {
    title: 'Apply',
    desc: 'Tell us who you are, where your audience is, and how you want to promote Rejuveefy.',
    icon: FileText,
  },
  {
    title: 'Review',
    desc: 'The Rejuveefy team reviews each application before affiliate access is activated.',
    icon: ShieldCheck,
  },
  {
    title: 'Approve',
    desc: 'Approved affiliates receive an email with the next steps for portal access and tracking.',
    icon: Mail,
  },
  {
    title: 'Track',
    desc: 'Referral links, conversions and payout details will appear after approval.',
    icon: BarChart2,
  },
]

const faqs = [
  {
    q: 'Who can apply?',
    a: 'Creators, professionals, publishers and partners with a relevant beauty, wellness, lifestyle or local services audience can apply.',
  },
  {
    q: 'Do affiliates get instant access?',
    a: 'No. Applications are reviewed first. This keeps the partner network clean and prevents unapproved referral activity.',
  },
  {
    q: 'How are rewards handled?',
    a: 'Reward and commission details will be shared with approved partners when the programme opens.',
  },
  {
    q: 'How will I know I am approved?',
    a: 'Approved applicants will receive an email with portal access instructions.',
  },
]

export default function Affiliate() {
  const { user } = useApp()
  const [openFaq, setOpenFaq] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    platform: '',
    audience: '',
    niche: '',
  })

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await submitAffiliateApplication({
        user_id: user?.id || null,
        full_name: form.name,
        email: form.email,
        platform: form.platform,
        followers: form.audience,
        niche: form.niche,
        status: 'pending',
      })
      setSubmitted(true)
    } catch {
      setError('We could not submit the application. Please check the details and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-pink-600 via-pink-500 to-rose-400 text-white">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-16 lg:py-20 grid lg:grid-cols-[1fr_420px] gap-10 items-center">
          <div>
            <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
              Affiliate Programme
            </span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-5 leading-tight">
              Partner With Rejuveefy
            </h1>
            <p className="text-lg text-pink-100 max-w-2xl mb-8">
              Apply to join the affiliate programme. Approved partners will get access to referral tools after review.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#apply" className="bg-white text-pink-600 font-bold px-8 py-3.5 rounded-full hover:bg-pink-50 transition-colors shadow-lg text-center">
                Apply Now
              </a>
              <Link to="/affiliate-portal" className="border-2 border-white/40 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors text-center">
                Affiliate Portal
              </Link>
            </div>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-2xl p-5">
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: FileText, label: 'Application', value: 'Required' },
                { icon: ShieldCheck, label: 'Review', value: 'Manual' },
                { icon: Mail, label: 'Email', value: 'Approval updates' },
                { icon: Share2, label: 'Tracking', value: 'After approval' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-white rounded-xl p-4 text-gray-900">
                  <Icon size={18} className="text-pink-500 mb-3" />
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="font-semibold text-sm">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-[1280px] mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">Affiliate Flow</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Applications are reviewed before referral tools, reward details and portal access are opened.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(({ title, desc, icon: Icon }, index) => (
            <div key={title} className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <div className="w-11 h-11 bg-pink-50 rounded-xl flex items-center justify-center mb-4">
                <Icon size={20} className="text-pink-500" />
              </div>
              <p className="text-[10px] font-bold text-pink-400 mb-1">STEP {index + 1}</p>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 grid lg:grid-cols-3 gap-6">
          {[
            { icon: Users, title: 'Clean Partner Base', desc: 'No public affiliate dashboard is unlocked until an application is approved.' },
            { icon: Share2, title: 'Controlled Referral Links', desc: 'Referral links are released only after partner approval.' },
            { icon: Gift, title: 'Reward Details', desc: 'Commission and reward terms will be shared with approved partners.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card">
              <div className="w-11 h-11 bg-pink-50 rounded-xl flex items-center justify-center mb-4">
                <Icon size={20} className="text-pink-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="apply" className="py-16 bg-gradient-to-br from-pink-600 to-rose-500 text-white">
        <div className="max-w-2xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3">Apply to Join</h2>
            <p className="text-pink-100">Submitted applications are reviewed before affiliate access opens.</p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-2xl p-10 text-center text-gray-900">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">Application Submitted</h3>
              <p className="text-gray-500 mb-6">We will review your application and email you after a decision has been made.</p>
              <Link to="/affiliate-portal" className="inline-block bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors">
                Go to Affiliate Portal
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 text-gray-900 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name *</label>
                  <input required value={form.name} onChange={e => update('name', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email Address *</label>
                  <input required type="email" value={form.email} onChange={e => update('email', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Primary Platform *</label>
                <select required value={form.platform} onChange={e => update('platform', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 text-gray-700">
                  <option value="">Select platform</option>
                  <option>Instagram</option>
                  <option>TikTok</option>
                  <option>YouTube</option>
                  <option>Blog / Website</option>
                  <option>Newsletter</option>
                  <option>Facebook</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Audience Size</label>
                <select value={form.audience} onChange={e => update('audience', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 text-gray-700">
                  <option value="">Select range</option>
                  <option>Under 1,000</option>
                  <option>1,000 - 10,000</option>
                  <option>10,000 - 50,000</option>
                  <option>50,000 - 100,000</option>
                  <option>100,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">How will you promote Rejuveefy?</label>
                <textarea rows={4} value={form.niche} onChange={e => update('niche', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 resize-none" />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button type="submit" disabled={submitting}
                className="w-full bg-pink-500 text-white font-bold py-3.5 rounded-xl hover:bg-pink-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                {submitting ? 'Submitting...' : 'Submit Application'} <ArrowRight size={16} />
              </button>
              <p className="text-center text-gray-400 text-xs">Submitting does not guarantee approval or immediate affiliate access.</p>
            </form>
          )}
        </div>
      </section>

      <section className="py-16 max-w-[1280px] mx-auto px-4 lg:px-6">
        <h2 className="font-display text-3xl font-bold text-gray-900 mb-10 text-center">Questions</h2>
        <div className="max-w-2xl mx-auto divide-y divide-gray-100">
          {faqs.map((item, index) => (
            <div key={item.q} className="py-4">
              <button onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between text-left gap-4">
                <span className="font-semibold text-gray-900 text-sm">{item.q}</span>
                <ChevronDown size={16} className={`text-gray-400 shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === index && <p className="text-gray-500 text-sm mt-3 leading-relaxed">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
