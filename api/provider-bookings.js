import { createClient } from '@supabase/supabase-js'

function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

async function getContext(req) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return { error: 'Provider bookings are not configured.', status: 500 }
  }

  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '')
  if (!token) return { error: 'Missing auth token.', status: 401 }

  const authClient = createClient(supabaseUrl, anonKey)
  const { data, error } = await authClient.auth.getUser(token)
  if (error || !data?.user?.id) return { error: 'Invalid auth token.', status: 401 }

  return {
    user: data.user,
    admin: createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    }),
  }
}

async function assertProviderOwner(admin, userId, providerId) {
  const { data, error } = await admin
    .from('providers')
    .select('id,user_id')
    .eq('id', providerId)
    .single()
  if (error) throw error
  if (data.user_id !== userId) return false
  return true
}

export default async function handler(req, res) {
  try {
    const ctx = await getContext(req)
    if (ctx.error) return json(res, ctx.status, { error: ctx.error })

    if (req.method === 'GET') {
      const providerId = req.query.providerId
      if (!providerId) return json(res, 400, { error: 'Missing provider id.' })
      if (!await assertProviderOwner(ctx.admin, ctx.user.id, providerId)) {
        return json(res, 403, { error: 'Provider booking access required.' })
      }
      const { data, error } = await ctx.admin
        .from('bookings')
        .select('*')
        .eq('provider_id', providerId)
        .order('booking_date', { ascending: false })
      if (error) throw error
      return json(res, 200, { bookings: data || [] })
    }

    if (req.method === 'PATCH') {
      const { bookingId, status } = req.body || {}
      if (!bookingId || !status) return json(res, 400, { error: 'Missing booking update.' })
      const { data: booking, error: bookingError } = await ctx.admin
        .from('bookings')
        .select('id,provider_id')
        .eq('id', bookingId)
        .single()
      if (bookingError) throw bookingError
      if (!await assertProviderOwner(ctx.admin, ctx.user.id, booking.provider_id)) {
        return json(res, 403, { error: 'Provider booking access required.' })
      }
      const { data, error } = await ctx.admin
        .from('bookings')
        .update({ status })
        .eq('id', bookingId)
        .select()
        .single()
      if (error) throw error
      return json(res, 200, { booking: data })
    }

    return json(res, 405, { error: 'Method not allowed.' })
  } catch (error) {
    return json(res, 500, { error: error.message || 'Provider booking request failed.' })
  }
}
