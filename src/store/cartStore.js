import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product, qty = 1) => {
        const cart = get().cart;
        const existingIndex = cart.findIndex((item) => item.id === product.id);
        
        let newCart;
        if (existingIndex > -1) {
          newCart = cart.map((item, idx) =>
            idx === existingIndex ? { ...item, quantity: item.quantity + qty } : item
          );
        } else {
          newCart = [...cart, { ...product, quantity: qty }];
        }
        
        set({ cart: newCart });
      },
      removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) });
      },
      updateQuantity: (id, amount) => {
        const newCart = get().cart.map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + amount;
            return { ...item, quantity: newQty < 1 ? 1 : newQty };
          }
          return item;
        });
        set({ cart: newCart });
      },
      clearCart: () => set({ cart: [] }),
      
      // Selectors for convenience
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },
      getCartSubtotal: () => {
        return get().cart.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
      }
    }),
    {
      name: 'lumen-cart-storage',
    }
  )
);
