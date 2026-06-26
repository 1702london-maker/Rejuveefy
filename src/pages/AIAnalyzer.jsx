import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Upload, Camera, ChevronDown, Star, Sparkles, BarChart2, Droplets, Sun, Wind, ShieldCheck, ArrowRight, RotateCcw, Zap } from 'lucide-react'

const hairScores = [
  { label: 'Moisture Level', value: 74, color: 'text-blue-500', bg: 'bg-blue-500' },
  { label: 'Scalp Health', value: 82, color: 'text-green-500', bg: 'bg-green-500' },
  { label: 'Hair Elasticity', value: 60, color: 'text-amber-500', bg: 'bg-amber-500' },
  { label: 'Breakage Risk', value: 35, color: 'text-red-400', bg: 'bg-red-400', inverted: true },
  { label: 'Shine Level', value: 88, color: 'text-yellow-500', bg: 'bg-yellow-400' },
  { label: 'Porosity Level', value: 55, color: 'text-purple-500', bg: 'bg-purple-500' },
]

const skinScores = [
  { label: 'Hydration', value: 68, color: 'text-blue-500', bg: 'bg-blue-500' },
  { label: 'Oiliness', value: 52, color: 'text-yellow-500', bg: 'bg-yellow-400' },
  { label: 'Texture', value: 78, color: 'text-green-500', bg: 'bg-green-500' },
  { label: 'Pore Visibility', value: 43, color: 'text-purple-500', bg: 'bg-purple-500' },
  { label: 'Pigmentation', value: 71, color: 'text-amber-500', bg: 'bg-amber-500' },
  { label: 'UV Damage', value: 28, color: 'text-red-400', bg: 'bg-red-400', inverted: true },
]

const hairRecommendations = [
  { product: 'Kérastase Genesis Shampoo', desc: 'Anti hair-fall shampoo for weakened hair', match: 98, price: '£24.80' },
  { product: 'Olaplex No.3 Hair Perfector', desc: 'Deep conditioning bond repairing treatment', match: 94, price: '£22.50' },
  { product: 'Moroccanoil Treatment', desc: 'Smoothing argan oil nourishing treatment', match: 90, price: '£38.50' },
]

const skinRecommendations = [
  { product: 'The Ordinary Multi-Peptide', desc: 'Multi-peptide serum for brightening skin', match: 97, price: '£14.45' },
  { product: 'La Roche-Posay Anthelios SPF50+', desc: 'Ultra-light sun protection fluid', match: 92, price: '£15.50' },
  { product: 'Lancôme Génifique Serum', desc: 'Advanced anti-aging youth activating concentrate', match: 89, price: '£64.00' },
]

