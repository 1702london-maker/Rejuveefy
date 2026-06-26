import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Search, Star, Heart, ShoppingBag, ChevronDown, SlidersHorizontal, ArrowRight, ShieldCheck, Truck, RotateCcw, CreditCard, ChevronLeft, ChevronRight, Plus, Minus, Check } from 'lucide-react'
import { products, shopCategories } from '../data/mockData'
import { useApp } from '../context/AppContext'

function Stars({ val = 5, size = 12 }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} className={i <= Math.round(val) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
      ))}
    </div>
  )
}

const promos = [
  { label: 'Flat 10% Off On Hair Care', sub: 'Limited time', btn: 'Shop Now', bg: 'from-pink-100 to-pink-50' },
  { label: 'Glow Up Sale Up to 25% Off', sub: 'On Skin Care', btn: 'Shop Now', bg: 'from-purple-100 to-purple-50' },
  { label: 'New Arrivals Just Landed!', sub: 'Shop the drop', btn: 'Explore Now', bg: 'from-amber-100 to-amber-50' },
]

// ── SHOP LANDING PAGE ─────────────────────────────────────────────────────────
export default function Shop() {
  const { category } = useParams()
  const [sp] = useSearchParams()
  const { addToCart, toggleWishlist, inWishlist } = useApp()
  const [promoIdx, setPromoIdx] = useState(0)

  const filtered = category
    ? products.filter(p => p.category === category)
    : products

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative bg-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 grid lg:grid-cols-2 gap-8 items-center py-10 min-h-[320px]">
          <div>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
              Everything You Need<br />for Healthy Beauty
            </h1>
            <p className="text-sm text-gray-500 mb-5">Shop 100% authentic beauty products from trusted brands. Delivered to your doorstep.</p>
            <div className="flex gap-3">
              <Link to="/shop" className="bg-pink-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors">Shop Now</Link>
              <Link to="/shop?sort=bestseller" className="border border-pink-500 text-pink-500 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-50 transition-colors">Best Sellers</Link>
            </div>
            <div className="flex gap-5 mt-5">
              {['100% Authentic', 'Easy Returns', 'Fast Delivery'].map(t => (
                <div key={t} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <ShieldCheck size={13} className="text-pink-400" /> {t}
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex justify-center relative">
            <div className="w-64 h-48 bg-pink-50 rounded-2xl flex items-center justify-center overflow-hidden">
              <img src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Carousel dots */}
        <div className="flex justify-center gap-1.5 pb-4">
          {[0,1,2].map(i => (
            <button key={i} onClick={() => setPromoIdx(i)}
              className={`w-2 h-2 rounded-full transition-colors ${promoIdx === i ? 'bg-pink-500' : 'bg-gray-200'}`} />
          ))}
        </div>
      </section>

      {/* Category pills */}
      <section className="border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-4">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {shopCategories.map((c) => (
              <Link key={c.id} to={c.id === 'view-all' ? '/shop' : `/shop/${c.id}`}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-colors shrink-0
                  ${category === c.id ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-500'}`}>
                <span>{c.icon}</span>
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promo banners */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
        <div className="grid grid-cols-3 gap-3">
          {promos.map((p, i) => (
            <div key={i} className={`bg-gradient-to-r ${p.bg} rounded-2xl p-5 relative overflow-hidden`}>
              <p className="text-sm font-bold text-gray-800 mb-0.5">{p.label}</p>
              <p className="text-xs text-gray-500 mb-3">{p.sub}</p>
              <button className="bg-pink-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-pink-600 transition-colors">{p.btn}</button>
              {i === 2 && <span className="absolute top-3 right-3 bg-pink-500 text-white text-[9px] font-bold px-2 py-1 rounded-full">NEW ARRIVAL</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold text-gray-900">Best Sellers</h2>
          <Link to="/shop" className="text-sm font-semibold text-pink-500 flex items-center gap-1 hover:gap-2 transition-all">
            View All Products <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden card-hover group">
              <div className="relative aspect-square bg-gray-50">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                {p.badge && (
                  <span className="absolute top-2 left-2 bg-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">{p.badge}</span>
                )}
                <button onClick={() => toggleWishlist(p)}
                  className={`absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm transition-colors
                    ${inWishlist(p.id) ? 'text-pink-500' : 'text-gray-300 hover:text-pink-400'}`}>
                  <Heart size={13} className={inWishlist(p.id) ? 'fill-pink-500' : ''} />
                </button>
              </div>
              <div className="p-3">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{p.brand}</p>
                <p className="text-xs font-medium text-gray-800 line-clamp-2 mb-1.5 mt-0.5">{p.name}</p>
                <Stars val={p.rating} size={10} />
                <div className="flex items-baseline gap-1.5 mt-1.5 mb-2">
                  <span className="text-sm font-bold text-gray-900">£{p.price.toFixed(2)}</span>
                  {p.originalPrice && <span className="text-[10px] text-gray-400 line-through">£{p.originalPrice.toFixed(2)}</span>}
                </div>
                <button onClick={() => addToCart(p)}
                  className="w-full flex items-center justify-center gap-1.5 bg-pink-500 text-white text-[10px] font-semibold py-1.5 rounded-full hover:bg-pink-600 transition-colors">
                  <ShoppingBag size={10} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-gray-50 border-t border-gray-100 py-6">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: <ShieldCheck size={20} className="text-pink-500" />, title: '100% Authentic Products', sub: 'Sourced directly from brands' },
            { icon: <RotateCcw size={20} className="text-pink-500" />, title: 'Easy Returns', sub: 'Return within 30 days' },
            { icon: <Truck size={20} className="text-pink-500" />, title: 'Fast & Reliable Delivery', sub: 'Orders over £30 free' },
            { icon: <CreditCard size={20} className="text-pink-500" />, title: 'Secure Payments', sub: 'Stripe-secured checkout' },
          ].map((t) => (
            <div key={t.title} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center shrink-0">{t.icon}</div>
              <div>
                <p className="text-xs font-semibold text-gray-800">{t.title}</p>
                <p className="text-[10px] text-gray-400">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join community */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Join the Rejuveefy Community</h2>
            <p className="text-sm text-gray-500 mb-4">Get exclusive offers, new product updates and beauty tips directly to your inbox.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your email"
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 transition-colors" />
              <button className="bg-pink-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-pink-600 transition-colors whitespace-nowrap">Subscribe</button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Download Our App</h3>
            <p className="text-sm text-gray-500 mb-3">Shop, book and track everything from the palm of your hand.</p>
            <div className="flex gap-2">
              {['App Store', 'Google Play'].map(s => (
                <button key={s} className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 hover:border-pink-300 transition-colors">
                  <span>{s === 'App Store' ? '🍎' : '▶'}</span>
                  <div className="text-left">
                    <p className="text-[9px] text-gray-400">Get it on</p>
                    <p className="text-xs font-semibold text-gray-800">{s}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// ── SHOP CATEGORY PAGE ────────────────────────────────────────────────────────
export function ShopCategory() {
  const { category } = useParams()
  const { addToCart, toggleWishlist, inWishlist } = useApp()
  const [sortBy, setSortBy] = useState('Best Seller')
  const [view, setView] = useState('grid')

  const cat = shopCategories.find(c => c.id === category) || { label: 'Hair Care' }
  const items = products.filter(p => p.category === category || !category)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-100 py-4">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <p className="text-xs text-gray-400 mb-1">
            <Link to="/" className="hover:text-pink-500">Home</Link> ›
            <Link to="/shop" className="hover:text-pink-500 mx-1">Shop</Link> ›
            <span> {cat.label}</span>
          </p>
          <h1 className="font-display text-xl font-bold text-gray-900">{cat.label}</h1>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
        <div className="grid lg:grid-cols-[220px_1fr] gap-6">
          {/* Filters */}
          <aside className="hidden lg:block">
            <div className="bg-white border border-gray-100 rounded-2xl p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-800">Filters</h3>
                <button className="text-xs text-pink-500">Clear</button>
              </div>
              {/* Brand */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Brand</h4>
                {['Kérastase', 'The Ordinary', 'Olaplex', 'Moroccanoil', 'La Roche-Posay', 'Laneige'].map(b => (
                  <label key={b} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-pink-500 rounded" />
                    <span className="text-sm text-gray-600">{b}</span>
                  </label>
                ))}
              </div>
              {/* Price */}
              <div className="border-t border-gray-100 pt-4 mb-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Price</h4>
                <input type="range" min={0} max={100} defaultValue={50} className="w-full" />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>£0</span><span>£100+</span></div>
              </div>
              {/* Rating */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Rating</h4>
                {['4★ & above', '3★ & above', '2★ & above'].map(r => (
                  <label key={r} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input type="radio" name="rating" className="w-4 h-4 accent-pink-500" />
                    <span className="text-sm text-gray-600">{r}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Products grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500"><strong className="text-gray-800">{items.length || products.length} products</strong> found</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Sort:</span>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  className="text-sm border border-gray-200 rounded-xl px-3 py-1.5 outline-none focus:border-pink-400">
                  <option>Best Seller</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Highest Rated</option>
                  <option>New Arrivals</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {(items.length ? items : products).map((p) => (
                <div key={p.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-card card-hover">
                  <div className="relative aspect-square bg-gray-50">
                    <Link to={`/product/${p.id}`}>
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </Link>
                    {p.badge && <span className="absolute top-2 left-2 bg-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">{p.badge}</span>}
                    <button onClick={() => toggleWishlist(p)}
                      className={`absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm
                        ${inWishlist(p.id) ? 'text-pink-500' : 'text-gray-300 hover:text-pink-400'}`}>
                      <Heart size={13} className={inWishlist(p.id) ? 'fill-pink-500' : ''} />
                    </button>
                  </div>
                  <div className="p-3">
                    <p className="text-[9px] font-bold text-gray-400 uppercase">{p.brand}</p>
                    <Link to={`/product/${p.id}`} className="text-xs font-medium text-gray-800 line-clamp-2 block mt-0.5 hover:text-pink-500">{p.name}</Link>
                    <div className="flex items-center gap-1 my-1">
                      <Stars val={p.rating} size={10} />
                      <span className="text-[9px] text-gray-400">({p.reviews})</span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-sm font-bold text-gray-900">£{p.price.toFixed(2)}</span>
                      {p.originalPrice && <span className="text-[10px] text-gray-400 line-through">£{p.originalPrice.toFixed(2)}</span>}
                    </div>
                    <button onClick={() => addToCart(p)}
                      className="w-full flex items-center justify-center gap-1 bg-pink-500 text-white text-[10px] font-semibold py-1.5 rounded-full hover:bg-pink-600 transition-colors">
                      <ShoppingBag size={10} /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 pb-12">
        <div className="bg-pink-50 rounded-2xl p-8 flex flex-col lg:flex-row items-center gap-6">
          <div>
            <p className="text-sm font-bold text-gray-800 mb-1">Beauty Delivered to You</p>
            <p className="text-xs text-gray-500">Free delivery on all orders over £30. Fast & tracked nationwide.</p>
          </div>
          <Link to="/shop" className="bg-pink-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors whitespace-nowrap ml-auto">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── PRODUCT DETAIL PAGE ───────────────────────────────────────────────────────
export function ProductDetail() {
  const { id } = useParams()
  const product = products.find(p => p.id === parseInt(id)) || products[0]
  const { addToCart, toggleWishlist, inWishlist } = useApp()
  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0])
  const [activeImg, setActiveImg] = useState(0)
  const [tab, setTab] = useState('Overview')

  const tabs = ['Overview', 'Ingredients', 'How to Use', `Reviews (${product.reviews})`, 'Q&A']

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-5">
        <p className="text-xs text-gray-400 mb-5">
          <Link to="/" className="hover:text-pink-500">Home</Link> ›
          <Link to="/shop" className="hover:text-pink-500 mx-1">Shop</Link> ›
          <Link to={`/shop/${product.category}`} className="hover:text-pink-500 mx-1 capitalize">{product.category.replace(/-/g,' ')}</Link> ›
          <span className="text-gray-600 mx-1">{product.name}</span>
        </p>

        <div className="grid lg:grid-cols-[480px_1fr] gap-10">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-3 relative">
              <img src={product.images?.[activeImg] || product.image} alt={product.name} className="w-full h-full object-cover" />
              {/* Sale badge */}
              {product.originalPrice && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2">
              {(product.images || [product.image]).map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${activeImg === i ? 'border-pink-500' : 'border-gray-200'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{product.brand}</p>
            <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <Stars val={product.rating} size={14} />
              <span className="text-sm font-bold text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-display text-3xl font-bold text-gray-900">£{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">£{product.originalPrice.toFixed(2)}</span>
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded">{Math.round((1-product.price/product.originalPrice)*100)}% OFF</span>
                </>
              )}
            </div>
            <p className="text-xs text-gray-500 mb-4">{product.desc}</p>

            {/* Size selector */}
            {product.sizes && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-800 mb-2">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button key={s} onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors
                        ${selectedSize === s ? 'border-pink-500 bg-pink-50 text-pink-500' : 'border-gray-200 text-gray-600 hover:border-pink-300'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + CTA */}
            <div className="flex gap-3 mb-5">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q-1))} className="px-3 py-2.5 hover:bg-gray-50 transition-colors text-gray-600">
                  <Minus size={14} />
                </button>
                <span className="px-4 text-sm font-semibold text-gray-800 min-w-[2rem] text-center">{qty}</span>
                <button onClick={() => setQty(q => q+1)} className="px-3 py-2.5 hover:bg-gray-50 transition-colors text-gray-600">
                  <Plus size={14} />
                </button>
              </div>
              <button onClick={() => addToCart({ ...product, qty })}
                className="flex-1 bg-pink-500 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-pink-600 transition-colors flex items-center justify-center gap-2">
                <ShoppingBag size={16} /> Add to Cart
              </button>
              <button onClick={() => toggleWishlist(product)}
                className={`p-2.5 border rounded-xl transition-colors ${inWishlist(product.id) ? 'border-pink-500 bg-pink-50 text-pink-500' : 'border-gray-200 text-gray-400 hover:border-pink-300'}`}>
                <Heart size={18} className={inWishlist(product.id) ? 'fill-pink-500' : ''} />
              </button>
            </div>

            {/* Buy now */}
            <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors mb-5">
              Buy Now
            </button>

            {/* Delivery */}
            <div className="bg-gray-50 rounded-xl p-3 mb-4 flex items-start gap-2">
              <Truck size={15} className="text-pink-500 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600">
                <strong>Extended Delivery</strong> — Free delivery on orders over £30. Estimated 2–4 business days.
              </p>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: <ShieldCheck size={14} className="text-pink-500" />, label: '100% Authentic', sub: 'Genuine brand product' },
                { icon: <RotateCcw size={14} className="text-pink-500" />, label: 'Easy Returns', sub: 'Return within 30 days' },
                { icon: <Truck size={14} className="text-pink-500" />, label: 'Fast Delivery', sub: '2–4 business days' },
                { icon: <CreditCard size={14} className="text-pink-500" />, label: 'Secure Payment', sub: 'Stripe-secured checkout' },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-2 p-2 bg-white border border-gray-100 rounded-xl">
                  <div className="w-7 h-7 bg-pink-50 rounded-lg flex items-center justify-center shrink-0">{t.icon}</div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-800">{t.label}</p>
                    <p className="text-[9px] text-gray-400">{t.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 border-b border-gray-100 overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t.split(' ')[0])}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                  ${tab === t.split(' ')[0] ? 'border-pink-500 text-pink-500' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="py-6 grid lg:grid-cols-[1fr_300px] gap-8">
          <div>
            {tab === 'Overview' && (
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">Product Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{product.desc}</p>
                {product.keyBenefits && (
                  <>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Key Benefits</h3>
                    <ul className="space-y-2">
                      {product.keyBenefits.map(b => (
                        <li key={b} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check size={14} className="text-pink-500 shrink-0" /> {b}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
            {tab === 'Ingredients' && (
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">Key Ingredients</h3>
                <p className="text-sm text-gray-600">{product.ingredients}</p>
              </div>
            )}
            {tab === 'How' && (
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">How to Use</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{product.howToUse}</p>
              </div>
            )}
            {tab === 'Reviews' && (
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="text-center">
                    <p className="font-display text-4xl font-bold text-gray-900">{product.rating}</p>
                    <Stars val={product.rating} size={16} />
                    <p className="text-xs text-gray-400 mt-1">{product.reviews.toLocaleString()} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5,4,3,2,1].map(n => (
                      <div key={n} className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-4">{n}</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: n===5?'78%':n===4?'15%':n===3?'5%':'2%' }} />
                        </div>
                        <span className="text-[10px] text-gray-400 w-8">{n===5?'78%':n===4?'15%':n===3?'5%':n===2?'1%':'1%'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Side trust */}
          <div className="space-y-2">
            {[
              { icon: '✓', title: '100% Authentic', sub: 'All products are genuine and directly sourced from authorised distributors.' },
              { icon: '↩', title: 'Easy Returns', sub: 'Not satisfied? Return within 30 days for a full refund, no questions asked.' },
              { icon: '🚚', title: 'Fast & Trusted Delivery', sub: 'Delivered in 2–4 business days with tracked courier service.' },
              { icon: '💬', title: 'Always Here', sub: 'Our beauty experts are here to help with any questions 7 days a week.' },
            ].map((t) => (
              <div key={t.title} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-7 h-7 bg-pink-100 rounded-lg flex items-center justify-center shrink-0 text-pink-500 text-sm font-bold">{t.icon}</div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">{t.title}</p>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{t.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* You may also like */}
        <div className="border-t border-gray-100 pt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">You May Also Like</h2>
            <Link to="/shop" className="text-sm text-pink-500 font-semibold flex items-center gap-1">View All <ArrowRight size={13} /></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {products.filter(p => p.id !== product.id).slice(0, 6).map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-card card-hover">
                <div className="aspect-square bg-gray-50">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-2">
                  <p className="text-[9px] font-bold text-gray-400 uppercase">{p.brand}</p>
                  <p className="text-xs text-gray-800 line-clamp-2 mt-0.5">{p.name}</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">£{p.price.toFixed(2)}</p>
                  <button onClick={e => { e.preventDefault(); addToCart(p) }}
                    className="w-full mt-1.5 bg-pink-500 text-white text-[9px] font-semibold py-1.5 rounded-full hover:bg-pink-600 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
