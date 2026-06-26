import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, Mail, Phone, MapPin, Clock, Send, Briefcase, Users, Zap, Heart, ArrowRight, Package, Search, CheckCircle, RotateCcw, Truck } from 'lucide-react'
import { faqData } from '../data/mockData'
import { fetchJobs, submitContactMessage, subscribeNewsletter } from '../lib/db'

// ── ABOUT US ──────────────────────────────────────────────────────────────────
export function AboutUs() {
  const values = [
    { icon: '🏅', title: 'Trust & Transparency', desc: 'Every provider is verified. Every product is authentic. No shortcuts.' },
    { icon: '💡', title: 'Innovation', desc: 'We use AI to help you understand your hair and skin like never before.' },
    { icon: '🌍', title: 'Inclusivity', desc: 'Beauty is for everyone. We celebrate all hair types, skin tones, and styles.' },
    { icon: '💼', title: 'Empowerment', desc: 'We empower beauty professionals to build thriving businesses.' },
  ]

  const team = [
    { name: 'Amara Okafor', role: 'Co-Founder & CEO', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&facepad=5', bio: 'Former beauty professional turned tech entrepreneur.' },
    { name: 'David Chen', role: 'CTO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&facepad=5', bio: 'AI engineer with a passion for inclusive tech.' },
    { name: 'Priya Sharma', role: 'Head of Partnerships', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&facepad=5', bio: 'Beauty industry veteran with 10+ years experience.' },
    { name: 'Nike Adeyemi', role: 'Head of Community', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&facepad=5', bio: 'Community builder and brand strategist.' },
  ]

  const stats = [
    { value: '10,000+', label: 'Happy Clients' },
    { value: '500+', label: 'Verified Providers' },
    { value: '50+', label: 'Cities Covered' },
    { value: '4.9★', label: 'Average Rating' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-50 to-white py-16 px-4 border-b border-pink-100">
        <div className="max-w-[1280px] mx-auto text-center">
          <p className="text-xs text-gray-400 mb-4">
            <Link to="/" className="hover:text-pink-500">Home</Link> › <span>About Us</span>
          </p>
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <Heart size={13} /> Our Story
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Redefining Beauty,<br /><em className="text-pink-500 not-italic">One Booking at a Time</em>
          </h1>
          <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Rejuveefy was born from a simple belief: finding and booking a beauty professional should be as effortless as the transformation itself. We connect you with the best hair and beauty experts across the UK.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100 py-8">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-bold text-pink-500">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-14">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold text-pink-500 uppercase tracking-widest mb-3">Our Mission</p>
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4 leading-tight">
              Making Professional Beauty Accessible to Everyone
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              We started Rejuveefy because we saw a gap — talented beauty professionals without reach, and clients struggling to find trusted experts. Our platform bridges that gap with technology, transparency, and trust.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Today, we're proud to support over 500 verified beauty professionals and serve 10,000+ clients across the UK, with AI-powered tools that help everyone look and feel their best.
            </p>
            <Link to="/book" className="inline-flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors">
              Book a Service <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=350&fit=crop" alt="" className="rounded-2xl object-cover h-full" />
            <div className="space-y-4">
              <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=160&fit=crop" alt="" className="rounded-2xl w-full object-cover" />
              <img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=300&h=160&fit=crop" alt="" className="rounded-2xl w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-pink-500 uppercase tracking-widest mb-2">Our Values</p>
            <h2 className="font-display text-2xl font-bold text-gray-900">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-5 shadow-card text-center card-hover">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-14">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-pink-500 uppercase tracking-widest mb-2">The Team</p>
          <h2 className="font-display text-2xl font-bold text-gray-900">Meet the People Behind Rejuveefy</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map(t => (
            <div key={t.name} className="text-center card-hover">
              <div className="aspect-square rounded-2xl overflow-hidden mb-3">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{t.name}</h3>
              <p className="text-xs text-pink-500 font-medium">{t.role}</p>
              <p className="text-[11px] text-gray-400 mt-1">{t.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-pink-500 to-pink-600 py-12 px-4 text-white text-center">
        <h2 className="font-display text-2xl font-bold mb-3">Join the Rejuveefy Family</h2>
        <p className="text-pink-100 text-sm mb-5">Whether you're a client or a beauty professional, there's a place for you here.</p>
        <div className="flex justify-center gap-3">
          <Link to="/book" className="bg-white text-pink-500 px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-pink-50 transition-colors">Book a Service</Link>
          <Link to="/careers" className="border border-white/50 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-white/10 transition-colors">Join Our Team</Link>
        </div>
      </section>
    </div>
  )
}

// ── CONTACT US ────────────────────────────────────────────────────────────────
export function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await submitContactMessage({ name: form.name, email: form.email, subject: form.subject, message: form.message })
      setSent(true)
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-pink-50 to-white border-b border-pink-100 py-10">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 text-center">
          <p className="text-xs text-gray-400 mb-3"><Link to="/" className="hover:text-pink-500">Home</Link> › <span>Contact Us</span></p>
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">Get in Touch</h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">We're here to help with any questions about bookings, products, or your beauty journey.</p>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          {/* Form */}
          <div>
            {sent ? (
              <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-10 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Message Sent!</h2>
                <p className="text-sm text-gray-500 mb-5">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name:'',email:'',subject:'',message:'' }) }}
                  className="bg-pink-500 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors">
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-6">
                <h2 className="text-base font-semibold text-gray-900 mb-5">Send Us a Message</h2>
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 mb-1 block">Full Name</label>
                      <input value={form.name} onChange={e => setForm(p => ({...p,name:e.target.value}))} required placeholder="Jessica Williams"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 mb-1 block">Email Address</label>
                      <input type="email" value={form.email} onChange={e => setForm(p => ({...p,email:e.target.value}))} required placeholder="jessica@example.com"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Subject</label>
                    <select value={form.subject} onChange={e => setForm(p => ({...p,subject:e.target.value}))} required
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400">
                      <option value="">Select a topic</option>
                      <option>Booking Support</option>
                      <option>Product Enquiry</option>
                      <option>Provider Support</option>
                      <option>Technical Issue</option>
                      <option>Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Message</label>
                    <textarea value={form.message} onChange={e => setForm(p => ({...p,message:e.target.value}))} required rows={5}
                      placeholder="Tell us how we can help you..."
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

          {/* Contact info */}
          <div className="space-y-4">
            {[
              { icon: Phone, title: 'Phone', val: '+44 20 1234 5678', sub: 'Mon–Fri 9am–6pm', color: 'bg-green-50 text-green-500' },
              { icon: Mail, title: 'Email', val: 'hello@rejuveefy.com', sub: 'We reply within 24 hours', color: 'bg-blue-50 text-blue-500' },
              { icon: MapPin, title: 'Address', val: '24 Beauty Street, London, UK', sub: 'SW1A 2AA', color: 'bg-pink-50 text-pink-500' },
              { icon: Clock, title: 'Support Hours', val: 'Mon–Fri: 9am – 6pm', sub: 'Sat: 10am – 4pm', color: 'bg-purple-50 text-purple-500' },
            ].map((c) => (
              <div key={c.title} className="bg-white border border-gray-100 rounded-2xl shadow-card p-4 flex items-center gap-4">
                <div className={`w-11 h-11 ${c.color} rounded-xl flex items-center justify-center shrink-0`}>
                  <c.icon size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{c.title}</p>
                  <p className="text-sm font-semibold text-gray-900">{c.val}</p>
                  <p className="text-xs text-gray-400">{c.sub}</p>
                </div>
              </div>
            ))}

            {/* Chat */}
            <div className="bg-pink-500 rounded-2xl p-5 text-white">
              <h3 className="font-bold text-sm mb-1">Live Chat Available</h3>
              <p className="text-xs text-pink-100 mb-3">Get instant answers from our support team</p>
              <button className="w-full bg-white text-pink-500 font-bold text-xs py-2.5 rounded-full hover:bg-pink-50 transition-colors">
                Start Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
export function FAQ() {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState({})
  const toggle = (id) => setOpen(p => ({ ...p, [id]: !p[id] }))

  const filtered = faqData.map(cat => ({
    ...cat,
    items: cat.items.filter(i => !q || i.question.toLowerCase().includes(q.toLowerCase()) || i.answer.toLowerCase().includes(q.toLowerCase()))
  })).filter(cat => cat.items.length > 0)

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-pink-50 to-white border-b border-pink-100 py-10">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 text-center">
          <p className="text-xs text-gray-400 mb-3"><Link to="/" className="hover:text-pink-500">Home</Link> › <span>FAQ</span></p>
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-500 text-sm mb-6 max-w-lg mx-auto">Find quick answers to the most common questions about Rejuveefy.</p>
          <div className="max-w-md mx-auto flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
            <Search size={15} className="text-gray-400" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search questions..."
              className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400" />
          </div>
        </div>
      </section>

      <div className="max-w-[800px] mx-auto px-4 lg:px-6 py-10">
        {filtered.map((cat) => (
          <div key={cat.category} className="mb-8">
            <h2 className="text-base font-semibold text-gray-900 mb-3">{cat.category}</h2>
            <div className="space-y-2">
              {cat.items.map((item) => (
                <div key={item.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-card">
                  <button onClick={() => toggle(item.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-medium text-gray-800 pr-4">{item.question}</span>
                    {open[item.id] ? <ChevronUp size={16} className="text-pink-500 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                  </button>
                  {open[item.id] && (
                    <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Still need help */}
        <div className="bg-pink-50 rounded-2xl p-6 text-center">
          <h3 className="font-display text-lg font-bold text-gray-900 mb-2">Still Need Help?</h3>
          <p className="text-sm text-gray-500 mb-4">Our support team is ready to help with any question.</p>
          <div className="flex justify-center gap-3">
            <Link to="/contact" className="bg-pink-500 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors">Contact Us</Link>
            <Link to="/booking-help" className="border border-pink-500 text-pink-500 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-pink-50 transition-colors">Booking Help</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── BOOKING HELP ──────────────────────────────────────────────────────────────
export function BookingHelp() {
  const articles = [
    { icon: '📅', title: 'How to Book a Service', sub: '5 min read', href: '#' },
    { icon: '🔄', title: 'Rescheduling & Cancellations', sub: '3 min read', href: '#' },
    { icon: '💳', title: 'Payment Methods Accepted', sub: '2 min read', href: '#' },
    { icon: '⭐', title: 'Leaving a Review', sub: '2 min read', href: '#' },
    { icon: '🔒', title: 'Account & Privacy', sub: '4 min read', href: '#' },
    { icon: '📦', title: 'Managing Your Orders', sub: '3 min read', href: '#' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-pink-50 to-white border-b border-pink-100 py-10">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 text-center">
          <p className="text-xs text-gray-400 mb-3"><Link to="/" className="hover:text-pink-500">Home</Link> › <span>Booking Help</span></p>
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">Booking Help Centre</h1>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">Everything you need to know about booking, managing appointments, and getting the most from Rejuveefy.</p>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12">
        {/* Quick guides */}
        <div className="mb-12">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-5">Popular Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map(a => (
              <a key={a.title} href={a.href} className="bg-white border border-gray-100 rounded-2xl shadow-card p-5 card-hover flex items-center gap-3">
                <div className="w-11 h-11 bg-pink-50 rounded-xl flex items-center justify-center text-xl shrink-0">{a.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">{a.title}</p>
                  <p className="text-xs text-gray-400">{a.sub}</p>
                </div>
                <ArrowRight size={14} className="text-gray-300 shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-6 text-center">How Booking Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: '1', icon: Search, title: 'Search', sub: 'Find a service, provider, or browse categories' },
              { n: '2', icon: Users, title: 'Choose Provider', sub: 'Compare profiles, reviews, and prices' },
              { n: '3', icon: CheckCircle, title: 'Book & Pay', sub: 'Select time, add preferences, pay securely' },
              { n: '4', icon: Heart, title: 'Enjoy!', sub: 'Show up and enjoy your appointment' },
            ].map(s => (
              <div key={s.n} className="text-center">
                <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <s.icon size={20} className="text-white" />
                </div>
                <p className="text-sm font-bold text-gray-900 mb-1">{s.title}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-pink-50 rounded-2xl p-6 text-center">
          <h3 className="font-bold text-gray-900 mb-2">Can't find what you're looking for?</h3>
          <p className="text-sm text-gray-500 mb-4">Our support team is available 7 days a week to help.</p>
          <Link to="/contact" className="inline-block bg-pink-500 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── RETURNS & REFUNDS ─────────────────────────────────────────────────────────
export function ReturnsRefunds() {
  const [open, setOpen] = useState({})
  const toggle = (k) => setOpen(p => ({ ...p, [k]: !p[k] }))

  const faqs = [
    { q: 'How do I return a product?', a: 'Contact our support team within 30 days of delivery. We\'ll arrange a free return label and process your refund within 3–5 business days of receiving the item.' },
    { q: 'What items cannot be returned?', a: 'For hygiene reasons, we cannot accept returns on opened hair care and skincare products unless they are defective. Sealed items in original packaging can be returned.' },
    { q: 'How long does a refund take?', a: 'Once we receive your return, refunds are processed within 3–5 business days. It may take an additional 2–3 days to appear in your account depending on your bank.' },
    { q: 'Can I cancel a booking?', a: 'Yes, you can cancel a booking up to 24 hours before your appointment for a full refund. Cancellations within 24 hours may incur a cancellation fee.' },
    { q: 'What if my product arrived damaged?', a: 'If your product arrives damaged, please contact us immediately with photos. We\'ll send a replacement or issue a full refund at no cost to you.' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-pink-50 to-white border-b border-pink-100 py-10">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 text-center">
          <p className="text-xs text-gray-400 mb-3"><Link to="/" className="hover:text-pink-500">Home</Link> › <span>Returns & Refunds</span></p>
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">Returns & Refunds Policy</h1>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">We want you to love every purchase. If something isn't right, we'll make it right.</p>
        </div>
      </section>

      <div className="max-w-[1000px] mx-auto px-4 lg:px-6 py-10">
        {/* Policy cards */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: RotateCcw, title: '30-Day Returns', sub: 'Return within 30 days of purchase for sealed items' },
            { icon: CheckCircle, title: 'Easy Process', sub: 'Simple online return request — no hassle' },
            { icon: Truck, title: 'Free Return Shipping', sub: 'We cover the return shipping cost' },
          ].map(p => (
            <div key={p.title} className="bg-pink-50 rounded-2xl p-5 text-center">
              <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <p.icon size={20} className="text-white" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{p.title}</h3>
              <p className="text-xs text-gray-500">{p.sub}</p>
            </div>
          ))}
        </div>

        {/* Policy text */}
        <div className="prose max-w-none mb-8 text-sm text-gray-600 leading-relaxed">
          <h2 className="text-base font-bold text-gray-900 mb-3">Product Returns</h2>
          <p className="mb-3">We accept returns on products within 30 days of delivery. Items must be unused, unsealed, and in their original packaging.</p>
          <p className="mb-5">To initiate a return, contact our support team with your order number and reason for return. We'll provide a prepaid return label within 24 hours.</p>

          <h2 className="text-base font-bold text-gray-900 mb-3">Service Booking Cancellations</h2>
          <p className="mb-3">You may cancel a service booking up to 24 hours before your scheduled appointment for a full refund. Cancellations made within 24 hours may be subject to a 50% cancellation fee.</p>
          <p>No-shows will not be refunded. If your provider cancels or doesn't show, you will receive a full refund and priority rebooking.</p>
        </div>

        {/* FAQ accordion */}
        <h2 className="text-base font-bold text-gray-900 mb-4">Common Questions</h2>
        <div className="space-y-2 mb-8">
          {faqs.map((f, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden shadow-card">
              <button onClick={() => toggle(i)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium text-gray-800 pr-4">{f.q}</span>
                {open[i] ? <ChevronUp size={16} className="text-pink-500 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
              </button>
              {open[i] && <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50">{f.a}</div>}
            </div>
          ))}
        </div>

        <div className="bg-pink-50 rounded-2xl p-6 text-center">
          <h3 className="font-bold text-gray-900 mb-2">Need to Start a Return?</h3>
          <p className="text-sm text-gray-500 mb-4">Contact our team and we'll guide you through the process.</p>
          <Link to="/contact" className="inline-block bg-pink-500 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── TRACK ORDER ───────────────────────────────────────────────────────────────
export function TrackOrder() {
  const [orderId, setOrderId] = useState('')
  const [email, setEmail] = useState('')
  const [tracked, setTracked] = useState(false)

  const steps = [
    { label: 'Order Placed', date: 'Mon, 24 Jun 2026 · 10:32 AM', done: true },
    { label: 'Payment Confirmed', date: 'Mon, 24 Jun 2026 · 10:33 AM', done: true },
    { label: 'Order Packed', date: 'Tue, 25 Jun 2026 · 9:00 AM', done: true },
    { label: 'Out for Delivery', date: 'Wed, 26 Jun 2026 · Estimated Today', done: false },
    { label: 'Delivered', date: 'Expected by 6:00 PM', done: false },
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-pink-50 to-white border-b border-pink-100 py-10">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 text-center">
          <p className="text-xs text-gray-400 mb-3"><Link to="/" className="hover:text-pink-500">Home</Link> › <span>Track Order</span></p>
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">Track Your Order</h1>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">Enter your order number and email to get real-time delivery updates.</p>
        </div>
      </section>

      <div className="max-w-[700px] mx-auto px-4 lg:px-6 py-10">
        {/* Search form */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-6 mb-6">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Order Number</label>
              <input value={orderId} onChange={e => setOrderId(e.target.value)} placeholder="e.g. RJYF-240912-3847"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jessica@example.com"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
            </div>
            <button onClick={() => setTracked(true)}
              className="w-full bg-pink-500 text-white py-3 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors">
              Track Order
            </button>
          </div>
        </div>

        {/* Results */}
        {tracked && (
          <div className="space-y-4">
            {/* Order info */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-400">Order</p>
                  <p className="font-bold text-gray-900">RJYF-240912-3847</p>
                </div>
                <span className="text-xs font-bold bg-blue-50 text-blue-500 px-3 py-1.5 rounded-full">Out for Delivery</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gray-200 rounded-xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=100&h=100&fit=crop" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">Kérastase Genesis Shampoo</p>
                  <p className="text-[10px] text-gray-400">Qty: 1 · £24.80</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Delivery Timeline</h2>
              <div className="relative">
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100" />
                <div className="space-y-4">
                  {steps.map((s, i) => (
                    <div key={i} className="flex items-center gap-4 relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 border-2
                        ${s.done ? 'bg-pink-500 border-pink-500' : i === steps.filter(x=>x.done).length ? 'border-pink-300 bg-white' : 'border-gray-200 bg-white'}`}>
                        {s.done && <CheckCircle size={16} className="text-white" />}
                        {!s.done && i === steps.filter(x=>x.done).length && <div className="w-2.5 h-2.5 bg-pink-400 rounded-full animate-pulse" />}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${s.done ? 'text-gray-900' : 'text-gray-400'}`}>{s.label}</p>
                        <p className={`text-xs ${s.done ? 'text-gray-400' : 'text-pink-400'}`}>{s.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Delivery info */}
            <div className="bg-pink-50 rounded-2xl p-4 flex items-center gap-3">
              <Truck size={20} className="text-pink-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-800">Expected Delivery: Today by 6:00 PM</p>
                <p className="text-xs text-gray-500">Delivered by Royal Mail Tracked 24</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── CAREERS ───────────────────────────────────────────────────────────────────
export function Careers() {
  const [filterDept, setFilterDept] = useState('All')
  const [jobs, setJobs] = useState([])
  const depts = ['All', ...new Set(jobs.map(j => j.department).filter(Boolean))]

  useEffect(() => {
    fetchJobs().then(setJobs).catch(() => {})
  }, [])

  const filtered = filterDept === 'All' ? jobs : jobs.filter(j => j.department === filterDept)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-50 to-white border-b border-pink-100 py-14">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 text-center">
          <p className="text-xs text-gray-400 mb-3"><Link to="/" className="hover:text-pink-500">Home</Link> › <span>Careers</span></p>
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <Briefcase size={13} /> We're Hiring
          </div>
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Join the Team Changing<br /><em className="text-pink-500 not-italic">the Beauty Industry</em>
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto mb-6">
            We're a passionate team of builders, dreamers, and beauty lovers. Come help us make professional beauty accessible to everyone.
          </p>
          <a href="#jobs" className="inline-block bg-pink-500 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors">
            View Open Roles
          </a>
        </div>
      </section>

      {/* Perks */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl font-bold text-gray-900">Why Work at Rejuveefy?</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '🌍', title: 'Remote-First', sub: 'Work from wherever you thrive' },
            { icon: '📈', title: 'Fast Growth', sub: 'Rapid career progression and learning' },
            { icon: '💜', title: 'Inclusive Culture', sub: 'A team that celebrates diversity' },
            { icon: '🎁', title: 'Great Benefits', sub: 'Generous equity, healthcare, and perks' },
          ].map(p => (
            <div key={p.title} className="bg-white border border-gray-100 rounded-2xl shadow-card p-5 text-center card-hover">
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{p.title}</h3>
              <p className="text-xs text-gray-500">{p.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open roles */}
      <section id="jobs" className="bg-gray-50 py-12">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Open Positions</h2>

          {/* Filter pills */}
          <div className="flex gap-2 flex-wrap mb-6">
            {depts.map(d => (
              <button key={d} onClick={() => setFilterDept(d)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors
                  ${filterDept === d ? 'bg-pink-500 text-white border-pink-500' : 'border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-500'}`}>
                {d}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((job) => (
              <div key={job.id} className="bg-white border border-gray-100 rounded-2xl shadow-card p-5 card-hover">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-gray-900">{job.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Briefcase size={11} /> {job.department}</span>
                      <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {job.type}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{job.description}</p>
                  </div>
                  <div className="shrink-0">
                    <span className={`text-[11px] font-semibold px-3 py-1.5 rounded-full
                      ${job.department === 'Engineering' ? 'bg-blue-50 text-blue-500' :
                        job.department === 'Product' ? 'bg-purple-50 text-purple-500' :
                        job.department === 'Design' ? 'bg-pink-50 text-pink-500' :
                        'bg-green-50 text-green-500'}`}>
                      {job.department}
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <p className="text-xs text-gray-400">Posted {new Date(job.created_at).toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'})}</p>
                  <a href={`mailto:careers@rejuveefy.com?subject=Application: ${job.title}`}
                    className="bg-pink-500 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-pink-600 transition-colors">
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              <Briefcase size={40} className="mx-auto mb-3 text-gray-200" />
              <p className="text-sm">No openings in this department right now.</p>
              <p className="text-xs mt-1">Check back soon or send us a speculative application.</p>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-3">Don't see a role that fits? We'd still love to hear from you.</p>
            <a href="mailto:careers@rejuveefy.com" className="inline-flex items-center gap-2 border border-pink-500 text-pink-500 px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-pink-50 transition-colors">
              <Mail size={14} /> Send Speculative Application
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
