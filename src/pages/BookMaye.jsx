import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronLeft, ChevronRight, MapPin, Star, ShoppingBag, AlertCircle } from 'lucide-react'

// ── Brand tokens ──────────────────────────────────────────────────────────────
// Luxury cream/dark palette (OlivHair-style) adapted for Rejuveefy pink accent
const PINK = '#EC4899'

// ── Constants ─────────────────────────────────────────────────────────────────
const LONDON_SURCHARGE = 30
const DEPOSIT_RATE = 0.5
const WHATSAPP = 'https://wa.me/447700900000'

// ── Locations ─────────────────────────────────────────────────────────────────
const LOCATIONS = [
  { id: 'southampton', label: 'Southampton', detail: 'Southampton, Hampshire · Mon–Sat · 9:00–18:00' },
  { id: 'portsmouth',  label: 'Portsmouth',  detail: 'Portsmouth, Hampshire · Mon–Sat · 9:00–18:00' },
  { id: 'london',      label: 'London',      detail: 'London · Mon–Sat · 9:00–18:00 · +£30 surcharge', surcharge: LONDON_SURCHARGE },
]

// ── Service catalogue ─────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 'braiding', label: 'Braiding', emoji: '🌿',
    desc: 'Boho braids, knotless, box cutting, diamond cutting, butterfly braid locs, passion twist, crochet locks, twisting and more.',
    needsHair: true,
    config: [
      { key: 'size', label: 'Braid Size', type: 'radio', options: ['Small','Medium','Large'] },
      {
        key: 'length', label: 'Length', type: 'select',
        dependsOn: 'size',
        optionsByParent: {
          Small: ['Shoulder length — £80 · 4h','Bra length — £110 · 4h 30m','Above the bum — £200 · 7h','On bum — £270 · 8h 30m','Knee length — £350 · 12h','Actual hair, no extension (within shoulder) — £60 · 2h'],
          Medium: ['Shoulder length — £65 · 2h','Bra length — £85 · 3h','Above the bum — £150 · 6h','On bum — £200 · 7h','Knee length — £300 · 10h','Actual hair, no extension (within shoulder) — £55 · 1h 20m'],
          Large: ['Shoulder length — £60 · 1h 30m','Bra length — £70 · 2h','Above the bum — £100 · 4h','On bum — £150 · 5h','Knee length — £200','Actual hair, no extension (within shoulder) — £50 · 45m'],
        },
      },
    ],
    note: 'Natural/actual hair longer than bra length: +£10 additional charge.',
    prices: {
      Small: { 'Shoulder length': 80, 'Bra length': 110, 'Above the bum': 200, 'On bum': 270, 'Knee length': 350, 'Actual hair, no extension (within shoulder)': 60 },
      Medium: { 'Shoulder length': 65, 'Bra length': 85, 'Above the bum': 150, 'On bum': 200, 'Knee length': 300, 'Actual hair, no extension (within shoulder)': 55 },
      Large: { 'Shoulder length': 60, 'Bra length': 70, 'Above the bum': 100, 'On bum': 150, 'Knee length': 200, 'Actual hair, no extension (within shoulder)': 50 },
    },
    durations: {
      Small: { 'Shoulder length': '4h', 'Bra length': '4h 30m', 'Above the bum': '7h', 'On bum': '8h 30m', 'Knee length': '12h', 'Actual hair, no extension (within shoulder)': '2h' },
      Medium: { 'Shoulder length': '2h', 'Bra length': '3h', 'Above the bum': '6h', 'On bum': '7h', 'Knee length': '10h', 'Actual hair, no extension (within shoulder)': '1h 20m' },
      Large: { 'Shoulder length': '1h 30m', 'Bra length': '2h', 'Above the bum': '4h', 'On bum': '5h', 'Knee length': '—', 'Actual hair, no extension (within shoulder)': '45m' },
    },
  },
  {
    id: 'cornrows', label: 'Cornrows', emoji: '✨',
    desc: 'All back, ponytail, two steps, one-sided, cornrows in front with braiding behind, and any custom cornrow style.',
    needsHair: true,
    config: [
      { key: 'type', label: 'Cornrow Type', type: 'select', options: ['Actual hair — no extension','With extension','Cornrows in front, braiding behind'] },
      {
        key: 'size', label: 'Size (for mixed styles)', type: 'radio',
        showWhen: { key: 'type', value: 'Cornrows in front, braiding behind' },
        options: ['Extra Small','Small','Medium','Large'],
      },
      {
        key: 'length', label: 'Length / Pieces', type: 'select',
        dependsOnTwo: true,
        optionsByTwo: {
          'Actual hair — no extension': { '': ['8–12 pieces — £15 · 30m','15–20 pieces — £20 · 45m','21–25 pieces — £25 · 1h','25–35 pieces — £30 · 1h 10m'] },
          'With extension': { '': ['8–12 pieces — £40 · 45m','15–20 pieces — £50 · 1h','21–25 pieces — £55 · 1h 10m','25–35 pieces — £60 · 1h 30m'] },
          'Cornrows in front, braiding behind': {
            'Extra Small': ['Shoulder length — £85 · 4h','Bra length — £110 · 4h 30m','Above the bum — £125 · 5h','On bum — £140 · 6h','Knee length — £160 · 8h','Actual hair, no extension (within shoulder) — £65 · 2h'],
            'Small': ['Shoulder length — £75 · 4h','Bra length — £100 · 4h','Above the bum — £115 · 4h 30m','On bum — £130 · 5h 30m','Knee length — £140 · 6h','Actual hair, no extension (within shoulder) — £60 · 2h'],
            'Medium': ['Shoulder length — £65 · 2h','Bra length — £85 · 3h 30m','Above the bum — £100 · 4h','On bum — £130 · 5h','Knee length — £140 · 6h','Actual hair, no extension (within shoulder) — £55 · 1h 20m'],
            'Large': ['Shoulder length — £60 · 2h 30m','Bra length — £70 · 3h','Above the bum — £100 · 4h','On bum — £150 · 5h','Knee length — £200','Actual hair, no extension (within shoulder) — £50 · 45m'],
          },
        },
      },
    ],
    note: 'Natural/actual hair longer than bra length: +£10 additional charge.',
    getPrice: (cfg) => {
      const raw = cfg.length || ''
      const m = raw.match(/£(\d+)/)
      return m ? parseInt(m[1]) : 0
    },
    getDuration: (cfg) => {
      const raw = cfg.length || ''
      const m = raw.match(/·\s*(.+)$/)
      return m ? m[1].trim() : '—'
    },
  },
  {
    id: 'dreadlocks', label: 'Dreadlocks', emoji: '🌱',
    desc: 'Micro locks, sister locks, medium and med-large locks — new installations and relock maintenance.',
    needsHair: false,
    config: [
      { key: 'type', label: 'Lock Type & Service', type: 'select', options: [
        'Micro Lock — New (£300–£500 · 8–16h)',
        'Micro Lock — Relock (£250 · 3–8h)',
        'Sister Lock — New (£250–£350 · 6–12h)',
        'Sister Lock — Relock (£150 · 2–8h)',
        'Medium Lock — New (£150 · 4–9h)',
        'Medium Lock — Relock (£80 · 1–5h)',
        'Med-Large Lock — New (£120 · 2–6h)',
        'Med-Large Lock — Relock (£60 · 1–4h)',
      ]},
    ],
    prices: {
      'Micro Lock — New (£300–£500 · 8–16h)': 300,
      'Micro Lock — Relock (£250 · 3–8h)': 250,
      'Sister Lock — New (£250–£350 · 6–12h)': 250,
      'Sister Lock — Relock (£150 · 2–8h)': 150,
      'Medium Lock — New (£150 · 4–9h)': 150,
      'Medium Lock — Relock (£80 · 1–5h)': 80,
      'Med-Large Lock — New (£120 · 2–6h)': 120,
      'Med-Large Lock — Relock (£60 · 1–4h)': 60,
    },
  },
  {
    id: 'fixing', label: 'Fixing & Installation', emoji: '👑',
    desc: 'Closure and frontal installation, regular fixing (pix cut, fringe, invisible closing), crochet with cornrows.',
    needsHair: true,
    config: [
      { key: 'type', label: 'Service', type: 'select', options: [
        'Closure Installation + Cornrows + Styling — £85 · 3–4h',
        'Closure Installation + Styling only — £60 · 1–3h',
        'Frontal Installation + Cornrows + Styling — £85 · 3–4h',
        'Frontal Installation + Styling only — £60 · 1–3h',
        'Regular Fixing (pix cut, fringe, dot/invisible closing) — £65 · 2–4h',
        'Crochet with cornrows beneath — £60 · 2–4h',
      ]},
    ],
    getPrice: (cfg) => { const m = (cfg.type||'').match(/£(\d+)/); return m ? parseInt(m[1]) : 0 },
    getDuration: (cfg) => { const m = (cfg.type||'').match(/·\s*(.+)$/); return m ? m[1].trim() : '—' },
  },
  {
    id: 'styling', label: 'Bridal & Event Styling', emoji: '💍',
    desc: 'Bridal hair, birthday styling, wig styling, casual and event hair. Price and duration quoted by chosen style.',
    needsHair: false,
    config: [
      { key: 'type', label: 'Styling Type', type: 'select', options: [
        'Bridal Hair Styling (£150–£350 · 2–6h)',
        'Wig Styling (£60–£150 · 1–3h)',
        'Birthday Hair Styling (£60–£200 · 1–4h)',
        'Casual Hair Styling (£60–£100 · 1–2h)',
        'Event Hair Styling (£60–£350 · 1–6h)',
      ]},
    ],
    getPrice: (cfg) => { const m = (cfg.type||'').match(/£(\d+)/); return m ? parseInt(m[1]) : 0 },
    getDuration: (cfg) => { const m = (cfg.type||'').match(/·\s*(.+?)\)/); return m ? m[1].trim() : '—' },
  },
  {
    id: 'makeup', label: 'Makeup', emoji: '💄',
    desc: 'Everyday, glamour, bridal, special occasion, editorial, cultural and traditional makeup. For all skin tones.',
    needsHair: false,
    config: [
      { key: 'type', label: 'Makeup Category', type: 'select', options: [
        'Everyday Makeup — £60 · 1h',
        'Glamour Makeup — £65 · 1h 30m',
        'Gele only — £40 · 30–45m',
        'Bridal Makeup — £300 · 2h',
        'Bridal Gele — £150 · 1h',
        'Special Occasion Makeup — £60 · 1h',
        'Editorial & Fashion Makeup — £100–£500 · 2–8h',
        'Cultural & Traditional Makeup — £300 · 2–3h',
      ]},
    ],
    getPrice: (cfg) => { const m = (cfg.type||'').match(/£(\d+)/); return m ? parseInt(m[1]) : 0 },
    getDuration: (cfg) => { const m = (cfg.type||'').match(/·\s*(.+)$/); return m ? m[1].trim() : '—' },
  },
]

