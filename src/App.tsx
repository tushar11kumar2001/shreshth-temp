import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

// Import sections
import Header from './sections/Header'
import Hero from './sections/Hero'
import CategoryIcons from './sections/CategoryIcons'
import Bestsellers from './sections/Bestsellers'
import BundleSection from './sections/BundleSection'
import SkinCare from './sections/SkinCare'
import ShopByConcern from './sections/ShopByConcern'
import GroomFluencer from './sections/GroomFluencer'
import ShopByOccasion from './sections/ShopByOccasion'
import BeginYourGlow from './sections/BeginYourGlow'
import Testimonials from './sections/Testimonials'
import BrandPromises from './sections/BrandPromises'
import Newsletter from './sections/Newsletter'
// import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Trigger initial load animation
    const timer = setTimeout(() => setIsLoaded(true), 100)
    
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh()
    
    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div 
      ref={mainRef}
      className={`min-h-screen bg-white transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <Header />
      <main>
        <Hero />
        <CategoryIcons />
        <Bestsellers />
        <BundleSection />
        <SkinCare />
        <ShopByConcern />
        <GroomFluencer />
        <ShopByOccasion />
        <BeginYourGlow />
        <Testimonials />
        <BrandPromises />
        <Newsletter />
      </main>
     
      {/** <Footer /> */}
    </div>
  )
}

export default App
