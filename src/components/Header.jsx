import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Heart, Search, Menu, X, User, ChevronDown } from 'lucide-react'
import { useApp } from '../context/AppContext'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Book a Service', path: '/book', dropdown: [
    { label: 'Braids', path: '/book/braids' },
    { label: 'Twists', path: '/book/twists' },
    { label: 'Locks', path: '/book/locks' },
    { label: 'Wig Installation', path: '/book/wig-installation' },
    { label: 'Frontal & Closure', path: '/book/frontal-closure' },
    { label: 'Hair Styling', path: '/book/hair-styling' },
    { label: 'Hair Treatments', path: '/book/hair-treatments' },
    { label: 'Makeup', path: '/book/makeup' },
    { label: 'Barbers', path: '/book/barbers' },
  ]},
  { label: 'Providers', path: '/providers', dropdown: [
    { label: 'Browse Providers', path: '/providers' },
    { label: 'Become a Provider', path: '/become-provider' },
  ]},
  { label: 'Shop', path: '/shop', dropdown: [
    { label: 'Wigs', path: '/shop/wigs' },
    { label: 'Hair Bundles', path: '/shop/bundles' },
    { label: 'Hair Treatments', path: '/shop/treatments' },
    { label: 'Hair Accessories', path: '/shop/accessories' },
    { label: 'Lashes', path: '/shop/lashes' },
  ]},
  { label: 'AI Beauty Analyzer', path: '/ai-analyzer' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export default function Header() {
  const { cartCount, wishlist } = useApp()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQ, setSearchQ] = useState('')
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setActiveDropdown(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQ.trim()) { navigate(`/shop?q=${searchQ}`); setSearchOpen(false); setSearchQ('') }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav bg-surface/80 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" alt="Rejuveefy" className="h-9 w-auto" onError={e => { e.target.style.display='none' }} />
            <span className="font-display font-bold text-xl text-primary tracking-tight">Rejuveefy</span>
          </Link>

          {/* Desktop Nav */}
          <nav ref={dropdownRef} className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <div key={link.label} className="relative" onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)} onMouseLeave={() => setActiveDropdown(null)}>
                <Link
                  to={link.path}
                  className="flex items-center gap-0.5 px-3 py-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors rounded-lg hover:bg-primary-fixed/30"
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
                </Link>
                {link.dropdown && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-surface-container-lowest rounded-xl shadow-modal border border-outline-variant/20 py-1.5 z-50">
                    {link.dropdown.map(item => (
                      <Link key={item.path} to={item.path} onClick={() => setActiveDropdown(null)}
                        className="block px-4 py-2.5 text-sm text-on-surface-variant hover:text-primary hover:bg-primary-fixed/20 transition-colors">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2 bg-surface-container-low rounded-full px-3 py-1.5 border border-outline-variant/40">
                <input autoFocus value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search products..." className="bg-transparent text-sm outline-none w-32 text-on-surface placeholder:text-on-surface-variant/50" />
                <button type="button" onClick={() => setSearchOpen(false)}><X size={16} className="text-on-surface-variant" /></button>
              </form>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary-fixed/30 transition-colors">
                <Search size={20} />
              </button>
            )}
            <Link to="/wishlist" className="relative p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary-fixed/30 transition-colors">
              <Heart size={20} />
              {wishlist.length > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center font-medium">{wishlist.length}</span>}
            </Link>
            <Link to="/cart" className="relative p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary-fixed/30 transition-colors">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center font-medium">{cartCount}</span>}
            </Link>
            <div className="hidden sm:flex items-center gap-2 ml-2">
              <Link to="/login" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors px-3 py-1.5 rounded-lg">Login</Link>
              <Link to="/register" className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity">Join Free</Link>
            </div>
            <button className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:text-primary transition-colors ml-1" onClick={() => setMobileOpen(true)}>
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-surface-container-lowest shadow-modal slide-in overflow-y-auto">
            <div className="p-4 flex items-center justify-between border-b border-outline-variant/20">
              <span className="font-display font-bold text-lg text-primary">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg text-on-surface-variant hover:text-primary">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-1">
              {navLinks.map(link => (
                <div key={link.label}>
                  <Link to={link.path} onClick={() => setMobileOpen(false)}
                    className="block px-3 py-3 text-sm font-semibold text-on-surface hover:text-primary hover:bg-primary-fixed/20 rounded-lg transition-colors">
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-4 space-y-0.5">
                      {link.dropdown.map(item => (
                        <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-xs text-on-surface-variant hover:text-primary hover:bg-primary-fixed/20 rounded-lg transition-colors">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-outline-variant/20 flex flex-col gap-3">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="w-full text-center border border-primary text-primary py-2.5 rounded-full text-sm font-semibold">Login</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="w-full text-center bg-primary text-white py-2.5 rounded-full text-sm font-semibold">Join Free</Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-surface-container-lowest border-t border-outline-variant/20 shadow-modal">
        <div className="flex">
          {[
            { icon: '🏠', label: 'Home', path: '/' },
            { icon: '📅', label: 'Book', path: '/book' },
            { icon: '🛍️', label: 'Shop', path: '/shop' },
            { icon: '✅', label: 'Bookings', path: '/bookings' },
            { icon: '👤', label: 'Account', path: '/account' },
          ].map(item => (
            <Link key={item.path} to={item.path} className="flex-1 flex flex-col items-center py-2.5 gap-0.5 text-on-surface-variant hover:text-primary transition-colors">
              <span className="text-lg">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
