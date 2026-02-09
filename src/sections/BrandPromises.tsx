import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, Leaf, Heart, Truck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const promises = [
  {
    icon: Shield,
    title: 'Premium Quality',
    description: 'Crafted with the finest ingredients for superior results',
  },
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'Free from harmful chemicals like SLS and parabens',
  },
  {
    icon: Heart,
    title: 'Cruelty Free',
    description: 'Never tested on animals, 100% vegan products',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Free shipping on orders above ₹999',
  },
]

export default function BrandPromises() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.promise-card', { opacity: 0, y: 30 })
      gsap.set('.promise-icon', { scale: 0 })
      gsap.set('.promise-title', { opacity: 0, y: 15 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.promise-card', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out'
          })
          gsap.to('.promise-icon', {
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            delay: 0.2
          })
          gsap.to('.promise-title', {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.4
          })
        },
        once: true
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="section-title mb-2">Brand Promises</h2>
          <div className="w-20 h-1 bg-gold rounded-full mx-auto" />
        </div>

        {/* Promises Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {promises.map((promise, index) => {
            const Icon = promise.icon
            return (
              <div
                key={promise.title}
                className="promise-card text-center p-6"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="promise-icon w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="promise-title text-lg font-semibold text-dark mb-2">
                  {promise.title}
                </h3>
                <p className="text-sm text-dark-light">
                  {promise.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
