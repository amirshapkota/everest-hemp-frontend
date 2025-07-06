import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserWishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/wishlist', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch wishlist');
        const data = await res.json();
        setWishlist(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch wishlist');
      }
      setLoading(false);
    };
    if (user) fetchWishlist();
  }, [user]);

  const removeFromWishlist = async (productId: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/wishlist/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to remove from wishlist');
      setWishlist(wishlist.filter(item => item._id !== productId));
    } catch (err) {
      alert('Failed to remove from wishlist');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 pt-20">
        <Heart size={48} className="text-amber-900 mb-6" />
        <h1 className="text-3xl font-light text-amber-900 mb-4 tracking-[0.1em]">Your Wishlist is Empty</h1>
        <p className="text-lg text-stone-600 mb-8">Start adding your favorite products!</p>
        <Link to="/all-products">
          <motion.button
            className="bg-amber-900 text-white px-8 py-3 text-sm font-medium tracking-[0.1em] uppercase hover:bg-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Browse Products
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-light text-amber-900 mb-8 tracking-[0.15em]">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((item, index) => (
            <motion.div
              key={item._id}
              className="bg-white p-6 shadow-lg border border-stone-200 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img
                src={item.images?.[0] || item.image}
                alt={item.name}
                className="w-full h-56 object-cover mb-4"
              />
              <h2 className="text-lg font-medium text-amber-900 mb-2">{item.name}</h2>
              <p className="text-base text-amber-900 mb-2">Rs. {item.price?.toLocaleString()}</p>
              <div className="flex-1" />
              <div className="flex space-x-2 mt-4">
                <motion.button
                  onClick={() => removeFromWishlist(item._id)}
                  className="flex-1 bg-red-100 text-red-700 py-2 rounded hover:bg-red-200 transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <X size={16} className="mr-2" /> Remove
                </motion.button>
                <Link to={`/product/${item._id}`} className="flex-1">
                  <motion.button
                    className="w-full bg-amber-900 text-white py-2 rounded hover:bg-amber-800 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingBag size={16} className="mr-2" /> View
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserWishlist;