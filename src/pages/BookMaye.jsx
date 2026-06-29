import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin, Clock, ChevronRight, ChevronLeft, Check,
  AlertCircle, ShoppingBag, MessageCircle, Star,
  Calendar, CreditCard, Phone, ArrowRight, Info, X
} from 'lucide-react'

// ── London surcharge ──────────────────────────────────────────────────────────
const LONDON_SURCHARGE = 30
const LOCATIONS = ['Southampton', 'Portsmouth', 'London']

// ── Deposit rate ──────────────────────────────────────────────────────────────
const DEPOSIT_RATE = 0.5

// ── Hair products to buy in-flow ──────────────────────────────────────────────
const HAIR_PRODUCTS = [
  { id: 'bp1', name: 'Braiding Hair — 3 Pack', price: 12, img: null, tag: 'Braids/Twists' },
  { id: 'bp2', name: 'Kanekalon Extension — Long', price: 18, img: null, tag: 'Braids' },
  { id: 'bp3', name: 'Human Hair Closure 4x4', price: 65, img: null, tag: 'Closure' },
  { id: 'bp4', name: 'HD Lace Frontal 13x4', price: 95, img: null, tag: 'Frontal' },
  { id: 'bp5', name: 'Loc Extension Pack', price: 22, img: null, tag: 'Locs' },
  { id: 'bp6', name: 'Crochet Hair — 5 Pack', price: 28, img: null, tag: 'Crochet' },
]

