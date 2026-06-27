import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Flame, ShieldCheck, Truck } from 'lucide-react';
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/product/ProductCard';
import { ProductCardSkeleton } from '../components/ui/Skeleton';

const Home = () => {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Select 4 featured products (first 4 items from products array)
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      <section className="relative overflow-hidden bg-gray-50 transition-colors duration-300 dark:bg-zinc-900/40 bg-orange-600">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100/80 px-3.5 py-1.5 text-xs font-bold text-accent dark:bg-orange-500/10">
              <Flame className="h-3.5 w-3.5" />
              New Collection Available
            </div>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:leading-[1.1]">
              Design-forward goods <br />
              <span className="bg-gradient-to-r from-accent to-amber-500 bg-clip-text text-transparent">
                for everyday life.
              </span>
            </h1>

            <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-gray-650 dark:text-zinc-450 leading-relaxed font-normal">
              Curated collections with a focus on simplicity, utility, and beautiful craftsmanship.
              Elevate your daily routine with Lumen.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/shop"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-accent dark:bg-white dark:text-gray-900 dark:hover:bg-accent dark:hover:text-white shadow-lg hover:shadow-orange-500/20"
              >
                Shop Collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-xl border border-gray-250 bg-transparent px-6 py-3.5 text-sm font-bold text-gray-800 transition hover:bg-gray-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800/50"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-orange-400/20 via-amber-300/10 to-transparent p-8 flex items-center justify-center border border-gray-150/50 dark:border-zinc-800/40">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute top-4 left-4 w-36 h-36 rounded-2xl bg-white dark:bg-brand-card-dark shadow-md p-4 rotate-[-6deg] transition hover:rotate-0 duration-300 border border-gray-100 dark:border-zinc-800 flex flex-col items-center justify-center">
                  <span className="text-[9px] font-bold text-accent uppercase tracking-wider mb-2">Jewelry</span>
                  <div className="h-16 w-16 bg-gray-50 dark:bg-zinc-900 rounded-lg p-2 flex items-center justify-center">
                    <span className="text-xl">✨</span>
                  </div>
                </div>

                <div className="absolute bottom-6 right-4 w-40 h-40 rounded-2xl bg-white dark:bg-brand-card-dark shadow-lg p-4 rotate-[8deg] transition hover:rotate-0 duration-300 border border-gray-100 dark:border-zinc-800 flex flex-col items-center justify-center">
                  <span className="text-[9px] font-bold text-accent uppercase tracking-wider mb-2">Tech</span>
                  <div className="h-20 w-20 bg-gray-50 dark:bg-zinc-900 rounded-lg p-2 flex items-center justify-center">
                    <span className="text-2xl">💻</span>
                  </div>
                </div>

                <div className="w-56 h-56 rounded-full bg-accent/10 dark:bg-accent/5 absolute blur-3xl" />
                <div className="z-10 text-center space-y-3 p-6 bg-white/70 dark:bg-brand-card-dark/70 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl max-w-xs">
                  <ShoppingBag className="h-8 w-8 text-accent mx-auto" />
                  <h3 className="font-display font-bold text-gray-900 dark:text-white">Premium Quality Only</h3>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">Handpicked items sourced globally to ensure high standards.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex gap-4 p-5 rounded-2xl border border-gray-100/50 bg-white dark:border-zinc-850 dark:bg-zinc-900/20">
          <div className="rounded-xl bg-orange-100/60 p-3 text-accent h-12 w-12 flex items-center justify-center dark:bg-orange-500/10">
            <Truck className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Free Express Delivery</h4>
            <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400">On all orders over $100 with secure tracking.</p>
          </div>
        </div>

        <div className="flex gap-4 p-5 rounded-2xl border border-gray-100/50 bg-white dark:border-zinc-850 dark:bg-zinc-900/20">
          <div className="rounded-xl bg-orange-100/60 p-3 text-accent h-12 w-12 flex items-center justify-center dark:bg-orange-500/10">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Secure Transaction</h4>
            <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400">Fully encrypted checkout protecting your details.</p>
          </div>
        </div>

        <div className="flex gap-4 p-5 rounded-2xl border border-gray-100/50 bg-white dark:border-zinc-850 dark:bg-zinc-900/20">
          <div className="rounded-xl bg-orange-100/60 p-3 text-accent h-12 w-12 flex items-center justify-center dark:bg-orange-500/10">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Easy Returns & Exchanges</h4>
            <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400">30-day money-back guarantee with zero hassle.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between border-b border-gray-100 pb-4 dark:border-zinc-800">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Featured Products
            </h2>
            <p className="mt-1.5 text-sm text-gray-500 dark:text-zinc-450">
              A selection of our most popular items, ready to ship.
            </p>
          </div>
          <Link
            to="/shop"
            className="group inline-flex items-center gap-1 text-sm font-bold text-accent hover:text-accent-hover transition-colors"
          >
            View All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-100 bg-red-50/50 p-6 text-center dark:border-red-900/30 dark:bg-red-950/10">
            <p className="text-sm font-semibold text-red-600 dark:text-red-400">Error loading products: {error}</p>
            <button
              onClick={fetchProducts}
              className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
