import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Search, MapPin, Star, ShieldCheck, Heart, ChevronDown, SlidersHorizontal, ArrowRight, Phone, Mail, Globe, Clock, CheckCircle, Calendar, MessageCircle, Share2, Flag } from 'lucide-react'
import { providers } from '../data/mockData'

function Stars({ val = 5, size = 12 }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} className={i <= Math.round(val) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
      ))}
    </div>
  )
}

// ── PROVIDER DIRECTORY ────────────────────────────────────────────────────────
export default function Providers() {
  const [q, setQ] = useState('')
  const [loc, setLoc] = useState('')
  const [sortBy, setSortBy] = useState('Top Rated')
  const [filters, setFilters] = useState({ category: [], rating: '', priceMax: 300 })

  const filtered = providers.filter(p =>
    (!q || p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase())) &&
    (!loc || p.city.toLowerCase().includes(loc.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-5">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <p className="text-xs text-gray-400 mb-2">
            <Link to="/" className="hover:text-pink-500">Home</Link>
            <span className="mx-1.5">›</span>
            <span>Providers</span>
          </p>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Find the Perfect Beauty Expert</h1>
          <p className="text-sm text-gray-500 mb-4">Discover verified hair and beauty professionals near you</p>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
              <Search size={15} className="text-gray-400" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or service..."
                className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder:text-gray-400" />
            </div>
            <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
              <MapPin size={15} className="text-gray-400" />
              <input value={loc} onChange={e => setLoc(e.target.value)} placeholder="Enter city or postcode"
                className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder:text-gray-400" />
            </div>
            <button className="bg-pink-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-pink-600 transition-colors">
              Find Providers
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Filters sidebar */}
          <aside className="hidden lg:block">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2"><SlidersHorizontal size={14} /> Filters</h3>
                <button className="text-xs text-pink-500">Clear all</button>
              </div>

              <div className="space-y-5">
                {/* Category */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Category</h4>
                  {['Hair Specialist', 'Braider', 'Makeup Artist', 'Lash Tech', 'Facialist', 'Nail Tech', 'Barber', 'Beauty Therapist'].map(c => (
                    <label key={c} className="flex items-center gap-2 py-1.5 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 accent-pink-500 rounded" />
                      <span className="text-sm text-gray-600">{c}</span>
                    </label>
                  ))}
                </div>

                {/* Location type */}
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Service Type</h4>
                  {['At My Salon', 'Mobile Service', 'At Your Home'].map(t => (
                    <label key={t} className="flex items-center gap-2 py-1.5 cursor-pointer">
                      <input type="radio" name="loctype" className="w-4 h-4 accent-pink-500" />
                      <span className="text-sm text-gray-600">{t}</span>
                    </label>
                  ))}
                </div>

                {/* Price */}
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Price Range</h4>
                  <input type="range" min={0} max={300} defaultValue={150} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1"><span>£0</span><span>£300+</span></div>
                </div>

                {/* Rating */}
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Availability</h4>
                  {['Today', 'This Week', 'This Weekend', 'Any Time'].map(a => (
                    <label key={a} className="flex items-center gap-2 py-1.5 cursor-pointer">
                      <input type="radio" name="avail" className="w-4 h-4 accent-pink-500" />
                      <span className="text-sm text-gray-600">{a}</span>
                    </label>
                  ))}
                </div>

                {/* Languages */}
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Language Spoken</h4>
                  {['English', 'French', 'Yoruba', 'Twi', 'Portuguese'].map(l => (
                    <label key={l} className="flex items-center gap-2 py-1.5 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 accent-pink-500 rounded" />
                      <span className="text-sm text-gray-600">{l}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full mt-4 bg-pink-500 text-white py-2.5 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors">
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                <strong className="text-gray-800">{filtered.length},700+ Providers</strong> found
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Sort by:</span>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  className="text-sm border border-gray-200 rounded-xl px-3 py-1.5 outline-none focus:border-pink-400">
                  <option>Top Rated</option>
                  <option>Most Reviews</option>
                  <option>Price: Low to High</option>
                  <option>Nearest First</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filtered.map((p) => (
                <div key={p.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-card card-hover">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-56 lg:w-64 relative shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-48 sm:h-full object-cover" />
                      {p.verified && (
                        <span className="absolute top-3 left-3 bg-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                          <ShieldCheck size={10} /> Verified
                        </span>
                      )}
                      <button className="absolute top-3 right-3 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center">
                        <Heart size={14} className="text-gray-400" />
                      </button>
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-base leading-tight">{p.name}</h3>
                          <p className="text-xs text-gray-500">{p.category}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-lg font-bold text-pink-500">£{p.startingPrice}</p>
                          <p className="text-xs text-gray-400">starting from</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-1">
                          <Stars val={p.rating} size={12} />
                          <span className="text-xs font-bold text-gray-700">{p.rating}</span>
                          <span className="text-xs text-gray-400">({p.reviews} reviews)</span>
                        </div>
                        {p.topRated && (
                          <span className="text-[10px] font-semibold bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">Top Rated</span>
                        )}
                      </div>

                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{p.bio}</p>

                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                        <MapPin size={12} className="text-pink-400" />
                        {p.city}
                        <span className="mx-1">·</span>
                        {p.location}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.tags?.slice(0, 4).map(t => (
                          <span key={t} className="text-[10px] bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Link to={`/providers/${p.slug}`}
                          className="bg-pink-500 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-pink-600 transition-colors">
                          View Profile
                        </Link>
                        <Link to={`/providers/${p.slug}/book`}
                          className="border border-pink-500 text-pink-500 text-xs font-semibold px-4 py-2 rounded-full hover:bg-pink-50 transition-colors">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust footer */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100">
              {[
                { icon: '✓', label: 'Verified Professionals', sub: 'All providers ID-checked' },
                { icon: '⭐', label: 'Quality Assurance', sub: 'Regular rating reviews' },
                { icon: '🛡️', label: 'Secure Booking', sub: 'Stripe-secured payments' },
                { icon: '💜', label: 'Brand Reputation', sub: '10,000+ happy clients' },
              ].map((t) => (
                <div key={t.label} className="text-center p-3">
                  <div className="text-xl mb-1">{t.icon}</div>
                  <p className="text-xs font-semibold text-gray-800">{t.label}</p>
                  <p className="text-[10px] text-gray-400">{t.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── PROVIDER PROFILE ──────────────────────────────────────────────────────────
export function ProviderProfile() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const provider = providers.find(p => p.slug === slug) || providers[0]
  const [tab, setTab] = useState('About')
  const [liked, setLiked] = useState(false)

  const tabs = ['About', 'Services & Pricing', 'Portfolio', `Reviews (${provider.reviews})`, 'Location']

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 pt-4 pb-2">
        <p className="text-xs text-gray-400">
          <Link to="/" className="hover:text-pink-500">Home</Link>
          <span className="mx-1.5">›</span>
          <Link to="/providers" className="hover:text-pink-500">Providers</Link>
          <span className="mx-1.5">›</span>
          <span className="text-gray-600">{provider.name}</span>
        </p>
      </div>

      {/* Profile header */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 pb-6">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Left: full profile */}
          <div>
            {/* Profile card */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-card mb-6">
              {/* Banner */}
              <div className="h-32 bg-gradient-to-r from-pink-200 to-pink-100 relative">
                {provider.banner && <img src={provider.banner} alt="" className="w-full h-full object-cover opacity-60" />}
              </div>
              <div className="px-5 pb-5">
                <div className="flex items-end gap-4 -mt-10 mb-3">
                  <img src={provider.image} alt={provider.name} className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-card" />
                  <div className="mb-1">
                    <div className="flex items-center gap-2">
                      <h1 className="font-display text-xl font-bold text-gray-900">{provider.name}</h1>
                      {provider.verified && <ShieldCheck size={16} className="text-pink-500" />}
                    </div>
                    <p className="text-sm text-gray-500">{provider.category}</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <button onClick={() => setLiked(!liked)} className={`p-2 rounded-xl border transition-colors ${liked ? 'border-pink-500 bg-pink-50 text-pink-500' : 'border-gray-200 text-gray-400 hover:border-pink-300'}`}>
                      <Heart size={16} className={liked ? 'fill-pink-500' : ''} />
                    </button>
                    <button className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:border-pink-300 transition-colors">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-1.5">
                    <Stars val={provider.rating} size={13} />
                    <span className="text-sm font-bold text-gray-800">{provider.rating}</span>
                    <span className="text-xs text-gray-400">({provider.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin size={13} className="text-pink-400" />
                    {provider.city}
                  </div>
                  {provider.topRated && (
                    <span className="text-[10px] font-semibold bg-amber-100 text-amber-600 px-2 py-1 rounded-full flex items-center gap-1">
                      ⭐ Top Rated
                    </span>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {provider.tags?.map(t => (
                    <span key={t} className="text-[11px] bg-pink-50 text-pink-600 px-2.5 py-1 rounded-full border border-pink-100">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-100 mb-6 overflow-x-auto">
              <div className="flex gap-0 min-w-max">
                {tabs.map(t => (
                  <button key={t} onClick={() => setTab(t.split(' ')[0])}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap
                      ${tab === t.split(' ')[0] ? 'border-pink-500 text-pink-500' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* About tab */}
            {tab === 'About' && (
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-3">About {provider.name}</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{provider.bio}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {[
                    { v: `${provider.reviews}+`, l: 'Happy Clients' },
                    { v: '100%', l: 'Positive Reviews' },
                    { v: `${provider.appointments}+`, l: 'Years Experience' },
                    { v: 'Top Rated', l: 'On Rejuveefy' },
                  ].map(s => (
                    <div key={s.l} className="bg-pink-50 rounded-xl p-3 text-center">
                      <p className="font-bold text-gray-900 text-sm">{s.v}</p>
                      <p className="text-[10px] text-gray-500">{s.l}</p>
                    </div>
                  ))}
                </div>

                {/* Why clients love */}
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Why Clients Love Me</h3>
                <ul className="space-y-1.5 mb-6">
                  {['On-time & professional', 'Always achieve desired result', 'Great value for money', '100% satisfaction guaranteed'].map(i => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle size={13} className="text-pink-400 shrink-0" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Services tab */}
            {tab === 'Services' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-gray-900">Services by {provider.name}</h2>
                  <Link to={`/providers/${provider.slug}/book`} className="text-xs text-pink-500 font-semibold">View All Services</Link>
                </div>
                <div className="space-y-3">
                  {provider.services.map((s) => (
                    <div key={s.id} className="border border-gray-100 rounded-2xl p-4 flex items-start gap-4 card-hover">
                      <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center shrink-0">
                        <span className="text-xl">✂️</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">{s.name}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-lg font-bold text-gray-900">£{s.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Stars val={s.rating} size={10} />
                              <span className="text-[10px] text-gray-500">({s.reviews})</span>
                            </div>
                            <span className="text-[10px] text-gray-400 flex items-center gap-0.5"><Clock size={10} /> {s.duration}</span>
                          </div>
                          <Link to={`/providers/${provider.slug}/book?service=${s.id}`}
                            className="bg-pink-500 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full hover:bg-pink-600 transition-colors">
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-3">
                  <p className="text-xs text-gray-400">Not sure what you need?</p>
                  <button className="text-xs font-semibold text-pink-500 mt-1">Message Amara</button>
                </div>
              </div>
            )}

            {/* Portfolio tab */}
            {tab === 'Portfolio' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-gray-900">Portfolio</h2>
                  <span className="text-xs text-gray-400">{provider.portfolio?.length || 0} photos</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {provider.portfolio?.map((img, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden">
                      <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer" />
                    </div>
                  ))}
                  {(provider.portfolio?.length || 0) > 4 && (
                    <div className="aspect-square rounded-xl overflow-hidden relative">
                      <img src={provider.portfolio?.[4]} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">+{(provider.portfolio?.length || 0) - 4}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Reviews tab */}
            {tab === 'Reviews' && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-center">
                    <p className="font-display text-4xl font-bold text-gray-900">{provider.rating}</p>
                    <Stars val={provider.rating} size={16} />
                    <p className="text-xs text-gray-400 mt-1">{provider.reviews} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5,4,3,2,1].map(n => (
                      <div key={n} className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-4">{n}</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: n === 5 ? '75%' : n === 4 ? '18%' : '5%' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {provider.reviews_list?.map((r, i) => (
                    <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 bg-pink-100 rounded-full flex items-center justify-center">
                          <span className="text-pink-500 font-bold text-sm">{r.name[0]}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{r.name}</p>
                          <div className="flex items-center gap-2">
                            <Stars val={r.rating} size={10} />
                            <span className="text-[10px] text-gray-400">{r.date}</span>
                          </div>
                        </div>
                        {r.verified && (
                          <span className="ml-auto text-[10px] text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">Verified Booking</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location tab */}
            {tab === 'Location' && (
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-3">Service Location</h2>
                <div className="bg-pink-50 rounded-2xl p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-pink-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{provider.city}</p>
                      <p className="text-xs text-gray-500">{provider.location}</p>
                    </div>
                  </div>
                </div>
                <div className="h-48 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-sm">
                  📍 Map View — {provider.city}
                </div>
              </div>
            )}

            {/* What clients say preview (always shown) */}
            {tab === 'About' && provider.reviews_list?.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold text-gray-900">What Clients Say</h2>
                  <button onClick={() => setTab('Reviews')} className="text-xs text-pink-500 font-semibold">View all reviews</button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {provider.reviews_list.slice(0, 3).map((r, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-3">
                      <Stars val={r.rating} size={11} />
                      <p className="text-xs text-gray-600 mt-2 line-clamp-3">{r.text}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="w-7 h-7 bg-pink-100 rounded-full flex items-center justify-center">
                          <span className="text-pink-500 text-[11px] font-bold">{r.name[0]}</span>
                        </div>
                        <p className="text-[11px] font-semibold text-gray-700">{r.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: booking sidebar */}
          <aside className="lg:sticky lg:top-24 self-start">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card overflow-hidden">
              <div className="bg-pink-50 px-5 py-4 border-b border-pink-100">
                <p className="text-xs text-gray-500 mb-0.5">Book with {provider.name.split(' ')[0]}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-pink-500 uppercase tracking-wide">Tomorrow</p>
                    <p className="text-sm font-bold text-gray-900">{new Date(Date.now() + 86400000).toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'short' })}</p>
                  </div>
                  <button className="text-xs text-pink-500 font-semibold">Free time</button>
                </div>
              </div>
              <div className="p-5">
                <Link to={`/providers/${provider.slug}/book`}
                  className="block w-full bg-pink-500 text-white text-center py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors mb-3">
                  Book Now
                </Link>
                <button className="w-full border border-pink-500 text-pink-500 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-50 transition-colors">
                  Message {provider.name.split(' ')[0]}
                </button>

                {/* Availability */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-800">Availability</p>
                    <button className="text-[10px] text-pink-500 font-semibold">View Full Calendar</button>
                  </div>
                  {Object.entries(provider.availability || {}).map(([day, hrs]) => (
                    <div key={day} className={`flex justify-between py-1.5 text-xs ${hrs === 'Closed' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="font-medium">{day}</span>
                      <span>{hrs}</span>
                    </div>
                  ))}
                </div>

                {/* Service area */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-800 mb-2">Service Area</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin size={12} className="text-pink-400 shrink-0" />
                    {provider.location}
                  </div>
                </div>

                {/* Policies */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-800 mb-2">Policies</p>
                  {provider.policies?.map(p => (
                    <p key={p} className="text-[11px] text-gray-500 py-0.5 flex items-center gap-1.5">
                      <span className="text-pink-400">•</span> {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

// ── BOOKING FLOW ──────────────────────────────────────────────────────────────
export function BookingFlow() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const provider = providers.find(p => p.slug === slug) || providers[0]
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState(provider.services[0])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [locType, setLocType] = useState('salon')
  const [addons, setAddons] = useState({ curl: false, wig: false, scalp: false })
  const [notes, setNotes] = useState('')

  const steps = ['Service & Provider', 'Date & Time', 'Your Details', 'Payment', 'Confirmation']
  const times = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM']

  const addonsData = [
    { key: 'curl', name: 'Extra Curls (Rubber Curl)', price: 20 },
    { key: 'wig', name: 'Extra Wig (Pre-removed)', price: 15 },
    { key: 'scalp', name: 'Scalp Treatment', price: 25 },
  ]

  const addonTotal = addonsData.reduce((s, a) => addons[a.key] ? s + a.price : s, 0)
  const total = (selectedService?.price || 0) + addonTotal

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-1 flex-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0
                  ${i + 1 < step ? 'bg-pink-500 text-white' : i + 1 === step ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                  {i + 1 < step ? '✓' : i + 1}
                </div>
                <span className={`text-[10px] font-medium hidden sm:block ${i + 1 <= step ? 'text-pink-500' : 'text-gray-400'}`}>{s}</span>
                {i < steps.length - 1 && <div className="flex-1 h-px bg-gray-200 mx-2" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 lg:px-6 py-6">
        <p className="text-xs text-gray-400 mb-4">
          <Link to="/" className="hover:text-pink-500">Home</Link> › <Link to="/book" className="hover:text-pink-500">Book a Service</Link> › <span>Book Your Appointment</span>
        </p>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          {/* Form */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
              <h1 className="font-display text-lg font-bold text-gray-900 px-5 py-4 border-b border-gray-100">
                Book Your Appointment
              </h1>

              {/* Selected service & provider */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-xl">
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center text-lg">✂️</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{selectedService?.name}</p>
                    <p className="text-xs text-gray-500">{provider.name} · £{selectedService?.price}</p>
                  </div>
                  <button className="text-xs text-pink-500 font-semibold">Change</button>
                </div>
                {/* Provider chip */}
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl mt-2">
                  <img src={provider.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{provider.name}</p>
                    <div className="flex items-center gap-1">
                      <Stars val={provider.rating} size={10} />
                      <span className="text-[10px] text-gray-500">{provider.rating} · {provider.city}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-pink-500">£{selectedService?.price}</span>
                    <p className="text-[10px] text-gray-400">from</p>
                  </div>
                </div>
              </div>

              {/* Step 2: Date & Time */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <h3 className="text-sm font-semibold text-gray-900">Choose Date & Time</h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Mini calendar */}
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-2">Select Date</p>
                    <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} min={new Date().toISOString().split('T')[0]}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                  </div>
                  {/* Time slots */}
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-2">Select Time</p>
                    <div className="grid grid-cols-3 gap-1.5 max-h-36 overflow-y-auto">
                      {times.map((t) => (
                        <button key={t} onClick={() => setSelectedTime(t)}
                          className={`py-1.5 rounded-lg text-xs font-medium transition-colors
                            ${selectedTime === t ? 'bg-pink-500 text-white' : 'bg-gray-50 text-gray-600 hover:bg-pink-50 hover:text-pink-500'}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Location */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <h3 className="text-sm font-semibold text-gray-900">Choose Location</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'salon', icon: '🏪', label: 'At My Salon' },
                    { key: 'mobile', icon: '🚗', label: 'Mobile Visit' },
                    { key: 'home', icon: '🏠', label: 'At Your Home' },
                  ].map((l) => (
                    <button key={l.key} onClick={() => setLocType(l.key)}
                      className={`p-3 rounded-xl border text-center transition-colors
                        ${locType === l.key ? 'border-pink-500 bg-pink-50 text-pink-500' : 'border-gray-200 text-gray-500 hover:border-pink-200'}`}>
                      <div className="text-xl mb-1">{l.icon}</div>
                      <p className="text-[11px] font-medium">{l.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Add-ons */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                  <h3 className="text-sm font-semibold text-gray-900">Customize Your Service (Add-ons)</h3>
                </div>
                <div className="space-y-2">
                  {addonsData.map((a) => (
                    <label key={a.key} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl cursor-pointer hover:border-pink-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={addons[a.key]} onChange={e => setAddons(prev => ({ ...prev, [a.key]: e.target.checked }))}
                          className="w-4 h-4 accent-pink-500 rounded" />
                        <span className="text-sm text-gray-700">{a.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-pink-500">+ £{a.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 5: Special requests */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">5</div>
                  <h3 className="text-sm font-semibold text-gray-900">Special Requests (Optional)</h3>
                </div>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                  placeholder="Let your stylist know any specific requirements, allergies or preferences..."
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400 resize-none placeholder:text-gray-400" />
                <p className="text-xs text-gray-400 mt-1 flex items-start gap-1">
                  <span>ⓘ</span> Your provider will confirm your appointment details
                </p>
                <label className="flex items-center gap-2 mt-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-pink-500 rounded" />
                  <span className="text-xs text-gray-500">Send me a confirmation after booking</span>
                </label>

                <button onClick={() => navigate(`/booking-confirmation`)}
                  className="w-full mt-4 bg-pink-500 text-white py-3.5 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors flex items-center justify-center gap-2">
                  Continue to Your Details →
                </button>
              </div>
            </div>

            {/* Refer banner */}
            <div className="bg-pink-50 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 border border-pink-100">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">Refer a friend & get £10 off!</p>
                <p className="text-xs text-gray-500">You'll get £10 off on your first booking too</p>
              </div>
              <Link to="/referrals" className="bg-pink-500 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-pink-600 transition-colors whitespace-nowrap">
                Refer Now
              </Link>
            </div>
          </div>

          {/* Booking summary sidebar */}
          <aside className="sticky top-24 self-start">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Booking Summary</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Service</p>
                  <p className="font-medium text-gray-800">{selectedService?.name}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Provider</p>
                  <p className="font-medium text-gray-800">{provider.name}</p>
                </div>
                {selectedDate && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Date</p>
                    <p className="font-medium text-gray-800">{new Date(selectedDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                  </div>
                )}
                {selectedTime && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Time</p>
                    <p className="font-medium text-gray-800">{selectedTime}</p>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Service Price</span>
                    <span className="font-semibold">£{selectedService?.price}</span>
                  </div>
                  {addonsData.filter(a => addons[a.key]).map(a => (
                    <div key={a.key} className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500 text-xs">{a.name}</span>
                      <span className="text-xs font-semibold">+ £{a.price}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-pink-500 text-lg">£{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-xs text-gray-500">
                {['Secure & Easy Booking', '100% Positive Reviews', 'Background-Checked Professionals', 'Flexible Cancellation'].map(t => (
                  <div key={t} className="flex items-center gap-1.5"><CheckCircle size={12} className="text-green-400 shrink-0" /> {t}</div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

// ── BOOKING CONFIRMATION ──────────────────────────────────────────────────────
export function BookingConfirmation() {
  const provider = providers[0]
  const service = provider.services[0]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress bar complete */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center justify-between">
            {['Service & Provider', 'Date & Time', 'Your Details', 'Payment', 'Confirmation'].map((s, i) => (
              <div key={s} className="flex items-center gap-1 flex-1">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold bg-pink-500 text-white shrink-0">✓</div>
                <span className="text-[10px] font-medium hidden sm:block text-pink-500">{s}</span>
                {i < 4 && <div className="flex-1 h-px bg-pink-200 mx-2" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 lg:px-6 py-8">
        <p className="text-xs text-gray-400 mb-5">
          <Link to="/">Home</Link> › <Link to="/book">Book a Service</Link> › Checkout & Payment › <span>Confirmation</span>
        </p>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <div>
            {/* Confirmed card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 text-center mb-5">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-pink-500" />
              </div>
              <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Your Booking is Confirmed!</h1>
              <p className="text-sm text-gray-500 mb-4">We can't wait to see you. Your appointment has been successfully booked.</p>
              <div className="inline-block bg-gray-50 rounded-xl px-5 py-2">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">Booking Reference</p>
                <p className="font-bold text-gray-900 tracking-wider">RJYF-220524-7896</p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center mt-5">
                <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm font-semibold px-4 py-2.5 rounded-full hover:border-pink-300 hover:text-pink-500 transition-colors">
                  <Calendar size={15} /> Add to Calendar
                </button>
                <Link to="/bookings" className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm font-semibold px-4 py-2.5 rounded-full hover:border-pink-300 hover:text-pink-500 transition-colors">
                  View My Bookings
                </Link>
                <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm font-semibold px-4 py-2.5 rounded-full hover:border-pink-300 hover:text-pink-500 transition-colors">
                  Download Receipt
                </button>
              </div>
            </div>

            {/* Appointment details */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 mb-5">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Appointment Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-xl">✂️</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Service</p>
                    <p className="text-sm font-semibold text-gray-800">{service.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <img src={provider.image} alt="" className="w-10 h-10 rounded-xl object-cover shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Provider</p>
                    <p className="text-sm font-semibold text-gray-800 flex items-center gap-1">{provider.name} <ShieldCheck size={12} className="text-pink-500" /></p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center shrink-0">
                    <Calendar size={18} className="text-pink-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Date & Time</p>
                    <p className="text-sm font-semibold text-gray-800">Wed, 22 May 2024 at 10:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-pink-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Location</p>
                    <p className="text-sm font-semibold text-gray-800">At My Salon</p>
                    <p className="text-xs text-gray-400">24 Beauty Street, London, UK</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-500">Service Price</span>
                  <span className="font-semibold">£{service.price}</span>
                </div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-500">Extra Curls (Rubber Curl)</span>
                  <span className="font-semibold">+ £20</span>
                </div>
                <div className="flex justify-between font-bold text-base mt-3 pt-3 border-t border-gray-100">
                  <span>Total Paid</span>
                  <span className="text-pink-500">£82.00</span>
                </div>
                <div className="mt-2 flex items-center gap-2 bg-green-50 rounded-xl px-3 py-2">
                  <CheckCircle size={14} className="text-green-500" />
                  <p className="text-xs text-green-700 font-semibold">Payment Successful</p>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 mb-5">
              <h2 className="text-base font-semibold text-gray-900 mb-4">What Happens Next?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { n: '1. Confirmation Sent', desc: "We've sent your booking details to your email" },
                  { n: '2. Reminder', desc: "You'll receive a reminder 24 hours before your appointment" },
                  { n: '3. Get Ready', desc: 'Arrive a few minutes early and look, we\'ll take care of the rest' },
                  { n: '4. Enjoy & Review', desc: 'Love your look? Share your experience and leave a review' },
                ].map((s) => (
                  <div key={s.n} className="text-center">
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-pink-500 text-xs font-bold">{s.n[0]}</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-800 mb-1">{s.n}</p>
                    <p className="text-[10px] text-gray-400 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Need help */}
            <div className="bg-pink-50 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Need Help?</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: '💬', label: 'Live Chat', sub: 'Chat with us instantly' },
                  { icon: '📞', label: 'Call Us', sub: '+44 20 1234 5678' },
                  { icon: '✉️', label: 'Email Us', sub: 'info@rejuveefy.com' },
                ].map((h) => (
                  <div key={h.label} className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <div className="text-xl mb-1">{h.icon}</div>
                    <p className="text-xs font-semibold text-gray-800">{h.label}</p>
                    <p className="text-[10px] text-gray-400">{h.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="sticky top-24 self-start space-y-4">
            {/* Booking summary */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">Booking Summary</h3>
                <button className="text-xs text-pink-500 font-semibold">Edit</button>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center text-xl">✂️</div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">{service.name}</p>
                  <p className="text-[10px] text-gray-400">{service.duration} · Long Hair</p>
                </div>
              </div>
              <div className="space-y-1.5 text-xs text-gray-600 mb-3">
                <div className="flex items-center gap-2"><img src={provider.image} alt="" className="w-4 h-4 rounded-full object-cover" /> {provider.name} <ShieldCheck size={10} className="text-pink-500" /></div>
                <div className="flex items-center gap-2"><Calendar size={11} className="text-gray-400" /> Wed, 22 May 2024 at 10:00 PM</div>
                <div className="flex items-center gap-2"><MapPin size={11} className="text-gray-400" /> At My Salon · London</div>
                <div className="flex items-center gap-2"><Clock size={11} className="text-gray-400" /> 3–6 Hours</div>
              </div>
              <div className="border-t border-gray-100 pt-3 text-xs space-y-1">
                <div className="flex justify-between"><span className="text-gray-500">Service Price</span><span className="font-semibold">£{service.price}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Extra Curls</span><span className="font-semibold">+ £20</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Platform Fee</span><span className="font-semibold">£2</span></div>
                <div className="flex justify-between font-bold text-sm mt-2 pt-2 border-t border-gray-100">
                  <span>Total Paid</span><span className="text-pink-500">£82.00</span>
                </div>
              </div>
            </div>

            {/* Manage booking */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-4 space-y-2">
              {['Reschedule Appointment', 'Cancel Appointment', 'Share Booking', 'View Booking Policy'].map((a) => (
                <button key={a} className="w-full text-left px-3 py-2.5 text-xs font-medium text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-xl transition-colors flex items-center justify-between">
                  {a}
                  <ChevronDown size={12} className="rotate-[-90deg]" />
                </button>
              ))}
            </div>

            {/* Referral */}
            <div className="bg-pink-500 rounded-2xl p-4 text-white">
              <p className="text-sm font-bold mb-1">Refer a friend & get £10 off!</p>
              <p className="text-xs text-pink-100 mb-3">You'll get £10 off on your next booking too</p>
              <Link to="/referrals" className="block w-full bg-white text-pink-500 text-xs font-bold py-2.5 rounded-full text-center hover:bg-pink-50 transition-colors">
                Refer Now
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
