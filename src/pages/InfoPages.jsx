import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, MessageCircle, Mail, Phone, Send } from 'lucide-react'
import { faqData, teamMembers } from '../data/mockData'

// ── ABOUT ──────────────────────────────────────────────────────────────────
export function About() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="bg-gradient-to-br from-primary-fixed/40 to-surface py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-4xl font-bold text-on-surface mb-4">Transforming the <span className="text-primary italic">Beauty Industry</span></h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">We're on a mission to modernise hair and beauty for the modern woman — through technology, trust, and community.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {[
          { label: 'Our Story', icon: '📖', content: 'Rejuveefy was born from a simple frustration: finding a skilled, trusted hair professional shouldn\'t be this hard. Founder Tsemaye Okoroh spent years searching for the right loctician, the right braider, the right wig installer — and kept hitting dead ends of outdated word-of-mouth and unreliable bookings. In 2024, she decided to build the solution herself.' },
          { label: 'Our Mission', icon: '🎯', content: 'To become the most trusted hair and beauty-tech marketplace in the UK — where every Black and multicultural woman can find a verified professional, discover premium products, and get AI-driven guidance that actually understands her hair and skin.' },
          { label: 'What We Do', icon: '✨', content: 'Rejuveefy connects clients with verified hair and beauty professionals for bookings. Our shop stocks premium wigs, bundles, treatments, and accessories. Our AI Beauty Analyzer gives personalised recommendations for hair type, scalp health, and skin tone — all in one seamless platform.' },
          { label: 'Why We\'re Different', icon: '💎', content: 'We\'re hair-first. Every decision we make prioritises the experience of people with textured, Afro, and natural hair. Our providers are thoroughly vetted. Our AI is trained to understand diverse hair and skin. And our community is at the centre of everything we build.' },
        ].map(section => (
          <div key={section.label} className="grid sm:grid-cols-5 gap-6 items-start">
            <div className="sm:col-span-1">
              <div className="w-12 h-12 bg-primary-container/30 rounded-2xl flex items-center justify-center text-2xl">{section.icon}</div>
            </div>
            <div className="sm:col-span-4">
              <h2 className="font-display text-xl font-bold text-on-surface mb-3">{section.label}</h2>
              <p className="text-on-surface-variant leading-relaxed">{section.content}</p>
            </div>
          </div>
        ))}

        {/* Team */}
        <div>
          <h2 className="font-display text-2xl font-bold text-on-surface mb-8 text-center">The Team</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {teamMembers.map(m => (
              <div key={m.name} className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient text-center">
                <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center text-2xl font-display font-bold text-primary mx-auto mb-3">{m.name.charAt(0)}</div>
                <h3 className="font-semibold text-on-surface">{m.name}</h3>
                <p className="text-xs text-primary font-medium mb-2">{m.role}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link to="/book" className="bg-primary text-white px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-ambient">Book Your First Service</Link>
        </div>
      </div>
    </div>
  )
}

// ── CONTACT ────────────────────────────────────────────────────────────────
export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [sent, setSent] = useState(false)
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="pt-16 min-h-screen">
      <div className="bg-gradient-to-r from-primary-fixed/40 to-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl font-bold text-on-surface mb-2">Get in Touch</h1>
          <p className="text-on-surface-variant">We'd love to hear from you</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display font-bold text-xl text-on-surface mb-6">Contact Options</h2>
          <div className="space-y-4 mb-8">
            {[
              { icon: '💬', label: 'WhatsApp', desc: 'Usually replies in minutes', href: 'https://wa.me/442012345678', color: 'bg-green-100 text-green-700' },
              { icon: '💬', label: 'iMessage / SMS', desc: '+44 20 1234 5678', href: 'sms:+442012345678', color: 'bg-blue-100 text-blue-700' },
              { icon: '✉️', label: 'Email', desc: 'hello@rejuveefy.com', href: 'mailto:hello@rejuveefy.com', color: 'bg-primary-container/60 text-primary' },
              { icon: '📞', label: 'Phone', desc: '+44 20 1234 5678', href: 'tel:+442012345678', color: 'bg-surface-container-high text-on-surface' },
            ].map(item => (
              <a key={item.label} href={item.href} className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-2xl shadow-ambient hover:shadow-modal transition-all group">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xl ${item.color}`}>{item.icon}</div>
                <div>
                  <p className="font-semibold text-sm text-on-surface group-hover:text-primary transition-colors">{item.label}</p>
                  <p className="text-xs text-on-surface-variant">{item.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display font-bold text-xl text-on-surface mb-6">Send a Message</h2>
          {sent ? (
            <div className="bg-primary-container/20 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-3">✉️</div>
              <h3 className="font-semibold text-on-surface mb-1">Message Sent!</h3>
              <p className="text-sm text-on-surface-variant">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="space-y-4">
              {[['name', 'Full Name', 'text'], ['email', 'Email Address', 'email']].map(([k, l, t]) => (
                <div key={k}><label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1">{l}</label>
                  <input type={t} value={form[k]} onChange={e => update(k, e.target.value)} required className="w-full border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm bg-surface-container-lowest focus:outline-none focus:border-primary" /></div>
              ))}
              <div><label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1">Enquiry Type</label>
                <select value={form.type} onChange={e => update('type', e.target.value)} className="w-full border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm bg-surface-container-lowest focus:outline-none focus:border-primary">
                  <option value="">Select type...</option>
                  {['Booking Help', 'Order Issue', 'Provider Support', 'Become a Provider', 'Technical Issue', 'General Enquiry'].map(t => <option key={t}>{t}</option>)}
                </select></div>
              <div><label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1">Message</label>
                <textarea value={form.message} onChange={e => update('message', e.target.value)} rows={4} className="w-full border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm bg-surface-container-lowest focus:outline-none focus:border-primary resize-none" /></div>
              <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-ambient">
                <Send size={16} /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

// ── FAQ ────────────────────────────────────────────────────────────────────
export function FAQ() {
  const [open, setOpen] = useState(null)
  const [search, setSearch] = useState('')
  const toggle = (key) => setOpen(open === key ? null : key)

  const filtered = faqData.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => !search || q.q.toLowerCase().includes(search.toLowerCase()) || q.a.toLowerCase().includes(search.toLowerCase()))
  })).filter(cat => cat.questions.length > 0)

  return (
    <div className="pt-16 min-h-screen">
      <div className="bg-gradient-to-r from-primary-fixed/40 to-surface py-12 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl font-bold text-on-surface mb-4">Frequently Asked Questions</h1>
          <div className="max-w-lg mx-auto bg-surface-container-lowest rounded-xl flex items-center gap-2 px-4 py-3 border border-outline-variant/30 shadow-ambient">
            <span className="text-on-surface-variant">🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions..." className="flex-1 bg-transparent text-sm outline-none" />
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        {filtered.map(cat => (
          <div key={cat.category}>
            <h2 className="font-display font-bold text-lg text-on-surface mb-3">{cat.category}</h2>
            <div className="space-y-2">
              {cat.questions.map((q, i) => {
                const key = `${cat.category}-${i}`
                return (
                  <div key={key} className="bg-surface-container-lowest rounded-2xl shadow-ambient overflow-hidden">
                    <button onClick={() => toggle(key)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                      <span className="font-medium text-sm text-on-surface">{q.q}</span>
                      <ChevronDown size={16} className={`text-on-surface-variant transition-transform shrink-0 ml-3 ${open === key ? 'rotate-180' : ''}`} />
                    </button>
                    {open === key && <div className="px-5 pb-4 text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/20 pt-3">{q.a}</div>}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        <div className="text-center bg-surface-container-low rounded-2xl p-8">
          <p className="font-semibold text-on-surface mb-2">Still need help?</p>
          <p className="text-sm text-on-surface-variant mb-4">Our team is happy to assist you</p>
          <Link to="/contact" className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}

// ── BOOKING HELP ───────────────────────────────────────────────────────────
export function BookingHelp() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="bg-gradient-to-r from-primary-fixed/40 to-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl font-bold text-on-surface mb-2">Booking Help</h1>
          <p className="text-on-surface-variant">Everything you need to know about booking on Rejuveefy</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        {[
          { title: 'How booking works', icon: '📅', steps: ['Search for your service and location', 'Choose a verified provider and view their portfolio', 'Select an available date and time', 'Confirm your booking and pay securely', 'Provider accepts and you receive confirmation'] },
          { title: 'Managing your booking', icon: '⚙️', steps: ['Log in to your dashboard', 'Go to "My Bookings"', 'Select the booking you want to manage', 'Choose Reschedule or Cancel (up to 24 hours before)'] },
        ].map(section => (
          <div key={section.title} className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient">
            <div className="flex items-center gap-3 mb-5"><span className="text-2xl">{section.icon}</span><h2 className="font-display font-bold text-lg text-on-surface">{section.title}</h2></div>
            <ol className="space-y-3">{section.steps.map((s, i) => <li key={i} className="flex gap-3 text-sm text-on-surface-variant"><span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i+1}</span>{s}</li>)}</ol>
          </div>
        ))}
        <div className="text-center"><Link to="/contact" className="bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90">Contact Support</Link></div>
      </div>
    </div>
  )
}

// ── RETURNS ─────────────────────────────────────────────────────────────────
export function Returns() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="bg-gradient-to-r from-primary-fixed/40 to-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl font-bold text-on-surface mb-2">Returns & Refunds</h1>
          <p className="text-on-surface-variant">Our fair and transparent return policy</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-6">
        {[
          { title: 'Product Returns', icon: '📦', content: 'Products in original, unused condition can be returned within 28 days of delivery. Hair products that have been opened cannot be returned for hygiene reasons. Contact our support team to initiate a return.' },
          { title: 'Refund Process', icon: '💳', content: 'Once we receive and inspect your return, we\'ll process your refund within 5-7 business days to your original payment method.' },
          { title: 'Non-Returnable Items', icon: '⚠️', content: 'For hygiene reasons, we cannot accept returns on: opened hair bundles and wigs, hair treatments, lashes, and accessories that have been worn or used.' },
          { title: 'Service Booking Cancellations', icon: '📅', content: 'Bookings cancelled more than 24 hours before the appointment receive a full refund. Cancellations within 24 hours may incur a 50% cancellation fee. No-shows are non-refundable.' },
        ].map(s => (
          <div key={s.title} className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient">
            <div className="flex items-center gap-3 mb-3"><span className="text-xl">{s.icon}</span><h2 className="font-semibold text-on-surface">{s.title}</h2></div>
            <p className="text-sm text-on-surface-variant leading-relaxed">{s.content}</p>
          </div>
        ))}
        <div className="text-center"><Link to="/contact" className="bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90">Get Help with a Return</Link></div>
      </div>
    </div>
  )
}

// ── TRACK ORDER ─────────────────────────────────────────────────────────────
export function TrackOrder() {
  const [ref, setRef] = useState('')
  const [email, setEmail] = useState('')
  const [result, setResult] = useState(null)

  const handleTrack = (e) => {
    e.preventDefault()
    setResult({
      id: ref || '#ORD50441',
      product: 'Luxe Silk Lace Front Wig — 18" Body Wave — Natural Black',
      steps: [
        { label: 'Order Placed', date: '20 Jun 2025', done: true },
        { label: 'Payment Confirmed', date: '20 Jun 2025', done: true },
        { label: 'Processing', date: '21 Jun 2025', done: true },
        { label: 'Dispatched', date: '22 Jun 2025', done: true },
        { label: 'Out for Delivery', date: '25 Jun 2025', done: false },
        { label: 'Delivered', date: 'Est. 26 Jun 2025', done: false },
      ],
    })
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="bg-gradient-to-r from-primary-fixed/40 to-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl font-bold text-on-surface mb-2">Track Your Order</h1>
          <p className="text-on-surface-variant">Enter your order details to see live tracking</p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <form onSubmit={handleTrack} className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient mb-6 space-y-4">
          {[['ref', 'Order Reference', setRef, 'e.g. #ORD50441'], ['email', 'Email Address', setEmail, 'hello@example.com']].map(([k, l, s, p]) => (
            <div key={k}><label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1">{l}</label>
              <input value={k === 'ref' ? ref : email} onChange={e => s(e.target.value)} placeholder={p} className="w-full border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm bg-surface-container-lowest focus:outline-none focus:border-primary" /></div>
          ))}
          <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity">Track Order</button>
        </form>

        {result && (
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient">
            <h2 className="font-semibold text-on-surface mb-1">{result.id}</h2>
            <p className="text-xs text-on-surface-variant mb-6">{result.product}</p>
            <div className="space-y-3">
              {result.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 ${step.done ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'}`}>{step.done ? '✓' : ''}</div>
                  <div className="flex-1 flex justify-between">
                    <span className={`text-sm font-medium ${step.done ? 'text-on-surface' : 'text-on-surface-variant'}`}>{step.label}</span>
                    <span className="text-xs text-on-surface-variant">{step.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── CAREERS ────────────────────────────────────────────────────────────────
export function Careers() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="bg-gradient-to-r from-primary-fixed/40 to-surface py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-4xl font-bold text-on-surface mb-3">Work with Us</h1>
          <p className="text-on-surface-variant max-w-xl mx-auto">Help us build the most trusted beauty-tech platform in the UK</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-display text-xl font-bold text-on-surface mb-6">Open Roles</h2>
        <div className="space-y-4 mb-12">
          {[
            { title: 'Senior Frontend Engineer', dept: 'Engineering', type: 'Full-time', location: 'Remote / London' },
            { title: 'Product Designer (UI/UX)', dept: 'Design', type: 'Full-time', location: 'London' },
            { title: 'Community Manager', dept: 'Marketing', type: 'Full-time', location: 'London' },
            { title: 'Provider Success Manager', dept: 'Operations', type: 'Full-time', location: 'Remote' },
          ].map(role => (
            <div key={role.title} className="bg-surface-container-lowest rounded-2xl p-5 shadow-ambient flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h3 className="font-semibold text-on-surface">{role.title}</h3>
                <p className="text-xs text-on-surface-variant mt-1">{role.dept} · {role.type} · {role.location}</p>
              </div>
              <button className="border border-primary text-primary px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-all shrink-0">Apply</button>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-primary-fixed/40 to-primary-container/20 rounded-3xl p-8 text-center border border-primary-container/30">
          <h2 className="font-display text-xl font-bold text-on-surface mb-2">Not a fit right now?</h2>
          <p className="text-on-surface-variant text-sm mb-4">Consider joining as a provider and grow your beauty business on Rejuveefy.</p>
          <Link to="/become-provider" className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90">Become a Provider</Link>
        </div>
      </div>
    </div>
  )
}

// ── BECOME PROVIDER ─────────────────────────────────────────────────────────
export function BecomeProvider() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="bg-gradient-to-br from-primary-fixed/50 to-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-4xl font-bold text-on-surface mb-4">Grow Your Beauty Business</h1>
          <p className="text-on-surface-variant text-lg max-w-xl mx-auto mb-8">Join hundreds of trusted hair and beauty professionals on Rejuveefy</p>
          <Link to="/provider-application" className="bg-primary text-white px-8 py-4 rounded-full font-bold text-sm hover:opacity-90 shadow-ambient">Apply Now — It's Free</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {[
            { icon: '📅', title: 'Manage Bookings Easily', desc: 'Accept or decline requests, set your schedule, and never miss an appointment.' },
            { icon: '💳', title: 'Get Paid Instantly', desc: 'Secure payments deposited directly to your account. No chasing clients.' },
            { icon: '⭐', title: 'Build Your Reputation', desc: 'Collect reviews, showcase your portfolio, and grow your loyal client base.' },
            { icon: '📊', title: 'Track Your Earnings', desc: 'Real-time earnings dashboard, payout history, and business analytics.' },
            { icon: '📱', title: 'Mobile App', desc: 'Manage your business on the go with the Rejuveefy provider app.' },
            { icon: '🛡️', title: 'Fully Protected', desc: 'Provider protection policy covers disputes, no-shows, and payment issues.' },
          ].map(b => (
            <div key={b.title} className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient">
              <span className="text-3xl mb-3 block">{b.icon}</span>
              <h3 className="font-semibold text-on-surface mb-2">{b.title}</h3>
              <p className="text-sm text-on-surface-variant">{b.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/provider-application" className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:opacity-90 shadow-ambient">Start Your Application</Link>
        </div>
      </div>
    </div>
  )
}

// ── PROVIDER APPLICATION ────────────────────────────────────────────────────
export function ProviderApplication() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', bio: '', services: [], pricing: '', availability: [] })
  const [submitted, setSubmitted] = useState(false)
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const totalSteps = 5

  if (submitted) return (
    <div className="pt-16 min-h-screen flex items-center justify-center text-center">
      <div className="max-w-md px-4">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="font-display text-2xl font-bold text-on-surface mb-2">Application Received!</h1>
        <p className="text-on-surface-variant mb-6">We'll review your application and get back to you within 5 business days.</p>
        <Link to="/" className="bg-primary text-white px-6 py-3 rounded-full font-semibold">Back to Home</Link>
      </div>
    </div>
  )

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-display text-2xl font-bold text-on-surface mb-2">Provider Application</h1>
        <p className="text-on-surface-variant text-sm mb-6">Step {step} of {totalSteps}</p>
        <div className="flex gap-1 mb-8">{[...Array(totalSteps)].map((_, i) => <div key={i} className={`flex-1 h-1.5 rounded-full ${i < step ? 'bg-primary' : 'bg-surface-container-high'}`} />)}</div>

        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient">
          {step === 1 && <div className="space-y-4">
            <h2 className="font-semibold text-on-surface mb-4">Basic Information</h2>
            {[['Full Name', 'name'], ['Professional Bio', 'bio']].map(([l, k]) => (
              <div key={k}><label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1">{l}</label>
                {k === 'bio' ? <textarea rows={3} onChange={e => update(k, e.target.value)} className="w-full border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm bg-surface-container-lowest focus:outline-none focus:border-primary resize-none" /> : <input onChange={e => update(k, e.target.value)} className="w-full border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm bg-surface-container-lowest focus:outline-none focus:border-primary" />}
              </div>
            ))}
          </div>}
          {step === 2 && <div className="space-y-3"><h2 className="font-semibold text-on-surface mb-4">Services & Specialisation</h2><p className="text-sm text-on-surface-variant">Select all services you offer:</p><div className="flex flex-wrap gap-2">{['Braids', 'Twists', 'Locks', 'Wig Installation', 'Hair Styling', 'Makeup', 'Barbers', 'Hair Treatments'].map(s => <button key={s} type="button" onClick={() => update('services', form.services.includes(s) ? form.services.filter(x => x !== s) : [...form.services, s])} className={`px-3 py-1.5 rounded-full text-sm border transition-all ${form.services.includes(s) ? 'bg-primary text-white border-primary' : 'border-outline-variant/40 text-on-surface-variant'}`}>{s}</button>)}</div></div>}
          {step === 3 && <div className="space-y-4"><h2 className="font-semibold text-on-surface mb-4">Pricing</h2><div><label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1">Starting price (£)</label><input type="number" placeholder="e.g. 60" onChange={e => update('pricing', e.target.value)} className="w-full border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm bg-surface-container-lowest focus:outline-none focus:border-primary" /></div></div>}
          {step === 4 && <div><h2 className="font-semibold text-on-surface mb-4">Portfolio & Availability</h2><div className="border-2 border-dashed border-primary-container rounded-xl p-8 text-center text-sm text-on-surface-variant mb-4">📷 Upload portfolio images (drag & drop)</div><p className="text-xs text-on-surface-variant">Select your available days:</p><div className="flex flex-wrap gap-2 mt-2">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <button key={d} type="button" onClick={() => update('availability', form.availability.includes(d) ? form.availability.filter(x => x !== d) : [...form.availability, d])} className={`px-3 py-1.5 rounded-full text-sm border transition-all ${form.availability.includes(d) ? 'bg-primary text-white border-primary' : 'border-outline-variant/40 text-on-surface-variant'}`}>{d}</button>)}</div></div>}
          {step === 5 && <div><h2 className="font-semibold text-on-surface mb-4">Verification</h2><div className="space-y-3">{['I confirm I am legally allowed to work in the UK', 'I agree to the Provider Terms & Conditions', 'I agree to undergo an ID verification check'].map(item => <label key={item} className="flex items-start gap-2 cursor-pointer"><input type="checkbox" className="mt-0.5 accent-primary" /><span className="text-sm text-on-surface-variant">{item}</span></label>)}</div></div>}

          <div className="flex gap-3 mt-6">
            {step > 1 && <button onClick={() => setStep(s => s - 1)} className="flex-1 border border-outline-variant/40 text-on-surface-variant py-3 rounded-full font-semibold text-sm">Back</button>}
            {step < totalSteps ? <button onClick={() => setStep(s => s + 1)} className="flex-1 bg-primary text-white py-3 rounded-full font-semibold text-sm hover:opacity-90">Continue</button>
              : <button onClick={() => setSubmitted(true)} className="flex-1 bg-primary text-white py-3 rounded-full font-semibold text-sm hover:opacity-90">Submit Application</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── PROVIDER DASHBOARD ──────────────────────────────────────────────────────
export function ProviderDashboard() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-display text-2xl font-bold text-on-surface mb-8">Provider Dashboard</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[{ label: 'Earnings (Jun)', val: '£1,240' }, { label: 'Total Bookings', val: '28' }, { label: 'Avg Rating', val: '4.9 ⭐' }, { label: 'Pending', val: '3' }].map(s => (
            <div key={s.label} className="bg-surface-container-lowest rounded-2xl p-5 shadow-ambient"><p className="text-xs text-on-surface-variant mb-1">{s.label}</p><p className="font-display text-2xl font-bold text-primary">{s.val}</p></div>
          ))}
        </div>
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient mb-6">
          <h2 className="font-semibold text-on-surface mb-4">Incoming Bookings</h2>
          <div className="space-y-3">
            {[{ client: 'Ngozi A.', service: 'Knotless Braids', date: '28 Jun', status: 'pending' }, { client: 'Blessing O.', service: 'Box Braids', date: '30 Jun', status: 'pending' }].map((b, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-surface-container-low rounded-xl">
                <div className="flex-1"><p className="font-semibold text-sm text-on-surface">{b.client} — {b.service}</p><p className="text-xs text-on-surface-variant">{b.date}</p></div>
                <div className="flex gap-2"><button className="text-xs bg-primary text-white px-3 py-1.5 rounded-full">Accept</button><button className="text-xs border border-error/30 text-error px-3 py-1.5 rounded-full">Decline</button></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
