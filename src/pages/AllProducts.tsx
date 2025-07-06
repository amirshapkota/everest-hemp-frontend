import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCategories } from '../context/CategoryContext';
import NoProductsFound from '../components/NoProductsFound';

const collections = ["All", "Women", "Men"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest"];

const AllProducts = () => {
  const { categories, loading: categoriesLoading } = useCategories();
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCollection, setSelectedCollection] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  
  useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
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
    const matchesCollection = selectedCollection === "All" || product.collection === selectedCollection;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.collection && product.collection.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesCollection && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High":
        return a.price - b.price;
      case "Price: High to Low":
        return b.price - a.price;
      case "Newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  const pageTitle = searchQuery ? `Search Results for "${searchQuery}"` : "All Products";
  const pageSubtitle = searchQuery ? 
    `${filteredProducts.length} products found` : 
    "Complete Sustainable Luxury Collection";

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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-[0.15em] sm:tracking-[0.25em] uppercase drop-shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {pageTitle}
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl tracking-[0.1em] sm:tracking-[0.15em] opacity-90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {pageSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Filters and Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col space-y-6 mb-8 lg:mb-12">
          {/* Collection Filter */}
          <div className="flex flex-wrap gap-2 lg:gap-4">
            <span className="text-sm font-medium text-amber-900 tracking-[0.1em] uppercase self-center mr-4 hidden sm:block">
              Collection:
            </span>
            {collections.map((collection) => (
              <motion.button
                key={collection}
                onClick={() => setSelectedCollection(collection)}
                className={`px-3 lg:px-6 py-2 lg:py-3 text-xs lg:text-sm font-medium tracking-[0.1em] uppercase transition-all duration-300 ${
                  selectedCollection === collection
                    ? 'bg-amber-900 text-white shadow-lg'
                    : 'bg-white text-amber-900 border border-amber-900 hover:bg-amber-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {collection}
              </motion.button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 lg:gap-4">
            <span className="text-sm font-medium text-amber-900 tracking-[0.1em] uppercase self-center mr-4 hidden sm:block">
              Category:
            </span>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 lg:space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 lg:px-4 py-2 border border-stone-300 text-amber-900 bg-white text-xs lg:text-sm tracking-[0.05em]"
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
            </div>

            <div className="text-sm text-stone-600">
              {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div 
          className={`grid gap-6 lg:gap-8 ${
            viewMode === "grid" 
              ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}
          layout
        >
          {sortedProducts.map((product, index) => (
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
                    <div className="absolute top-2 left-2 lg:top-4 lg:left-4 bg-amber-900 text-white px-2 lg:px-3 py-1 text-xs tracking-[0.1em] uppercase z-10">
                      New
                    </div>
                  )}
                  
                  <div className="absolute top-2 right-2 lg:top-4 lg:right-4 z-10">
                    <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-medium text-amber-900 tracking-[0.1em] uppercase">
                      {product.collection}
                    </span>
                  </div>
                  
                  <motion.button 
                    className="absolute bottom-2 right-2 lg:bottom-4 lg:right-4 p-2 lg:p-3 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-amber-50 shadow-lg z-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart size={14} className="text-amber-900 lg:w-4 lg:h-4" />
                  </motion.button>

                  <motion.img
                    src={product.images?.[0] || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-3 lg:p-6">
                  <p className="text-xs text-stone-500 mb-2 tracking-[0.15em] uppercase">
                    {product.category}
                  </p>
                  <h3 className="text-sm lg:text-lg font-light text-amber-900 mb-2 lg:mb-3 tracking-[0.05em] line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2 lg:space-x-3 mb-3 lg:mb-4">
                    <span className="text-sm lg:text-lg font-medium text-amber-900 tracking-[0.05em]">
                      Rs. {product.price?.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs lg:text-sm text-stone-400 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-1 lg:space-x-2">
                    {(product.colors || []).map((color: any, colorIndex: any) => (
                      <div
                        key={colorIndex}
                        className="w-3 h-3 lg:w-4 lg:h-4 rounded-full border border-stone-300"
                        style={{
                          backgroundColor: color === "Sage" ? "#87A96B" :
                                         color === "Charcoal" ? "#36454F" :
                                         color === "Cream" ? "#F5F5DC" :
                                         color === "Natural" ? "#F4F1E8" :
                                         color === "Terracotta" ? "#E2725B" :
                                         color === "Forest" ? "#355E3B" :
                                         color === "Stone" ? "#8D7B68" :
                                         color === "Olive" ? "#808000" :
                                         color === "Black" ? "#000000" :
                                         color === "Ivory" ? "#FFFFF0" :
                                         color === "Blush" ? "#DE5D83" :
                                         color === "Camel" ? "#C19A6B" :
                                         color === "Navy" ? "#000080" :
                                         color === "White" ? "#FFFFFF" :
                                         color === "Blue" ? "#0066CC" :
                                         color === "Khaki" ? "#C3B091" : "#F5F5DC"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {sortedProducts.length === 0 && (
          <NoProductsFound
            searchQuery={searchQuery}
            onClearFilters={() => {
              setSelectedCategory("All");
              setSelectedCollection("All");
              window.history.replaceState({}, '', '/all-products');
            }}
          />
        )}

        {/* Load More */}
        {sortedProducts.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default AllProducts;