import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [toasts, setToasts] = useState([])
  const [user, setUser] = useState(null)
  const [bookingState, setBookingState] = useState({
    service: null, provider: null, date: null, time: null,
  })

  const addToCart = (product, opts = {}) => {
    setCart(prev => {
      const key = `${product.id}-${opts.color}-${opts.length}-${opts.texture}`
      const existing = prev.find(i => i.key === key)
      if (existing) return prev.map(i => i.key === key ? { ...i, qty: i.qty + (opts.qty || 1) } : i)
      return [...prev, { ...product, key, qty: opts.qty || 1, selectedColor: opts.color, selectedLength: opts.length, selectedTexture: opts.texture }]
    })
    showToast('Added to cart', 'success')
  }

  const removeFromCart = (key) => setCart(prev => prev.filter(i => i.key !== key))

  const updateQty = (key, qty) => {
    if (qty < 1) return removeFromCart(key)
    setCart(prev => prev.map(i => i.key === key ? { ...i, qty } : i))
  }

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) { showToast('Removed from wishlist', 'info'); return prev.filter(i => i.id !== product.id) }
      showToast('Added to wishlist', 'success')
      return [...prev, product]
    })
  }

  const isWishlisted = (id) => wishlist.some(i => i.id === id)

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  const showToast = (message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateQty, cartTotal, cartCount,
      wishlist, toggleWishlist, isWishlisted,
      toasts, showToast,
      user, setUser,
      bookingState, setBookingState,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
