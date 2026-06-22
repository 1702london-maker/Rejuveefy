import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, MapPin, Calendar, Sparkles, ArrowRight, Star, CheckCircle } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import ProviderCard from '../components/ProviderCard'
import { services, providers, products, serviceCategories } from '../data/mockData'

const heroImages = [
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&h=875&fit=crop',
  'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=700&h=875&fit=crop',
  'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=700&h=875&fit=crop',
]

function StarRating({ val = 5 }) {
  return <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < Math.round(val) ? 'fill-amber-400 text-amber-400' : 'text-outline-variant'} />)}</div>
}

export default function Home() {
  const [service, setService] = useState('')
  const [location, setLocation] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/book?service=${service}&location=${location}`)
  }

  return (
    <div className="pt-16">
      {/* ── HERO ──────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-surface via-surface-container-low to-primary-fixed/20">
        {/* BG decorative blobs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-12 items-center py-16">
          <div className="order-2 lg:order-1 fade-up">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary-fixed px-3 py-1.5 rounded-full mb-5 tracking-widest uppercase">
              <Sparkles size={12} /> Modern Beauty Sanctuary
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-on-surface leading-tight mb-5">
              Elevate Your Beauty.<br />
              <span className="text-primary italic">AI-Powered</span> Precision,<br />
              Expert Hands.
            </h1>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-8 max-w-lg">
              Discover trusted hair and beauty professionals. Shop premium hair products. Get AI-powered beauty analysis — all in one place.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="bg-surface-container-lowest rounded-2xl shadow-ambient p-2 flex flex-col sm:flex-row gap-2 mb-8 border border-outline-variant/20">
              <div className="flex items-center gap-2 flex-1 px-3">
                <Search size={16} className="text-on-surface-variant shrink-0" />
                <input value={service} onChange={e => setService(e.target.value)} placeholder="What service do you want?" className="flex-1 bg-transparent text-sm outline-none text-on-surface placeholder:text-on-surface-variant/60 py-1" />
              </div>
              <div className="hidden sm:block w-px bg-outline-variant/30" />
              <div className="flex items-center gap-2 flex-1 px-3">
                <MapPin size={16} className="text-on-surface-variant shrink-0" />
                <input value={location} onChange={e => setLocation(e.target.value)} placeholder="City, town or postcode" className="flex-1 bg-transparent text-sm outline-none text-on-surface placeholder:text-on-surface-variant/60 py-1" />
              </div>
              <button type="submit" className="bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 active:scale-95 transition-all shrink-0">
                Search
              </button>
            </form>

            <div className="flex flex-wrap gap-3">
              <Link to="/book" className="bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 active:scale-95 transition-all shadow-ambient">
                Book a Service
              </Link>
              <Link to="/shop" className="border-[1.5px] border-primary text-primary px-6 py-3 rounded-full font-semibold text-sm hover:bg-primary/5 active:scale-95 transition-all">
                Shop Products
              </Link>
              <Link to="/ai-analyzer" className="flex items-center gap-2 text-on-surface-variant px-4 py-3 rounded-full font-medium text-sm hover:text-primary transition-colors">
                <Sparkles size={14} /> Try AI Analyzer
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-modal">
                <img src={heroImages[0]} alt="Premium hair styling" className="w-full h-full object-cover" />
              </div>
              {/* AI floating chip */}
              <div className="absolute -bottom-4 -left-4 glass-nav bg-surface/90 p-3 rounded-xl shadow-modal flex items-center gap-2.5 border border-outline-variant/20 floating">
                <div className="w-9 h-9 bg-primary-container rounded-full flex items-center justify-center shrink-0">
                  <Sparkles size={14} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-xs text-on-surface">AI Scan Active</p>
                  <p className="text-[10px] text-on-surface-variant">Optimal moisture detected</p>
                </div>
              </div>
              {/* Stats chip */}
              <div className="absolute -top-4 -right-4 bg-surface-container-lowest p-3 rounded-xl shadow-modal border border-outline-variant/20">
                <p className="text-xs font-bold text-on-surface text-center">4.9 ★</p>
                <p className="text-[10px] text-on-surface-variant">2,400+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE CATEGORIES ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-on-surface mb-2">Curated Expertises</h2>
          <div className="w-12 h-0.5 bg-primary-container mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
          {serviceCategories.map(cat => (
            <Link key={cat.id} to={`/book/${cat.id}`} className="luxury-card group flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-primary-fixed/30 transition-all">
              <div className={`w-12 h-12 ${cat.color} rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <span className="text-[11px] font-semibold text-on-surface-variant group-hover:text-primary text-center transition-colors leading-tight">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── POPULAR SERVICES ──────────────────────── */}
      <section className="bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold text-on-surface mb-2">Popular Services</h2>
              <p className="text-on-surface-variant">Book your next hair appointment with ease</p>
            </div>
            <Link to="/book" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">View all <ArrowRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.slice(0, 8).map(svc => (
              <Link key={svc.id} to={`/book/${svc.category}`} className="luxury-card bg-surface-container-lowest rounded-2xl p-4 shadow-ambient group">
                <div className="w-10 h-10 bg-primary-container/40 rounded-xl flex items-center justify-center text-xl mb-3 group-hover:bg-primary-container transition-colors">{svc.icon}</div>
                <h3 className="font-semibold text-sm text-on-surface mb-1">{svc.name}</h3>
                <p className="text-xs text-on-surface-variant mb-2 line-clamp-2">{svc.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">From £{svc.price}</span>
                  <span className="text-[10px] text-on-surface-variant">{svc.duration}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6 sm:hidden">
            <Link to="/book" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">View all services <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROVIDERS ───────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl font-bold text-on-surface mb-2">Featured Providers</h2>
            <p className="text-on-surface-variant">Verified beauty professionals near you</p>
          </div>
          <Link to="/providers" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">Browse all <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {providers.map(p => <ProviderCard key={p.id} provider={p} />)}
        </div>
      </section>

      {/* ── AI BEAUTY ANALYZER TEASER ────────────── */}
      <section className="bg-gradient-to-r from-primary-fixed/40 via-primary-container/20 to-primary-fixed/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary-fixed px-3 py-1.5 rounded-full mb-5 tracking-widest uppercase">
                <Sparkles size={12} /> AI Technology
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-on-surface mb-4">
                Your Personal <span className="text-primary italic">Beauty Intelligence</span>
              </h2>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Upload a photo and let our AI analyse your hair type, density, scalp condition, and skin tone to recommend the perfect services, products, and providers tailored specifically for you.
              </p>
              <div className="space-y-2 mb-8">
                {['Hair type & density analysis', 'Scalp health indicators', 'Personalised product recommendations', 'Provider matching'].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-primary shrink-0" />
                    <span className="text-sm text-on-surface-variant">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/ai-analyzer" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 active:scale-95 transition-all shadow-ambient">
                <Sparkles size={16} /> Try AI Analyzer Free
              </Link>
              <p className="text-xs text-on-surface-variant mt-3">Results are informational only — not medical advice.</p>
            </div>
            <div className="relative">
              <div className="aspect-square max-w-sm mx-auto rounded-[2rem] overflow-hidden shadow-modal">
                <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=500&fit=crop" alt="AI Beauty Analysis" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-4 right-0 bg-surface-container-lowest rounded-xl p-3 shadow-modal border border-outline-variant/20 max-w-[160px]">
                <div className="flex items-center gap-1 mb-1"><Sparkles size={12} className="text-primary" /><span className="text-xs font-semibold text-primary">AI Result</span></div>
                <p className="text-[10px] text-on-surface-variant">Hair Type: 4C Natural</p>
                <p className="text-[10px] text-on-surface-variant">Moisture: Low</p>
                <p className="text-[10px] text-primary font-medium mt-1">→ Deep conditioning recommended</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SHOP PREVIEW ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl font-bold text-on-surface mb-2">Shop Premium Hair</h2>
            <p className="text-on-surface-variant">Wigs, bundles, treatments & more</p>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">Browse shop <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────── */}
      <section className="bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-on-surface mb-2">How Booking Works</h2>
            <p className="text-on-surface-variant">From search to styled in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', icon: '🔍', title: 'Search', desc: 'Choose your service and location' },
              { step: '02', icon: '👤', title: 'Pick a Provider', desc: 'Browse verified profiles and portfolios' },
              { step: '03', icon: '📅', title: 'Book', desc: 'Select your date, time and confirm' },
              { step: '04', icon: '✨', title: 'Get Styled', desc: 'Enjoy your appointment and leave a review' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="w-16 h-16 bg-primary-container/30 rounded-2xl flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">{item.step}</span>
                </div>
                <h3 className="font-semibold text-sm text-on-surface mb-1">{item.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REFERRAL BANNER ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-r from-primary to-on-primary-container rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/5 rounded-full" />
          <h2 className="font-display text-2xl lg:text-3xl font-bold mb-3 relative z-10">Give £10, Get £10</h2>
          <p className="text-white/80 mb-6 max-w-md mx-auto relative z-10">Refer a friend to Rejuveefy and you both get £10 credit to spend on services or products.</p>
          <Link to="/referrals" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity relative z-10">
            Start Referring
          </Link>
        </div>
      </section>

      {/* ── BECOME A PROVIDER ────────────────────── */}
      <section className="bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-video lg:aspect-square rounded-3xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&h=600&fit=crop" alt="Become a provider" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-xs font-semibold text-primary bg-primary-fixed px-3 py-1.5 rounded-full mb-5 inline-block tracking-widest uppercase">For Professionals</span>
              <h2 className="font-display text-3xl font-bold text-on-surface mb-4">Grow Your Beauty Business</h2>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Join thousands of hair and beauty professionals on Rejuveefy. Manage your bookings, showcase your portfolio, and reach new clients — all in one platform.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {['Flexible scheduling', 'Instant payments', 'Client reviews', 'Business analytics', 'Portfolio showcase', 'Mobile app'].map(b => (
                  <div key={b} className="flex items-center gap-2"><CheckCircle size={14} className="text-primary shrink-0" /><span className="text-sm text-on-surface-variant">{b}</span></div>
                ))}
              </div>
              <Link to="/become-provider" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
                Apply to Join
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST SECTION ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { val: '12K+', label: 'Happy Clients' },
            { val: '850+', label: 'Verified Providers' },
            { val: '4.9', label: 'Average Rating' },
            { val: '98%', label: 'Booking Success Rate' },
          ].map(stat => (
            <div key={stat.label} className="bg-surface-container-low rounded-2xl p-6">
              <p className="font-display text-3xl font-bold text-primary mb-1">{stat.val}</p>
              <p className="text-sm text-on-surface-variant">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
