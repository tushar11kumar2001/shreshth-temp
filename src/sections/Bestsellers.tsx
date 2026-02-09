import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    id: 1,
    name: 'Eau De Toilette | Blanc (100ml)',
    image: '/product-perfume-blanc.jpg',
    rating: 4.83,
    reviews: 665,
    price: 899,
    originalPrice: 1799,
    discount: 50,
    badge: 'Best Seller',
    isNew: false,
  },
  {
    id: 2,
    name: 'Eau De Parfum | Citron (100ml)',
    image: '/product-perfume-citron.jpg',
    rating: 4.84,
    reviews: 50,
    price: 899,
    originalPrice: 1499,
    discount: 40,
    badge: 'Best Seller',
    isNew: false,
  },
  {
    id: 3,
    name: 'Charcoal Face Scrub | Charcoal & Eucalyptus',
    image: '/product-charcoal-scrub.jpg',
    rating: 4.63,
    reviews: 375,
    price: 299,
    originalPrice: 349,
    discount: 14,
    badge: null,
    isNew: false,
  },
  {
    id: 4,
    name: 'Moisturising Cream | Shea Butter And Vitamin E',
    image: '/product-moisturizer.jpg',
    rating: 4.74,
    reviews: 158,
    price: 309,
    originalPrice: 349,
    discount: 11,
    badge: null,
    isNew: false,
  },
  {
    id: 5,
    name: 'Derma Roller | For Beard & Hair Growth',
    image: '/product-derma-roller.jpg',
    rating: 4.68,
    reviews: 90,
    price: 459,
    originalPrice: null,
    discount: null,
    badge: 'New Launch',
    isNew: true,
  },
  {
    id: 6,
    name: 'Eau De Parfum | Intense (100ml)',
    image: '/product-perfume-intense.jpg',
    rating: 4.81,
    reviews: 120,
    price: 549,
    originalPrice: 1299,
    discount: 57,
    badge: 'Best Seller',
    isNew: false,
  },
]

const newArrivals = [
  {
    id: 7,
    name: 'Vitamin C Face Serum | Vitamin C & Hyaluronic Acid',
    image: '/product-vitamin-c-serum.jpg',
    rating: 4.79,
    reviews: 394,
    price: 399,
    originalPrice: 499,
    discount: 20,
    badge: 'New Launch',
    isNew: true,
  },
  {
    id: 8,
    name: 'Sunscreen Gel SPF 50 PA+++ | Oil-Free',
    image: '/product-sunscreen.jpg',
    rating: 4.86,
    reviews: 36,
    price: 399,
    originalPrice: 499,
    discount: 20,
    badge: 'New Launch',
    isNew: true,
  },
  {
    id: 9,
    name: 'Charcoal Face Wash | Charcoal & Ylang Ylang',
    image: '/product-charcoal-wash.jpg',
    rating: 4.53,
    reviews: 429,
    price: 299,
    originalPrice: 349,
    discount: 14,
    badge: null,
    isNew: false,
  },
  {
    id: 10,
    name: 'Beard Oil | Natural Blend',
    image: '/product-beard-oil.jpg',
    rating: 4.71,
    reviews: 215,
    price: 349,
    originalPrice: 449,
    discount: 22,
    badge: 'Popular',
    isNew: false,
  },
  {
    id: 11,
    name: 'Hair Styling Pomade | Strong Hold',
    image: '/product-hair-wax.jpg',
    rating: 4.62,
    reviews: 178,
    price: 279,
    originalPrice: 349,
    discount: 20,
    badge: null,
    isNew: false,
  },
  {
    id: 12,
    name: 'Body Wash | Aquatic Fresh',
    image: '/product-body-wash.jpg',
    rating: 4.58,
    reviews: 142,
    price: 249,
    originalPrice: 299,
    discount: 17,
    badge: null,
    isNew: false,
  },
]

export default function Bestsellers() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<'bestsellers' | 'newarrivals'>('bestsellers')
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 4

  const currentProducts = activeTab === 'bestsellers' ? products : newArrivals
  const totalPages = Math.ceil(currentProducts.length / itemsPerPage)
  const displayedProducts = currentProducts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.product-card-item', { opacity: 0, y: 60 })
      
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.product-card-item', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
          })
        },
        once: true
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [activeTab, currentPage])

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section ref={sectionRef} id="bestsellers" className="py-16 bg-gray-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="section-title mb-2">Bestsellers</h2>
            <div className="w-20 h-1 bg-gold rounded-full" />
          </div>
          
          <div className="flex items-center gap-4">
            {/* Tab Toggle */}
            <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-200">
              <button
                onClick={() => { setActiveTab('bestsellers'); setCurrentPage(0) }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'bestsellers'
                    ? 'bg-dark text-white'
                    : 'text-dark-light hover:text-dark'
                }`}
              >
                Bestsellers
              </button>
              <button
                onClick={() => { setActiveTab('newarrivals'); setCurrentPage(0) }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'newarrivals'
                    ? 'bg-dark text-white'
                    : 'text-dark-light hover:text-dark'
                }`}
              >
                New Arrivals
              </button>
            </div>
            
            <a href="#products" className="text-sm font-medium text-gold hover:underline">
              View all
            </a>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product, index) => (
            <div
              key={product.id}
              className="product-card-item product-card group bg-white rounded-xl overflow-hidden shadow-product hover:shadow-product-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                {product.badge && (
                  <span className={`badge ${product.isNew ? 'bg-green-600' : ''}`}>
                    {product.badge}
                  </span>
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

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prevPage}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
            disabled={currentPage === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-dark-light">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={nextPage}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
