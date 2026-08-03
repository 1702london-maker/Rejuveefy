import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Heart,
  Mail,
  MapPin,
  Package,
  RotateCcw,
  Search,
  Send,
  ShieldCheck,
  Truck,
  Users,
} from 'lucide-react'
import { fetchJobs, submitContactMessage } from '../lib/db'

const faqs = [
  {
    category: 'Accounts',
    items: [
      { id: 'account-create', question: 'How do I create a client account?', answer: 'Use the register page with email, Google or Facebook, then check your inbox to verify your account.' },
      { id: 'provider-apply', question: 'How do providers join?', answer: 'Providers create an account, then submit the provider application in the provider portal. Access is reviewed before provider tools unlock.' },
      { id: 'affiliate-apply', question: 'How do affiliates join?', answer: 'Affiliates create an account and submit the affiliate application. Approved partners receive next steps by email.' },
    ],
  },
  {
    category: 'Bookings',
    items: [
      { id: 'booking-data', question: 'Why are some provider lists empty?', answer: 'Only approved providers are shown. Empty states mean profiles are still being verified and prepared.' },
      { id: 'booking-status', question: 'Where can I see bookings?', answer: 'Signed-in clients can see booking activity in the dashboard once bookings are saved against their account.' },
    ],
  },
  {
    category: 'Shop',
    items: [
      { id: 'shop-products', question: 'When will products be available?', answer: 'The shop catalogue is being prepared. Coming soon product cards will be replaced as items are released.' },
      { id: 'checkout', question: 'Can I pay for products now?', answer: 'Checkout will open when the shop launches.' },
    ],
  },
]

function PageHero({ title, body, label }) {
  return (
    <section className="bg-gradient-to-br from-pink-50 to-white border-b border-pink-100 py-10">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 text-center">
        <p className="text-xs text-gray-400 mb-3">
          <Link to="/" className="hover:text-pink-500">Home</Link>
          <span className="mx-1">/</span>
          <span>{label || title}</span>
        </p>
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">{title}</h1>
        {body && <p className="text-gray-500 text-sm max-w-xl mx-auto">{body}</p>}
      </div>
    </section>
  )
}

