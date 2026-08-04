import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Inbox,
  Lock,
  Mail,
  RefreshCw,
  ShieldCheck,
  Users,
  XCircle,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import {
  approveProviderApplication,
  fetchAdminReviewData,
  updateAffiliateApplicationStatus,
  updateBookingStatus,
  updateProviderApplicationStatus,
} from '../lib/db'

const tabs = [
  { id: 'providers', label: 'Providers', icon: ShieldCheck },
  { id: 'affiliates', label: 'Affiliates', icon: Users },
  { id: 'messages', label: 'Messages', icon: Mail },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
]

const statusStyles = {
  pending: 'bg-amber-50 text-amber-700 border-amber-100',
  approved: 'bg-green-50 text-green-700 border-green-100',
  rejected: 'bg-red-50 text-red-700 border-red-100',
  confirmed: 'bg-green-50 text-green-700 border-green-100',
  completed: 'bg-blue-50 text-blue-700 border-blue-100',
  cancelled: 'bg-red-50 text-red-700 border-red-100',
}

function isAdminUser(user) {
  if (!user) return false
  const emails = (import.meta.env.VITE_ADMIN_EMAILS || '')
    .split(',')
    .map(email => email.trim().toLowerCase())
    .filter(Boolean)
  const role = user.user_metadata?.role || user.app_metadata?.role
  return role === 'admin' || user.user_metadata?.is_admin === true || emails.includes(user.email?.toLowerCase())
}

function StatusPill({ status = 'pending' }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${statusStyles[status] || 'bg-gray-50 text-gray-600 border-gray-100'}`}>
      {status}
    </span>
  )
}

function EmptyState({ title, body }) {
  return (
    <div className="bg-white border border-dashed border-pink-200 rounded-2xl p-10 text-center">
      <Inbox size={34} className="text-pink-300 mx-auto mb-3" />
      <h2 className="font-display text-xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-sm text-gray-500 max-w-xl mx-auto">{body}</p>
    </div>
  )
}

function Field({ label, value }) {
  if (!value && value !== 0) return null
  return (
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-sm text-gray-700 break-words">{Array.isArray(value) ? value.join(', ') : String(value)}</p>
    </div>
  )
}

function affiliateCode(item) {
  const source = item?.id || item?.email || 'partner'
  return `RJYF-${String(source).replace(/[^a-z0-9]/gi, '').slice(0, 8).toUpperCase()}`
}

function ActionButton({ type = 'approve', children, onClick, disabled }) {
  const styles = type === 'reject'
    ? 'border-red-200 text-red-600 hover:bg-red-50'
    : type === 'neutral'
      ? 'border-gray-200 text-gray-600 hover:bg-gray-50'
      : 'border-green-200 text-green-700 hover:bg-green-50'
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-2 text-xs font-bold transition-colors disabled:opacity-50 ${styles}`}
    >
      {children}
    </button>
  )
}

