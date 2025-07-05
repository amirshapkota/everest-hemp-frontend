import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye, Package } from 'lucide-react';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Hemp Blazer',
      category: 'Blazers',
      price: 289000,
      stock: 15,
      status: 'Active',
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=200&h=250&fit=crop',
      sku: 'EH-BLZ-001',
      colors: ['Sage', 'Charcoal', 'Cream'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      id: 2,
      name: 'Organic Cotton Dress',
      category: 'Dresses',
      price: 189000,
      stock: 8,
      status: 'Active',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=200&h=250&fit=crop',
      sku: 'EH-DRS-002',
      colors: ['Natural', 'Terracotta', 'Forest'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      id: 3,
      name: 'Hemp Trousers',
      category: 'Trousers',
      price: 159000,
      stock: 3,
      status: 'Low Stock',
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=200&h=250&fit=crop',
      sku: 'EH-TRS-003',
      colors: ['Stone', 'Olive', 'Black'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      id: 4,
      name: 'Sustainable Cardigan',
      category: 'Knitwear',
      price: 129000,
      stock: 0,
      status: 'Out of Stock',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=200&h=250&fit=crop',
      sku: 'EH-CDG-004',
      colors: ['Cream', 'Camel', 'Sage'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    }
  ];

  const categories = ['All', 'Blazers', 'Dresses', 'Trousers', 'Knitwear', 'Blouses', 'Outerwear'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-amber-100 text-amber-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDeleteProduct = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      console.log('Deleting product:', productId);
      // Here you would typically call an API to delete the product
      // For now, we'll just show an alert
      alert('Product deleted successfully!');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const AddProductModal = () => (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
      >
        <div className="p-6 border-b border-stone-200">
          <h2 className="text-2xl font-light text-amber-900 tracking-[0.1em]">
            Add New Product
          </h2>
        </div>
        
        <div className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors"
                  placeholder="Enter product name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  SKU
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors"
                  placeholder="EH-XXX-000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Category
                </label>
                <select className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors">
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Status
                </label>
                <select className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors">
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Description
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors resize-none"
                placeholder="Product description..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Product Images
              </label>
              <div className="border-2 border-dashed border-stone-300 p-8 text-center">
                <p className="text-stone-500">Drag and drop images here or click to browse</p>
              </div>
            </div>
          </form>
        </div>
        
        <div className="p-6 border-t border-stone-200 flex justify-end space-x-4">
          <button
            onClick={() => setShowAddModal(false)}
            className="px-6 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-amber-900 text-white hover:bg-amber-800 transition-colors">
            Add Product
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  const ViewProductModal = () => {
    if (!selectedProduct) return null;
    
    return (
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowViewModal(false)}
      >
        <motion.div
          className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-stone-200">
            <h2 className="text-2xl font-light text-amber-900 tracking-[0.1em]">
              Product Details
            </h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover mb-4"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Product Name</label>
                  <p className="text-stone-700">{selectedProduct.name}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">SKU</label>
                  <p className="text-stone-700">{selectedProduct.sku}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Category</label>
                  <p className="text-stone-700">{selectedProduct.category}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Price</label>
                  <p className="text-stone-700">Rs. {selectedProduct.price.toLocaleString()}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Stock</label>
                  <p className="text-stone-700">{selectedProduct.stock} units</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Status</label>
                  <span className={`px-2 py-1 text-xs font-medium tracking-[0.05em] uppercase ${getStatusColor(selectedProduct.status)}`}>
                    {selectedProduct.status}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Colors</label>
                  <div className="flex space-x-2">
                    {selectedProduct.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 border border-stone-300"
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
                                         color === "Camel" ? "#C19A6B" : "#F5F5DC"
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Sizes</label>
                  <p className="text-stone-700">{selectedProduct.sizes.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-stone-200 flex justify-end space-x-4">
            <button
              onClick={() => setShowViewModal(false)}
              className="px-6 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                setShowViewModal(false);
                handleEditProduct(selectedProduct);
              }}
              className="px-6 py-2 bg-amber-900 text-white hover:bg-amber-800 transition-colors"
            >
              Edit Product
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const EditProductModal = () => {
    if (!selectedProduct) return null;
    
    return (
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowEditModal(false)}
      >
        <motion.div
          className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-stone-200">
            <h2 className="text-2xl font-light text-amber-900 tracking-[0.1em]">
              Edit Product: {selectedProduct.name}
            </h2>
          </div>
          
          <form className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  defaultValue={selectedProduct.name}
                  className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  SKU *
                </label>
                <input
                  type="text"
                  defaultValue={selectedProduct.sku}
                  className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Category *
                </label>
                <select
                  defaultValue={selectedProduct.category}
                  className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors"
                >
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Price (Rs.) *
                </label>
                <input
                  type="number"
                  defaultValue={selectedProduct.price}
                  className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  defaultValue={selectedProduct.stock}
                  className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Status *
                </label>
                <select
                  defaultValue={selectedProduct.status}
                  className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors"
                >
                  <option value="Active">Active</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Description
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors resize-none"
                placeholder="Product description..."
              />
            </div>
          </form>
          
          <div className="p-6 border-t border-stone-200 flex justify-end space-x-4">
            <button
              onClick={() => setShowEditModal(false)}
              className="px-6 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('Product updated successfully!');
                setShowEditModal(false);
              }}
              className="px-6 py-2 bg-amber-900 text-white hover:bg-amber-800 transition-colors"
            >
              Update Product
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <img 
                src="/logo-nobg.png" 
                alt="Everest Hemp" 
                className="h-14 w-14 sm:h-16 sm:w-16 lg:h-18 lg:w-18"
              />
              <div>
                <h1 className="text-3xl font-light text-amber-900 tracking-[0.1em]">
                  Product Catalog
                </h1>
                <p className="text-stone-600 tracking-[0.02em]">
                  Manage your product inventory
                </p>
              </div>
            </div>
            
            <motion.button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-amber-900 text-white px-6 py-3 hover:bg-amber-800 transition-colors shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={20} />
              <span className="tracking-[0.1em] uppercase text-sm font-medium">Add Product</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="bg-white p-6 shadow-lg border border-stone-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 transition-colors"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-stone-300 text-amber-900 bg-white focus:outline-none focus:border-amber-900 transition-colors"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category} Category</option>
              ))}
            </select>

            <div className="flex space-x-2">
              <button className="flex-1 px-4 py-2 border border-amber-900 text-amber-900 hover:bg-amber-50 transition-colors text-sm">
                Export CSV
              </button>
              <button className="flex-1 px-4 py-2 border border-amber-900 text-amber-900 hover:bg-amber-50 transition-colors text-sm">
                Bulk Edit
              </button>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white shadow-lg border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 text-xs font-medium tracking-[0.05em] uppercase ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex space-x-1">
                  <motion.button
                    className="p-2 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-amber-50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="View Product"
                    onClick={() => handleViewProduct(product)}
                  >
                    <Eye size={14} className="text-amber-900" />
                  </motion.button>
                  <motion.button
                    className="p-2 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-amber-50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Edit Product"
                    onClick={() => handleEditProduct(product)}
                  >
                    <Edit size={14} className="text-amber-900" />
                  </motion.button>
                  <motion.button
                    className="p-2 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-red-50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Delete Product"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 size={14} className="text-red-600" />
                  </motion.button>
                </div>
              </div>

              <div className="p-4">
                <p className="text-xs text-stone-500 mb-1 tracking-[0.1em] uppercase">
                  {product.category}
                </p>
                <h3 className="text-lg font-light text-amber-900 mb-2 tracking-[0.05em]">
                  {product.name}
                </h3>
                <p className="text-xs text-stone-500 mb-3">
                  SKU: {product.sku}
                </p>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-medium text-amber-900">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  <span className={`text-sm ${
                    product.stock > 10 ? 'text-green-600' :
                    product.stock > 0 ? 'text-amber-600' :
                    'text-red-600'
                  }`}>
                    Stock: {product.stock}
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-stone-500 mb-1">Colors:</p>
                    <div className="flex space-x-1">
                      {product.colors.slice(0, 3).map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="w-4 h-4 border border-stone-300"
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
                                           color === "Camel" ? "#C19A6B" : "#F5F5DC"
                          }}
                        />
                      ))}
                      {product.colors.length > 3 && (
                        <span className="text-xs text-stone-500">+{product.colors.length - 3}</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-stone-500 mb-1">Sizes:</p>
                    <p className="text-xs text-stone-600">
                      {product.sizes.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Package size={48} className="text-stone-400 mx-auto mb-4" />
            <h3 className="text-xl font-light text-stone-600 mb-2">
              No products found
            </h3>
            <p className="text-stone-500">
              Try adjusting your search or filter criteria.
            </p>
          </motion.div>
        )}

        {/* Add Product Modal */}
        {showAddModal && <AddProductModal />}
        
        {/* View Product Modal */}
        {showViewModal && <ViewProductModal />}
        
        {/* Edit Product Modal */}
        {showEditModal && <EditProductModal />}
      </div>
    </div>
  );
};

export default AdminProducts;