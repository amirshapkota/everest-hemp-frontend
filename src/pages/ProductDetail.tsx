import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Truck, Shield, RotateCcw, Leaf, Eye, Share2, MessageCircle } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import NoProductsFound from '../components/NoProductsFound';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Sage');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showReviews, setShowReviews] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [inWishlist, setInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  // Color name to hex mapping
  const COLOR_MAP: Record<string, string> = {
    'Sage': '#87A96B',
    'Charcoal': '#36454F',
    'Cream': '#F5F5DC',
    'Natural': '#F4F1E8',
    'Terracotta': '#E2725B',
    'Forest': '#355E3B',
    'Stone': '#8D7B68',
    'Olive': '#808000',
    'Black': '#000000',
    'Ivory': '#FFFFF0',
    'Blush': '#DE5D83',
    'Camel': '#C19A6B',
    'Navy': '#000080',
    'White': '#FFFFFF',
    'Blue': '#0066CC',
    'Khaki': '#C3B091',
  };

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
        if (data.sizes && data.sizes.length > 0) setSelectedSize(data.sizes[0]);
        if (data.colors && data.colors.length > 0) setSelectedColor(data.colors[0]);
        // Fetch related products by category
        if (data.category) {
          fetch(`/api/products?category=${encodeURIComponent(data.category)}`)
            .then(res => res.json())
            .then(products => {
              // Exclude the current product
              setRelatedProducts(products.filter((p: any) => p._id !== data._id).slice(0, 3));
            });
        } else {
          setRelatedProducts([]);
        }
      })
      .catch(() => {
        setError('Failed to load product');
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      if (!user || !product?._id) return;
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/wishlist', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) return;
        const data = await res.json();
        setInWishlist(data.some((item: any) => item._id === product._id));
      } catch {}
    };
    fetchWishlistStatus();
  }, [user, product?._id]);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2024-01-10",
      comment: "Absolutely love this blazer! The quality is exceptional and it fits perfectly. The hemp fabric is so comfortable and sustainable.",
      verified: true
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 4,
      date: "2024-01-08",
      comment: "Great quality and design. The color is exactly as shown. Delivery was fast too.",
      verified: true
    },
    {
      id: 3,
      name: "Emma Wilson",
      rating: 5,
      date: "2024-01-05",
      comment: "This is my second purchase from Everest Hemp. The craftsmanship is outstanding and I love supporting sustainable fashion.",
      verified: true
    }
  ];

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      product: product._id || product.id || id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '',
      color: selectedColor,
      size: selectedSize,
      quantity
    });
  };

  const handleAddToWishlist = async () => {
    if (!user || !product?._id) return;
    setWishlistLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId: product._id })
      });
      if (res.ok) setInWishlist(true);
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (!user || !product?._id) return;
    setWishlistLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/wishlist/${product._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setInWishlist(false);
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  // Map product colors to objects for rendering
  const mappedColors = (product?.colors || []).map((c: string) => {
    // If it's a hex code, use as value
    if (/^#([0-9A-F]{3}){1,2}$/i.test(c)) {
      return { name: c, value: c };
    }
    // If it's a known color name, map to hex
    if (COLOR_MAP[c]) {
      return { name: c, value: COLOR_MAP[c] };
    }
    // Fallback: use as both name and value
    return { name: c, value: c };
  });

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        {/* Breadcrumb */}
        <motion.nav
          className="mb-6 lg:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-2 text-sm text-stone-600">
            <Link to="/" className="hover:text-amber-900 transition-colors">Home</Link>
            <span>/</span>
            {product?.category && (
              <>
                <Link to={`/${(product.category || '').toLowerCase()}`} className="hover:text-amber-900 transition-colors">
                  {product.category}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-amber-900">{product?.name}</span>
          </div>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images */}
          <motion.div 
            className="space-y-4 lg:space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative overflow-hidden bg-white shadow-2xl">
              <motion.img
                src={product?.images[activeImage]}
                alt={product?.name}
                className="w-full h-80 sm:h-96 lg:h-[600px] object-cover"
                key={activeImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              />
              
              <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                <img 
                  src="/logo-nobg.png" 
                  alt="Everest Hemp" 
                  className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 opacity-80"
                />
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 lg:top-6 lg:right-6 flex flex-col space-y-2">
                <motion.button
                  onClick={handleShare}
                  className="p-2 lg:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-amber-50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Share Product"
                >
                  <Share2 size={16} className="text-amber-900 lg:w-[18px] lg:h-[18px]" />
                </motion.button>
                
                <motion.button
                  onClick={() => setShowReviews(!showReviews)}
                  className="p-2 lg:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-amber-50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="View Reviews"
                >
                  <MessageCircle size={16} className="text-amber-900 lg:w-[18px] lg:h-[18px]" />
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 lg:gap-4">
              {product?.images.map((image: any, index: any) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative overflow-hidden bg-white shadow-lg ${
                    activeImage === index ? 'ring-2 ring-amber-900' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={image}
                    alt={`${product?.name} ${index + 1}`}
                    className="w-full h-20 lg:h-24 object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            className="space-y-6 lg:space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <motion.div
                className="flex items-center justify-between mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-stone-500 tracking-[0.1em] uppercase">SKU: {product?.sku}</span>
                  {product?.inStock && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-medium tracking-[0.05em] uppercase">
                      In Stock
                    </span>
                  )}
                </div>
                <motion.button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-amber-900 hover:text-amber-700 transition-colors text-sm underline"
                  whileHover={{ scale: 1.05 }}
                >
                  Size Guide
                </motion.button>
              </motion.div>

              <motion.h1 
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-amber-900 mb-4 tracking-[0.1em]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {product?.name}
              </motion.h1>
              
              <motion.div 
                className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6 space-y-2 sm:space-y-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <span className="text-2xl lg:text-3xl font-medium text-amber-900 tracking-[0.05em]">
                  {product?.price}
                </span>
                {product?.originalPrice && (
                  <span className="text-lg lg:text-xl text-stone-400 line-through">
                    {product?.originalPrice}
                  </span>
                )}
                {product?.originalPrice && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 text-xs font-medium tracking-[0.05em] uppercase">
                    Save Rs. {(parseInt(product?.originalPrice.replace(/[^0-9]/g, '')) - parseInt(product?.price.replace(/[^0-9]/g, ''))).toLocaleString()}
                  </span>
                )}
              </motion.div>

              <motion.div 
                className="flex items-center space-x-4 mb-6 lg:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < Math.floor(product?.rating) ? 'text-amber-400 fill-current' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-stone-600">
                  {product?.rating} ({product?.reviews} reviews)
                </span>
                <motion.button
                  onClick={() => setShowReviews(!showReviews)}
                  className="text-amber-900 hover:text-amber-700 transition-colors text-sm underline"
                  whileHover={{ scale: 1.05 }}
                >
                  Read Reviews
                </motion.button>
              </motion.div>

              <motion.p 
                className="text-base lg:text-lg text-stone-600 leading-relaxed mb-6 lg:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {product?.description}
              </motion.p>
            </div>

            {/* Color Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-base lg:text-lg font-medium text-amber-900 mb-4 tracking-[0.05em]">
                Color: {selectedColor}
              </h3>
              <div className="flex space-x-2 lg:space-x-3">
                {mappedColors.map((color: any) => (
                  <motion.button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 ${
                      selectedColor === color.name ? 'border-amber-900 ring-2 ring-amber-200' : 'border-stone-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={color.name}
                  />
                ))}
              </div>
            </motion.div>

            {/* Size Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <h3 className="text-base lg:text-lg font-medium text-amber-900 mb-4 tracking-[0.05em]">
                Size: {selectedSize}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 lg:gap-3">
                {product?.sizes.map((size: any) => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 lg:py-3 text-xs lg:text-sm font-medium tracking-[0.1em] border transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-amber-900 text-white border-amber-900'
                        : 'bg-white text-amber-900 border-stone-300 hover:border-amber-900'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Quantity and Add to Cart */}
            <motion.div 
              className="space-y-4 lg:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div>
                <h3 className="text-base lg:text-lg font-medium text-amber-900 mb-4 tracking-[0.05em]">
                  Quantity
                </h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 lg:w-12 lg:h-12 border border-stone-300 text-amber-900 hover:bg-amber-50 transition-colors text-sm lg:text-base"
                  >
                    -
                  </button>
                  <span className="text-base lg:text-lg font-medium text-amber-900 w-10 lg:w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 lg:w-12 lg:h-12 border border-stone-300 text-amber-900 hover:bg-amber-50 transition-colors text-sm lg:text-base"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <motion.button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-amber-900 text-white py-3 lg:py-4 px-6 lg:px-8 text-xs lg:text-sm font-medium tracking-[0.1em] uppercase hover:bg-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 lg:space-x-3"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingBag size={16} className="lg:w-[18px] lg:h-[18px]" />
                  <span>Add to Cart</span>
                </motion.button>
                
                <motion.button
                  onClick={inWishlist ? handleRemoveFromWishlist : handleAddToWishlist}
                  disabled={wishlistLoading}
                  className={`sm:w-auto w-full p-3 lg:p-4 border-2 ${inWishlist ? 'bg-amber-900 text-white border-amber-900' : 'border-amber-900 text-amber-900 hover:bg-amber-50'} transition-colors flex items-center justify-center`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart size={16} className="lg:w-[18px] lg:h-[18px]" fill={inWishlist ? '#fff' : 'none'} />
                  <span className="ml-2 sm:hidden text-xs uppercase tracking-[0.1em]">
                    {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </span>
                </motion.button>
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-4">
                <Link to="/checkout">
                  <motion.button
                    className="flex-1 border-2 border-amber-900 text-amber-900 py-3 px-6 text-xs lg:text-sm font-medium tracking-[0.1em] uppercase hover:bg-amber-900 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Buy Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <h3 className="text-base lg:text-lg font-medium text-amber-900 mb-4 tracking-[0.05em]">
                Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                {product?.features.map((feature: any, index: any) => (
                  <div key={index} className="flex items-center space-x-2 lg:space-x-3">
                    <Leaf size={14} className="text-amber-900 lg:w-4 lg:h-4" />
                    <span className="text-sm text-stone-600">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Shipping Info */}
            <motion.div 
              className="border-t border-stone-200 pt-6 lg:pt-8 space-y-3 lg:space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="flex items-center space-x-2 lg:space-x-3">
                <Truck size={16} className="text-amber-900 lg:w-[18px] lg:h-[18px]" />
                <span className="text-sm text-stone-600">Free shipping on orders over Rs. 50,000</span>
              </div>
              <div className="flex items-center space-x-2 lg:space-x-3">
                <RotateCcw size={16} className="text-amber-900 lg:w-[18px] lg:h-[18px]" />
                <span className="text-sm text-stone-600">30-day return policy</span>
              </div>
              <div className="flex items-center space-x-2 lg:space-x-3">
                <Shield size={16} className="text-amber-900 lg:w-[18px] lg:h-[18px]" />
                <span className="text-sm text-stone-600">2-year warranty included</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        {showReviews && (
          <motion.div
            className="mt-12 lg:mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl lg:text-3xl font-light text-amber-900 mb-6 lg:mb-8 tracking-[0.1em]">
              Customer Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  className="bg-white p-6 shadow-lg border border-stone-200"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < review.rating ? 'text-amber-400 fill-current' : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                    {review.verified && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-medium">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-stone-700 mb-4 leading-relaxed">
                    {review.comment}
                  </p>
                  <div className="flex justify-between items-center text-sm text-stone-500">
                    <span>{review.name}</span>
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Related Products */}
        <motion.div
          className="mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-2xl lg:text-3xl font-light text-amber-900 mb-6 lg:mb-8 tracking-[0.1em]">
            You Might Also Like
          </h2>
          {relatedProducts.length === 0 ? (
            <NoProductsFound message="No related products found in this category." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct: any, index: number) => (
                <motion.div
                  key={relatedProduct._id}
                  className="group cursor-pointer bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Link to={`/product/${relatedProduct._id}`}>
                    <div className="relative overflow-hidden">
                      <img
                        src={relatedProduct.images?.[0] || '/placeholder.jpg'}
                        alt={relatedProduct.name}
                        className="w-full h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-4 lg:p-6">
                      <h3 className="text-lg font-light text-amber-900 mb-2 tracking-[0.05em]">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg font-medium text-amber-900">
                        Rs. {relatedProduct.price?.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;