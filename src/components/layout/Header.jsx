// src/components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import Button from '../ui/Button';

const NavLinks = ({ mobile = false, onClick = () => {} }) => {
  const location = useLocation();
  const links = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
  ];

  const baseClasses = `font-medium transition-colors duration-200 hover:text-gold-500 ${
    mobile ? 'text-xl py-2' : 'text-sm lg:text-base px-3 py-2'
  }`;

  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          onClick={onClick}
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive || (location.pathname === '/' && link.to === '/')
                ? 'text-gold-500'
                : 'text-charcoal/80 dark:text-white/80'
            }`
          }
        >
          {({ isActive }) => (
            <span className="relative inline-block">
              {link.label}
              {isActive && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 right-0 bottom-0 h-0.5 bg-gold-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </span>
          )}
        </NavLink>
      ))}
    </>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-charcoal/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/logo.png" alt="Muchim's Spot Logo" className="h-12 md:h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavLinks />
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              as="a"
              href="https://wa.me/2348066029768?text=Hi%2C%20I%27d%20like%20to%20place%20an%20order%20from%20Muchim%27s%20Spot"
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
            >
              <Phone className="w-4 h-4 mr-2" />
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Toggle – Gold Icon */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gold-50 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gold-500" />
            ) : (
              <Menu className="w-6 h-6 text-gold-500" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay & Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay – full screen */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={closeMenu}
            />

            {/* Dropdown – ~50% width, right‑aligned */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="absolute top-full right-4 z-50 bg-white dark:bg-charcoal shadow-xl border border-light-gray rounded-xl w-1/2 max-w-xs overflow-hidden"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              <div className="p-5">
                <nav className="flex flex-col items-start space-y-2">
                  <NavLinks mobile onClick={closeMenu} />
                  <div className="pt-4 w-full border-t border-light-gray">
                    <Button
                      as="a"
                      href="https://wa.me/2348066029768?text=Hi%2C%20I%27d%20like%20to%20place%20an%20order%20from%20Muchim%27s%20Spot"
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                      className="justify-center"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Order Now
                    </Button>
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;