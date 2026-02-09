import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, Quote, CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    id: 1,
    name: 'Rahul Mehta',
    avatar: 'R',
    rating: 5,
    verified: true,
    text: "I've tried multiple face washes, but this one actually controls oil without drying my skin. My face feels fresh and clean all day.",
    product: 'Charcoal Cleansing Kit',
    productImage: '/product-charcoal-wash.jpg',
  },
  {
    id: 2,
    name: 'Arjun Kapoor',
    avatar: 'A',
    rating: 5,
    verified: true,
    text: "The fragrance is subtle yet long-lasting. I've received compliments at work and on evenings out—definitely my go-to scent now.",
    product: 'Eau De Toilette | Blanc (100ml)',
    productImage: '/product-perfume-blanc.jpg',
  },
  {
    id: 3,
    name: 'Nikhil Verma',
    avatar: 'N',
    rating: 5,
    verified: true,
    text: "My beard feels softer and looks healthier within a week of use. No itchiness, no greasiness—just a well-groomed beard.",
    product: 'Beard Growth Pair',
    productImage: '/product-beard-oil.jpg',
  },
  {
    id: 4,
    name: 'Vikram Singh',
    avatar: 'V',
    rating: 5,
    verified: true,
    text: "The Vitamin C serum has transformed my skin. Dark spots have faded and my complexion is so much brighter. Highly recommend!",
    product: 'Vitamin C Face Serum',
    productImage: '/product-vitamin-c-serum.jpg',
  },
  {
    id: 5,
    name: 'Aditya Sharma',
    avatar: 'A',
    rating: 5,
    verified: true,
    text: "Finally found a sunscreen that doesn't feel greasy! The gel formula is perfect for my oily skin. Will definitely repurchase.",
    product: 'Sunscreen Gel SPF 50',
    productImage: '/product-sunscreen.jpg',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.testimonial-card', { opacity: 0, x: 50 })
      gsap.set('.testimonial-title', { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.testimonial-title', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out'
          })
          gsap.to('.testimonial-card', {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
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
    <section ref={sectionRef} className="py-16 bg-gray-light/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="testimonial-title section-title mb-2">Why 2M+ Customers Love Us</h2>
          <div className="w-20 h-1 bg-gold rounded-full mx-auto" />
        </div>

        {/* Testimonials Marquee */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-light/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-light/30 to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling Container */}
          <div className="flex gap-6 animate-marquee hover:pause">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="testimonial-card flex-shrink-0 w-80 bg-white rounded-2xl p-6 shadow-product"
              >
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-gold/30 mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                
                {/* Text */}
                <p className="text-dark-light text-sm mb-6 line-clamp-4">
                  "{testimonial.text}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-dark text-white rounded-full flex items-center justify-center font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-dark">{testimonial.name}</span>
                      {testimonial.verified && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <span className="text-xs text-dark-light">Verified Buyer</span>
                  </div>
                </div>
                
                {/* Product */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img
                    src={testimonial.productImage}
                    alt={testimonial.product}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <span className="text-xs text-dark-light line-clamp-2">{testimonial.product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
