import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 7,
    name: "Hemp Suit Jacket",
    price: "Rs. 329,000",
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    category: "Suits",
    isNew: true,
    colors: ["Charcoal", "Navy", "Stone"]
  },
  {
    id: 8,
    name: "Organic Cotton Shirt",
    price: "Rs. 89,000",
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    category: "Shirts",
    colors: ["White", "Blue", "Sage"]
  },
  {
    id: 9,
    name: "Hemp Chinos",
    price: "Rs. 119,000",
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    category: "Trousers",
    colors: ["Khaki", "Navy", "Olive"]
  },
  {
    id: 10,
    name: "Sustainable Hoodie",
    price: "Rs. 129,000",
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    category: "Casual",
    colors: ["Charcoal", "Forest", "Cream"]
  },
  {
    id: 11,
    name: "Hemp Polo Shirt",
    price: "Rs. 69,000",
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    category: "Shirts",
    colors: ["Navy", "White", "Sage"]
  },
  {
    id: 12,
    name: "Organic Wool Sweater",
    price: "Rs. 189,000",
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    category: "Knitwear",
    colors: ["Camel", "Charcoal", "Cream"]
  }
];

const categories = ["All", "Suits", "Shirts", "Trousers", "Casual", "Knitwear"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest"];

const Men = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [viewMode, setViewMode] = useState("grid");

  const filteredProducts = products.filter(product => 
    selectedCategory === "All" || product.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-amber-900 to-stone-900 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop')`
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
              src="/public/logo-nobg.png" 
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
            Men
          </motion.h1>
          
          <motion.p 
            className="text-xl tracking-[0.15em] opacity-90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Fall Winter 2024 Collection
          </motion.p>
        </div>
      </section>

      {/* Products Section - Similar structure to Women page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 space-y-6 lg:space-y-0">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 text-sm font-medium tracking-[0.1em] uppercase transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-amber-900 text-white shadow-lg'
                    : 'bg-white text-amber-900 border border-amber-900 hover:bg-amber-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-stone-300 text-amber-900 bg-white text-sm tracking-[0.05em]"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <div className="flex border border-stone-300 bg-white">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? 'bg-amber-900 text-white' : 'text-amber-900'}`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? 'bg-amber-900 text-white' : 'text-amber-900'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        <motion.div 
          className={`grid gap-8 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}
          layout
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="group cursor-pointer bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              layout
            >
              <Link to={`/product/${product.id}`}>
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
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-6">
                  <p className="text-xs text-stone-500 mb-2 tracking-[0.15em] uppercase">
                    {product.category}
                  </p>
                  <h3 className="text-lg font-light text-amber-900 mb-3 tracking-[0.05em]">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-lg font-medium text-amber-900 tracking-[0.05em]">
                      {product.price}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    {product.colors.map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="w-4 h-4 rounded-full border border-stone-300"
                        style={{
                          backgroundColor: color === "Charcoal" ? "#36454F" :
                                         color === "Navy" ? "#000080" :
                                         color === "Stone" ? "#8D7B68" :
                                         color === "White" ? "#FFFFFF" :
                                         color === "Blue" ? "#0066CC" :
                                         color === "Sage" ? "#87A96B" :
                                         color === "Khaki" ? "#C3B091" :
                                         color === "Olive" ? "#808000" :
                                         color === "Forest" ? "#355E3B" :
                                         color === "Cream" ? "#F5F5DC" :
                                         color === "Camel" ? "#C19A6B" : "#F5F5DC"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="border-2 border-amber-900 text-amber-900 px-16 py-4 text-sm font-medium tracking-[0.2em] uppercase hover:bg-amber-900 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
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

export default Men;