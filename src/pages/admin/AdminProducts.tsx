import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye, Package } from 'lucide-react';

const AdminProducts = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/products', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch products');
      }
      setLoading(false);
    };
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(['All', ...data.map((c: any) => c.name)]);
      } catch {}
    };
    fetchProducts();
    fetchCategories();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-amber-100 text-amber-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setSaving(true);
    setError("");
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete product');
      setProducts((prev) => prev.filter(p => p._id !== productId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete product');
    }
    setSaving(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const AddProductModal = () => {
    const initialForm = {
      name: '',
      description: '',
      price: '',
      images: [''],
      category: categories[1] || '',
      collection: 'Women',
      colors: '',
      sizes: '',
      inStock: true,
      sku: '',
      status: 'Active',
    };
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    // Reset form and error when modal opens
    React.useEffect(() => {
      setForm(initialForm);
      setError('');
    }, [showAddModal]);

    // Close modal on Escape key
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setShowAddModal(false);
      };
      if (showAddModal) {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }
    }, [showAddModal]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      if (type === 'checkbox') {
        setForm(f => ({ ...f, [name]: (e.target as HTMLInputElement).checked }));
      } else {
        setForm(f => ({ ...f, [name]: value }));
      }
    };

    const handleImageChange = (idx: number, value: string) => {
      setForm(f => {
        const images = [...f.images];
        images[idx] = value;
        return { ...f, images };
      });
    };

    const addImageField = () => setForm(f => ({ ...f, images: [...f.images, ''] }));
    const removeImageField = (idx: number) => setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));

    const handleBackgroundClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) setShowAddModal(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      setError('');
      // Basic validation
      if (!form.name.trim() || !form.price || !form.category) {
        setError('Name, price, and category are required.');
        setSaving(false);
        return;
      }
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            ...form,
            price: Number(form.price),
            colors: form.colors.split(',').map((c: string) => c.trim()).filter(Boolean),
            sizes: form.sizes.split(',').map((s: string) => s.trim()).filter(Boolean),
          })
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || 'Failed to add product');
        }
        const newProduct = await res.json();
        setProducts(prev => [newProduct, ...prev]);
        setShowAddModal(false);
      } catch (err: any) {
        setError(err.message || 'Failed to add product');
      }
      setSaving(false);
    };

    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={handleBackgroundClick}>
        <form onSubmit={handleSubmit} className="bg-white max-w-lg w-full p-8 rounded shadow-lg relative overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-amber-900">Add Product</h2>
            <button type="button" onClick={() => setShowAddModal(false)} className="p-2 rounded-full hover:bg-stone-100 transition-colors" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Product name" className="border px-4 py-2 w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border px-4 py-2 w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">Price (Rs) *</label>
                <input name="price" value={form.price} onChange={handleChange} required placeholder="Price" type="number" min="0" className="border px-4 py-2 w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">SKU</label>
                <input name="sku" value={form.sku} onChange={handleChange} placeholder="SKU" className="border px-4 py-2 w-full" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Category *</label>
              <select name="category" value={form.category} onChange={handleChange} required className="border px-4 py-2 w-full">
                {categories.slice(1).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">Collection</label>
                <select
                  className="w-full border border-stone-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-900"
                  value={form.collection}
                  onChange={e => setForm(f => ({ ...f, collection: e.target.value }))}
                >
                  <option value="Women">Women</option>
                  <option value="Men">Men</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="border px-4 py-2 w-full">
                  <option value="Active">Active</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">Colors (comma separated)</label>
                <input name="colors" value={form.colors} onChange={handleChange} placeholder="e.g. #000000, #ffffff, red" className="border px-4 py-2 w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">Sizes (comma separated)</label>
                <input name="sizes" value={form.sizes} onChange={handleChange} placeholder="e.g. S, M, L, XL" className="border px-4 py-2 w-full" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-amber-900">In Stock</label>
              <input name="inStock" type="checkbox" checked={form.inStock} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Images</label>
              {form.images.map((img, idx) => (
                <div key={idx} className="flex items-center mb-2">
                  <input value={img} onChange={e => handleImageChange(idx, e.target.value)} placeholder="Image URL" className="border px-4 py-2 flex-1" />
                  {form.images.length > 1 && <button type="button" onClick={() => removeImageField(idx)} className="ml-2 text-red-600">Remove</button>}
                </div>
              ))}
              <button type="button" onClick={addImageField} className="mt-2 text-amber-900">+ Add Image</button>
            </div>
          </div>
          <div className="flex justify-end mt-8 space-x-2">
            <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-stone-300 text-stone-700">Cancel</button>
            <button type="submit" disabled={saving} className="px-6 py-2 bg-amber-900 text-white hover:bg-amber-800 transition-colors flex items-center">
              {saving && <span className="loader mr-2" aria-label="Saving..." />}
              {saving ? 'Saving...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const EditProductModal = () => {
    if (!selectedProduct) return null;
    const initialForm = {
      name: selectedProduct.name || '',
      description: selectedProduct.description || '',
      price: selectedProduct.price || '',
      images: selectedProduct.images?.length ? [...selectedProduct.images] : [''],
      category: selectedProduct.category || categories[1] || '',
      collection: selectedProduct.collection || '',
      colors: (selectedProduct.colors || []).join(', '),
      sizes: (selectedProduct.sizes || []).join(', '),
      inStock: selectedProduct.inStock ?? true,
      sku: selectedProduct.sku || '',
      status: selectedProduct.status || 'Active',
    };
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    // Reset form and error when modal opens
    React.useEffect(() => {
      setForm(initialForm);
      setError('');
    }, [showEditModal, selectedProduct]);

    // Close modal on Escape key
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setShowEditModal(false);
      };
      if (showEditModal) {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }
    }, [showEditModal]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      if (type === 'checkbox') {
        setForm(f => ({ ...f, [name]: (e.target as HTMLInputElement).checked }));
      } else {
        setForm(f => ({ ...f, [name]: value }));
      }
    };

    const handleImageChange = (idx: number, value: string) => {
      setForm(f => {
        const images = [...f.images];
        images[idx] = value;
        return { ...f, images };
      });
    };

    const addImageField = () => setForm(f => ({ ...f, images: [...f.images, ''] }));
    const removeImageField = (idx: number) => setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));

    const handleBackgroundClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) setShowEditModal(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      setError('');
      // Basic validation
      if (!form.name.trim() || !form.price || !form.category) {
        setError('Name, price, and category are required.');
        setSaving(false);
        return;
      }
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/products/${selectedProduct._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            ...form,
            price: Number(form.price),
            colors: form.colors.split(',').map((c: string) => c.trim()).filter(Boolean),
            sizes: form.sizes.split(',').map((s: string) => s.trim()).filter(Boolean),
          })
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || 'Failed to update product');
        }
        const updatedProduct = await res.json();
        setProducts(prev => prev.map(p => p._id === updatedProduct._id ? updatedProduct : p));
        setShowEditModal(false);
      } catch (err: any) {
        setError(err.message || 'Failed to update product');
      }
      setSaving(false);
    };

    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={handleBackgroundClick}>
        <form onSubmit={handleSubmit} className="bg-white max-w-lg w-full p-8 rounded shadow-lg relative overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-amber-900">Edit Product</h2>
            <button type="button" onClick={() => setShowEditModal(false)} className="p-2 rounded-full hover:bg-stone-100 transition-colors" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Product name" className="border px-4 py-2 w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border px-4 py-2 w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">Price (Rs) *</label>
                <input name="price" value={form.price} onChange={handleChange} required placeholder="Price" type="number" min="0" className="border px-4 py-2 w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">SKU</label>
                <input name="sku" value={form.sku} onChange={handleChange} placeholder="SKU" className="border px-4 py-2 w-full" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Category *</label>
              <select name="category" value={form.category} onChange={handleChange} required className="border px-4 py-2 w-full">
                {categories.slice(1).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">Collection</label>
                <select
                  className="w-full border border-stone-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-900"
                  value={form.collection || 'Women'}
                  onChange={e => setForm(f => ({ ...f, collection: e.target.value }))}
                >
                  <option value="Women">Women</option>
                  <option value="Men">Men</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="border px-4 py-2 w-full">
                  <option value="Active">Active</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">Colors (comma separated)</label>
                <input name="colors" value={form.colors} onChange={handleChange} placeholder="e.g. #000000, #ffffff, red" className="border px-4 py-2 w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">Sizes (comma separated)</label>
                <input name="sizes" value={form.sizes} onChange={handleChange} placeholder="e.g. S, M, L, XL" className="border px-4 py-2 w-full" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-amber-900">In Stock</label>
              <input name="inStock" type="checkbox" checked={form.inStock} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Images</label>
              {form.images.map((img, idx) => (
                <div key={idx} className="flex items-center mb-2">
                  <input value={img} onChange={e => handleImageChange(idx, e.target.value)} placeholder="Image URL" className="border px-4 py-2 flex-1" />
                  {form.images.length > 1 && <button type="button" onClick={() => removeImageField(idx)} className="ml-2 text-red-600">Remove</button>}
                </div>
              ))}
              <button type="button" onClick={addImageField} className="mt-2 text-amber-900">+ Add Image</button>
            </div>
          </div>
          <div className="flex justify-end mt-8 space-x-2">
            <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 border border-stone-300 text-stone-700">Cancel</button>
            <button type="submit" disabled={saving} className="px-6 py-2 bg-amber-900 text-white hover:bg-amber-800 transition-colors flex items-center">
              {saving && <span className="loader mr-2" aria-label="Saving..." />}
              {saving ? 'Saving...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const ViewProductModal = () => {
    if (!selectedProduct) return null;
    // Close modal on Escape key
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setShowViewModal(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
    const handleBackgroundClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) setShowViewModal(false);
    };
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={handleBackgroundClick}>
        <div className="bg-white max-w-2xl w-full p-8 rounded shadow-lg relative overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-amber-900">Product Details</h2>
            <button type="button" onClick={() => setShowViewModal(false)} className="p-2 rounded-full hover:bg-stone-100 transition-colors" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 w-full md:w-1/3 flex items-center justify-center">
              <img src={selectedProduct.images?.[0] || ''} alt={selectedProduct.name} className="w-40 h-40 object-cover rounded border" />
            </div>
            <div className="flex-1 space-y-3">
              <h3 className="text-xl font-medium text-amber-900 mb-2">{selectedProduct.name}</h3>
              <p className="text-stone-600 mb-2">{selectedProduct.description}</p>
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-lg font-semibold text-amber-900">Rs. {selectedProduct.price?.toLocaleString()}</span>
                {selectedProduct.status && (
                  <span className={`px-2 py-1 text-xs font-medium rounded tracking-[0.05em] uppercase ${getStatusColor(selectedProduct.status)}`}>{selectedProduct.status}</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <span className="block text-xs text-stone-500 mb-1">Category</span>
                  <span className="text-sm text-stone-700">{selectedProduct.category}</span>
                </div>
                <div>
                  <span className="block text-xs text-stone-500 mb-1">Collection</span>
                  <span className="text-sm text-stone-700">{selectedProduct.collection}</span>
                </div>
                <div>
                  <span className="block text-xs text-stone-500 mb-1">SKU</span>
                  <span className="text-sm text-stone-700">{selectedProduct.sku}</span>
                </div>
                <div>
                  <span className="block text-xs text-stone-500 mb-1">Stock</span>
                  <span className={`text-sm ${selectedProduct.stock > 10 ? 'text-green-600' : selectedProduct.stock > 0 ? 'text-amber-600' : 'text-red-600'}`}>{selectedProduct.stock}</span>
                </div>
              </div>
              <div className="mb-2">
                <span className="block text-xs text-stone-500 mb-1">Colors</span>
                <div className="flex space-x-2">
                  {(selectedProduct.colors || []).map((color: string, idx: number) => (
                    <span key={idx} className="w-6 h-6 rounded-full border border-stone-300 inline-block" style={{ backgroundColor: color }} title={color} />
                  ))}
                </div>
              </div>
              <div className="mb-2">
                <span className="block text-xs text-stone-500 mb-1">Sizes</span>
                <span className="text-sm text-stone-700">{(selectedProduct.sizes || []).join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
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
              key={product._id}
              className="bg-white shadow-lg border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative">
                <img
                  src={product.images?.[0] || ''}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 text-xs font-medium tracking-[0.05em] uppercase ${getStatusColor(product.status)}`}>
                    {product.status || 'Active'}
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
                    onClick={() => handleDeleteProduct(product._id)}
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
                    Rs. {product.price?.toLocaleString()}
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
                      {(product.colors || []).slice(0, 3).map((color: string, colorIndex: number) => (
                        <div
                          key={colorIndex}
                          className="w-4 h-4 border border-stone-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      {product.colors && product.colors.length > 3 && (
                        <span className="text-xs text-stone-500">+{product.colors.length - 3}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 mb-1">Sizes:</p>
                    <p className="text-xs text-stone-600">
                      {(product.sizes || []).join(', ')}
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
        {showAddModal && <AddProductModal />}
        {showEditModal && <EditProductModal />}
        {showViewModal && <ViewProductModal />}
      </div>
    </div>
  );
};

export default AdminProducts;