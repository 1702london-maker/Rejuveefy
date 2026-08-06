import { supabase } from './supabase'

// ── FIELD NORMALISERS ─────────────────────────────────────────────────────────
// Maps DB column names → names the frontend components already use
function normaliseProvider(p) {
  if (!p) return p
  return {
    ...p,
    image: p.image_url || 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop',
    category: p.speciality || 'Beauty Professional',
    startingPrice: p.price_from || 0,
    reviews: p.review_count || 0,
    verified: true,
  }
}

function normaliseProduct(p) {
  if (!p) return p
  return {
    ...p,
    image: p.image_url || 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    originalPrice: p.compare_price || null,
    reviews: p.review_count || 0,
    brand: p.brand || 'Rejuveefy',
  }
}

// ── PROVIDERS ─────────────────────────────────────────────────────────────────
export async function fetchProviders({ featured = false, limit = 50 } = {}) {
  let q = supabase.from('providers').select('*').eq('is_active', true).order('rating', { ascending: false })
  if (featured) q = q.eq('is_featured', true)
  if (limit) q = q.limit(limit)
  const { data, error } = await q
  if (error) throw error
  return (data || []).map(normaliseProvider)
}

export async function fetchProvider(slug) {
  const { data, error } = await supabase
    .from('providers')
    .select('*, reviews(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  if (error) throw error
  return normaliseProvider(data)
}

async function updateOwnedProvider(providerId, patch) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.access_token) throw new Error('Sign in again to update your provider profile.')
  const response = await fetch('/api/provider-profile', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ providerId, patch }),
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload.error || 'Provider profile update failed.')
  return normaliseProvider(payload.provider)
}

export async function fetchProviderByUser(userId) {
  const { data, error } = await supabase
    .from('providers')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .limit(1)
  if (error) throw error
  return data?.[0] ? normaliseProvider(data[0]) : null
}

export async function updateProviderServices(providerId, services) {
  const firstService = services?.[0]
  const prices = (services || [])
    .map(service => Number(service.price))
    .filter(price => Number.isFinite(price) && price > 0)
  const priceFrom = prices.length ? Math.min(...prices) : 0

  return updateOwnedProvider(providerId, {
      services,
      speciality: firstService?.name || 'Beauty Professional',
      price_from: priceFrom,
    })
}

export async function updateProviderProfile(providerId, profile) {
  return updateOwnedProvider(providerId, {
      name: profile.name,
      speciality: profile.speciality,
      location: profile.location,
      bio: profile.bio,
      image_url: profile.image_url || null,
    })
}

export async function updateProviderAvailability(providerId, availability) {
  return updateOwnedProvider(providerId, { availability })
}

// ── PRODUCTS ──────────────────────────────────────────────────────────────────
export async function fetchProducts({ category = null, featured = false, limit = 50 } = {}) {
  let q = supabase.from('products').select('*').eq('is_active', true).order('rating', { ascending: false })
  if (category) q = q.eq('category', category)
  if (featured) q = q.eq('is_featured', true)
  if (limit) q = q.limit(limit)
  const { data, error } = await q
  if (error) throw error
  return (data || []).map(normaliseProduct)
}

export async function fetchProduct(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return normaliseProduct(data)
}

// ── BOOKINGS ──────────────────────────────────────────────────────────────────
export async function fetchUserBookings(userId) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, providers(name, image_url, slug)')
    .eq('user_id', userId)
    .order('booking_date', { ascending: false })
  if (error) throw error
  return data || []
}

export async function fetchProviderBookings(providerId) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('provider_id', providerId)
    .order('booking_date', { ascending: false })
  if (error) throw error
  return data || []
}

export async function createBooking(booking) {
  const { data, error } = await supabase.from('bookings').insert(booking).select().single()
  if (error) throw error
  return data
}

// ── ORDERS ────────────────────────────────────────────────────────────────────
export async function createOrder(order) {
  const { data, error } = await supabase.from('orders').insert(order).select().single()
  if (error) throw error
  return data
}

