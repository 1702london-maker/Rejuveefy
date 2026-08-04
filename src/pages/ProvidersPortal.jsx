import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Image,
  Lock,
  Mail,
  MapPin,
  Plus,
  Settings,
  ShieldCheck,
  User,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { fetchProviderApplication, fetchProviderBookings, fetchProviderByUser, submitProviderApplication, updateBookingStatus, updateProviderAvailability, updateProviderProfile, updateProviderServices } from '../lib/db'

const tabs = ['Overview', 'Bookings', 'Services', 'Calendar', 'Payouts', 'Profile']
const weekDays = [
  { key: 'monday', label: 'Mon' },
  { key: 'tuesday', label: 'Tue' },
  { key: 'wednesday', label: 'Wed' },
  { key: 'thursday', label: 'Thu' },
  { key: 'friday', label: 'Fri' },
  { key: 'saturday', label: 'Sat' },
  { key: 'sunday', label: 'Sun' },
]

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

function statusClass(status = 'pending') {
  const styles = {
    pending: 'bg-amber-50 text-amber-700 border-amber-100',
    confirmed: 'bg-green-50 text-green-700 border-green-100',
    completed: 'bg-blue-50 text-blue-700 border-blue-100',
    cancelled: 'bg-gray-50 text-gray-600 border-gray-100',
  }
  return styles[status] || styles.pending
}

