import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Heart, Droplets, User, Gift, Scissors, Wrench, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  { name: "Valentine's Gifts", icon: Heart, color: 'bg-rose-50 text-rose-500' },
  { name: 'Fragrance', icon: Droplets, color: 'bg-amber-50 text-amber-500' },
  { name: 'Face Care', icon: User, color: 'bg-blue-50 text-blue-500' },
  { name: 'Gifts for Men', icon: Gift, color: 'bg-green-50 text-green-500' },
  { name: 'Hair Care', icon: Scissors, color: 'bg-purple-50 text-purple-500' },
  { name: 'Tools & Accessories', icon: Wrench, color: 'bg-gray-100 text-gray-600' },
  { name: 'Beard Essentials', icon: Sparkles, color: 'bg-gold/10 text-gold' },
]

export default function CategoryIcons() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set('.category-card', { opacity: 0, rotateY: 90 })
      
      // Scroll trigger animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.category-card', {
            opacity: 1,
            rotateY: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out'
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
        <div 
          ref={cardsRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4"
        >
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <a
                key={category.name}
                href={`#${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="category-card group"
                style={{ 
                  perspective: '1000px',
                  animationDelay: `${index * 0.08}s`
                }}
              >
                <div className="flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-2 bg-white border border-gray-100">
                  <div className={`w-14 h-14 ${category.color} rounded-full flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-dark text-center group-hover:text-gold transition-colors">
                    {category.name}
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
