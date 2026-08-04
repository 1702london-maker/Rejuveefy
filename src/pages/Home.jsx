import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Star, ArrowRight, ShieldCheck, Sparkles, ChevronRight, MapPin, Heart, ShoppingBag, CheckCircle, Scissors, Leaf, Crown, WandSparkles, Palette, HandHeart, Droplets, GraduationCap } from 'lucide-react'
import { motion } from 'framer-motion'
import { fetchProviders, fetchProducts, subscribeNewsletter } from '../lib/db'
import { useApp } from '../context/AppContext'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const cardItem = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
}

function Stars({ val = 5, size = 13 }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} className={i <= Math.round(val) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
      ))}
    </div>
  )
}

const quickLinks = [
  { label: 'Braids', icon: Scissors, path: '/book/braids' },
  { label: 'Locs', icon: Leaf, path: '/book/locks' },
  { label: 'Wig Install', icon: Crown, path: '/book/wig-install' },
  { label: 'Hair Styling', icon: WandSparkles, path: '/book/hair-styling' },
  { label: 'Skin Care', icon: Droplets, path: '/shop/skin-care' },
  { label: 'Makeup', icon: Palette, path: '/book/makeup' },
  { label: 'Treatments', icon: HandHeart, path: '/book/hair-treatments' },
  { label: 'Training', icon: GraduationCap, path: '/training' },
]

const stats = [
  { value: 'UK', label: 'Beauty Marketplace' },
  { value: 'AI', label: 'Beauty Analysis' },
  { value: '24/7', label: 'Online Booking' },
  { value: 'Secure', label: 'Client Accounts' },
]

const howItWorks = [
  { step: '01', title: 'Search & Discover', desc: 'Find approved services, products and provider profiles as they become available.', icon: Search },
  { step: '02', title: 'Book Securely', desc: 'Choose a service, sign in, and manage your booking from your Rejuveefy account.', icon: ShieldCheck },
  { step: '03', title: 'Stay Connected', desc: 'Track appointments, referrals, provider applications and affiliate status from one place.', icon: Sparkles },
]

const testimonials = [
  { name: 'Client account', role: 'Booking flow', text: 'Clients can create an account, choose services, and manage appointments from the dashboard.', rating: 5, avatar: '/assets/hero-beauty.png' },
  { name: 'AI analyser', role: 'Beauty tech', text: 'The analyser supports personalised hair and beauty guidance from uploaded photos.', rating: 5, avatar: '/assets/spa-interior.png' },
  { name: 'Provider setup', role: 'Portal flow', text: 'Providers can register now, with verified profiles and service details prepared before going live.', rating: 5, avatar: '/assets/wellness-lifestyle.png' },
]

