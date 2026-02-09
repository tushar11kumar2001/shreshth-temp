import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const concerns = [
  { name: 'Oily Skin & Acne', image: '/product-charcoal-wash.jpg', color: 'from-blue-600/80 to-blue-800/80' },
  { name: 'Grey Hair', image: '/product-hair-wax.jpg', color: 'from-gray-600/80 to-gray-800/80' },
  { name: 'Dry Skin', image: '/product-moisturizer.jpg', color: 'from-amber-600/80 to-amber-800/80' },
  { name: 'Dark Lips', image: '/product-vitamin-c-serum.jpg', color: 'from-rose-600/80 to-rose-800/80' },
  { name: 'Dark Circle', image: '/product-derma-roller.jpg', color: 'from-purple-600/80 to-purple-800/80' },
  { name: 'Beard Growth', image: '/product-beard-oil.jpg', color: 'from-emerald-600/80 to-emerald-800/80' },
  { name: 'Tanned Skin', image: '/product-sunscreen.jpg', color: 'from-orange-600/80 to-orange-800/80' },
  { name: 'Ageing', image: '/product-perfume-intense.jpg', color: 'from-indigo-600/80 to-indigo-800/80' },
  { name: 'Black Heads', image: '/product-charcoal-scrub.jpg', color: 'from-slate-600/80 to-slate-800/80' },
  { name: 'Dry Hair', image: '/product-body-wash.jpg', color: 'from-cyan-600/80 to-cyan-800/80' },
]

export default function ShopByConcern() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.concern-card', { opacity: 0, scale: 0 })
      gsap.set('.concern-title', { opacity: 0, y: 20 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.concern-title', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out'
          })
          gsap.to('.concern-card', {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: 'back.out(1.7)'
          })
        },
        once: true
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="concerns" className="py-16 bg-gray-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="concern-title section-title mb-2">Shop by Concern</h2>
          <div className="w-20 h-1 bg-gold rounded-full mx-auto" />
        </div>

        {/* Concerns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {concerns.map((concern, index) => (
            <a
              key={concern.name}
              href={`#${concern.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="concern-card group relative aspect-square rounded-xl overflow-hidden"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              {/* Background Image */}
              <img
                src={concern.image}
                alt={concern.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${concern.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <h3 className="text-white font-semibold text-sm md:text-base mb-2 group-hover:scale-105 transition-transform">
                  {concern.name}
                </h3>
                <div className="flex items-center gap-1 text-white/80 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Shop Now</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
