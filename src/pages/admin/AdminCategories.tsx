import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Tag, Package, Eye } from 'lucide-react';

const AdminCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    collection: 'Women',
    status: 'Active'
  });

  const categories = [
    {
      id: 1,
      name: 'Blazers',
      description: 'Professional and casual blazers for all occasions',
      collection: 'Women',
      productCount: 12,
      status: 'Active',
      createdDate: '2024-01-10'
    },
    {
      id: 2,
      name: 'Dresses',
      description: 'Elegant and comfortable dresses',
      collection: 'Women',
      productCount: 18,
      status: 'Active',
      createdDate: '2024-01-08'
    },
    {
      id: 3,
      name: 'Trousers',
      description: 'Sustainable trousers and pants',
      collection: 'Women',
      productCount: 15,
      status: 'Active',
      createdDate: '2024-01-05'
    },
    {
      id: 4,
      name: 'Knitwear',
      description: 'Cozy sweaters and cardigans',
      collection: 'Women',
      productCount: 8,
      status: 'Active',
      createdDate: '2024-01-03'
    },
    {
      id: 5,
      name: 'Blouses',
      description: 'Elegant blouses and shirts',
      collection: 'Women',
      productCount: 10,
      status: 'Active',
      createdDate: '2024-01-01'
    },
    {
      id: 6,
      name: 'Outerwear',
      description: 'Coats, jackets and outerwear',
      collection: 'Women',
      productCount: 6,
      status: 'Active',
      createdDate: '2023-12-28'
    },
    {
      id: 7,
      name: 'Suits',
      description: 'Professional suits and formal wear',
      collection: 'Men',
      productCount: 8,
      status: 'Active',
      createdDate: '2024-01-12'
    },
    {
      id: 8,
      name: 'Shirts',
      description: 'Dress shirts and casual shirts',
      collection: 'Men',
      productCount: 14,
      status: 'Active',
      createdDate: '2024-01-09'
    },
    {
      id: 9,
      name: 'Casual',
      description: 'Casual wear and everyday clothing',
      collection: 'Men',
      productCount: 11,
      status: 'Active',
      createdDate: '2024-01-06'
    },
    {
      id: 10,
      name: 'Accessories',
      description: 'Belts, ties and accessories',
      collection: 'Men',
      productCount: 3,
      status: 'Draft',
      createdDate: '2024-01-02'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-amber-100 text-amber-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.collection.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Category data:', formData);
    setShowAddModal(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', collection: 'Women', status: 'Active' });
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      collection: category.collection,
      status: category.status
    });
    setShowAddModal(true);
  };

  const handleDelete = (categoryId: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      console.log('Delete category:', categoryId);
    }
  };

  const CategoryModal = () => (
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
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors"
                placeholder="Enter category name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors resize-none"
                placeholder="Enter category description"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Collection *
                </label>
                <select
                  value={formData.collection}
                  onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors"
                >
                  <option value="Women">Women</option>
                  <option value="Men">Men</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-stone-200">
            <button
              type="button"
              onClick={() => {
                setShowAddModal(false);
                setEditingCategory(null);
                setFormData({ name: '', description: '', collection: 'Women', status: 'Active' });
              }}
              className="px-6 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-amber-900 text-white hover:bg-amber-800 transition-colors"
            >
              {editingCategory ? 'Update Category' : 'Add Category'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );

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
                  Category Management
                </h1>
                <p className="text-stone-600 tracking-[0.02em]">
                  Organize your product categories
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
              <span className="tracking-[0.1em] uppercase text-sm font-medium">Add Category</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white p-6 shadow-lg border border-stone-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-light text-amber-900">
                  {categories.length}
                </p>
                <p className="text-sm text-stone-600 uppercase tracking-[0.05em]">
                  Total Categories
                </p>
              </div>
              <Tag size={24} className="text-amber-900" />
            </div>
          </div>

          <div className="bg-white p-6 shadow-lg border border-stone-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-light text-amber-900">
                  {categories.filter(c => c.status === 'Active').length}
                </p>
                <p className="text-sm text-stone-600 uppercase tracking-[0.05em]">
                  Active Categories
                </p>
              </div>
              <Tag size={24} className="text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 shadow-lg border border-stone-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-light text-amber-900">
                  {categories.filter(c => c.collection === 'Women').length}
                </p>
                <p className="text-sm text-stone-600 uppercase tracking-[0.05em]">
                  Women's Categories
                </p>
              </div>
              <Tag size={24} className="text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 shadow-lg border border-stone-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-light text-amber-900">
                  {categories.reduce((sum, c) => sum + c.productCount, 0)}
                </p>
                <p className="text-sm text-stone-600 uppercase tracking-[0.05em]">
                  Total Products
                </p>
              </div>
              <Package size={24} className="text-blue-600" />
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          className="bg-white p-6 shadow-lg border border-stone-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 transition-colors"
            />
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="bg-white shadow-lg border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-stone-100 rounded-lg flex items-center justify-center">
                      <Tag size={24} className="text-amber-900" />
                    </div>
                    <div>
                      <h3 className="text-lg font-light text-amber-900 tracking-[0.05em]">
                        {category.name}
                      </h3>
                      <p className="text-sm text-stone-500">
                        {category.collection}
                      </p>
                    </div>
                  </div>
                  
                  <span className={`px-2 py-1 text-xs font-medium tracking-[0.05em] uppercase ${getStatusColor(category.status)}`}>
                    {category.status}
                  </span>
                </div>

                <p className="text-stone-600 text-sm mb-4 leading-relaxed">
                  {category.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Package size={16} className="text-amber-900" />
                    <span className="text-sm font-medium text-amber-900">
                      {category.productCount} products
                    </span>
                  </div>
                  <span className="text-xs text-stone-500">
                    Created {new Date(category.createdDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <motion.button
                    onClick={() => console.log('View products in category:', category.id)}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 border border-amber-900 text-amber-900 hover:bg-amber-50 transition-colors text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Eye size={14} />
                    <span>View Products</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => handleEdit(category)}
                    className="p-2 border border-amber-900 text-amber-900 hover:bg-amber-50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Edit Category"
                  >
                    <Edit size={14} />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Delete Category"
                  >
                    <Trash2 size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Tag size={48} className="text-stone-400 mx-auto mb-4" />
            <h3 className="text-xl font-light text-stone-600 mb-2">
              No categories found
            </h3>
            <p className="text-stone-500">
              Try adjusting your search criteria or add a new category.
            </p>
          </motion.div>
        )}

        {/* Category Modal */}
        {showAddModal && <CategoryModal />}
      </div>
    </div>
  );
};

export default AdminCategories;