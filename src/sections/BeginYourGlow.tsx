import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, ShoppingCart, Sun } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const vitaminCProducts = [
  {
    id: 1,
    name: 'Vitamin C Face Wash | Vitamin C & Niacinamide',
    image: '/product-charcoal-wash.jpg',
    rating: 4.86,
    reviews: 157,
    price: 219,
    originalPrice: 259,
    discount: 15,
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'Vitamin C Sheet Mask (Pack of 3)',
    image: '/product-vitamin-c-serum.jpg',
    rating: 5.0,
    reviews: 1,
    price: 199,
    originalPrice: 525,
    discount: 62,
    badge: null,
  },
  {
    id: 3,
    name: 'Brightening Vitamin C Face Serum | Vitamin C & Hyaluronic Acid',
    image: '/product-vitamin-c-serum.jpg',
    rating: 4.79,
    reviews: 394,
    price: 399,
    originalPrice: 499,
    discount: 20,
    badge: 'Best Seller',
  },
  {
    id: 4,
    name: 'Skin Glow Combo',
    image: '/product-moisturizer.jpg',
    rating: 4.79,
    reviews: 43,
    price: 499,
    originalPrice: 758,
    discount: 34,
    badge: null,
  },
  {
    id: 5,
    name: 'Vitamin C Face Care Kit',
    image: '/product-sunscreen.jpg',
    rating: 4.8,
    reviews: 10,
    price: 599,
    originalPrice: 933,
    discount: 35,
    badge: 'Best Seller',
  },
  {
    id: 6,
    name: 'Vitamin C Instant Glow Kit',
    image: '/product-charcoal-scrub.jpg',
    rating: 5.0,
    reviews: 1,
    price: 299,
    originalPrice: 434,
    discount: 31,
    badge: 'Best Seller',
  },
]

export default function BeginYourGlow() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.glow-product', { opacity: 0, y: 50 })
      gsap.set('.glow-title', { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.glow-title', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out'
          })
          gsap.to('.glow-product', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.2
          })
        },
        once: true
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="glow-title section-title mb-1">Begin Your Glow</h2>
              <p className="text-dark-light text-sm">Vitamin C Collection for Radiant Skin</p>
            </div>
          </div>
          
          <a href="#vitamin-c" className="text-sm font-medium text-gold hover:underline">
            View all
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vitaminCProducts.map((product, index) => (
            <div
              key={product.id}
              className="glow-product product-card group bg-white rounded-xl overflow-hidden shadow-product hover:shadow-product-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                {product.badge && (
                  <span className="badge bg-gradient-to-r from-orange-500 to-amber-500">
                    {product.badge}
                  </span>
                )}
                {product.discount && (
                  <span className="absolute top-3 right-3 discount-badge">
                    {product.discount}% off
                  </span>
                )}
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Quick Add Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-orange-600 hover:to-amber-600 transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="rating-stars flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-sm font-medium text-dark">{product.rating}</span>
                  </div>
                  <span className="text-xs text-dark-light">| {product.reviews} Reviews</span>
                </div>
                
                {/* Name */}
                <h3 className="text-sm font-medium text-dark mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
                  {product.name}
                </h3>
                
                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="price">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="price-original">₹{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
