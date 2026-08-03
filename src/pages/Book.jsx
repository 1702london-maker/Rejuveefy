import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react'
import { fetchProviders } from '../lib/db'

const categories = [
  { id: 'braids', label: 'Braids' },
  { id: 'twists', label: 'Twists' },
  { id: 'locks', label: 'Locs' },
  { id: 'wig-install', label: 'Wig Install' },
  { id: 'makeup', label: 'Makeup' },
  { id: 'hair-treatments', label: 'Treatments' },
  { id: 'hair-styling', label: 'Hair Styling' },
  { id: 'training', label: 'Training' },
]

export default function Book() {
  const { category } = useParams()
  const [sp] = useSearchParams()
  const [serviceQ, setServiceQ] = useState(sp.get('service') || '')
  const [locationQ, setLocationQ] = useState(sp.get('location') || '')
  const [dateQ, setDateQ] = useState('')
  const [providers, setProviders] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchProviders({ limit: 20 }).then(setProviders).catch(() => setProviders([]))
  }, [])

  const search = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (serviceQ.trim()) params.set('service', serviceQ.trim())
    if (locationQ.trim()) params.set('location', locationQ.trim())
    if (dateQ) params.set('date', dateQ)
    navigate(`/providers${params.toString() ? `?${params}` : ''}`)
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-[#FFF0F5] via-white to-[#FFF8FB] pt-10 pb-12">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <p className="text-xs text-gray-400 mb-4">
            <Link to="/" className="hover:text-pink-500">Home</Link>
            <span className="mx-1.5">/</span>
            <span className="text-gray-600">Book a Service</span>
            {category && <><span className="mx-1.5">/</span><span className="text-gray-600 capitalize">{category.replace(/-/g, ' ')}</span></>}
          </p>

          <div className="inline-flex items-center gap-2 bg-white border border-pink-200 text-pink-600 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm mb-4">
            <ShieldCheck size={13} /> Verified bookings only
          </div>

          <h1 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-3 leading-tight">
            Book Rejuveefy Services
          </h1>
          <p className="text-gray-500 mb-7 max-w-xl">
            Start with Maye's founder bookings, or browse approved providers as profiles go live.
          </p>

          <form onSubmit={search} className="bg-white rounded-2xl border border-gray-100 flex flex-col sm:flex-row overflow-hidden shadow-lg max-w-3xl">
            <div className="flex items-center gap-2 flex-1 px-4 py-3.5 border-b sm:border-b-0 sm:border-r border-gray-100">
              <Search size={15} className="text-gray-400 shrink-0" />
              <input value={serviceQ} onChange={e => setServiceQ(e.target.value)}
                placeholder="Search service or provider"
                className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400" />
            </div>
            <div className="flex items-center gap-2 flex-1 px-4 py-3.5 border-b sm:border-b-0 sm:border-r border-gray-100">
              <MapPin size={15} className="text-gray-400 shrink-0" />
              <input value={locationQ} onChange={e => setLocationQ(e.target.value)}
                placeholder="City, town or postcode"
                className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400" />
            </div>
            <div className="flex items-center gap-2 flex-1 px-4 py-3.5 border-b sm:border-b-0 sm:border-r border-gray-100">
              <Calendar size={15} className="text-gray-400 shrink-0" />
              <input type="date" value={dateQ} onChange={e => setDateQ(e.target.value)}
                className="flex-1 text-sm outline-none text-gray-700" />
            </div>
            <button type="submit" className="bg-pink-500 text-white px-7 py-3.5 text-sm font-bold hover:bg-pink-600 transition-colors">
              Search
            </button>
          </form>

          <div className="flex flex-wrap gap-5 mt-5">
            {[
              { icon: ShieldCheck, label: 'Reviewed providers' },
              { icon: Calendar, label: 'Account-based booking' },
              { icon: Clock, label: 'Status tracking' },
              { icon: Sparkles, label: 'Founder services live now' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <Icon size={13} className="text-pink-500" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 pt-8 pb-2">
        <Link to="/book/maye"
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 border border-white/5">
          <div className="relative shrink-0">
            <img src="/logo.png" alt="Rejuveefy" className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-contain bg-white p-2 shadow-xl" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
              <span className="text-[10px] font-black bg-pink-500 text-white px-3 py-1 rounded-full tracking-wide uppercase">Founder booking</span>
              <span className="text-[10px] font-bold bg-white/10 text-white/80 px-3 py-1 rounded-full">Hair and makeup</span>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">Taking bookings</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mb-1">Book Maye</h2>
            <p className="text-sm text-white/60 leading-relaxed max-w-lg">
              Braiding, cornrows, dreadlocks, bridal hair, makeup and wig styling across Southampton, Portsmouth and London.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-400 text-white font-black text-sm px-6 py-3.5 rounded-xl transition-all group-hover:scale-105 shadow-lg">
            Book Now <ArrowRight size={15} />
          </span>
        </Link>
      </div>

      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-800">Service Categories</h2>
          <Link to="/providers" className="text-xs text-pink-500 font-semibold flex items-center gap-1">View provider directory <ArrowRight size={12} /></Link>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/book/${cat.id}`}
              className={`px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-colors shrink-0
                ${category === cat.id ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-500'}`}>
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 pb-12">
        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          <aside className="hidden lg:block">
            <div className="bg-white border border-gray-100 rounded-2xl p-4 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal size={14} className="text-pink-500" />
                <h3 className="text-sm font-semibold text-gray-800">Filters</h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Filters will activate when approved provider profiles and service availability are connected.
              </p>
            </div>
          </aside>

          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                <strong className="text-gray-800">{providers.length} {providers.length === 1 ? 'provider' : 'providers'}</strong> available
              </p>
            </div>

            {providers.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-3">
                {providers.map((p) => (
                  <div key={p.id} className="bg-white border border-gray-100 rounded-2xl p-3 flex gap-3 shadow-card card-hover">
                    <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">{p.name}</h3>
                        {p.verified && <ShieldCheck size={12} className="text-pink-500 shrink-0" />}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{p.category}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs font-bold text-pink-500">From GBP {p.startingPrice || 0}</span>
                        <Link to={`/providers/${p.slug}`}
                          className="text-[11px] font-semibold text-pink-500 border border-pink-200 px-2.5 py-1 rounded-full hover:bg-pink-50 transition-colors">
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-dashed border-pink-200 rounded-2xl p-8 text-center">
                <CheckCircle size={34} className="text-pink-400 mx-auto mb-3" />
                <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Provider services are being verified</h2>
                <p className="text-sm text-gray-500 max-w-xl mx-auto mb-5">
                  Rejuveefy will show only approved provider profiles here. You can book Maye now or apply to become a provider.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/book/maye" className="bg-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-pink-600 transition-colors">
                    Book Maye
                  </Link>
                  <Link to="/register?type=provider" className="border border-pink-200 text-pink-600 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-pink-50 transition-colors">
                    Apply as Provider
                  </Link>
                </div>
              </div>
            )}

            <div className="mt-6 bg-pink-50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                  <Calendar size={18} className="text-pink-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Manage Your Bookings</p>
                  <p className="text-xs text-gray-500">View appointments and booking status from your dashboard.</p>
                </div>
              </div>
              <Link to="/bookings" className="bg-pink-500 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-pink-600 transition-colors whitespace-nowrap">
                My Bookings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
