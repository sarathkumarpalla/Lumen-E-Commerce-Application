import React, { useState } from 'react';
import { Eye, ShoppingCart, Star } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { toast } from 'sonner';
import ProductQuickView from './ProductQuickView';

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Avoid triggering any card click events
    addToCart(product);
    toast.success(`${product.title.substring(0, 20)}... added to cart!`);
  };

  // Helper for rendering rating stars
  const renderStars = (rate) => {
    const stars = [];
    const roundedRate = Math.round(rate || 0);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-3 w-3 ${
            i <= roundedRate
              ? 'fill-amber-400 text-amber-400'
              : 'text-gray-300 dark:text-zinc-600'
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <>
      <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-orange-500/5 dark:border-zinc-800/80 dark:bg-brand-card-dark dark:hover:shadow-black/30">
        {/* Image Section */}
        <div className="relative aspect-square w-full overflow-hidden bg-gray-50 dark:bg-zinc-900/50 p-6 flex items-center justify-center border-b border-gray-100 dark:border-zinc-800">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Quick View Button overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px]">
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-900 shadow-md transition hover:bg-gray-100 hover:scale-105"
            >
              <Eye className="h-4.5 w-4.5 text-accent" />
              Quick View
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          {/* Category */}
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1.5">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[40px] mb-2 leading-relaxed">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-4">
            <div className="flex">{renderStars(product.rating?.rate)}</div>
            <span className="text-xs text-gray-400 dark:text-zinc-500">
              ({product.rating?.count || 0})
            </span>
          </div>

          {/* Pricing & CTA */}
          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="text-base font-extrabold text-gray-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1 rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-accent hover:scale-[1.03] active:scale-95 dark:bg-zinc-800 dark:hover:bg-accent"
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <ProductQuickView
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
