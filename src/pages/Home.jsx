import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, MapPin, Calendar, Star, ArrowRight, ShieldCheck, Sparkles, Lock, ChevronRight } from 'lucide-react'
import { serviceCategories, products, providers, shopCategories } from '../data/mockData'
import { useApp } from '../context/AppContext'

function Stars({ val = 5, size = 12 }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} className={i <= Math.round(val) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
      ))}
    </div>
  )
}

export default function Home() {
  const [service, setService] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const { addToCart } = useApp()
  const navigate = useNavigate()

  const search = (e) => {
    e.preventDefault()
    navigate(`/book?service=${service}&location=${location}`)
  }

  return (
    <div className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-pink-50 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 grid lg:grid-cols-2 gap-8 items-center py-12 lg:py-16 min-h-[560px]">
          {/* Left */}
          <div className="order-2 lg:order-1 fade-up">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[52px] font-bold text-gray-900 leading-[1.1] mb-4">
              Your Hair Journey<br />
              <em className="text-pink-500 not-italic">Starts Here.</em>
            </h1>
            <p className="text-gray-500 text-[15px] leading-relaxed mb-6 max-w-lg">
              Book trusted hair and beauty treatments, discover premium hair extensions and beauty products, and receive personalised beauty recommendations — all in one place.
            </p>

            {/* Search bar */}
            <form onSubmit={search} className="bg-white rounded-xl shadow-card border border-gray-100 flex flex-col sm:flex-row gap-0 mb-5 overflow-hidden">
              <div className="flex items-center gap-2 flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-100">
                <Search size={15} className="text-gray-400 shrink-0" />
                <input value={service} onChange={e => setService(e.target.value)}
                  placeholder="E.g. Knotless Braids..." className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400" />
              </div>
              <div className="flex items-center gap-2 flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-100">
                <MapPin size={15} className="text-gray-400 shrink-0" />
                <input value={location} onChange={e => setLocation(e.target.value)}
                  placeholder="City, town or postcode" className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400" />
              </div>
              <div className="flex items-center gap-2 flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-100">
                <Calendar size={15} className="text-gray-400 shrink-0" />
                <input type="date" value={date} onChange={e => setDate(e.target.value)}
                  className="flex-1 text-sm outline-none text-gray-700" />
              </div>
              <button type="submit" className="bg-pink-500 text-white px-6 py-3 text-sm font-semibold hover:bg-pink-600 transition-colors whitespace-nowrap">
                Search Services
              </button>
            </form>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Link to="/book" className="bg-pink-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors shadow-pink">
                Book a Service
              </Link>
              <Link to="/shop" className="border border-pink-500 text-pink-500 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-50 transition-colors">
                Shop Hair Products
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=40&h=40&fit=crop',
                  'https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=40&h=40&fit=crop',
                  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop',
                  'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=40&h=40&fit=crop',
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <div>
                <Stars val={5} size={11} />
                <p className="text-xs text-gray-500 mt-0.5">Trusted by <strong className="text-gray-700">10,000+</strong> beauty lovers</p>
              </div>
            </div>
          </div>

          {/* Right — hero image */}
          <div className="order-1 lg:order-2 relative flex justify-center">
            <div className="relative w-[280px] sm:w-[320px] lg:w-[360px]">
              {/* Oval container */}
              <div className="relative bg-pink-200 rounded-[50%] overflow-hidden w-full aspect-[3/4]">
                <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=650&fit=crop&face" alt="Beautiful hair" className="w-full h-full object-cover" />
              </div>
              {/* Badges */}
              <div className="absolute top-4 -right-4 bg-white rounded-xl shadow-card px-3 py-2 flex items-center gap-2">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
                  <ShieldCheck size={15} className="text-pink-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-800">Verified Professionals</p>
                  <p className="text-[9px] text-gray-400">All providers checked</p>
                </div>
              </div>
              <div className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white rounded-xl shadow-card px-3 py-2 flex items-center gap-2">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
                  <Sparkles size={15} className="text-pink-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-800">AI Hair Analysis</p>
                  <p className="text-[9px] text-gray-400">Personalised results</p>
                </div>
              </div>
              <div className="absolute bottom-8 -right-4 bg-white rounded-xl shadow-card px-3 py-2 flex items-center gap-2">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
                  <Lock size={15} className="text-pink-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-800">Secure Booking</p>
                  <p className="text-[9px] text-gray-400">Safe & easy payments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK LINKS ───────────────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Book a Service', sub: 'Find & book in seconds', icon: '📅', path: '/book', bg: 'bg-pink-50' },
            { label: 'Drop Wigs', sub: 'Wigs & hair extensions', icon: '💆', path: '/shop/wigs', bg: 'bg-purple-50' },
            { label: 'Find Providers', sub: 'Browse verified experts', icon: '🔍', path: '/providers', bg: 'bg-blue-50' },
            { label: 'AI Beauty Analyzer', sub: 'Get personalised advice', icon: '✨', path: '/ai-analyzer', bg: 'bg-amber-50' },
          ].map((q) => (
            <Link key={q.label} to={q.path}
              className={`${q.bg} rounded-xl p-4 flex items-center gap-3 card-hover border border-white shadow-card`}>
              <span className="text-2xl">{q.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{q.label}</p>
                <p className="text-xs text-gray-500">{q.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── POPULAR SERVICES ──────────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold text-pink-500 tracking-widest uppercase mb-1">EXPLORE</p>
            <h2 className="font-display text-2xl font-bold text-gray-900">Popular Services</h2>
          </div>
          <Link to="/book" className="text-sm font-semibold text-pink-500 flex items-center gap-1 hover:gap-2 transition-all">
            View all services <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {serviceCategories.map((cat) => (
            <Link key={cat.id} to={`/book/${cat.id}`}
              className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-pink-50 transition-colors group">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-100 group-hover:border-pink-300 transition-colors">
                <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-medium text-gray-600 text-center leading-tight">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PROVIDERS ────────────────────────────────────────── */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold text-pink-500 tracking-widest uppercase mb-1">TOP RATED</p>
              <h2 className="font-display text-2xl font-bold text-gray-900">Featured Professionals</h2>
            </div>
            <Link to="/providers" className="text-sm font-semibold text-pink-500 flex items-center gap-1 hover:gap-2 transition-all">
              View all providers <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {providers.slice(0, 3).map((p) => (
              <Link key={p.id} to={`/providers/${p.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-card card-hover border border-gray-100">
                <div className="relative h-44">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  {p.verified && (
                    <span className="absolute top-3 left-3 bg-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <ShieldCheck size={10} /> Verified
                    </span>
                  )}
                  <button className="absolute top-3 right-3 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 text-sm">♡</span>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{p.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{p.category} · {p.city}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Stars val={p.rating} size={11} />
                      <span className="text-xs font-semibold text-gray-700">{p.rating}</span>
                      <span className="text-xs text-gray-400">({p.reviews})</span>
                    </div>
                    <span className="text-sm font-bold text-pink-500">From £{p.startingPrice}</span>
                  </div>
                  <button className="w-full mt-3 bg-pink-500 text-white text-xs font-semibold py-2 rounded-full hover:bg-pink-600 transition-colors">
                    View Profile
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI BEAUTY ANALYZER ────────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Phone mockup */}
          <div className="relative flex justify-center">
            <div className="w-56 lg:w-64 bg-white rounded-3xl shadow-modal border border-gray-100 overflow-hidden">
              <div className="bg-pink-500 p-4 pb-2">
                <p className="text-white text-xs font-semibold">AI Hair Score</p>
                <div className="mt-2 flex gap-2">
                  {[['Health','78'],['Density','82'],['Moisture','65']].map(([k,v]) => (
                    <div key={k} className="flex-1 bg-white/20 rounded-lg p-2 text-center">
                      <p className="text-white text-[10px]">{k}</p>
                      <p className="text-white font-bold text-sm">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">Your Hair Profile</p>
                {[['Hair Type','4C Natural'],['Density','Medium'],['Porosity','High'],['Scalp','Dry']].map(([k,v]) => (
                  <div key={k} className="flex justify-between py-1 border-b border-gray-50 last:border-0">
                    <span className="text-[10px] text-gray-500">{k}</span>
                    <span className="text-[10px] font-semibold text-gray-700">{v}</span>
                  </div>
                ))}
                <p className="text-[10px] font-semibold text-gray-700 mt-3 mb-1.5">Top Recommendations</p>
                {['Deep Conditioning Treatment','Moisture-Lock Serum','Scalp Massage Routine'].map((r) => (
                  <div key={r} className="flex items-center gap-1.5 py-0.5">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                    <span className="text-[9px] text-gray-600">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Text */}
          <div>
            <p className="text-xs font-semibold text-pink-500 tracking-widest uppercase mb-2">AI BEAUTY ANALYZER</p>
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">
              Discover What Your Hair and Skin Really Need
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Upload a photo and receive personalised insights about your hair health, recommended services, skincare and find the perfect professionals for you.
            </p>
            <ul className="space-y-2 mb-6">
              {['Hair Care Analysis', 'Skin Care Insights', 'Hair Loss Detection', 'Scalp Health Report'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-4 h-4 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-pink-500 text-[9px]">✓</span>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link to="/ai-analyzer/hair" className="bg-pink-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors">
                Try Hair Analysis
              </Link>
              <Link to="/ai-analyzer/skin" className="border border-pink-500 text-pink-500 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-50 transition-colors">
                Analyse My Skin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SHOP HAIR ESSENTIALS ──────────────────────────────────────── */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold text-pink-500 tracking-widest uppercase mb-1">SHOP</p>
              <h2 className="font-display text-2xl font-bold text-gray-900">Shop Hair Essentials</h2>
            </div>
            <Link to="/shop" className="text-sm font-semibold text-pink-500 flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {products.slice(0, 6).map((p) => (
              <Link key={p.id} to={`/product/${p.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-card card-hover border border-gray-100">
                <div className="relative aspect-square bg-gray-50">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  {p.badge && (
                    <span className="absolute top-2 left-2 bg-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="p-2.5">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{p.brand}</p>
                  <p className="text-xs font-medium text-gray-800 line-clamp-2 mb-1">{p.name}</p>
                  <div className="flex items-center gap-1 mb-1.5">
                    <Stars val={p.rating} size={9} />
                    <span className="text-[9px] text-gray-400">({p.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-gray-900">£{p.price.toFixed(2)}</span>
                    {p.originalPrice && <span className="text-[10px] text-gray-400 line-through">£{p.originalPrice.toFixed(2)}</span>}
                  </div>
                  <button onClick={e => { e.preventDefault(); addToCart(p) }}
                    className="w-full mt-2 bg-pink-500 text-white text-[10px] font-semibold py-1.5 rounded-full hover:bg-pink-600 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl font-bold text-gray-900">Beauty Made Simple</h2>
          <p className="text-gray-500 text-sm mt-1">From discovery to styled in a few easy steps</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: '01', icon: '🔍', title: 'Search & Explore', desc: 'Browse verified hair and beauty professionals near you' },
            { n: '02', icon: '📅', title: 'Book or Shop', desc: 'Book a service or shop premium products in seconds' },
            { n: '03', icon: '✨', title: 'Look & Feel Amazing', desc: 'Enjoy your appointment or receive your order fast' },
            { n: '04', icon: '⭐', title: 'Review & Reward', desc: 'Leave a review and earn loyalty points on every visit' },
          ].map((s) => (
            <div key={s.n} className="text-center">
              <div className="relative w-14 h-14 mx-auto mb-4">
                <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-2xl">
                  {s.icon}
                </div>
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-pink-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {s.n}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">{s.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BECOME A PROVIDER + APP + NEWSLETTER ─────────────────────── */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 grid lg:grid-cols-3 gap-6">
          {/* Become a provider */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
            <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center mb-3">
              <span className="text-xl">💼</span>
            </div>
            <h3 className="font-display text-lg font-bold text-gray-900 mb-2">Become a Provider</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Join our platform and grow your beauty business. Reach new clients, manage your bookings and get paid fast.
            </p>
            <Link to="/become-provider"
              className="inline-flex items-center gap-2 bg-pink-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors">
              Join as a Provider <ArrowRight size={14} />
            </Link>
          </div>

          {/* Download App */}
          <div className="bg-gray-900 rounded-2xl p-6 text-white">
            <h3 className="font-display text-lg font-bold mb-2">Download the App</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Book, shop, and track everything on the go. Available on iOS and Android.
            </p>
            <div className="flex flex-col gap-2">
              {['App Store', 'Google Play'].map((s) => (
                <button key={s} className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 hover:bg-white/20 transition-colors">
                  <span className="text-xl">{s === 'App Store' ? '🍎' : '▶'}</span>
                  <div className="text-left">
                    <p className="text-[9px] text-gray-400">Download on the</p>
                    <p className="text-sm font-semibold">{s}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-pink-500 rounded-2xl p-6 text-white">
            <h3 className="font-display text-lg font-bold mb-2">Stay in the Beauty Loop</h3>
            <p className="text-sm text-pink-100 leading-relaxed mb-4">
              Get beauty tips, exclusive offers and new product launches straight to your inbox.
            </p>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your email"
                className="flex-1 px-3 py-2.5 rounded-xl text-sm text-gray-900 outline-none placeholder:text-gray-400" />
              <button className="bg-white text-pink-500 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-pink-50 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
