import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCategories } from '../context/CategoryContext';
import NoProductsFound from '../components/NoProductsFound';

const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest"];

const Women = () => {
  const { categories, loading: categoriesLoading } = useCategories();
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  
  useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.filter((p: any) => p.collection === 'Women'));
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  // Get search query from URL params
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q') || '';

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const pageTitle = searchQuery ? `Search Results for "${searchQuery}"` : "Women";
  const pageSubtitle = searchQuery ? 
    `${filteredProducts.length} products found` : 
    "Fall Winter 2024 Collection";

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-amber-900 to-stone-900 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop')`
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 to-amber-900/60" />
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/logo-nobg.png" 
              alt="Everest Hemp" 
              className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 mx-auto opacity-90"
            />
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-7xl font-light mb-6 tracking-[0.25em] uppercase drop-shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {pageTitle}
          </motion.h1>
          
          <motion.p 
            className="text-xl tracking-[0.15em] opacity-90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {pageSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Filters and Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 lg:mb-12 space-y-6 lg:space-y-0">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 lg:gap-4 w-full lg:w-auto">
            {categories.map((cat) => (
              <motion.button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3 lg:px-6 py-2 lg:py-3 text-xs lg:text-sm font-medium tracking-[0.1em] uppercase transition-all duration-300 ${
                  selectedCategory === cat.name
                    ? 'bg-amber-900 text-white shadow-lg'
                    : 'bg-white text-amber-900 border border-amber-900 hover:bg-amber-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {cat.name}
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2 lg:space-x-4 w-full lg:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 lg:flex-none px-3 lg:px-4 py-2 border border-stone-300 text-amber-900 bg-white text-xs lg:text-sm tracking-[0.05em]"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <div className="flex border border-stone-300 bg-white">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 lg:p-2 ${viewMode === "grid" ? 'bg-amber-900 text-white' : 'text-amber-900'}`}
              >
                <Grid size={14} className="lg:w-4 lg:h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 lg:p-2 ${viewMode === "list" ? 'bg-amber-900 text-white' : 'text-amber-900'}`}
              >
                <List size={14} className="lg:w-4 lg:h-4" />
              </button>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 py-2 border border-amber-900 text-amber-900 hover:bg-amber-50 transition-colors"
            >
              <Filter size={14} className="lg:w-4 lg:h-4" />
              <span className="text-xs lg:text-sm tracking-[0.05em] hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div 
          className={`grid gap-8 ${
            viewMode === "grid" 
              ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}
          layout
        >
          {filteredProducts.length > 0 && (
            filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                className="group cursor-pointer bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                layout
              >
                <Link to={`/product/${product._id}`}>
                  <div className="relative overflow-hidden">
                    {product.isNew && (
                      <div className="absolute top-4 left-4 bg-amber-900 text-white px-3 py-1 text-xs tracking-[0.1em] uppercase z-10">
                        New
                      </div>
                    )}
                    <motion.button 
                      className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-amber-50 shadow-lg z-10"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart size={16} className="text-amber-900" />
                    </motion.button>
                    <motion.img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-96 object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-stone-500 mb-2 tracking-[0.15em] uppercase">
                      {product.category}
                    </p>
                    <h3 className="text-base lg:text-lg font-light text-amber-900 mb-2 tracking-[0.05em]">
                      {product.name}
                    </h3>
                    <p className="text-base lg:text-lg font-medium text-amber-900 tracking-[0.05em]">
                      Rs. {product.price?.toLocaleString()}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>
        {filteredProducts.length === 0 && <NoProductsFound />}

        {/* Load More */}
        <motion.div 
          className="text-center mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="border-2 border-amber-900 text-amber-900 px-8 sm:px-12 lg:px-16 py-3 lg:py-4 text-xs sm:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase hover:bg-amber-900 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Load More Products
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Women;