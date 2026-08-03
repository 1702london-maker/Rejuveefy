import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle,
  CreditCard,
  Heart,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react'
import { fetchProduct, fetchProducts, subscribeNewsletter } from '../lib/db'
import { useApp } from '../context/AppContext'

const categories = [
  { id: 'hair-care', label: 'Hair Care' },
  { id: 'hair-bundles', label: 'Hair Bundles' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'lashes', label: 'Lashes' },
  { id: 'skin-care', label: 'Skin Care' },
  { id: 'makeup', label: 'Makeup' },
]

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    if (!email) return
    try {
      await subscribeNewsletter(email)
      setDone(true)
      setEmail('')
    } catch {}
  }

  if (done) return <p className="text-green-600 text-sm font-semibold">You are subscribed.</p>

  return (
    <form onSubmit={handle} className="flex gap-2">
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter your email"
        className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 transition-colors" />
      <button className="bg-pink-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-pink-600 transition-colors whitespace-nowrap">Subscribe</button>
    </form>
  )
}

function Stars({ val = 0, size = 12 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={size} className={i <= Math.round(Number(val) || 0) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
      ))}
    </div>
  )
}

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, inWishlist } = useApp()

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden card-hover group">
      <div className="relative aspect-square bg-gray-50">
        <Link to={`/product/${product.id}`}>
          <img src={product.image_url || product.image} alt={product.name} className="w-full h-full object-cover" />
        </Link>
        {product.is_featured && (
          <span className="absolute top-2 left-2 bg-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">FEATURED</span>
        )}
        <button onClick={() => toggleWishlist(product)}
          className={`absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm transition-colors
            ${inWishlist(product.id) ? 'text-pink-500' : 'text-gray-300 hover:text-pink-400'}`}>
          <Heart size={13} className={inWishlist(product.id) ? 'fill-pink-500' : ''} />
        </button>
      </div>
      <div className="p-3">
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{product.category}</p>
        <Link to={`/product/${product.id}`} className="text-xs font-medium text-gray-800 line-clamp-2 mb-1.5 mt-0.5 block hover:text-pink-500">
          {product.name}
        </Link>
        <div className="flex items-center gap-1">
          <Stars val={product.rating} size={10} />
          <span className="text-[10px] text-gray-400">({product.review_count || 0})</span>
        </div>
        <div className="flex items-baseline gap-1.5 mt-1.5 mb-2">
          <span className="text-sm font-bold text-gray-900">GBP {Number(product.price || 0).toFixed(2)}</span>
          {product.compare_price && <span className="text-[10px] text-gray-400 line-through">GBP {Number(product.compare_price).toFixed(2)}</span>}
        </div>
        <button onClick={() => addToCart(product)}
          className="w-full flex items-center justify-center gap-1.5 bg-pink-500 text-white text-[10px] font-semibold py-1.5 rounded-full hover:bg-pink-600 transition-colors">
          <ShoppingBag size={10} /> Add to Cart
        </button>
      </div>
    </div>
  )
}

function EmptyProducts({ category }) {
  return (
    <div className="col-span-full bg-white border border-dashed border-pink-200 rounded-2xl p-8 text-center">
      <ShoppingBag size={34} className="text-pink-400 mx-auto mb-3" />
      <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Products are being prepared</h2>
      <p className="text-sm text-gray-500 max-w-xl mx-auto">
        {category ? 'This category will show active products once they are connected in Supabase.' : 'The shop will show real active products once they are connected in Supabase.'}
      </p>
    </div>
  )
}

