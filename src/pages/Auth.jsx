import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ShieldCheck, ArrowLeft, CheckCircle, Mail, Lock, User, Phone } from 'lucide-react'

function AuthLayout({ children, image }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: image */}
      <div className="hidden lg:block relative overflow-hidden bg-pink-50">
        <img src={image || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1200&fit=crop'} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/80 to-pink-900/60 flex flex-col items-center justify-center p-12">
          <Link to="/" className="text-white font-display text-3xl font-bold mb-8">Rejuveefy</Link>
          <div className="space-y-4 w-full max-w-xs">
            {[
              { icon: '✨', text: 'Discover 500+ verified beauty professionals' },
              { icon: '🛍️', text: 'Shop 100% authentic beauty products' },
              { icon: '🤖', text: 'Get personalized AI beauty analysis' },
              { icon: '📅', text: 'Book in minutes, cancel anytime' },
            ].map(f => (
              <div key={f.text} className="flex items-center gap-3 text-white">
                <span className="text-xl">{f.icon}</span>
                <span className="text-sm">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center py-12 px-6 bg-white">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    navigate('/')
  }

  return (
    <AuthLayout image="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=1200&fit=crop">
      <div>
        <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-pink-500 transition-colors mb-8">
          <ArrowLeft size={15} /> Back to Home
        </Link>

        {/* Logo (mobile) */}
        <div className="lg:hidden text-center mb-6">
          <span className="font-display text-2xl font-bold text-pink-500">Rejuveefy</span>
        </div>

        <h1 className="font-display text-2xl font-bold text-gray-900 mb-1.5">Welcome back!</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to your account to continue your beauty journey.</p>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-3 py-2.5 rounded-xl">{error}</div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Email Address</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" value={form.email} onChange={e => upd('email', e.target.value)} required placeholder="jessica@example.com"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-3 py-3 text-sm outline-none focus:border-pink-400 transition-colors" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-600">Password</label>
              <Link to="/forgot-password" className="text-xs text-pink-500 hover:underline">Forgot password?</Link>
            </div>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => upd('password', e.target.value)} required placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-11 py-3 text-sm outline-none focus:border-pink-400 transition-colors" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-pink-500 rounded" />
            <span className="text-xs text-gray-600">Keep me signed in</span>
          </label>

          <button type="submit" disabled={loading}
            className="w-full bg-pink-500 text-white py-3.5 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing In...
              </>
            ) : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
          <div className="relative flex justify-center"><span className="bg-white px-4 text-xs text-gray-400">or continue with</span></div>
        </div>

        {/* Social */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { label: 'Google', icon: '🇬' },
            { label: 'Apple', icon: '🍎' },
            { label: 'Facebook', icon: '📘' },
          ].map(s => (
            <button key={s.label} className="flex items-center justify-center gap-1.5 border border-gray-200 rounded-xl py-2.5 text-xs font-semibold text-gray-600 hover:border-pink-300 hover:text-pink-500 transition-colors">
              <span>{s.icon}</span> {s.label}
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-pink-500 font-semibold hover:underline">Create one free</Link>
        </p>

        <p className="text-center text-[10px] text-gray-400 mt-4 flex items-center justify-center gap-1">
          <ShieldCheck size={11} className="text-pink-400" /> Secured by SSL encryption
        </p>
      </div>
    </AuthLayout>
  )
}

// ── REGISTER ──────────────────────────────────────────────────────────────────
export function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const pwStrength = !form.password ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    navigate('/')
  }

  return (
    <AuthLayout image="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&h=1200&fit=crop">
      <div>
        <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-pink-500 transition-colors mb-6">
          <ArrowLeft size={15} /> Back to Home
        </Link>

        <div className="lg:hidden text-center mb-6">
          <span className="font-display text-2xl font-bold text-pink-500">Rejuveefy</span>
        </div>

        <h1 className="font-display text-2xl font-bold text-gray-900 mb-1.5">Create Your Account</h1>
        <p className="text-sm text-gray-500 mb-6">Join 10,000+ beauty lovers on Rejuveefy. It's free!</p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Full Name</label>
            <div className="relative">
              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={form.name} onChange={e => upd('name', e.target.value)} required placeholder="Jessica Williams"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-3 py-3 text-sm outline-none focus:border-pink-400 transition-colors" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Email Address</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" value={form.email} onChange={e => upd('email', e.target.value)} required placeholder="jessica@example.com"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-3 py-3 text-sm outline-none focus:border-pink-400 transition-colors" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Phone Number</label>
            <div className="relative">
              <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="tel" value={form.phone} onChange={e => upd('phone', e.target.value)} placeholder="+44 7700 900000"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-3 py-3 text-sm outline-none focus:border-pink-400 transition-colors" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => upd('password', e.target.value)} required placeholder="Create a strong password"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-11 py-3 text-sm outline-none focus:border-pink-400 transition-colors" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {form.password && (
              <div className="mt-2 flex gap-1">
                {[1,2,3].map(n => (
                  <div key={n} className={`flex-1 h-1 rounded-full transition-colors ${n <= pwStrength ? pwStrength === 1 ? 'bg-red-400' : pwStrength === 2 ? 'bg-amber-400' : 'bg-green-500' : 'bg-gray-100'}`} />
                ))}
                <span className="text-[10px] text-gray-400 ml-2">{pwStrength === 1 ? 'Weak' : pwStrength === 2 ? 'Medium' : 'Strong'}</span>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Confirm Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="password" value={form.confirm} onChange={e => upd('confirm', e.target.value)} required placeholder="Repeat your password"
                className={`w-full border rounded-xl pl-10 pr-3 py-3 text-sm outline-none focus:border-pink-400 transition-colors
                  ${form.confirm && form.password !== form.confirm ? 'border-red-300' : form.confirm && form.password === form.confirm ? 'border-green-400' : 'border-gray-200'}`} />
              {form.confirm && form.password === form.confirm && (
                <CheckCircle size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-500" />
              )}
            </div>
            {form.confirm && form.password !== form.confirm && (
              <p className="text-[10px] text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>

          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="w-4 h-4 accent-pink-500 rounded mt-0.5" required />
            <span className="text-xs text-gray-600 leading-relaxed">
              I agree to Rejuveefy's{' '}
              <Link to="/terms" className="text-pink-500 hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-pink-500 hover:underline">Privacy Policy</Link>
            </span>
          </label>

          <button type="submit" disabled={loading || !agreed || (form.confirm && form.password !== form.confirm)}
            className="w-full bg-pink-500 text-white py-3.5 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating Account...
              </>
            ) : 'Create My Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
          <div className="relative flex justify-center"><span className="bg-white px-4 text-xs text-gray-400">or sign up with</span></div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-5">
          {[{ label: 'Google', icon: '🇬' }, { label: 'Apple', icon: '🍎' }, { label: 'Facebook', icon: '📘' }].map(s => (
            <button key={s.label} className="flex items-center justify-center gap-1.5 border border-gray-200 rounded-xl py-2.5 text-xs font-semibold text-gray-600 hover:border-pink-300 hover:text-pink-500 transition-colors">
              <span>{s.icon}</span> {s.label}
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-500 font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </AuthLayout>
  )
}

// ── FORGOT PASSWORD ───────────────────────────────────────────────────────────
export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSent(true)
  }

  return (
    <AuthLayout image="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=1200&fit=crop">
      <div>
        <Link to="/login" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-pink-500 transition-colors mb-8">
          <ArrowLeft size={15} /> Back to Sign In
        </Link>

        {!sent ? (
          <>
            <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-5">
              <Lock size={24} className="text-pink-500" />
            </div>
            <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Forgot Your Password?</h1>
            <p className="text-sm text-gray-500 mb-6">No worries! Enter your email and we'll send you a reset link.</p>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="jessica@example.com"
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-3 py-3 text-sm outline-none focus:border-pink-400 transition-colors" />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-pink-500 text-white py-3.5 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
            <p className="text-sm text-gray-500 mb-2">We've sent a password reset link to:</p>
            <p className="text-sm font-semibold text-pink-500 mb-5">{email}</p>
            <p className="text-xs text-gray-400 mb-6">Didn't receive the email? Check your spam folder, or{' '}
              <button onClick={() => setSent(false)} className="text-pink-500 hover:underline">try again</button>.
            </p>
            <Link to="/login" className="inline-block bg-pink-500 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors">
              Back to Sign In
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  )
}
