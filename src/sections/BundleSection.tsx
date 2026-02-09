import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Zap, Sparkles, Gem, Package, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const bundles = [
  {
    id: 1,
    name: 'Fab Five Kit',
    tagline: 'Most Picked',
    price: 999,
    originalPrice: 1999,
    icon: Zap,
    color: 'from-amber-500 to-orange-500',
    items: ['Perfume', 'Face Wash', 'Moisturizer', 'Beard Oil', 'Body Wash'],
  },
  {
    id: 2,
    name: 'Luxury Scent Box',
    tagline: 'Luxury Scents',
    price: 1099,
    originalPrice: 2299,
    icon: Sparkles,
    color: 'from-purple-500 to-pink-500',
    items: ['3 Premium Perfumes', 'Travel Kit', 'Gift Box'],
  },
  {
    id: 3,
    name: 'Mini Perfume Box',
    tagline: 'Bestseller',
    price: 599,
    originalPrice: 1299,
    icon: Gem,
    color: 'from-blue-500 to-cyan-500',
    items: ['5 Mini Perfumes', 'Sample Collection'],
  },
  {
    id: 4,
    name: 'Self Grooming Kit',
    tagline: 'Value Deal',
    price: 599,
    originalPrice: 1199,
    icon: Package,
    color: 'from-green-500 to-emerald-500',
    items: ['Face Care Set', 'Hair Styling', 'Grooming Tools'],
  },
]

export default function BundleSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.bundle-card', { opacity: 0, x: 80 })
      gsap.set('.bundle-title', { opacity: 0, y: 30 })
      gsap.set('.bundle-subtitle', { opacity: 0, filter: 'blur(8px)' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        }
      })

      tl.to('.bundle-title', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out'
      })
      .to('.bundle-subtitle', {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.4')
      .to('.bundle-card', {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
      }, '-=0.3')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="bundles" className="py-20 bg-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="bundle-title text-3xl md:text-4xl font-bold text-white mb-3">
            Build Your Bundle
          </h2>
          <p className="bundle-subtitle text-lg text-gray-400">
            Get Super Saving Deals - Starting at <span className="text-gold font-semibold">₹599</span>
          </p>
        </div>

        {/* Bundle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bundles.map((bundle, index) => {
            const Icon = bundle.icon
            return (
              <div
                key={bundle.id}
                className="bundle-card group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:-translate-y-3 hover:shadow-glow"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Tag */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${bundle.color} text-white mb-4`}>
                  <Icon className="w-3 h-3" />
                  {bundle.tagline}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2">{bundle.name}</h3>
                
                {/* Items List */}
                <ul className="space-y-1.5 mb-6">
                  {bundle.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                      <span className="w-1 h-1 bg-gold rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-white">₹{bundle.price}</span>
                  <span className="text-sm text-gray-500 line-through">₹{bundle.originalPrice}</span>
                  <span className="text-xs font-medium text-green-400">
                    {Math.round((1 - bundle.price / bundle.originalPrice) * 100)}% off
                  </span>
                </div>

                {/* CTA */}
                <button className="w-full bg-white text-dark py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gold hover:text-white transition-all duration-300 group/btn">
                  Build Box
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a 
            href="#all-bundles" 
            className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors font-medium"
          >
            View All Bundles
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
