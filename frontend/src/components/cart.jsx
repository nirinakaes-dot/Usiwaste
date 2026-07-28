import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag, X } from 'lucide-react';

export default function Cart({ 
  isOpen, 
  onClose, 
  cart, 
  updateQuantity, 
  removeFromCart,
  onCheckout 
}) {
  if (!isOpen) return null;

  // Calculate total directly from props
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    onCheckout(cart); // Sends current cart items to bookings
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark overlay backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={onClose} 
      />

      {/* Slide-over panel attached to the right */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
            >
              <X className="h-5 w-5 cursor-pointer" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Your cart is empty</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Add items to your cart to see them here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 rounded-2xl border border-gray-100 bg-white shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-xl object-cover bg-gray-100"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">{item.category}</p>
                      <div className="text-sm font-bold text-green-600 mt-1">
                        Ksh {item.price * item.quantity}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4 cursor-pointer" />
                      </button>

                      <div className="flex items-center border border-gray-200 rounded-full px-2 py-0.5 bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-gray-600 hover:text-gray-900"
                        >
                          <Minus className="h-3 w-3 cursor-pointer" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-gray-600 hover:text-gray-900"
                        >
                          <Plus className="h-3 w-3 cursor-pointer" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer / Summary */}
          {cart.length > 0 && (
            <div className="border-t border-gray-100 p-6 bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500 font-medium">Total</span>
                <span className="text-2xl font-bold text-green-600">
                  Ksh {totalPrice}
                </span>
              </div>
              <button className="w-full rounded-full bg-green-700 py-3 font-medium text-white transition-colors hover:bg-green-900 cursor-pointer">
                Checkout Now
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}