import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import DarkLogo from '~/assets/logo-light.png';
import { Link, NavLink } from 'react-router';
import { AltLogo } from '~/components/logo';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '#about' },
    { label: 'Practice Areas', href: '#practice-areas' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <nav className="fixed w-full top-0 z-50 transition-all duration-300">
        <div
          className={`transition-all duration-300 ${
            scrollY > 50 
              ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
              : 'bg-transparent'
          }`}
          style={{
            backgroundColor: scrollY > 50 ? 'rgba(251, 252, 252, 0.95)' : 'transparent'
          }}
        >
          <div className="container">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <AltLogo />

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    className="relative py-2 px-1 transition-all duration-300 group"
                    style={{
                      fontFamily: 'var(--font-raleway)',
                      fontSize: 'var(--text-body-small)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-heading)',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {item.label}
                    <span 
                      className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    ></span>
                  </NavLink>
                ))}
                <button 
                  className="px-6 py-3 rounded-full font-medium transform hover:scale-105 transition-all duration-300 shadow-lg"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-form-placeholder)',
                    fontFamily: 'var(--font-raleway)',
                    fontSize: 'var(--text-body-small)',
                    fontWeight: 'var(--font-weight-medium)',
                    borderRadius: 'var(--radius)'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.backgroundColor = 'var(--color-form-bg-focus)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.backgroundColor = 'var(--color-primary)';
                  }}
                >
                  Consultation
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 transition-colors duration-200"
                  style={{ color: 'var(--color-heading)' }}
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}
        style={{
          backgroundColor: 'var(--color-body-bg)',
          paddingTop: '5rem'
        }}
      >
        <div className="container h-full flex flex-col justify-center">
          <div className="flex flex-col space-y-8 text-center">
            {navigationItems.map((item, index) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={`block py-4 transition-all duration-700 ease-out transform ${
                  isMenuOpen 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
                style={{
                  fontFamily: 'var(--font-raleway)',
                  fontSize: 'var(--text-heading-4)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-heading)',
                  letterSpacing: '1px',
                  transitionDelay: `${index * 100}ms`
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            
            <div 
              className={`pt-8 transition-all duration-700 ease-out transform ${
                isMenuOpen 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${navigationItems.length * 100}ms` }}
            >
              <button 
                className="px-8 py-4 rounded-full font-medium transform hover:scale-105 transition-all duration-300 shadow-lg"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-form-placeholder)',
                  fontFamily: 'var(--font-raleway)',
                  fontSize: 'var(--text-body-medium)',
                  fontWeight: 'var(--font-weight-medium)',
                  borderRadius: 'var(--radius)'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay Background */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-opacity-20 z-30 lg:hidden"
          style={{ backgroundColor: 'var(--color-brand-navy, #1A2A4F)' }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}