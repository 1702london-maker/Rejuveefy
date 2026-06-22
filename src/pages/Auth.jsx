import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useApp } from '../context/AppContext'

function AuthLayout({ title, subtitle, children, alt }) {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-fixed/20 to-surface px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="font-display text-2xl font-bold text-primary mb-1">Rejuveefy</div>
          <h1 className="font-display text-2xl font-bold text-on-surface">{title}</h1>
          <p className="text-on-surface-variant text-sm mt-1">{subtitle}</p>
        </div>
        <div className="bg-surface-container-lowest rounded-3xl shadow-modal p-8 border border-outline-variant/20">
          {children}
        </div>
        <p className="text-center text-sm text-on-surface-variant mt-4">{alt}</p>
      </div>
    </div>
  )
}

function Field({ label, type = 'text', value, onChange, placeholder }) {
  const [show, setShow] = useState(false)
  const isPass = type === 'password'
  return (
    <div>
      <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide block mb-1.5">{label}</label>
      <div className="relative">
        <input type={isPass && show ? 'text' : type} value={value} onChange={onChange} placeholder={placeholder}
          className="w-full border border-outline-variant/40 rounded-xl px-4 py-3 text-sm bg-surface-container-lowest focus:outline-none focus:border-primary transition-colors" />
        {isPass && (
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary">
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
    </div>
  )
}

export function Login() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const { setUser, showToast } = useApp()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setUser({ name: 'Tsemaye', email })
    showToast('Welcome back!', 'success')
    navigate('/dashboard')
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your Rejuveefy account"
      alt={<>Don't have an account? <Link to="/register" className="text-primary font-semibold">Join free</Link></>}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="hello@example.com" />
        <Field label="Password" type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" />
        <div className="text-right"><Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link></div>
        <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-full font-semibold hover:opacity-90 active:scale-95 transition-all shadow-ambient">Sign In</button>
      </form>
      <div className="my-5 flex items-center gap-3"><div className="flex-1 h-px bg-outline-variant/30" /><span className="text-xs text-on-surface-variant">or</span><div className="flex-1 h-px bg-outline-variant/30" /></div>
      <button className="w-full border border-outline-variant/40 py-3 rounded-full text-sm font-medium text-on-surface hover:bg-surface-container transition-colors flex items-center justify-center gap-2">
        <span>🔑</span> Continue with Google
      </button>
    </AuthLayout>
  )
}

export function Register() {
  const [form, setForm] = useState({ name: '', email: '', pass: '', ref: '' })
  const { setUser, showToast } = useApp()
  const navigate = useNavigate()
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setUser({ name: form.name, email: form.email })
    showToast('Welcome to Rejuveefy! 🎉', 'success')
    navigate('/dashboard')
  }

  return (
    <AuthLayout title="Create your account" subtitle="Join thousands of beauty lovers on Rejuveefy"
      alt={<>Already have an account? <Link to="/login" className="text-primary font-semibold">Sign in</Link></>}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Full name" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Tsemaye Okoroh" />
        <Field label="Email address" type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="hello@example.com" />
        <Field label="Password" type="password" value={form.pass} onChange={e => update('pass', e.target.value)} placeholder="Min 8 characters" />
        <Field label="Referral code (optional)" value={form.ref} onChange={e => update('ref', e.target.value)} placeholder="e.g. RJFTSEMAYE" />
        <p className="text-xs text-on-surface-variant">By creating an account you agree to our <Link to="#" className="text-primary">Terms</Link> and <Link to="#" className="text-primary">Privacy Policy</Link>.</p>
        <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-full font-semibold hover:opacity-90 active:scale-95 transition-all shadow-ambient">Create Account</button>
      </form>
    </AuthLayout>
  )
}

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <AuthLayout title="Reset your password" subtitle="Enter your email and we'll send a reset link"
      alt={<Link to="/login" className="text-primary font-semibold">← Back to login</Link>}>
      {sent ? (
        <div className="text-center py-4">
          <div className="text-4xl mb-3">📬</div>
          <p className="font-semibold text-on-surface mb-1">Check your inbox</p>
          <p className="text-sm text-on-surface-variant">We've sent a password reset link to <strong>{email}</strong></p>
        </div>
      ) : (
        <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="space-y-4">
          <Field label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="hello@example.com" />
          <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-full font-semibold hover:opacity-90 transition-all shadow-ambient">Send Reset Link</button>
        </form>
      )}
    </AuthLayout>
  )
}
