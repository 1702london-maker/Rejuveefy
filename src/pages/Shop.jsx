import { useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { Search, SlidersHorizontal, Star, Heart, ShoppingBag, X } from 'lucide-react'
import { products, hairColors, hairLengths, hairTextures, categories } from '../data/mockData'
import ProductCard from '../components/ProductCard'
import { useApp } from '../context/AppContext'

// ── PRODUCT DETAIL ────────────────────────────────────────────────────────
export function ProductDetail() {
  const { id } = useParams()
  const product = products.find(p => p.id === parseInt(id)) || products[0]
  const { addToCart, toggleWishlist, isWishlisted, showToast } = useApp()
  const wishlisted = isWishlisted(product.id)

  const [selectedColor, setSelectedColor] = useState(product.defaultColor)
  const [selectedLength, setSelectedLength] = useState(18)
  const [selectedTexture, setSelectedTexture] = useState(hairTextures[0])
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [activeTab, setActiveTab] = useState('description')

  const needsVariants = ['wigs', 'bundles'].includes(product.category)
  const currentImage = product.images[selectedColor] || Object.values(product.images)[0]

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <Link to="/shop" className="text-sm text-on-surface-variant hover:text-primary mb-6 inline-block">← Back to Shop</Link>

        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Images */}
          <div>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-3 shadow-ambient">
              <img src={currentImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-2">
              {Object.values(product.images).map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-primary' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            {product.badge && <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">{product.badge}</span>}
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-on-surface mb-2">{product.name}</h1>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-outline-variant'} />)}</div>
              <span className="text-sm font-semibold text-on-surface">{product.rating}</span>
              <span className="text-sm text-on-surface-variant">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-display text-2xl font-bold text-on-surface">£{product.price}</span>
              {product.originalPrice && <span className="text-on-surface-variant line-through text-lg">£{product.originalPrice}</span>}
              {product.originalPrice && <span className="bg-error-container text-on-error-container text-xs px-2 py-0.5 rounded-full font-semibold">{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span>}
            </div>

            {/* Color Selector */}
            {needsVariants && (
              <div className="mb-5">
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2">
                  Colour — <span className="text-primary normal-case font-normal">{hairColors.find(c => c.hex === selectedColor)?.name || 'Select'}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {hairColors.slice(0, 14).map(c => (
                    <button key={c.hex} onClick={() => setSelectedColor(c.hex)} title={c.name}
                      className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 ${selectedColor === c.hex ? 'border-primary scale-110 ring-2 ring-primary ring-offset-1' : 'border-transparent'}`}
                      style={{ background: c.hex }} />
                  ))}
                </div>
              </div>
            )}

            {/* Length */}
            {needsVariants && (
              <div className="mb-5">
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2">Length — <span className="text-primary normal-case font-normal">{selectedLength}"</span></p>
                <div className="flex flex-wrap gap-2">
                  {hairLengths.map(l => (
                    <button key={l} onClick={() => setSelectedLength(l)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${selectedLength === l ? 'bg-primary text-white border-primary' : 'border-outline-variant/40 text-on-surface-variant hover:border-primary hover:text-primary'}`}>
                      {l}"
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Texture */}
            {needsVariants && (
              <div className="mb-5">
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-2">Texture — <span className="text-primary normal-case font-normal">{selectedTexture}</span></p>
                <div className="flex flex-wrap gap-2">
                  {hairTextures.map(t => (
                    <button key={t} onClick={() => setSelectedTexture(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${selectedTexture === t ? 'bg-primary text-white border-primary' : 'border-outline-variant/40 text-on-surface-variant hover:border-primary hover:text-primary'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty */}
            <div className="flex items-center gap-3 mb-5">
              <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">Quantity</p>
              <div className="flex items-center gap-2 bg-surface-container rounded-xl">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center text-lg font-semibold text-primary hover:bg-primary-fixed/30 rounded-xl transition-colors">−</button>
                <span className="w-8 text-center font-semibold text-sm text-on-surface">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-9 h-9 flex items-center justify-center text-lg font-semibold text-primary hover:bg-primary-fixed/30 rounded-xl transition-colors">+</button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-5">
              <span className="w-2 h-2 bg-green-500 rounded-full pulse-dot" />
              In stock — ships in 3-5 business days
            </div>

            <div className="flex gap-3 mb-6">
              <button onClick={() => addToCart(product, { color: selectedColor, length: selectedLength, texture: selectedTexture, qty })}
                className="flex-1 bg-primary text-white py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-ambient">
                <ShoppingBag size={16} /> Add to Cart
              </button>
              <button onClick={() => toggleWishlist(product)}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${wishlisted ? 'border-primary bg-primary-fixed text-primary' : 'border-outline-variant/40 text-on-surface-variant hover:border-primary'}`}>
                <Heart size={18} className={wishlisted ? 'fill-primary' : ''} />
              </button>
            </div>
            <button onClick={() => { addToCart(product, { color: selectedColor, length: selectedLength, texture: selectedTexture, qty }); }}
              className="w-full border-[1.5px] border-primary text-primary py-3 rounded-full font-semibold text-sm hover:bg-primary/5 transition-all">
              Buy Now
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface-container-low p-1 rounded-xl mb-6 w-fit">
          {['description', 'hair care', 'reviews'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-surface-container-lowest shadow-ambient text-primary' : 'text-on-surface-variant hover:text-primary'}`}>
              {tab}
            </button>
          ))}
        </div>
        {activeTab === 'description' && (
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient">
            <p className="text-on-surface-variant leading-relaxed">{product.description}</p>
          </div>
        )}
        {activeTab === 'hair care' && (
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient space-y-3">
            {['Wash gently with sulphate-free shampoo', 'Deep condition every 2-4 weeks', 'Air dry when possible — minimise heat', 'Detangle from ends to roots with a wide-tooth comb', 'Store in a satin bag when not wearing'].map(tip => (
              <div key={tip} className="flex items-center gap-2 text-sm text-on-surface-variant"><span className="text-primary">✓</span>{tip}</div>
            ))}
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {[{ name: 'Aisha M.', rating: 5, text: 'Absolutely stunning! The quality is exactly as described. Ships fast too.' }, { name: 'Tola B.', rating: 5, text: 'My third purchase from Rejuveefy. Always reliable and great quality.' }].map((r, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-2xl p-5 shadow-ambient">
                <div className="flex items-center justify-between mb-1"><span className="font-semibold text-sm">{r.name}</span></div>
                <div className="flex gap-0.5 mb-2">{[...Array(5)].map((_, j) => <Star key={j} size={12} className={j < r.rating ? 'fill-amber-400 text-amber-400' : 'text-outline-variant'} />)}</div>
                <p className="text-sm text-on-surface-variant">{r.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Related */}
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-on-surface mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {products.filter(p => p.id !== product.id).slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── MAIN SHOP ─────────────────────────────────────────────────────────────
export default function Shop() {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [sort, setSort] = useState('default')
  const [maxPrice, setMaxPrice] = useState(500)

  const catLabel = categories.find(c => c.id === category)?.label || 'All Products'

  let filtered = products.filter(p =>
    (!category || p.category === category) &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
    p.price <= maxPrice
  )
  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
  if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating)
  if (sort === 'new') filtered = [...filtered].reverse()

  return (
    <div className="pt-16 min-h-screen">
      {/* Shop Header */}
      <div className="bg-gradient-to-r from-primary-fixed/40 to-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl font-bold text-on-surface mb-2">{catLabel}</h1>
          <p className="text-on-surface-variant mb-6">Premium hair products delivered to your door</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          <Link to="/shop" className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${!category ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-primary-fixed/30'}`}>All</Link>
          {categories.map(cat => (
            <Link key={cat.id} to={`/shop/${cat.id}`} className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${category === cat.id ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-primary-fixed/30'}`}>
              {cat.icon} {cat.label}
            </Link>
          ))}
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap gap-3 items-center mb-6">
          <div className="flex items-center gap-2 flex-1 max-w-xs bg-surface-container-lowest rounded-xl px-4 py-2.5 border border-outline-variant/30 shadow-ambient">
            <Search size={15} className="text-on-surface-variant" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="flex-1 bg-transparent text-sm outline-none" />
            {search && <button onClick={() => setSearch('')}><X size={14} className="text-on-surface-variant" /></button>}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} className="border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary">
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Best Rated</option>
            <option value="new">Newest</option>
          </select>
          <div className="flex items-center gap-2 text-sm text-on-surface-variant">
            Max: <span className="font-semibold text-primary">£{maxPrice}</span>
            <input type="range" min={10} max={500} step={10} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-24" />
          </div>
          <span className="text-xs text-on-surface-variant ml-auto">{filtered.length} products</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        {filtered.length === 0 && <div className="text-center py-16 text-on-surface-variant">No products found.</div>}
      </div>
    </div>
  )
}
