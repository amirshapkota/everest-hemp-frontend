import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Plus, Search, Edit, Trash2, Tag, Package, Eye } from 'lucide-react';

const AdminCategories = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch categories');
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

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
    category.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.collection?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (categoryId: string) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    setSaving(true);
    setError("");
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete category');
      setCategories((prev) => prev.filter(c => c._id !== categoryId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete category');
    }
    setSaving(false);
  };

  // Add/Edit modal stub
  const CategoryModal = () => {
    const isEdit = !!editingCategory;
    const [form, setForm] = useState({
      name: editingCategory?.name || '',
      description: editingCategory?.description || '',
      collection: editingCategory?.collection || '',
      status: editingCategory?.status || 'Active',
    });
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        let res, data;
        if (isEdit) {
          res = await fetch(`/api/categories/${editingCategory._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(form)
          });
        } else {
          res = await fetch('/api/categories', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(form)
          });
        }
        if (!res.ok) throw new Error(isEdit ? 'Failed to update category' : 'Failed to add category');
        data = await res.json();
        if (isEdit) {
          setCategories(prev => prev.map(c => c._id === data._id ? data : c));
        } else {
          setCategories(prev => [data, ...prev]);
        }
        setShowAddModal(false);
        setEditingCategory(null);
      } catch (err: any) {
        setError(err.message || (isEdit ? 'Failed to update category' : 'Failed to add category'));
      }
      setSaving(false);
    };

    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <form onSubmit={handleSubmit} className="bg-white max-w-md w-full p-8 rounded shadow-lg relative">
          <h2 className="text-2xl font-light text-amber-900 mb-6">{isEdit ? 'Edit' : 'Add'} Category</h2>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <div className="grid grid-cols-1 gap-4">
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="border px-4 py-2" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border px-4 py-2" />
            <input name="collection" value={form.collection} onChange={handleChange} placeholder="Collection" className="border px-4 py-2" />
            <div>
              <label className="mr-2">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="border px-4 py-2">
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-6 space-x-2">
            <button type="button" onClick={() => { setShowAddModal(false); setEditingCategory(null); }} className="px-4 py-2 border border-stone-300 text-stone-700">Cancel</button>
            <button type="submit" disabled={saving} className="px-6 py-2 bg-amber-900 text-white hover:bg-amber-800 transition-colors">{saving ? (isEdit ? 'Saving...' : 'Adding...') : (isEdit ? 'Update Category' : 'Add Category')}</button>
          </div>
        </form>
      </div>
    );
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

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
                  {categories.reduce((sum, c) => sum + (c.productCount || 0), 0)}
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
              key={category._id}
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
                      {category.productCount || 0} products
                    </span>
                  </div>
                  <span className="text-xs text-stone-500">
                    Created {category.createdDate ? new Date(category.createdDate).toLocaleDateString() : ''}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    onClick={() => console.log('View products in category:', category._id)}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 border border-amber-900 text-amber-900 hover:bg-amber-50 transition-colors text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Eye size={14} />
                    <span>View Products</span>
                  </motion.button>
                  <motion.button
                    onClick={() => setEditingCategory(category)}
                    className="p-2 border border-amber-900 text-amber-900 hover:bg-amber-50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Edit Category"
                  >
                    <Edit size={14} />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(category._id)}
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
        {/* Add/Edit Category Modal */}
        {showAddModal && <CategoryModal />}
      </div>
    </div>
  );
};

export default AdminCategories;