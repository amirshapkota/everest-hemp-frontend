import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  {
    title: "Women",
    subtitle: "Fall Winter 2024",
    image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    link: "#women"
  },
  {
    title: "Men",
    subtitle: "Fall Winter 2024",
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    link: "#men"
  }
];

const CategoryShowcase = () => {
  return (
    <section className="py-0">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {categories.map((category, index) => (
            <motion.div 
              key={index} 
              className="group cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative h-80 sm:h-96 lg:h-[700px]">
                <motion.img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 1.2 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-amber-900/40"
                  whileHover={{ background: "linear-gradient(to bottom, rgba(120, 53, 15, 0.2), transparent, rgba(120, 53, 15, 0.6))" }}
                  transition={{ duration: 0.5 }}
                />
                
                <motion.div 
                  className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.h3 
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-4 lg:mb-6 tracking-[0.15em] sm:tracking-[0.25em] uppercase drop-shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {category.title}
                  </motion.h3>
                  <motion.p 
                    className="text-lg sm:text-xl tracking-[0.1em] sm:tracking-[0.15em] mb-6 lg:mb-10 opacity-90 drop-shadow-md"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.9 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    {category.subtitle}
                  </motion.p>
                  <motion.button 
                    className="border-2 border-white text-white px-6 sm:px-8 lg:px-12 py-3 lg:py-4 text-xs sm:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase hover:bg-white hover:text-amber-900 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                    viewport={{ once: true }}
                   onClick={() => window.location.href = category.title === "Women" ? "/women" : "/men"}
                  >
                    Shop Now
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;