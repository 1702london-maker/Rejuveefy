import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  Heart,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
} from 'lucide-react'
import { createBooking, fetchProvider, fetchProviders } from '../lib/db'
import { useApp } from '../context/AppContext'

function Stars({ val = 0, size = 12 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={size} className={i <= Math.round(Number(val) || 0) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
      ))}
    </div>
  )
}

function EmptyDirectory() {
  return (
    <div className="bg-white border border-dashed border-pink-200 rounded-2xl p-8 text-center">
      <ShieldCheck size={34} className="text-pink-400 mx-auto mb-3" />
      <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Provider profiles are being verified</h2>
      <p className="text-sm text-gray-500 max-w-xl mx-auto mb-5">
        Rejuveefy only shows approved provider profiles. Book Maye now or apply to join the provider directory.
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
  )
}

export default function Providers() {
  const [q, setQ] = useState('')
  const [loc, setLoc] = useState('')
  const [allProviders, setAllProviders] = useState([])

  useEffect(() => {
    fetchProviders({ limit: 50 }).then(setAllProviders).catch(() => setAllProviders([]))
  }, [])

  const filtered = useMemo(() => allProviders.filter(p =>
    (!q || p.name?.toLowerCase().includes(q.toLowerCase()) || p.speciality?.toLowerCase().includes(q.toLowerCase())) &&
    (!loc || p.location?.toLowerCase().includes(loc.toLowerCase()) || p.postcode?.toLowerCase().includes(loc.toLowerCase()))
  ), [allProviders, q, loc])

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-100 py-5">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <p className="text-xs text-gray-400 mb-2">
            <Link to="/" className="hover:text-pink-500">Home</Link>
            <span className="mx-1.5">/</span>
            <span>Providers</span>
          </p>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Verified Provider Directory</h1>
          <p className="text-sm text-gray-500 mb-4">Browse approved Rejuveefy hair and beauty professionals as they go live.</p>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
              <Search size={15} className="text-gray-400" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or service"
                className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder:text-gray-400" />
            </div>
            <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
              <MapPin size={15} className="text-gray-400" />
              <input value={loc} onChange={e => setLoc(e.target.value)} placeholder="Enter city or postcode"
                className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder:text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          <aside className="hidden lg:block">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sticky top-24">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <SlidersHorizontal size={14} /> Filters
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Advanced filters will activate when approved provider services, availability and locations are connected.
              </p>
            </div>
          </aside>

          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                <strong className="text-gray-800">{filtered.length} {filtered.length === 1 ? 'provider' : 'providers'}</strong> found
              </p>
            </div>

            <div className="space-y-4">
              {filtered.length === 0 && <EmptyDirectory />}
              {filtered.map((p) => (
                <div key={p.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-card card-hover">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-56 lg:w-64 relative shrink-0">
                      <img src={p.image_url || p.image} alt={p.name} className="w-full h-48 sm:h-full object-cover" />
                      <span className="absolute top-3 left-3 bg-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <ShieldCheck size={10} /> Verified
                      </span>
                      <button className="absolute top-3 right-3 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center">
                        <Heart size={14} className="text-gray-400" />
                      </button>
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-base leading-tight">{p.name}</h3>
                          <p className="text-xs text-gray-500">{p.speciality || p.category || 'Beauty Professional'}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-lg font-bold text-pink-500">GBP {p.price_from || p.startingPrice || 0}</p>
                          <p className="text-xs text-gray-400">starting from</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-2">
                        <Stars val={p.rating} size={12} />
                        <span className="text-xs font-bold text-gray-700">{Number(p.rating || 0).toFixed(1)}</span>
                        <span className="text-xs text-gray-400">({p.review_count || 0} reviews)</span>
                      </div>

                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{p.bio}</p>

                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                        <MapPin size={12} className="text-pink-400" />
                        {p.location || 'Location to be confirmed'}
                        {p.postcode && <><span className="mx-1">/</span>{p.postcode}</>}
                      </div>

                      <div className="flex gap-2">
                        <Link to={`/providers/${p.slug}`}
                          className="bg-pink-500 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-pink-600 transition-colors">
                          View Profile
                        </Link>
                        <Link to={`/providers/${p.slug}/book`}
                          className="border border-pink-500 text-pink-500 text-xs font-semibold px-4 py-2 rounded-full hover:bg-pink-50 transition-colors">
                          Book
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100">
              {[
                { icon: ShieldCheck, label: 'Verified Professionals', sub: 'Reviewed before going live' },
                { icon: Star, label: 'Quality Signals', sub: 'Ratings appear from real reviews' },
                { icon: Calendar, label: 'Account Booking', sub: 'Bookings connect to your dashboard' },
                { icon: CheckCircle, label: 'Clean Directory', sub: 'Real profiles only' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center p-3">
                  <Icon size={20} className="text-pink-400 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-gray-800">{label}</p>
                  <p className="text-[10px] text-gray-400">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProviderProfile() {
  const { slug } = useParams()
  const [provider, setProvider] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProvider(slug)
      .then(setProvider)
      .catch(() => setProvider(null))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" /></div>
  }

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Provider not found</h1>
          <p className="text-sm text-gray-500 mb-5">This provider may not be approved or active yet.</p>
          <Link to="/providers" className="bg-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full">Back to Providers</Link>
        </div>
      </div>
    )
  }

  const services = Array.isArray(provider.services) ? provider.services : []

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 pt-4 pb-8">
        <p className="text-xs text-gray-400 mb-4">
          <Link to="/" className="hover:text-pink-500">Home</Link>
          <span className="mx-1.5">/</span>
          <Link to="/providers" className="hover:text-pink-500">Providers</Link>
          <span className="mx-1.5">/</span>
          <span className="text-gray-600">{provider.name}</span>
        </p>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          <div>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-card mb-6">
              <div className="h-36 bg-pink-50 relative">
                {provider.image_url && <img src={provider.image_url} alt="" className="w-full h-full object-cover opacity-70" />}
              </div>
              <div className="px-5 pb-5">
                <div className="flex items-end gap-4 -mt-10 mb-3">
                  <img src={provider.image_url || provider.image} alt={provider.name} className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-card" />
                  <div className="mb-1">
                    <div className="flex items-center gap-2">
                      <h1 className="font-display text-xl font-bold text-gray-900">{provider.name}</h1>
                      <ShieldCheck size={16} className="text-pink-500" />
                    </div>
                    <p className="text-sm text-gray-500">{provider.speciality || 'Beauty Professional'}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-1.5">
                    <Stars val={provider.rating} size={13} />
                    <span className="text-sm font-bold text-gray-800">{Number(provider.rating || 0).toFixed(1)}</span>
                    <span className="text-xs text-gray-400">({provider.review_count || 0} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin size={13} className="text-pink-400" />
                    {provider.location || 'Location to be confirmed'}
                  </div>
                </div>
              </div>
            </div>

            <section className="bg-white border border-gray-100 rounded-2xl p-5 mb-6">
              <h2 className="text-base font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{provider.bio || 'This provider profile is being completed.'}</p>
            </section>

            <section className="bg-white border border-gray-100 rounded-2xl p-5">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Services</h2>
              {services.length > 0 ? (
                <div className="space-y-3">
                  {services.map((service, index) => (
                    <div key={service.id || service.name || index} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{service.name}</p>
                        {service.desc && <p className="text-xs text-gray-500 mt-1">{service.desc}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-pink-500">GBP {service.price || 0}</p>
                        {service.duration && <p className="text-xs text-gray-400">{service.duration}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">Services will appear once this provider completes their setup.</p>
              )}
            </section>
          </div>

          <aside className="sticky top-24 self-start">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Book this provider</h3>
              <p className="text-xs text-gray-500 mb-4">Booking uses real services from the approved provider profile.</p>
              <Link to={`/providers/${provider.slug}/book`} className="block w-full bg-pink-500 text-white text-sm font-semibold py-3 rounded-full text-center hover:bg-pink-600 transition-colors">
                Start Booking
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export function BookingFlow() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { user } = useApp()
  const [provider, setProvider] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProvider(slug)
      .then(setProvider)
      .catch(() => setProvider(null))
      .finally(() => setLoading(false))
  }, [slug])

  const services = Array.isArray(provider?.services) ? provider.services : []
  const chosen = services.find(s => String(s.name) === selectedService)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!user) {
      navigate('/login')
      return
    }
    if (!provider || !chosen || !selectedDate || !selectedTime) {
      setError('Choose a service, date and time to continue.')
      return
    }
    try {
      await createBooking({
        user_id: user.id,
        provider_id: provider.id,
        service_name: chosen.name,
        service_price: chosen.price || 0,
        booking_date: selectedDate,
        booking_time: selectedTime,
        location_type: 'provider',
        notes,
        status: 'pending',
      })
      navigate('/booking-confirmation')
    } catch (err) {
      setError(err.message || 'Booking could not be saved.')
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" /></div>
  }

  if (!provider) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Provider not found.</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[900px] mx-auto px-4 lg:px-6 py-8">
        <p className="text-xs text-gray-400 mb-5">
          <Link to="/">Home</Link> / <Link to="/providers">Providers</Link> / <span>Book {provider.name}</span>
        </p>
        <form onSubmit={submit} className="bg-white border border-gray-100 rounded-2xl shadow-card p-6 space-y-5">
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Book {provider.name}</h1>
            <p className="text-sm text-gray-500">Your request will be saved as pending until confirmed.</p>
          </div>

          {services.length === 0 ? (
            <div className="border border-dashed border-pink-200 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-500">This provider has not added services yet.</p>
            </div>
          ) : (
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Service</label>
              <select value={selectedService} onChange={e => setSelectedService(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-pink-400">
                <option value="">Select a service</option>
                {services.map((service, index) => (
                  <option key={service.id || service.name || index} value={service.name}>{service.name} - GBP {service.price || 0}</option>
                ))}
              </select>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Date</label>
              <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-pink-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Time</label>
              <input type="time" value={selectedTime} onChange={e => setSelectedTime(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-pink-400" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Notes</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
              placeholder="Share anything your provider should know"
              className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-pink-400 resize-none" />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button type="submit" disabled={services.length === 0}
            className="w-full bg-pink-500 text-white py-3.5 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors disabled:opacity-50">
            Save Booking Request
          </button>
        </form>
      </div>
    </div>
  )
}

export function BookingConfirmation() {
  const { user } = useApp()
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    if (!user) return
    import('../lib/db').then(({ fetchUserBookings }) =>
      fetchUserBookings(user.id).then(bs => setBooking(bs[0] || null)).catch(() => setBooking(null))
    )
  }, [user])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[900px] mx-auto px-4 lg:px-6 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 text-center mb-5">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-pink-500" />
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Booking Request Saved</h1>
          <p className="text-sm text-gray-500 mb-5">Your appointment request has been saved and is waiting for confirmation.</p>
          {booking && (
            <div className="bg-gray-50 rounded-xl p-4 text-left max-w-md mx-auto mb-5">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Latest booking</p>
              <p className="text-sm font-semibold text-gray-900">{booking.service_name}</p>
              <p className="text-xs text-gray-500 mt-1">{booking.booking_date} at {booking.booking_time}</p>
              <p className="text-xs text-gray-500 mt-1">Status: {booking.status}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/bookings" className="bg-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-pink-600 transition-colors">
              View My Bookings
            </Link>
            <Link to="/providers" className="border border-pink-200 text-pink-600 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-pink-50 transition-colors">
              Back to Providers
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
