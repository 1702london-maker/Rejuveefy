import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Search, MapPin, Calendar, ChevronRight } from 'lucide-react'
import { services, serviceCategories, providers } from '../data/mockData'
import ProviderCard from '../components/ProviderCard'

// ── BOOKING FLOW (multi-step) ──────────────────────────────────────────────
function BookingFlow({ service: svc, category }) {
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState({ provider: null, date: '', time: '', location: 'provider' })
  const [confirmed, setConfirmed] = useState(false)
  const categoryProviders = providers.filter(p => p.services.includes(category))
  const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

  if (confirmed) return (
    <div className="max-w-lg mx-auto text-center py-16">
      <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✅</div>
      <h2 className="font-display text-2xl font-bold text-on-surface mb-2">Appointment Confirmed!</h2>
      <p className="text-on-surface-variant mb-6">Your booking reference is <span className="font-bold text-primary">#RJF{Math.floor(Math.random()*100000)}</span></p>
      <div className="bg-surface-container-low rounded-2xl p-6 text-left mb-6 space-y-3">
        <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Service</span><span className="font-semibold text-on-surface">{svc?.name}</span></div>
        <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Provider</span><span className="font-semibold text-on-surface">{selected.provider?.name}</span></div>
        <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Date & Time</span><span className="font-semibold text-on-surface">{selected.date} at {selected.time}</span></div>
        <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Status</span><span className="text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full text-xs">Awaiting Acceptance</span></div>
      </div>
      <div className="flex gap-3 justify-center">
        <button className="border border-primary text-primary px-5 py-2.5 rounded-full text-sm font-semibold">+ Add to Calendar</button>
        <Link to="/bookings" className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold">View Bookings</Link>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      {/* Steps */}
      <div className="flex items-center gap-2 mb-8">
        {['Select Service', 'Choose Provider', 'Date & Time', 'Confirm'].map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${step > i + 1 ? 'bg-primary text-white' : step === i + 1 ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'}`}>{step > i + 1 ? '✓' : i + 1}</div>
            <span className={`text-xs font-medium hidden sm:block ${step === i + 1 ? 'text-primary' : 'text-on-surface-variant'}`}>{s}</span>
            {i < 3 && <div className={`flex-1 h-0.5 ${step > i + 1 ? 'bg-primary' : 'bg-outline-variant/30'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Service already chosen, show summary */}
      {step === 1 && (
        <div className="bg-surface-container-low rounded-2xl p-6 mb-4">
          <h3 className="font-semibold text-on-surface mb-4">Selected Service</h3>
          <div className="bg-surface-container-lowest rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-container/40 rounded-xl flex items-center justify-center text-2xl">{svc?.icon}</div>
            <div>
              <p className="font-semibold text-on-surface">{svc?.name}</p>
              <p className="text-sm text-on-surface-variant">{svc?.duration} · From £{svc?.price}</p>
            </div>
          </div>
          <button onClick={() => setStep(2)} className="mt-6 w-full bg-primary text-white py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">Continue</button>
        </div>
      )}

      {/* Step 2: Choose Provider */}
      {step === 2 && (
        <div>
          <h3 className="font-semibold text-on-surface mb-4">Choose a Provider</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {(categoryProviders.length ? categoryProviders : providers).map(p => (
              <div key={p.id} onClick={() => setSelected(s => ({ ...s, provider: p }))}
                className={`cursor-pointer rounded-2xl border-2 transition-all ${selected.provider?.id === p.id ? 'border-primary bg-primary-fixed/20' : 'border-outline-variant/20 bg-surface-container-lowest'}`}>
                <ProviderCard provider={p} />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 border border-outline-variant/40 text-on-surface-variant py-3 rounded-full font-semibold text-sm">Back</button>
            <button disabled={!selected.provider} onClick={() => setStep(3)} className="flex-1 bg-primary text-white py-3 rounded-full font-semibold text-sm disabled:opacity-50 hover:opacity-90 transition-opacity">Continue</button>
          </div>
        </div>
      )}

      {/* Step 3: Date & Time */}
      {step === 3 && (
        <div className="bg-surface-container-low rounded-2xl p-6">
          <h3 className="font-semibold text-on-surface mb-4">Select Date & Time</h3>
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2 block">Date</label>
              <input type="date" value={selected.date} onChange={e => setSelected(s => ({ ...s, date: e.target.value }))} min={new Date().toISOString().split('T')[0]}
                className="w-full border border-outline-variant/40 rounded-xl px-4 py-3 text-sm bg-surface-container-lowest focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2 block">Available Times</label>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {times.map(t => (
                  <button key={t} onClick={() => setSelected(s => ({ ...s, time: t }))}
                    className={`py-2 rounded-xl text-xs font-medium border transition-all ${selected.time === t ? 'bg-primary text-white border-primary' : 'border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2 block">Location</label>
              <div className="flex gap-2">
                {['provider', 'home'].map(opt => (
                  <button key={opt} onClick={() => setSelected(s => ({ ...s, location: opt }))}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-medium border transition-all capitalize ${selected.location === opt ? 'bg-primary text-white border-primary' : 'border-outline-variant/30 text-on-surface-variant hover:border-primary'}`}>
                    {opt === 'provider' ? 'Provider Location' : 'Home Visit'}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 border border-outline-variant/40 text-on-surface-variant py-3 rounded-full font-semibold text-sm">Back</button>
            <button disabled={!selected.date || !selected.time} onClick={() => setStep(4)} className="flex-1 bg-primary text-white py-3 rounded-full font-semibold text-sm disabled:opacity-50 hover:opacity-90 transition-opacity">Continue</button>
          </div>
        </div>
      )}

      {/* Step 4: Confirm */}
      {step === 4 && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-surface-container-low rounded-2xl p-6">
            <h3 className="font-semibold text-on-surface mb-4">Booking Summary</h3>
            <div className="space-y-3">
              {[
                { label: 'Service', value: svc?.name },
                { label: 'Provider', value: selected.provider?.name },
                { label: 'Date', value: selected.date },
                { label: 'Time', value: selected.time },
                { label: 'Location', value: selected.location === 'home' ? 'Home Visit' : `${selected.provider?.location}` },
              ].map(row => (
                <div key={row.label} className="flex justify-between text-sm border-b border-outline-variant/20 pb-2.5">
                  <span className="text-on-surface-variant">{row.label}</span>
                  <span className="font-semibold text-on-surface">{row.value}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Service Price</span><span className="font-semibold">£{svc?.price}</span></div>
              <div className="flex justify-between text-sm text-green-600"><span>Referral Credit</span><span>-£0.00</span></div>
              <div className="flex justify-between font-bold text-base pt-1"><span>Total</span><span className="text-primary">£{svc?.price}</span></div>
            </div>
          </div>
          <div>
            <div className="bg-primary-fixed/20 rounded-2xl p-4 mb-4 border border-primary-container/30">
              <p className="text-xs text-on-surface-variant mb-1">Have a promo or referral code?</p>
              <div className="flex gap-2">
                <input placeholder="Enter code" className="flex-1 border border-outline-variant/40 rounded-xl px-3 py-2 text-sm bg-surface-container-lowest focus:outline-none focus:border-primary" />
                <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold">Apply</button>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(3)} className="flex-1 border border-outline-variant/40 text-on-surface-variant py-3 rounded-full font-semibold text-sm">Back</button>
              <button onClick={() => setConfirmed(true)} className="flex-1 bg-primary text-white py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity">Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── MAIN BOOK PAGE ──────────────────────────────────────────────────────────
export default function Book() {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const [searchQ, setSearchQ] = useState(searchParams.get('service') || '')
  const [locationQ, setLocationQ] = useState(searchParams.get('location') || '')
  const [selectedService, setSelectedService] = useState(null)

  const filtered = services.filter(s =>
    (!category || s.category === category) &&
    (!searchQ || s.name.toLowerCase().includes(searchQ.toLowerCase()))
  )

  const catLabel = serviceCategories.find(c => c.id === category)?.label || 'All Services'

  if (selectedService) return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <button onClick={() => setSelectedService(null)} className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary mb-6 transition-colors">
          ← Back to services
        </button>
        <h1 className="font-display text-2xl font-bold text-on-surface mb-8">Book: {selectedService.name}</h1>
        <BookingFlow service={selectedService} category={selectedService.category} />
      </div>
    </div>
  )

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-fixed/40 to-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl font-bold text-on-surface mb-2">{catLabel}</h1>
          <p className="text-on-surface-variant mb-6">Book a trusted beauty professional near you</p>
          <div className="bg-surface-container-lowest rounded-2xl shadow-ambient p-2 flex flex-col sm:flex-row gap-2 border border-outline-variant/20 max-w-2xl">
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search size={16} className="text-on-surface-variant shrink-0" />
              <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search services..." className="flex-1 bg-transparent text-sm outline-none py-1" />
            </div>
            <div className="hidden sm:block w-px bg-outline-variant/30" />
            <div className="flex items-center gap-2 flex-1 px-3">
              <MapPin size={16} className="text-on-surface-variant shrink-0" />
              <input value={locationQ} onChange={e => setLocationQ(e.target.value)} placeholder="London, Manchester..." className="flex-1 bg-transparent text-sm outline-none py-1" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          <Link to="/book" className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${!category ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-primary-fixed/30'}`}>All</Link>
          {serviceCategories.map(cat => (
            <Link key={cat.id} to={`/book/${cat.id}`} className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${category === cat.id ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-primary-fixed/30'}`}>{cat.label}</Link>
          ))}
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(svc => (
            <div key={svc.id} onClick={() => setSelectedService(svc)}
              className="luxury-card cursor-pointer bg-surface-container-lowest rounded-2xl p-5 shadow-ambient group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-container/30 rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:bg-primary-container transition-colors">{svc.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-on-surface mb-1">{svc.name}</h3>
                  <p className="text-xs text-on-surface-variant mb-2 line-clamp-2">{svc.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-primary">From £{svc.price}</span>
                    <span className="text-xs text-on-surface-variant">·</span>
                    <span className="text-xs text-on-surface-variant">{svc.duration}</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-on-surface-variant group-hover:text-primary transition-colors shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-on-surface-variant">No services found. Try a different search.</div>
        )}
      </div>
    </div>
  )
}
