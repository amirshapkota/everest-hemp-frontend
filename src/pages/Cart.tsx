import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50000 ? 0 : 5000;
  const tax = subtotal * 0.13;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 pt-20 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="/logo-nobg.png" 
            alt="Everest Hemp" 
            className="h-24 w-24 mx-auto mb-8 opacity-60"
          />
          <h1 className="text-4xl font-light text-amber-900 mb-6 tracking-[0.15em]">
            Your Cart is Empty
          </h1>
          <p className="text-xl text-stone-600 mb-12">
            Discover our sustainable luxury collection
          </p>
          <Link to="/women">
            <motion.button 
              className="bg-amber-900 text-white px-12 py-4 text-sm font-medium tracking-[0.2em] uppercase hover:bg-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-4 mb-12">
            <img 
              src="/logo-nobg.png" 
              alt="Everest Hemp" 
              className="h-14 w-14 sm:h-16 sm:w-16 lg:h-18 lg:w-18 opacity-80"
            />
            <h1 className="text-4xl md:text-5xl font-light text-amber-900 tracking-[0.15em] uppercase">
              Shopping Cart
            </h1>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {cart.map((item, index) => (
              <motion.div
                key={item.product + item.size + item.color}
                className="bg-white p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 sm:w-24 sm:h-32 object-cover mx-auto sm:mx-0"
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg lg:text-xl font-light text-amber-900 mb-2 tracking-[0.05em]">
                      {item.name}
                    </h3>
                    <div className="text-sm text-stone-600 space-y-1">
                      <p>Color: {item.color}</p>
                      <p>Size: {item.size}</p>
                    </div>
                    <p className="text-base lg:text-lg font-medium text-amber-900 mt-3">
                      Rs. {item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center justify-center sm:justify-end space-x-4">
                    <div className="flex items-center space-x-2 lg:space-x-3">
                      <motion.button
                        onClick={() => updateQuantity(item.product, item.size, item.color, Math.max(1, item.quantity - 1))}
                        className="w-7 h-7 lg:w-8 lg:h-8 border border-stone-300 text-amber-900 hover:bg-amber-50 transition-colors flex items-center justify-center text-sm"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Minus size={12} className="lg:w-[14px] lg:h-[14px]" />
                      </motion.button>
                      <span className="text-base lg:text-lg font-medium text-amber-900 w-6 lg:w-8 text-center">
                        {item.quantity}
                      </span>
                      <motion.button
                        onClick={() => updateQuantity(item.product, item.size, item.color, item.quantity + 1)}
                        className="w-7 h-7 lg:w-8 lg:h-8 border border-stone-300 text-amber-900 hover:bg-amber-50 transition-colors flex items-center justify-center text-sm"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus size={12} className="lg:w-[14px] lg:h-[14px]" />
                      </motion.button>
                    </div>

                    <motion.button
                      onClick={() => removeFromCart(item.product, item.size, item.color)}
                      className="p-1.5 lg:p-2 text-stone-400 hover:text-red-500 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X size={16} className="lg:w-[18px] lg:h-[18px]" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            className="bg-white p-6 lg:p-8 shadow-lg h-fit"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-xl lg:text-2xl font-light text-amber-900 mb-6 lg:mb-8 tracking-[0.1em] uppercase">
              Order Summary
            </h2>

            <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
              <div className="flex justify-between">
                <span className="text-stone-600">Subtotal</span>
                <span className="text-amber-900 font-medium">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Shipping</span>
                <span className="text-amber-900 font-medium">
                  {shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">VAT (13%)</span>
                <span className="text-amber-900 font-medium">Rs. {tax.toFixed(0)}</span>
              </div>
              <div className="border-t border-stone-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-base lg:text-lg font-medium text-amber-900">Total</span>
                  <span className="text-base lg:text-lg font-medium text-amber-900">Rs. {total.toFixed(0)}</span>
                </div>
              </div>
            </div>

            {shipping > 0 && (
              <div className="bg-amber-50 p-3 lg:p-4 mb-6 lg:mb-8 border border-amber-200">
                <p className="text-sm text-amber-800">
                  Add Rs. {(50000 - subtotal).toLocaleString()} more for free shipping
                </p>
              </div>
            )}

            <motion.button 
              className="w-full bg-amber-900 text-white py-3 lg:py-4 text-xs lg:text-sm font-medium tracking-[0.1em] uppercase hover:bg-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 lg:space-x-3 mb-4"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/checkout'}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={14} className="lg:w-4 lg:h-4" />
            </motion.button>

            <Link to="/women">
              <motion.button 
                className="w-full border-2 border-amber-900 text-amber-900 py-3 lg:py-4 text-xs lg:text-sm font-medium tracking-[0.1em] uppercase hover:bg-amber-50 transition-all duration-300 flex items-center justify-center space-x-2 lg:space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingBag size={14} className="lg:w-4 lg:h-4" />
                <span>Continue Shopping</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;