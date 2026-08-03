import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  Lock,
  Mail,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const money = (value) => `GBP ${Number(value || 0).toFixed(2)}`

function itemImage(item) {
  return item.image_url || item.image || '/assets/hair-product.png'
}

function OrderSummary({ cart, cartCount, cartTotal, shipping, total }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">Order Summary</h2>
      <div className="space-y-2 mb-4">
        {cart.map(item => (
          <div key={item.id} className="flex items-center gap-2">
            <div className="relative">
              <img src={itemImage(item)} alt={item.name} className="w-10 h-10 object-cover rounded-lg bg-gray-50" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{item.qty}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-700 line-clamp-1">{item.name}</p>
            </div>
            <p className="text-xs font-semibold text-gray-800 shrink-0">{money(item.price * item.qty)}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 pt-3 space-y-1.5 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal ({cartCount} items)</span>
          <span className="font-semibold text-gray-800">{money(cartTotal)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping</span>
          <span className="font-semibold text-gray-800">{shipping === 0 ? 'To confirm' : money(shipping)}</span>
        </div>
        <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
          <span>Total</span>
          <span className="text-pink-500 text-xl">{money(total)}</span>
        </div>
      </div>
    </div>
  )
}

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal, cartCount, showToast } = useApp()
  const navigate = useNavigate()
  const shipping = 0
  const total = cartTotal + shipping

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-20 px-4">
        <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={36} className="text-pink-300" />
        </div>
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">Products you add from the shop will appear here.</p>
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
          <Link to="/" className="hover:text-pink-500">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/shop" className="hover:text-pink-500">Shop</Link>
          <span className="mx-1">/</span>
          <span>Cart</span>
        </p>

        <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">
          Your Shopping Cart <span className="text-base font-medium text-gray-400">({cartCount} items)</span>
        </h1>

        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          <div className="space-y-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card px-5 py-3 flex flex-wrap gap-4">
              {[
                { icon: ShieldCheck, label: 'Real catalogue items' },
                { icon: Lock, label: 'Checkout setup in progress' },
                { icon: Truck, label: 'Shipping rules to confirm' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Icon size={14} className="text-pink-500" /> {label}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
              <div className="p-5 border-b border-gray-50">
                <h2 className="text-sm font-semibold text-gray-900">Cart Items ({cartCount})</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {cart.map((item) => (
                  <div key={item.id} className="p-5 flex gap-4">
                    <Link to={`/product/${item.id}`} className="shrink-0">
                      <img src={itemImage(item)} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-gray-50" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">{item.category || item.brand || 'Product'}</p>
                      <Link to={`/product/${item.id}`} className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-pink-500">{item.name}</Link>
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
                      <p className="text-base font-bold text-gray-900">{money(item.price * item.qty)}</p>
                      {item.qty > 1 && <p className="text-[10px] text-gray-400">{money(item.price)} each</p>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-gray-50 flex justify-between">
                <Link to="/shop" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-pink-500 transition-colors font-medium">
                  <ArrowLeft size={13} /> Continue Shopping
                </Link>
                <p className="text-sm font-semibold text-gray-800">Subtotal: <span className="text-pink-500">{money(cartTotal)}</span></p>
              </div>
            </div>
          </div>

          <aside className="sticky top-24 self-start space-y-4">
            <OrderSummary cart={cart} cartCount={cartCount} cartTotal={cartTotal} shipping={shipping} total={total} />
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <button onClick={() => navigate('/checkout')}
                className="w-full bg-pink-500 text-white py-3.5 rounded-full font-semibold hover:bg-pink-600 transition-colors text-sm flex items-center justify-center gap-2">
                Continue to Checkout <CreditCard size={15} />
              </button>
              <p className="text-[10px] text-gray-400 text-center mt-3">
                Payment collection will be enabled once the live checkout provider is connected.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export function Checkout() {
  const { cart, cartTotal, cartCount, user } = useApp()
  const [form, setForm] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    country: 'United Kingdom',
  })

  const shipping = 0
  const total = cartTotal + shipping
  const canReview = useMemo(() => (
    form.email && form.firstName && form.lastName && form.address && form.city && form.postcode
  ), [form])
  const upd = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-20 px-4 text-center">
        <ShoppingBag size={36} className="text-pink-300 mb-4" />
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Checkout is empty</h1>
        <p className="text-sm text-gray-500 mb-6">Add products from the shop before checkout.</p>
        <Link to="/shop" className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors">
          Go to Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[900px] mx-auto px-4 py-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="w-7 h-7 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs font-bold">1</span>
            <span className="font-semibold text-gray-900">Delivery details</span>
            <div className="flex-1 h-px bg-gray-200" />
            <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold">2</span>
            <span className="font-semibold text-gray-400">Payment</span>
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 lg:px-6 py-6">
        <p className="text-xs text-gray-400 mb-4">
          <Link to="/" className="hover:text-pink-500">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/cart" className="hover:text-pink-500">Cart</Link>
          <span className="mx-1">/</span>
          <span>Checkout</span>
        </p>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50">
                <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Mail size={15} className="text-pink-500" /> Contact and Delivery
                </h2>
              </div>
              <div className="p-5 grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Email Address</label>
                  <input value={form.email} onChange={e => upd('email', e.target.value)} type="email"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">First Name</label>
                  <input value={form.firstName} onChange={e => upd('firstName', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Last Name</label>
                  <input value={form.lastName} onChange={e => upd('lastName', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Phone Number</label>
                  <input value={form.phone} onChange={e => upd('phone', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Country</label>
                  <select value={form.country} onChange={e => upd('country', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400">
                    <option>United Kingdom</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Street Address</label>
                  <input value={form.address} onChange={e => upd('address', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">City</label>
                  <input value={form.city} onChange={e => upd('city', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Postcode</label>
                  <input value={form.postcode} onChange={e => upd('postcode', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-pink-400" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-2">
                <CreditCard size={15} className="text-pink-500" /> Payment
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Card and wallet payments are not enabled in this build yet. Connect the payment provider and orders table before accepting live payments.
              </p>
              <button disabled
                className="w-full bg-gray-200 text-gray-500 py-3 rounded-full font-semibold text-sm cursor-not-allowed">
                Payment Setup Required
              </button>
              {!canReview && <p className="text-xs text-gray-400 mt-3">Complete the delivery fields before payment is enabled.</p>}
            </div>
          </div>

          <OrderSummary cart={cart} cartCount={cartCount} cartTotal={cartTotal} shipping={shipping} total={total} />
        </div>
      </div>
    </div>
  )
}

export function OrderSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-pink-500" />
        </div>
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">Order Flow Pending</h1>
        <p className="text-sm text-gray-500 mb-6">
          This page will show confirmed order details after the live checkout and order records are connected.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/cart" className="flex-1 bg-pink-500 text-white py-3 rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors">Back to Cart</Link>
          <Link to="/shop" className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-full font-semibold text-sm hover:border-pink-300 hover:text-pink-500 transition-colors">Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}
