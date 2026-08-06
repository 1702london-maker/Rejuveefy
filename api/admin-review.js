import { createClient } from '@supabase/supabase-js'

function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
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

async function requireAdmin(req) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return { error: 'Admin review is not configured.', status: 500 }
  }

  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '')
  if (!token) return { error: 'Missing auth token.', status: 401 }

  const authClient = createClient(supabaseUrl, anonKey)
  const { data, error } = await authClient.auth.getUser(token)
  if (error || !data?.user?.email) return { error: 'Invalid auth token.', status: 401 }

  const adminEmails = (process.env.ADMIN_EMAILS || process.env.VITE_ADMIN_EMAILS || '')
    .split(',')
    .map(email => email.trim().toLowerCase())
    .filter(Boolean)
  const role = data.user.app_metadata?.role || data.user.user_metadata?.role
  const allowed = role === 'admin' || data.user.user_metadata?.is_admin === true || adminEmails.includes(data.user.email.toLowerCase())
  if (!allowed) return { error: 'Admin access required.', status: 403 }

  return {
    user: data.user,
    admin: createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    }),
  }
}

async function fetchReviewData(admin) {
  const [providerApplications, affiliateApplications, contactMessages, bookings] = await Promise.all([
    admin.from('provider_applications').select('*').order('created_at', { ascending: false }).limit(100),
    admin.from('affiliate_applications').select('*').order('created_at', { ascending: false }).limit(100),
    admin.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(100),
    admin.from('bookings').select('*, providers(name, slug)').order('created_at', { ascending: false }).limit(100),
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

async function approveProvider(admin, id) {
  const { data: app, error: appError } = await admin
    .from('provider_applications')
    .select('*')
    .eq('id', id)
    .single()
  if (appError) throw appError

  const name = app.full_name || app.name || app.email?.split('@')[0] || 'Rejuveefy Provider'
  const slug = `${slugify(name) || `provider-${id}`}-${String(id).slice(0, 8)}`
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
    ? await admin.from('providers').select('id').eq('user_id', app.user_id).limit(1)
    : { data: [] }

  const providerResult = existing?.[0]?.id
    ? await admin.from('providers').update(providerPayload).eq('id', existing[0].id).select().single()
    : await admin.from('providers').insert(providerPayload).select().single()
  if (providerResult.error) throw providerResult.error

  const { data: application, error } = await admin
    .from('provider_applications')
    .update({ status: 'approved' })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error

  return { application, provider: providerResult.data }
}

async function updateStatus(admin, table, id, status) {
  const { data, error } = await admin.from(table).update({ status }).eq('id', id).select().single()
  if (error) throw error
  return data
}

export default async function handler(req, res) {
  try {
    const auth = await requireAdmin(req)
    if (auth.error) return json(res, auth.status, { error: auth.error })

    if (req.method === 'GET') {
      return json(res, 200, await fetchReviewData(auth.admin))
    }

    if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed.' })

    const { type, id, status } = req.body || {}
    if (!id || !status) return json(res, 400, { error: 'Missing review action.' })

    if (type === 'provider') {
      const result = status === 'approved'
        ? await approveProvider(auth.admin, id)
        : { application: await updateStatus(auth.admin, 'provider_applications', id, status), provider: null }
      return json(res, 200, result)
    }

    if (type === 'affiliate') {
      return json(res, 200, { application: await updateStatus(auth.admin, 'affiliate_applications', id, status) })
    }

    if (type === 'booking') {
      return json(res, 200, { booking: await updateStatus(auth.admin, 'bookings', id, status) })
    }

    return json(res, 400, { error: 'Unknown review type.' })
  } catch (error) {
    return json(res, 500, { error: error.message || 'Admin review failed.' })
  }
}
