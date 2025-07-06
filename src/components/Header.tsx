import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, User, Heart, LogOut, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/all-products?q=${encodeURIComponent(searchQuery)}`;
      setShowSearch(false);
      setSearchQuery('');
    }
  };
  return (
    <motion.header 
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} className="text-amber-900" /> : <Menu size={20} className="text-amber-900" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 lg:space-x-3">
            <motion.div 
              className="flex items-center space-x-2 lg:space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="/logo-nobg.png" 
                alt="Everest Hemp" 
                className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 object-contain"
              />
              <h1 className="text-lg lg:text-2xl font-bold tracking-[0.15em] text-amber-900 hidden sm:block">
                EVEREST HEMP
              </h1>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-12">
            {[
              { name: 'Women', path: '/women' },
              { name: 'Men', path: '/men' },
              { name: 'All Products', path: '/all-products' }
            ].map((item, index) => (
              <motion.a
                key={item.name}
                href={item.path}
                className={`text-amber-900 hover:text-amber-700 transition-colors text-sm font-medium tracking-[0.1em] uppercase relative group ${
                  location.pathname === item.path ? 'text-amber-700' : ''
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={item.path}>
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-full ${
                    location.pathname === item.path ? 'w-full' : 'w-0'
                  }`}></span>
                </Link>
              </motion.a>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-amber-50 rounded-full transition-colors hidden sm:block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search size={16} className="text-amber-900" />
            </motion.button>
            
            <Link to="/wishlist">
              <motion.button
                className="p-2 hover:bg-amber-50 rounded-full transition-colors hidden sm:block"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart size={16} className="text-amber-900" />
              </motion.button>
            </Link>
            
            {/* User Menu */}
            <div className="relative">
              <motion.button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 hover:bg-amber-50 rounded-full transition-colors hidden sm:block"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <User size={16} className="text-amber-900" />
              </motion.button>
              
              {showUserMenu && (
                <motion.div
                  className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-stone-200 z-50 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {user ? (
                    <div className="py-2">
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-50 transition-colors">
                        Dashboard
                      </Link>
                      <Link to="/profile" className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-50 transition-colors">
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-amber-900 hover:bg-amber-50 transition-colors flex items-center space-x-2"
                      >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <div className="py-2">
                      <Link to="/login" className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-50 transition-colors">
                        Sign In
                      </Link>
                      <Link to="/register" className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-50 transition-colors">
                        Create Account
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
            
            <Link to="/cart">
              <motion.button 
                className="p-2 hover:bg-amber-50 rounded-full transition-colors relative ml-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag size={16} className="text-amber-900" />
                <span className="absolute -top-1 -right-1 bg-amber-900 text-white text-xs rounded-full h-3 w-3 lg:h-4 lg:w-4 flex items-center justify-center text-[8px] lg:text-[10px]">
                  {cartCount}
                </span>
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <motion.div 
            className="border-t border-amber-100 py-4 bg-white/95 backdrop-blur-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto px-4">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 transition-colors bg-white"
                  autoFocus
                />
              </div>
            </form>
          </motion.div>
        )}
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            className="lg:hidden border-t border-amber-100 py-4 bg-white/95 backdrop-blur-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-4 px-4">
              {[
                { name: 'Home', path: '/', icon: Home },
                { name: 'Women', path: '/women' },
                { name: 'Men', path: '/men' },
                { name: 'All Products', path: '/all-products' }
              ].map((item) => (
                <motion.div
                  key={item.name} 
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    to={item.path} 
                    className="flex items-center space-x-3 text-amber-900 hover:text-amber-700 transition-colors text-sm font-medium tracking-[0.1em] uppercase py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && <item.icon size={16} />}
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile User Actions */}
              <div className="border-t border-stone-200 pt-4 mt-4 space-y-4">
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={() => setShowSearch(!showSearch)}
                    className="flex items-center space-x-2 text-amber-900 hover:text-amber-700 transition-colors text-sm"
                    whileHover={{ x: 5 }}
                  >
                    <Search size={16} />
                    <span>Search</span>
                  </motion.button>
                  
                  <motion.button
                    className="flex items-center space-x-2 text-amber-900 hover:text-amber-700 transition-colors text-sm"
                    whileHover={{ x: 5 }}
                  >
                    <Heart size={16} />
                    <span>Wishlist</span>
                  </motion.button>
                </div>
                
                {user ? (
                  <div className="space-y-2">
                    <Link 
                      to="/dashboard" 
                      className="flex items-center space-x-2 text-amber-900 hover:text-amber-700 transition-colors text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={16} />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-amber-900 hover:text-amber-700 transition-colors text-sm"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link 
                      to="/login" 
                      className="flex items-center space-x-2 text-amber-900 hover:text-amber-700 transition-colors text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={16} />
                      <span>Sign In</span>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;