function ApplicationCard({ item, type, onStatus, busy }) {
  const isProvider = type === 'provider'
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
        <div>
          <p className="text-xs text-gray-400 mb-1">{item.created_at ? new Date(item.created_at).toLocaleString('en-GB') : 'No date'}</p>
          <h3 className="font-display text-xl font-bold text-gray-900">{item.full_name || item.name || item.email || 'Application'}</h3>
          <p className="text-sm text-gray-500">{item.email}</p>
        </div>
        <StatusPill status={item.status || 'pending'} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
        {isProvider ? (
          <>
            <Field label="Services" value={item.services} />
            <Field label="Location" value={item.location} />
            <Field label="Experience" value={item.experience} />
            <Field label="Bio" value={item.bio} />
          </>
        ) : (
          <>
            <Field label="Platform" value={item.platform} />
            <Field label="Audience" value={item.followers || item.audience} />
            <Field label="Niche / Plan" value={item.niche} />
            {item.status === 'approved' && <Field label="Referral Code" value={affiliateCode(item)} />}
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <ActionButton onClick={() => onStatus(item.id, 'approved')} disabled={busy}>
          <CheckCircle size={14} /> {isProvider ? 'Approve & Create Profile' : 'Approve'}
        </ActionButton>
        <ActionButton type="reject" onClick={() => onStatus(item.id, 'rejected')} disabled={busy}>
          <XCircle size={14} /> Reject
        </ActionButton>
        <ActionButton type="neutral" onClick={() => onStatus(item.id, 'pending')} disabled={busy}>
          <Clock size={14} /> Mark Pending
        </ActionButton>
        {isProvider && item.provider_slug && (
          <Link to={`/providers/${item.provider_slug}`} className="inline-flex items-center justify-center rounded-full border border-pink-200 px-3 py-2 text-xs font-bold text-pink-600 hover:bg-pink-50">
            View Profile
          </Link>
        )}
      </div>
    </div>
  )
}

function MessageCard({ item }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div>
          <p className="text-xs text-gray-400 mb-1">{item.created_at ? new Date(item.created_at).toLocaleString('en-GB') : 'No date'}</p>
          <h3 className="font-display text-xl font-bold text-gray-900">{item.subject || 'Message'}</h3>
          <p className="text-sm text-gray-500">{item.name || 'Unknown'} / {item.email || 'No email'}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{item.message || 'No message body.'}</p>
    </div>
  )
}

function BookingCard({ item, onStatus, busy }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
        <div>
          <p className="text-xs text-gray-400 mb-1">{item.created_at ? new Date(item.created_at).toLocaleString('en-GB') : 'No date'}</p>
          <h3 className="font-display text-xl font-bold text-gray-900">{item.service_name || item.service || 'Booking request'}</h3>
          <p className="text-sm text-gray-500">{item.providers?.name || item.provider_name || 'Provider to confirm'}</p>
        </div>
        <StatusPill status={item.status || 'pending'} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <Field label="Date" value={item.booking_date || item.date} />
        <Field label="Time" value={item.booking_time || item.time} />
        <Field label="Total" value={item.service_price || item.total_price || item.price} />
        <Field label="Notes" value={item.notes} />
      </div>
      <div className="flex flex-wrap gap-2">
        <ActionButton onClick={() => onStatus(item.id, 'confirmed')} disabled={busy}>
          <CheckCircle size={14} /> Confirm
        </ActionButton>
        <ActionButton type="neutral" onClick={() => onStatus(item.id, 'completed')} disabled={busy}>
          <CheckCircle size={14} /> Complete
        </ActionButton>
        <ActionButton type="reject" onClick={() => onStatus(item.id, 'cancelled')} disabled={busy}>
          <XCircle size={14} /> Cancel
        </ActionButton>
      </div>
    </div>
  )
}