// ── Hair products ─────────────────────────────────────────────────────────────
const HAIR_PRODUCTS = [
  { id: 'hp1', name: 'Braiding Hair — 3 Pack', price: 12, tag: 'Braids/Twists' },
  { id: 'hp2', name: 'Kanekalon Extension — Long', price: 18, tag: 'Braids' },
  { id: 'hp3', name: 'Human Hair Closure 4x4', price: 65, tag: 'Closure' },
  { id: 'hp4', name: 'HD Lace Frontal 13x4', price: 95, tag: 'Frontal' },
  { id: 'hp5', name: 'Loc Extension Pack', price: 22, tag: 'Locs' },
  { id: 'hp6', name: 'Crochet Hair — 5 Pack', price: 28, tag: 'Crochet' },
]

// ── Calendar helpers ──────────────────────────────────────────────────────────
function buildCalendar(year, month) {
  const days = []
  const first = new Date(year, month, 1).getDay()
  const total = new Date(year, month + 1, 0).getDate()
  const today = new Date(); today.setHours(0,0,0,0)
  for (let i = 0; i < first; i++) days.push({ empty: true })
  for (let d = 1; d <= total; d++) {
    const date = new Date(year, month, d)
    const dow = date.getDay()
    const isPast = date <= today
    const isSun = dow === 0
    days.push({ d, date, past: isPast, unavailable: isSun, available: !isPast && !isSun })
  }
  return days
}

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAY_HDRS = ['Su','Mo','Tu','We','Th','Fr','Sa']
const TIME_SLOTS = ['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','5:00 PM']

