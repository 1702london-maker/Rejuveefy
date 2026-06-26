import { useState } from 'react'
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Search, MapPin, Calendar, Star, ChevronDown, SlidersHorizontal, ShieldCheck, ArrowRight, Heart, Clock, MapPinIcon } from 'lucide-react'
import { providers, serviceCategories } from '../data/mockData'

const popularServices = [
  { id: 1, name: 'Knotless Braids', category: 'braids', provider: 'Hair By Amara', providerImg: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop', price: 45, rating: 4.9, reviews: 89, duration: '5–6 hrs', verified: true,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=200&fit=crop' },
  { id: 2, name: 'Ponytail Styling', category: 'hair-styling', provider: 'Taught by Fela', providerImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop', price: 60, rating: 4.7, reviews: 43, duration: '2–3 hrs', verified: true,
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=300&h=200&fit=crop' },
  { id: 3, name: 'Wig Installation', category: 'wig-install', provider: 'Hair By Amara', providerImg: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop', price: 65, rating: 4.9, reviews: 112, duration: '2–3 hrs', verified: true,
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300&h=200&fit=crop' },
  { id: 4, name: 'Loc Retwist', category: 'locks', provider: 'Hair By Amara', providerImg: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop', price: 45, rating: 4.9, reviews: 67, duration: '1–2 hrs', verified: true,
    image: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=300&h=200&fit=crop' },
]

const topProviders = providers.slice(0, 4)

function Stars({ val = 5 }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={11} className={i <= Math.round(val) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
      ))}
    </div>
  )
}

