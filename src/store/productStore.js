import { create } from 'zustand';
import axios from 'axios';

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategories: [],
  sortBy: '',

  setSearchQuery: (query) => set({ searchQuery: query }),
  
  toggleCategory: (category) => {
    const { selectedCategories } = get();
    if (selectedCategories.includes(category)) {
      set({
        selectedCategories: selectedCategories.filter((cat) => cat !== category),
      });
    } else {
      set({ selectedCategories: [...selectedCategories, category] });
    }
  },
  
  setSortBy: (sortOption) => set({ sortBy: sortOption }),
  
  clearFilters: () => set({ searchQuery: '', selectedCategories: [], sortBy: '' }),
  
  fetchProducts: async () => {
    // Only fetch if products are not loaded yet to prevent redundant calls
    if (get().products.length > 0) return;
    
    set({ loading: true, error: null });
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      set({ products: response.data, loading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch products', loading: false });
    }
  },

  // Dynamic selector to get filtered and sorted products
  getFilteredProducts: () => {
    const { products, searchQuery, selectedCategories, sortBy } = get();
    
    let result = [...products];

    // 1. Search Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    }

    // 2. Category Filter (Multiple categories allowed)
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.some(
          (cat) => cat.toLowerCase() === product.category.toLowerCase()
        )
      );
    }

    // 3. Sorting
    if (sortBy) {
      switch (sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'title-asc':
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'title-desc':
          result.sort((a, b) => b.title.localeCompare(a.title));
          break;
        default:
          break;
      }
    }

    return result;
  },
}));