export async function fetchUserOrders(userId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

// ── REFERRALS ─────────────────────────────────────────────────────────────────
export async function fetchUserReferrals(userId) {
  const { data, error } = await supabase
    .from('referrals')
    .select('*')
    .eq('referrer_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

// ── REVIEWS ───────────────────────────────────────────────────────────────────
export async function fetchUserReviews(userId) {
  const { data, error } = await supabase
    .from('reviews')
    .select('*, providers(name, image_url), products(name, image_url)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function createReview(review) {
  const { data, error } = await supabase.from('reviews').insert(review).select().single()
  if (error) throw error
  return data
}

// ── JOBS ──────────────────────────────────────────────────────────────────────
export async function fetchJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

// ── AFFILIATE APPLICATIONS ────────────────────────────────────────────────────
export async function submitAffiliateApplication(app) {
  const { data, error } = await supabase.from('affiliate_applications').insert(app).select().single()
  if (error) throw error
  return data
}

export async function fetchAffiliateApplication({ userId, email }) {
  let q = supabase.from('affiliate_applications').select('*').order('created_at', { ascending: false }).limit(1)
  if (userId) q = q.or(`user_id.eq.${userId},email.eq.${email}`)
  else q = q.eq('email', email)
  const { data, error } = await q
  if (error) throw error
  return data?.[0] || null
}

export async function submitProviderApplication(app) {
  const { data, error } = await supabase.from('provider_applications').insert(app).select().single()
  if (error) throw error
  return data
}

export async function fetchProviderApplication({ userId, email }) {
  let q = supabase.from('provider_applications').select('*').order('created_at', { ascending: false }).limit(1)
  if (userId) q = q.or(`user_id.eq.${userId},email.eq.${email}`)
  else q = q.eq('email', email)
  const { data, error } = await q
  if (error) throw error
  return data?.[0] || null
}

// ADMIN REVIEW
export async function fetchAdminReviewData() {
  const [
    providerApplications,
    affiliateApplications,
    contactMessages,
    bookings,
  ] = await Promise.all([
    supabase.from('provider_applications').select('*').order('created_at', { ascending: false }).limit(100),
    supabase.from('affiliate_applications').select('*').order('created_at', { ascending: false }).limit(100),
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(100),
    supabase.from('bookings').select('*, providers(name, slug)').order('created_at', { ascending: false }).limit(100),
  ])

  const firstError = [providerApplications, affiliateApplications, contactMessages, bookings].find(result => result.error)?.error
  if (firstError) throw firstError

  return {
    providerApplications: providerApplications.data || [],
    affiliateApplications: affiliateApplications.data || [],
    contactMessages: contactMessages.data || [],
    bookings: bookings.data || [],
  }
}

function slugify(value = '') {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function servicesFromApplication(app) {
  const services = Array.isArray(app.services)
    ? app.services
    : String(app.services || '')
      .split(',')
      .map(item => item.trim())
      .filter(Boolean)

  return services.map((name, index) => ({
    id: `${slugify(name) || 'service'}-${index + 1}`,
    name,
    desc: 'Service details are being completed.',
    duration: 'To be confirmed',
    price: 0,
  }))
}

export async function updateProviderApplicationStatus(id, status) {
  const { data, error } = await supabase
    .from('provider_applications')
    .update({ status })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function approveProviderApplication(id) {
  const { data: app, error: appError } = await supabase
    .from('provider_applications')
    .select('*')
    .eq('id', id)
    .single()
  if (appError) throw appError

  const name = app.full_name || app.name || app.email?.split('@')[0] || 'Rejuveefy Provider'
  const baseSlug = slugify(name) || `provider-${id}`
  const slug = `${baseSlug}-${String(id).slice(0, 8)}`
  const services = servicesFromApplication(app)

  const providerPayload = {
    user_id: app.user_id || null,
    name,
    slug,
    speciality: services[0]?.name || 'Beauty Professional',
    services,
    location: app.location || null,
    bio: app.bio || app.experience || 'This provider profile is being completed.',
    price_from: 0,
    rating: 0,
    review_count: 0,
    is_active: true,
    is_featured: false,
  }

  const { data: existing } = app.user_id
    ? await supabase.from('providers').select('id').eq('user_id', app.user_id).limit(1)
    : { data: [] }

  let providerResult
  if (existing?.[0]?.id) {
    providerResult = await supabase
      .from('providers')
      .update(providerPayload)
      .eq('id', existing[0].id)
      .select()
      .single()
  } else {
    providerResult = await supabase
      .from('providers')
      .insert(providerPayload)
      .select()
      .single()
  }

  if (providerResult.error) throw providerResult.error

  const updated = await updateProviderApplicationStatus(id, 'approved')
  return { application: updated, provider: providerResult.data }
}

export async function updateAffiliateApplicationStatus(id, status) {
  const { data, error } = await supabase
    .from('affiliate_applications')
    .update({ status })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateBookingStatus(id, status) {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
export async function submitContactMessage(msg) {
  const { error } = await supabase.from('contact_messages').insert(msg)
  if (error) throw error
}

// ── NEWSLETTER ────────────────────────────────────────────────────────────────
export async function subscribeNewsletter(email) {
  const { error } = await supabase
    .from('newsletter_subscribers')
    .upsert({ email }, { onConflict: 'email' })
  if (error) throw error
}
