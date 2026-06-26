import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, Tag, ShieldCheck, Truck, RotateCcw, ArrowLeft, CreditCard, CheckCircle, ShoppingBag } from 'lucide-react'
import { useApp } from '../context/AppContext'

// ── CART PAGE ─────────────────────────────────────────────────────────────────
export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal, cartCount, showToast } = useApp()
  const navigate = useNavigate()
  const [coupon, setCoupon] = useState('')
  const [applied, setApplied] = useState(false)
  const discount = applied ? cartTotal * 0.1 : 0
  const shipping = cartTotal > 30 ? 0 : 3.99
  const total = cartTotal - discount + shipping

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'BEAUTY15') { setApplied(true); showToast('Coupon applied! 10% off.') }
    else showToast('Invalid coupon code', 'info')
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-20 px-4">
        <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={36} className="text-pink-300" />
        </div>
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">Looks like you haven't added anything yet.<br/>Start shopping our beautiful products.</p>
        <Link to="/shop" className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
        <p className="text-xs text-gray-400 mb-4">
          <Link to="/" className="hover:text-pink-500">Home</Link> ›
          <Link to="/shop" className="hover:text-pink-500 mx-1">Shop</Link> ›
          <span> Cart</span>
        </p>

        <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Your Shopping Cart <span className="text-base font-medium text-gray-400">({cartCount} items)</span></h1>

        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          {/* Cart items */}
          <div className="space-y-3">
            {/* Trust bar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card px-5 py-3 flex flex-wrap gap-4">
              {[
                { icon: <ShieldCheck size={14} className="text-pink-500" />, label: '100% Authentic Products' },
                { icon: <RotateCcw size={14} className="text-pink-500" />, label: '30-Day Easy Returns' },
                { icon: <Truck size={14} className="text-pink-500" />, label: 'Free Delivery over £30' },
              ].map(t => (
                <div key={t.label} className="flex items-center gap-1.5 text-xs text-gray-600">{t.icon} {t.label}</div>
              ))}
            </div>

            {/* Free shipping progress */}
            {cartTotal < 30 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card px-5 py-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-gray-600">Add <strong className="text-pink-500">£{(30 - cartTotal).toFixed(2)}</strong> more for free shipping</span>
                  <span className="text-gray-400">{Math.round((cartTotal / 30) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full transition-all" style={{ width: `${Math.min((cartTotal / 30) * 100, 100)}%` }} />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
              <div className="p-5 border-b border-gray-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-900">Cart Items ({cartCount})</h2>
                  <button onClick={() => {}} className="text-xs text-pink-500 font-semibold">Save for Later</button>
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {cart.map((item) => (
                  <div key={item.id} className="p-5 flex gap-4">
                    <Link to={`/product/${item.id}`} className="shrink-0">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">{item.brand}</p>
                      <Link to={`/product/${item.id}`} className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-pink-500">{item.name}</Link>
                      {item.selectedSize && <p className="text-xs text-gray-400 mt-0.5">Size: {item.selectedSize}</p>}
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                          <button onClick={() => updateQty(item.id, item.qty - 1)}
                            className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors text-gray-600">
                            <Minus size={12} />
                          </button>
                          <span className="px-3 text-sm font-semibold text-gray-800 min-w-[2rem] text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)}
                            className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors text-gray-600">
                            <Plus size={12} />
                          </button>
                        </div>
                        <button onClick={() => { removeFromCart(item.id); showToast('Item removed from cart', 'info') }}
                          className="text-gray-400 hover:text-red-400 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-base font-bold text-gray-900">£{(item.price * item.qty).toFixed(2)}</p>
                      {item.qty > 1 && <p className="text-[10px] text-gray-400">£{item.price.toFixed(2)} each</p>}
                      {item.originalPrice && <p className="text-[10px] text-gray-400 line-through">£{(item.originalPrice * item.qty).toFixed(2)}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-gray-50 flex justify-between">
                <Link to="/shop" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-pink-500 transition-colors font-medium">
                  <ArrowLeft size={13} /> Continue Shopping
                </Link>
                <p className="text-sm font-semibold text-gray-800">Subtotal: <span className="text-pink-500">£{cartTotal.toFixed(2)}</span></p>
              </div>
            </div>

            {/* Coupon */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-3"><Tag size={15} className="text-pink-500" /> Have a Coupon?</h3>
              <div className="flex gap-2">
                <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Enter coupon code"
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400 transition-colors" />
                <button onClick={applyCoupon}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${applied ? 'bg-green-500 text-white' : 'bg-pink-500 text-white hover:bg-pink-600'}`}>
                  {applied ? <CheckCircle size={16} /> : 'Apply'}
                </button>
              </div>
              {applied && <p className="text-xs text-green-600 font-semibold mt-2 flex items-center gap-1"><CheckCircle size={11} /> Coupon "BEAUTY15" applied — 10% off!</p>}
            </div>

            {/* Recently viewed */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">You May Also Like</h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { name: 'Kérastase Elixir Ultime', brand: 'Kérastase', price: 38.00, img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=150&h=150&fit=crop' },
                  { name: 'Olaplex No.6 Bond Smoother', brand: 'Olaplex', price: 28.50, img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=150&h=150&fit=crop' },
                  { name: 'Moroccanoil Conditioner', brand: 'Moroccanoil', price: 22.00, img: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=150&h=150&fit=crop' },
                  { name: 'The Ordinary Serum', brand: 'The Ordinary', price: 6.50, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=150&h=150&fit=crop' },
                ].map(p => (
                  <Link key={p.name} to="/shop" className="group">
                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-2">
                      <img src={p.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase">{p.brand}</p>
                    <p className="text-xs text-gray-700 line-clamp-2 mt-0.5">{p.name}</p>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">£{p.price.toFixed(2)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <aside className="sticky top-24 self-start space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal ({cartCount} items)</span><span className="font-semibold">£{cartTotal.toFixed(2)}</span></div>
                {applied && <div className="flex justify-between text-green-600"><span>Discount (10%)</span><span>- £{discount.toFixed(2)}</span></div>}
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-500 font-semibold' : 'font-semibold'}>{shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-gray-100 pt-2.5 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span className="text-pink-500 text-xl">£{total.toFixed(2)}</span>
                </div>
              </div>

              <button onClick={() => navigate('/checkout')}
                className="w-full mt-4 bg-pink-500 text-white py-3.5 rounded-full font-semibold hover:bg-pink-600 transition-colors text-sm">
                Proceed to Checkout →
              </button>

              <p className="text-[10px] text-gray-400 text-center mt-3 flex items-center justify-center gap-1">
                <ShieldCheck size={12} className="text-pink-400" /> Secured by Stripe · SSL encrypted
              </p>

              {/* Payment logos */}
              <div className="flex justify-center gap-2 mt-3">
                {['VISA', 'MC', 'PP', 'APay'].map(p => (
                  <div key={p} className="bg-gray-100 rounded px-2 py-1 text-[9px] font-bold text-gray-500">{p}</div>
                ))}
              </div>
            </div>

            {/* Trust */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-2.5">
              {[
                { icon: <ShieldCheck size={14} className="text-pink-500" />, label: '100% Authentic', sub: 'Genuine brand products only' },
                { icon: <RotateCcw size={14} className="text-pink-500" />, label: '30-Day Returns', sub: 'Easy hassle-free returns' },
                { icon: <Truck size={14} className="text-pink-500" />, label: 'Fast Delivery', sub: '2–4 business days' },
                { icon: <CreditCard size={14} className="text-pink-500" />, label: 'Secure Payment', sub: 'Stripe-secured checkout' },
              ].map(t => (
                <div key={t.label} className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">{t.icon}</div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{t.label}</p>
                    <p className="text-[10px] text-gray-400">{t.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

// ── CHECKOUT PAGE ─────────────────────────────────────────────────────────────
export function Checkout() {
  const { cart, cartTotal, clearCart } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', phone: '',
    address: '', city: '', postcode: '', country: 'United Kingdom',
    cardName: '', cardNumber: '', expiry: '', cvv: '',
    saveCard: false, sameAsBilling: true,
  })

  const shipping = cartTotal > 30 ? 0 : 3.99
  const total = cartTotal + shipping

  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const steps = ['Shipping', 'Payment', 'Review & Pay']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[900px] mx-auto px-4 py-4">
          <div className="flex items-center gap-0">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`flex items-center gap-2 shrink-0 ${i + 1 <= step ? 'text-pink-500' : 'text-gray-400'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold
                    ${i + 1 < step ? 'bg-pink-500 text-white' : i + 1 === step ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                    {i + 1 < step ? '✓' : i + 1}
                  </div>
                  <span className="text-xs font-medium hidden sm:block">{s}</span>
                </div>
                {i < steps.length - 1 && <div className="flex-1 h-px bg-gray-200 mx-3" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 lg:px-6 py-6">
        <p className="text-xs text-gray-400 mb-4">
          <Link to="/" className="hover:text-pink-500">Home</Link> ›
          <Link to="/shop" className="hover:text-pink-500 mx-1">Shop</Link> ›
          <Link to="/cart" className="hover:text-pink-500 mx-1">Cart</Link> ›
          <span> Checkout</span>
        </p>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          {/* Form */}
          <div className="space-y-4">
            {/* Step 1: Shipping */}
            {step >= 1 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                  <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step > 1 ? 'bg-pink-500 text-white' : 'bg-pink-500 text-white'}`}>
                      {step > 1 ? '✓' : '1'}
                    </span>
                    Shipping Information
                  </h2>
                  {step > 1 && <button onClick={() => setStep(1)} className="text-xs text-pink-500 font-semibold">Edit</button>}
                </div>

                {step === 1 ? (
                  <div className="p-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">Email Address</label>
                        <input value={form.email} onChange={e => upd('email', e.target.value)} type="email" placeholder="jessica@example.com"
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">First Name</label>
                        <input value={form.firstName} onChange={e => upd('firstName', e.target.value)} placeholder="Jessica"
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">Last Name</label>
                        <input value={form.lastName} onChange={e => upd('lastName', e.target.value)} placeholder="Williams"
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">Phone Number</label>
                        <input value={form.phone} onChange={e => upd('phone', e.target.value)} placeholder="+44 7700 900000"
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">Country</label>
                        <select value={form.country} onChange={e => upd('country', e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400">
                          <option>United Kingdom</option>
                          <option>Ireland</option>
                          <option>United States</option>
                          <option>Canada</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">Street Address</label>
                        <input value={form.address} onChange={e => upd('address', e.target.value)} placeholder="24 Beauty Street"
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">City</label>
                        <input value={form.city} onChange={e => upd('city', e.target.value)} placeholder="London"
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">Postcode</label>
                        <input value={form.postcode} onChange={e => upd('postcode', e.target.value)} placeholder="SW1A 2AA"
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                      </div>
                    </div>
                    <button onClick={() => setStep(2)} className="w-full mt-5 bg-pink-500 text-white py-3 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors">
                      Continue to Payment →
                    </button>
                  </div>
                ) : (
                  <div className="px-5 py-3 text-sm text-gray-600 bg-gray-50/50">
                    {form.firstName} {form.lastName} · {form.address}, {form.city} {form.postcode} · {form.phone}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Payment */}
            {step >= 2 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                  <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step > 2 ? 'bg-pink-500 text-white' : 'bg-pink-500 text-white'}`}>
                      {step > 2 ? '✓' : '2'}
                    </span>
                    Payment Information
                  </h2>
                  {step > 2 && <button onClick={() => setStep(2)} className="text-xs text-pink-500 font-semibold">Edit</button>}
                </div>

                {step === 2 && (
                  <div className="p-5">
                    {/* Payment methods */}
                    <div className="flex gap-2 mb-4">
                      {['Credit/Debit Card', 'PayPal', 'Apple Pay'].map((m, i) => (
                        <button key={m} className={`flex-1 py-2 rounded-xl border text-xs font-medium transition-colors ${i === 0 ? 'border-pink-500 bg-pink-50 text-pink-500' : 'border-gray-200 text-gray-500 hover:border-pink-200'}`}>
                          {m}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">Cardholder Name</label>
                        <input value={form.cardName} onChange={e => upd('cardName', e.target.value)} placeholder="Jessica Williams"
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">Card Number</label>
                        <div className="relative">
                          <input value={form.cardNumber} onChange={e => upd('cardNumber', e.target.value)} placeholder="1234 5678 9012 3456" maxLength={19}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400 pr-16" />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 text-[9px] font-bold">
                            <span className="bg-blue-100 text-blue-600 px-1 rounded">VISA</span>
                            <span className="bg-red-100 text-red-600 px-1 rounded">MC</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-gray-600 mb-1 block">Expiry Date</label>
                          <input value={form.expiry} onChange={e => upd('expiry', e.target.value)} placeholder="MM / YY"
                            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-600 mb-1 block">CVV</label>
                          <input value={form.cvv} onChange={e => upd('cvv', e.target.value)} placeholder="•••" maxLength={4}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                        </div>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={form.saveCard} onChange={e => upd('saveCard', e.target.checked)} className="w-4 h-4 accent-pink-500 rounded" />
                        <span className="text-xs text-gray-600">Save card for future orders</span>
                      </label>
                    </div>

                    <div className="mt-4 p-3 bg-green-50 rounded-xl flex items-center gap-2 text-xs text-green-700">
                      <ShieldCheck size={14} className="text-green-500 shrink-0" />
                      Your payment info is encrypted and secured by Stripe
                    </div>

                    <button onClick={() => setStep(3)} className="w-full mt-4 bg-pink-500 text-white py-3 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors">
                      Review Your Order →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Review */}
            {step >= 3 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
                <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] font-bold">3</span>
                  Review & Place Order
                </h2>
                <div className="divide-y divide-gray-50 mb-5">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3 py-2.5">
                      <img src={item.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1 text-xs">
                        <p className="font-medium text-gray-800 line-clamp-1">{item.name}</p>
                        <p className="text-gray-400">Qty: {item.qty}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-800">£{(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <button onClick={() => { clearCart(); navigate('/order-success') }}
                  className="w-full bg-pink-500 text-white py-4 rounded-full font-bold text-sm hover:bg-pink-600 transition-colors flex items-center justify-center gap-2">
                  <ShieldCheck size={16} /> Place Order · £{total.toFixed(2)}
                </button>
                <p className="text-[10px] text-gray-400 text-center mt-2">
                  By placing this order you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            )}
          </div>

          {/* Order summary */}
          <aside className="sticky top-24 self-start">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-2">
                    <div className="relative">
                      <img src={item.image} alt="" className="w-10 h-10 object-cover rounded-lg" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{item.qty}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-700 line-clamp-1">{item.name}</p>
                    </div>
                    <p className="text-xs font-semibold text-gray-800 shrink-0">£{(item.price * item.qty).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span className="font-semibold text-gray-800">£{cartTotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-500"><span>Shipping</span><span className={`font-semibold ${shipping === 0 ? 'text-green-500' : 'text-gray-800'}`}>{shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-pink-500 text-xl">£{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

// ── ORDER SUCCESS ─────────────────────────────────────────────────────────────
export function OrderSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">Order Placed!</h1>
        <p className="text-sm text-gray-500 mb-2">Thank you for your order. We've sent a confirmation to your email.</p>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card px-5 py-4 mb-6 inline-block mx-auto">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Order Number</p>
          <p className="font-bold text-gray-900 tracking-wider text-lg">RJYF-240912-3847</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { n: '1', title: 'Order Confirmed', sub: 'We received your order' },
            { n: '2', title: 'Processing', sub: 'We\'re preparing it' },
            { n: '3', title: 'Out for Delivery', sub: 'On its way to you' },
            { n: '4', title: 'Delivered', sub: 'Enjoy your products!' },
          ].map(s => (
            <div key={s.n} className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-50">
              <div className="w-7 h-7 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-pink-500 text-xs font-bold">{s.n}</span>
              </div>
              <p className="text-xs font-semibold text-gray-800">{s.title}</p>
              <p className="text-[10px] text-gray-400">{s.sub}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/bookings" className="flex-1 bg-pink-500 text-white py-3 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors">Track Order</Link>
          <Link to="/shop" className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-full font-semibold text-sm hover:border-pink-300 hover:text-pink-500 transition-colors">Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}
