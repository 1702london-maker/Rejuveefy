import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Twitter, Facebook, Youtube, ChevronDown } from 'lucide-react'

const cols = [
  {
    title: 'Services',
    links: [
      { l: 'Book a Service', p: '/book' },
      { l: 'Braids', p: '/book/braids' },
      { l: 'Twists', p: '/book/twists' },
      { l: 'Locks', p: '/book/locks' },
      { l: 'Wig Installation', p: '/book/wig-install' },
      { l: 'Frontal & Closure', p: '/book/frontal' },
      { l: 'Hair Treatments', p: '/book/hair-treatments' },
      { l: 'Makeup', p: '/book/makeup' },
      { l: 'Barbers', p: '/book/barbers' },
      { l: 'More Services', p: '/book' },
    ],
  },
  {
    title: 'Shop',
    links: [
      { l: 'Hair Care', p: '/shop/hair-care' },
      { l: 'Hair Bundles', p: '/shop/hair-bundles' },
      { l: 'Hair Treatments', p: '/shop/hair-treatments' },
      { l: 'Hair Accessories', p: '/shop/accessories' },
      { l: 'Lashes', p: '/shop/lashes' },
      { l: 'New Arrivals', p: '/shop?sort=new' },
      { l: 'Best Sellers', p: '/shop?sort=bestseller' },
    ],
  },
  {
    title: 'Support & Company',
    links: [
      { l: 'About Us', p: '/about' },
      { l: 'Contact Us', p: '/contact' },
      { l: 'Booking Help', p: '/booking-help' },
      { l: 'Returns & Refunds', p: '/returns' },
      { l: 'Track Order', p: '/track-order' },
      { l: 'Careers', p: '/careers' },
      { l: 'Terms & Conditions', p: '/terms' },
      { l: 'Privacy Policy', p: '/privacy' },
      { l: 'Become a Provider', p: '/become-provider' },
    ],
  },
]

const payIcons = [
  { label: 'Visa', bg: 'bg-blue-700' },
  { label: 'MC', bg: 'bg-red-600' },
  { label: 'PayPal', bg: 'bg-blue-500' },
  { label: 'APay', bg: 'bg-gray-900' },
  { label: 'GPay', bg: 'bg-white border border-gray-300' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [done, setDone] = useState(false)
  const [acc, setAcc] = useState(null)

  const sub = (e) => {
    e.preventDefault()
    if (email && consent) { setDone(true); setEmail('') }
  }

  return (
    <footer className="bg-white border-t border-gray-100 mt-16 pb-16 lg:pb-0">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-12">
        <div className="grid lg:grid-cols-[220px_1fr_1fr_1fr_220px] gap-8">
          {/* Brand */}
          <div>
            <span className="font-display font-bold text-xl text-pink-500 mb-3 block">Rejuveefy</span>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Rejuveefy is a modern beauty-tech marketplace connecting you with verified professionals and premium beauty products across the UK.
            </p>
            <div className="flex gap-2 mb-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-pink-100 hover:text-pink-500 transition-colors">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title} className="hidden lg:block">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">{col.title}</h4>
              <ul className="space-y-1.5">
                {col.links.map((l) => (
                  <li key={l.l}>
                    <Link to={l.p} className="text-xs text-gray-500 hover:text-pink-500 transition-colors">{l.l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Mobile accordions */}
          <div className="lg:hidden col-span-full space-y-1">
            {cols.map((col) => (
              <div key={col.title} className="border border-gray-100 rounded-xl overflow-hidden">
                <button onClick={() => setAcc(acc === col.title ? null : col.title)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-800">
                  {col.title}
                  <ChevronDown size={15} className={`transition-transform ${acc === col.title ? 'rotate-180' : ''}`} />
                </button>
                {acc === col.title && (
                  <div className="px-4 pb-3 grid grid-cols-2 gap-2">
                    {col.links.map((l) => (
                      <Link key={l.l} to={l.p} className="text-xs text-gray-500 hover:text-pink-500">{l.l}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-1">Stay in the Beauty Loop</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              Get beauty tips, hair inspiration, exclusive offers, new product launches and early access to promotions.
            </p>
            {done ? (
              <div className="bg-pink-50 rounded-xl p-3 text-xs text-pink-600 font-semibold text-center">
                ✨ You're subscribed!
              </div>
            ) : (
              <form onSubmit={sub} className="space-y-2">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 outline-none focus:border-pink-400 transition-colors" />
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)}
                    className="mt-0.5 w-3.5 h-3.5 shrink-0" />
                  <span className="text-[10px] text-gray-400 leading-relaxed">
                    I agree to receive marketing emails from Rejuveefy
                  </span>
                </label>
                <button type="submit"
                  className="w-full bg-pink-500 text-white py-2 rounded-full text-xs font-semibold hover:bg-pink-600 transition-colors">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">© 2026 Rejuveefy Ltd. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Privacy Policy', 'Terms & Conditions', 'Cookie Policy', 'Accessibility'].map((t) => (
              <Link key={t} to="#" className="text-xs text-gray-400 hover:text-pink-500 transition-colors">{t}</Link>
            ))}
          </div>
          <div className="flex gap-1.5 items-center">
            {payIcons.map((p) => (
              <span key={p.label} className={`${p.bg} text-white text-[9px] font-bold px-2 py-1 rounded`}>{p.label}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
