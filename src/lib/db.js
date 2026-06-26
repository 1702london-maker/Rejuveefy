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