// ── Full service catalogue ────────────────────────────────────────────────────
const SERVICES = {
  hair: {
    label: 'Hair',
    emoji: '💇‍♀️',
    categories: {
      braiding: {
        label: 'Braiding',
        desc: 'Boho braids, miracle braids, knotless braids, box cutting, diamond cutting, free cutting, butterfly braid locs, passion twist braids, single crochet locks, braids with knots, twisting',
        needsHair: true,
        sizes: {
          Small: {
            'Shoulder length': { duration: '4 hours', price: 80 },
            'Bra length': { duration: '4 hours 30 min', price: 110 },
            'Above the bum': { duration: '7 hours', price: 200 },
            'On bum': { duration: '8 hours 30 min', price: 270 },
            'Knee length': { duration: '12 hours', price: 350 },
            'Actual hair — no extension (within shoulder)': { duration: '2 hours', price: 60 },
          },
          Medium: {
            'Shoulder length': { duration: '2 hours', price: 65 },
            'Bra length': { duration: '3 hours', price: 85 },
            'Above the bum': { duration: '6 hours', price: 150 },
            'On bum': { duration: '7 hours', price: 200 },
            'Knee length': { duration: '10 hours', price: 300 },
            'Actual hair — no extension (within shoulder)': { duration: '1 hour 20 min', price: 55 },
          },
          Large: {
            'Shoulder length': { duration: '1 hour 30 min', price: 60 },
            'Bra length': { duration: '2 hours', price: 70 },
            'Above the bum': { duration: '4 hours', price: 100 },
            'On bum': { duration: '5 hours', price: 150 },
            'Knee length': { duration: '—', price: 200 },
            'Actual hair — no extension (within shoulder)': { duration: '45 min', price: 50 },
          },
        },
        note: 'Natural/actual hair longer than bra length: +£10 additional charge',
      },
      cornrows: {
        label: 'Cornrows',
        desc: 'Any style: all back, ponytail, two steps, one-sided braiding, with base, and more',
        needsHair: true,
        subTypes: {
          'Actual hair — no extension': {
            sizes: null,
            lengths: {
              '8–12 pieces': { duration: '30 min', price: 15 },
              '15–20 pieces': { duration: '45 min', price: 20 },
              '21–25 pieces': { duration: '1 hour', price: 25 },
              '25–35 pieces': { duration: '1 hour 10 min', price: 30 },
            },
          },
          'With extension': {
            sizes: null,
            lengths: {
              '8–12 pieces': { duration: '45 min', price: 40 },
              '15–20 pieces': { duration: '1 hour', price: 50 },
              '21–25 pieces': { duration: '1 hour 10 min', price: 55 },
              '25–35 pieces': { duration: '1 hour 30 min', price: 60 },
            },
          },
          'Cornrows in front, braiding behind': {
            sizes: {
              'Extra Small': {
                'Shoulder length': { duration: '4 hours', price: 85 },
                'Bra length': { duration: '4 hours 30 min', price: 110 },
                'Above the bum': { duration: '5 hours', price: 125 },
                'On bum': { duration: '6 hours', price: 140 },
                'Knee length': { duration: '8 hours', price: 160 },
                'Actual hair — no extension (within shoulder)': { duration: '2 hours', price: 65 },
              },
              Small: {
                'Shoulder length': { duration: '4 hours', price: 75 },
                'Bra length': { duration: '4 hours', price: 100 },
                'Above the bum': { duration: '4 hours 30 min', price: 115 },
                'On bum': { duration: '5 hours 30 min', price: 130 },
                'Knee length': { duration: '6 hours', price: 140 },
                'Actual hair — no extension (within shoulder)': { duration: '2 hours', price: 60 },
              },
              Medium: {
                'Shoulder length': { duration: '2 hours', price: 65 },
                'Bra length': { duration: '3 hours 30 min', price: 85 },
                'Above the bum': { duration: '4 hours', price: 100 },
                'On bum': { duration: '5 hours', price: 130 },
                'Knee length': { duration: '6 hours', price: 140 },
                'Actual hair — no extension (within shoulder)': { duration: '1 hour 20 min', price: 55 },
              },
              Large: {
                'Shoulder length': { duration: '2 hours 30 min', price: 60 },
                'Bra length': { duration: '3 hours', price: 70 },
                'Above the bum': { duration: '4 hours', price: 100 },
                'On bum': { duration: '5 hours', price: 150 },
                'Knee length': { duration: '—', price: 200 },
                'Actual hair — no extension (within shoulder)': { duration: '45 min', price: 50 },
              },
            },
          },
        },
        note: 'Natural/actual hair longer than bra length: +£10 additional charge',
      },
      dreadlocks: {
        label: 'Dreadlocks',
        desc: 'Micro locks, sister locks, medium and med-large locks — new and relock services',
        needsHair: false,
        types: {
          'Micro Lock — New': { duration: '8–16 hours', priceRange: [300, 500] },
          'Micro Lock — Relock': { duration: '3–8 hours', price: 250 },
          'Sister Lock — New': { duration: '6–12 hours', priceRange: [250, 350] },
          'Sister Lock — Relock': { duration: '2–8 hours', price: 150 },
          'Medium Lock — New': { duration: '4–9 hours', price: 150 },
          'Medium Lock — Relock': { duration: '1–5 hours', price: 80 },
          'Med-Large Lock — New': { duration: '2–6 hours', price: 120 },
          'Med-Large Lock — Relock': { duration: '1–4 hours', price: 60 },
        },
      },
      fixing: {
        label: 'Fixing & Installation',
        desc: 'Closure, frontal installation, regular fixing, crochet, and cornrows with fixing behind',
        needsHair: true,
        types: {
          'Closure Installation + Cornrows + Styling': { duration: '3–4 hours', price: 85 },
          'Closure Installation + Styling only': { duration: '1–3 hours', price: 60 },
          'Frontal Installation + Cornrows + Styling': { duration: '3–4 hours', price: 85 },
          'Frontal Installation + Styling only': { duration: '1–3 hours', price: 60 },
          'Regular Fixing (pix cut, fringe, dot/invisible closing)': { duration: '2–4 hours', price: 65 },
          'Crochet with cornrows beneath': { duration: '2–4 hours', price: 60 },
        },
      },
      styling: {
        label: 'Bridal, Birthday & Styling',
        desc: 'Bridal hair, birthday styling, wig styling, casual styling — price quoted by style',
        needsHair: false,
        types: {
          'Bridal Hair Styling': { duration: '2–6 hours', priceRange: [150, 350] },
          'Wig Styling': { duration: '1–3 hours', priceRange: [60, 150] },
          'Birthday Hair Styling': { duration: '1–4 hours', priceRange: [60, 200] },
          'Casual Hair Styling': { duration: '1–2 hours', priceRange: [60, 100] },
          'Event Hair Styling': { duration: '1–6 hours', priceRange: [60, 350] },
        },
      },
    },
  },
  makeup: {
    label: 'Makeup',
    emoji: '💄',
    categories: {
      everyday: {
        label: 'Everyday Makeup',
        desc: 'Natural makeup, no-makeup makeup look, soft glam, minimalist makeup',
        needsHair: false,
        types: { 'Everyday Makeup': { duration: '1 hour', price: 60 } },
      },
      glamour: {
        label: 'Glamour Makeup',
        desc: 'Soft glam, full glam, red carpet, party makeup',
        needsHair: false,
        types: {
          'Glamour Makeup': { duration: '1 hour 30 min', price: 65 },
          'Gele only': { duration: '30–45 min', price: 40 },
        },
      },
      bridal: {
        label: 'Bridal Makeup',
        desc: 'Traditional bridal makeup, soft bridal makeup',
        needsHair: false,
        types: {
          'Bridal Makeup': { duration: '2 hours', price: 300 },
          'Bridal Gele': { duration: '1 hour', price: 150 },
        },
      },
      occasion: {
        label: 'Special Occasion',
        desc: 'Birthday, prom, graduation, engagement, wedding guest makeup',
        needsHair: false,
        types: { 'Special Occasion Makeup': { duration: '1 hour', price: 60 } },
      },
      editorial: {
        label: 'Editorial & Fashion',
        desc: 'Editorial, runway, high-fashion, creative makeup',
        needsHair: false,
        types: { 'Editorial & Fashion Makeup': { duration: '2–8 hours', priceRange: [100, 500] } },
      },
      cultural: {
        label: 'Cultural & Traditional',
        desc: 'African traditional bridal, Indian bridal, Arabic, Asian bridal makeup',
        needsHair: false,
        types: { 'Cultural & Traditional Makeup': { duration: '2–3 hours', price: 300 } },
      },
    },
  },
}

