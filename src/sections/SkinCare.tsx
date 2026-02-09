import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const skinCareProducts = [
  {
    id: 1,
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
    id: 2,
    name: 'Sunscreen Gel SPF 50 PA+++ | Non-Comedogenic | Oil-Free',
    image: '/product-sunscreen.jpg',
    rating: 4.86,
    reviews: 36,
    price: 399,
    originalPrice: 499,
    discount: 20,
    badge: 'New Launch',
  },
  {
    id: 3,
    name: 'Charcoal Face Wash | Charcoal & Ylang Ylang',
    image: '/product-charcoal-wash.jpg',
    rating: 4.53,
    reviews: 429,
    price: 299,
    originalPrice: 349,
    discount: 14,
    badge: null,
  },
  {
    id: 4,
    name: 'Charcoal Face Scrub | Charcoal & Eucalyptus',
    image: '/product-charcoal-scrub.jpg',
    rating: 4.63,
    reviews: 375,
    price: 299,
    originalPrice: 349,
    discount: 14,
    badge: null,
  },
  {
    id: 5,
    name: 'Moisturising Cream | Shea Butter And Vitamin E',
    image: '/product-moisturizer.jpg',
    rating: 4.74,
    reviews: 158,
    price: 309,
    originalPrice: 349,
    discount: 11,
    badge: 'Popular',
  },
  {
    id: 6,
    name: 'Derma Roller | For Beard & Hair Growth',
    image: '/product-derma-roller.jpg',
    rating: 4.68,
    reviews: 90,
    price: 459,
    originalPrice: null,
    discount: null,
    badge: 'New Launch',
  },
]

export default function SkinCare() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.skincare-card', { opacity: 0, y: 40 })
      gsap.set('.skincare-title', { opacity: 0, x: -60 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.skincare-title', {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power3.out'
          })
          gsap.to('.skincare-card', {
            opacity: 1,
            y: 0,
            duration: 0.5,
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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section ref={sectionRef} id="skincare" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="skincare-title section-title mb-2">Skin Care</h2>
            <div className="w-20 h-1 bg-gold rounded-full" />
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#all-skincare" className="text-sm font-medium text-gold hover:underline">
              View all
            </a>
            <div className="flex gap-2">
              <button 
                onClick={() => scroll('left')}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {skinCareProducts.map((product, index) => (
            <div
              key={product.id}
              className="skincare-card product-card group bg-white rounded-xl overflow-hidden shadow-product hover:shadow-product-hover flex-shrink-0 w-72 snap-start"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                {product.badge && (
                  <span className={`badge ${product.badge === 'New Launch' ? 'bg-green-600' : ''}`}>
                    {product.badge}
                  </span>
                )}
                {product.discount && (
                  <span className="absolute top-3 right-3 discount-badge">
                    {product.discount}% off
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Quick Add Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full bg-dark text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-dark-light transition-colors">
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
                <h3 className="text-sm font-medium text-dark mb-2 line-clamp-2 group-hover:text-gold transition-colors">
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
