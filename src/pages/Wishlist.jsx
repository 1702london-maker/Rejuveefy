import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Trash2, Star, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useApp()

  const wishlistProducts = wishlist

  const handleMoveToCart = (product) => {
    addToCart(product)
    removeFromWishlist(product.id)
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <Heart size={32} className="text-pink-300" />
        </div>
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h1>
        <p className="text-gray-500 mb-8 max-w-sm">Save products and services you love so you can find them easily later.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/shop" className="bg-pink-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-pink-600 transition-colors flex items-center gap-2">
            Browse Products <ArrowRight size={16} />
          </Link>
          <Link to="/providers" className="border border-pink-500 text-pink-500 font-semibold px-6 py-3 rounded-full hover:bg-pink-50 transition-colors">
            Find Providers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-10">
          <div className="flex items-center gap-3 mb-1">
            <Heart size={22} className="text-pink-500 fill-pink-500" />
            <h1 className="font-display text-3xl font-bold text-gray-900">My Wishlist</h1>
          </div>
          <p className="text-gray-500 text-sm">{wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} saved</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {wishlistProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-card transition-all">
              {/* Image */}
              <div className="relative">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors group/btn"
                >
                  <Trash2 size={14} className="text-gray-400 group-hover/btn:text-red-500 transition-colors" />
                </button>
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-xs text-gray-400 mb-1">{product.brand}</p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 hover:text-pink-500 transition-colors leading-snug">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11}
                        className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-gray-900">£{product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">£{product.originalPrice.toFixed(2)}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="flex-1 bg-pink-500 text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-pink-600 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag size={13} /> Add to Cart
                  </button>
                  <Link to={`/product/${product.id}`}
                    className="px-3 py-2.5 border border-gray-200 rounded-xl text-gray-500 hover:border-pink-300 hover:text-pink-500 transition-colors">
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-pink-500 to-rose-400 rounded-2xl p-8 text-white text-center">
          <h2 className="font-display text-2xl font-bold mb-2">Discover More Products</h2>
          <p className="text-pink-100 mb-5">Browse our full range of hair care, skin care and beauty essentials.</p>
          <Link to="/shop" className="inline-block bg-white text-pink-600 font-bold px-6 py-3 rounded-full hover:bg-pink-50 transition-colors">
            Shop All Products
          </Link>
        </div>
      </div>
    </div>
  )
}
