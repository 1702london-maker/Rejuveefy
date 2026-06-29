import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Upload, Camera, Sparkles, BarChart2, ArrowRight, RotateCcw, AlertCircle, X, SwitchCamera, ChevronRight, Star, ShoppingBag } from 'lucide-react'

// ── Compress image to 512px — fits OpenAI detail:low budget ──────────────────
function compressImage(dataUrl, maxPx = 512, quality = 0.82) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, maxPx / Math.max(img.width, img.height))
      const w = Math.round(img.width * scale)
      const h = Math.round(img.height * scale)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      canvas.getContext('2d').drawImage(img, 0, 0, w, h)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.src = dataUrl
  })
}

// ── Composite multiple angle images side by side ──────────────────────────────
function compositeAngles(slots) {
  const filled = slots.filter(s => s.url)
  if (filled.length === 1) return compressImage(filled[0].url, 512, 0.82)
  return new Promise((resolve) => {
    const imgs = filled.map(s => {
      const i = new Image()
      i.src = s.url
      return { img: i, label: s.label }
    })
    let loaded = 0
    imgs.forEach(({ img }) => {
      img.onload = () => {
        loaded++
        if (loaded < imgs.length) return
        const h = 512
        const slotW = Math.round(h * 0.7)
        const canvas = document.createElement('canvas')
        canvas.width = slotW * imgs.length
        canvas.height = h
        const ctx = canvas.getContext('2d')
        imgs.forEach(({ img: image, label }, i) => {
          const x = i * slotW
          ctx.fillStyle = '#f0f0f0'
          ctx.fillRect(x, 0, slotW, h)
          const scale = Math.min(slotW / image.width, h / image.height)
          const dw = image.width * scale
          const dh = image.height * scale
          ctx.drawImage(image, x + (slotW - dw) / 2, (h - dh) / 2, dw, dh)
          ctx.fillStyle = 'rgba(0,0,0,0.55)'
          ctx.fillRect(x, h - 26, slotW, 26)
          ctx.fillStyle = '#fff'
          ctx.font = 'bold 13px Arial'
          ctx.textAlign = 'center'
          ctx.fillText(label, x + slotW / 2, h - 9)
        })
        resolve(canvas.toDataURL('image/jpeg', 0.82))
      }
    })
  })
}

