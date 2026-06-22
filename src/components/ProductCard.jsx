import { Link } from 'react-router-dom'
import { Heart, Star, ShoppingBag } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useApp()
  const wishlisted = isWishlisted(product.id)
  const mainImage = product.images[product.defaultColor] || Object.values(product.images)[0]

  return (
    <div className="luxury-card group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-ambient">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <img src={mainImage} alt={product.name} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500" />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">{product.badge}</span>
        )}
        {product.originalPrice && (
          <span className="absolute top-3 right-10 bg-error-container text-on-error-container text-[10px] font-semibold px-2 py-0.5 rounded-full">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}
        <button onClick={(e) => { e.preventDefault(); toggleWishlist(product) }}
          className="absolute top-3 right-3 w-8 h-8 bg-surface-container-lowest/80 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
          <Heart size={14} className={wishlisted ? 'fill-primary text-primary' : ''} />
        </button>
      </Link>
      <div className="p-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm text-on-surface mb-1 leading-snug line-clamp-2">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <Star size={11} className="fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-on-surface">{product.rating}</span>
          <span className="text-xs text-on-surface-variant">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-sm text-on-surface">£{product.price}</span>
            {product.originalPrice && <span className="text-xs text-on-surface-variant line-through">£{product.originalPrice}</span>}
          </div>
          <button onClick={() => addToCart(product, { color: product.defaultColor })}
            className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:opacity-90 active:scale-95 transition-all">
            <ShoppingBag size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}
