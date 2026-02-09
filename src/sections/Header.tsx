import { useState, useEffect } from 'react'
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react'

const navItems = [
  { name: 'Best Sellers', href: '#bestsellers' },
  { name: 'All Products', href: '#products' },
  { name: 'Bundles', href: '#bundles' },
  { 
    name: 'Shop By Concern', 
    href: '#concerns',
    dropdown: [
      'Dark Circles', 'Dark Lips', 'Ageing', 'Blackheads', 
      'Body Odour', 'Beard Growth', 'Grey Beard', 'Hair Fall'
    ]
  },
  { name: 'Perfumes', href: '#perfumes' },
  { name: 'Hair Care', href: '#haircare' },
  { name: 'Body Care', href: '#bodycare' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [cartCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top Banner */}
      <div className="bg-dark text-white text-center py-2 text-xs font-medium">
        Free shipping on orders above ₹999 | Use code: GENTLEMAN
      </div>
      
      {/* Main Header */}
      <header 
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-md py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="#" 
              className={`text-xl md:text-2xl font-bold tracking-tight transition-all duration-300 ${
                isScrolled ? 'text-dark scale-90' : 'text-dark'
              }`}
            >
              <span className="font-serif italic">Gentleman&apos;s</span>
              <span className="text-gold"> Essentials</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <div 
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a 
                    href={item.href}
                    className="nav-link flex items-center gap-1 py-2"
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="w-3 h-3" />}
                  </a>
                  
                  {/* Dropdown */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-fade-in">
                      {item.dropdown.map((subItem) => (
                        <a
                          key={subItem}
                          href={`#${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-4 py-2 text-sm text-dark-light hover:bg-gray-50 hover:text-gold transition-colors"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-3 md:gap-5">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search className="w-5 h-5 text-dark" />
              </button>
              <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User className="w-5 h-5 text-dark" />
              </button>
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingBag className="w-5 h-5 text-dark" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-white text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-dark" />
                ) : (
                  <Menu className="w-5 h-5 text-dark" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-24 left-0 right-0 bg-white shadow-xl animate-slide-down">
            <nav className="py-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-6 py-3 text-dark hover:bg-gray-50 hover:text-gold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
