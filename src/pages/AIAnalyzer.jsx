import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Upload, Camera, Sparkles, ArrowRight, RotateCcw,
  AlertCircle, X, SwitchCamera, ChevronRight, Star,
  ShoppingBag, MessageCircle, MapPin, Sun, Moon
} from 'lucide-react'

// ── Compress to 600px — enough for detail:high without bloating payload ───────
function compressImage(dataUrl, maxPx = 600, quality = 0.85) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, maxPx / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.src = dataUrl
  })
}

// ── Composite multi-angle images side by side ─────────────────────────────────
function compositeAngles(slots) {
  const filled = slots.filter(s => s.url)
  if (filled.length === 1) return compressImage(filled[0].url)
  return new Promise((resolve) => {
    let loaded = 0
    const imgs = filled.map(({ url, label }) => {
      const img = new Image(); img.src = url
      img.onload = () => { loaded++; if (loaded === filled.length) draw() }
      return { img, label }
    })
    function draw() {
      const h = 600; const slotW = Math.round(h * 0.68)
      const canvas = document.createElement('canvas')
      canvas.width = slotW * imgs.length; canvas.height = h
      const ctx = canvas.getContext('2d')
      imgs.forEach(({ img, label }, i) => {
        const x = i * slotW
        ctx.fillStyle = '#1a1a1a'; ctx.fillRect(x, 0, slotW, h)
        const scale = Math.min(slotW / img.width, h / img.height)
        const dw = img.width * scale; const dh = img.height * scale
        ctx.drawImage(img, x + (slotW - dw) / 2, (h - dh) / 2, dw, dh)
        ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(x, h - 28, slotW, 28)
        ctx.fillStyle = '#fff'; ctx.font = 'bold 13px Arial'; ctx.textAlign = 'center'
        ctx.fillText(label, x + slotW / 2, h - 10)
      })
      resolve(canvas.toDataURL('image/jpeg', 0.85))
    }
  })
}

// ── Open Dora with analysis context ──────────────────────────────────────────
function openDoraWithContext(type, result) {
  const msg = type === 'hair'
    ? `Hi Dora! I just got my hair analysis on Rejuveefy. My results show ${result.hairType || 'textured'} hair with a ${result.faceShape || 'oval'} face shape. My overall hair health score is ${result.overallScore}/100 and my condition is rated "${result.condition}". ${result.summary} My main concerns are: ${(result.concerns || []).join(', ')}. Can you give me specific advice on what I should do next?`
    : `Hi Dora! I just got my skin analysis on Rejuveefy. I have ${result.skinType || 'combination'} skin with ${result.undertone || 'neutral'} undertones and a ${result.faceShape || 'oval'} face shape. My skin health score is ${result.overallScore}/100, condition "${result.condition}". ${result.summary} My concerns: ${(result.concerns || []).join(', ')}. What should I focus on?`
  window.dispatchEvent(new CustomEvent('openDora', { detail: { message: msg } }))
}

// ── Provider links based on hair type ────────────────────────────────────────
function getProviderLinks(hairType) {
  const t = (hairType || '').toLowerCase()
  const links = []
  if (t.includes('4') || t.includes('coil') || t.includes('afro') || t.includes('kinky')) {
    links.push({ path: '/book/braids', icon: '💆‍♀️', service: 'Braiding Specialist', desc: 'Knotless, box braids & cornrows' })
    links.push({ path: '/book/twists', icon: '🌀', service: 'Twist Specialist', desc: 'Senegalese, mini & passion twists' })
    links.push({ path: '/book/locks', icon: '🌿', service: 'Loc Specialist', desc: 'Loc starter, retwist & maintenance' })
  } else if (t.includes('3') || t.includes('curl') || t.includes('wavy')) {
    links.push({ path: '/book/hair-styling', icon: '💇‍♀️', service: 'Curl Specialist', desc: 'Curl definition & moisture treatments' })
    links.push({ path: '/book/braids', icon: '💆‍♀️', service: 'Braiding Specialist', desc: 'Protective styles for curly hair' })
  } else {
    links.push({ path: '/book/hair-styling', icon: '✂️', service: 'Hair Styling', desc: 'Cut, colour & styling services' })
    links.push({ path: '/book/frontal', icon: '👑', service: 'Frontal & Closure', desc: 'Professional frontal installs' })
  }
  links.push({ path: '/book/wig-install', icon: '✨', service: 'Wig Installation', desc: 'Pro fitting based on your face shape' })
  return links.slice(0, 3)
}

