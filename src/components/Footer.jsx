import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const columns = [
  { title: 'Services', links: [
    { label: 'Book a Service', path: '/book' },
    { label: 'Braids', path: '/book/braids' },
    { label: 'Twists', path: '/book/twists' },
    { label: 'Locks', path: '/book/locks' },
    { label: 'Wig Installation', path: '/book/wig-installation' },
    { label: 'Frontal & Closure', path: '/book/frontal-closure' },
    { label: 'Hair Treatments', path: '/book/hair-treatments' },
    { label: 'Makeup', path: '/book/makeup' },
    { label: 'Barbers', path: '/book/barbers' },
  ]},
  { title: 'Shop', links: [
    { label: 'Wigs', path: '/shop/wigs' },
    { label: 'Hair Bundles', path: '/shop/bundles' },
    { label: 'Hair Treatments', path: '/shop/treatments' },
    { label: 'Hair Accessories', path: '/shop/accessories' },
    { label: 'Lashes', path: '/shop/lashes' },
    { label: 'New Arrivals', path: '/shop?sort=new' },
    { label: 'Best Sellers', path: '/shop?sort=bestseller' },
  ]},
  { title: 'Support & Company', links: [
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Booking Help', path: '/booking-help' },
    { label: 'Returns & Refunds', path: '/returns' },
    { label: 'Track Order', path: '/track-order' },
    { label: 'Careers', path: '/careers' },
    { label: 'Become a Provider', path: '/become-provider' },
  ]},
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [openSection, setOpenSection] = useState(null)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email && consent) { setSubscribed(true); setEmail('') }
  }

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/20 mt-16 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        {/* Desktop: 5 columns */}
        <div className="hidden lg:grid grid-cols-5 gap-8">
          {/* Col 1: Brand */}
          <div className="col-span-1">
            <div className="font-display font-bold text-xl text-primary mb-3">Rejuveefy</div>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              Rejuveefy is a modern hair and beauty-tech marketplace for booking trusted professionals and shopping beauty essentials.
            </p>
            <div className="flex gap-3 mb-4">
              {['📸', '𝕏', '𝑓', '▶'].map((icon, i) => (
                <a key={i} href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-container/50 text-on-primary-container hover:bg-primary hover:text-white transition-all text-sm">
                  {icon}
                </a>
              ))}
            </div>
            <div className="inline-flex items-center gap-1.5 bg-surface-container rounded-lg px-3 py-1.5 text-xs text-on-surface-variant border border-outline-variant/20">
              <span>🔒</span> Secure & Trusted Platform
            </div>
          </div>

          {/* Cols 2-4 */}
          {columns.map(col => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm text-on-surface mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-xs text-on-surface-variant hover:text-primary transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Col 5: Newsletter */}
          <div>
            <h4 className="font-display font-semibold text-sm text-on-surface mb-1">Stay in the Beauty Loop</h4>
            <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
              Get beauty tips, hair inspiration, exclusive offers, new product launches, and early access to promotions.
            </p>
            {subscribed ? (
              <div className="bg-primary-container/30 rounded-xl p-3 text-xs text-on-primary-container font-medium text-center">✨ You're subscribed!</div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-outline-variant/40 bg-surface-container-lowest focus:outline-none focus:border-primary transition-colors" />
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-0.5 accent-primary w-3.5 h-3.5 shrink-0" />
                  <span className="text-[10px] text-on-surface-variant leading-relaxed">I agree to receive marketing emails from Rejuveefy</span>
                </label>
                <button type="submit" className="w-full bg-primary text-white py-2 rounded-full text-xs font-semibold hover:opacity-90 transition-opacity">Subscribe</button>
              </form>
            )}
          </div>
        </div>

        {/* Mobile: accordion */}
        <div className="lg:hidden space-y-1">
          <div className="mb-6">
            <div className="font-display font-bold text-xl text-primary mb-2">Rejuveefy</div>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">Modern hair and beauty-tech marketplace for booking trusted professionals and shopping beauty essentials.</p>
            <div className="flex gap-3">
              {['📸', '𝕏', '𝑓', '▶'].map((icon, i) => (
                <a key={i} href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-container/50 text-on-primary-container text-sm">
                  {icon}
                </a>
              ))}
            </div>
          </div>
          {columns.map(col => (
            <div key={col.title} className="border border-outline-variant/20 rounded-xl overflow-hidden">
              <button onClick={() => setOpenSection(openSection === col.title ? null : col.title)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-on-surface">
                {col.title}
                <ChevronDown size={16} className={`transition-transform ${openSection === col.title ? 'rotate-180' : ''}`} />
              </button>
              {openSection === col.title && (
                <div className="px-4 pb-3 grid grid-cols-2 gap-2">
                  {col.links.map(link => (
                    <Link key={link.label} to={link.path} className="text-xs text-on-surface-variant hover:text-primary">{link.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4">
            <h4 className="font-semibold text-sm text-on-surface mb-2">Stay in the Beauty Loop</h4>
            {subscribed ? (
              <div className="bg-primary-container/30 rounded-xl p-3 text-xs text-on-primary-container font-medium text-center">✨ You're subscribed!</div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" required className="w-full px-3 py-2.5 text-sm rounded-xl border border-outline-variant/40 bg-surface-container-lowest focus:outline-none focus:border-primary" />
                <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-0.5 accent-primary" /><span className="text-xs text-on-surface-variant">I agree to receive marketing emails from Rejuveefy</span></label>
                <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-full text-sm font-semibold">Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-on-surface-variant">© 2025 Rejuveefy Ltd. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Privacy Policy', 'Terms & Conditions', 'Cookie Policy', 'Accessibility'].map(item => (
              <Link key={item} to="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors">{item}</Link>
            ))}
          </div>
          <div className="flex gap-1.5 items-center text-xs text-on-surface-variant">
            <span>💳</span><span>🔒</span><span>PayPal</span><span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