function ScoreBar({ label, value, color, bg, inverted }) {
  const displayVal = inverted ? 100 - value : value
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-gray-600">{label}</span>
        <span className={`text-xs font-bold ${color}`}>{displayVal}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${bg} rounded-full transition-all duration-700`} style={{ width: `${displayVal}%` }} />
      </div>
    </div>
  )
}

function AnalysisResults({ type, scores, recommendations, onReset }) {
  const title = type === 'hair' ? 'Hair Analysis Results' : 'Skin Analysis Results'
  const overall = type === 'hair' ? 76 : 72

  return (
    <div className="space-y-5">
      {/* Overall score */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20">
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
          <div>
            <h2 className="font-display text-xl font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">Your {type} health score is <strong className="text-pink-500">Good</strong></p>
            <p className="text-xs text-gray-400 mt-1">Based on AI-powered analysis of your image</p>
          </div>
        </div>
      </div>

      {/* Scores breakdown */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Detailed Analysis</h3>
        {scores.map(s => <ScoreBar key={s.label} {...s} />)}
      </div>

      {/* Condition summary */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Condition Summary</h3>
        <div className="grid grid-cols-2 gap-2">
          {type === 'hair' ? [
            { icon: '💧', label: 'Moisture', status: 'Good — Balanced', c: 'text-blue-500 bg-blue-50' },
            { icon: '💆', label: 'Scalp', status: 'Good — Healthy', c: 'text-green-500 bg-green-50' },
            { icon: '🔥', label: 'Breakage', status: 'Low Risk', c: 'text-green-500 bg-green-50' },
            { icon: '✨', label: 'Shine', status: 'Excellent', c: 'text-yellow-500 bg-yellow-50' },
          ] : [
            { icon: '💧', label: 'Hydration', status: 'Moderate — Needs boost', c: 'text-amber-500 bg-amber-50' },
            { icon: '☀️', label: 'UV Protection', status: 'Low — At risk', c: 'text-red-500 bg-red-50' },
            { icon: '🌸', label: 'Texture', status: 'Good — Smooth', c: 'text-green-500 bg-green-50' },
            { icon: '✨', label: 'Glow', status: 'Moderate', c: 'text-yellow-500 bg-yellow-50' },
          ].map(c => (
            <div key={c.label} className={`flex items-center gap-2 p-2.5 rounded-xl ${c.c.split(' ')[1]}`}>
              <span className="text-base">{c.icon}</span>
              <div>
                <p className="text-[10px] font-bold text-gray-600">{c.label}</p>
                <p className={`text-[10px] font-medium ${c.c.split(' ')[0]}`}>{c.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Recommended Products</h3>
          <Link to="/shop" className="text-xs text-pink-500 font-semibold flex items-center gap-1">View All <ArrowRight size={12} /></Link>
        </div>
        <div className="space-y-3">
          {recommendations.map((r) => (
            <div key={r.product} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl card-hover">
              <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center shrink-0">
                <Sparkles size={18} className="text-pink-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-800">{r.product}</p>
                <p className="text-[10px] text-gray-400">{r.desc}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="h-1 bg-green-500 rounded-full" style={{ width: `${r.match}%`, maxWidth: '60px' }} />
                  <span className="text-[9px] font-bold text-green-600">{r.match}% match</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-gray-900">{r.price}</p>
                <button className="text-[10px] bg-pink-500 text-white px-2.5 py-1 rounded-full mt-1 hover:bg-pink-600 transition-colors">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking CTA */}
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

// ── AI HAIR ANALYSIS ──────────────────────────────────────────────────────────
export default function AIHairAnalysis() {
  const [phase, setPhase] = useState('landing') // landing | analyzing | results
  const [uploadedImg, setUploadedImg] = useState(null)

  const startAnalysis = () => {
    setPhase('analyzing')
    setTimeout(() => setPhase('results'), 2500)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-50 to-white border-b border-pink-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
          <p className="text-xs text-gray-400 mb-3">
            <Link to="/" className="hover:text-pink-500">Home</Link> › <span>AI Beauty Analyzer</span>
          </p>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <Zap size={13} /> Powered by Rejuveefy AI
              </div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
                AI Hair<br /><em className="text-pink-500 not-italic">Analysis</em>
              </h1>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                Upload a photo and our AI will analyze your hair health, identify concerns, and recommend personalized products and treatments.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: <BarChart2 size={15} className="text-pink-500" />, label: 'Deep Analysis' },
                  { icon: <Sparkles size={15} className="text-pink-500" />, label: 'Smart Recommendations' },
                  { icon: <ShieldCheck size={15} className="text-pink-500" />, label: 'Private & Secure' },
                ].map(f => (
                  <div key={f.label} className="flex items-center gap-1.5 text-xs text-gray-600">
                    {f.icon} {f.label}
                  </div>
                ))}
              </div>
            </div>
            {/* Phone mockup */}
            <div className="hidden lg:flex justify-center">
              <div className="relative w-56">
                <div className="bg-gray-900 rounded-[2rem] p-3 shadow-2xl">
                  <div className="bg-white rounded-[1.5rem] overflow-hidden">
                    <div className="bg-pink-500 p-3">
                      <p className="text-white text-xs font-bold mb-2">Hair Analysis</p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {hairScores.slice(0, 3).map(s => (
                          <div key={s.label} className="bg-white/20 rounded-lg p-1.5 text-center">
                            <p className="text-white font-bold text-sm">{s.value}%</p>
                            <p className="text-white/70 text-[8px]">{s.label.split(' ')[0]}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="w-full h-24 bg-pink-50 rounded-xl mb-2 flex items-center justify-center">
                        <span className="text-3xl">👱‍♀️</span>
                      </div>
                      {hairScores.slice(0, 3).map(s => (
                        <div key={s.label} className="flex items-center gap-1.5 mb-1">
                          <div className="h-1 flex-1 bg-gray-100 rounded-full">
                            <div className={`h-full ${s.bg} rounded-full`} style={{ width: `${s.value}%` }} />
                          </div>
                          <span className="text-[8px] text-gray-400 w-6">{s.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -left-8 top-12 bg-white rounded-xl shadow-pink px-3 py-2 border border-pink-100">
                  <p className="text-[9px] font-bold text-pink-500">Moisture</p>
                  <p className="text-xs font-bold text-gray-900">74%</p>
                </div>
                <div className="absolute -right-8 bottom-16 bg-white rounded-xl shadow-pink px-3 py-2 border border-pink-100">
                  <p className="text-[9px] font-bold text-green-500">Scalp</p>
                  <p className="text-xs font-bold text-gray-900">82%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab nav */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <div className="flex gap-1">
            <Link to="/ai-beauty/hair" className="px-5 py-3 text-sm font-semibold border-b-2 border-pink-500 text-pink-500">
              Hair Analysis
            </Link>
            <Link to="/ai-beauty/skin" className="px-5 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-800">
              Skin Analysis
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Upload / analyzing / results */}
          <div>
            {phase === 'landing' && (
              <div>
                <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-8 mb-5">
                  <h2 className="text-base font-semibold text-gray-900 mb-2">Upload Your Photo</h2>
                  <p className="text-sm text-gray-500 mb-6">Take or upload a clear photo of your hair for the most accurate analysis.</p>

                  {/* Upload area */}
                  <div className="border-2 border-dashed border-pink-200 rounded-2xl p-10 text-center cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-all group">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 transition-colors">
                      <Upload size={24} className="text-pink-500" />
                    </div>
                    <p className="text-sm font-semibold text-gray-800 mb-1">Drop your photo here</p>
                    <p className="text-xs text-gray-400 mb-4">or click to browse</p>
                    <div className="flex justify-center gap-3">
                      <button onClick={startAnalysis} className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-pink-600 transition-colors">
                        <Upload size={15} /> Upload Photo
                      </button>
                      <button onClick={startAnalysis} className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-semibold hover:border-pink-300 transition-colors">
                        <Camera size={15} /> Take Photo
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-3">JPG, PNG or WEBP · Max 10MB · Your privacy is protected</p>
                  </div>

                  {/* Tips */}
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      { icon: '💡', title: 'Good Lighting', sub: 'Natural light works best' },
                      { icon: '🔍', title: 'Clear Focus', sub: 'Hair should be in sharp focus' },
                      { icon: '📐', title: 'Proper Angle', sub: 'Show hair & scalp clearly' },
                    ].map(t => (
                      <div key={t.title} className="text-center p-3 bg-gray-50 rounded-xl">
                        <div className="text-xl mb-1">{t.icon}</div>
                        <p className="text-xs font-semibold text-gray-700">{t.title}</p>
                        <p className="text-[10px] text-gray-400">{t.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How it works */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">How It Works</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { n: '1', icon: '📷', title: 'Upload Photo', sub: 'Take or upload a clear photo of your hair' },
                      { n: '2', icon: '🔬', title: 'AI Analyzes', sub: 'Our AI scans your hair for key metrics' },
                      { n: '3', icon: '📊', title: 'Get Results', sub: 'Receive detailed health scores & insights' },
                      { n: '4', icon: '🛍️', title: 'Shop & Book', sub: 'Get product and service recommendations' },
                    ].map(s => (
                      <div key={s.n} className="text-center">
                        <div className="text-2xl mb-2">{s.icon}</div>
                        <p className="text-xs font-semibold text-gray-800 mb-1">{s.title}</p>
                        <p className="text-[10px] text-gray-400 leading-relaxed">{s.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {phase === 'analyzing' && (
              <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 relative">
                  <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center">
                    <Sparkles size={32} className="text-pink-500 animate-pulse" />
                  </div>
                  <div className="absolute inset-0 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
                </div>
                <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Analyzing Your Hair...</h2>
                <p className="text-sm text-gray-500 mb-6">Our Rejuveefy AI is scanning your photo for moisture, scalp health, elasticity, and more.</p>
                <div className="space-y-2">
                  {['Scanning image quality...', 'Measuring moisture levels...', 'Analyzing scalp health...', 'Generating recommendations...'].map((step, i) => (
                    <div key={step} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 text-xs text-gray-600">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${i < 3 ? 'bg-green-500' : 'bg-pink-500 animate-pulse'}`}>
                        <span className="text-white text-[9px]">{i < 3 ? '✓' : '...'}</span>
                      </div>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {phase === 'results' && (
              <AnalysisResults type="hair" scores={hairScores} recommendations={hairRecommendations} onReset={() => setPhase('landing')} />
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles size={14} className="text-pink-500" /> What We Analyze
              </h3>
              {hairScores.map(s => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-lg ${s.bg.replace('bg-', 'bg-').replace('-500', '-100').replace('-400', '-100')} flex items-center justify-center`}>
                      <div className={`w-2 h-2 rounded-full ${s.bg}`} />
                    </div>
                    <span className="text-xs text-gray-600">{s.label}</span>
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
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Your Privacy</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Your photos are analyzed locally and never stored on our servers. We prioritize your privacy and data security.</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-green-600 font-semibold">
                <ShieldCheck size={14} className="text-green-500" /> End-to-end encrypted
              </div>
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

  const startAnalysis = () => {
    setPhase('analyzing')
    setTimeout(() => setPhase('results'), 2500)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 to-white border-b border-purple-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
          <p className="text-xs text-gray-400 mb-3">
            <Link to="/" className="hover:text-pink-500">Home</Link> › <span>AI Beauty Analyzer</span>
          </p>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <Zap size={13} /> Powered by Rejuveefy AI
              </div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
                AI Skin<br /><em className="text-pink-500 not-italic">Analysis</em>
              </h1>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                Upload a selfie and our AI will analyze your skin type, identify concerns, and recommend personalized skincare products.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: <Droplets size={15} className="text-purple-500" />, label: 'Hydration Check' },
                  { icon: <Sun size={15} className="text-yellow-500" />, label: 'UV Damage' },
                  { icon: <Wind size={15} className="text-blue-500" />, label: 'Texture Analysis' },
                ].map(f => (
                  <div key={f.label} className="flex items-center gap-1.5 text-xs text-gray-600">
                    {f.icon} {f.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative w-56">
                <div className="bg-gray-900 rounded-[2rem] p-3 shadow-2xl">
                  <div className="bg-white rounded-[1.5rem] overflow-hidden">
                    <div className="bg-purple-500 p-3">
                      <p className="text-white text-xs font-bold mb-2">Skin Analysis</p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {skinScores.slice(0, 3).map(s => (
                          <div key={s.label} className="bg-white/20 rounded-lg p-1.5 text-center">
                            <p className="text-white font-bold text-sm">{s.value}%</p>
                            <p className="text-white/70 text-[8px]">{s.label.split(' ')[0]}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="w-full h-24 bg-purple-50 rounded-xl mb-2 flex items-center justify-center">
                        <span className="text-3xl">🧖‍♀️</span>
                      </div>
                      {skinScores.slice(0, 3).map(s => (
                        <div key={s.label} className="flex items-center gap-1.5 mb-1">
                          <div className="h-1 flex-1 bg-gray-100 rounded-full">
                            <div className={`h-full ${s.bg} rounded-full`} style={{ width: `${s.value}%` }} />
                          </div>
                          <span className="text-[8px] text-gray-400 w-6">{s.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab nav */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <div className="flex gap-1">
            <Link to="/ai-beauty/hair" className="px-5 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-800">
              Hair Analysis
            </Link>
            <Link to="/ai-beauty/skin" className="px-5 py-3 text-sm font-semibold border-b-2 border-pink-500 text-pink-500">
              Skin Analysis
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div>
            {phase === 'landing' && (
              <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-8">
                <h2 className="text-base font-semibold text-gray-900 mb-2">Upload Your Selfie</h2>
                <p className="text-sm text-gray-500 mb-6">Take a clear, well-lit selfie for the most accurate skin analysis.</p>

                <div className="border-2 border-dashed border-pink-200 rounded-2xl p-10 text-center cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-all group">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 transition-colors">
                    <Camera size={24} className="text-pink-500" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">Drop your selfie here</p>
                  <p className="text-xs text-gray-400 mb-4">or click to browse</p>
                  <div className="flex justify-center gap-3">
                    <button onClick={startAnalysis} className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-pink-600 transition-colors">
                      <Upload size={15} /> Upload Selfie
                    </button>
                    <button onClick={startAnalysis} className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-semibold hover:border-pink-300 transition-colors">
                      <Camera size={15} /> Take Selfie
                    </button>
                  </div>
                </div>
              </div>
            )}

            {phase === 'analyzing' && (
              <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 relative">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                    <Sparkles size={32} className="text-purple-500 animate-pulse" />
                  </div>
                  <div className="absolute inset-0 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
                </div>
                <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Analyzing Your Skin...</h2>
                <p className="text-sm text-gray-500 mb-6">Our AI is detecting hydration, texture, UV damage and more.</p>
              </div>
            )}

            {phase === 'results' && (
              <AnalysisResults type="skin" scores={skinScores} recommendations={skinRecommendations} onReset={() => setPhase('landing')} />
            )}
          </div>

          <aside className="space-y-4">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">What We Analyze</h3>
              {skinScores.map(s => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center bg-gray-100`}>
                      <div className={`w-2 h-2 rounded-full ${s.bg}`} />
                    </div>
                    <span className="text-xs text-gray-600">{s.label}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400">Measured</span>
                </div>
              ))}
            </div>

            <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Also Try Hair Analysis</h3>
              <p className="text-xs text-gray-500 mb-3">Complete your beauty health check with hair analysis.</p>
              <Link to="/ai-beauty/hair" className="block w-full bg-pink-500 text-white text-xs font-bold py-2.5 rounded-full text-center hover:bg-pink-600 transition-colors">
                Analyse My Hair →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
