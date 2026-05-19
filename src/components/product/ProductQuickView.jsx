import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingCart, Star, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { toast } from 'sonner';

const ProductQuickView = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to cart!`);
    onClose();
  };

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Helper for rendering rating stars
  const renderStars = (rate) => {
    const stars = [];
    const roundedRate = Math.round(rate || 0);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= roundedRate
              ? 'fill-amber-400 text-amber-400'
              : 'text-gray-350 dark:text-zinc-600'
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Content animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative z-10 flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-colors duration-300 md:flex-row dark:bg-brand-card-dark"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-white/80 p-1.5 text-gray-500 shadow-md backdrop-blur-sm transition hover:bg-white hover:text-gray-900 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:bg-zinc-850 dark:hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Product Image Section */}
        <div className="flex items-center justify-center bg-gray-50 p-8 md:w-1/2 dark:bg-zinc-900/50">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-72 object-contain md:max-h-[400px]"
          />
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col p-6 sm:p-8 md:w-1/2">
          {/* Category */}
          <span className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
            {product.category}
          </span>

          {/* Title */}
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white sm:text-2xl leading-snug">
            {product.title}
          </h2>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3 mb-4">
            <div className="flex">{renderStars(product.rating?.rate)}</div>
            <span className="text-xs font-semibold text-gray-600 dark:text-zinc-400">
              {product.rating?.rate || 0} / 5
            </span>
            <span className="text-xs text-gray-400 dark:text-zinc-500">
              ({product.rating?.count || 0} reviews)
            </span>
          </div>

          <div className="border-t border-gray-150 my-2 dark:border-zinc-800" />

          {/* Price */}
          <div className="my-3">
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Description */}
          <div className="max-h-36 overflow-y-auto pr-2 mb-6">
            <p className="text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
              {product.description}
            </p>
          </div>

          <div className="mt-auto space-y-4">
            {/* Quantity Controller & Add to Cart */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex h-11 items-center justify-between rounded-lg border border-gray-200 px-3 dark:border-zinc-700 sm:w-32">
                <button
                  onClick={decrementQty}
                  disabled={quantity <= 1}
                  className="text-gray-500 hover:text-gray-700 disabled:opacity-30 dark:text-zinc-400 dark:hover:text-white"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-display text-sm font-semibold text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={incrementQty}
                  className="text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-white"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-accent text-sm font-bold text-white transition hover:bg-accent-hover"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductQuickView;
