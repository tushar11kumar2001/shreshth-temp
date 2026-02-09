import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.hero-eyebrow', { opacity: 0, y: 20 })
      gsap.set('.hero-title span', { opacity: 0, y: 40 })
      gsap.set('.hero-subtitle', { opacity: 0, filter: 'blur(10px)' })
      gsap.set('.hero-cta', { opacity: 0, scale: 0.9 })
      gsap.set('.hero-image', { opacity: 0, x: 100, rotateY: 25 })
      gsap.set('.decor-shape', { opacity: 0, scale: 0 })

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.3 })

      tl.to('.hero-eyebrow', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      })
      .to('.hero-title span', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.3')
      .to('.hero-subtitle', {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4')
      .to('.hero-cta', {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }, '-=0.2')
      .to('.hero-image', {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8')
      .to('.decor-shape', {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }, '-=0.5')

      // Floating animation for decorative elements
      gsap.to('.decor-float', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-light via-white to-gray-light pt-24"
    >
      {/* Decorative Elements */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none">
        <div className="decor-shape decor-float absolute top-32 left-10 w-20 h-20 bg-gold/10 rounded-full blur-xl" />
        <div className="decor-shape decor-float absolute top-48 right-20 w-32 h-32 bg-gold/5 rounded-full blur-2xl" style={{ animationDelay: '1s' }} />
        <div className="decor-shape decor-float absolute bottom-32 left-1/4 w-16 h-16 bg-dark/5 rounded-full blur-xl" style={{ animationDelay: '0.5s' }} />
        <div className="decor-shape absolute top-1/3 left-0 w-px h-40 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
        <div className="decor-shape absolute bottom-1/4 right-0 w-px h-60 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <div ref={contentRef} className="relative z-10 text-center lg:text-left">
            <div className="hero-eyebrow inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>NEW COLLECTION 2026</span>
            </div>
            
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-dark leading-tight mb-6">
              <span className="block">Elevate Your</span>
              <span className="block font-serif italic text-gold">Grooming Ritual</span>
            </h1>
            
            <p className="hero-subtitle text-lg sm:text-xl text-dark-light max-w-xl mx-auto lg:mx-0 mb-8">
              Premium essentials crafted for the modern gentleman. 
              Discover our curated collection of fragrances, skincare, and grooming tools.
            </p>
            
            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#bestsellers" className="btn-primary inline-flex items-center justify-center gap-2 group">
                Shop Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#bundles" className="btn-secondary inline-flex items-center justify-center">
                Explore Bundles
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              {[
                { value: '2M+', label: 'Happy Customers' },
                { value: '200+', label: 'Premium Products' },
                { value: '4.8', label: 'Average Rating' },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-dark">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-dark-light">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div ref={imageRef} className="relative lg:h-[600px] flex items-center justify-center">
            <div className="hero-image relative" style={{ perspective: '1000px' }}>
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-3xl scale-75 animate-pulse-slow" />
              
              <img 
                src="/hero-product.jpg" 
                alt="Premium Grooming Collection"
                className="relative z-10 w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl shadow-2xl"
              />
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-dark">Premium Quality</div>
                    <div className="text-xs text-dark-light">100% Authentic</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
