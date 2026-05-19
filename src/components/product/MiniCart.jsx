import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { toast } from 'sonner';

const MiniCart = ({ onClose }) => {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getCartSubtotal = useCartStore((state) => state.getCartSubtotal);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = getCartSubtotal();
  const isEmpty = cart.length === 0;

  const handleCheckout = () => {
    if (isEmpty) return;
    onClose();
    toast.success('Proceeding to checkout page...', {
      description: 'Your simulated order is ready for processing.',
    });
    navigate('/cart');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.95 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-gray-100 bg-white p-4 shadow-xl ring-1 ring-black/5 transition-colors duration-300 dark:border-zinc-800 dark:bg-brand-card-dark dark:shadow-black/40"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-zinc-800">
        <h3 className="font-display text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-accent" />
          Shopping Cart ({cart.length})
        </h3>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Cart Items List */}
      <div className="max-h-60 overflow-y-auto py-3">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-orange-100/50 p-3 dark:bg-orange-500/10">
              <ShoppingBag className="h-6 w-6 text-accent" />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-zinc-400 font-medium">Your cart is empty</p>
            <p className="mt-1 text-xs text-gray-400 dark:text-zinc-500">Add products to your cart to see them here.</p>
          </div>
        ) : (
          <div className="space-y-3 divide-y divide-gray-100/80 dark:divide-zinc-800/80">
            {cart.map((item, idx) => (
              <div key={item.id} className={`flex items-start gap-3 ${idx > 0 ? 'pt-3' : ''}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-12 w-12 rounded-lg bg-gray-50 object-contain p-1 border border-gray-100 dark:border-zinc-800 dark:bg-zinc-900"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500 dark:text-zinc-400">
                      Qty: <span className="font-medium text-gray-700 dark:text-zinc-300">{item.quantity}</span>
                    </p>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    removeFromCart(item.id);
                    toast.error('Item removed from cart');
                  }}
                  className="text-gray-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400 transition-colors p-1"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer / Subtotal & Actions */}
      {!isEmpty && (
        <div className="border-t border-gray-100 pt-3 dark:border-zinc-800">
          <div className="flex items-center justify-between text-sm font-semibold text-gray-900 dark:text-white mb-4">
            <span>Subtotal</span>
            <span className="text-accent font-bold">${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/cart"
              onClick={onClose}
              className="flex justify-center items-center rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              View Cart
            </Link>
            <button
              onClick={handleCheckout}
              disabled={isEmpty}
              className="flex justify-center items-center rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white transition hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {isEmpty && (
        <div className="border-t border-gray-100 pt-3 dark:border-zinc-800">
          <Link
            to="/shop"
            onClick={onClose}
            className="flex w-full justify-center items-center rounded-lg bg-accent px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-accent-hover"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default MiniCart;
