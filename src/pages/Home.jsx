import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Star, ArrowRight, ShieldCheck, Sparkles, ChevronRight, MapPin, Heart, ShoppingBag, Play, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { fetchProviders, fetchProducts } from '../lib/db'
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
  { label: 'Braids', icon: '🧶', path: '/book/braids' },
  { label: 'Locs', icon: '🌿', path: '/book/locks' },
  { label: 'Wig Install', icon: '👑', path: '/book/wig-install' },
  { label: 'Hair Styling', icon: '✂️', path: '/book/hair-styling' },
  { label: 'Skin Care', icon: '✨', path: '/shop/skin-care' },
  { label: 'Makeup', icon: '💄', path: '/book/makeup' },
  { label: 'Treatments', icon: '💆', path: '/book/hair-treatments' },
  { label: 'Barbers', icon: '🪒', path: '/book/barbers' },
]

const stats = [
  { value: '100+', label: 'Happy Clients' },
  { value: '5', label: 'Expert Providers' },
  { value: '4.9', label: 'Average Rating' },
  { value: '98%', label: 'Satisfaction Rate' },
]

const howItWorks = [
  { step: '01', title: 'Search & Discover', desc: 'Find verified hair and beauty experts near you by service, location, or availability.', icon: '🔍' },
  { step: '02', title: 'Book Instantly', desc: 'Choose your date, time and service. Confirm your booking in under 60 seconds.', icon: '📅' },
  { step: '03', title: 'Experience Beauty', desc: 'Sit back and enjoy a flawless service from a trusted, vetted professional.', icon: '✨' },
]

