import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

function missingSupabase() {
  return new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
}

const disabledAuth = {
  async getSession() {
    return { data: { session: null }, error: missingSupabase() }
  },
  onAuthStateChange() {
    return { data: { subscription: { unsubscribe() {} } } }
  },
  async signInWithOAuth() {
    return { error: missingSupabase() }
  },
  async signInWithPassword() {
    return { error: missingSupabase() }
  },
  async signUp() {
    return { error: missingSupabase() }
  },
  async resetPasswordForEmail() {
    return { error: missingSupabase() }
  },
  async signOut() {
    return { error: null }
  },
}

function disabledQuery() {
  const query = {
    select: () => query,
    insert: () => query,
    update: () => query,
    upsert: () => query,
    eq: () => query,
    or: () => query,
    order: () => query,
    limit: () => query,
    single: () => Promise.resolve({ data: null, error: missingSupabase() }),
    then: (resolve) => resolve({ data: null, error: missingSupabase() }),
  }
  return query
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: disabledAuth,
      from: () => disabledQuery(),
    }