function BookingRequestCard({ booking, onStatus, busy }) {
  const bookingDate = booking.booking_date ? new Date(booking.booking_date) : null
  const createdDate = booking.created_at ? new Date(booking.created_at) : null
  const price = booking.service_price ?? booking.total_price ?? booking.price
  const status = booking.status || 'pending'

  return (
    <div className="border border-gray-100 rounded-2xl p-5 bg-white">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div>
          <h3 className="font-display text-lg font-bold text-gray-900">{booking.service_name || booking.service || 'Booking request'}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {bookingDate ? bookingDate.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : 'Date to be confirmed'}
            {booking.booking_time ? ` at ${booking.booking_time}` : ''}
          </p>
        </div>
        <span className={`w-fit rounded-full border px-3 py-1 text-xs font-bold capitalize ${statusClass(status)}`}>
          {status}
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-sm">
        <div className="rounded-xl bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">
            <User size={13} /> Client
          </div>
          <p className="font-semibold text-gray-900">{booking.client_name || booking.customer_name || 'Client details pending'}</p>
        </div>
        <div className="rounded-xl bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">
            <MapPin size={13} /> Location
          </div>
          <p className="font-semibold text-gray-900">{booking.location || booking.address || 'To be confirmed'}</p>
        </div>
        <div className="rounded-xl bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">
            <Clock size={13} /> Request
          </div>
          <p className="font-semibold text-gray-900">{createdDate ? createdDate.toLocaleDateString('en-GB') : 'Recently submitted'}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-gray-500">{booking.notes || booking.message || 'No extra notes added.'}</p>
        {price ? <p className="text-sm font-bold text-gray-900">From £{price}</p> : null}
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
        {status !== 'confirmed' && status !== 'completed' && status !== 'cancelled' && (
          <button type="button" onClick={() => onStatus(booking.id, 'confirmed')} disabled={busy}
            className="rounded-full bg-green-600 px-4 py-2 text-xs font-bold text-white hover:bg-green-700 disabled:opacity-50">
            Confirm
          </button>
        )}
        {status === 'confirmed' && (
          <button type="button" onClick={() => onStatus(booking.id, 'completed')} disabled={busy}
            className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-50">
            Mark Completed
          </button>
        )}
        {status !== 'completed' && status !== 'cancelled' && (
          <button type="button" onClick={() => onStatus(booking.id, 'cancelled')} disabled={busy}
            className="rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-100 disabled:opacity-50">
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}

function blankService(index = 0) {
  return {
    id: `service-${Date.now()}-${index}`,
    name: '',
    desc: '',
    duration: '',
    price: '',
  }
}

export default function ProvidersPortal() {
  const { user, userDisplay } = useApp()
  const [application, setApplication] = useState(null)
  const [provider, setProvider] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loadingApplication, setLoadingApplication] = useState(false)
  const [loadingBookings, setLoadingBookings] = useState(false)
  const [bookingBusy, setBookingBusy] = useState('')
  const [bookingError, setBookingError] = useState('')
  const [serviceRows, setServiceRows] = useState([blankService()])
  const [savingServices, setSavingServices] = useState(false)
  const [serviceMessage, setServiceMessage] = useState('')
  const [serviceError, setServiceError] = useState('')
  const [profileForm, setProfileForm] = useState({
    name: '',
    speciality: '',
    location: '',
    bio: '',
    image_url: '',
  })
  const [savingProfile, setSavingProfile] = useState(false)
  const [profileMessage, setProfileMessage] = useState('')
  const [profileError, setProfileError] = useState('')
  const [availabilityForm, setAvailabilityForm] = useState({
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    start: '09:00',
    end: '17:00',
    notice: '24',
  })
  const [savingAvailability, setSavingAvailability] = useState(false)
  const [availabilityMessage, setAvailabilityMessage] = useState('')
  const [availabilityError, setAvailabilityError] = useState('')
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
        setBookings([])
        return null
      })
      .catch(() => {
        setApplication(null)
        setProvider(null)
        setBookings([])
      })
      .finally(() => setLoadingApplication(false))
  }, [user?.id, user?.email])

  useEffect(() => {
    if (!provider?.id) {
      setBookings([])
      return
    }

    setLoadingBookings(true)
    fetchProviderBookings(provider.id)
      .then(setBookings)
      .catch(() => setBookings([]))
      .finally(() => setLoadingBookings(false))
  }, [provider?.id])

  useEffect(() => {
    if (!provider?.id) {
      setServiceRows([blankService()])
      setProfileForm({
        name: '',
        speciality: '',
        location: '',
        bio: '',
        image_url: '',
      })
      setAvailabilityForm({
        days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        start: '09:00',
        end: '17:00',
        notice: '24',
      })
      return
    }

    const existing = Array.isArray(provider.services) ? provider.services : []
    const availability = provider.availability || {}
    setServiceRows(existing.length
      ? existing.map((service, index) => ({
        id: service.id || `service-${index + 1}`,
        name: service.name || '',
        desc: service.desc || service.description || '',
        duration: service.duration || '',
        price: service.price ?? '',
      }))
      : [blankService()])
    setProfileForm({
      name: provider.name || '',
      speciality: provider.speciality || '',
      location: provider.location || '',
      bio: provider.bio || '',
      image_url: provider.image_url || '',
    })
    setAvailabilityForm({
      days: Array.isArray(availability.days) && availability.days.length ? availability.days : ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      start: availability.start || '09:00',
      end: availability.end || '17:00',
      notice: String(availability.notice || '24'),
    })
    setServiceMessage('')
    setServiceError('')
    setProfileMessage('')
    setProfileError('')
    setAvailabilityMessage('')
    setAvailabilityError('')
  }, [provider?.id, provider?.services, provider?.availability])

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))
  const updateProfile = (key, value) => setProfileForm(prev => ({ ...prev, [key]: value }))
  const updateAvailability = (key, value) => setAvailabilityForm(prev => ({ ...prev, [key]: value }))
  const toggleAvailabilityDay = (day) => {
    setAvailabilityForm(prev => ({
      ...prev,
      days: prev.days.includes(day) ? prev.days.filter(item => item !== day) : [...prev.days, day],
    }))
  }

  const updateBooking = async (id, status) => {
    setBookingError('')
    setBookingBusy(id)
    try {
      const updated = await updateBookingStatus(id, status)
      setBookings(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item))
    } catch {
      setBookingError('We could not update this booking. Admin can still manage it from the review dashboard.')
    } finally {
      setBookingBusy('')
    }
  }

  const updateServiceRow = (index, key, value) => {
    setServiceRows(prev => prev.map((service, itemIndex) => (
      itemIndex === index ? { ...service, [key]: value } : service
    )))
  }

  const addServiceRow = () => {
    setServiceRows(prev => [...prev, blankService(prev.length)])
  }

  const removeServiceRow = (index) => {
    setServiceRows(prev => {
      const next = prev.filter((_, itemIndex) => itemIndex !== index)
      return next.length ? next : [blankService()]
    })
  }

  const saveServices = async (e) => {
    e.preventDefault()
    if (!provider?.id) return

    setServiceMessage('')
    setServiceError('')

    const services = serviceRows
      .map((service, index) => ({
        id: service.id || `service-${index + 1}`,
        name: service.name.trim(),
        desc: service.desc.trim(),
        duration: service.duration.trim(),
        price: service.price === '' ? 0 : Number(service.price),
      }))
      .filter(service => service.name)

    if (!services.length) {
      setServiceError('Add at least one service name before saving.')
      return
    }

    setSavingServices(true)
    try {
      const updated = await updateProviderServices(provider.id, services)
      setProvider(updated)
      setServiceMessage('Services saved. Your public profile has been updated.')
    } catch {
      setServiceError('We could not save services. Admin can still update the provider profile while access is reviewed.')
    } finally {
      setSavingServices(false)
    }
  }

  const saveProfile = async (e) => {
    e.preventDefault()
    if (!provider?.id) return

    setProfileMessage('')
    setProfileError('')

    const profile = {
      name: profileForm.name.trim(),
      speciality: profileForm.speciality.trim(),
      location: profileForm.location.trim(),
      bio: profileForm.bio.trim(),
      image_url: profileForm.image_url.trim(),
    }

    if (!profile.name || !profile.speciality || !profile.location) {
      setProfileError('Name, speciality and location are required before saving.')
      return
    }

    setSavingProfile(true)
    try {
      const updated = await updateProviderProfile(provider.id, profile)
      setProvider(updated)
      setProfileMessage('Profile saved. Your public provider page has been updated.')
    } catch {
      setProfileError('We could not save profile details. Admin can still update the profile while access is reviewed.')
    } finally {
      setSavingProfile(false)
    }
  }

  const saveAvailability = async (e) => {
    e.preventDefault()
    if (!provider?.id) return

    setAvailabilityMessage('')
    setAvailabilityError('')

    if (!availabilityForm.days.length) {
      setAvailabilityError('Choose at least one working day.')
      return
    }

    if (availabilityForm.start >= availabilityForm.end) {
      setAvailabilityError('Start time must be before end time.')
      return
    }

    setSavingAvailability(true)
    try {
      const updated = await updateProviderAvailability(provider.id, {
        days: availabilityForm.days,
        start: availabilityForm.start,
        end: availabilityForm.end,
        notice: Number(availabilityForm.notice) || 24,
      })
      setProvider(updated)
      setAvailabilityMessage('Availability saved. Clients will see these booking hours.')
    } catch {
      setAvailabilityError('We could not save availability. If this keeps happening, the providers table needs an availability column.')
    } finally {
      setSavingAvailability(false)
    }
  }

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
            body={application?.status === 'approved' ? `${bookings.length} booking request${bookings.length === 1 ? '' : 's'} connected to your profile.` : 'Client appointments will appear here once your provider profile is approved and taking bookings.'}
            action={<span className="inline-flex items-center gap-2 text-gray-400 text-sm font-semibold"><Clock size={15} /> {loadingBookings ? 'Checking bookings' : application?.status === 'approved' ? 'Live booking queue' : 'Waiting for approval'}</span>}
          />
          <EmptyPanel
            icon={Settings}
            title="Services"
            body={application?.status === 'approved' ? `${serviceRows.filter(service => service.name.trim()).length} service${serviceRows.filter(service => service.name.trim()).length === 1 ? '' : 's'} ready for your public profile.` : 'Service management opens after approval so your public profile stays accurate.'}
            action={<span className="inline-flex items-center gap-2 text-gray-400 text-sm font-semibold"><Plus size={15} /> {application?.status === 'approved' ? 'Editable below' : 'Add service after approval'}</span>}
          />
        </div>

        <form onSubmit={saveServices} className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="font-semibold text-gray-900">Services</h2>
              <p className="text-sm text-gray-500">These services appear on your public provider profile and booking page.</p>
            </div>
            {provider && (
              <button type="submit" disabled={savingServices}
                className="rounded-full bg-pink-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-pink-600 disabled:opacity-60">
                {savingServices ? 'Saving...' : 'Save Services'}
              </button>
            )}
          </div>

          <div className="p-6">
            {application?.status !== 'approved' || !provider ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center mx-auto mb-3">
                  <Settings size={20} />
                </div>
                <p className="text-sm font-semibold text-gray-900">Service editing unlocks after approval</p>
                <p className="text-sm text-gray-500 mt-1">Your submitted services will be reviewed before your public profile goes live.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {serviceMessage && (
                  <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                    {serviceMessage}
                  </div>
                )}
                {serviceError && (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {serviceError}
                  </div>
                )}
                {serviceRows.map((service, index) => (
                  <div key={service.id} className="rounded-2xl border border-gray-100 p-4">
                    <div className="grid md:grid-cols-12 gap-3">
                      <input value={service.name} onChange={e => updateServiceRow(index, 'name', e.target.value)}
                        placeholder="Service name"
                        className="md:col-span-3 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100" />
                      <input value={service.desc} onChange={e => updateServiceRow(index, 'desc', e.target.value)}
                        placeholder="Short description"
                        className="md:col-span-4 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100" />
                      <input value={service.duration} onChange={e => updateServiceRow(index, 'duration', e.target.value)}
                        placeholder="Duration"
                        className="md:col-span-2 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100" />
                      <input type="number" min="0" step="1" value={service.price} onChange={e => updateServiceRow(index, 'price', e.target.value)}
                        placeholder="Price"
                        className="md:col-span-2 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100" />
                      <button type="button" onClick={() => removeServiceRow(index)}
                        className="md:col-span-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-50">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addServiceRow}
                  className="w-fit inline-flex items-center gap-2 rounded-full border border-pink-200 px-5 py-2.5 text-sm font-bold text-pink-600 hover:bg-pink-50">
                  <Plus size={15} /> Add Service
                </button>
              </div>
            )}
          </div>
        </form>

        <form onSubmit={saveProfile} className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="font-semibold text-gray-900">Public profile</h2>
              <p className="text-sm text-gray-500">These details appear on your provider listing and profile page.</p>
            </div>
            {provider && (
              <button type="submit" disabled={savingProfile}
                className="rounded-full bg-pink-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-pink-600 disabled:opacity-60">
                {savingProfile ? 'Saving...' : 'Save Profile'}
              </button>
            )}
          </div>

          <div className="p-6">
            {application?.status !== 'approved' || !provider ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center mx-auto mb-3">
                  <User size={20} />
                </div>
                <p className="text-sm font-semibold text-gray-900">Profile editing unlocks after approval</p>
                <p className="text-sm text-gray-500 mt-1">Approved profiles can be completed from this portal.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {profileMessage && (
                  <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                    {profileMessage}
                  </div>
                )}
                {profileError && (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {profileError}
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Display Name *</label>
                    <input value={profileForm.name} onChange={e => updateProfile('name', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Speciality *</label>
                    <input value={profileForm.speciality} onChange={e => updateProfile('speciality', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Location *</label>
                    <input value={profileForm.location} onChange={e => updateProfile('location', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Profile Image URL</label>
                    <div className="flex items-center gap-2">
                      <Image size={18} className="text-gray-400 shrink-0" />
                      <input value={profileForm.image_url} onChange={e => updateProfile('image_url', e.target.value)}
                        placeholder="https://..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Bio</label>
                    <textarea rows={4} value={profileForm.bio} onChange={e => updateProfile('bio', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 resize-none" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>

        <form onSubmit={saveAvailability} className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="font-semibold text-gray-900">Calendar availability</h2>
              <p className="text-sm text-gray-500">Set the regular days and hours clients should request bookings within.</p>
            </div>
            {provider && (
              <button type="submit" disabled={savingAvailability}
                className="rounded-full bg-pink-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-pink-600 disabled:opacity-60">
                {savingAvailability ? 'Saving...' : 'Save Availability'}
              </button>
            )}
          </div>

          <div className="p-6">
            {application?.status !== 'approved' || !provider ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center mx-auto mb-3">
                  <Calendar size={20} />
                </div>
                <p className="text-sm font-semibold text-gray-900">Calendar unlocks after approval</p>
                <p className="text-sm text-gray-500 mt-1">Approved providers can set booking days and hours here.</p>
              </div>
            ) : (
              <div className="grid gap-5">
                {availabilityMessage && (
                  <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                    {availabilityMessage}
                  </div>
                )}
                {availabilityError && (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {availabilityError}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Working Days</label>
                  <div className="flex flex-wrap gap-2">
                    {weekDays.map(day => {
                      const active = availabilityForm.days.includes(day.key)
                      return (
                        <button key={day.key} type="button" onClick={() => toggleAvailabilityDay(day.key)}
                          className={`rounded-full border px-4 py-2 text-sm font-bold ${active ? 'border-pink-500 bg-pink-50 text-pink-600' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                          {day.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Start Time</label>
                    <input type="time" value={availabilityForm.start} onChange={e => updateAvailability('start', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">End Time</label>
                    <input type="time" value={availabilityForm.end} onChange={e => updateAvailability('end', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Minimum Notice</label>
                    <select value={availabilityForm.notice} onChange={e => updateAvailability('notice', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100">
                      <option value="12">12 hours</option>
                      <option value="24">24 hours</option>
                      <option value="48">48 hours</option>
                      <option value="72">72 hours</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>

        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="font-semibold text-gray-900">Booking requests</h2>
              <p className="text-sm text-gray-500">Requests created from your public provider profile.</p>
            </div>
            {provider && (
              <Link to={`/providers/${provider.slug}`} className="text-sm font-semibold text-pink-600 hover:text-pink-700">
                View profile
              </Link>
            )}
          </div>
          <div className="p-6">
            {bookingError && (
              <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {bookingError}
              </div>
            )}
            {loadingBookings ? (
              <p className="text-sm text-gray-500">Checking booking requests...</p>
            ) : bookings.length ? (
              <div className="grid gap-4">
                {bookings.map(booking => (
                  <BookingRequestCard
                    key={booking.id}
                    booking={booking}
                    onStatus={updateBooking}
                    busy={bookingBusy === booking.id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center mx-auto mb-3">
                  <Calendar size={20} />
                </div>
                <p className="text-sm font-semibold text-gray-900">No booking requests yet</p>
                <p className="text-sm text-gray-500 mt-1">
                  {application?.status === 'approved'
                    ? 'New client booking requests will appear here once your profile receives appointments.'
                    : 'Booking requests unlock after the provider application is approved.'}
                </p>
              </div>
            )}
          </div>
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
