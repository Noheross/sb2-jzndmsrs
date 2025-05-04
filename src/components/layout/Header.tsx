import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const categories = [
  { name: 'shoes', label: 'Shoes', href: '/category/shoes' },
  { name: 't_shirt', label: 'T-Shirts', href: '/category/t_shirt' },
  { name: 'pants', label: 'Pants & Shorts', href: '/category/pants' },
  { name: 'hoodies', label: 'Hoodies & Sweaters', href: '/category/hoodies' },
  { name: 'jackets', label: 'Jackets', href: '/category/jackets' },
  { name: 'accessories', label: 'Accessories', href: '/category/accessories' },
  { name: 'others', label: 'Others', href: '/category/others' }
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={`fixed w-full z-10 transition-all duration-300 ${
      isScrolled || isMenuOpen ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link to="/" className="text-lg md:text-xl font-bold">Sneakers2Buy</Link>
          
          <nav className="hidden md:flex space-x-6">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                to={category.href}
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                {category.label}
              </Link>
            ))}
          </nav>
          
          <button 
            className="md:hidden p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="block px-3 py-2 text-base font-medium hover:bg-gray-100 transition-colors rounded-md"
              >
                {category.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;