// ── Score bar ─────────────────────────────────────────────────────────────────
function ScoreBar({ label, value }) {
  const pct = Math.max(0, Math.min(100, value || 0))
  const color = pct >= 75 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-400' : 'bg-rose-400'
  const tc = pct >= 75 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-rose-500'
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-gray-600">{label}</span>
        <span className={`text-xs font-bold ${tc}`}>{pct}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

// ── Face shape guide ──────────────────────────────────────────────────────────
const FACE_SHAPE_INFO = {
  Oval:    { emoji: '🥚', tip: 'Most versatile face shape — almost any style works beautifully.' },
  Round:   { emoji: '⭕', tip: 'Styles with height and length elongate and define the face.' },
  Square:  { emoji: '⬜', tip: 'Soft, layered styles and waves balance strong jawlines.' },
  Heart:   { emoji: '🫀', tip: 'Styles with volume at the jaw balance a wider forehead.' },
  Diamond: { emoji: '💎', tip: 'Chin-length bobs and fringe balance cheekbones beautifully.' },
  Oblong:  { emoji: '📏', tip: 'Wide, voluminous styles add width and reduce face length.' },
}

// ── Hair Analysis Results ─────────────────────────────────────────────────────
function HairResults({ result, previewUrl, onReset }) {
  const overall = result.overallScore || 70
  const faceInfo = FACE_SHAPE_INFO[result.faceShape] || FACE_SHAPE_INFO.Oval
  const condColor = result.condition === 'Excellent' ? 'text-emerald-600 bg-emerald-50' :
    result.condition === 'Good' ? 'text-blue-600 bg-blue-50' :
    result.condition === 'Fair' ? 'text-amber-600 bg-amber-50' : 'text-rose-600 bg-rose-50'

  return (
    <div className="space-y-4">

      {/* Header score card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-start gap-4">
          <div className="relative w-20 h-20 shrink-0">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="30" fill="none" stroke="#FCE4EC" strokeWidth="8" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#EC4899" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 30 * overall / 100} ${2 * Math.PI * 30}`}
                strokeLinecap="round" className="transition-all duration-1000" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-bold text-xl text-gray-900 leading-none">{overall}</span>
              <span className="text-[9px] text-gray-400">/100</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h2 className="font-display text-lg font-bold text-gray-900">Hair Analysis</h2>
              {previewUrl && <img src={previewUrl} alt="" className="w-12 h-12 rounded-xl object-cover border border-gray-100 shrink-0" />}
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${condColor}`}>{result.condition || 'Good'}</span>
              {result.hairType && <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-pink-50 text-pink-600">{result.hairType}</span>}
              {result.porosity && <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-600">{result.porosity} Porosity</span>}
              {result.density && <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600">{result.density} Density</span>}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{result.summary}</p>
          </div>
        </div>
      </div>

      {/* Face shape */}
      {result.faceShape && (
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 rounded-2xl p-4 flex items-start gap-3">
          <div className="text-3xl shrink-0">{faceInfo.emoji}</div>
          <div>
            <p className="text-sm font-bold text-gray-900 mb-0.5">{result.faceShape} Face Shape</p>
            <p className="text-xs text-gray-500 leading-relaxed">{faceInfo.tip}</p>
          </div>
        </div>
      )}

      {/* Best hairstyles for this face shape */}
      {result.bestStyles?.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900">Best Styles for Your Face Shape</h3>
            <Link to="/book/braids" className="text-[10px] text-pink-500 font-semibold flex items-center gap-0.5">Book <ChevronRight size={11} /></Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.bestStyles.map((s, i) => (
              <span key={i} className="flex items-center gap-1.5 text-xs font-semibold bg-pink-500 text-white px-3 py-1.5 rounded-full">
                <Star size={10} fill="white" /> {s}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-3">All styles available to book with Rejuveefy providers</p>
        </div>
      )}

      {/* Wig recommendations */}
      {result.wigPicks?.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900">Wig Recommendations for You</h3>
            <Link to="/shop/hair-bundles" className="text-[10px] text-pink-500 font-semibold flex items-center gap-0.5">Shop <ChevronRight size={11} /></Link>
          </div>
          <div className="space-y-3">
            {result.wigPicks.map((w, i) => (
              <div key={i} className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl hover:border-pink-200 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center shrink-0 text-lg">💆‍♀️</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">{w.style}</p>
                  <div className="flex gap-2 mt-0.5 mb-1">
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{w.length}</span>
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{w.curl}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{w.why}</p>
                </div>
                <Link to="/shop/hair-bundles" className="text-[10px] bg-pink-500 text-white px-2.5 py-1.5 rounded-full hover:bg-pink-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1">
                  <ShoppingBag size={10} /> Shop
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Health scores */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Hair Health Breakdown</h3>
        {[
          { label: 'Moisture', value: result.scores?.moisture },
          { label: 'Strength & Elasticity', value: result.scores?.strength },
          { label: 'Scalp Health', value: result.scores?.scalp },
          { label: 'Shine', value: result.scores?.shine },
          { label: 'Density', value: result.scores?.density },
          { label: 'Growth Potential', value: result.scores?.growth },
        ].map(s => <ScoreBar key={s.label} {...s} />)}
      </div>

      {/* Insights */}
      {result.insights?.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-3">What We Found</h3>
          <ul className="space-y-2.5">
            {result.insights.map((ins, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <div className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold text-pink-500">{i + 1}</span>
                </div>
                {ins}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Concerns */}
      {result.concerns?.length > 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-amber-800 mb-2.5 flex items-center gap-2"><AlertCircle size={14} /> Areas to Address</h3>
          <ul className="space-y-1.5">
            {result.concerns.map((c, i) => (
              <li key={i} className="text-xs text-amber-700 flex items-start gap-2">
                <span className="mt-0.5 shrink-0">•</span>{c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Product recommendations */}
      {result.recommendations?.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">Recommended Products</h3>
            <Link to="/shop/hair-care" className="text-xs text-pink-500 font-semibold flex items-center gap-1">View All <ArrowRight size={12} /></Link>
          </div>
          <div className="space-y-3">
            {result.recommendations.map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:border-pink-200 transition-colors">
                <div className="w-11 h-11 bg-pink-50 rounded-xl flex items-center justify-center shrink-0 text-lg">🧴</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800">{r.product}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">{r.reason}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <div className="h-1.5 bg-emerald-500 rounded-full" style={{ width: `${Math.min(r.match, 99) * 0.6}px` }} />
                    <span className="text-[9px] font-bold text-emerald-600">{r.match}% match</span>
                  </div>
                </div>
                <Link to="/shop/hair-care" className="text-[10px] bg-pink-500 text-white px-3 py-1.5 rounded-full hover:bg-pink-600 transition-colors shrink-0">Shop</Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-5 text-white">
        <p className="text-sm font-bold mb-1">Book a Hair Specialist</p>
        <p className="text-xs text-pink-100 mb-3">Connect with a provider who specialises in {result.hairType || 'your hair type'} near you.</p>
        <div className="flex gap-2">
          <Link to="/book/braids" className="flex-1 bg-white text-pink-500 text-xs font-bold py-2.5 rounded-full text-center hover:bg-pink-50 transition-colors">Find a Specialist</Link>
          <button onClick={onReset} className="border border-white/50 text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-white/10 transition-colors flex items-center gap-1.5">
            <RotateCcw size={12} /> New Analysis
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Skin Analysis Results ─────────────────────────────────────────────────────
function SkinResults({ result, previewUrl, onReset }) {
  const overall = result.overallScore || 70
  const condColor = result.condition === 'Excellent' ? 'text-emerald-600 bg-emerald-50' :
    result.condition === 'Good' ? 'text-blue-600 bg-blue-50' :
    result.condition === 'Fair' ? 'text-amber-600 bg-amber-50' : 'text-rose-600 bg-rose-50'
  const faceInfo = FACE_SHAPE_INFO[result.faceShape]

  return (
    <div className="space-y-4">

      {/* Header score */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-start gap-4">
          <div className="relative w-20 h-20 shrink-0">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="30" fill="none" stroke="#FCE4EC" strokeWidth="8" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#EC4899" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 30 * overall / 100} ${2 * Math.PI * 30}`}
                strokeLinecap="round" className="transition-all duration-1000" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-bold text-xl text-gray-900 leading-none">{overall}</span>
              <span className="text-[9px] text-gray-400">/100</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h2 className="font-display text-lg font-bold text-gray-900">Skin Analysis</h2>
              {previewUrl && <img src={previewUrl} alt="" className="w-12 h-12 rounded-xl object-cover border border-gray-100 shrink-0" />}
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${condColor}`}>{result.condition || 'Good'}</span>
              {result.skinType && <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-pink-50 text-pink-600">{result.skinType} Skin</span>}
              {result.undertone && <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600">{result.undertone} Undertone</span>}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{result.summary}</p>
          </div>
        </div>
      </div>

      {/* Face shape */}
      {faceInfo && (
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 rounded-2xl p-4 flex items-start gap-3">
          <div className="text-3xl shrink-0">{faceInfo.emoji}</div>
          <div>
            <p className="text-sm font-bold text-gray-900 mb-0.5">{result.faceShape} Face Shape Detected</p>
            <p className="text-xs text-gray-500 leading-relaxed">{faceInfo.tip}</p>
          </div>
        </div>
      )}

      {/* Skin scores */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Skin Health Breakdown</h3>
        {[
          { label: 'Hydration', value: result.scores?.hydration },
          { label: 'Evenness & Tone', value: result.scores?.evenness },
          { label: 'Texture & Smoothness', value: result.scores?.texture },
          { label: 'Radiance & Glow', value: result.scores?.radiance },
          { label: 'Pore Clarity', value: result.scores?.pores },
          { label: 'Firmness', value: result.scores?.firmness },
        ].map(s => <ScoreBar key={s.label} {...s} />)}
      </div>

      {/* Insights */}
      {result.insights?.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-3">What We Found</h3>
          <ul className="space-y-2.5">
            {result.insights.map((ins, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <div className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold text-pink-500">{i + 1}</span>
                </div>
                {ins}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Concerns */}
      {result.concerns?.length > 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-amber-800 mb-2.5 flex items-center gap-2"><AlertCircle size={14} /> Skin Concerns</h3>
          <ul className="space-y-1.5">
            {result.concerns.map((c, i) => (
              <li key={i} className="text-xs text-amber-700 flex items-start gap-2"><span className="shrink-0 mt-0.5">•</span>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Morning + Evening routine */}
      {(result.morningRoutine?.length > 0 || result.eveningRoutine?.length > 0) && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Your Personalised Routine</h3>
          <div className="grid grid-cols-2 gap-3">
            {result.morningRoutine?.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-amber-600 mb-2 flex items-center gap-1">☀️ Morning</p>
                <ol className="space-y-1.5">
                  {result.morningRoutine.map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[9px] font-bold text-gray-400 mt-1 shrink-0">{i + 1}</span>
                      <span className="text-[10px] text-gray-600 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {result.eveningRoutine?.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-indigo-600 mb-2 flex items-center gap-1">🌙 Evening</p>
                <ol className="space-y-1.5">
                  {result.eveningRoutine.map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[9px] font-bold text-gray-400 mt-1 shrink-0">{i + 1}</span>
                      <span className="text-[10px] text-gray-600 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product recommendations */}
      {result.recommendations?.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">Recommended Products</h3>
            <Link to="/shop/skin-care" className="text-xs text-pink-500 font-semibold flex items-center gap-1">View All <ArrowRight size={12} /></Link>
          </div>
          <div className="space-y-3">
            {result.recommendations.map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:border-pink-200 transition-colors">
                <div className="w-11 h-11 bg-pink-50 rounded-xl flex items-center justify-center shrink-0 text-lg">✨</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800">{r.product}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">{r.reason}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <div className="h-1.5 bg-emerald-500 rounded-full" style={{ width: `${Math.min(r.match, 99) * 0.6}px` }} />
                    <span className="text-[9px] font-bold text-emerald-600">{r.match}% match</span>
                  </div>
                </div>
                <Link to="/shop/skin-care" className="text-[10px] bg-pink-500 text-white px-3 py-1.5 rounded-full hover:bg-pink-600 transition-colors shrink-0">Shop</Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-5 text-white">
        <p className="text-sm font-bold mb-1">Book a Skin Consultation</p>
        <p className="text-xs text-pink-100 mb-3">Get a professional treatment tailored to your {result.skinType || ''} skin type.</p>
        <div className="flex gap-2">
          <Link to="/book/makeup" className="flex-1 bg-white text-pink-500 text-xs font-bold py-2.5 rounded-full text-center hover:bg-pink-50 transition-colors">Book Consultation</Link>
          <button onClick={onReset} className="border border-white/50 text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-white/10 transition-colors flex items-center gap-1.5">
            <RotateCcw size={12} /> New Analysis
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Camera Modal ──────────────────────────────────────────────────────────────
function CameraModal({ onCapture, onClose, initialFacing = 'user' }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [facing, setFacing] = useState(initialFacing)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')

  const startCamera = (face) => {
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    setReady(false)
    navigator.mediaDevices.getUserMedia({ video: { facingMode: face, width: { ideal: 1280 }, height: { ideal: 720 } } })
      .then(stream => {
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.onloadedmetadata = () => setReady(true)
        }
      })
      .catch(() => setError('Camera access denied. Please allow camera permission and try again.'))
  }

  useEffect(() => { startCamera(facing); return () => { if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop()) } }, [])

  const switchCamera = () => {
    const next = facing === 'user' ? 'environment' : 'user'
    setFacing(next)
    startCamera(next)
  }

  const capture = () => {
    const video = videoRef.current
    if (!video) return
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    onCapture(canvas.toDataURL('image/jpeg', 0.9))
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-black/80">
        <span className="text-white text-sm font-semibold">Take Photo</span>
        <div className="flex gap-3">
          <button onClick={switchCamera} className="text-white p-2 hover:text-pink-300 transition-colors" title="Switch camera">
            <SwitchCamera size={20} />
          </button>
          <button onClick={onClose} className="text-white p-2"><X size={22} /></button>
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <AlertCircle size={40} className="text-red-400 mb-3" />
            <p className="text-white text-sm">{error}</p>
            <button onClick={onClose} className="mt-4 bg-pink-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold">Go Back</button>
          </div>
        ) : (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        )}
        {/* Face guide overlay */}
        {!error && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-56 h-72 border-2 border-white/40 rounded-[50%]" />
          </div>
        )}
      </div>
      {!error && (
        <div className="flex items-center justify-center py-6 bg-black/80">
          <button onClick={capture} disabled={!ready}
            className="w-16 h-16 rounded-full bg-white border-4 border-pink-500 flex items-center justify-center hover:bg-pink-50 transition-colors disabled:opacity-40">
            <Camera size={26} className="text-pink-500" />
          </button>
        </div>
      )}
    </div>
  )
}

// ── Multi-Angle Upload Zone ───────────────────────────────────────────────────
const HAIR_ANGLES = [
  { key: 'front', label: 'Front', icon: '🧑', tip: 'Face + hairline visible', required: true },
  { key: 'left',  label: 'Left Side', icon: '◀️', tip: 'Left profile', required: false },
  { key: 'right', label: 'Right Side', icon: '▶️', tip: 'Right profile', required: false },
]

function HairUploadZone({ onAnalyze }) {
  const [slots, setSlots] = useState({ front: null, left: null, right: null })
  const [activeCamera, setActiveCamera] = useState(null)
  const fileRefs = useRef({})

  const handleFile = (key, file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = e => setSlots(s => ({ ...s, [key]: e.target.result }))
    reader.readAsDataURL(file)
  }

  const handleCapture = (key, dataUrl) => {
    setSlots(s => ({ ...s, [key]: dataUrl }))
    setActiveCamera(null)
  }

  const canAnalyze = !!slots.front

  const handleAnalyze = async () => {
    const filled = HAIR_ANGLES.filter(a => slots[a.key]).map(a => ({ url: slots[a.key], label: a.label }))
    const composite = await compositeAngles(filled)
    onAnalyze(composite)
  }

  return (
    <>
      {activeCamera && (
        <CameraModal
          initialFacing="user"
          onCapture={url => handleCapture(activeCamera, url)}
          onClose={() => setActiveCamera(null)}
        />
      )}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-4">
        <h2 className="text-base font-bold text-gray-900 mb-1">Upload Your Hair Photos</h2>
        <p className="text-xs text-gray-500 mb-5">Front photo is required. Add side angles for a more accurate analysis and better style recommendations.</p>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {HAIR_ANGLES.map(angle => (
            <div key={angle.key} className="flex flex-col gap-2">
              <input
                ref={el => fileRefs.current[angle.key] = el}
                type="file" accept="image/*"
                className="sr-only"
                onChange={e => handleFile(angle.key, e.target.files[0])}
              />
              {slots[angle.key] ? (
                <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
                  <img src={slots[angle.key]} alt={angle.label} className="w-full h-full object-cover" />
                  <button
                    onClick={() => setSlots(s => ({ ...s, [angle.key]: null }))}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                  ><X size={12} /></button>
                  <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[9px] font-bold text-center py-1">{angle.label}</div>
                </div>
              ) : (
                <button
                  onClick={() => fileRefs.current[angle.key]?.click()}
                  className={`aspect-[3/4] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 transition-all hover:border-pink-400 hover:bg-pink-50
                    ${angle.required ? 'border-pink-300 bg-pink-50/50' : 'border-gray-200 bg-gray-50'}`}
                >
                  <span className="text-2xl">{angle.icon}</span>
                  <span className="text-[10px] font-bold text-gray-700">{angle.label}</span>
                  <span className="text-[9px] text-gray-400">{angle.tip}</span>
                  {angle.required && <span className="text-[9px] font-bold text-pink-500">Required</span>}
                </button>
              )}
              {/* Camera button per slot */}
              <button
                onClick={() => setActiveCamera(angle.key)}
                className="text-[10px] text-gray-500 hover:text-pink-500 flex items-center justify-center gap-1 transition-colors"
              >
                <Camera size={11} /> Take photo
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!canAnalyze}
          className="w-full bg-pink-500 text-white font-bold py-3.5 rounded-full hover:bg-pink-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Sparkles size={16} /> Analyse My Hair
        </button>
        <p className="text-[10px] text-gray-400 text-center mt-3">Your privacy is protected · Images are never stored</p>
      </div>

      {/* Tips */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: '💡', title: 'Good Lighting', sub: 'Natural light gives best results' },
          { icon: '🔍', title: 'Hair Visible', sub: 'Show texture clearly' },
          { icon: '😊', title: 'Face Forward', sub: 'For face shape detection' },
        ].map(t => (
          <div key={t.title} className="text-center p-3 bg-gray-50 rounded-xl">
            <div className="text-xl mb-1">{t.icon}</div>
            <p className="text-[10px] font-bold text-gray-700">{t.title}</p>
            <p className="text-[9px] text-gray-400 mt-0.5">{t.sub}</p>
          </div>
        ))}
      </div>
    </>
  )
}

// ── Skin Upload Zone ──────────────────────────────────────────────────────────
function SkinUploadZone({ onAnalyze }) {
  const [preview, setPreview] = useState(null)
  const [showCamera, setShowCamera] = useState(false)
  const uploadRef = useRef(null)

  const handleFile = file => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = e => setPreview(e.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <>
      {showCamera && (
        <CameraModal initialFacing="user" onCapture={url => { setPreview(url); setShowCamera(false) }} onClose={() => setShowCamera(false)} />
      )}
      <input ref={uploadRef} type="file" accept="image/*" className="sr-only" onChange={e => handleFile(e.target.files[0])} />

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-4">
        <h2 className="text-base font-bold text-gray-900 mb-1">Upload Your Selfie</h2>
        <p className="text-xs text-gray-500 mb-5">A well-lit front-facing photo gives the most accurate skin and face shape analysis.</p>

        {preview ? (
          <div>
            <div className="relative rounded-2xl overflow-hidden mb-4 max-h-72">
              <img src={preview} alt="Preview" className="w-full max-h-72 object-cover rounded-2xl" />
              <div className="absolute top-3 right-3 flex gap-2">
                <button onClick={() => uploadRef.current?.click()} className="bg-white/90 text-gray-700 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm hover:bg-white">Change</button>
                <button onClick={() => setShowCamera(true)} className="bg-white/90 text-gray-700 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm hover:bg-white flex items-center gap-1"><Camera size={10} /> Retake</button>
              </div>
            </div>
            <button onClick={() => onAnalyze(preview)}
              className="w-full bg-pink-500 text-white font-bold py-3.5 rounded-full hover:bg-pink-600 transition-colors flex items-center justify-center gap-2">
              <Sparkles size={16} /> Analyse My Skin
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-pink-200 rounded-2xl p-10 text-center bg-pink-50/30 mb-4">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🤳</div>
            <p className="text-sm font-bold text-gray-800 mb-1">Add your selfie</p>
            <p className="text-xs text-gray-400 mb-5">JPG, PNG or WEBP · Face forward, chin level</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => uploadRef.current?.click()}
                className="flex items-center gap-2 bg-pink-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-pink-600 transition-colors">
                <Upload size={15} /> Upload Photo
              </button>
              <button onClick={() => setShowCamera(true)}
                className="flex items-center gap-2 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:border-pink-400 hover:text-pink-500 transition-colors">
                <Camera size={15} /> Take Selfie
              </button>
            </div>
          </div>
        )}
        <p className="text-[10px] text-gray-400 text-center">Your privacy is protected · Images are never stored</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: '💡', title: 'Good Lighting', sub: 'Natural or ring light' },
          { icon: '😌', title: 'Bare Face', sub: 'Remove makeup if possible' },
          { icon: '📐', title: 'Face Forward', sub: 'Chin level, look ahead' },
        ].map(t => (
          <div key={t.title} className="text-center p-3 bg-gray-50 rounded-xl">
            <div className="text-xl mb-1">{t.icon}</div>
            <p className="text-[10px] font-bold text-gray-700">{t.title}</p>
            <p className="text-[9px] text-gray-400 mt-0.5">{t.sub}</p>
          </div>
        ))}
      </div>
    </>
  )
}

// ── Analyzing State ───────────────────────────────────────────────────────────
function AnalyzingState({ type }) {
  const [step, setStep] = useState(0)
  const steps = type === 'hair'
    ? ['Reading hair texture and curl pattern...', 'Detecting face shape...', 'Analysing scalp health...', 'Matching hairstyles and wig picks...', 'Building your recommendations...']
    : ['Detecting skin type and undertone...', 'Measuring hydration levels...', 'Analysing pores and texture...', 'Detecting face shape...', 'Building your skincare routine...']

  useEffect(() => {
    const id = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-10 text-center">
      <div className="w-20 h-20 mx-auto mb-6 relative">
        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center">
          <Sparkles size={32} className="text-pink-500 animate-pulse" />
        </div>
        <div className="absolute inset-0 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
      <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Analysing your {type === 'hair' ? 'hair' : 'skin'}...</h2>
      <p className="text-sm text-gray-400 mb-6">This usually takes 5–8 seconds</p>
      <div className="space-y-2 max-w-xs mx-auto">
        {steps.map((s, i) => (
          <div key={s} className={`flex items-center gap-2 p-2.5 rounded-lg text-xs transition-all duration-300 ${i <= step ? 'bg-pink-50 text-pink-700 font-medium' : 'bg-gray-50 text-gray-400'}`}>
            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${i < step ? 'bg-pink-500' : i === step ? 'bg-pink-200' : 'bg-gray-200'}`}>
              {i < step ? <span className="text-white text-[8px] font-bold">✓</span> : <div className={`w-2 h-2 rounded-full ${i === step ? 'bg-pink-500 animate-pulse' : 'bg-gray-300'}`} />}
            </div>
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Hair Analysis Page ────────────────────────────────────────────────────────
export default function AIHairAnalysis() {
  const [phase, setPhase] = useState('landing')
  const [result, setResult] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [error, setError] = useState('')

  const analyze = async (imageBase64) => {
    setPreviewUrl(imageBase64)
    setPhase('analyzing')
    setError('')
    try {
      const compressed = await compressImage(imageBase64, 512, 0.82)
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: compressed, type: 'hair' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `Server error ${res.status}`)
      setResult(data)
      setPhase('results')
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.')
      setPhase('landing')
    }
  }

  const reset = () => { setPhase('landing'); setResult(null); setPreviewUrl(null); setError('') }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
          <p className="text-xs text-gray-400 mb-3">
            <Link to="/" className="hover:text-pink-500">Home</Link> › <Link to="/ai-beauty/hair" className="hover:text-pink-500">AI Analyser</Link> › Hair
          </p>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            AI Hair <em className="text-pink-500 not-italic">Analysis</em>
          </h1>
          <p className="text-sm text-gray-500 max-w-xl">
            Upload your photo and get instant analysis — face shape, hair type, best styles, wig recommendations, and a personalised product plan.
          </p>
        </div>
      </section>

      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <div className="flex gap-6">
            <Link to="/ai-beauty/hair" className="py-3 text-sm font-semibold text-pink-500 border-b-2 border-pink-500">Hair Analysis</Link>
            <Link to="/ai-beauty/skin" className="py-3 text-sm font-medium text-gray-500 hover:text-gray-800 border-b-2 border-transparent">Skin Analysis</Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 mb-5">
              <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-700">Analysis failed</p>
                <p className="text-xs text-red-500 mt-0.5">{error}</p>
              </div>
              <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600"><X size={14} /></button>
            </div>
          )}
          {phase === 'landing' && <HairUploadZone onAnalyze={analyze} />}
          {phase === 'analyzing' && <AnalyzingState type="hair" />}
          {phase === 'results' && result && <HairResults result={result} previewUrl={previewUrl} onReset={reset} />}
        </div>
      </div>
    </div>
  )
}

// ── Skin Analysis Page ────────────────────────────────────────────────────────
export function AISkinAnalysis() {
  const [phase, setPhase] = useState('landing')
  const [result, setResult] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [error, setError] = useState('')

  const analyze = async (imageBase64) => {
    setPreviewUrl(imageBase64)
    setPhase('analyzing')
    setError('')
    try {
      const compressed = await compressImage(imageBase64, 512, 0.82)
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: compressed, type: 'skin' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `Server error ${res.status}`)
      setResult(data)
      setPhase('results')
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.')
      setPhase('landing')
    }
  }

  const reset = () => { setPhase('landing'); setResult(null); setPreviewUrl(null); setError('') }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
          <p className="text-xs text-gray-400 mb-3">
            <Link to="/" className="hover:text-pink-500">Home</Link> › <Link to="/ai-beauty/hair" className="hover:text-pink-500">AI Analyser</Link> › Skin
          </p>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            AI Skin <em className="text-pink-500 not-italic">Analysis</em>
          </h1>
          <p className="text-sm text-gray-500 max-w-xl">
            One selfie — instant skin type, undertone, face shape detection, personalised morning and evening routine, and product recommendations.
          </p>
        </div>
      </section>

      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <div className="flex gap-6">
            <Link to="/ai-beauty/hair" className="py-3 text-sm font-medium text-gray-500 hover:text-gray-800 border-b-2 border-transparent">Hair Analysis</Link>
            <Link to="/ai-beauty/skin" className="py-3 text-sm font-semibold text-pink-500 border-b-2 border-pink-500">Skin Analysis</Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 mb-5">
              <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-700">Analysis failed</p>
                <p className="text-xs text-red-500 mt-0.5">{error}</p>
              </div>
              <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600"><X size={14} /></button>
            </div>
          )}
          {phase === 'landing' && <SkinUploadZone onAnalyze={analyze} />}
          {phase === 'analyzing' && <AnalyzingState type="skin" />}
          {phase === 'results' && result && <SkinResults result={result} previewUrl={previewUrl} onReset={reset} />}
        </div>
      </div>
    </div>
  )
}
