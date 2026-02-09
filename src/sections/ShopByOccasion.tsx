import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, ShoppingCart, PartyPopper, Heart, Briefcase, Sun, Dumbbell } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

type Product = {
  id: number
  name: string
  image: string
  rating: number
  reviews: number
  price: number
  originalPrice?: number
  discount?: number
  badge?: string | null
}
const occasions = [
  { id: 'party', name: 'Party Ready', icon: PartyPopper },
  { id: 'date', name: 'Date Ready', icon: Heart },
  { id: 'office', name: 'Office Ready', icon: Briefcase },
  { id: 'day', name: 'Day Ready', icon: Sun },
  { id: 'gym', name: 'Gym Ready', icon: Dumbbell },
]

const occasionProducts: Record<string, Product[]> = {
  party: [
    { id: 1, name: 'Eau De Toilette | Noir (100ml)', image: '/product-perfume-intense.jpg', rating: 4.58, reviews: 74, price: 1499, originalPrice: 2199, discount: 31, badge: 'Best Seller' },
    { id: 2, name: 'Party Starter Kit', image: '/product-perfume-blanc.jpg', rating: 4.6, reviews: 58, price: 899, originalPrice: 2598, discount: 65, badge: null },
    { id: 3, name: 'Body Perfume | Noir (120ml)', image: '/product-perfume-citron.jpg', rating: 4.75, reviews: 118, price: 299, originalPrice: 399, discount: 25, badge: null },
    { id: 4, name: 'Classic Daily Kit', image: '/product-charcoal-scrub.jpg', rating: 4.6, reviews: 40, price: 799, originalPrice: 2198, discount: 63, badge: null },
  ],
  date: [
    { id: 5, name: 'Eau De Parfum | Citron (100ml)', image: '/product-perfume-citron.jpg', rating: 4.84, reviews: 50, price: 899, originalPrice: 1499, discount: 40, badge: 'Best Seller' },
    { id: 6, name: 'Romance Kit', image: '/product-vitamin-c-serum.jpg', rating: 4.7, reviews: 32, price: 699, originalPrice: 1599, discount: 56, badge: null },
    { id: 7, name: 'Beard Oil | Natural Blend', image: '/product-beard-oil.jpg', rating: 4.71, reviews: 215, price: 349, originalPrice: 449, discount: 22, badge: 'Popular' },
    { id: 8, name: 'Date Night Set', image: '/product-moisturizer.jpg', rating: 4.65, reviews: 28, price: 549, originalPrice: 999, discount: 45, badge: null },
  ],
  office: [
    { id: 9, name: 'Eau De Toilette | Blanc (100ml)', image: '/product-perfume-blanc.jpg', rating: 4.83, reviews: 665, price: 899, originalPrice: 1799, discount: 50, badge: 'Best Seller' },
    { id: 10, name: 'Professional Grooming Kit', image: '/product-hair-wax.jpg', rating: 4.55, reviews: 45, price: 649, originalPrice: 1299, discount: 50, badge: null },
    { id: 11, name: 'Face Wash | Charcoal', image: '/product-charcoal-wash.jpg', rating: 4.53, reviews: 429, price: 299, originalPrice: 349, discount: 14, badge: null },
    { id: 12, name: 'Office Essentials', image: '/product-derma-roller.jpg', rating: 4.6, reviews: 38, price: 499, originalPrice: 899, discount: 44, badge: null },
  ],
  day: [
    { id: 13, name: 'Sunscreen Gel SPF 50', image: '/product-sunscreen.jpg', rating: 4.86, reviews: 36, price: 399, originalPrice: 499, discount: 20, badge: 'New Launch' },
    { id: 14, name: 'Day Care Combo', image: '/product-body-wash.jpg', rating: 4.62, reviews: 52, price: 449, originalPrice: 799, discount: 44, badge: null },
    { id: 15, name: 'Vitamin C Serum', image: '/product-vitamin-c-serum.jpg', rating: 4.79, reviews: 394, price: 399, originalPrice: 499, discount: 20, badge: 'Best Seller' },
    { id: 16, name: 'Daily Fresh Kit', image: '/product-charcoal-scrub.jpg', rating: 4.58, reviews: 67, price: 379, originalPrice: 699, discount: 46, badge: null },
  ],
  gym: [
    { id: 17, name: 'Body Wash | Aquatic', image: '/product-body-wash.jpg', rating: 4.58, reviews: 142, price: 249, originalPrice: 299, discount: 17, badge: null },
    { id: 18, name: 'Gym Fresh Kit', image: '/product-charcoal-wash.jpg', rating: 4.52, reviews: 89, price: 329, originalPrice: 599, discount: 45, badge: null },
    { id: 19, name: 'Hair Styling Pomade', image: '/product-hair-wax.jpg', rating: 4.62, reviews: 178, price: 279, originalPrice: 349, discount: 20, badge: null },
    { id: 20, name: 'Post-Workout Care', image: '/product-moisturizer.jpg', rating: 4.48, reviews: 56, price: 359, originalPrice: 649, discount: 45, badge: null },
  ],
}

export default function ShopByOccasion() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeOccasion, setActiveOccasion] = useState('party')

  const products = occasionProducts[activeOccasion] || occasionProducts.party

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.occasion-product', { opacity: 0, scale: 0.9 })
      gsap.set('.occasion-title', { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.occasion-title', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out'
          })
          gsap.to('.occasion-product', {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.2
          })
        },
        once: true
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [activeOccasion])

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="occasion-title section-title mb-2">Shop by Occasion</h2>
          <div className="w-20 h-1 bg-gold rounded-full mx-auto" />
        </div>

        {/* Occasion Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {occasions.map((occasion) => {
            const Icon = occasion.icon
            const isActive = activeOccasion === occasion.id
            return (
              <button
                key={occasion.id}
                onClick={() => setActiveOccasion(occasion.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-dark text-white shadow-lg'
                    : 'bg-gray-100 text-dark-light hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {occasion.name}
              </button>
            )
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="occasion-product product-card group bg-white rounded-xl overflow-hidden shadow-product hover:shadow-product-hover"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                {product.badge && (
                  <span className="badge">{product.badge}</span>
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
