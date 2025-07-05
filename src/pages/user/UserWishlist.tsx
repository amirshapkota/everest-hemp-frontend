import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserWishlist = () => {
  const wishlistItems = [
    {
      id: 1,
      name: 'Hemp Blazer',
      price: 289000,
      originalPrice: 320000,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
      category: 'Blazers',
      inStock: true,
      colors: ['Sage', 'Charcoal', 'Cream']
    },
    {
      id: 2,
      name: 'Organic Cotton Dress',
      price: 189000,
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
      category: 'Dresses',
      inStock: true,
      colors: ['Natural', 'Terracotta', 'Forest']
    },
    {
      id: 3,
      name: 'Sustainable Cardigan',
      price: 129000,
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
      category: 'Knitwear',
      inStock: false,
      colors: ['Cream', 'Camel', 'Sage']
    },
    {
      id: 4,
      name: 'Hemp Silk Blouse',
      price: 99000,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
      category: 'Blouses',
      inStock: true,
      colors: ['Ivory', 'Blush', 'Sage']
    }
  ];

  const removeFromWishlist = (id: number) => {
    // Handle remove from wishlist
    console.log('Remove item:', id);
  };

  const addToCart = (id: number) => {
    // Handle add to cart
    console.log('Add to cart:', id);
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4">
            <img 
              src="/public/logo-nobg.png" 
              alt="Everest Hemp" 
              className="h-14 w-14 sm:h-16 sm:w-16 lg:h-18 lg:w-18"
            />
            <div>
              <h1 className="text-3xl font-light text-amber-900 tracking-[0.1em]">
                My Wishlist
              </h1>
              <p className="text-stone-600 tracking-[0.02em]">
                {wishlistItems.length} items saved for later
              </p>
            </div>
          </div>
        </motion.div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="group bg-white shadow-lg border border-stone-200 overflow-hidden hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden">
                  <Link to={`/product/${item.id}`}>
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-80 object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />
                  </Link>
                  
                  <motion.button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 transition-colors group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={16} className="text-red-500" />
                  </motion.button>

                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white px-4 py-2 text-sm font-medium text-stone-800 tracking-[0.1em] uppercase">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-6">
                  <p className="text-xs text-stone-500 mb-2 tracking-[0.15em] uppercase">
                    {item.category}
                  </p>
                  
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-lg font-light text-amber-900 mb-3 tracking-[0.05em] hover:text-amber-700 transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-lg font-medium text-amber-900 tracking-[0.05em]">
                      Rs. {item.price.toLocaleString()}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-stone-400 line-through">
                        Rs. {item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-2 mb-4">
                    {item.colors.map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="w-4 h-4 rounded-full border border-stone-300"
                        style={{
                          backgroundColor: color === "Sage" ? "#87A96B" :
                                         color === "Charcoal" ? "#36454F" :
                                         color === "Cream" ? "#F5F5DC" :
                                         color === "Natural" ? "#F4F1E8" :
                                         color === "Terracotta" ? "#E2725B" :
                                         color === "Forest" ? "#355E3B" :
                                         color === "Ivory" ? "#FFFFF0" :
                                         color === "Blush" ? "#DE5D83" :
                                         color === "Camel" ? "#C19A6B" : "#F5F5DC"
                        }}
                      />
                    ))}
                  </div>

                  <motion.button
                    onClick={() => addToCart(item.id)}
                    disabled={!item.inStock}
                    className="w-full bg-amber-900 text-white py-3 text-sm font-medium tracking-[0.1em] uppercase hover:bg-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    whileHover={{ scale: item.inStock ? 1.02 : 1, y: item.inStock ? -2 : 0 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingBag size={16} />
                    <span>{item.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Heart size={64} className="text-stone-300 mx-auto mb-6" />
            <h3 className="text-2xl font-light text-stone-600 mb-4 tracking-[0.1em]">
              Your wishlist is empty
            </h3>
            <p className="text-stone-500 mb-8 max-w-md mx-auto">
              Save items you love to your wishlist and they'll appear here. 
              Start exploring our sustainable luxury collection.
            </p>
            <Link to="/women">
              <motion.button
                className="bg-amber-900 text-white px-12 py-4 text-sm font-medium tracking-[0.2em] uppercase hover:bg-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>
        )}

        {wishlistItems.length > 0 && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link to="/women">
              <motion.button
                className="border-2 border-amber-900 text-amber-900 px-12 py-4 text-sm font-medium tracking-[0.2em] uppercase hover:bg-amber-900 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserWishlist;