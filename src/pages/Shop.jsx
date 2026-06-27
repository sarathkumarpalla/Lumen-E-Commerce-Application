import React, { useEffect, useState } from 'react';
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/product/ProductCard';
import FilterSidebar from '../components/product/FilterSidebar';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import { SlidersHorizontal, Grid3X3, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Shop = () => {
  const { fetchProducts, loading, error, getFilteredProducts, clearFilters } = useProductStore();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = getFilteredProducts();

  // Reset scroll when entering page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-6 mb-8 dark:border-zinc-800">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Shop All Products
          </h1>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-zinc-450">
            Showing {filteredProducts.length} premium goods
          </p>
        </div>

        <div className="flex items-center gap-2 mt-4 md:mt-0 lg:hidden">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-gray-250 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <SlidersHorizontal className="h-4 w-4 text-accent" />
            Filters & Sort
          </button>
        </div>
      </div>

      <div className="flex gap-8 items-start">
        <FilterSidebar />

        <div className="flex-1">
          {error ? (
            <div className="rounded-xl border border-red-100 bg-red-50/50 p-8 text-center dark:border-red-900/30 dark:bg-red-950/10">
              <p className="text-sm font-semibold text-red-650 dark:text-red-400">Failed to fetch products: {error}</p>
              <button
                onClick={fetchProducts}
                className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-red-750"
              >
                Try Again
              </button>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 py-16 text-center dark:border-zinc-800">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-400 dark:bg-zinc-900/50 dark:text-zinc-650">
                <Grid3X3 className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-gray-900 dark:text-white">No products found</h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-zinc-500">
                Try changing your search terms or clearing active filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-xs font-bold text-white transition hover:bg-accent-hover"
              >
                <Trash2 className="h-4 w-4" />
                Clear Active Filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 left-0 w-80 max-w-full shadow-2xl"
            >
              <FilterSidebar isMobile={true} onClose={() => setIsMobileFilterOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
