import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, Heart, ShoppingBag, Bell, ChevronDown, X, Menu, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'

const nav = [
  { label: 'Home', path: '/' },
  {
    label: 'Book', path: '/book',
    sub: [
      { label: '✨ Book Maye — Founder', path: '/book/maye' },
      { label: 'Braids', path: '/book/braids' },
      { label: 'Twists', path: '/book/twists' },
      { label: 'Locks', path: '/book/locks' },
      { label: 'Wig Installation', path: '/book/wig-install' },
      { label: 'Frontal & Closure', path: '/book/frontal' },
      { label: 'Hair Styling', path: '/book/hair-styling' },
      { label: 'Makeup', path: '/book/makeup' },
      { label: 'Barbers', path: '/book/barbers' },
      { label: 'Training', path: '/training' },
    ],
  },
  {
    label: 'Providers', path: '/providers',
    sub: [
      { label: 'Find Providers', path: '/providers' },
      { label: 'Provider Portal', path: '/providers-portal' },
      { label: 'Join as Provider', path: '/providers-portal' },
    ],
  },
  {
    label: 'Shop', path: '/shop',
    sub: [
      { label: 'All Products', path: '/shop' },
      { label: 'Hair Care', path: '/shop/hair-care' },
      { label: 'Skin Care', path: '/shop/skin-care' },
      { label: 'Makeup', path: '/shop/makeup' },
      { label: 'Tools & Brushes', path: '/shop/tools-brushes' },
      { label: 'Wellness', path: '/shop/wellness' },
      { label: 'Best Sellers', path: '/shop?sort=bestseller' },
    ],
  },
  { label: 'AI Analyser', path: '/ai-beauty/hair' },
  {
    label: 'Affiliate', path: '/affiliate',
    sub: [
      { label: 'Affiliate Programme', path: '/affiliate' },
      { label: 'Affiliate Portal', path: '/affiliate-portal' },
    ],
  },
  { label: 'Training', path: '/training' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export default function Header() {
  const { cartCount, wishlist } = useApp()
  const [open, setOpen] = useState(null)
  const [mobile, setMobile] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [q, setQ] = useState('')
  const [announce, setAnnounce] = useState(true)
  const ref = useRef(null)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => { setMobile(false); setOpen(null) }, [pathname])

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(null) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (q.trim()) { navigate(`/shop?q=${q}`); setSearchOpen(false); setQ('') }
  }

  const isActive = (path) => path === '/' ? pathname === '/' : pathname.startsWith(path)

  return (
    <>
      {/* Announcement bar */}
      {announce && (
        <div className="bg-gray-800 text-gray-100 text-xs text-center py-2 px-4 flex items-center justify-center gap-2 relative">
          <span>🎁 <strong>NEW OFFER:</strong> Get 10% off your first booking and free delivery on orders over £50. Use code: <strong>BEAUTY15</strong></span>
          <Link to="/book" className="underline font-semibold ml-1">Get It Now →</Link>
          <button onClick={() => setAnnounce(false)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main nav */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 flex items-center h-14 gap-4">
          {/* Logo */}
          <Link to="/" className="shrink-0 mr-2">
            <img src="/logo.png" alt="Rejuveefy" className="h-12 w-auto object-contain" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.08))' }} />
          </Link>

          {/* Desktop nav */}
          <nav ref={ref} className="hidden lg:flex items-center gap-0.5 flex-1">
            {nav.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.sub && setOpen(item.label)}
                onMouseLeave={() => setOpen(null)}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-0.5 px-2.5 py-1.5 rounded-md text-[13px] font-medium transition-colors whitespace-nowrap
                    ${isActive(item.path) ? 'text-pink-500' : 'text-gray-600 hover:text-pink-500'}`}
                >
                  {item.label}
                  {item.sub && <ChevronDown size={13} className={`transition-transform ${open === item.label ? 'rotate-180' : ''}`} />}
                </Link>
                <AnimatePresence>
                  {item.sub && open === item.label && (
                    <motion.div
                      className="absolute top-full left-0 mt-0.5 w-52 bg-white rounded-xl shadow-modal border border-gray-100 py-1.5 z-50"
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {item.sub.map((s, i) => (
                        <motion.div
                          key={s.path}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03, duration: 0.15 }}
                        >
                          <Link to={s.path}
                            className="block px-4 py-2 text-[13px] text-gray-600 hover:text-pink-500 hover:bg-pink-50 transition-colors">
                            {s.label}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-0.5 ml-auto">
            {/* Search */}
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5 border border-gray-200">
                <input autoFocus value={q} onChange={e => setQ(e.target.value)}
                  placeholder="Search products..." className="bg-transparent text-sm outline-none w-36 text-gray-800" />
                <button type="button" onClick={() => { setSearchOpen(false); setQ('') }}><X size={15} className="text-gray-400" /></button>
              </form>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="p-2 rounded-lg text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-colors">
                <Search size={18} />
              </button>
            )}

            <Link to="/wishlist" className="relative p-2 rounded-lg text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-colors">
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-pink-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 rounded-lg text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-colors">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-pink-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            <button className="hidden sm:flex p-2 rounded-lg text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-colors">
              <Bell size={18} />
            </button>

            {/* My Account */}
            <div className="hidden sm:flex items-center gap-1.5 ml-1 pl-2 border-l border-gray-200">
              <Link to="/dashboard" className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-gray-600 hover:text-pink-500 hover:bg-pink-50 transition-colors">
                <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                  <User size={13} className="text-pink-500" />
                </div>
                <span className="text-[13px] font-medium">My Account</span>
                <ChevronDown size={13} className="text-gray-400" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setMobile(true)} className="lg:hidden p-2 rounded-lg text-gray-500 ml-1">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/30" onClick={() => setMobile(false)} />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-72 bg-white overflow-y-auto"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <img src="/logo.png" alt="Rejuveefy" className="h-10 w-auto object-contain" />
                <button onClick={() => setMobile(false)}><X size={20} className="text-gray-500" /></button>
              </div>
              <div className="p-3 space-y-0.5">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link to={item.path} onClick={() => setMobile(false)}
                      className="block px-3 py-2.5 text-sm font-semibold text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-colors">
                      {item.label}
                    </Link>
                    {item.sub && (
                      <div className="pl-3">
                        {item.sub.slice(1).map((s) => (
                          <Link key={s.path} to={s.path} onClick={() => setMobile(false)}
                            className="block px-3 py-2 text-xs text-gray-500 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-colors">
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100 flex flex-col gap-2">
                <Link to="/login" onClick={() => setMobile(false)}
                  className="w-full text-center border border-pink-500 text-pink-500 py-2.5 rounded-full text-sm font-semibold">Login</Link>
                <Link to="/register" onClick={() => setMobile(false)}
                  className="w-full text-center bg-pink-500 text-white py-2.5 rounded-full text-sm font-semibold">Sign Up</Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
