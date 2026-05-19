import React from 'react';
import { Search, X, Check, ArrowUpDown } from 'lucide-react';
import { useProductStore } from '../../store/productStore';

const FilterSidebar = ({ isMobile, onClose }) => {
  const searchQuery = useProductStore((state) => state.searchQuery);
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);
  const selectedCategories = useProductStore((state) => state.selectedCategories);
  const toggleCategory = useProductStore((state) => state.toggleCategory);
  const sortBy = useProductStore((state) => state.sortBy);
  const setSortBy = useProductStore((state) => state.setSortBy);
  const clearFilters = useProductStore((state) => state.clearFilters);

  const categories = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Jewelry', value: 'jewelery' },
    { label: "Men's Clothing", value: "men's clothing" },
    { label: "Women's Clothing", value: "women's clothing" },
  ];

  const sortOptions = [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Name: A to Z', value: 'title-asc' },
    { label: 'Name: Z to A', value: 'title-desc' },
  ];

  const hasActiveFilters = searchQuery !== '' || selectedCategories.length > 0 || sortBy !== '';

  const renderContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 block mb-2.5">
          Search Products
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type to search..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm outline-none transition focus:border-accent dark:border-zinc-800 dark:bg-brand-dark dark:text-white dark:focus:border-accent"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-zinc-500" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Sorting (Mobile inline or sidebar) */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 block mb-2.5">
          Sort By
        </label>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2 px-3 pr-8 text-sm outline-none transition focus:border-accent dark:border-zinc-800 dark:bg-brand-dark dark:text-white dark:focus:border-accent"
          >
            <option value="">Default Sorting</option>
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ArrowUpDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-400 dark:text-zinc-500" />
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 block mb-2.5">
          Categories
        </label>
        <div className="space-y-2">
          {categories.map((cat) => {
            const isChecked = selectedCategories.includes(cat.value);
            return (
              <button
                key={cat.value}
                onClick={() => toggleCategory(cat.value)}
                className="flex w-full items-center gap-3 rounded-lg py-2 px-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-white"
              >
                <div
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                    isChecked
                      ? 'border-accent bg-accent text-white'
                      : 'border-gray-300 dark:border-zinc-700'
                  }`}
                >
                  {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear Button */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full rounded-lg border border-gray-200/80 bg-gray-50 py-2 text-xs font-bold text-gray-700 transition hover:bg-gray-100 hover:text-gray-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
        >
          Clear Filters
        </button>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div className="flex flex-col h-full bg-white dark:bg-brand-dark transition-colors duration-300 p-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6 dark:border-zinc-800">
          <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white">Filters & Sort</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:text-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pr-1">{renderContent()}</div>
      </div>
    );
  }

  return (
    <aside className="sticky top-24 hidden w-64 shrink-0 lg:block border border-gray-100 bg-white rounded-2xl p-5 shadow-sm transition-colors duration-300 dark:border-zinc-800/80 dark:bg-brand-card-dark">
      {renderContent()}
    </aside>
  );
};

export default FilterSidebar;
