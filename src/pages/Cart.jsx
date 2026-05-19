import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, ArrowLeft, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';

const Cart = () => {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getCartSubtotal = useCartStore((state) => state.getCartSubtotal);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = getCartSubtotal();
  const isFreeShipping = subtotal >= 100 || subtotal === 0;
  const shippingCost = isFreeShipping ? 0 : 10.0;
  const totalAmount = subtotal + shippingCost;

  const handleCheckout = () => {
    toast.success('Order Placed Successfully!', {
      description: `Thank you for shopping with Lumen. Your order total is $${totalAmount.toFixed(2)}.`,
    });
    clearCart();
    navigate('/');
  };

  const handleRemove = (id, title) => {
    removeFromCart(id);
    toast.error(`${title.substring(0, 15)}... removed from cart`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8">
        Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-gray-250 rounded-2xl dark:border-zinc-800 bg-white dark:bg-brand-card-dark">
          <div className="rounded-full bg-orange-100/50 p-4 dark:bg-orange-500/10">
            <ShoppingBag className="h-10 w-10 text-accent" />
          </div>
          <h2 className="mt-4 font-display text-xl font-bold text-gray-900 dark:text-white">Your cart is empty</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400 max-w-xs">
            Looks like you haven't added anything to your cart yet. Explore our curated collections.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white transition hover:bg-accent-hover"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white dark:border-zinc-800/80 dark:bg-brand-card-dark overflow-hidden">
              <div className="divide-y divide-gray-100 dark:divide-zinc-800/80">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 transition hover:bg-gray-50/40 dark:hover:bg-zinc-900/10">
                    <div className="flex gap-4 items-center">
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-gray-50 object-contain p-2 border border-gray-100 dark:border-zinc-800 dark:bg-zinc-900"
                      />
                      {/* Metadata */}
                      <div className="space-y-1 min-w-0">
                        <span className="text-[10px] font-bold text-accent uppercase tracking-wider">{item.category}</span>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[200px] sm:max-w-xs md:max-w-sm">
                          {item.title}
                        </h3>
                        <p className="text-xs font-bold text-gray-900 dark:text-white sm:hidden">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10">
                      {/* Price (Desktop) */}
                      <p className="hidden sm:block text-sm font-semibold text-gray-500 dark:text-zinc-400">
                        ${item.price.toFixed(2)}
                      </p>

                      {/* Quantity Selector */}
                      <div className="flex h-9 items-center justify-between rounded-lg border border-gray-200 px-2 dark:border-zinc-700 w-24">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="font-display text-xs font-semibold text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <p className="text-sm font-bold text-gray-900 dark:text-white min-w-[70px] text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item.id, item.title)}
                        className="text-gray-400 hover:text-red-500 dark:text-zinc-550 dark:hover:text-red-400 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Back to Shop link */}
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:text-accent-hover transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Link>
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-zinc-800/80 dark:bg-brand-card-dark transition-colors duration-300">
              <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 pb-3 dark:border-zinc-800">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600 dark:text-zinc-400">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {shippingCost === 0 ? (
                      <span className="text-green-600 dark:text-green-400 font-bold">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                {shippingCost > 0 && (
                  <p className="text-[11px] text-gray-450 dark:text-zinc-500 leading-normal">
                    💡 Add <span className="font-semibold text-accent">${(100 - subtotal).toFixed(2)}</span> more to your order for <span className="font-bold text-green-600 dark:text-green-400">Free Express Delivery</span>!
                  </p>
                )}

                <div className="border-t border-gray-100 pt-4 dark:border-zinc-800 flex justify-between text-base font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span className="text-accent text-lg font-extrabold">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-6 rounded-xl bg-accent py-3.5 text-sm font-bold text-white transition hover:bg-accent-hover hover:scale-[1.01] active:scale-[0.99] shadow-lg hover:shadow-orange-500/10 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-gray-450 dark:text-zinc-500">
                <ShieldCheck className="h-4 w-4 text-green-600 dark:text-green-500" />
                Secure Checkout by Lumen SSL Encryption
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
