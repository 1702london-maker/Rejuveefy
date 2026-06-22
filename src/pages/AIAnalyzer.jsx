import { useState, useRef } from 'react'
import { Sparkles, Upload, Camera, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { providers } from '../data/mockData'

const hairResults = [
  { label: 'Hair Type', value: '4C Natural', icon: '🌿', color: 'text-green-700 bg-green-50' },
  { label: 'Density', value: 'Medium-High', icon: '💪', color: 'text-blue-700 bg-blue-50' },
  { label: 'Moisture Level', value: 'Low', icon: '💧', color: 'text-amber-700 bg-amber-50' },
  { label: 'Breakage Visibility', value: 'Moderate', icon: '⚠️', color: 'text-orange-700 bg-orange-50' },
  { label: 'Scalp Condition', value: 'Slightly Dry', icon: '🔍', color: 'text-purple-700 bg-purple-50' },
]
const skinResults = [
  { label: 'Skin Tone', value: 'Deep Warm', icon: '🌞', color: 'text-amber-700 bg-amber-50' },
  { label: 'Acne Visibility', value: 'Minimal signs', icon: '✨', color: 'text-green-700 bg-green-50' },
  { label: 'Oiliness', value: 'T-Zone oiliness', icon: '💦', color: 'text-blue-700 bg-blue-50' },
  { label: 'Texture Concern', value: 'Some unevenness', icon: '🔬', color: 'text-purple-700 bg-purple-50' },
  { label: 'Hyperpigmentation', value: 'Mild visible signs', icon: '🌸', color: 'text-rose-700 bg-rose-50' },
]
const hairSuggestedServices = ['Deep Conditioning Treatment', 'Scalp Serum Application', 'Moisture Retention Braid Style']
const skinSuggestedServices = ['Hydrating Facial', 'LED Light Treatment', 'Brightening Skin Treatment']

function AnalyzerCard({ type, onBack }) {
  const [previewUrl, setPreviewUrl] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [done, setDone] = useState(false)
  const fileRef = useRef()

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleAnalyze = () => {
    setAnalyzing(true)
    setTimeout(() => { setAnalyzing(false); setDone(true) }, 2800)
  }

  const results = type === 'hair' ? hairResults : skinResults
  const suggestedServices = type === 'hair' ? hairSuggestedServices : skinSuggestedServices

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="text-sm text-on-surface-variant hover:text-primary mb-6 inline-block">← Choose different analysis</button>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center text-2xl">{type === 'hair' ? '💇' : '🧖'}</div>
        <div>
          <h2 className="font-display text-xl font-bold text-on-surface capitalize">{type} Analysis</h2>
          <p className="text-sm text-on-surface-variant">Upload a clear photo for best results</p>
        </div>
      </div>

      {!done ? (
        <>
          {/* Consent */}
          <div className="bg-primary-fixed/20 rounded-2xl p-5 border border-primary-container/30 mb-6 flex gap-3">
            <AlertCircle size={18} className="text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-on-surface-variant leading-relaxed">
              By uploading your photo, you agree that it will be processed locally to generate beauty recommendations. Your photo is <strong>not stored or shared</strong>. Results are <strong>informational only</strong> and do not constitute medical or dermatological advice.
            </p>
          </div>

          {/* Upload */}
          {!previewUrl ? (
            <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-primary-container rounded-3xl p-12 text-center cursor-pointer hover:border-primary hover:bg-primary-fixed/10 transition-all">
              <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleFile} className="hidden" />
              <div className="w-16 h-16 bg-primary-container/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">📷</div>
              <p className="font-semibold text-on-surface mb-1">Upload or take a photo</p>
              <p className="text-sm text-on-surface-variant">JPG, PNG or HEIC · Max 10MB</p>
              <div className="flex gap-3 justify-center mt-4">
                <span className="flex items-center gap-1.5 text-xs text-primary bg-primary-fixed px-3 py-1.5 rounded-full"><Upload size={12} /> Upload photo</span>
                <span className="flex items-center gap-1.5 text-xs text-primary bg-primary-fixed px-3 py-1.5 rounded-full"><Camera size={12} /> Take photo</span>
              </div>
            </div>
          ) : (
            <div className="relative rounded-3xl overflow-hidden mb-6">
              <img src={previewUrl} alt="Uploaded" className="w-full max-h-80 object-cover" />
              <button onClick={() => setPreviewUrl(null)} className="absolute top-3 right-3 bg-surface-container-lowest/80 text-on-surface text-xs px-3 py-1.5 rounded-full">Change photo</button>
              {analyzing && (
                <div className="absolute inset-0 bg-surface/80 flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center ai-shimmer">
                    <Sparkles size={24} className="text-primary" />
                  </div>
                  <p className="font-semibold text-on-surface">Analysing your {type}...</p>
                  <div className="w-48 h-1.5 bg-primary-container/30 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full ai-shimmer" style={{ width: '70%' }} />
                  </div>
                </div>
              )}
            </div>
          )}

          {previewUrl && !analyzing && (
            <button onClick={handleAnalyze} className="w-full bg-primary text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-ambient">
              <Sparkles size={18} /> Analyse Now
            </button>
          )}
        </>
      ) : (
        <div className="space-y-6">
          {/* Result cards */}
          <div>
            <h3 className="font-semibold text-on-surface mb-3">Analysis Results</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {results.map(r => (
                <div key={r.label} className={`rounded-2xl p-4 ${r.color.split(' ').pop()}`}>
                  <span className="text-xl mb-2 block">{r.icon}</span>
                  <p className={`text-xs font-medium mb-0.5 ${r.color.split(' ')[0]}`}>{r.label}</p>
                  <p className="font-bold text-sm text-on-surface">{r.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested services */}
          <div className="bg-primary-fixed/20 rounded-2xl p-5 border border-primary-container/30">
            <div className="flex items-center gap-2 mb-3"><Sparkles size={16} className="text-primary" /><h3 className="font-semibold text-on-surface text-sm">Suggested Services</h3></div>
            <div className="flex flex-wrap gap-2">
              {suggestedServices.map(s => <Link key={s} to="/book" className="text-xs bg-primary-container/40 text-on-primary-container px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-all">{s}</Link>)}
            </div>
          </div>

          {/* Suggested products */}
          <div className="bg-surface-container-low rounded-2xl p-5">
            <h3 className="font-semibold text-on-surface text-sm mb-3">Recommended Products</h3>
            <div className="flex flex-wrap gap-2">
              {['Deep Moisture Mask', 'Scalp Serum Elixir', 'Satin Bonnet Set'].map(p => <Link key={p} to="/shop" className="text-xs border border-outline-variant/30 text-on-surface-variant px-3 py-1.5 rounded-full hover:border-primary hover:text-primary transition-all">{p}</Link>)}
            </div>
          </div>

          {/* Recommended providers */}
          <div>
            <h3 className="font-semibold text-on-surface text-sm mb-3">Matched Providers</h3>
            <div className="grid grid-cols-2 gap-3">
              {providers.slice(0, 2).map(p => (
                <Link key={p.id} to={`/providers/${p.id}`} className="flex items-center gap-3 bg-surface-container-lowest rounded-2xl p-3 shadow-ambient hover:shadow-modal transition-all">
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded-full object-cover" />
                  <div><p className="font-semibold text-xs text-on-surface">{p.name}</p><p className="text-[10px] text-on-surface-variant">{p.title}</p></div>
                </Link>
              ))}
            </div>
          </div>

          <p className="text-xs text-on-surface-variant text-center">Results are informational guidance only and do not constitute medical or dermatological advice. For health concerns, please consult a professional.</p>

          <button onClick={() => { setDone(false); setPreviewUrl(null) }} className="w-full border-[1.5px] border-primary text-primary py-3 rounded-full font-semibold text-sm hover:bg-primary/5">
            Analyse Another Photo
          </button>
        </div>
      )}
    </div>
  )
}

export default function AIAnalyzer() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-fixed/50 via-surface to-surface py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl floating">✨</div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary-fixed px-3 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            <Sparkles size={12} /> AI Technology
          </span>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-on-surface mb-3">AI Beauty Analyzer</h1>
          <p className="text-on-surface-variant max-w-xl mx-auto">Upload a photo and let our AI analyse your hair or skin to provide personalised beauty recommendations.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {!selected ? (
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-xl font-bold text-on-surface text-center mb-8">What would you like to analyse?</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { id: 'hair', emoji: '💇', title: 'Hair Analysis', desc: 'Discover your hair type, density, scalp health, and get personalised hair care and service recommendations.', checks: ['Hair type & density', 'Moisture & dryness', 'Breakage visibility', 'Scalp condition'] },
                { id: 'skin', emoji: '🧖', title: 'Skin / Face Analysis', desc: 'Analyse your skin tone, texture, and visible concerns to get targeted product and treatment suggestions.', checks: ['Skin tone analysis', 'Oiliness & dryness', 'Hyperpigmentation', 'Texture concerns'] },
              ].map(opt => (
                <button key={opt.id} onClick={() => setSelected(opt.id)}
                  className="luxury-card text-left bg-surface-container-lowest rounded-3xl p-6 shadow-ambient border border-outline-variant/20 hover:border-primary/40 group transition-all">
                  <span className="text-4xl mb-4 block">{opt.emoji}</span>
                  <h3 className="font-display font-bold text-lg text-on-surface mb-2">{opt.title}</h3>
                  <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">{opt.desc}</p>
                  <ul className="space-y-1.5">
                    {opt.checks.map(c => <li key={c} className="flex items-center gap-2 text-xs text-on-surface-variant"><Sparkles size={10} className="text-primary" />{c}</li>)}
                  </ul>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                    Get Started →
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <AnalyzerCard type={selected} onBack={() => setSelected(null)} />
        )}
      </div>
    </div>
  )
}
