import { createClient } from '@supabase/supabase-js'

function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

async function getUserAndAdmin(req) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return { error: 'Provider profile updates are not configured.', status: 500 }
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

export default async function handler(req, res) {
  try {
    if (req.method !== 'PATCH') return json(res, 405, { error: 'Method not allowed.' })

    const auth = await getUserAndAdmin(req)
    if (auth.error) return json(res, auth.status, { error: auth.error })

    const { providerId, patch } = req.body || {}
    if (!providerId || !patch || typeof patch !== 'object') {
      return json(res, 400, { error: 'Missing provider update payload.' })
    }

    const { data: provider, error: providerError } = await auth.admin
      .from('providers')
      .select('id,user_id')
      .eq('id', providerId)
      .single()
    if (providerError) throw providerError
    if (provider.user_id !== auth.user.id) return json(res, 403, { error: 'Provider profile access required.' })

    const allowed = ['services', 'speciality', 'price_from', 'name', 'location', 'bio', 'image_url', 'availability', 'is_active']
    const cleanPatch = Object.fromEntries(Object.entries(patch).filter(([key]) => allowed.includes(key)))
    if (!Object.keys(cleanPatch).length) return json(res, 400, { error: 'No allowed provider fields to update.' })

    const { data, error } = await auth.admin
      .from('providers')
      .update(cleanPatch)
      .eq('id', providerId)
      .select()
      .single()
    if (error) throw error

    return json(res, 200, { provider: data })
  } catch (error) {
    return json(res, 500, { error: error.message || 'Provider profile update failed.' })
  }
}
