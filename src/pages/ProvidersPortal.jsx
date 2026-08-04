import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Lock,
  Mail,
  Plus,
  Settings,
  ShieldCheck,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { fetchProviderApplication, fetchProviderByUser, submitProviderApplication } from '../lib/db'

const tabs = ['Overview', 'Bookings', 'Services', 'Calendar', 'Payouts', 'Profile']

function EmptyPanel({ icon: Icon, title, body, action }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">
      <div className="w-11 h-11 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center mb-4">
        <Icon size={20} />
      </div>
      <h2 className="font-display text-xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-5 max-w-2xl">{body}</p>
      {action}
    </div>
  )
}

export default function ProvidersPortal() {
  const { user, userDisplay } = useApp()
  const [application, setApplication] = useState(null)
  const [provider, setProvider] = useState(null)
  const [loadingApplication, setLoadingApplication] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    services: '',
    location: '',
    experience: '',
    bio: '',
  })

  useEffect(() => {
    if (!user?.email) return
    setLoadingApplication(true)
    fetchProviderApplication({ userId: user.id, email: user.email })
      .then(app => {
        setApplication(app)
        if (app?.status === 'approved') {
          return fetchProviderByUser(user.id).then(setProvider).catch(() => setProvider(null))
        }
        setProvider(null)
        return null
      })
      .catch(() => {
        setApplication(null)
        setProvider(null)
      })
      .finally(() => setLoadingApplication(false))
  }, [user?.id, user?.email])

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const submitApplication = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const created = await submitProviderApplication({
        user_id: user.id,
        full_name: userDisplay?.name || user.email,
        email: user.email,
        services: form.services.split(',').map(item => item.trim()).filter(Boolean),
        location: form.location,
        experience: form.experience,
        bio: form.bio,
        status: 'pending',
      })
      setApplication(created)
    } catch {
      setError('We could not submit your provider application. Please check the details and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-card">
          <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center mx-auto mb-4">
            <Lock size={24} />
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Provider Portal</h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            Sign in to manage your Rejuveefy provider application, services, calendar, bookings and payouts.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/login" className="bg-pink-500 text-white rounded-full px-5 py-3 text-sm font-semibold hover:bg-pink-600 transition-colors">
              Sign In
            </Link>
            <Link to="/register?type=provider" className="border border-pink-200 text-pink-600 rounded-full px-5 py-3 text-sm font-semibold hover:bg-pink-50 transition-colors">
              Create Provider Account
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-pink-500 text-lg">Rejuveefy</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600 text-sm font-semibold">Provider Portal</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
            <ShieldCheck size={16} className="text-pink-500" />
            {userDisplay?.name || user.email}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
        <div className="flex gap-1 mb-8 bg-white border border-gray-100 rounded-xl p-1 w-fit overflow-x-auto max-w-full">
          {tabs.map(tab => (
            <button key={tab} disabled className="px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap text-gray-400 cursor-not-allowed">
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl font-bold">Provider setup</p>
            <p className="text-pink-100 text-sm mt-1">
              {application?.status === 'approved'
                ? 'Your provider access is approved. Your public profile can now be completed.'
                : application
                  ? `Your provider application is ${application.status}.`
                : 'Submit your application to begin review. Provider tools unlock after approval.'}
            </p>
          </div>
          {provider ? (
            <Link to={`/providers/${provider.slug}`} className="bg-white text-pink-600 rounded-full px-5 py-2.5 text-sm font-bold hover:bg-pink-50">
              View Public Profile
            </Link>
          ) : (
            <span className="bg-white/15 border border-white/20 text-white rounded-full px-5 py-2.5 text-sm font-bold">
              Reviewed access only
            </span>
          )}
        </div>

        {application?.status === 'approved' && (
          <div className="bg-white border border-green-100 rounded-2xl p-6 mb-8 shadow-card">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-gray-900 mb-1">Approved Provider Access</h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Your profile is active. Service editing, calendar management and payout setup will open from this portal as each tool is completed.
                </p>
                {provider && (
                  <Link to={`/providers/${provider.slug}`} className="inline-flex mt-4 bg-pink-500 text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-pink-600">
                    Open Public Profile
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {!loadingApplication && !application && (
          <form onSubmit={submitApplication} className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 shadow-card">
            <div className="flex items-start gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">
                <FileText size={20} />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-gray-900 mb-1">Submit Provider Application</h2>
                <p className="text-sm text-gray-500">Tell us what you offer. Approved providers can access services, calendar, bookings and payout tools after review.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Services *</label>
                <input required value={form.services} onChange={e => update('services', e.target.value)}
                  placeholder="Braids, wigs, makeup"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Location *</label>
                <input required value={form.location} onChange={e => update('location', e.target.value)}
                  placeholder="City or service area"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Experience</label>
                <input value={form.experience} onChange={e => update('experience', e.target.value)}
                  placeholder="Years, specialisms, qualifications or portfolio links"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">About You</label>
                <textarea rows={4} value={form.bio} onChange={e => update('bio', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 resize-none" />
              </div>
            </div>

            {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
            <button type="submit" disabled={submitting}
              className="mt-5 inline-flex items-center gap-2 bg-pink-500 text-white rounded-full px-5 py-3 text-sm font-semibold hover:bg-pink-600 transition-colors disabled:opacity-60">
              {submitting ? 'Submitting...' : 'Submit Application'} <CheckCircle size={15} />
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <EmptyPanel
            icon={FileText}
            title="Application"
            body={loadingApplication
              ? 'Checking your latest provider application...'
              : application
                ? `Latest application: ${application.status}. Submitted ${new Date(application.created_at).toLocaleDateString('en-GB')}.`
                : 'No provider application is attached to this account yet.'}
            action={application
              ? <span className="inline-flex items-center gap-2 text-pink-600 text-sm font-semibold"><CheckCircle size={15} /> Application received</span>
              : <span className="inline-flex items-center gap-2 text-gray-400 text-sm font-semibold"><Mail size={15} /> Submit the form above</span>}
          />
          <EmptyPanel
            icon={Calendar}
            title="Bookings"
            body={application?.status === 'approved' ? 'Client appointments will appear here when booking requests are made against your profile.' : 'Client appointments will appear here once your provider profile is approved and taking bookings.'}
            action={<span className="inline-flex items-center gap-2 text-gray-400 text-sm font-semibold"><Clock size={15} /> {application?.status === 'approved' ? 'No appointments yet' : 'Waiting for appointments'}</span>}
          />
          <EmptyPanel
            icon={Settings}
            title="Services"
            body={application?.status === 'approved' ? 'Initial services are created from your application. Full service editing is coming next.' : 'Service management opens after approval so your public profile stays accurate.'}
            action={<button className="inline-flex items-center gap-2 text-gray-400 text-sm font-semibold cursor-not-allowed"><Plus size={15} /> {application?.status === 'approved' ? 'Service editing coming soon' : 'Add service after approval'}</button>}
          />
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent provider activity</h2>
          </div>
          <div className="p-8 text-center">
            <p className="text-sm text-gray-500">No live provider activity yet.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