export default function Shop() {
  const { category } = useParams()
  const [sp] = useSearchParams()
  const [query, setQuery] = useState(sp.get('q') || '')
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts({ category: category || null, limit: 50 }).then(setProducts).catch(() => setProducts([]))
  }, [category])

  const filtered = useMemo(() => products.filter(product =>
    !query || product.name?.toLowerCase().includes(query.toLowerCase()) || product.category?.toLowerCase().includes(query.toLowerCase())
  ), [products, query])

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 grid lg:grid-cols-2 gap-8 items-center py-10 min-h-[320px]">
          <div>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
              Rejuveefy Shop
            </h1>
            <p className="text-sm text-gray-500 mb-5">
              Curated beauty products will appear here when active products are connected from Supabase.
            </p>
            <div className="flex gap-3">
              <Link to="/shop" className="bg-pink-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors">All Products</Link>
              <Link to="/wishlist" className="border border-pink-500 text-pink-500 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-50 transition-colors">Wishlist</Link>
            </div>
            <div className="flex flex-wrap gap-5 mt-5">
              {['Real product catalogue', 'Secure checkout flow', 'Account-based orders'].map(t => (
                <div key={t} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <ShieldCheck size={13} className="text-pink-400" /> {t}
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex justify-center relative">
            <div className="w-64 h-48 bg-pink-50 rounded-2xl flex items-center justify-center overflow-hidden">
              <img src="/assets/hair-product.png" alt="Rejuveefy products" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-4">
          <div className="flex gap-3 overflow-x-auto pb-1">
            <Link to="/shop"
              className={`px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-colors shrink-0
                ${!category ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-500'}`}>
              All Products
            </Link>
            {categories.map((c) => (
              <Link key={c.id} to={`/shop/${c.id}`}
                className={`px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-colors shrink-0
                  ${category === c.id ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-500'}`}>
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="font-display text-xl font-bold text-gray-900">{category ? category.replace(/-/g, ' ') : 'Products'}</h2>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <Search size={14} className="text-gray-400" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products"
              className="bg-transparent text-sm outline-none w-full sm:w-56" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
          {filtered.length === 0 && <EmptyProducts category={category} />}
        </div>
      </section>

      <section className="bg-gray-50 border-t border-gray-100 py-6">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: ShieldCheck, title: 'Authentic Catalogue', sub: 'Products are managed from Supabase' },
            { icon: RotateCcw, title: 'Returns Flow', sub: 'Policy details available before launch' },
            { icon: Truck, title: 'Delivery Setup', sub: 'Shipping rules can connect at checkout' },
            { icon: CreditCard, title: 'Secure Payments', sub: 'Checkout wiring can connect to payments' },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center shrink-0">
                <Icon size={20} className="text-pink-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800">{title}</p>
                <p className="text-[10px] text-gray-400">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Join the Rejuveefy Community</h2>
            <p className="text-sm text-gray-500 mb-4">Get product updates and beauty tips directly to your inbox.</p>
            <NewsletterForm />
          </div>
          <div className="bg-pink-50 border border-pink-100 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-800 mb-2">Want to sell through Rejuveefy?</h3>
            <p className="text-sm text-gray-500 mb-4">Provider and partner flows are reviewed before anything goes live.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-pink-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors">
              Contact Us <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export function ShopCategory() {
  return <Shop />
}

export function ProductDetail() {
  const { id } = useParams()
  const { addToCart, toggleWishlist, inWishlist } = useApp()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduct(id)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" /></div>
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Product not found</h1>
          <p className="text-sm text-gray-500 mb-5">This product may not be active yet.</p>
          <Link to="/shop" className="bg-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full">Back to Shop</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-5">
        <p className="text-xs text-gray-400 mb-5">
          <Link to="/" className="hover:text-pink-500">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/shop" className="hover:text-pink-500">Shop</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-600">{product.name}</span>
        </p>

        <div className="grid lg:grid-cols-[480px_1fr] gap-10">
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-3 relative">
              <img src={product.image_url || product.image} alt={product.name} className="w-full h-full object-cover" />
              {product.is_featured && (
                <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-lg">FEATURED</span>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{product.category}</p>
            <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-3">
              <Stars val={product.rating} size={14} />
              <span className="text-sm font-bold text-gray-700">{Number(product.rating || 0).toFixed(1)}</span>
              <span className="text-sm text-gray-400">({product.review_count || 0} reviews)</span>
            </div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-display text-3xl font-bold text-gray-900">GBP {Number(product.price || 0).toFixed(2)}</span>
              {product.compare_price && <span className="text-lg text-gray-400 line-through">GBP {Number(product.compare_price).toFixed(2)}</span>}
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">{product.description || 'Product details are being completed.'}</p>

            <div className="flex gap-3 mb-5">
              <button onClick={() => addToCart(product)}
                className="flex-1 bg-pink-500 text-white py-3 rounded-xl font-semibold text-sm hover:bg-pink-600 transition-colors flex items-center justify-center gap-2">
                <ShoppingBag size={16} /> Add to Cart
              </button>
              <button onClick={() => toggleWishlist(product)}
                className={`p-3 border rounded-xl transition-colors ${inWishlist(product.id) ? 'border-pink-500 bg-pink-50 text-pink-500' : 'border-gray-200 text-gray-400 hover:border-pink-300'}`}>
                <Heart size={18} className={inWishlist(product.id) ? 'fill-pink-500' : ''} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: ShieldCheck, label: 'Catalogue Product', sub: 'Managed in Supabase' },
                { icon: RotateCcw, label: 'Returns Policy', sub: 'Confirm before launch' },
                { icon: Truck, label: 'Delivery Setup', sub: 'Connect shipping rules' },
                { icon: CreditCard, label: 'Checkout Ready', sub: 'Payment provider pending' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-2 p-2 bg-white border border-gray-100 rounded-xl">
                  <div className="w-7 h-7 bg-pink-50 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-pink-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-800">{label}</p>
                    <p className="text-[9px] text-gray-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-10 border-t border-gray-100 pt-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Product Information</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{product.description || 'Product information will appear here once completed.'}</p>
          {product.ingredients && (
            <>
              <h3 className="text-sm font-semibold text-gray-900 mt-5 mb-2">Ingredients</h3>
              <p className="text-sm text-gray-600">{product.ingredients}</p>
            </>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-5">
            <CheckCircle size={15} className="text-pink-500" />
            Reviews and Q&A will appear after real customer activity.
          </div>
        </section>
      </div>
    </div>
  )
}
