import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [toast, setToast] = useState(null)
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  // Listen for auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    showToast('Signed out successfully', 'info')
  }

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { ...product, qty }]
    })
    showToast(`${product.name} added to cart`)
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id))

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id)
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const clearCart = () => setCart([])

  const toggleWishlist = (item) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === item.id)
      if (exists) { showToast('Removed from wishlist', 'info'); return prev.filter(i => i.id !== item.id) }
      showToast('Added to wishlist')
      return [...prev, item]
    })
  }

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(i => i.id !== id))
    showToast('Removed from wishlist', 'info')
  }

  const inWishlist = (id) => wishlist.some(i => i.id === id)

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  // Derived user display info
  const userDisplay = user ? {
    name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
    email: user.email,
    avatar: user.user_metadata?.avatar_url || null,
    points: 750,
  } : null

  return (
    <AppContext.Provider value={{
      cart, cartCount, cartTotal, addToCart, removeFromCart, updateQty, clearCart,
      wishlist, toggleWishlist, removeFromWishlist, inWishlist,
      toast, showToast,
      user, userDisplay, authLoading, signOut,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
