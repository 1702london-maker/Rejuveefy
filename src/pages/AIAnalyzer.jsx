import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Upload, Camera, Sparkles, BarChart2, ShieldCheck, ArrowRight, RotateCcw, Zap, Droplets, Sun, Wind, AlertCircle, X } from 'lucide-react'

// ── Shared helpers ─────────────────────────────────────────────────────────────

function ScoreBar({ label, value }) {
  const color = value >= 75 ? 'bg-green-500' : value >= 50 ? 'bg-amber-400' : 'bg-red-400'
  const textColor = value >= 75 ? 'text-green-600' : value >= 50 ? 'text-amber-600' : 'text-red-500'
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-gray-600">{label}</span>
        <span className={`text-xs font-bold ${textColor}`}>{value}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function AnalysisResults({ result, type, previewUrl, onReset }) {
  const overall = result.overallScore || 75
  const scores = type === 'hair'
    ? [
        { label: 'Moisture', value: result.scores?.moisture ?? 70 },
        { label: 'Strength', value: result.scores?.strength ?? 65 },
        { label: 'Scalp Health', value: result.scores?.scalp ?? 80 },
        { label: 'Shine', value: result.scores?.shine ?? 75 },
        { label: 'Density', value: result.scores?.density ?? 70 },
        { label: 'Growth', value: result.scores?.growth ?? 65 },
      ]
    : [
        { label: 'Hydration', value: result.scores?.hydration ?? 70 },
        { label: 'Evenness', value: result.scores?.evenness ?? 65 },
        { label: 'Texture', value: result.scores?.texture ?? 80 },
        { label: 'Radiance', value: result.scores?.radiance ?? 75 },
        { label: 'Pores', value: result.scores?.pores ?? 70 },
        { label: 'Firmness', value: result.scores?.firmness ?? 65 },
      ]

  const conditionColor = result.condition === 'Excellent' ? 'text-green-600' :
    result.condition === 'Good' ? 'text-blue-600' :
    result.condition === 'Fair' ? 'text-amber-600' : 'text-red-500'

  return (
    <div className="space-y-5">
      {/* Overall score */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
        <div className="flex items-start gap-4">
          <div className="relative w-20 h-20 shrink-0">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="30" fill="none" stroke="#FCE4EC" strokeWidth="8" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#E91E63" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 30 * overall / 100} ${2 * Math.PI * 30}`}
                strokeLinecap="round" className="transition-all duration-1000" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-bold text-xl text-gray-900 leading-none">{overall}</span>
              <span className="text-[9px] text-gray-400">/ 100</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="font-display text-xl font-bold text-gray-900">
                  {type === 'hair' ? 'Hair' : 'Skin'} Analysis Results
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Condition: <strong className={conditionColor}>{result.condition || 'Good'}</strong>
                  {(type === 'hair' ? result.hairType : result.skinType) && (
                    <span className="text-gray-400"> · {type === 'hair' ? result.hairType : result.skinType}</span>
                  )}
                </p>
              </div>
              {previewUrl && (
                <img src={previewUrl} alt="Uploaded" className="w-14 h-14 rounded-xl object-cover border border-gray-100 shrink-0" />
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">{result.summary}</p>
          </div>
        </div>
      </div>

      {/* Score bars */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Detailed Analysis</h3>
        {scores.map(s => <ScoreBar key={s.label} {...s} />)}
      </div>

      {/* Insights */}
      {result.insights?.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Insights</h3>
          <ul className="space-y-2">
            {result.insights.map((insight, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-pink-500 font-bold shrink-0 mt-0.5">·</span>
                {insight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Concerns */}
      {result.concerns?.length > 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-amber-800 mb-3">Areas to Address</h3>
          <ul className="space-y-1.5">
            {result.concerns.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-amber-700">
                <AlertCircle size={13} className="shrink-0 mt-0.5 text-amber-500" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations?.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Recommended Products</h3>
            <Link to="/shop" className="text-xs text-pink-500 font-semibold flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {result.recommendations.map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:border-pink-200 transition-colors">
                <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center shrink-0">
                  <Sparkles size={18} className="text-pink-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">{r.product}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{r.reason}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="h-1 bg-green-500 rounded-full" style={{ width: `${Math.min(r.match, 99)}%`, maxWidth: '60px' }} />
                    <span className="text-[9px] font-bold text-green-600">{r.match}% match</span>
                  </div>
                </div>
                <Link to="/shop"
                  className="text-[10px] bg-pink-500 text-white px-2.5 py-1.5 rounded-full hover:bg-pink-600 transition-colors shrink-0 whitespace-nowrap">
                  Shop Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="text-sm font-bold">Book a {type === 'hair' ? 'Hair' : 'Skin'} Consultation</p>
            <p className="text-xs text-pink-100">Connect with a specialist based on your results</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to="/book" className="flex-1 bg-white text-pink-500 text-xs font-bold py-2.5 rounded-full text-center hover:bg-pink-50 transition-colors">
            Book Consultation
          </Link>
          <button onClick={onReset} className="border border-white/50 text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-white/10 transition-colors flex items-center gap-1">
            <RotateCcw size={12} /> Retake
          </button>
        </div>
      </div>
    </div>
  )
}

function CameraModal({ onCapture, onClose, facing }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const constraints = {
      video: {
        facingMode: facing === 'user' ? 'user' : 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 },
      }
    }
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.onloadedmetadata = () => setReady(true)
        }
      })
      .catch(() => setError('Camera access denied. Please allow camera permission and try again.'))

    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    }
  }, [facing])

  const capture = () => {
    const video = videoRef.current
    if (!video) return
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92)
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    onCapture(dataUrl)
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-black/80">
        <span className="text-white text-sm font-semibold">Take Photo</span>
        <button onClick={onClose} className="text-white p-2"><X size={22} /></button>
      </div>
      <div className="flex-1 relative overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <AlertCircle size={40} className="text-red-400 mb-3" />
            <p className="text-white text-sm">{error}</p>
            <button onClick={onClose} className="mt-4 bg-pink-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold">Go Back</button>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        )}
      </div>
      {!error && (
        <div className="flex items-center justify-center py-6 bg-black/80">
          <button
            onClick={capture}
            disabled={!ready}
            className="w-16 h-16 rounded-full bg-white border-4 border-pink-500 flex items-center justify-center hover:bg-pink-50 transition-colors disabled:opacity-40"
          >
            <Camera size={26} className="text-pink-500" />
          </button>
        </div>
      )}
    </div>
  )
}

function UploadZone({ onAnalyze, type }) {
  const uploadId = `file-upload-${type}`
  const [preview, setPreview] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const uploadRef = useRef(null)

  const handleFile = (f) => {
    if (!f || !f.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(f)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleCapture = (dataUrl) => {
    setShowCamera(false)
    setPreview(dataUrl)
  }

  // facing: 'environment' for hair (back camera), 'user' for skin (selfie)
  const cameraFacing = type === 'skin' ? 'user' : 'environment'

  return (
    <>
      {showCamera && (
        <CameraModal
          onCapture={handleCapture}
          onClose={() => setShowCamera(false)}
          facing={cameraFacing}
        />
      )}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-8 mb-5">
        <h2 className="text-base font-semibold text-gray-900 mb-2">
          Upload Your {type === 'hair' ? 'Hair Photo' : 'Selfie'}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {type === 'hair'
            ? 'A clear photo of your hair in good lighting gives the most accurate results.'
            : 'A well-lit selfie with your face clearly visible gives the most accurate results.'}
        </p>

        {/* File upload input — no capture attribute so it opens the file picker */}
        <input
          ref={uploadRef}
          id={uploadId}
          type="file"
          accept="image/*"
          style={{ position: 'absolute', width: 1, height: 1, opacity: 0, overflow: 'hidden' }}
          onChange={e => handleFile(e.target.files[0])}
        />

        {preview ? (
          <div className="mb-5">
            <div className="relative rounded-2xl overflow-hidden mb-3">
              <img src={preview} alt="Preview" className="w-full max-h-64 object-cover rounded-2xl" />
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => uploadRef.current?.click()}
                  className="bg-white/90 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white shadow-sm"
                >
                  Change
                </button>
                <button
                  onClick={() => setShowCamera(true)}
                  className="bg-white/90 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white shadow-sm flex items-center gap-1"
                >
                  <Camera size={11} /> Retake
                </button>
              </div>
            </div>
            <button onClick={() => onAnalyze(preview)}
              className="w-full bg-pink-500 text-white font-bold py-3.5 rounded-full hover:bg-pink-600 transition-colors flex items-center justify-center gap-2">
              <Sparkles size={16} /> Analyse Now
            </button>
          </div>
        ) : (
          <div
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            className={`flex flex-col items-center border-2 border-dashed rounded-2xl p-10 text-center transition-all
              ${dragOver ? 'border-pink-500 bg-pink-50' : 'border-pink-200 bg-white'}`}
          >
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <Upload size={24} className="text-pink-500" />
            </div>
            <p className="text-sm font-semibold text-gray-800 mb-1">Drop your photo here or choose an option below</p>
            <p className="text-xs text-gray-400 mb-6">JPG, PNG or WEBP · Max 10MB</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => uploadRef.current?.click()}
                className="flex items-center gap-2 bg-pink-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-pink-600 transition-colors"
              >
                <Upload size={15} /> Upload Photo
              </button>
              <button
                onClick={() => setShowCamera(true)}
                className="flex items-center gap-2 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:border-pink-400 hover:text-pink-500 transition-colors"
              >
                <Camera size={15} /> Take Photo
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-4">Your privacy is protected · Images are never stored</p>
          </div>
        )}

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { icon: '💡', title: 'Good Lighting', sub: 'Natural light works best' },
            { icon: '🔍', title: 'Clear Focus', sub: type === 'hair' ? 'Hair should be sharp' : 'Face should be sharp' },
            { icon: '📐', title: 'Proper Angle', sub: type === 'hair' ? 'Show hair & scalp' : 'Face forward, chin up' },
          ].map(t => (
            <div key={t.title} className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-xl mb-1">{t.icon}</div>
              <p className="text-xs font-semibold text-gray-700">{t.title}</p>
              <p className="text-[10px] text-gray-400">{t.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function AnalyzingState({ type }) {
  const steps = type === 'hair'
    ? ['Scanning image quality...', 'Measuring moisture levels...', 'Analysing scalp health...', 'Generating recommendations...']
    : ['Scanning image quality...', 'Checking skin hydration...', 'Analysing texture & tone...', 'Generating recommendations...']

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-10 text-center">
      <div className="w-20 h-20 mx-auto mb-6 relative">
        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center">
          <Sparkles size={32} className="text-pink-500 animate-pulse" />
        </div>
        <div className="absolute inset-0 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
      <h2 className="font-display text-xl font-bold text-gray-900 mb-2">
        Analysing Your {type === 'hair' ? 'Hair' : 'Skin'}...
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Our AI is scanning your photo — this takes about 10–15 seconds.
      </p>
      <div className="space-y-2 max-w-xs mx-auto">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 text-xs text-gray-600">
            <div className="w-4 h-4 rounded-full flex items-center justify-center bg-pink-200 shrink-0">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
            </div>
            {step}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── AI HAIR ANALYSIS ──────────────────────────────────────────────────────────
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
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, type: 'hair' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Analysis failed')
      setResult(data)
      setPhase('results')
    } catch (err) {
      setError(err.message)
      setPhase('landing')
    }
  }

  const reset = () => { setPhase('landing'); setResult(null); setPreviewUrl(null); setError('') }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-50 to-white border-b border-pink-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
          <p className="text-xs text-gray-400 mb-3">
            <Link to="/" className="hover:text-pink-500">Home</Link> › <span>AI Analyser</span>
          </p>
          <div className="flex items-center gap-3 mb-2">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1.5 rounded-full">
              <Zap size={13} /> Advanced Beauty Analysis
            </div>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
            AI Hair <em className="text-pink-500 not-italic">Analysis</em>
          </h1>
          <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
            Upload a photo and our AI will analyse your hair health, identify concerns, and recommend personalised products and treatments.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 flex gap-1">
          <Link to="/ai-beauty/hair" className="px-5 py-3 text-sm font-semibold border-b-2 border-pink-500 text-pink-500">Hair Analysis</Link>
          <Link to="/ai-beauty/skin" className="px-5 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-800">Skin Analysis</Link>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div>
            {phase === 'landing' && <UploadZone onAnalyze={analyze} type="hair" />}
            {phase === 'analyzing' && <AnalyzingState type="hair" />}
            {phase === 'results' && result && (
              <AnalysisResults result={result} type="hair" previewUrl={previewUrl} onReset={reset} />
            )}
          </div>
          <aside className="space-y-4">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles size={14} className="text-pink-500" /> What We Analyse
              </h3>
              {['Moisture Level', 'Hair Strength', 'Scalp Health', 'Shine & Lustre', 'Density', 'Growth Health'].map(label => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-pink-400" />
                    <span className="text-xs text-gray-600">{label}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400">Measured</span>
                </div>
              ))}
            </div>
            <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Also Try Skin Analysis</h3>
              <p className="text-xs text-gray-500 mb-3">Get a complete beauty health report with our skin analysis tool.</p>
              <Link to="/ai-beauty/skin" className="block w-full bg-pink-500 text-white text-xs font-bold py-2.5 rounded-full text-center hover:bg-pink-600 transition-colors">
                Analyse My Skin →
              </Link>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-green-500" /> Your Privacy
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">Your image is sent securely for analysis and is never stored on our servers.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

// ── AI SKIN ANALYSIS ──────────────────────────────────────────────────────────
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
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, type: 'skin' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Analysis failed')
      setResult(data)
      setPhase('results')
    } catch (err) {
      setError(err.message)
      setPhase('landing')
    }
  }

  const reset = () => { setPhase('landing'); setResult(null); setPreviewUrl(null); setError('') }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-purple-50 to-white border-b border-purple-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
          <p className="text-xs text-gray-400 mb-3">
            <Link to="/" className="hover:text-pink-500">Home</Link> › <span>AI Analyser</span>
          </p>
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
            <Zap size={13} /> Powered by Rejuveefy AI
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
            AI Skin <em className="text-pink-500 not-italic">Analysis</em>
          </h1>
          <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
            Upload a selfie and our AI will analyse your skin type, identify concerns, and recommend personalised skincare products.
          </p>
          <div className="flex gap-4 mt-4">
            {[
              { icon: <Droplets size={14} className="text-blue-500" />, label: 'Hydration Check' },
              { icon: <Sun size={14} className="text-yellow-500" />, label: 'UV Damage' },
              { icon: <Wind size={14} className="text-purple-500" />, label: 'Texture Analysis' },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-1.5 text-xs text-gray-600">{f.icon}{f.label}</div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 flex gap-1">
          <Link to="/ai-beauty/hair" className="px-5 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-800">Hair Analysis</Link>
          <Link to="/ai-beauty/skin" className="px-5 py-3 text-sm font-semibold border-b-2 border-pink-500 text-pink-500">Skin Analysis</Link>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div>
            {phase === 'landing' && <UploadZone onAnalyze={analyze} type="skin" />}
            {phase === 'analyzing' && <AnalyzingState type="skin" />}
            {phase === 'results' && result && (
              <AnalysisResults result={result} type="skin" previewUrl={previewUrl} onReset={reset} />
            )}
          </div>
          <aside className="space-y-4">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">What We Analyse</h3>
              {['Hydration Level', 'Skin Evenness', 'Texture & Pores', 'Radiance & Glow', 'Pore Size', 'Firmness'].map(label => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-xs text-gray-600">{label}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400">Measured</span>
                </div>
              ))}
            </div>
            <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Also Try Hair Analysis</h3>
              <p className="text-xs text-gray-500 mb-3">Complete your beauty check with our hair analysis tool.</p>
              <Link to="/ai-beauty/hair" className="block w-full bg-pink-500 text-white text-xs font-bold py-2.5 rounded-full text-center hover:bg-pink-600 transition-colors">
                Analyse My Hair →
              </Link>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-green-500" /> Your Privacy
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">Your image is sent securely for analysis and is never stored on our servers.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
