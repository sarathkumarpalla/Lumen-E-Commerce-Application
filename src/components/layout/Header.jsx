import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Sun, Moon, Menu, X } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useThemeStore } from '../../store/themeStore';
import MiniCart from '../product/MiniCart';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const location = useLocation();
  const cart = useCartStore((state) => state.cart);
  const getCartCount = useCartStore((state) => state.getCartCount);
  const { darkMode, toggleDarkMode } = useThemeStore();
  
  const miniCartRef = useRef(null);
  const cartButtonRef = useRef(null);

  // Close mini-cart on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        miniCartRef.current &&
        !miniCartRef.current.contains(event.target) &&
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target)
      ) {
        setIsMiniCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMiniCartOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
  ];

  const cartItemsCount = getCartCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-zinc-800/80 dark:bg-brand-dark/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="font-display text-2xl font-black tracking-tight text-gray-900 transition-colors dark:text-white">
            Lumen<span className="text-accent">.</span>
          </Link>
        </div>

        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isActive
                    ? 'text-accent'
                    : 'text-gray-600 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={toggleDarkMode}
            className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <div className="relative">
            <button
              ref={cartButtonRef}
              onClick={() => setIsMiniCartOpen(!isMiniCartOpen)}
              className="relative rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white ring-2 ring-white dark:ring-brand-dark">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {isMiniCartOpen && (
                <div ref={miniCartRef}>
                  <MiniCart isOpen={isMiniCartOpen} onClose={() => setIsMiniCartOpen(false)} />
                </div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-100 bg-white md:hidden dark:border-zinc-800 dark:bg-brand-dark"
          >
            <div className="space-y-1 px-4 py-4 sm:px-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-accent/10 text-accent'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
