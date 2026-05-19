import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-100 bg-white transition-colors duration-300 dark:border-zinc-800/80 dark:bg-brand-dark">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-500 dark:hover:text-white">
            Home
          </Link>
          <Link to="/shop" className="text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-500 dark:hover:text-white">
            Shop
          </Link>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-500 dark:hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-500 dark:hover:text-white">
            Terms of Service
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-400 dark:text-zinc-600">
            &copy; {currentYear} Lumen. Designed for premium everyday goods. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