export default function Home() {
  const [query, setQuery] = useState('')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterDone, setNewsletterDone] = useState(false)
  const [providers, setProviders] = useState([])
  const [products, setProducts] = useState([])
  const { addToCart, toggleWishlist, inWishlist } = useApp()
  const navigate = useNavigate()

  useEffect(() => {
    fetchProviders({ featured: true, limit: 4 }).then(setProviders).catch(() => {})
    fetchProducts({ featured: true, limit: 4 }).then(setProducts).catch(() => {})
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) navigate(`/book?service=${query}`)
    else navigate('/book')
  }

  const handleNewsletter = async (e) => {
    e.preventDefault()
    if (!newsletterEmail) return
    try {
      await subscribeNewsletter(newsletterEmail)
      setNewsletterDone(true)
      setNewsletterEmail('')
    } catch {
      setNewsletterDone(false)
    }
  }

  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF0F5] via-white to-[#FFF8FB] min-h-[92vh] flex items-center">
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-0">

          {/* Left */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-6 z-10">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white border border-pink-200 text-pink-600 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm w-fit">
              <Sparkles size={13} />
              Beauty-tech marketplace for bookings, products and AI guidance
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="font-display font-bold text-[52px] lg:text-[64px] leading-[1.08] text-gray-900">
              Your Hair.<br />
              <span className="text-pink-500">Your Beauty.</span><br />
              Your Way.
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-gray-500 text-lg leading-relaxed max-w-[460px]">
              Discover Rejuveefy services, book Maye, join the verified provider directory, apply as an affiliate, or shop curated beauty products.
            </motion.p>

            {/* Search bar */}
            <motion.div variants={fadeUp} custom={3}>
              <form onSubmit={handleSearch} className="flex items-center gap-0 bg-white rounded-2xl shadow-lg border border-gray-100 p-1.5 max-w-[500px]">
                <div className="flex items-center gap-2 flex-1 px-3">
                  <Search size={17} className="text-gray-400 shrink-0" />
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search services, providers, products..."
                    className="flex-1 text-sm text-gray-700 outline-none bg-transparent placeholder:text-gray-400 py-1"
                  />
                </div>
                <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors shrink-0">
                  Search
                </button>
              </form>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-3">
              <Link to="/book" className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors flex items-center gap-2 shadow-md shadow-pink-200">
                Book a Service <ArrowRight size={16} />
              </Link>
              <Link to="/shop" className="bg-white border border-gray-200 hover:border-pink-300 text-gray-800 font-semibold px-7 py-3.5 rounded-xl transition-colors flex items-center gap-2">
                Shop Products
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={fadeUp} custom={5} className="flex items-center gap-4 pt-1">
              <div className="flex -space-x-2">
                {['/assets/hero-beauty.png','/assets/spa-interior.png','/assets/wellness-lifestyle.png','/assets/hair-product.png'].map((src,i) => (
                  <img key={i} src={src} className="w-9 h-9 rounded-full border-2 border-white object-cover" alt="" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <Stars val={5} size={13} />
                  <span className="text-sm font-bold text-gray-800">4.9</span>
                </div>
                <p className="text-xs text-gray-500">Designed for verified bookings</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — real beauty image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden h-[600px] shadow-2xl">
              <img
                src="/assets/hero-beauty.png"
                alt="Beautiful natural hair"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Floating card 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -left-8 top-16 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-50"
            >
              <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-pink-500"><ShieldCheck size={18} /></div>
              <div>
                <p className="text-xs font-bold text-gray-800">Background Verified</p>
                <p className="text-[11px] text-gray-500">All providers checked</p>
              </div>
            </motion.div>

            {/* Floating card 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="absolute -right-6 bottom-24 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-50"
            >
              <p className="text-xs text-gray-500 mb-1">Founder booking</p>
              <p className="text-sm font-bold text-gray-800">Book Maye directly</p>
              <Link to="/book/maye" className="block mt-2 bg-pink-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg text-center">Book Now</Link>
            </motion.div>

            {/* Floating card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute left-4 -bottom-5 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-50"
            >
              <div className="flex -space-x-1.5">
                {['/assets/hero-beauty.png','/assets/spa-interior.png'].map((src,i) => (
                  <img key={i} src={src} className="w-7 h-7 rounded-full border-2 border-white object-cover" alt="" />
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Provider applications</p>
                <p className="text-[11px] text-gray-500">Reviewed before approval</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── BOOK MAYE BANNER ───────────────────────────────────────── */}
      <section className="bg-white py-8 sm:py-10 border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <Link to="/book/maye"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 lg:p-10 hover:shadow-2xl transition-all duration-300 border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl bg-gradient-to-br from-amber-900 to-amber-700 flex items-center justify-center text-5xl lg:text-6xl border-2 border-white/10 shadow-2xl">
                👩🏾
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full border-2 border-gray-900 flex items-center justify-center shadow-lg">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
            </div>
            {/* Copy */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3">
                <span className="text-[10px] font-black bg-pink-500 text-white px-3 py-1.5 rounded-full tracking-widest uppercase">✨ Founder's Studio</span>
                <span className="text-[10px] font-bold bg-white/10 text-white/80 px-3 py-1.5 rounded-full">10+ Years</span>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full">● Available Now</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-2">
                Book Maye<br className="hidden sm:block" />
                <span className="text-pink-400"> Hair & Makeup Artist</span>
              </h2>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-xl mb-4">
                The founder of Rejuveefy takes personal bookings. Braids, cornrows, dreadlocks, bridal hair, wig styling, and makeup — across Southampton, Portsmouth & London.
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {['Braiding','Cornrows','Dreadlocks','Makeup','Wig Styling','Bridal'].map(t => (
                  <span key={t} className="text-[11px] bg-white/8 border border-white/10 text-white/60 px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>
            {/* CTA */}
            <div className="shrink-0 flex flex-col items-center gap-2">
              <span className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-400 text-white font-black text-sm sm:text-base px-8 py-4 rounded-2xl transition-all group-hover:scale-105 shadow-xl">
                Book Now →
              </span>
              <span className="text-[10px] text-white/30">50% deposit · Instant confirmation</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────── */}
      <section className="bg-gray-900 py-10">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="text-center">
              <p className="text-3xl font-display font-bold text-pink-400">{s.value}</p>
              <p className="text-gray-400 text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── QUICK ACCESS STRIP ─────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-4 sm:grid-cols-8 gap-4">
            {quickLinks.map((ql) => (
              <motion.div key={ql.label} variants={cardItem}>
                <Link to={ql.path}
                  className="flex flex-col items-center gap-2.5 group p-3 rounded-2xl hover:bg-pink-50 transition-colors">
                  <div className="w-14 h-14 bg-pink-50 group-hover:bg-pink-100 rounded-2xl flex items-center justify-center text-pink-500 transition-colors shadow-sm">
                    <ql.icon size={24} />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 group-hover:text-pink-500 transition-colors text-center">{ql.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PROVIDERS ─────────────────────────────────────── */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-pink-500 text-sm font-semibold uppercase tracking-wider mb-2">Verified Directory</p>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900">Approved Providers</h2>
            </div>
            <Link to="/providers" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-pink-500 hover:text-pink-600 transition-colors">
              View All <ChevronRight size={16} />
            </Link>
          </div>

          {providers.length > 0 ? (
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {providers.map(p => (
                <motion.div key={p.id} variants={cardItem}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group">
                  <Link to={`/providers/${p.slug || p.id}`}>
                    <div className="relative h-52 overflow-hidden">
                      <img src={p.avatar || p.image || '/assets/hero-beauty.png'}
                        alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {p.verified && (
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-green-600 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle size={11} /> Verified
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-0.5">{p.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{p.specialty || p.speciality || 'Beauty Professional'}</p>
                      <div className="flex items-center gap-2 mb-3">
                        {p.rating ? (
                          <>
                            <Stars val={p.rating} size={12} />
                            <span className="text-xs font-semibold text-gray-700">{p.rating}</span>
                            <span className="text-xs text-gray-400">({p.review_count || 0})</span>
                          </>
                        ) : (
                          <span className="text-xs font-semibold text-pink-500 bg-pink-50 px-2 py-1 rounded-full">New profile</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin size={12} /> {p.location || 'Location to be confirmed'}
                        </div>
                        <span className="text-pink-500 text-xs font-bold">From GBP {p.min_price || p.price_from || 0}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="bg-white border border-dashed border-pink-200 rounded-2xl p-8 text-center">
              <CheckCircle size={34} className="text-pink-400 mx-auto mb-3" />
              <h3 className="font-display text-xl font-bold text-gray-900 mb-2">Provider profiles are being verified</h3>
              <p className="text-sm text-gray-500 max-w-xl mx-auto mb-5">
                The directory will show real approved professionals only. For now, clients can book Maye directly or providers can apply to join.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/book/maye" className="bg-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-pink-600 transition-colors">
                  Book Maye
                </Link>
                <Link to="/my-portal" className="border border-pink-200 text-pink-600 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-pink-50 transition-colors">
                  Apply as Provider
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── AI BEAUTY ANALYSER ─────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(233,30,99,0.15),_transparent_60%)]" />
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-pink-500/20 text-pink-400 text-xs font-bold px-4 py-1.5 rounded-full mb-5">
              <Sparkles size={13} /> Meet Your Beauty Advisor
            </span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-white leading-tight mb-5">
              Meet <span className="text-pink-400">Dora</span> —<br />Your AI Beauty Advisor
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Upload a photo and get a personalised hair health report, product recommendations, and a routine crafted for your unique hair type.
            </p>
            <div className="flex flex-col gap-3 mb-8">
              {['Instant hair type & porosity analysis','Personalised product recommendations','Custom care routine in seconds'].map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="w-5 h-5 rounded-full bg-pink-500/30 flex items-center justify-center shrink-0">
                    <CheckCircle size={12} className="text-pink-400" />
                  </div>
                  {f}
                </div>
              ))}
            </div>
            <Link to="/ai-beauty/hair" className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-pink-900/30">
              Try Dora Free <ArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="relative hidden lg:block">
            <div className="rounded-3xl overflow-hidden h-[420px] relative">
              <img src="/assets/laboratory.png"
                alt="AI Beauty Analysis" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
              <p className="text-white text-xs font-bold mb-2">✨ Dora Analysis Complete</p>
              <div className="flex gap-2 flex-wrap">
                {['4C Hair Type','Low Porosity','Needs Moisture'].map(t => (
                  <span key={t} className="bg-pink-500/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SHOP SECTION ───────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-pink-500 text-sm font-semibold uppercase tracking-wider mb-2">Our Store</p>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900">Shop Best Sellers</h2>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-pink-500 hover:text-pink-600 transition-colors">
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p, i) => (
              <motion.div key={p.id || i} variants={cardItem} whileHover={{ y: -5 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group">
                <div className="relative h-52 bg-gray-50 overflow-hidden">
                  <img
                    src={p.image_url || p.img}
                    alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button
                    onClick={() => toggleWishlist(p)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-pink-50 transition-colors">
                    <Heart size={14} className={inWishlist(p.id) ? 'fill-pink-500 text-pink-500' : 'text-gray-400'} />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-[11px] text-pink-500 font-semibold uppercase tracking-wide mb-1">{p.category || p.brand}</p>
                  <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">{p.name}</h3>
                  <div className="flex items-center gap-1.5 mb-3">
                    <Stars val={p.rating || 4.8} size={11} />
                    <span className="text-[11px] text-gray-500">({p.review_count || 0})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">GBP {Number(p.price).toFixed(2)}</span>
                    <button onClick={() => addToCart({ ...p, id: p.id || i })}
                      className="flex items-center gap-1.5 bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors">
                      <ShoppingBag size={12} /> Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            {products.length === 0 && (
              <div className="col-span-full bg-[#FAFAFA] border border-dashed border-pink-200 rounded-2xl p-8 text-center">
                <ShoppingBag size={34} className="text-pink-400 mx-auto mb-3" />
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">Products are being prepared</h3>
                <p className="text-sm text-gray-500 max-w-xl mx-auto">
                  Best sellers will appear here as the shop catalogue is prepared.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-pink-500 text-sm font-semibold uppercase tracking-wider mb-3">Simple Process</p>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900">How Rejuveefy Works</h2>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-8">
            {howItWorks.map((h, i) => (
              <motion.div key={h.step} variants={cardItem}
                className="relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                  {h.step}
                </div>
                <div className="w-14 h-14 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-5 mt-2">
                  <h.icon size={24} />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">{h.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-pink-500 text-sm font-semibold uppercase tracking-wider mb-3">Client Love</p>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900">What Our Clients Say</h2>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={cardItem}
                className="bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100">
                <Stars val={t.rating} size={14} />
                <p className="text-gray-700 text-sm leading-relaxed my-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROVIDER CTA BANNER ────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-rose-500">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-white mb-3">Are You a Beauty Professional?</h2>
            <p className="text-pink-100 text-lg">Apply to join the verified Rejuveefy directory. Applications are reviewed before profiles go live.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/my-portal" className="bg-white text-pink-500 font-bold px-8 py-4 rounded-xl hover:bg-pink-50 transition-colors shadow-lg">
              Join as Provider
            </Link>
            <Link to="/about" className="border border-white/50 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ─────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <p className="text-pink-400 text-sm font-semibold uppercase tracking-wider mb-3">Stay in the Loop</p>
          <h2 className="font-display font-bold text-3xl text-white mb-3">Get Beauty Tips & Offers</h2>
          <p className="text-gray-400 mb-8">Get hair care tips, product updates and Rejuveefy news.</p>
          <form className="flex gap-2 max-w-[440px] mx-auto" onSubmit={handleNewsletter}>
            <input type="email" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} placeholder="Enter your email address"
              className="flex-1 bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 text-sm px-4 py-3.5 rounded-xl outline-none focus:border-pink-500 transition-colors" />
            <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-3.5 rounded-xl transition-colors shrink-0">
              Subscribe
            </button>
          </form>
          {newsletterDone && <p className="text-pink-300 text-xs mt-4">You are subscribed.</p>}
          <p className="text-gray-600 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

    </div>
  )
}
