import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface NoProductsFoundProps {
  message?: string;
  searchQuery?: string;
  onClearFilters?: (() => void) | null;
  extraActions?: React.ReactNode;
}

const NoProductsFound: React.FC<NoProductsFoundProps> = ({
  message = 'Try adjusting your filters to see more products.',
  searchQuery,
  onClearFilters,
  extraActions
}) => {
  return (
    <motion.div
      className="text-center py-16"
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
        {searchQuery
          ? `No products match your search for "${searchQuery}". Try different keywords or browse our collections.`
          : message}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="bg-amber-900 text-white px-8 py-3 text-sm font-medium tracking-[0.2em] uppercase hover:bg-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Clear Filters
          </button>
        )}
        <Link to="/all-products">
          <button className="border-2 border-amber-900 text-amber-900 px-8 py-3 text-sm font-medium tracking-[0.2em] uppercase hover:bg-amber-900 hover:text-white transition-all duration-300">
            Browse All Products
          </button>
        </Link>
        {extraActions}
      </div>
    </motion.div>
  );
};

export default NoProductsFound; 