// ── Price extraction ──────────────────────────────────────────────────────────
function getServicePrice(svc, cfg) {
  if (!svc) return 0
  if (svc.getPrice) return svc.getPrice(cfg)
  if (svc.prices) {
    if (svc.id === 'braiding') return (svc.prices[cfg.size]?.[cfg.length?.split(' — ')[0]] || 0)
    if (cfg.type) return svc.prices[cfg.type] || 0
  }
  return 0
}
function getServiceDuration(svc, cfg) {
  if (!svc) return ''
  if (svc.getDuration) return svc.getDuration(cfg)
  if (svc.durations) {
    if (svc.id === 'braiding') return svc.durations[cfg.size]?.[cfg.length?.split(' — ')[0]] || ''
  }
  return ''
}

// ── Shared styles ─────────────────────────────────────────────────────────────
const card = (sel) => `border-2 cursor-pointer transition-all duration-200 relative overflow-hidden text-left w-full
  ${sel
    ? 'border-gray-900 bg-[#F8F3EC]'
    : 'border-[#E8DDD0] bg-white hover:border-[#C9A96E]'}`

const radioBtn = (sel) => `px-5 py-2.5 border-2 cursor-pointer transition-all font-medium text-sm font-sans tracking-wide
  ${sel ? 'bg-gray-900 text-white border-gray-900' : 'bg-[#F8F3EC] text-gray-700 border-[#E8DDD0] hover:border-[#C9A96E]'}`

// ── Progress bar ──────────────────────────────────────────────────────────────
const STEP_LABELS = ['Location','Service','Configure','Date','Time','Details','Review']

function ProgressBar({ step }) {
  return (
    <div className="flex items-center mb-10 overflow-x-auto pb-1">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1
        const done = n < step
        const active = n === step
        return (
          <div key={label} className="flex items-center shrink-0">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold text-xs transition-all duration-300 font-sans
                ${done ? 'bg-gray-900 border-gray-900 text-white' : active ? 'border-pink-500 bg-pink-500 text-white' : 'bg-[#EDE5D8] border-[#EDE5D8] text-[#A0907E]'}`}>
                {done ? <Check size={13} /> : n}
              </div>
              <span className={`text-[8px] font-bold tracking-widest uppercase mt-1.5 hidden sm:block transition-colors font-sans
                ${active ? 'text-gray-900' : done ? 'text-gray-600' : 'text-[#A0907E]'}`}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={`h-px w-6 sm:w-10 mx-1.5 shrink-0 transition-all ${done ? 'bg-gray-900' : 'bg-[#E3D6C5]'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Live booking summary sidebar ──────────────────────────────────────────────
function SummaryPanel({ location, service, cfg, hairChoice, hairProducts, date, time, isLondon }) {
  const svc = SERVICES.find(s => s.id === service)
  const price = getServicePrice(svc, cfg)
  const finalPrice = price + (isLondon ? LONDON_SURCHARGE : 0)
  const hairTotal = hairProducts.reduce((a, p) => a + p.price, 0)
  const total = finalPrice + hairTotal
  const deposit = total > 0 ? Math.ceil(total * DEPOSIT_RATE) : 0

  const locLabel = LOCATIONS.find(l => l.id === location)?.label || ''
  const dur = getServiceDuration(svc, cfg)

  const rows = [
    location && { label: 'Location', value: locLabel },
    svc && { label: 'Service', value: svc.label },
    cfg.type && { label: 'Type', value: cfg.type.split('(')[0].split('—')[0].trim() },
    cfg.size && { label: 'Size', value: cfg.size },
    cfg.length && { label: 'Length', value: cfg.length.split('—')[0].trim() },
    dur && { label: 'Duration', value: dur },
    isLondon && price > 0 && { label: 'London surcharge', value: `+£${LONDON_SURCHARGE}` },
    hairChoice === 'buy' && hairTotal > 0 && { label: 'Rejuveefy hair', value: `+£${hairTotal}` },
    date && { label: 'Date', value: date },
    time && { label: 'Time', value: time },
  ].filter(Boolean)

  return (
    <div className="bg-[#F8F3EC] border border-[#E8DDD0] p-6 sticky top-24">
      <p className="text-[9px] font-bold tracking-[3px] uppercase text-[#B68A45] mb-1 font-sans">Your Booking</p>
      <p className="text-xl font-light text-gray-900 mb-5 font-serif">Summary</p>

      {rows.length === 0
        ? <p className="text-sm text-[#A0907E] font-sans font-medium">Select a location to begin.</p>
        : (
          <div className="space-y-0">
            {rows.map((r, i) => (
              <div key={i} className="flex justify-between items-start py-2.5 border-b border-[#E8DDD0] last:border-b-0 gap-3">
                <span className="text-xs text-[#7A6A5A] font-medium font-sans shrink-0">{r.label}</span>
                <span className="text-xs font-semibold text-gray-900 font-sans text-right leading-relaxed">{r.value}</span>
              </div>
            ))}
          </div>
        )
      }

      {total > 0 && (
        <div className="border-t-2 border-gray-900 mt-4 pt-4">
          <div className="flex justify-between items-end">
            <p className="text-[10px] font-bold tracking-[2px] uppercase text-gray-900 font-sans">Estimated Total</p>
            <p className="font-serif text-3xl font-light text-gray-900">£{total}</p>
          </div>
          <div className="mt-2 bg-pink-50 border border-pink-200 p-3">
            <p className="text-[10px] font-bold text-pink-600 font-sans tracking-wide uppercase mb-0.5">Deposit Due</p>
            <p className="font-serif text-xl text-pink-600">£{deposit}</p>
            <p className="text-[10px] text-pink-400 font-sans mt-1">50% required to confirm your slot</p>
          </div>
        </div>
      )}

      <div className="mt-6 bg-[#EDE5D8] border border-[#E3D6C5] p-4">
        <p className="text-[9px] font-bold tracking-[2px] uppercase text-[#7A6A5A] mb-2 font-sans">Cancellation Policy</p>
        <p className="text-xs text-gray-700 font-sans font-medium leading-relaxed">
          No refund if cancelled within 4 hours of appointment.
        </p>
      </div>
    </div>
  )
}

// ── Step 1: Location ──────────────────────────────────────────────────────────
function Step1({ location, setLocation, onNext }) {
  const [err, setErr] = useState(false)
  const go = () => { if (!location) { setErr(true); return }; setErr(false); onNext() }
  return (
    <div>
      <h2 className="font-serif text-3xl sm:text-4xl font-light text-gray-900 mb-2">Choose Your <em className="italic text-pink-500">Location</em></h2>
      <p className="text-sm text-gray-500 font-sans font-medium mb-8 leading-relaxed">
        Select where you'd like your appointment. London bookings include a £{LONDON_SURCHARGE} travel surcharge.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {LOCATIONS.map(loc => (
          <button key={loc.id} onClick={() => { setLocation(loc.id); setErr(false) }} className={card(location === loc.id)}>
            {/* top accent bar */}
            <div className={`absolute top-0 inset-x-0 h-0.5 transition-transform duration-200 origin-left
              ${location === loc.id ? 'bg-gray-900 scale-x-100' : 'bg-[#C9A96E] scale-x-0 group-hover:scale-x-100'}`} />
            {location === loc.id && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center">
                <Check size={10} className="text-white" />
              </div>
            )}
            <div className="p-7 sm:p-8">
              <span className="text-[9px] font-bold tracking-[3px] uppercase text-[#B68A45] block mb-2 font-sans">Studio</span>
              <p className="font-serif text-2xl text-gray-900 mb-2">{loc.label}</p>
              <p className="text-xs text-gray-500 font-sans font-medium leading-relaxed">{loc.detail}</p>
              {loc.surcharge && (
                <span className="inline-block mt-3 text-[10px] font-bold bg-pink-100 text-pink-600 px-2 py-1 font-sans tracking-wide">
                  +£{loc.surcharge} surcharge
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
      {err && <p className="text-red-600 text-sm font-sans font-medium mt-2">Please select a location to continue.</p>}
      <NavBtns onNext={go} />
    </div>
  )
}

// ── Step 2: Service category ──────────────────────────────────────────────────
function Step2({ service, setService, onBack, onNext }) {
  const [err, setErr] = useState(false)
  const go = () => { if (!service) { setErr(true); return }; setErr(false); onNext() }
  return (
    <div>
      <h2 className="font-serif text-3xl sm:text-4xl font-light text-gray-900 mb-2">Select Your <em className="italic text-pink-500">Service</em></h2>
      <p className="text-sm text-gray-500 font-sans font-medium mb-8 leading-relaxed">Choose the service you'd like to book with Maye.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {SERVICES.map(svc => (
          <button key={svc.id} onClick={() => { setService(svc.id); setErr(false) }} className={card(service === svc.id)}>
            <div className={`absolute top-0 inset-x-0 h-0.5 ${service === svc.id ? 'bg-gray-900 scale-x-100' : 'bg-[#C9A96E] scale-x-0'} transition-transform origin-left`} />
            {service === svc.id && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center">
                <Check size={10} className="text-white" />
              </div>
            )}
            <div className="p-5 sm:p-6">
              <span className="text-2xl mb-2 block">{svc.emoji}</span>
              <p className="font-serif text-xl text-gray-900 mb-1">{svc.label}</p>
              <p className="text-xs text-gray-500 font-sans font-medium leading-relaxed">{svc.desc}</p>
            </div>
          </button>
        ))}
      </div>
      {err && <p className="text-red-600 text-sm font-sans font-medium">Please select a service to continue.</p>}
      <NavBtns onBack={onBack} onNext={go} />
    </div>
  )
}

// ── Step 3: Configure ─────────────────────────────────────────────────────────
function Step3({ service, cfg, setCfg, hairChoice, setHairChoice, hairProducts, setHairProducts, onBack, onNext }) {
  const svc = SERVICES.find(s => s.id === service)
  const [err, setErr] = useState(false)

  const update = (key, val) => setCfg(prev => {
    const next = { ...prev, [key]: val }
    if (key === 'type') { delete next.size; delete next.length }
    if (key === 'size') { delete next.length }
    return next
  })

  const toggleProduct = (p) => setHairProducts(prev =>
    prev.find(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : [...prev, p]
  )

  const go = () => {
    if (!svc) return
    // validate required fields
    const lastCfg = svc.config?.[svc.config.length - 1]
    if (lastCfg && !cfg[lastCfg.key]) { setErr(true); return }
    if (svc.needsHair && !hairChoice) { setErr(true); return }
    setErr(false); onNext()
  }

  if (!svc) return null

  return (
    <div>
      <h2 className="font-serif text-3xl sm:text-4xl font-light text-gray-900 mb-2">Configure Your <em className="italic text-pink-500">Service</em></h2>
      <p className="text-sm text-gray-500 font-sans font-medium mb-8 leading-relaxed">
        Select your options. Your estimated total updates as you choose.
      </p>

      <div className="space-y-4">
        {svc.config?.map(field => {
          // conditional visibility
          if (field.showWhen && cfg[field.showWhen.key] !== field.showWhen.value) return null

          // get options for this field
          let options = field.options || []
          if (field.dependsOn && !cfg[field.dependsOn]) return null
          if (field.dependsOn) options = field.optionsByParent?.[cfg[field.dependsOn]] || []
          if (field.dependsOnTwo) {
            const t = cfg.type || ''
            const s = cfg.size || ''
            options = field.optionsByTwo?.[t]?.[s] || field.optionsByTwo?.[t]?.[''] || []
            if (options.length === 0 && !cfg.size && t === 'Cornrows in front, braiding behind') return null
          }

          return (
            <div key={field.key} className="bg-white border border-[#E8DDD0] p-6">
              <span className="text-[9px] font-bold tracking-[2.5px] uppercase text-[#B68A45] mb-1 block font-sans">{field.label}</span>

              {field.type === 'radio' && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {options.map(opt => (
                    <button key={opt} onClick={() => update(field.key, opt)} className={radioBtn(cfg[field.key] === opt)}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {field.type === 'select' && (
                <select value={cfg[field.key] || ''} onChange={e => update(field.key, e.target.value)}
                  className="w-full mt-2 border border-[#E8DDD0] bg-[#F8F3EC] p-3 text-sm font-medium font-sans text-gray-800 focus:outline-none focus:border-[#B68A45] appearance-none cursor-pointer">
                  <option value="">— Select —</option>
                  {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              )}
            </div>
          )
        })}

        {svc.note && (
          <div className="border-l-4 border-[#C9A96E] pl-4 py-1 bg-amber-50">
            <p className="text-xs text-amber-800 font-sans font-medium leading-relaxed">{svc.note}</p>
          </div>
        )}

        {/* Hair option */}
        {svc.needsHair && (
          <div className="bg-white border border-[#E8DDD0] p-6">
            <span className="text-[9px] font-bold tracking-[2.5px] uppercase text-[#B68A45] mb-1 block font-sans">Your Hair</span>
            <p className="font-serif text-lg text-gray-900 mb-4">Do you have hair for this service?</p>
            <div className="flex flex-wrap gap-3 mb-4">
              {['I will bring my own hair', 'I want to buy Rejuveefy hair'].map(opt => (
                <button key={opt} onClick={() => setHairChoice(opt)} className={radioBtn(hairChoice === opt)}>
                  {opt === 'I will bring my own hair' ? '🧴 ' : '🛍️ '}{opt}
                </button>
              ))}
            </div>

            {hairChoice === 'I want to buy Rejuveefy hair' && (
              <div>
                <p className="text-xs text-gray-500 font-sans font-medium mb-3">Select the hair you'd like — it will be added to your booking total.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {HAIR_PRODUCTS.map(p => {
                    const sel = hairProducts.find(x => x.id === p.id)
                    return (
                      <button key={p.id} onClick={() => toggleProduct(p)}
                        className={`flex items-center gap-3 p-3 border text-left transition-all
                          ${sel ? 'border-gray-900 bg-[#F8F3EC]' : 'border-[#E8DDD0] bg-white hover:border-[#C9A96E]'}`}>
                        <span className="text-lg">💆‍♀️</span>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-gray-800 font-sans">{p.name}</p>
                          <p className="text-[10px] text-gray-500 font-sans">{p.tag}</p>
                        </div>
                        <span className="text-sm font-black font-sans text-gray-800">£{p.price}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0
                          ${sel ? 'bg-gray-900 border-gray-900' : 'border-[#D0C4B4]'}`}>
                          {sel && <Check size={9} className="text-white" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
                {hairProducts.length > 0 && (
                  <div className="mt-2 flex items-center justify-between text-xs font-sans text-gray-600 bg-[#F8F3EC] px-3 py-2 border border-[#E8DDD0]">
                    <span>{hairProducts.length} item{hairProducts.length > 1 ? 's' : ''} selected</span>
                    <span className="font-black text-gray-900">+£{hairProducts.reduce((a,p)=>a+p.price,0)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {err && <p className="text-red-600 text-sm font-sans font-medium mt-3">Please complete all selections before continuing.</p>}
      <NavBtns onBack={onBack} onNext={go} />
    </div>
  )
}

// ── Step 4: Date ──────────────────────────────────────────────────────────────
function Step4({ date, setDate, onBack, onNext }) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [err, setErr] = useState(false)

  const days = buildCalendar(viewYear, viewMonth)
  const go = () => { if (!date) { setErr(true); return }; setErr(false); onNext() }

  const fmt = (d) => `${d} ${MONTH_NAMES[viewMonth]} ${viewYear}`
  const prevMonth = () => { viewMonth === 0 ? (setViewYear(y=>y-1), setViewMonth(11)) : setViewMonth(m=>m-1) }
  const nextMonth = () => { viewMonth === 11 ? (setViewYear(y=>y+1), setViewMonth(0)) : setViewMonth(m=>m+1) }

  return (
    <div>
      <h2 className="font-serif text-3xl sm:text-4xl font-light text-gray-900 mb-2">Select a <em className="italic text-pink-500">Date</em></h2>
      <p className="text-sm text-gray-500 font-sans font-medium mb-8 leading-relaxed">
        Dates with a gold dot have availability. Maye is available Monday to Saturday.
      </p>

      <div className="bg-white border border-[#E8DDD0]">
        {/* Calendar header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gray-900">
          <button onClick={prevMonth} className="w-8 h-8 border border-white/20 text-white flex items-center justify-center hover:border-[#B68A45] hover:text-[#B68A45] transition-colors">
            <ChevronLeft size={15} />
          </button>
          <p className="font-serif text-xl font-light text-white">{MONTH_NAMES[viewMonth]} {viewYear}</p>
          <button onClick={nextMonth} className="w-8 h-8 border border-white/20 text-white flex items-center justify-center hover:border-[#B68A45] hover:text-[#B68A45] transition-colors">
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Day headers + grid */}
        <div className="p-4">
          <div className="grid grid-cols-7 mb-2">
            {DAY_HDRS.map(d => (
              <div key={d} className="text-center text-[9px] font-bold tracking-widest uppercase text-[#7A6A5A] py-1 font-sans">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) => {
              if (day.empty) return <div key={i} />
              const label = fmt(day.d)
              const isSelected = date === label
              return (
                <button key={i}
                  disabled={day.past || day.unavailable}
                  onClick={() => { if (day.available) { setDate(label); setErr(false) } }}
                  className={`aspect-square flex items-center justify-center text-xs font-medium font-sans border relative transition-all
                    ${isSelected ? 'bg-gray-900 text-white border-gray-900' : ''}
                    ${day.available && !isSelected ? 'text-gray-800 border-transparent hover:bg-[#EDE5D8] hover:border-[#E3D6C5] cursor-pointer' : ''}
                    ${day.past || day.unavailable ? 'text-[#D0C4B4] border-transparent cursor-not-allowed' : ''}
                  `}>
                  {day.d}
                  {day.available && !isSelected && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#B68A45]" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-5 px-4 py-3 border-t border-[#E3D6C5]">
          {[{c:'#B68A45',l:'Available'},{c:'#D0C4B4',l:'Unavailable'},{c:'#2B2620',l:'Selected'}].map(x => (
            <div key={x.l} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full shrink-0" style={{background:x.c}} />
              <span className="text-xs text-gray-500 font-sans font-medium">{x.l}</span>
            </div>
          ))}
        </div>
      </div>

      {err && <p className="text-red-600 text-sm font-sans font-medium mt-3">Please select a date to continue.</p>}
      <NavBtns onBack={onBack} onNext={go} label="Continue" />
    </div>
  )
}

// ── Step 5: Time ──────────────────────────────────────────────────────────────
function Step5({ time, setTime, onBack, onNext }) {
  const [err, setErr] = useState(false)
  const go = () => { if (!time) { setErr(true); return }; setErr(false); onNext() }
  return (
    <div>
      <h2 className="font-serif text-3xl sm:text-4xl font-light text-gray-900 mb-2">Select a <em className="italic text-pink-500">Time</em></h2>
      <p className="text-sm text-gray-500 font-sans font-medium mb-8 leading-relaxed">
        Available times for your selected date. All times are UK local time.
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 mb-4">
        {TIME_SLOTS.map(t => (
          <button key={t} onClick={() => { setTime(t); setErr(false) }}
            className={`py-3.5 text-center border text-sm font-medium font-sans transition-all
              ${time === t ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-[#E8DDD0] hover:border-[#C9A96E] hover:bg-[#EDE5D8]'}`}>
            {t}
          </button>
        ))}
      </div>
      <p className="text-sm text-[#7A6A5A] font-sans font-medium mb-4 leading-relaxed">
        All times are UK local time. Please arrive 5 minutes before your appointment. Maye will confirm via WhatsApp within 24 hours.
      </p>
      {err && <p className="text-red-600 text-sm font-sans font-medium">Please select a time to continue.</p>}
      <NavBtns onBack={onBack} onNext={go} />
    </div>
  )
}

// ── Step 6: Details ───────────────────────────────────────────────────────────
function Step6({ details, setDetails, onBack, onNext }) {
  const [err, setErr] = useState(false)
  const set = (k, v) => setDetails(d => ({...d, [k]: v}))
  const go = () => {
    if (!details.name || !details.email || !details.phone) { setErr(true); return }
    setErr(false); onNext()
  }
  const inputClass = "w-full border border-[#E8DDD0] bg-white px-4 py-3.5 text-sm font-medium font-sans text-gray-800 placeholder:text-[#C4B8A8] focus:outline-none focus:border-[#B68A45] transition-colors"
  return (
    <div>
      <h2 className="font-serif text-3xl sm:text-4xl font-light text-gray-900 mb-2">Your <em className="italic text-pink-500">Details</em></h2>
      <p className="text-sm text-gray-500 font-sans font-medium mb-8 leading-relaxed">
        Enter your contact information. A confirmation will be sent after booking.
      </p>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-[9px] font-bold tracking-[2px] uppercase text-[#7A6A5A] block mb-1.5 font-sans">Full Name *</label>
          <input className={inputClass} type="text" placeholder="Your full name" value={details.name} onChange={e=>set('name',e.target.value)} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[9px] font-bold tracking-[2px] uppercase text-[#7A6A5A] block mb-1.5 font-sans">Email Address *</label>
            <input className={inputClass} type="email" placeholder="your@email.com" value={details.email} onChange={e=>set('email',e.target.value)} />
          </div>
          <div>
            <label className="text-[9px] font-bold tracking-[2px] uppercase text-[#7A6A5A] block mb-1.5 font-sans">Phone Number *</label>
            <input className={inputClass} type="tel" placeholder="+44 000 000 0000" value={details.phone} onChange={e=>set('phone',e.target.value)} />
          </div>
        </div>
        <div>
          <label className="text-[9px] font-bold tracking-[2px] uppercase text-[#7A6A5A] block mb-1.5 font-sans">Additional Notes (optional)</label>
          <input className={inputClass} type="text" placeholder="Allergies, special requests, or anything we should know..." value={details.notes} onChange={e=>set('notes',e.target.value)} />
        </div>
      </div>
      {err && <p className="text-red-600 text-sm font-sans font-medium mt-3">Please complete all required fields.</p>}
      <NavBtns onBack={onBack} onNext={go} label="Review Booking" />
    </div>
  )
}

// ── Step 7: Review & Confirm ──────────────────────────────────────────────────
function Step7({ location, service, cfg, hairChoice, hairProducts, date, time, details, isLondon, onBack }) {
  const [agreed, setAgreed] = useState(false)
  const [payMethod, setPayMethod] = useState('')
  const [err, setErr] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const svc = SERVICES.find(s => s.id === service)
  const price = getServicePrice(svc, cfg)
  const finalPrice = price + (isLondon ? LONDON_SURCHARGE : 0)
  const hairTotal = hairProducts.reduce((a,p)=>a+p.price, 0)
  const total = finalPrice + hairTotal
  const deposit = Math.ceil(total * DEPOSIT_RATE)
  const locLabel = LOCATIONS.find(l=>l.id===location)?.label || ''

  const rows = [
    { label: 'Name', value: details.name },
    { label: 'Email', value: details.email },
    { label: 'Phone', value: details.phone },
    { label: 'Location', value: locLabel },
    { label: 'Service', value: svc?.label },
    cfg.type && { label: 'Type', value: cfg.type.split('(')[0].split('—')[0].trim() },
    cfg.size && { label: 'Size', value: cfg.size },
    cfg.length && { label: 'Length', value: cfg.length.split('—')[0].trim() },
    { label: 'Date', value: date },
    { label: 'Time', value: time },
    hairChoice === 'I want to buy Rejuveefy hair' && hairTotal > 0 && { label: 'Hair (Rejuveefy)', value: `+£${hairTotal}` },
    isLondon && { label: 'London surcharge', value: `+£${LONDON_SURCHARGE}` },
    details.notes && { label: 'Notes', value: details.notes },
  ].filter(Boolean)

  const submit = async (e) => {
    e.preventDefault()
    if (!agreed) { setErr('Please accept the cancellation policy to confirm.'); return }
    if (!payMethod) { setErr('Please choose a payment method.'); return }
    setErr(''); setLoading(true)
    if (payMethod === 'bank') {
      const msg = encodeURIComponent(
        `Hi Maye! I'd like to book an appointment.\n\n📍 Location: ${locLabel}\n💇 Service: ${svc?.label}${cfg.type ? ` — ${cfg.type.split('(')[0].trim()}` : ''}${cfg.size ? ` (${cfg.size})` : ''}${cfg.length ? `, ${cfg.length.split('—')[0].trim()}` : ''}\n📅 Date: ${date} at ${time}\n\n👤 Name: ${details.name}\n📧 Email: ${details.email}\n📞 Phone: ${details.phone}${details.notes ? `\n📝 Notes: ${details.notes}` : ''}\n\n💰 Total: £${total}\n💳 50% Deposit: £${deposit}\n\nPlease send your bank details so I can confirm my slot. Thank you!`
      )
      setTimeout(() => { window.open(`${WHATSAPP}?text=${msg}`, '_blank'); setLoading(false); setSubmitted(true) }, 500)
    } else {
      setTimeout(() => { setLoading(false); setSubmitted(true) }, 700)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16 px-4">
        <div className="w-18 h-18 w-[72px] h-[72px] rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-7">
          <div className="w-5 h-8 border-r-[3px] border-b-[3px] border-[#B68A45] rotate-45 translate-y-[-4px] translate-x-[-2px]" />
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl font-light text-gray-900 mb-3">
          Appointment <em className="italic">Received</em>
        </h2>
        <p className="text-base text-gray-500 font-sans font-medium leading-relaxed mb-8 max-w-sm mx-auto">
          {payMethod === 'bank'
            ? "Maye will confirm via WhatsApp and send her bank details to secure your deposit. See you soon."
            : "Your deposit request was received. Maye will confirm your appointment within 24 hours."}
        </p>
        <div className="bg-[#EDE5D8] border border-[#E3D6C5] p-7 text-left max-w-sm mx-auto mb-8">
          {rows.slice(0,6).map((r,i) => (
            <div key={i} className="flex justify-between gap-4 py-2.5 border-b border-[#E3D6C5] last:border-b-0">
              <span className="text-[10px] font-bold tracking-[2px] uppercase text-[#7A6A5A] font-sans">{r.label}</span>
              <span className="text-xs font-semibold text-gray-900 font-sans text-right">{r.value}</span>
            </div>
          ))}
          <div className="pt-3 flex justify-between items-center">
            <span className="text-[10px] font-bold tracking-[2px] uppercase text-gray-900 font-sans">Deposit Due</span>
            <span className="font-serif text-2xl text-gray-900">£{deposit}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/" className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold text-xs tracking-[2px] uppercase px-8 py-4 hover:bg-[#B68A45] transition-colors font-sans">
            Return Home
          </Link>
          <Link to="/shop" className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 font-bold text-xs tracking-[2px] uppercase px-8 py-4 hover:bg-gray-900 hover:text-white transition-colors font-sans">
            Shop Rejuveefy
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit}>
      <h2 className="font-serif text-3xl sm:text-4xl font-light text-gray-900 mb-2">Confirm Your <em className="italic text-pink-500">Appointment</em></h2>
      <p className="text-sm text-gray-500 font-sans font-medium mb-8 leading-relaxed">
        Review your booking and choose how to pay your deposit before confirming.
      </p>

      {/* Booking summary */}
      <div className="bg-white border border-[#E8DDD0] p-6 mb-5">
        {rows.map((r,i) => (
          <div key={i} className={`flex justify-between items-start gap-4 py-3 ${i < rows.length - 1 ? 'border-b border-[#EDE5D8]' : ''}`}>
            <span className="text-xs text-gray-500 font-sans font-medium">{r.label}</span>
            <span className="text-xs font-semibold text-gray-900 font-sans text-right leading-relaxed">{r.value}</span>
          </div>
        ))}
        <div className="flex justify-between items-end pt-4 border-t-2 border-gray-900 mt-3">
          <span className="text-xs font-bold tracking-[2px] uppercase text-gray-900 font-sans">Total</span>
          <span className="font-serif text-3xl font-light text-gray-900">£{total}</span>
        </div>
      </div>

      {/* Payment method */}
      <div className="bg-white border border-[#E8DDD0] p-6 mb-5">
        <span className="text-[9px] font-bold tracking-[2.5px] uppercase text-[#B68A45] block mb-1 font-sans">Pay Deposit</span>
        <p className="font-serif text-xl text-gray-900 mb-4">50% deposit required — <span className="text-pink-500">£{deposit}</span></p>
        <div className="space-y-3">
          <button type="button" onClick={() => setPayMethod('bank')}
            className={`w-full flex items-center gap-4 p-4 border text-left transition-all
              ${payMethod==='bank' ? 'border-gray-900 bg-[#F8F3EC]' : 'border-[#E8DDD0] bg-white hover:border-[#C9A96E]'}`}>
            <span className="text-xl">📲</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800 font-sans">Bank Transfer via WhatsApp</p>
              <p className="text-xs text-gray-500 font-sans font-medium mt-0.5">Maye will send bank details on WhatsApp to complete your deposit.</p>
            </div>
            {payMethod==='bank' && <Check size={16} className="text-gray-900 shrink-0" />}
          </button>

          <button type="button" onClick={() => setPayMethod('stripe')}
            className={`w-full flex items-center gap-4 p-4 border text-left transition-all
              ${payMethod==='stripe' ? 'border-gray-900 bg-[#F8F3EC]' : 'border-[#E8DDD0] bg-white hover:border-[#C9A96E]'}`}>
            <span className="text-xl">💳</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800 font-sans">Pay by Card — Stripe</p>
              <p className="text-xs text-gray-500 font-sans font-medium mt-0.5">Secure card payment. Coming soon.</p>
            </div>
            <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-1 font-sans tracking-wide shrink-0">Coming Soon</span>
          </button>
        </div>
      </div>

      {/* Agreement */}
      <div className="border-l-4 border-[#C9A96E] pl-5 py-3 bg-amber-50 mb-5">
        <p className="text-sm text-gray-700 font-sans font-medium leading-relaxed">
          <strong>Cancellation policy:</strong> No refund if cancelled within 4 hours of your appointment. By confirming you agree to these terms.
        </p>
      </div>
      <label className="flex items-start gap-3 cursor-pointer mb-5">
        <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} className="mt-1 w-4 h-4 accent-pink-500 shrink-0" />
        <span className="text-sm text-gray-700 font-sans font-medium leading-relaxed">
          I have read and agree that no refund will be issued if I cancel within 4 hours of my appointment.
        </span>
      </label>

      {err && (
        <div className="flex items-center gap-2 text-red-600 text-sm font-sans font-medium mb-4">
          <AlertCircle size={14} /> {err}
        </div>
      )}

      <button type="submit" disabled={loading || payMethod === 'stripe'}
        className="w-full bg-gray-900 text-white font-bold text-xs tracking-[2.5px] uppercase py-5 hover:bg-[#B68A45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-sans">
        {loading ? 'Sending...' : payMethod === 'bank' ? '📲 Open WhatsApp & Pay Deposit' : payMethod === 'stripe' ? 'Card payment coming soon' : 'Confirm Appointment'}
      </button>

      <div className="mt-4">
        <button type="button" onClick={onBack}
          className="text-xs font-bold tracking-[2px] uppercase text-gray-500 font-sans hover:text-gray-900 transition-colors flex items-center gap-1">
          <ChevronLeft size={13} /> Back
        </button>
      </div>
    </form>
  )
}

// ── Nav buttons ───────────────────────────────────────────────────────────────
function NavBtns({ onBack, onNext, label = 'Continue' }) {
  return (
    <div className="flex items-center gap-4 mt-8">
      {onBack && (
        <button onClick={onBack}
          className="text-xs font-bold tracking-[2px] uppercase text-gray-500 font-sans hover:text-gray-900 transition-colors flex items-center gap-1">
          <ChevronLeft size={13} /> Back
        </button>
      )}
      {onNext && (
        <button onClick={onNext}
          className="flex items-center gap-2 bg-gray-900 text-white font-bold text-xs tracking-[2.5px] uppercase px-8 py-4 hover:bg-pink-500 transition-colors font-sans">
          {label} <ChevronRight size={14} />
        </button>
      )}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function BookMaye() {
  const [step, setStep] = useState(1)
  const [location, setLocation] = useState('')
  const [service, setService] = useState('')
  const [cfg, setCfg] = useState({})
  const [hairChoice, setHairChoice] = useState('')
  const [hairProducts, setHairProducts] = useState([])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [details, setDetails] = useState({ name:'', email:'', phone:'', notes:'' })

  const isLondon = location === 'london'
  const next = useCallback(() => setStep(s => s + 1), [])
  const back = useCallback(() => setStep(s => s - 1), [])

  // Reset downstream when service changes
  const changeService = (s) => { setService(s); setCfg({}); setHairChoice(''); setHairProducts([]) }

  return (
    <div className="min-h-screen" style={{ background: '#F6F1E8', fontFamily: "'Montserrat', sans-serif" }}>

      {/* Hero */}
      <div className="relative bg-gray-900 overflow-hidden" style={{ minHeight: 420 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(182,138,69,0.15),transparent_60%)]" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 lg:px-8 py-16 sm:py-20">
          <p className="text-[10px] text-white/40 font-sans tracking-widest uppercase mb-6">
            <Link to="/" className="hover:text-[#C9A96E] transition-colors">Home</Link>
            {' '}/{' '}
            <Link to="/book" className="hover:text-[#C9A96E] transition-colors">Book</Link>
            {' '}/{' '}
            <span className="text-white/60">Book Maye</span>
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-8">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-none bg-gradient-to-br from-amber-900 to-amber-700 flex items-center justify-center text-6xl sm:text-7xl border border-white/10">
                👩🏾
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-emerald-500 border-2 border-gray-900 rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <span className="text-[9px] font-bold tracking-[4px] uppercase text-[#C9A96E] block mb-3 font-sans">Founder's Studio</span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight mb-3">
                Book <em className="italic text-[#C9A96E]">Maye</em>
              </h1>
              <p className="text-base text-white/60 font-sans font-medium mb-5 leading-relaxed max-w-xl">
                Hair Artist & Makeup Specialist · 10+ Years Experience · From Africa to the UK · Southampton · Portsmouth · London
              </p>
              <div className="flex items-center gap-1.5 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-[#C9A96E] fill-[#C9A96E]" />)}
                <span className="text-sm text-white/50 font-sans font-medium ml-2">5.0 · 500+ clients served</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Braiding','Cornrows','Dreadlocks','Makeup','Bridal','Wig Styling'].map(t => (
                  <span key={t} className="text-[10px] font-bold font-sans border border-white/15 text-white/60 px-3 py-1.5 tracking-wide">{t}</span>
                ))}
              </div>
            </div>

            {/* Bio quote */}
            <div className="hidden lg:block max-w-xs">
              <blockquote className="border-l-2 border-[#C9A96E] pl-4">
                <p className="text-sm text-white/50 font-sans font-medium leading-relaxed italic">
                  "When you book Maye, you're not booking a slot. You're booking the hands that built this."
                </p>
              </blockquote>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {[{n:'10+',l:'Years'},{n:'3',l:'UK Cities'},{n:'500+',l:'Clients'},{n:'5.0',l:'Rating'}].map(s => (
                  <div key={s.l} className="bg-white/5 border border-white/10 p-3 text-center">
                    <p className="font-serif text-2xl font-light text-white">{s.n}</p>
                    <p className="text-[9px] font-bold tracking-[2px] uppercase text-[#C9A96E] font-sans mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wizard + sidebar */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">

          {/* Steps */}
          <div>
            <ProgressBar step={step} />
            {step === 1 && <Step1 location={location} setLocation={setLocation} onNext={next} />}
            {step === 2 && <Step2 service={service} setService={changeService} onBack={back} onNext={next} />}
            {step === 3 && <Step3 service={service} cfg={cfg} setCfg={setCfg} hairChoice={hairChoice} setHairChoice={setHairChoice} hairProducts={hairProducts} setHairProducts={setHairProducts} onBack={back} onNext={next} />}
            {step === 4 && <Step4 date={date} setDate={setDate} onBack={back} onNext={next} />}
            {step === 5 && <Step5 time={time} setTime={setTime} onBack={back} onNext={next} />}
            {step === 6 && <Step6 details={details} setDetails={setDetails} onBack={back} onNext={next} />}
            {step === 7 && <Step7 location={location} service={service} cfg={cfg} hairChoice={hairChoice} hairProducts={hairProducts} date={date} time={time} details={details} isLondon={isLondon} onBack={back} />}
          </div>

          {/* Live summary sidebar */}
          <div className="order-first lg:order-last">
            <SummaryPanel location={location} service={service} cfg={cfg} hairChoice={hairChoice} hairProducts={hairProducts} date={date} time={time} isLondon={isLondon} />
          </div>

        </div>
      </div>
    </div>
  )
}