// ── Score bar ─────────────────────────────────────────────────────────────────
function ScoreBar({ label, value }) {
  const v = Math.max(0, Math.min(100, value || 0))
  const col = v >= 70 ? 'bg-emerald-500' : v >= 45 ? 'bg-amber-400' : 'bg-rose-400'
  const tc  = v >= 70 ? 'text-emerald-600' : v >= 45 ? 'text-amber-600' : 'text-rose-500'
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between mb-1.5">
        <span className="text-xs text-gray-600">{label}</span>
        <span className={`text-xs font-bold ${tc}`}>{v}/100</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${col} rounded-full transition-all duration-1000`} style={{ width: `${v}%` }} />
      </div>
    </div>
  )
}

// ── Face shape data ───────────────────────────────────────────────────────────
const FACE_SHAPES = {
  Oval:    { emoji: '🥚', tip: 'Most versatile — nearly every style flatters. Lucky you.' },
  Round:   { emoji: '⭕', tip: 'Styles with height elongate beautifully. Avoid bobs at jawline.' },
  Square:  { emoji: '⬜', tip: 'Soft waves and layers soften strong jawlines perfectly.' },
  Heart:   { emoji: '🫀', tip: 'Volume at the jaw balances a wider forehead. Side parts work well.' },
  Diamond: { emoji: '💎', tip: 'Chin-length styles and fringe balance high cheekbones.' },
  Oblong:  { emoji: '📏', tip: 'Wide, voluminous styles add width. Avoid adding extra length.' },
}

// ── Camera Modal ──────────────────────────────────────────────────────────────
function CameraModal({ onCapture, onClose, initialFacing = 'user' }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [facing, setFacing] = useState(initialFacing)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')

  const startCamera = useCallback((face) => {
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    setReady(false); setError('')
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: face, width: { ideal: 1280 }, height: { ideal: 720 } }
    }).then(stream => {
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => { videoRef.current.play(); setReady(true) }
      }
    }).catch(() => setError('Camera access denied. Allow camera permission in your browser settings and try again.'))
  }, [])

  useEffect(() => {
    startCamera(facing)
    return () => { if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop()) }
  }, [])

  const switchCamera = () => {
    const next = facing === 'user' ? 'environment' : 'user'
    setFacing(next); startCamera(next)
  }

  const capture = () => {
    const video = videoRef.current; if (!video) return
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth; canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    onCapture(canvas.toDataURL('image/jpeg', 0.92))
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-black/80 shrink-0">
        <span className="text-white text-sm font-semibold">Take Photo</span>
        <div className="flex items-center gap-3">
          <button onClick={switchCamera} className="text-white p-2 hover:text-pink-300 transition-colors" aria-label="Switch camera">
            <SwitchCamera size={20} />
          </button>
          <button onClick={onClose} className="text-white p-2"><X size={22} /></button>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-4">
            <AlertCircle size={44} className="text-red-400" />
            <p className="text-white text-sm leading-relaxed">{error}</p>
            <button onClick={onClose} className="bg-pink-500 text-white px-6 py-3 rounded-full text-sm font-bold">Go Back</button>
          </div>
        ) : (
          <>
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            {/* Face guide oval */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-52 h-72 border-2 border-white/50 rounded-[50%] shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]" />
            </div>
            <p className="absolute bottom-24 left-0 right-0 text-center text-white/70 text-xs">
              Centre your {facing === 'user' ? 'face' : 'hair'} in the guide
            </p>
          </>
        )}
      </div>

      {!error && (
        <div className="flex items-center justify-center py-6 bg-black/80 shrink-0">
          <button onClick={capture} disabled={!ready}
            className="w-18 h-18 w-[72px] h-[72px] rounded-full bg-white border-[5px] border-pink-500 flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-40 active:scale-95">
            <Camera size={28} className="text-pink-500" />
          </button>
        </div>
      )}
    </div>
  )
}

// ── Hair Upload — 3 angle slots ───────────────────────────────────────────────
const ANGLES = [
  { key: 'front', label: 'Front', emoji: '🧑', tip: 'Face forward, hair visible', required: true },
  { key: 'left',  label: 'Left Side', emoji: '◀', tip: 'Left profile', required: false },
  { key: 'right', label: 'Right Side', emoji: '▶', tip: 'Right profile', required: false },
]

function HairUploadZone({ onAnalyze }) {
  const [slots, setSlots] = useState({ front: null, left: null, right: null })
  const [camera, setCamera] = useState(null) // which slot is using camera
  const fileRefs = useRef({})

  const handleFile = (key, file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = e => setSlots(s => ({ ...s, [key]: e.target.result }))
    reader.readAsDataURL(file)
  }

  const handleAnalyze = async () => {
    const filled = ANGLES.filter(a => slots[a.key]).map(a => ({ url: slots[a.key], label: a.label }))
    const composite = await compositeAngles(filled)
    onAnalyze(composite)
  }

  return (
    <>
      {camera && (
        <CameraModal
          initialFacing="user"
          onCapture={url => { setSlots(s => ({ ...s, [camera]: url })); setCamera(null) }}
          onClose={() => setCamera(null)}
        />
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center shrink-0">
            <span className="text-lg">💇‍♀️</span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">Upload Your Hair Photos</h2>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              Front photo required. Add side angles for face shape detection and better wig recommendations.
            </p>
          </div>
        </div>

        {/* 3 Angle slots */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
          {ANGLES.map(angle => (
            <div key={angle.key} className="flex flex-col gap-1.5">
              <input
                ref={el => fileRefs.current[angle.key] = el}
                type="file" accept="image/*" className="sr-only"
                onChange={e => handleFile(angle.key, e.target.files[0])}
              />

              {slots[angle.key] ? (
                <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <img src={slots[angle.key]} alt={angle.label} className="w-full h-full object-cover" />
                  <button
                    onClick={() => setSlots(s => ({ ...s, [angle.key]: null }))}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                  ><X size={11} /></button>
                  <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[9px] font-bold text-center py-1">
                    {angle.label}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => fileRefs.current[angle.key]?.click()}
                  style={{ aspectRatio: '3/4' }}
                  className={`w-full rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-all hover:scale-[1.02] active:scale-[0.98]
                    ${angle.required ? 'border-pink-300 bg-pink-50/60' : 'border-gray-200 bg-gray-50'}`}
                >
                  <span className="text-xl sm:text-2xl">{angle.emoji}</span>
                  <span className="text-[10px] font-bold text-gray-700 text-center px-1">{angle.label}</span>
                  <span className="text-[9px] text-gray-400 text-center px-1 leading-tight hidden sm:block">{angle.tip}</span>
                  {angle.required
                    ? <span className="text-[9px] font-bold text-pink-500">Required</span>
                    : <span className="text-[9px] text-gray-400">Optional</span>
                  }
                </button>
              )}

              <button
                onClick={() => setCamera(angle.key)}
                className="flex items-center justify-center gap-1 text-[10px] text-gray-500 hover:text-pink-500 transition-colors py-1 min-h-[32px]"
              >
                <Camera size={10} /> <span>Camera</span>
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!slots.front}
          className="w-full bg-pink-500 text-white font-bold py-4 rounded-2xl hover:bg-pink-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm active:scale-[0.99]"
        >
          <Sparkles size={17} /> Analyse My Hair
        </button>

        <p className="text-[10px] text-gray-400 text-center mt-3">
          🔒 Privacy protected · Images analysed instantly and never stored
        </p>
      </div>

      {/* Tips */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        {[
          { icon: '💡', title: 'Good Light', sub: 'Natural light is best' },
          { icon: '🔍', title: 'Hair Clear', sub: 'Show texture sharply' },
          { icon: '😊', title: 'Face Visible', sub: 'For face shape detect' },
        ].map(t => (
          <div key={t.title} className="text-center p-2.5 sm:p-3 bg-gray-50 rounded-xl">
            <div className="text-lg sm:text-xl mb-1">{t.icon}</div>
            <p className="text-[10px] font-bold text-gray-700">{t.title}</p>
            <p className="text-[9px] text-gray-400 mt-0.5 leading-tight">{t.sub}</p>
          </div>
        ))}
      </div>
    </>
  )
}

// ── Skin Upload ───────────────────────────────────────────────────────────────
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
        <CameraModal
          initialFacing="user"
          onCapture={url => { setPreview(url); setShowCamera(false) }}
          onClose={() => setShowCamera(false)}
        />
      )}
      <input ref={uploadRef} type="file" accept="image/*" className="sr-only"
        onChange={e => handleFile(e.target.files[0])} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center shrink-0">
            <span className="text-lg">🤳</span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">Upload Your Selfie</h2>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              A well-lit, bare-face selfie gives the most accurate skin type, undertone and face shape analysis.
            </p>
          </div>
        </div>

        {preview ? (
          <div>
            <div className="relative rounded-2xl overflow-hidden mb-4">
              <img src={preview} alt="Preview" className="w-full max-h-64 sm:max-h-72 object-cover" />
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => uploadRef.current?.click()}
                  className="bg-white/90 text-gray-700 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm hover:bg-white active:scale-95">
                  Change
                </button>
                <button onClick={() => setShowCamera(true)}
                  className="bg-white/90 text-gray-700 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm hover:bg-white flex items-center gap-1 active:scale-95">
                  <Camera size={10} /> Retake
                </button>
              </div>
            </div>
            <button onClick={() => onAnalyze(preview)}
              className="w-full bg-pink-500 text-white font-bold py-4 rounded-2xl hover:bg-pink-600 transition-all flex items-center justify-center gap-2 text-sm active:scale-[0.99]">
              <Sparkles size={17} /> Analyse My Skin
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-pink-200 rounded-2xl p-8 sm:p-10 text-center bg-pink-50/30 mb-4">
            <div className="text-4xl mb-3">🧖‍♀️</div>
            <p className="text-sm font-bold text-gray-800 mb-1">Add your selfie</p>
            <p className="text-xs text-gray-400 mb-5">Bare face · Good lighting · Face forward</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setShowCamera(true)}
                className="flex items-center gap-2 bg-pink-500 text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-pink-600 transition-all active:scale-95">
                <Camera size={15} /> Take Selfie
              </button>
              <button onClick={() => uploadRef.current?.click()}
                className="flex items-center gap-2 border border-gray-200 text-gray-700 px-5 py-3 rounded-xl text-sm font-semibold hover:border-pink-400 hover:text-pink-500 transition-all active:scale-95">
                <Upload size={15} /> Upload
              </button>
            </div>
          </div>
        )}

        <p className="text-[10px] text-gray-400 text-center mt-3">
          🔒 Privacy protected · Images analysed instantly and never stored
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3">
        {[
          { icon: '💡', title: 'Natural Light', sub: 'Face a window' },
          { icon: '🚿', title: 'Bare Face', sub: 'Remove makeup' },
          { icon: '📐', title: 'Face Forward', sub: 'Chin level' },
        ].map(t => (
          <div key={t.title} className="text-center p-2.5 sm:p-3 bg-gray-50 rounded-xl">
            <div className="text-lg sm:text-xl mb-1">{t.icon}</div>
            <p className="text-[10px] font-bold text-gray-700">{t.title}</p>
            <p className="text-[9px] text-gray-400 mt-0.5 leading-tight">{t.sub}</p>
          </div>
        ))}
      </div>
    </>
  )
}

// ── Analysing animation ───────────────────────────────────────────────────────
function AnalyzingState({ type }) {
  const [step, setStep] = useState(0)
  const steps = type === 'hair'
    ? ['Reading curl pattern and texture...', 'Detecting face shape...', 'Measuring moisture and scalp health...', 'Matching protective styles...', 'Selecting wig recommendations...', 'Building your personalised plan...']
    : ['Detecting skin type and tone...', 'Measuring hydration levels...', 'Scanning pores and texture...', 'Detecting face shape...', 'Building morning routine...', 'Building evening routine...']

  useEffect(() => {
    const id = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 1400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 sm:p-10 text-center">
      <div className="w-20 h-20 mx-auto mb-5 relative">
        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center">
          <Sparkles size={32} className="text-pink-500 animate-pulse" />
        </div>
        <div className="absolute inset-0 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
      <h2 className="font-display text-xl font-bold text-gray-900 mb-1">
        Analysing your {type === 'hair' ? 'hair' : 'skin'}...
      </h2>
      <p className="text-xs text-gray-400 mb-6">Usually 5–8 seconds</p>
      <div className="space-y-2 max-w-xs mx-auto text-left">
        {steps.map((s, i) => (
          <div key={s} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-400
            ${i < step ? 'bg-emerald-50 text-emerald-700' : i === step ? 'bg-pink-50 text-pink-700 font-semibold' : 'bg-gray-50 text-gray-400'}`}>
            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0
              ${i < step ? 'bg-emerald-500' : i === step ? 'bg-pink-500 animate-pulse' : 'bg-gray-200'}`}>
              {i < step
                ? <span className="text-white text-[8px] font-black">✓</span>
                : <div className={`w-2 h-2 rounded-full ${i === step ? 'bg-white' : 'bg-gray-400'}`} />
              }
            </div>
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Hair Results ──────────────────────────────────────────────────────────────
function HairResults({ result, previewUrl, onReset }) {
  const overall = result.overallScore || 70
  const faceInfo = FACE_SHAPES[result.faceShape]
  const condBadge = result.condition === 'Excellent' ? 'bg-emerald-100 text-emerald-700' :
    result.condition === 'Good' ? 'bg-blue-100 text-blue-700' :
    result.condition === 'Fair' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
  const providerLinks = getProviderLinks(result.hairType)

  return (
    <div className="space-y-4">

      {/* Score header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="30" fill="none" stroke="#FCE4EC" strokeWidth="8" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#EC4899" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 30 * overall / 100} ${2 * Math.PI * 30}`}
                strokeLinecap="round" className="transition-all duration-1000" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-black text-lg sm:text-xl text-gray-900 leading-none">{overall}</span>
              <span className="text-[8px] text-gray-400">/100</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h2 className="font-display text-base sm:text-lg font-bold text-gray-900">Hair Analysis</h2>
              {previewUrl && <img src={previewUrl} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-gray-100 shrink-0" />}
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${condBadge}`}>{result.condition}</span>
              {result.hairType && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">{result.hairType}</span>}
              {result.porosity && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">{result.porosity} Porosity</span>}
              {result.density && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">{result.density}</span>}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{result.summary}</p>
          </div>
        </div>
      </div>

      {/* Face shape */}
      {faceInfo && (
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 rounded-2xl p-4 flex items-start gap-3">
          <span className="text-3xl shrink-0">{faceInfo.emoji}</span>
          <div>
            <p className="text-sm font-bold text-gray-900 mb-0.5">{result.faceShape} Face Shape</p>
            <p className="text-xs text-gray-500 leading-relaxed">{faceInfo.tip}</p>
          </div>
        </div>
      )}

      {/* Best protective styles */}
      {result.bestStyles?.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900">Best Styles for Your Face & Hair Type</h3>
            <Link to="/book" className="text-[10px] text-pink-500 font-bold flex items-center gap-0.5 shrink-0">
              Book <ChevronRight size={11} />
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.bestStyles.map((s, i) => (
              <span key={i} className="flex items-center gap-1.5 text-xs font-bold bg-pink-500 text-white px-3 py-2 rounded-full">
                <Star size={10} fill="white" /> {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Wig picks */}
      {result.wigPicks?.filter(w => w?.style).length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900">Wig Picks for You</h3>
            <Link to="/shop/hair-bundles" className="text-[10px] text-pink-500 font-bold flex items-center gap-0.5 shrink-0">
              Shop <ChevronRight size={11} />
            </Link>
          </div>
          <div className="space-y-3">
            {result.wigPicks.filter(w => w?.style).map((w, i) => (
              <div key={i} className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl hover:border-pink-200 transition-colors">
                <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center shrink-0 text-xl">💆‍♀️</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">{w.style}</p>
                  <div className="flex flex-wrap gap-1.5 my-1">
                    {w.length && <span className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{w.length}</span>}
                    {w.curl && <span className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{w.curl}</span>}
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{w.why}</p>
                </div>
                <Link to="/shop/hair-bundles"
                  className="shrink-0 flex items-center gap-1 text-[10px] bg-pink-500 text-white px-2.5 py-1.5 rounded-full hover:bg-pink-600 transition-colors">
                  <ShoppingBag size={9} /> Shop
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Health scores */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Hair Health Breakdown</h3>
        {[
          { label: 'Moisture & Hydration', value: result.scores?.moisture },
          { label: 'Strength & Elasticity', value: result.scores?.strength },
          { label: 'Scalp Health', value: result.scores?.scalp },
          { label: 'Shine', value: result.scores?.shine },
          { label: 'Density & Volume', value: result.scores?.density },
          { label: 'Growth Potential', value: result.scores?.growth },
        ].map(s => <ScoreBar key={s.label} {...s} />)}
      </div>

      {/* Insights */}
      {result.insights?.filter(Boolean).length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-3">What We Found in Your Hair</h3>
          <ul className="space-y-3">
            {result.insights.filter(Boolean).map((ins, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[9px] font-black text-pink-600">{i + 1}</span>
                </div>
                <span className="leading-relaxed">{ins}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Concerns */}
      {result.concerns?.filter(Boolean).length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <h3 className="text-sm font-bold text-amber-800 mb-2 flex items-center gap-2">
            <AlertCircle size={14} /> Areas to Address
          </h3>
          <ul className="space-y-2">
            {result.concerns.filter(Boolean).map((c, i) => (
              <li key={i} className="text-xs text-amber-700 flex items-start gap-2 leading-relaxed">
                <span className="shrink-0 font-bold mt-0.5">•</span>{c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Product recommendations */}
      {result.recommendations?.filter(r => r?.product).length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">Recommended Products</h3>
            <Link to="/shop/hair-care" className="text-xs text-pink-500 font-bold flex items-center gap-1 shrink-0">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {result.recommendations.filter(r => r?.product).map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:border-pink-200 transition-colors">
                <div className="w-11 h-11 bg-pink-50 rounded-xl flex items-center justify-center shrink-0 text-xl">🧴</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800">{r.product}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">{r.reason}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 max-w-[80px] h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${r.match || 80}%` }} />
                    </div>
                    <span className="text-[9px] font-bold text-emerald-600">{r.match || 80}% match</span>
                  </div>
                </div>
                <Link to="/shop/hair-care"
                  className="shrink-0 text-[10px] bg-pink-500 text-white px-3 py-1.5 rounded-full hover:bg-pink-600 transition-colors">
                  Shop
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Provider matching */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={14} className="text-pink-500" />
          <h3 className="text-sm font-bold text-gray-900">Specialists for Your Hair Type</h3>
        </div>
        <p className="text-xs text-gray-400 mb-3">
          Based on your {result.hairType || 'hair type'}, these are the services you need most:
        </p>
        <div className="space-y-2">
          {providerLinks.map((link, i) => (
            <Link key={i} to={link.path}
              className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-pink-200 hover:bg-pink-50/50 transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-xl">{link.icon}</span>
                <div>
                  <p className="text-xs font-bold text-gray-800 group-hover:text-pink-600 transition-colors">{link.service}</p>
                  <p className="text-[10px] text-gray-400">{link.desc}</p>
                </div>
              </div>
              <span className="text-[10px] bg-pink-500 text-white px-3 py-1.5 rounded-full font-bold shrink-0">Book</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Ask Dora + Retake CTA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => openDoraWithContext('hair', result)}
          className="flex items-center justify-center gap-2.5 bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-all text-sm active:scale-[0.99]"
        >
          <MessageCircle size={16} /> Ask Dora About My Results
        </button>
        <button onClick={onReset}
          className="flex items-center justify-center gap-2.5 border-2 border-pink-500 text-pink-500 font-bold py-4 rounded-2xl hover:bg-pink-50 transition-all text-sm active:scale-[0.99]">
          <RotateCcw size={16} /> New Analysis
        </button>
      </div>

      {/* Book CTA */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-5 text-white">
        <p className="text-base font-black mb-1">Book a Hair Specialist</p>
        <p className="text-xs text-pink-100 mb-4 leading-relaxed">
          Connect with a Rejuveefy provider who specialises in {result.hairType || 'your hair type'} — in person or at home.
        </p>
        <Link to="/book/braids"
          className="block w-full bg-white text-pink-500 text-sm font-black py-3 rounded-xl text-center hover:bg-pink-50 transition-colors">
          Find My Specialist
        </Link>
      </div>
    </div>
  )
}

// ── Skin Results ──────────────────────────────────────────────────────────────
function SkinResults({ result, previewUrl, onReset }) {
  const overall = result.overallScore || 70
  const faceInfo = FACE_SHAPES[result.faceShape]
  const condBadge = result.condition === 'Excellent' ? 'bg-emerald-100 text-emerald-700' :
    result.condition === 'Good' ? 'bg-blue-100 text-blue-700' :
    result.condition === 'Fair' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'

  return (
    <div className="space-y-4">

      {/* Score header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="30" fill="none" stroke="#FCE4EC" strokeWidth="8" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#EC4899" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 30 * overall / 100} ${2 * Math.PI * 30}`}
                strokeLinecap="round" className="transition-all duration-1000" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-black text-lg sm:text-xl text-gray-900 leading-none">{overall}</span>
              <span className="text-[8px] text-gray-400">/100</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h2 className="font-display text-base sm:text-lg font-bold text-gray-900">Skin Analysis</h2>
              {previewUrl && <img src={previewUrl} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-gray-100 shrink-0" />}
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${condBadge}`}>{result.condition}</span>
              {result.skinType && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">{result.skinType} Skin</span>}
              {result.undertone && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">{result.undertone} Undertone</span>}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{result.summary}</p>
          </div>
        </div>
      </div>

      {/* Face shape */}
      {faceInfo && (
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 rounded-2xl p-4 flex items-start gap-3">
          <span className="text-3xl shrink-0">{faceInfo.emoji}</span>
          <div>
            <p className="text-sm font-bold text-gray-900 mb-0.5">{result.faceShape} Face Shape</p>
            <p className="text-xs text-gray-500 leading-relaxed">{faceInfo.tip}</p>
          </div>
        </div>
      )}

      {/* Skin scores */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Skin Health Breakdown</h3>
        {[
          { label: 'Hydration & Plumpness', value: result.scores?.hydration },
          { label: 'Tone Evenness', value: result.scores?.evenness },
          { label: 'Texture & Smoothness', value: result.scores?.texture },
          { label: 'Radiance & Glow', value: result.scores?.radiance },
          { label: 'Pore Clarity', value: result.scores?.pores },
          { label: 'Firmness', value: result.scores?.firmness },
        ].map(s => <ScoreBar key={s.label} {...s} />)}
      </div>

      {/* Insights */}
      {result.insights?.filter(Boolean).length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-3">What We Found in Your Skin</h3>
          <ul className="space-y-3">
            {result.insights.filter(Boolean).map((ins, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[9px] font-black text-pink-600">{i + 1}</span>
                </div>
                <span className="leading-relaxed">{ins}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Concerns */}
      {result.concerns?.filter(Boolean).length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <h3 className="text-sm font-bold text-amber-800 mb-2 flex items-center gap-2">
            <AlertCircle size={14} /> Skin Concerns
          </h3>
          <ul className="space-y-2">
            {result.concerns.filter(Boolean).map((c, i) => (
              <li key={i} className="text-xs text-amber-700 flex items-start gap-2 leading-relaxed">
                <span className="shrink-0 font-bold mt-0.5">•</span>{c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Morning + Evening routine */}
      {(result.morningRoutine?.length > 0 || result.eveningRoutine?.length > 0) && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Your Personalised Routine</h3>
          <div className="grid grid-cols-2 gap-4">
            {result.morningRoutine?.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <Sun size={13} className="text-amber-500" />
                  <p className="text-xs font-bold text-amber-600">Morning</p>
                </div>
                <ol className="space-y-2">
                  {result.morningRoutine.map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-4 h-4 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-[8px] font-black shrink-0 mt-0.5">{i + 1}</span>
                      <span className="text-[10px] text-gray-600 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {result.eveningRoutine?.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <Moon size={13} className="text-indigo-500" />
                  <p className="text-xs font-bold text-indigo-600">Evening</p>
                </div>
                <ol className="space-y-2">
                  {result.eveningRoutine.map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-4 h-4 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-[8px] font-black shrink-0 mt-0.5">{i + 1}</span>
                      <span className="text-[10px] text-gray-600 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Products */}
      {result.recommendations?.filter(r => r?.product).length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">Recommended Products</h3>
            <Link to="/shop/skin-care" className="text-xs text-pink-500 font-bold flex items-center gap-1 shrink-0">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {result.recommendations.filter(r => r?.product).map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:border-pink-200 transition-colors">
                <div className="w-11 h-11 bg-pink-50 rounded-xl flex items-center justify-center shrink-0 text-xl">✨</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800">{r.product}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">{r.reason}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 max-w-[80px] h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${r.match || 80}%` }} />
                    </div>
                    <span className="text-[9px] font-bold text-emerald-600">{r.match || 80}% match</span>
                  </div>
                </div>
                <Link to="/shop/skin-care"
                  className="shrink-0 text-[10px] bg-pink-500 text-white px-3 py-1.5 rounded-full hover:bg-pink-600 transition-colors">
                  Shop
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ask Dora + Retake */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => openDoraWithContext('skin', result)}
          className="flex items-center justify-center gap-2.5 bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-all text-sm active:scale-[0.99]"
        >
          <MessageCircle size={16} /> Ask Dora About My Results
        </button>
        <button onClick={onReset}
          className="flex items-center justify-center gap-2.5 border-2 border-pink-500 text-pink-500 font-bold py-4 rounded-2xl hover:bg-pink-50 transition-all text-sm active:scale-[0.99]">
          <RotateCcw size={16} /> New Analysis
        </button>
      </div>

      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-5 text-white">
        <p className="text-base font-black mb-1">Book a Skin Consultation</p>
        <p className="text-xs text-pink-100 mb-4 leading-relaxed">
          Get a professional skin treatment tailored to your {result.skinType || ''} skin.
        </p>
        <Link to="/book/makeup"
          className="block w-full bg-white text-pink-500 text-sm font-black py-3 rounded-xl text-center hover:bg-pink-50 transition-colors">
          Book Consultation
        </Link>
      </div>
    </div>
  )
}

// ── Page shell ────────────────────────────────────────────────────────────────
function PageShell({ activeTab, children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-5 sm:py-7">
          <p className="text-xs text-gray-400 mb-3">
            <Link to="/" className="hover:text-pink-500">Home</Link> › AI Analyser
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded-full mb-3">
                🖤 Specialised for Afro & Textured Hair
              </div>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
                {activeTab === 'hair' ? <>AI Hair <em className="text-pink-500 not-italic">Analysis</em></> : <>AI Skin <em className="text-pink-500 not-italic">Analysis</em></>}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">
                {activeTab === 'hair'
                  ? 'Upload a photo — get your curl type, face shape, best protective styles, wig picks, and a personalised product plan. Instant results.'
                  : 'One selfie — skin type, undertone, face shape, bespoke morning & evening routine, and product recommendations. Instant.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-14 z-30">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 flex">
          <Link to="/ai-beauty/hair"
            className={`py-3 px-1 mr-6 text-sm font-bold border-b-2 transition-colors ${activeTab === 'hair' ? 'text-pink-500 border-pink-500' : 'text-gray-400 border-transparent hover:text-gray-700'}`}>
            💇‍♀️ Hair Analysis
          </Link>
          <Link to="/ai-beauty/skin"
            className={`py-3 px-1 text-sm font-bold border-b-2 transition-colors ${activeTab === 'skin' ? 'text-pink-500 border-pink-500' : 'text-gray-400 border-transparent hover:text-gray-700'}`}>
            🧖‍♀️ Skin Analysis
          </Link>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">{children}</div>
      </div>
    </div>
  )
}

// ── Hair page (default export) ────────────────────────────────────────────────
export default function AIHairAnalysis() {
  const [phase, setPhase] = useState('landing')
  const [result, setResult] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [error, setError] = useState('')

  const analyze = async (imageBase64) => {
    setPreviewUrl(imageBase64); setPhase('analyzing'); setError('')
    try {
      const compressed = await compressImage(imageBase64)
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: compressed, type: 'hair' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`)
      setResult(data); setPhase('results')
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.')
      setPhase('landing')
    }
  }

  const reset = () => { setPhase('landing'); setResult(null); setPreviewUrl(null); setError('') }

  return (
    <PageShell activeTab="hair">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 mb-5">
          <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-bold text-red-700">Analysis failed</p>
            <p className="text-xs text-red-500 mt-0.5">{error}</p>
          </div>
          <button onClick={() => setError('')}><X size={14} className="text-red-400" /></button>
        </div>
      )}
      {phase === 'landing'   && <HairUploadZone onAnalyze={analyze} />}
      {phase === 'analyzing' && <AnalyzingState type="hair" />}
      {phase === 'results'   && result && <HairResults result={result} previewUrl={previewUrl} onReset={reset} />}
    </PageShell>
  )
}

// ── Skin page (named export) ──────────────────────────────────────────────────
export function AISkinAnalysis() {
  const [phase, setPhase] = useState('landing')
  const [result, setResult] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [error, setError] = useState('')

  const analyze = async (imageBase64) => {
    setPreviewUrl(imageBase64); setPhase('analyzing'); setError('')
    try {
      const compressed = await compressImage(imageBase64)
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: compressed, type: 'skin' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`)
      setResult(data); setPhase('results')
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.')
      setPhase('landing')
    }
  }

  const reset = () => { setPhase('landing'); setResult(null); setPreviewUrl(null); setError('') }

  return (
    <PageShell activeTab="skin">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 mb-5">
          <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-bold text-red-700">Analysis failed</p>
            <p className="text-xs text-red-500 mt-0.5">{error}</p>
          </div>
          <button onClick={() => setError('')}><X size={14} className="text-red-400" /></button>
        </div>
      )}
      {phase === 'landing'   && <SkinUploadZone onAnalyze={analyze} />}
      {phase === 'analyzing' && <AnalyzingState type="skin" />}
      {phase === 'results'   && result && <SkinResults result={result} previewUrl={previewUrl} onReset={reset} />}
    </PageShell>
  )
}
