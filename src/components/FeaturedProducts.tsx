import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data.slice(0, 4));
      } catch (err: any) {
        setError(err.message || 'Failed to fetch products');
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="py-24 text-center">Loading...</div>;
  if (error) return <div className="py-24 text-center text-red-600">{error}</div>;

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-amber-900 mb-6 tracking-[0.1em] sm:tracking-[0.15em] uppercase">
            New Arrivals
          </h2>
          <p className="text-lg sm:text-xl text-stone-600 tracking-[0.02em] sm:tracking-[0.05em] max-w-2xl mx-auto px-4">
            Discover the latest sustainable luxury pieces crafted with mountain-inspired elegance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.length === 0 ? (
            <motion.div
              className="text-center py-16 col-span-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <img 
                  src="/logo-nobg.png" 
                  alt="Everest Hemp" 
                  className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 mx-auto opacity-60"
                />
              </div>
              <h3 className="text-2xl font-light text-stone-600 mb-4 tracking-[0.1em]">
                No products found
              </h3>
              <p className="text-stone-500 mb-8 max-w-md mx-auto">
                Check back soon or browse all products.
              </p>
              <Link to="/all-products">
                <button className="bg-amber-900 text-white px-8 py-3 text-sm font-medium tracking-[0.2em] uppercase hover:bg-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Browse All Products
                </button>
              </Link>
            </motion.div>
          ) : (
            products.map((product, index) => (
              <motion.div 
                key={product._id} 
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Link to={`/product/${product._id}`}>
                <div className="relative overflow-hidden bg-white mb-4 lg:mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <motion.img
                    src={product.images?.[0] || ''}
                    alt={product.name}
                    className="w-full h-80 sm:h-96 object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.button 
                    className="absolute top-3 right-3 lg:top-4 lg:right-4 p-2 lg:p-3 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-amber-50 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart size={14} className="text-amber-900 lg:w-4 lg:h-4" />
                  </motion.button>
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <p className="text-xs text-stone-500 mb-3 tracking-[0.15em] uppercase">
                    {product.category}
                  </p>
                  <h3 className="text-base lg:text-lg font-light text-amber-900 mb-3 tracking-[0.05em]">
                    {product.name}
                  </h3>
                  <p className="text-base lg:text-lg font-medium text-amber-900 tracking-[0.05em]">
                    Rs. {product.price?.toLocaleString()}
                  </p>
                </motion.div>
                </Link>
              </motion.div>
            ))
          )}
        </div>

        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link to="/all-products">
          <motion.button 
            className="border-2 border-amber-900 text-amber-900 px-8 sm:px-12 lg:px-16 py-3 lg:py-4 text-xs sm:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase hover:bg-amber-900 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Products
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;