// ── Helper: format price ──────────────────────────────────────────────────────
function fmt(p) { return `£${p}` }
function fmtRange(low, high) { return `£${low}–£${high}` }
function displayPrice(item, isLondon) {
  const s = LONDON_SURCHARGE
  if (item.priceRange) return `${fmtRange(item.priceRange[0] + (isLondon ? s : 0), item.priceRange[1] + (isLondon ? s : 0))}`
  if (item.price !== undefined) return fmt(item.price + (isLondon ? s : 0))
  return '—'
}
function basePrice(item) {
  if (item.price !== undefined) return item.price
  if (item.priceRange) return item.priceRange[0]
  return 0
}

// ── Step indicator ────────────────────────────────────────────────────────────
function StepBar({ step }) {
  const steps = ['Service', 'Hair', 'Date & Time', 'Confirm']
  return (
    <div className="flex items-center justify-between mb-6 sm:mb-8 max-w-sm mx-auto">
      {steps.map((s, i) => {
        const n = i + 1
        const active = n === step
        const done = n < step
        return (
          <div key={s} className="flex items-center gap-1 sm:gap-2">
            <div className={`flex flex-col items-center gap-1`}>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-black transition-all
                ${done ? 'bg-emerald-500 text-white' : active ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                {done ? <Check size={13} /> : n}
              </div>
              <span className={`text-[9px] sm:text-[10px] font-bold hidden sm:block transition-colors
                ${active ? 'text-pink-500' : done ? 'text-emerald-600' : 'text-gray-400'}`}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 w-6 sm:w-10 mx-1 rounded-full transition-all
                ${done ? 'bg-emerald-400' : 'bg-gray-100'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Step 1: Choose service ────────────────────────────────────────────────────
function Step1Service({ location, setLocation, selection, setSelection, onNext }) {
  const isLondon = location === 'London'
  const [mainCat, setMainCat] = useState(selection.mainCat || null)
  const [subCat, setSubCat] = useState(selection.subCat || null)
  const [subType, setSubType] = useState(selection.subType || null)
  const [size, setSize] = useState(selection.size || null)
  const [length, setLength] = useState(selection.length || null)
  const [finalItem, setFinalItem] = useState(selection.finalItem || null)

  const resetBelow = (level) => {
    if (level <= 1) { setSubCat(null); setSubType(null); setSize(null); setLength(null); setFinalItem(null) }
    if (level <= 2) { setSubType(null); setSize(null); setLength(null); setFinalItem(null) }
    if (level <= 3) { setSize(null); setLength(null); setFinalItem(null) }
    if (level <= 4) { setLength(null); setFinalItem(null) }
  }

  const canContinue = finalItem && mainCat && subCat
  const needsHair = mainCat && subCat ? SERVICES[mainCat]?.categories[subCat]?.needsHair : false

  const handleNext = () => {
    if (!canContinue) return
    setSelection({ mainCat, subCat, subType, size, length, finalItem, needsHair })
    onNext()
  }

  // Derived price for display
  const servicePrice = finalItem ? basePrice(finalItem) + (isLondon ? LONDON_SURCHARGE : 0) : null
  const deposit = servicePrice ? Math.ceil(servicePrice * DEPOSIT_RATE) : null

  return (
    <div className="space-y-5">
      {/* Location */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
        <label className="text-sm font-bold text-gray-900 block mb-3 flex items-center gap-2">
          <MapPin size={14} className="text-pink-500" /> Choose Location
        </label>
        <div className="grid grid-cols-3 gap-2">
          {LOCATIONS.map(loc => (
            <button key={loc} onClick={() => setLocation(loc)}
              className={`py-2.5 sm:py-3 px-2 rounded-xl text-xs font-bold border-2 transition-all
                ${location === loc ? 'border-pink-500 bg-pink-50 text-pink-600' : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-pink-200'}`}>
              {loc}
              {loc === 'London' && <span className="block text-[9px] text-pink-400 mt-0.5">+£{LONDON_SURCHARGE}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Main category: Hair or Makeup */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
        <label className="text-sm font-bold text-gray-900 block mb-3">What service do you need?</label>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(SERVICES).map(([key, cat]) => (
            <button key={key} onClick={() => { setMainCat(key); resetBelow(1) }}
              className={`p-4 sm:p-5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]
                ${mainCat === key ? 'border-pink-500 bg-pink-50' : 'border-gray-100 bg-gray-50 hover:border-pink-200'}`}>
              <span className="text-3xl">{cat.emoji}</span>
              <span className={`text-sm font-bold ${mainCat === key ? 'text-pink-600' : 'text-gray-700'}`}>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sub-category */}
      {mainCat && (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
          <label className="text-sm font-bold text-gray-900 block mb-3">Choose a category</label>
          <div className="space-y-2">
            {Object.entries(SERVICES[mainCat].categories).map(([key, cat]) => (
              <button key={key} onClick={() => { setSubCat(key); resetBelow(2) }}
                className={`w-full text-left p-3 sm:p-4 rounded-xl border-2 transition-all
                  ${subCat === key ? 'border-pink-500 bg-pink-50' : 'border-gray-100 hover:border-pink-200 hover:bg-gray-50'}`}>
                <p className={`text-sm font-bold mb-0.5 ${subCat === key ? 'text-pink-600' : 'text-gray-800'}`}>{cat.label}</p>
                <p className="text-[10px] text-gray-400 leading-relaxed">{cat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sub-type (cornrows) */}
      {mainCat && subCat && SERVICES[mainCat].categories[subCat].subTypes && (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
          <label className="text-sm font-bold text-gray-900 block mb-3">Choose cornrow type</label>
          <div className="space-y-2">
            {Object.entries(SERVICES[mainCat].categories[subCat].subTypes).map(([key, sub]) => (
              <button key={key} onClick={() => { setSubType(key); resetBelow(3) }}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all text-sm
                  ${subType === key ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold' : 'border-gray-100 text-gray-700 hover:border-pink-200 hover:bg-gray-50'}`}>
                {key}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size selection (braiding / cornrows-in-front) */}
      {(() => {
        const cat = mainCat && subCat ? SERVICES[mainCat].categories[subCat] : null
        const hasSizes = cat?.sizes || (cat?.subTypes && subType && cat.subTypes[subType]?.sizes)
        const sizeMap = cat?.sizes || (subType && cat?.subTypes?.[subType]?.sizes)
        if (!hasSizes || !sizeMap) return null
        return (
          <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
            <label className="text-sm font-bold text-gray-900 block mb-3">Choose size</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(sizeMap).map(s => (
                <button key={s} onClick={() => { setSize(s); resetBelow(4) }}
                  className={`px-4 py-2 rounded-full text-xs font-bold border-2 transition-all
                    ${size === s ? 'border-pink-500 bg-pink-500 text-white' : 'border-gray-200 text-gray-600 hover:border-pink-300'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )
      })()}

      {/* Length selection (braiding / cornrows) */}
      {(() => {
        const cat = mainCat && subCat ? SERVICES[mainCat].categories[subCat] : null
        const sizeMap = cat?.sizes || (subType && cat?.subTypes?.[subType]?.sizes)
        const lengthMap = sizeMap && size ? sizeMap[size]
          : (subType && cat?.subTypes?.[subType]?.lengths ? cat.subTypes[subType].lengths : null)
        if (!lengthMap) return null
        return (
          <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
            <label className="text-sm font-bold text-gray-900 block mb-3">Choose length / pieces</label>
            <div className="space-y-2">
              {Object.entries(lengthMap).map(([lKey, item]) => (
                <button key={lKey} onClick={() => { setLength(lKey); setFinalItem(item) }}
                  className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-xl border-2 transition-all
                    ${length === lKey ? 'border-pink-500 bg-pink-50' : 'border-gray-100 hover:border-pink-200 hover:bg-gray-50'}`}>
                  <div className="text-left">
                    <p className={`text-sm font-bold ${length === lKey ? 'text-pink-700' : 'text-gray-800'}`}>{lKey}</p>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock size={9} /> {item.duration}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-gray-900">{displayPrice(item, isLondon)}</p>
                    {isLondon && <p className="text-[9px] text-pink-400">+£{LONDON_SURCHARGE} London</p>}
                  </div>
                </button>
              ))}
            </div>
            {cat?.note && (
              <div className="mt-3 flex items-start gap-2 text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
                <Info size={12} className="shrink-0 mt-0.5" /> {cat.note}
              </div>
            )}
          </div>
        )
      })()}

      {/* Dreadlocks / Fixing / Styling / Makeup — flat type list */}
      {(() => {
        const cat = mainCat && subCat ? SERVICES[mainCat].categories[subCat] : null
        if (!cat?.types) return null
        return (
          <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
            <label className="text-sm font-bold text-gray-900 block mb-3">Choose service</label>
            <div className="space-y-2">
              {Object.entries(cat.types).map(([key, item]) => (
                <button key={key} onClick={() => { setSubType(key); setLength(key); setFinalItem(item) }}
                  className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-xl border-2 transition-all
                    ${length === key ? 'border-pink-500 bg-pink-50' : 'border-gray-100 hover:border-pink-200 hover:bg-gray-50'}`}>
                  <div className="text-left">
                    <p className={`text-sm font-bold ${length === key ? 'text-pink-700' : 'text-gray-800'}`}>{key}</p>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock size={9} /> {item.duration}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-gray-900">{displayPrice(item, isLondon)}</p>
                    {isLondon && item.price && <p className="text-[9px] text-pink-400">+£{LONDON_SURCHARGE} London</p>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )
      })()}

      {/* Price summary chip */}
      {finalItem && (
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-4 text-white flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-pink-100">Service total</p>
            <p className="text-2xl font-black">{servicePrice ? fmt(servicePrice) : '—'}</p>
            {deposit && <p className="text-xs text-pink-100 mt-0.5">50% deposit to confirm: <strong className="text-white">£{deposit}</strong></p>}
          </div>
          <button onClick={handleNext}
            className="bg-white text-pink-500 font-black text-sm px-5 py-3 rounded-xl hover:bg-pink-50 transition-all flex items-center gap-2 active:scale-95">
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

// ── Step 2: Hair option ───────────────────────────────────────────────────────
function Step2Hair({ needsHair, hairChoice, setHairChoice, hairProducts, setHairProducts, onBack, onNext }) {
  const toggle = (product) => {
    setHairProducts(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    )
  }

  if (!needsHair) {
    // Skip this step automatically
    setTimeout(onNext, 0)
    return null
  }

  return (
    <div className="space-y-5">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Do you have your hair?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button onClick={() => setHairChoice('own')}
            className={`p-4 rounded-2xl border-2 text-left transition-all
              ${hairChoice === 'own' ? 'border-pink-500 bg-pink-50' : 'border-gray-100 hover:border-pink-200'}`}>
            <div className="text-2xl mb-2">🧴</div>
            <p className={`text-sm font-bold mb-1 ${hairChoice === 'own' ? 'text-pink-700' : 'text-gray-800'}`}>
              I'll bring my own hair
            </p>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Bring the hair you'd like Maye to use. Ensure it's the right type and quantity for your service.
            </p>
          </button>
          <button onClick={() => setHairChoice('buy')}
            className={`p-4 rounded-2xl border-2 text-left transition-all
              ${hairChoice === 'buy' ? 'border-pink-500 bg-pink-50' : 'border-gray-100 hover:border-pink-200'}`}>
            <div className="text-2xl mb-2">🛍️</div>
            <p className={`text-sm font-bold mb-1 ${hairChoice === 'buy' ? 'text-pink-700' : 'text-gray-800'}`}>
              Buy Rejuveefy hair
            </p>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              We'll source the right hair for your style and deliver it to Maye's session.
            </p>
          </button>
        </div>
      </div>

      {hairChoice === 'buy' && (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">Choose your hair</h3>
            <Link to="/shop/hair-bundles" className="text-[10px] text-pink-500 font-bold flex items-center gap-1">
              View all <ChevronRight size={10} />
            </Link>
          </div>
          <div className="space-y-2">
            {HAIR_PRODUCTS.map(p => {
              const selected = hairProducts.find(x => x.id === p.id)
              return (
                <button key={p.id} onClick={() => toggle(p)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all
                    ${selected ? 'border-pink-500 bg-pink-50' : 'border-gray-100 hover:border-pink-200'}`}>
                  <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-xl shrink-0">💆‍♀️</div>
                  <div className="flex-1 text-left">
                    <p className={`text-xs font-bold ${selected ? 'text-pink-700' : 'text-gray-800'}`}>{p.name}</p>
                    <span className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{p.tag}</span>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <p className="text-sm font-black text-gray-900">£{p.price}</p>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${selected ? 'border-pink-500 bg-pink-500' : 'border-gray-300'}`}>
                      {selected && <Check size={10} className="text-white" />}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
          {hairProducts.length > 0 && (
            <div className="mt-3 flex items-center justify-between text-xs text-gray-600 bg-gray-50 rounded-xl p-3">
              <span>{hairProducts.length} item{hairProducts.length > 1 ? 's' : ''} selected</span>
              <span className="font-black text-gray-900">+£{hairProducts.reduce((a, p) => a + p.price, 0)}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack}
          className="flex items-center gap-2 border-2 border-gray-200 text-gray-600 font-bold px-5 py-3.5 rounded-xl hover:border-gray-300 transition-all text-sm">
          <ChevronLeft size={15} /> Back
        </button>
        <button onClick={onNext} disabled={!hairChoice}
          className="flex-1 bg-pink-500 text-white font-bold py-3.5 rounded-xl hover:bg-pink-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm active:scale-[0.99]">
          Next <ChevronRight size={15} />
        </button>
      </div>
    </div>
  )
}

// ── Simple calendar ───────────────────────────────────────────────────────────
const TIMES = ['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM',
  '12:00 PM','12:30 PM','1:00 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','5:00 PM']

function CalendarPicker({ selectedDate, setSelectedDate, selectedTime, setSelectedTime }) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const monthName = new Date(viewYear, viewMonth).toLocaleString('en-GB', { month: 'long', year: 'numeric' })

  const prevMonth = () => { if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) } else setViewMonth(m => m - 1) }
  const nextMonth = () => { if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) } else setViewMonth(m => m + 1) }

  const isDisabled = (d) => {
    const date = new Date(viewYear, viewMonth, d)
    const day = date.getDay()
    return date < today || day === 0 // past or Sunday
  }

  const fmt = (d) => `${d} ${new Date(viewYear, viewMonth).toLocaleString('en-GB', { month: 'short' })} ${viewYear}`

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><ChevronLeft size={16} /></button>
        <p className="text-sm font-bold text-gray-900">{monthName}</p>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><ChevronRight size={16} /></button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 mb-2">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
        {Array(daysInMonth).fill(null).map((_, i) => {
          const d = i + 1
          const label = fmt(d)
          const disabled = isDisabled(d)
          const selected = selectedDate === label
          return (
            <button key={d} onClick={() => !disabled && setSelectedDate(label)} disabled={disabled}
              className={`aspect-square rounded-xl text-xs font-bold transition-all
                ${selected ? 'bg-pink-500 text-white' : disabled ? 'text-gray-200 cursor-not-allowed' : 'hover:bg-pink-50 text-gray-700 hover:text-pink-600'}`}>
              {d}
            </button>
          )
        })}
      </div>

      {selectedDate && (
        <div className="mt-4">
          <p className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
            <Clock size={12} className="text-pink-500" /> Available times for {selectedDate}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
            {TIMES.map(t => (
              <button key={t} onClick={() => setSelectedTime(t)}
                className={`py-2 rounded-lg text-[10px] font-bold border transition-all
                  ${selectedTime === t ? 'bg-pink-500 text-white border-pink-500' : 'border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-600'}`}>
                {t}
              </button>
            ))}
          </div>
          <p className="text-[9px] text-gray-400 mt-2 flex items-center gap-1">
            <Info size={9} /> Times shown in UK local time. Maye will confirm via WhatsApp within 24h.
          </p>
        </div>
      )}
    </div>
  )
}

// ── Step 3: Date & time ───────────────────────────────────────────────────────
function Step3DateTime({ date, setDate, time, setTime, onBack, onNext }) {
  return (
    <div className="space-y-5">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
          <Calendar size={14} className="text-pink-500" /> Choose Your Date & Time
        </h3>
        <p className="text-[11px] text-gray-400 mb-5">
          Sundays unavailable. Maye will confirm your exact slot within 24 hours.
        </p>
        <CalendarPicker selectedDate={date} setSelectedDate={setDate} selectedTime={time} setSelectedTime={setTime} />
      </div>

      <div className="flex gap-3">
        <button onClick={onBack}
          className="flex items-center gap-2 border-2 border-gray-200 text-gray-600 font-bold px-5 py-3.5 rounded-xl hover:border-gray-300 transition-all text-sm">
          <ChevronLeft size={15} /> Back
        </button>
        <button onClick={onNext} disabled={!date || !time}
          className="flex-1 bg-pink-500 text-white font-bold py-3.5 rounded-xl hover:bg-pink-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm">
          Next <ChevronRight size={15} />
        </button>
      </div>
    </div>
  )
}

// ── Step 4: Confirm ───────────────────────────────────────────────────────────
function Step4Confirm({ location, selection, hairChoice, hairProducts, date, time, onBack }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [payMethod, setPayMethod] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const isLondon = location === 'London'
  const servicePrice = selection.finalItem ? basePrice(selection.finalItem) + (isLondon ? LONDON_SURCHARGE : 0) : 0
  const hairTotal = hairProducts.reduce((a, p) => a + p.price, 0)
  const deposit = Math.ceil(servicePrice * DEPOSIT_RATE)
  const total = servicePrice + hairTotal

  const canSubmit = name && email && phone && payMethod

  const WHATSAPP = 'https://wa.me/447700900000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    // Build WhatsApp message for bank transfer route
    if (payMethod === 'bank') {
      const msg = encodeURIComponent(
        `Hi Maye! I'd like to book:\n\n📍 Location: ${location}\n💇 Service: ${selection.subType || selection.subCat} — ${selection.length || ''}\n📅 Date: ${date} at ${time}\n👤 Name: ${name}\n📧 Email: ${email}\n📞 Phone: ${phone}\n\n💰 Service total: £${servicePrice}\n💳 50% deposit: £${deposit}\n\nPlease send bank transfer details to confirm my booking.`
      )
      setTimeout(() => { window.open(`${WHATSAPP}?text=${msg}`, '_blank'); setLoading(false); setSubmitted(true) }, 600)
    } else {
      // Stripe placeholder
      setTimeout(() => { setLoading(false); setSubmitted(true) }, 800)
    }
  }

  const serviceName = [
    selection.mainCat && SERVICES[selection.mainCat]?.label,
    selection.subCat && SERVICES[selection.mainCat]?.categories[selection.subCat]?.label,
    selection.size,
    selection.length,
  ].filter(Boolean).join(' › ')

  if (submitted) {
    return (
      <div className="text-center py-10 px-4">
        <div className="w-20 h-20 mx-auto mb-5 bg-emerald-100 rounded-full flex items-center justify-center">
          <Check size={36} className="text-emerald-500" />
        </div>
        <h2 className="font-display text-2xl font-black text-gray-900 mb-2">Booking Request Sent!</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed max-w-xs mx-auto">
          {payMethod === 'bank'
            ? "Maye will confirm via WhatsApp and send her bank details to secure your deposit. You're almost there."
            : "Your deposit request has been received. Maye will confirm your booking within 24 hours."}
        </p>
        <div className="bg-gray-50 rounded-2xl p-5 text-left space-y-2 mb-6 max-w-xs mx-auto">
          <div className="flex justify-between text-xs"><span className="text-gray-400">Service</span><span className="font-bold text-gray-800 text-right max-w-[60%]">{serviceName}</span></div>
          <div className="flex justify-between text-xs"><span className="text-gray-400">Date</span><span className="font-bold text-gray-800">{date}</span></div>
          <div className="flex justify-between text-xs"><span className="text-gray-400">Time</span><span className="font-bold text-gray-800">{time}</span></div>
          <div className="flex justify-between text-xs"><span className="text-gray-400">Location</span><span className="font-bold text-gray-800">{location}</span></div>
          <div className="border-t border-gray-200 pt-2 flex justify-between text-sm"><span className="font-bold text-gray-700">Deposit due</span><span className="font-black text-pink-600">£{deposit}</span></div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 mb-6 max-w-xs mx-auto">
          <strong>Cancellation policy:</strong> No refund if cancelled within 4 hours of your appointment.
        </div>
        <Link to="/" className="inline-flex items-center gap-2 bg-pink-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-pink-600 transition-colors text-sm">
          Back to Home <ArrowRight size={14} />
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Summary */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Booking Summary</h3>
        <div className="space-y-2.5">
          <div className="flex justify-between items-start text-xs">
            <span className="text-gray-400">Service</span>
            <span className="font-bold text-gray-800 text-right max-w-[65%] leading-relaxed">{serviceName}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Duration</span>
            <span className="font-bold text-gray-800">{selection.finalItem?.duration || '—'}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Location</span>
            <span className="font-bold text-gray-800">{location}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Date & Time</span>
            <span className="font-bold text-gray-800">{date} · {time}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Hair</span>
            <span className="font-bold text-gray-800">{hairChoice === 'buy' ? `Rejuveefy hair (+£${hairTotal})` : hairChoice === 'own' ? 'Bringing own hair' : 'N/A'}</span>
          </div>
          {isLondon && (
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">London surcharge</span>
              <span className="font-bold text-pink-600">+£{LONDON_SURCHARGE}</span>
            </div>
          )}
          <div className="border-t border-gray-100 pt-2.5 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-semibold">Total</span>
              <span className="font-black text-gray-900">£{total}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-pink-600 font-bold">50% Deposit to confirm</span>
              <span className="font-black text-pink-600">£{deposit}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Your details */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Your Details</h3>
        <div className="space-y-3">
          <input type="text" placeholder="Full name *" value={name} onChange={e => setName(e.target.value)} required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400 transition-colors" />
          <input type="email" placeholder="Email address *" value={email} onChange={e => setEmail(e.target.value)} required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400 transition-colors" />
          <input type="tel" placeholder="Phone number *" value={phone} onChange={e => setPhone(e.target.value)} required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400 transition-colors" />
        </div>
      </div>

      {/* Payment */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 mb-1">Pay Your Deposit — £{deposit}</h3>
        <p className="text-[10px] text-gray-400 mb-4">50% required to confirm your booking slot</p>
        <div className="space-y-3">
          <button type="button" onClick={() => setPayMethod('stripe')}
            className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all relative
              ${payMethod === 'stripe' ? 'border-pink-500 bg-pink-50' : 'border-gray-100 hover:border-pink-200'}`}>
            <CreditCard size={18} className="text-pink-500 shrink-0" />
            <div className="flex-1">
              <p className={`text-sm font-bold ${payMethod === 'stripe' ? 'text-pink-700' : 'text-gray-800'}`}>Pay by Card</p>
              <p className="text-[10px] text-gray-400">Secure payment via Stripe</p>
            </div>
            <span className="text-[9px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">Coming Soon</span>
          </button>

          <button type="button" onClick={() => setPayMethod('bank')}
            className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all
              ${payMethod === 'bank' ? 'border-pink-500 bg-pink-50' : 'border-gray-100 hover:border-pink-200'}`}>
            <Phone size={18} className="text-green-500 shrink-0" />
            <div>
              <p className={`text-sm font-bold ${payMethod === 'bank' ? 'text-pink-700' : 'text-gray-800'}`}>Bank Transfer via WhatsApp</p>
              <p className="text-[10px] text-gray-400">Maye will send her bank details on WhatsApp to complete your deposit</p>
            </div>
          </button>
        </div>
      </div>

      {/* Cancellation notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle size={14} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-bold text-amber-800">Cancellation Policy</p>
          <p className="text-[10px] text-amber-700 mt-0.5 leading-relaxed">
            No refund if cancelled within 4 hours of your appointment. Please contact Maye as soon as possible if you need to reschedule.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack}
          className="flex items-center gap-2 border-2 border-gray-200 text-gray-600 font-bold px-5 py-3.5 rounded-xl hover:border-gray-300 transition-all text-sm shrink-0">
          <ChevronLeft size={15} /> Back
        </button>
        <button type="submit" disabled={!canSubmit || loading || payMethod === 'stripe'}
          className="flex-1 bg-pink-500 text-white font-bold py-3.5 rounded-xl hover:bg-pink-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm active:scale-[0.99]">
          {loading ? 'Sending...' : payMethod === 'bank' ? '📲 Open WhatsApp to Pay' : payMethod === 'stripe' ? 'Card payment coming soon' : 'Confirm Booking'}
        </button>
      </div>
    </form>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function BookMaye() {
  const [step, setStep] = useState(1)
  const [location, setLocation] = useState('Southampton')
  const [selection, setSelection] = useState({})
  const [hairChoice, setHairChoice] = useState('')
  const [hairProducts, setHairProducts] = useState([])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const needsHair = selection.needsHair || false

  const next = () => setStep(s => s + 1)
  const back = () => setStep(s => s - 1)

  // Skip step 2 if service doesn't need hair
  const goNext1 = () => {
    if (!needsHair) { setStep(3) } else { setStep(2) }
  }
  const goBack3 = () => {
    if (!needsHair) { setStep(1) } else { setStep(2) }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          {/* Breadcrumb */}
          <p className="text-xs text-gray-400 pt-5 pb-2">
            <Link to="/" className="hover:text-pink-500">Home</Link> ›{' '}
            <Link to="/book" className="hover:text-pink-500">Book</Link> › Book Maye
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 pb-0 lg:pb-8">
            {/* Left: Her profile */}
            <div className="flex flex-col py-6 lg:py-8">
              {/* Avatar + name */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative">
                  {/* Placeholder portrait — black woman */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-amber-900 to-amber-700 flex items-center justify-center text-4xl overflow-hidden shadow-lg border-2 border-white">
                    <span>👩🏾</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="font-display text-2xl sm:text-3xl font-black text-gray-900">Maye</h1>
                    <span className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center" title="Verified">
                      <Check size={11} className="text-white" />
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-semibold">Founder · Hair Artist · Makeup Specialist</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(i => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                      <span className="text-[10px] text-gray-400 ml-1">5.0</span>
                    </div>
                    <span className="text-gray-200">·</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Available</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {['10+ Years Experience', 'Southampton', 'Portsmouth', 'London', 'Afro Specialist', 'Bridal'].map(t => (
                  <span key={t} className="text-[10px] font-bold px-3 py-1 bg-gray-100 text-gray-600 rounded-full">{t}</span>
                ))}
              </div>

              {/* Bio */}
              <blockquote className="text-sm text-gray-600 leading-relaxed italic border-l-2 border-pink-300 pl-4 mb-5">
                "Maye built her craft in Africa over more than a decade — mastering braiding, protective styling, and makeup artistry before bringing her vision to the UK. Now working across Southampton, Portsmouth, and London, she works with clients who want more than a service. They want an experience. Rejuveefy was born from her belief that every woman deserves to feel extraordinary. When you book Maye, you're not booking a slot. You're booking the hands that built this."
              </blockquote>

              {/* Placeholder gallery */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { emoji: '🖤', label: 'Knotless Braids' },
                  { emoji: '💄', label: 'Bridal Glam' },
                  { emoji: '🌿', label: 'Faux Locs' },
                ].map((item, i) => (
                  <div key={i}
                    className="aspect-square rounded-xl bg-gradient-to-br from-amber-900 to-amber-700 flex flex-col items-center justify-center text-white gap-1 overflow-hidden">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-[9px] font-bold text-white/80">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Stats on desktop */}
            <div className="hidden lg:flex flex-col justify-center gap-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: '10+', label: 'Years Experience' },
                  { n: '3', label: 'UK Locations' },
                  { n: '500+', label: 'Happy Clients' },
                  { n: '5.0', label: 'Average Rating' },
                ].map(s => (
                  <div key={s.label} className="bg-gray-50 rounded-2xl p-5 text-center">
                    <p className="font-black text-3xl text-gray-900 mb-1">{s.n}</p>
                    <p className="text-xs text-gray-400 font-semibold">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
                <p className="text-sm font-bold text-gray-900 mb-2">What to expect</p>
                <ul className="space-y-2">
                  {[
                    'Personalised consultation before every appointment',
                    '50% deposit secures your slot',
                    'Option to purchase your hair through Rejuveefy',
                    'No refunds within 4 hours of appointment',
                  ].map(t => (
                    <li key={t} className="text-xs text-gray-600 flex items-start gap-2">
                      <Check size={12} className="text-pink-500 shrink-0 mt-0.5" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Booking flow ── */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display text-lg font-black text-gray-900">Book Your Session</h2>
            <span className="text-xs text-gray-400">Step {step} of 4</span>
          </div>
          <StepBar step={step} />

          {step === 1 && (
            <Step1Service
              location={location} setLocation={setLocation}
              selection={selection} setSelection={setSelection}
              onNext={goNext1}
            />
          )}
          {step === 2 && (
            <Step2Hair
              needsHair={needsHair}
              hairChoice={hairChoice} setHairChoice={setHairChoice}
              hairProducts={hairProducts} setHairProducts={setHairProducts}
              onBack={() => setStep(1)} onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <Step3DateTime
              date={date} setDate={setDate}
              time={time} setTime={setTime}
              onBack={goBack3} onNext={() => setStep(4)}
            />
          )}
          {step === 4 && (
            <Step4Confirm
              location={location}
              selection={selection}
              hairChoice={hairChoice}
              hairProducts={hairProducts}
              date={date} time={time}
              onBack={() => setStep(3)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
