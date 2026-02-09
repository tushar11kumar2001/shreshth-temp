import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, ShoppingCart } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    id: 1,
    name: 'Sunscreen Gel SPF 50 PA+++',
    image: '/product-sunscreen.jpg',
    rating: 4.86,
    price: 399,
    originalPrice: 499,
    discount: 20,
  },
  {
    id: 2,
    name: 'Vitamin C Face Serum',
    image: '/product-vitamin-c-serum.jpg',
    rating: 4.79,
    price: 399,
    originalPrice: 499,
    discount: 20,
  },
  {
    id: 3,
    name: 'Derma Roller',
    image: '/product-derma-roller.jpg',
    rating: 4.68,
    price: 459,
    originalPrice: null,
    discount: null,
  },
  {
    id: 4,
    name: 'Charcoal Face Scrub',
    image: '/product-charcoal-scrub.jpg',
    rating: 4.63,
    price: 299,
    originalPrice: 349,
    discount: 14,
  },
  {
    id: 5,
    name: 'Eau De Parfum | Intense',
    image: '/product-perfume-intense.jpg',
    rating: 4.81,
    price: 549,
    originalPrice: 1299,
    discount: 57,
  },
]

export default function GroomFluencer() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.fluencer-product', { opacity: 0, rotateY: 45 })
      gsap.set('.fluencer-title', { opacity: 0, y: 30 })
      gsap.set('.discount-text', { opacity: 0, scale: 0.8 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.to('.fluencer-title', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out'
          })
          gsap.to('.discount-text', {
            opacity: 0.05,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2
          })
          gsap.to('.fluencer-product', {
            opacity: 1,
            rotateY: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.3
          })
        },
        once: true
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-dark relative overflow-hidden">
      {/* Large Background Text */}
      <div className="discount-text absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[200px] font-bold text-white opacity-5">20% OFF</span>
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="fluencer-title text-3xl md:text-4xl font-bold text-white mb-2">
            Our Groom-Fluencer
          </h2>
          <p className="text-gold text-lg font-medium">Exclusive 20% OFF</p>
        </div>

        {/* Products Carousel */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {products.map((product, index) => (
            <div
              key={product.id}
              className="fluencer-product group flex-shrink-0 w-64 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
              style={{ 
                perspective: '1000px',
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                {product.discount && (
                  <span className="absolute top-3 right-3 bg-gold text-dark text-xs font-bold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Quick Add */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full bg-gold text-dark py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-white transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <span className="text-white text-sm font-medium">{product.rating}</span>
                </div>
                <h3 className="text-white font-medium text-sm mb-2 line-clamp-2 group-hover:text-gold transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-white">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((dot) => (
            <button
              key={dot}
              className={`w-2 h-2 rounded-full transition-all ${
                dot === 0 ? 'bg-gold w-6' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