const testimonials = [
  { name: 'Amara O.', role: 'Regular Client', text: 'Found the most amazing braider through Rejuveefy. My knotless braids lasted 8 weeks and the experience was 10/10.', rating: 5, avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face' },
  { name: 'Destiny K.', role: 'Loyal Customer', text: 'The AI hair analyser recommended the perfect routine for my 4C hair. My hair has never been healthier!', rating: 5, avatar: 'https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=80&h=80&fit=crop&crop=face' },
  { name: 'Fatima B.', role: 'VIP Member', text: 'Booked a last-minute wig install and the provider arrived on time, fully prepared. Absolutely seamless.', rating: 5, avatar: 'https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?w=80&h=80&fit=crop&crop=face' },
]

export default function Home() {
  const [query, setQuery] = useState('')
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

  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF0F5] via-white to-[#FFF8FB] min-h-[92vh] flex items-center">
        {/* decorative blobs */}
        <div className="absolute top-[-80px] right-[-80px] w-[520px] h-[520px] rounded-full bg-pink-100/60 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-60px] w-[320px] h-[320px] rounded-full bg-rose-100/50 blur-2xl pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-0">

          {/* Left */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-6 z-10">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white border border-pink-200 text-pink-600 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm w-fit">
              <Sparkles size={13} />
              UK's #1 Hair &amp; Beauty Marketplace
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="font-display font-bold text-[52px] lg:text-[64px] leading-[1.08] text-gray-900">
              Your Hair.<br />
              <span className="text-pink-500">Your Beauty.</span><br />
              Your Way.
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-gray-500 text-lg leading-relaxed max-w-[460px]">
              Discover and instantly book verified hair stylists, beauty experts and natural hair specialists near you — or shop premium products delivered to your door.
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
                {['photo-1531746020798-e6953c6e8e04','photo-1523264653568-d3d4032d1476','photo-1499557354967-2b2d8910bcca','photo-1489424731084-a5d8b219a5bb'].map((id,i) => (
                  <img key={i} src={`https://images.unsplash.com/${id}?w=36&h=36&fit=crop&crop=face`} className="w-9 h-9 rounded-full border-2 border-white object-cover" alt="" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <Stars val={5} size={13} />
                  <span className="text-sm font-bold text-gray-800">4.9</span>
                </div>
                <p className="text-xs text-gray-500">Trusted by 100+ clients</p>
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
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Floating card 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -left-8 top-16 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-50"
            >
              <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-lg">✅</div>
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
              <p className="text-xs text-gray-500 mb-1">Next available</p>
              <p className="text-sm font-bold text-gray-800">Tomorrow 10:00 AM</p>
              <div className="mt-2 bg-pink-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg text-center">Book Now</div>
            </motion.div>

            {/* Floating card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute left-4 -bottom-5 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-50"
            >
              <div className="flex -space-x-1.5">
                {['photo-1531746020798-e6953c6e8e04','photo-1523264653568-d3d4032d1476'].map((id,i) => (
                  <img key={i} src={`https://images.unsplash.com/${id}?w=28&h=28&fit=crop&crop=face`} className="w-7 h-7 rounded-full border-2 border-white" alt="" />
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">5 Experts</p>
                <Stars val={5} size={11} />
              </div>
            </motion.div>
          </motion.div>
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
                  <div className="w-14 h-14 bg-pink-50 group-hover:bg-pink-100 rounded-2xl flex items-center justify-center text-2xl transition-colors shadow-sm">
                    {ql.icon}
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
              <p className="text-pink-500 text-sm font-semibold uppercase tracking-wider mb-2">Top Rated</p>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900">Featured Providers</h2>
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
                  <Link to={`/providers/${p.id}`}>
                    <div className="relative h-52 overflow-hidden">
                      <img src={p.avatar || `https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop`}
                        alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {p.verified && (
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-green-600 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle size={11} /> Verified
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-0.5">{p.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{p.specialty || 'Hair Specialist'}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <Stars val={p.rating || 4.9} size={12} />
                        <span className="text-xs font-semibold text-gray-700">{p.rating || '4.9'}</span>
                        <span className="text-xs text-gray-400">({p.review_count || '128'})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin size={12} /> {p.location || 'London, UK'}
                        </div>
                        <span className="text-pink-500 text-xs font-bold">From £{p.min_price || '35'}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Amara Johnson', spec: 'Braids & Natural Hair', rating: 4.9, reviews: 238, location: 'London, UK', price: 45, img: 'photo-1531746020798-e6953c6e8e04' },
                { name: 'Kezia Williams', spec: 'Locs Specialist', rating: 4.8, reviews: 184, location: 'Manchester, UK', price: 55, img: 'photo-1523264653568-d3d4032d1476' },
                { name: 'Temi Ade', spec: 'Wig Installation', rating: 5.0, reviews: 312, location: 'Birmingham, UK', price: 80, img: 'photo-1499557354967-2b2d8910bcca' },
                { name: 'Naomi Clarke', spec: 'Hair Stylist & MUA', rating: 4.9, reviews: 97, location: 'Leeds, UK', price: 60, img: 'photo-1489424731084-a5d8b219a5bb' },
              ].map((p, i) => (
                <motion.div key={i} variants={cardItem} whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group">
                  <Link to="/providers">
                    <div className="relative h-52 overflow-hidden">
                      <img src={`https://images.unsplash.com/${p.img}?w=400&h=300&fit=crop&crop=face`}
                        alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-green-600 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle size={11} /> Verified
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-0.5">{p.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{p.spec}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <Stars val={p.rating} size={12} />
                        <span className="text-xs font-semibold text-gray-700">{p.rating}</span>
                        <span className="text-xs text-gray-400">({p.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin size={12} /> {p.location}
                        </div>
                        <span className="text-pink-500 text-xs font-bold">From £{p.price}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
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
              <Sparkles size={13} /> Powered by AI
            </span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-white leading-tight mb-5">
              Meet <span className="text-pink-400">Reja</span> —<br />Your AI Beauty Advisor
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
              Try Reja Free <ArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="relative hidden lg:block">
            <div className="rounded-3xl overflow-hidden h-[420px] relative">
              <img src="https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&h=500&fit=crop&crop=center"
                alt="AI Beauty Analysis" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
              <p className="text-white text-xs font-bold mb-2">✨ Reja Analysis Complete</p>
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
            {(products.length > 0 ? products : [
              { id:1, name: 'Jamaican Black Castor Oil', brand: 'Tropic Isle', price: 12.99, rating: 4.8, img: 'photo-1571781926291-c477ebfd024b', category: 'Hair Care' },
              { id:2, name: 'Curl Defining Cream', brand: 'Shea Moisture', price: 9.49, rating: 4.9, img: 'photo-1596755389378-c31d21fd1273', category: 'Styling' },
              { id:3, name: 'Deep Conditioning Mask', brand: 'Cantu', price: 7.99, rating: 4.7, img: 'photo-1556228578-8c89e6adf883', category: 'Treatment' },
              { id:4, name: 'Edge Control Gel', brand: 'Got2B', price: 5.99, rating: 4.6, img: 'photo-1571019613454-1cb2f99b2d8b', category: 'Styling' },
            ]).map((p, i) => (
              <motion.div key={p.id || i} variants={cardItem} whileHover={{ y: -5 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group">
                <div className="relative h-52 bg-gray-50 overflow-hidden">
                  <img
                    src={p.image_url || `https://images.unsplash.com/${p.img}?w=300&h=280&fit=crop`}
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
                    <span className="text-[11px] text-gray-500">({p.review_count || Math.floor(Math.random()*200+50)})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">£{Number(p.price).toFixed(2)}</span>
                    <button onClick={() => addToCart({ ...p, id: p.id || i })}
                      className="flex items-center gap-1.5 bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors">
                      <ShoppingBag size={12} /> Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
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
                <div className="text-5xl mb-5 mt-2">{h.icon}</div>
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
            <p className="text-pink-100 text-lg">Join our growing community of providers earning more with Rejuveefy. Free to join, no commission on your first 10 bookings.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/providers-portal" className="bg-white text-pink-500 font-bold px-8 py-4 rounded-xl hover:bg-pink-50 transition-colors shadow-lg">
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
          <p className="text-gray-400 mb-8">Join 8,000+ subscribers for weekly hair care tips, exclusive deals and new provider highlights.</p>
          <form className="flex gap-2 max-w-[440px] mx-auto" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address"
              className="flex-1 bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 text-sm px-4 py-3.5 rounded-xl outline-none focus:border-pink-500 transition-colors" />
            <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-3.5 rounded-xl transition-colors shrink-0">
              Subscribe
            </button>
          </form>
          <p className="text-gray-600 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

    </div>
  )
}
