import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, ArrowRight, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.newsletter-content', { opacity: 0, x: -50 })
      gsap.set('.newsletter-image', { opacity: 0, x: 50 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.newsletter-content', {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out'
          })
          gsap.to('.newsletter-image', {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            delay: 0.2
          })
        },
        once: true
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <section ref={sectionRef} className="py-16 bg-gray-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-dark rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Content */}
            <div className="newsletter-content p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-gold mb-4">
                <Mail className="w-5 h-5" />
                <span className="text-sm font-medium">Newsletter</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get Exclusive Deals & Access to New Launches
              </h2>
              
              <p className="text-gray-400 mb-8">
                Subscribe to our newsletter and be the first to know about special offers, 
                new products, and grooming tips.
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                    disabled={isSubmitted}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                    isSubmitted
                      ? 'bg-green-500 text-white'
                      : 'bg-gold text-dark hover:bg-white'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
              
              <p className="text-xs text-gray-500 mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
            
            {/* Image */}
            <div className="newsletter-image relative hidden lg:block">
              <img
                src="/newsletter-image.jpg"
                alt="Grooming Lifestyle"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