export default function Admin() {
  const { user, userDisplay, authLoading } = useApp()
  const [active, setActive] = useState('providers')
  const [data, setData] = useState({
    providerApplications: [],
    affiliateApplications: [],
    contactMessages: [],
    bookings: [],
  })
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const allowed = useMemo(() => isAdminUser(user), [user])

  const load = async () => {
    setError('')
    setLoading(true)
    try {
      setData(await fetchAdminReviewData())
    } catch (err) {
      setError(err.message || 'Could not load review data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (allowed) load()
    else setLoading(false)
  }, [allowed])

  const counts = {
    providers: data.providerApplications.length,
    affiliates: data.affiliateApplications.length,
    messages: data.contactMessages.length,
    bookings: data.bookings.length,
  }

  const updateProvider = async (id, status) => {
    setBusy(true)
    setError('')
    try {
      const result = status === 'approved'
        ? await approveProviderApplication(id)
        : { application: await updateProviderApplicationStatus(id, status), provider: null }
      const updated = result.application
      const providerSlug = result.provider?.slug
      setData(prev => ({
        ...prev,
        providerApplications: prev.providerApplications.map(item => item.id === id ? { ...updated, provider_slug: providerSlug || item.provider_slug } : item),
      }))
    } catch (err) {
      setError(err.message || 'Could not approve provider application.')
    } finally {
      setBusy(false)
    }
  }

  const updateAffiliate = async (id, status) => {
    setBusy(true)
    setError('')
    try {
      const updated = await updateAffiliateApplicationStatus(id, status)
      setData(prev => ({
        ...prev,
        affiliateApplications: prev.affiliateApplications.map(item => item.id === id ? updated : item),
      }))
    } catch (err) {
      setError(err.message || 'Could not update affiliate application.')
    } finally {
      setBusy(false)
    }
  }

  const updateBooking = async (id, status) => {
    setBusy(true)
    setError('')
    try {
      const updated = await updateBookingStatus(id, status)
      setData(prev => ({
        ...prev,
        bookings: prev.bookings.map(item => item.id === id ? { ...item, ...updated } : item),
      }))
    } catch (err) {
      setError(err.message || 'Could not update booking.')
    } finally {
      setBusy(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-9 h-9 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-card">
          <Lock size={28} className="text-pink-500 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Admin Review</h1>
          <p className="text-sm text-gray-500 mb-6">Sign in with an admin account to review applications and messages.</p>
          <Link to="/login" className="inline-flex justify-center bg-pink-500 text-white rounded-full px-6 py-3 text-sm font-semibold hover:bg-pink-600">
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  if (!allowed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-card">
          <AlertCircle size={30} className="text-amber-500 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Admin Access Required</h1>
          <p className="text-sm text-gray-500 mb-6">{userDisplay?.email} is signed in, but this account is not marked as an admin.</p>
          <Link to="/dashboard" className="inline-flex justify-center border border-pink-200 text-pink-600 rounded-full px-6 py-3 text-sm font-semibold hover:bg-pink-50">
            Back to Account
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-7">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <p className="text-xs text-gray-400 mb-2">
                <Link to="/" className="hover:text-pink-500">Home</Link>
                <span className="mx-1.5">/</span>
                <span>Admin</span>
              </p>
              <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">Admin Review</h1>
              <p className="text-sm text-gray-500">Review applications, messages and booking requests from one place.</p>
            </div>
            <button
              type="button"
              onClick={load}
              className="inline-flex items-center justify-center gap-2 bg-pink-500 text-white rounded-full px-5 py-3 text-sm font-bold hover:bg-pink-600"
            >
              <RefreshCw size={15} /> Refresh
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 rounded-2xl p-4 text-sm mb-5 flex items-start gap-2">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto pb-3 mb-5">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold whitespace-nowrap transition-colors ${
                active === id ? 'bg-pink-500 border-pink-500 text-white' : 'bg-white border-gray-100 text-gray-600 hover:border-pink-200 hover:text-pink-500'
              }`}
            >
              <Icon size={15} /> {label}
              <span className={active === id ? 'text-pink-100' : 'text-gray-400'}>{counts[id]}</span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {active === 'providers' && (
            data.providerApplications.length
              ? data.providerApplications.map(item => <ApplicationCard key={item.id} item={item} type="provider" onStatus={updateProvider} busy={busy} />)
              : <EmptyState title="No provider applications yet" body="Provider applications will appear here after applicants submit the provider portal form." />
          )}

          {active === 'affiliates' && (
            data.affiliateApplications.length
              ? data.affiliateApplications.map(item => <ApplicationCard key={item.id} item={item} type="affiliate" onStatus={updateAffiliate} busy={busy} />)
              : <EmptyState title="No affiliate applications yet" body="Affiliate applications will appear here after applicants submit the affiliate form." />
          )}

          {active === 'messages' && (
            data.contactMessages.length
              ? data.contactMessages.map(item => <MessageCard key={item.id} item={item} />)
              : <EmptyState title="No contact messages yet" body="Contact form messages will appear here when visitors submit an enquiry." />
          )}

          {active === 'bookings' && (
            data.bookings.length
              ? data.bookings.map(item => <BookingCard key={item.id} item={item} onStatus={updateBooking} busy={busy} />)
              : <EmptyState title="No booking requests yet" body="Client booking requests will appear here after bookings are created." />
          )}
        </div>
      </div>
    </div>
  )
}