export default function Book() {
  const { category } = useParams()
  const [sp] = useSearchParams()
  const [serviceQ, setServiceQ] = useState(sp.get('service') || '')
  const [locationQ, setLocationQ] = useState(sp.get('location') || '')
  const [dateQ, setDateQ] = useState('')
  const [sortBy, setSortBy] = useState('Popular')
  const navigate = useNavigate()

  const filteredProviders = category
    ? providers.filter(p => p.services?.some(s => typeof s === 'object' ? s.id.toString().includes(category) : s === category))
    : providers

  return (
    <div className="min-h-screen bg-white">

      {/* Header section */}
      <div className="bg-pink-50 pt-6 pb-8">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          {/* Breadcrumb */}
          <p className="text-xs text-gray-400 mb-3">
            <Link to="/" className="hover:text-pink-500">Home</Link>
            <span className="mx-1.5">›</span>
            <span className="text-gray-600">Book a Service</span>
            {category && <><span className="mx-1.5">›</span><span className="text-gray-600 capitalize">{category.replace(/-/g,' ')}</span></>}
          </p>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Book a Service</h1>
          <p className="text-sm text-gray-500 mb-5">Find trusted professionals near you and book your perfect hair or beauty service.</p>

          {/* Search bar */}
          <div className="bg-white rounded-xl border border-gray-200 flex flex-col sm:flex-row overflow-hidden shadow-card">
            <div className="flex items-center gap-2 flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-100">
              <Search size={15} className="text-gray-400 shrink-0" />
              <input value={serviceQ} onChange={e => setServiceQ(e.target.value)}
                placeholder="E.g. Knotless Braids..." className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400" />
            </div>
            <div className="flex items-center gap-2 flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-100">
              <MapPin size={15} className="text-gray-400 shrink-0" />
              <input value={locationQ} onChange={e => setLocationQ(e.target.value)}
                placeholder="City, town or postcode" className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400" />
            </div>
            <div className="flex items-center gap-2 flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-100">
              <Calendar size={15} className="text-gray-400 shrink-0" />
              <input type="date" value={dateQ} onChange={e => setDateQ(e.target.value)}
                className="flex-1 text-sm outline-none text-gray-700" />
            </div>
            <button className="bg-pink-500 text-white px-6 py-3 text-sm font-semibold hover:bg-pink-600 transition-colors">
              Search Services
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 mt-4">
            {[
              { icon: '✓', label: 'Verified Professionals' },
              { icon: '📅', label: 'Instant Booking' },
              { icon: '💬', label: '24/7 Support' },
              { icon: '🛡️', label: 'Satisfaction Guarantee' },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="text-pink-500">{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular categories */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-800">Popular Categories</h2>
          <Link to="/book" className="text-xs text-pink-500 font-semibold flex items-center gap-1">View all categories <ArrowRight size={12} /></Link>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {serviceCategories.map((cat) => (
            <Link key={cat.id} to={`/book/${cat.id}`}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-colors shrink-0
                ${category === cat.id ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-500'}`}>
              <img src={cat.image} alt="" className="w-5 h-5 rounded-full object-cover" />
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 pb-12">
        <div className="grid lg:grid-cols-[240px_1fr] gap-6">

          {/* Sidebar filters */}
          <aside className="hidden lg:block">
            <div className="bg-white border border-gray-100 rounded-2xl p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-800">Filters</h3>
                <button className="text-xs text-pink-500 font-medium">Clear All</button>
              </div>

              {/* Service type */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Service Type</h4>
                {['Braids & Twists', 'Wig Installation', 'Hair Treatments', 'Makeup', 'Locks', 'Barbers'].map((t) => (
                  <label key={t} className="flex items-center gap-2 py-1.5 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 accent-pink-500 rounded" />
                    <span className="text-sm text-gray-600 group-hover:text-pink-500 transition-colors">{t}</span>
                  </label>
                ))}
              </div>

              {/* Location type */}
              <div className="mb-4 border-t border-gray-100 pt-4">
                <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Location</h4>
                {['At My Salon', 'Mobile Service', 'At Your Home'].map((t) => (
                  <label key={t} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-pink-500 rounded" />
                    <span className="text-sm text-gray-600">{t}</span>
                  </label>
                ))}
              </div>

              {/* Price range */}
              <div className="mb-4 border-t border-gray-100 pt-4">
                <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Price Range</h4>
                <input type="range" min="0" max="300" defaultValue="150" className="w-full" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>£0</span><span>£300+</span>
                </div>
              </div>

              {/* Rating */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Min Rating</h4>
                {['4.5+', '4.0+', '3.5+', 'Any'].map((r) => (
                  <label key={r} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input type="radio" name="rating" className="w-4 h-4 accent-pink-500" />
                    <span className="text-sm text-gray-600">{r}</span>
                  </label>
                ))}
              </div>

              <button className="w-full mt-4 bg-pink-500 text-white py-2.5 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors">
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <div>
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500"><strong className="text-gray-800">{providers.length} Providers</strong> found</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Sort by:</span>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:border-pink-400">
                  <option>Popular</option>
                  <option>Rating</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Nearest</option>
                </select>
              </div>
            </div>

            {/* Popular services list */}
            <div className="space-y-0">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-800">Popular Services</h2>
                <div className="flex gap-2">
                  <span className="text-xs text-gray-400">Sort by:</span>
                  <button className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-full">Popular</button>
                  <button className="text-xs text-gray-500 px-2 py-1 rounded-full hover:bg-gray-100">Rating</button>
                  <button className="text-xs text-gray-500 px-2 py-1 rounded-full hover:bg-gray-100">Price</button>
                </div>
              </div>

              <div className="space-y-3">
                {popularServices.map((s) => (
                  <div key={s.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-card card-hover">
                    <div className="flex">
                      <div className="w-32 lg:w-40 shrink-0">
                        <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">{s.name}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                              <img src={s.providerImg} alt="" className="w-5 h-5 rounded-full object-cover" />
                              <span className="text-xs text-gray-500">{s.provider}</span>
                              {s.verified && (
                                <span className="flex items-center gap-0.5 text-[10px] text-pink-500 font-medium">
                                  <ShieldCheck size={10} /> Verified
                                </span>
                              )}
                            </div>
                          </div>
                          <button className="text-gray-300 hover:text-pink-400 transition-colors mt-0.5">
                            <Heart size={16} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1">
                            <Stars val={s.rating} />
                            <span className="text-xs font-semibold text-gray-700">{s.rating}</span>
                            <span className="text-xs text-gray-400">({s.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock size={11} /> {s.duration}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-lg font-bold text-pink-500">£{s.price}</span>
                          <Link to={`/providers/${providers[0].slug}/book`}
                            className="bg-pink-500 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-pink-600 transition-colors">
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <button className="text-sm text-pink-500 font-semibold border border-pink-200 px-6 py-2.5 rounded-full hover:bg-pink-50 transition-colors">
                  View all services
                </button>
              </div>
            </div>

            {/* Manage bookings banner */}
            <div className="mt-6 bg-pink-50 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                  <Calendar size={18} className="text-pink-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Manage Your Bookings</p>
                  <p className="text-xs text-gray-500">View your upcoming appointments, reschedule or cancel with ease</p>
                </div>
              </div>
              <Link to="/bookings" className="bg-pink-500 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-pink-600 transition-colors whitespace-nowrap">
                Go to My Bookings →
              </Link>
            </div>

            {/* Top Rated Providers */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-800">Top Rated Providers</h2>
                <Link to="/providers" className="text-xs font-semibold text-pink-500 flex items-center gap-1">View all providers <ArrowRight size={12} /></Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {topProviders.map((p) => (
                  <div key={p.id} className="bg-white border border-gray-100 rounded-2xl p-3 flex gap-3 shadow-card card-hover">
                    <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">{p.name}</h3>
                        {p.verified && <ShieldCheck size={12} className="text-pink-500 shrink-0" />}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{p.category}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Stars val={p.rating} />
                        <span className="text-xs text-gray-600">{p.rating}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold text-pink-500">From £{p.startingPrice}</span>
                        <Link to={`/providers/${p.slug}`}
                          className="text-[11px] font-semibold text-pink-500 border border-pink-200 px-2.5 py-1 rounded-full hover:bg-pink-50 transition-colors">
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