export function AboutUs() {
  const values = [
    { icon: ShieldCheck, title: 'Reviewed Access', desc: 'Provider and affiliate access should be approved before public activity goes live.' },
    { icon: Heart, title: 'Client Trust', desc: 'The app should show real data and clear empty states instead of placeholder proof.' },
    { icon: Users, title: 'Professional Growth', desc: 'Rejuveefy gives providers a path to profile, booking and service tools after approval.' },
    { icon: Search, title: 'Clean Discovery', desc: 'Clients can browse verified services, products and account activity from one place.' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        title="About Rejuveefy"
        body="Rejuveefy is being built as a reviewed beauty marketplace for clients, providers and partners."
        label="About"
      />

      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-14">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold text-pink-500 uppercase tracking-widest mb-3">Our Direction</p>
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4 leading-tight">
              A beauty platform built around trust and real activity
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              The public experience should only show verified providers, real products, real bookings and reviewed partner access.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              The current build keeps incomplete areas clean while provider, affiliate, checkout and review workflows are completed.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/book" className="inline-flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors">
                Book a Service <ArrowRight size={15} />
              </Link>
              <Link to="/providers-portal" className="inline-flex items-center gap-2 border border-pink-500 text-pink-500 px-6 py-3 rounded-full font-semibold text-sm hover:bg-pink-50 transition-colors">
                Apply as Provider
              </Link>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden bg-pink-50 aspect-[4/3]">
            <img src="/assets/spa-interior.png" alt="Rejuveefy salon experience" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-pink-500 uppercase tracking-widest mb-2">Principles</p>
            <h2 className="font-display text-2xl font-bold text-gray-900">What We Are Building Toward</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-5 shadow-card text-center">
                <div className="w-11 h-11 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon size={20} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await submitContactMessage(form)
      setSent(true)
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHero title="Contact Us" body="Send a message about bookings, products, provider applications, affiliate applications or technical support." label="Contact" />

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10">
          <div>
            {sent ? (
              <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-10 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Message Sent</h2>
                <p className="text-sm text-gray-500 mb-5">Your message has been received. The team will review it.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="bg-pink-500 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors">
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-6">
                <h2 className="text-base font-semibold text-gray-900 mb-5">Send a Message</h2>
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 mb-1 block">Full Name</label>
                      <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required placeholder="Your full name"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 mb-1 block">Email Address</label>
                      <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required placeholder="you@example.com"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Subject</label>
                    <select value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} required
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400">
                      <option value="">Select a topic</option>
                      <option>Booking Support</option>
                      <option>Product Enquiry</option>
                      <option>Provider Application</option>
                      <option>Affiliate Application</option>
                      <option>Technical Issue</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Message</label>
                    <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required rows={5}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400 resize-none" />
                  </div>
                  <button type="submit" disabled={submitting}
                    className="w-full bg-pink-500 text-white py-3.5 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                    <Send size={15} /> {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {[
              { icon: Mail, title: 'Email', val: 'hello@rejuveefy.com', sub: 'Use for support and application questions', color: 'bg-blue-50 text-blue-500' },
              { icon: ShieldCheck, title: 'Provider Review', val: 'Provider Portal', sub: 'Submit and track your application', color: 'bg-pink-50 text-pink-500', to: '/providers-portal' },
              { icon: Users, title: 'Affiliate Review', val: 'Affiliate Programme', sub: 'Apply and check partner access', color: 'bg-green-50 text-green-500', to: '/affiliate' },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-100 rounded-2xl shadow-card p-4 flex items-center gap-4">
                <div className={`w-11 h-11 ${item.color} rounded-xl flex items-center justify-center shrink-0`}>
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{item.title}</p>
                  {item.to ? <Link to={item.to} className="text-sm font-semibold text-gray-900 hover:text-pink-500">{item.val}</Link> : <p className="text-sm font-semibold text-gray-900">{item.val}</p>}
                  <p className="text-xs text-gray-400">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState({})
  const toggle = (id) => setOpen(prev => ({ ...prev, [id]: !prev[id] }))

  const filtered = faqs.map(category => ({
    ...category,
    items: category.items.filter(item => !q || item.question.toLowerCase().includes(q.toLowerCase()) || item.answer.toLowerCase().includes(q.toLowerCase())),
  })).filter(category => category.items.length)

  return (
    <div className="min-h-screen bg-white">
      <PageHero title="Frequently Asked Questions" body="Answers for the current Rejuveefy build and reviewed access flows." label="FAQ" />
      <div className="max-w-[800px] mx-auto px-4 lg:px-6 py-10">
        <div className="mb-8 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
          <Search size={15} className="text-gray-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search questions..."
            className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400" />
        </div>
        {filtered.map(category => (
          <div key={category.category} className="mb-8">
            <h2 className="text-base font-semibold text-gray-900 mb-3">{category.category}</h2>
            <div className="space-y-2">
              {category.items.map(item => (
                <div key={item.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-card">
                  <button onClick={() => toggle(item.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-medium text-gray-800 pr-4">{item.question}</span>
                    {open[item.id] ? <ChevronUp size={16} className="text-pink-500 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                  </button>
                  {open[item.id] && <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50">{item.answer}</div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function BookingHelp() {
  const guides = [
    { icon: Search, title: 'Browse services', sub: 'Start from the booking page or provider directory.' },
    { icon: Users, title: 'Choose a provider', sub: 'Only active approved providers are shown.' },
    { icon: Calendar, title: 'Request a time', sub: 'Booking records are saved against your account.' },
    { icon: CheckCircle, title: 'Track status', sub: 'Pending, confirmed and completed activity appears in your dashboard.' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <PageHero title="Booking Help" body="How client booking should work as approved provider profiles are connected." label="Booking Help" />
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {guides.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <div className="w-11 h-11 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center mb-3">
                <Icon size={20} />
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">{title}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{sub}</p>
            </div>
          ))}
        </div>
        <div className="bg-pink-50 rounded-2xl p-6 text-center">
          <h3 className="font-bold text-gray-900 mb-2">Need help with a booking?</h3>
          <p className="text-sm text-gray-500 mb-4">Send the details through the contact form so support can review the record.</p>
          <Link to="/contact" className="inline-block bg-pink-500 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}

export function ReturnsRefunds() {
  const [open, setOpen] = useState({})
  const toggle = (id) => setOpen(prev => ({ ...prev, [id]: !prev[id] }))
  const items = [
    { id: 'products', q: 'Are product returns live?', a: 'Returns policy should be finalised before product checkout is enabled. Keep live promises aligned with payment and fulfilment setup.' },
    { id: 'bookings', q: 'Can bookings be cancelled?', a: 'Booking cancellation rules should be set before full provider scheduling launches. For now, contact support about any booking record.' },
    { id: 'refunds', q: 'How will refunds work?', a: 'Refund details will be shown clearly before checkout opens.' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <PageHero title="Returns & Refunds" body="Policy details should stay clear while checkout and provider booking rules are finalised." label="Returns & Refunds" />
      <div className="max-w-[1000px] mx-auto px-4 lg:px-6 py-10">
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: RotateCcw, title: 'Policy Pending', sub: 'Final rules should be added before launch.' },
            { icon: Truck, title: 'Delivery Details', sub: 'Shipping and delivery details will be shown at launch.' },
            { icon: Package, title: 'Order Records', sub: 'Returns depend on live order data.' },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="bg-pink-50 rounded-2xl p-5 text-center">
              <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Icon size={20} className="text-white" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{title}</h3>
              <p className="text-xs text-gray-500">{sub}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-card">
              <button onClick={() => toggle(item.id)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium text-gray-800 pr-4">{item.q}</span>
                {open[item.id] ? <ChevronUp size={16} className="text-pink-500 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
              </button>
              {open[item.id] && <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50">{item.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function TrackOrder() {
  const [orderId, setOrderId] = useState('')
  const [email, setEmail] = useState('')
  const [checked, setChecked] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <PageHero title="Track Order" body="Order tracking will appear when the shop checkout launches." label="Track Order" />
      <div className="max-w-[700px] mx-auto px-4 lg:px-6 py-10">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-6 mb-6">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Order Number</label>
              <input value={orderId} onChange={e => setOrderId(e.target.value)} placeholder="Enter order number"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
            </div>
            <button onClick={() => setChecked(true)}
              className="w-full bg-pink-500 text-white py-3 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors">
              Check Tracking
            </button>
          </div>
        </div>
        {checked && (
          <div className="bg-pink-50 border border-pink-100 rounded-2xl p-6 text-center">
            <Package size={30} className="text-pink-500 mx-auto mb-3" />
            <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Tracking Coming Soon</h2>
            <p className="text-sm text-gray-500">Order status will appear here when checkout and fulfilment tracking launch.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export function Careers() {
  const [filterDept, setFilterDept] = useState('All')
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    fetchJobs().then(setJobs).catch(() => setJobs([]))
  }, [])

  const depts = useMemo(() => ['All', ...new Set(jobs.map(job => job.department).filter(Boolean))], [jobs])
  const filtered = filterDept === 'All' ? jobs : jobs.filter(job => job.department === filterDept)

  return (
    <div className="min-h-screen bg-white">
      <PageHero title="Careers" body="Open roles will appear here when recruitment opens." label="Careers" />
      <section id="jobs" className="bg-gray-50 py-12">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Open Positions</h2>
          {depts.length > 1 && (
            <div className="flex gap-2 flex-wrap mb-6">
              {depts.map(dept => (
                <button key={dept} onClick={() => setFilterDept(dept)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors
                    ${filterDept === dept ? 'bg-pink-500 text-white border-pink-500' : 'border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-500'}`}>
                  {dept}
                </button>
              ))}
            </div>
          )}
          <div className="space-y-3">
            {filtered.map(job => (
              <div key={job.id} className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                      {job.department && <span className="flex items-center gap-1"><Briefcase size={11} /> {job.department}</span>}
                      {job.location && <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>}
                      {job.type && <span className="flex items-center gap-1"><Clock size={11} /> {job.type}</span>}
                    </div>
                    {job.description && <p className="text-xs text-gray-500 mt-2">{job.description}</p>}
                  </div>
                  <a href={`mailto:careers@rejuveefy.com?subject=Application: ${encodeURIComponent(job.title)}`}
                    className="bg-pink-500 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-pink-600 transition-colors shrink-0">
                    Apply
                  </a>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Briefcase size={40} className="mx-auto mb-3 text-gray-200" />
              <p className="text-sm">No open roles right now.</p>
              <p className="text-xs mt-1">Check back when recruitment opens.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
