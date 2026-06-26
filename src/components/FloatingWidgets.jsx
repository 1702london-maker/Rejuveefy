import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, RotateCcw, Minimize2, PhoneCall } from 'lucide-react'

const WHATSAPP_NUMBER = '447700900000' // ← replace with real number
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Rejuveefy%2C%20I%20need%20help%20with%20my%20account.`

const QUICK_REPLIES = [
  'How do I book a service?',
  'What hair treatments do you offer?',
  'How does the AI analyser work?',
  'What is your returns policy?',
]

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <div key={i} className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </div>
  )
}

export default function FloatingWidgets() {
  const [chatOpen, setChatOpen] = useState(false)
  const [minimised, setMinimised] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Reja 👋 Rejuveefy's beauty assistant. I can help with bookings, hair care advice, product questions, and more. What can I help you with today?",
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [transferring, setTransferring] = useState(false)
  const [unread, setUnread] = useState(0)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (chatOpen) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [chatOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const content = (text || input).trim()
    if (!content || loading) return
    setInput('')
    setTransferring(false)

    const userMsg = { role: 'user', content }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map(m => ({ role: m.role, content: m.content }))
        }),
      })
      const data = await res.json()
      const reply = { role: 'assistant', content: data.message || 'Sorry, something went wrong. Please try again.' }
      setMessages(prev => [...prev, reply])
      if (data.transferToHuman) setTransferring(true)
      if (!chatOpen) setUnread(u => u + 1)
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I had a connection issue. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const resetChat = () => {
    setMessages([{
      role: 'assistant',
      content: "Hi! I'm Reja 👋 Rejuveefy's beauty assistant. How can I help you today?"
    }])
    setTransferring(false)
    setInput('')
  }

  return (
    <>
      {/* ── WhatsApp floating button ─────────────────────────── */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#25D366] text-white pl-3 pr-4 py-3 rounded-full shadow-lg hover:bg-[#1ebe5a] transition-all hover:scale-105 group"
        aria-label="Chat on WhatsApp"
      >
        {/* WhatsApp SVG icon */}
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="text-sm font-semibold whitespace-nowrap">WhatsApp Us</span>
      </a>

      {/* ── Live Chat bubble ─────────────────────────────────── */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center shadow-lg hover:bg-pink-600 transition-all hover:scale-105"
          aria-label="Open live chat"
        >
          <MessageCircle size={24} className="text-white" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unread}
            </span>
          )}
        </button>
      )}

      {/* ── Chat window ──────────────────────────────────────── */}
      {chatOpen && (
        <div className={`fixed bottom-6 right-6 z-50 w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col transition-all duration-200 ${minimised ? 'h-14' : 'h-[520px]'}`}>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-t-2xl text-white shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-base">💅</div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="text-sm font-bold leading-none">Reja</p>
                <p className="text-[10px] text-pink-100">Rejuveefy Live Chat · Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={resetChat} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors" title="New chat">
                <RotateCcw size={14} />
              </button>
              <button onClick={() => setMinimised(m => !m)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                <Minimize2 size={14} />
              </button>
              <button onClick={() => setChatOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          {!minimised && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-gray-50">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {m.role === 'assistant' && (
                      <div className="w-7 h-7 bg-pink-100 rounded-full flex items-center justify-center text-sm shrink-0 mr-2 mt-0.5">💅</div>
                    )}
                    <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-pink-500 text-white rounded-br-sm'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm shadow-sm'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="w-7 h-7 bg-pink-100 rounded-full flex items-center justify-center text-sm shrink-0 mr-2 mt-0.5">💅</div>
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm shadow-sm">
                      <TypingDots />
                    </div>
                  </div>
                )}

                {/* Transfer to WhatsApp CTA */}
                {transferring && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                    <p className="text-xs text-green-700 font-semibold mb-2">Connect with our team on WhatsApp</p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#1ebe5a] transition-colors"
                    >
                      <PhoneCall size={13} /> Chat on WhatsApp
                    </a>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Quick replies */}
              {messages.length === 1 && (
                <div className="px-3 py-2 flex gap-1.5 overflow-x-auto border-t border-gray-100 bg-white shrink-0">
                  {QUICK_REPLIES.map(q => (
                    <button key={q} onClick={() => sendMessage(q)}
                      className="whitespace-nowrap text-[11px] font-medium text-pink-600 border border-pink-200 bg-pink-50 px-2.5 py-1.5 rounded-full hover:bg-pink-100 transition-colors shrink-0">
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="flex items-center gap-2 px-3 py-3 border-t border-gray-100 bg-white rounded-b-2xl shrink-0">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask Reja anything..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-pink-400 transition-colors"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors disabled:opacity-40 shrink-0"
                >
                  <Send size={15} className="text-white" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
