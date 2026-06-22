import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Phone, Mail } from 'lucide-react'

const CONTACT = {
  phone: '+44 20 1234 5678',
  whatsapp: '442012345678',
  email: 'hello@rejuveefy.com',
}

export default function ContactWidget() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50">
      {open && (
        <div className="mb-3 w-64 bg-surface-container-lowest rounded-2xl shadow-modal border border-outline-variant/20 overflow-hidden">
          <div className="bg-primary px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-white font-semibold text-sm">Need help?</p>
              <p className="text-white/70 text-xs">We're here for you</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
              <X size={16} />
            </button>
          </div>
          <div className="p-3 space-y-2">
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-container-low transition-colors group">
              <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-200 transition-colors">
                <MessageCircle size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface">WhatsApp</p>
                <p className="text-xs text-on-surface-variant">Usually replies in minutes</p>
              </div>
            </a>
            <a href={`sms:${CONTACT.phone}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-container-low transition-colors group">
              <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors">
                <MessageCircle size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface">iMessage / SMS</p>
                <p className="text-xs text-on-surface-variant">{CONTACT.phone}</p>
              </div>
            </a>
            <a href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-container-low transition-colors group">
              <div className="w-9 h-9 bg-primary-container rounded-full flex items-center justify-center text-primary group-hover:bg-primary-fixed transition-colors">
                <Mail size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface">Email</p>
                <p className="text-xs text-on-surface-variant">{CONTACT.email}</p>
              </div>
            </a>
            <a href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-container-low transition-colors group">
              <div className="w-9 h-9 bg-surface-container-high rounded-full flex items-center justify-center text-on-surface-variant group-hover:bg-surface-container-highest transition-colors">
                <Phone size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface">Call Us</p>
                <p className="text-xs text-on-surface-variant">{CONTACT.phone}</p>
              </div>
            </a>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)}
        className="w-12 h-12 bg-primary text-white rounded-full shadow-modal flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </div>
  )
}
