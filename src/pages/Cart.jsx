import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useState } from 'react'

export function OrderSuccess({ isService = false }) {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto px-4 text-center py-16">
        <div className="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center text-4xl mx-auto mb-6">🎉</div>
        {isService ? (
          <>
            <h1 className="font-display text-2xl font-bold text-on-surface mb-2">Appointment Confirmed!</h1>
            <p className="text-on-surface-variant mb-6">Your booking reference: <span className="font-bold text-primary">#RJF{Math.floor(Math.random()*100000)}</span></p>
            <div className="bg-surface-container-low rounded-2xl p-6 text-left space-y-3 mb-6">
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Provider</span><span className="font-semibold">Amara Okafor</span></div>
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Service</span><span className="font-semibold">Box Braids</span></div>
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Date</span><span className="font-semibold">Sat 28 Jun 2025 at 10:00</span></div>
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Status</span><span className="text-amber-600 font-semibold text-xs bg-amber-50 px-2 py-0.5 rounded-full">Awaiting Acceptance</span></div>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-display text-2xl font-bold text-on-surface mb-2">Order Placed!</h1>
            <p className="text-on-surface-variant mb-6">Order <span className="font-bold text-primary">#RJF{Math.floor(Math.random()*100000)}</span> confirmed. Delivery in 3-5 business days.</p>
            <div className="bg-surface-container-low rounded-2xl p-6 text-left space-y-3 mb-6">
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Delivery method</span><span className="font-semibold">Standard (3-5 days)</span></div>
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Total paid</span><span className="font-semibold text-primary">£89.00</span></div>
            </div>
          </>
        )}
        <div className="flex gap-3 justify-center">
          <Link to="/orders" className="border border-primary text-primary px-5 py-2.5 rounded-full text-sm font-semibold">View Orders</Link>
          <Link to="/" className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold">Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}

export function Checkout() {
  const { cart, cartTotal } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', postcode: '', delivery: 'standard' })

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  if (cart.length === 0) return (
    <div className="pt-16 min-h-screen flex items-center justify-center text-center">
      <div><ShoppingBag size={48} className="text-outline-variant mx-auto mb-4" />
      <p className="text-on-surface-variant mb-4">Your cart is empty</p>
      <Link to="/shop" className="bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm">Shop Now</Link></div>
    </div>
  )

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-display text-2xl font-bold text-on-surface mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient">
              <h2 className="font-semibold text-on-surface mb-4">Customer Information</h2>
              <div className="grid grid-cols-2 gap-4">
                {[['name', 'Full name'], ['email', 'Email address']].map(([k, l]) => (
                  <div key={k} className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-medium text-on-surface-variant block mb-1">{l}</label>
                    <input value={form[k]} onChange={e => update(k, e.target.value)} className="w-full border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary bg-surface-container-lowest" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient">
              <h2 className="font-semibold text-on-surface mb-4">Delivery Address</h2>
              <div className="space-y-3">
                {[['address', 'Street address'], ['city', 'City'], ['postcode', 'Postcode']].map(([k, l]) => (
                  <div key={k}>
                    <label className="text-xs font-medium text-on-surface-variant block mb-1">{l}</label>
                    <input value={form[k]} onChange={e => update(k, e.target.value)} className="w-full border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary bg-surface-container-lowest" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient">
              <h2 className="font-semibold text-on-surface mb-4">Delivery Method</h2>
              {[{ id: 'standard', label: 'Standard', desc: '3-5 business days', price: 'Free' }, { id: 'express', label: 'Express', desc: '1-2 business days', price: '£5.99' }].map(opt => (
                <label key={opt.id} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer mb-2 ${form.delivery === opt.id ? 'border-primary bg-primary-fixed/20' : 'border-outline-variant/30 hover:border-primary/40'}`}>
                  <input type="radio" name="delivery" value={opt.id} checked={form.delivery === opt.id} onChange={() => update('delivery', opt.id)} className="accent-primary" />
                  <div className="flex-1"><p className="font-semibold text-sm text-on-surface">{opt.label}</p><p className="text-xs text-on-surface-variant">{opt.desc}</p></div>
                  <span className="font-semibold text-sm text-primary">{opt.price}</span>
                </label>
              ))}
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient">
              <h2 className="font-semibold text-on-surface mb-2">Payment</h2>
              <div className="bg-primary-fixed/20 rounded-xl p-4 text-sm text-on-primary-container border border-primary-container/30">
                🔒 Demo Mode — No real payments processed. Enter any card details to continue.
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <label className="text-xs font-medium text-on-surface-variant block mb-1">Card number</label>
                  <input placeholder="4242 4242 4242 4242" className="w-full border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary bg-surface-container-lowest" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium text-on-surface-variant block mb-1">Expiry</label><input placeholder="MM/YY" className="w-full border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary bg-surface-container-lowest" /></div>
                  <div><label className="text-xs font-medium text-on-surface-variant block mb-1">CVV</label><input placeholder="123" className="w-full border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary bg-surface-container-lowest" /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-ambient sticky top-20">
              <h2 className="font-semibold text-on-surface mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {cart.map(item => (
                  <div key={item.key} className="flex gap-3 items-start">
                    <img src={item.images[item.defaultColor] || Object.values(item.images)[0]} alt="" className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-on-surface line-clamp-1">{item.name}</p>
                      <p className="text-xs text-on-surface-variant">Qty: {item.qty}</p>
                    </div>
                    <span className="text-xs font-bold text-on-surface shrink-0">£{(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-outline-variant/20 pt-3 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Subtotal</span><span className="font-semibold">£{cartTotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Delivery</span><span className="font-semibold text-green-600">{form.delivery === 'standard' ? 'Free' : '£5.99'}</span></div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-outline-variant/20"><span>Total</span><span className="text-primary">£{(cartTotal + (form.delivery === 'express' ? 5.99 : 0)).toFixed(2)}</span></div>
              </div>
              <button onClick={() => navigate('/order-success')} className="mt-4 w-full bg-primary text-white py-3.5 rounded-full font-semibold hover:opacity-90 active:scale-95 transition-all shadow-ambient">
                Place Order
              </button>
              <p className="text-[10px] text-on-surface-variant text-center mt-2">🔒 Secure checkout. Your data is protected.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal } = useApp()
  const [promo, setPromo] = useState('')

  if (cart.length === 0) return (
    <div className="pt-16 min-h-screen flex items-center justify-center text-center">
      <div>
        <ShoppingBag size={56} className="text-outline-variant mx-auto mb-4" />
        <h2 className="font-display text-xl font-bold text-on-surface mb-2">Your cart is empty</h2>
        <p className="text-on-surface-variant text-sm mb-6">Add some beautiful products to get started</p>
        <Link to="/shop" className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:opacity-90">Shop Now</Link>
      </div>
    </div>
  )

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-display text-2xl font-bold text-on-surface mb-8">Your Cart ({cart.length})</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {cart.map(item => (
              <div key={item.key} className="bg-surface-container-lowest rounded-2xl p-4 shadow-ambient flex gap-4">
                <img src={item.images[item.defaultColor] || Object.values(item.images)[0]} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-on-surface mb-1 line-clamp-2">{item.name}</h3>
                  {item.selectedColor && <p className="text-xs text-on-surface-variant">Colour: <span className="inline-block w-3 h-3 rounded-full border" style={{ background: item.selectedColor }} /></p>}
                  {item.selectedLength && <p className="text-xs text-on-surface-variant">Length: {item.selectedLength}"</p>}
                  {item.selectedTexture && <p className="text-xs text-on-surface-variant">Texture: {item.selectedTexture}</p>}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 bg-surface-container rounded-xl">
                      <button onClick={() => updateQty(item.key, item.qty - 1)} className="w-7 h-7 flex items-center justify-center text-primary hover:bg-primary-fixed/30 rounded-xl"><Minus size={12} /></button>
                      <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)} className="w-7 h-7 flex items-center justify-center text-primary hover:bg-primary-fixed/30 rounded-xl"><Plus size={12} /></button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm text-on-surface">£{(item.price * item.qty).toFixed(2)}</span>
                      <button onClick={() => removeFromCart(item.key)} className="text-on-surface-variant hover:text-error transition-colors"><Trash2 size={15} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-ambient h-fit sticky top-20">
            <h2 className="font-semibold text-on-surface mb-4">Order Summary</h2>
            <div className="flex gap-2 mb-4">
              <input value={promo} onChange={e => setPromo(e.target.value)} placeholder="Promo / referral code" className="flex-1 border border-outline-variant/40 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary bg-surface-container-lowest" />
              <button className="bg-surface-container text-on-surface-variant px-3 py-2 rounded-xl text-xs font-semibold">Apply</button>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Subtotal</span><span className="font-semibold">£{cartTotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Referral Credit</span><span className="text-green-600 font-semibold">-£0.00</span></div>
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Delivery</span><span className="font-semibold text-green-600">Free</span></div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-outline-variant/20"><span>Total</span><span className="text-primary">£{cartTotal.toFixed(2)}</span></div>
            </div>
            <Link to="/checkout" className="block w-full text-center bg-primary text-white py-3.5 rounded-full font-semibold hover:opacity-90 active:scale-95 transition-all shadow-ambient">
              Proceed to Checkout
            </Link>
            <Link to="/shop" className="block text-center text-xs text-on-surface-variant mt-3 hover:text-primary transition-colors">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
