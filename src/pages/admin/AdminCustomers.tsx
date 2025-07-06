import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Users, Search, Mail, Phone, MapPin, Star } from 'lucide-react';

const AdminCustomers = () => {
  const { user } = useAuth();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/users?role=user', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch customers');
        const data = await res.json();
        setCustomers(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch customers');
      }
      setLoading(false);
    };
    fetchCustomers();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP': return 'bg-amber-100 text-amber-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Inactive': return 'bg-stone-100 text-stone-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'totalSpent': return (b.totalSpent || 0) - (a.totalSpent || 0);
      case 'totalOrders': return (b.totalOrders || 0) - (a.totalOrders || 0);
      case 'joinDate': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default: return 0;
    }
  });

  // Customer Detail Modal
  const CustomerDetailModal = () => {
    if (!selectedCustomer) return null;
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white max-w-lg w-full p-8 rounded shadow-lg relative">
          <h2 className="text-2xl font-light text-amber-900 mb-6">Customer Details</h2>
          <div className="space-y-4 mb-6">
            <div><span className="font-medium text-amber-900">Name:</span> {selectedCustomer.name}</div>
            <div><span className="font-medium text-amber-900">Email:</span> {selectedCustomer.email}</div>
            <div><span className="font-medium text-amber-900">Phone:</span> {selectedCustomer.phone || '-'}</div>
            <div><span className="font-medium text-amber-900">Address:</span> {selectedCustomer.address || '-'}</div>
            <div><span className="font-medium text-amber-900">Status:</span> <span className={`px-2 py-1 text-xs font-medium tracking-[0.05em] uppercase ${getStatusColor(selectedCustomer.status)}`}>{selectedCustomer.status || 'Active'}</span></div>
            <div><span className="font-medium text-amber-900">Joined:</span> {selectedCustomer.createdAt ? new Date(selectedCustomer.createdAt).toLocaleDateString() : '-'}</div>
            <div><span className="font-medium text-amber-900">Total Orders:</span> {selectedCustomer.totalOrders || 0}</div>
            <div><span className="font-medium text-amber-900">Total Spent:</span> Rs. {selectedCustomer.totalSpent?.toLocaleString() || 0}</div>
            <div><span className="font-medium text-amber-900">Loyalty Points:</span> {selectedCustomer.loyaltyPoints?.toLocaleString() || 0}</div>
          </div>
          <div className="flex justify-end space-x-2">
            <button onClick={() => { setShowDetailModal(false); setSelectedCustomer(null); }} className="px-4 py-2 border border-stone-300 text-stone-700">Close</button>
            <button onClick={() => { setShowDetailModal(false); setShowEditModal(true); }} className="px-6 py-2 bg-amber-900 text-white hover:bg-amber-800 transition-colors">Edit</button>
          </div>
        </div>
      </div>
    );
  };

  // Customer Edit Modal
  const CustomerEditModal = () => {
    if (!selectedCustomer) return null;
    const [form, setForm] = useState({
      name: selectedCustomer.name || '',
      email: selectedCustomer.email || '',
      phone: selectedCustomer.phone || '',
      address: selectedCustomer.address || '',
      status: selectedCustomer.status || 'Active',
      loyaltyPoints: selectedCustomer.loyaltyPoints || 0,
    });
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm(f => ({ ...f, [name]: name === 'loyaltyPoints' ? Number(value) : value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/users/${selectedCustomer._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(form)
        });
        if (!res.ok) throw new Error('Failed to update customer');
        const updated = await res.json();
        setCustomers(prev => prev.map(c => c._id === updated._id ? updated : c));
        setShowEditModal(false);
        setSelectedCustomer(null);
      } catch (err: any) {
        setError(err.message || 'Failed to update customer');
      }
      setSaving(false);
    };

    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <form onSubmit={handleSubmit} className="bg-white max-w-lg w-full p-8 rounded shadow-lg relative">
          <h2 className="text-2xl font-light text-amber-900 mb-6">Edit Customer</h2>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <div className="grid grid-cols-1 gap-4">
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="border px-4 py-2" />
            <input name="email" value={form.email} onChange={handleChange} required placeholder="Email" className="border px-4 py-2" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border px-4 py-2" />
            <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border px-4 py-2" />
            <div>
              <label className="mr-2">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="border px-4 py-2">
                <option value="Active">Active</option>
                <option value="VIP">VIP</option>
                <option value="New">New</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <input name="loyaltyPoints" value={form.loyaltyPoints} onChange={handleChange} type="number" min="0" placeholder="Loyalty Points" className="border px-4 py-2" />
          </div>
          <div className="flex justify-end mt-6 space-x-2">
            <button type="button" onClick={() => { setShowEditModal(false); setSelectedCustomer(null); }} className="px-4 py-2 border border-stone-300 text-stone-700">Cancel</button>
            <button type="submit" disabled={saving} className="px-6 py-2 bg-amber-900 text-white hover:bg-amber-800 transition-colors">{saving ? 'Saving...' : 'Update Customer'}</button>
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
          <div className="flex items-center space-x-4">
            <Users size={36} className="text-amber-900" />
            <div>
              <h1 className="text-3xl font-light text-amber-900 tracking-[0.1em]">
                Customer Management
              </h1>
              <p className="text-stone-600 tracking-[0.02em]">
                View and manage customers
              </p>
            </div>
          </div>
        </motion.div>
        {/* Search and Sort */}
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
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 transition-colors"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-stone-300 text-amber-900 bg-white focus:outline-none focus:border-amber-900 transition-colors"
            >
              <option value="name">Sort by Name</option>
              <option value="totalSpent">Sort by Total Spent</option>
              <option value="totalOrders">Sort by Total Orders</option>
              <option value="joinDate">Sort by Join Date</option>
            </select>
            <div></div>
          </div>
        </motion.div>
        {/* Customers Table */}
        <motion.div
          className="bg-white shadow-lg border border-stone-200 overflow-x-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Spent</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {sortedCustomers.map((customer, index) => (
                <motion.tr
                  key={customer._id}
                  className="hover:bg-stone-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <Star size={16} className="text-amber-900" />
                      <div>
                        <p className="font-medium text-amber-900 tracking-[0.05em]">{customer.name}</p>
                        <p className="text-xs text-stone-500">{customer._id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <p className="text-sm text-stone-900 flex items-center">
                        <Mail size={12} className="mr-2 text-stone-400" />
                        {customer.email}
                      </p>
                      <p className="text-sm text-stone-500 flex items-center">
                        <Phone size={12} className="mr-2 text-stone-400" />
                        {customer.phone || '-'}
                      </p>
                      <p className="text-sm text-stone-500 flex items-center">
                        <MapPin size={12} className="mr-2 text-stone-400" />
                        {customer.address || '-'}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="font-medium text-amber-900">{customer.totalOrders || 0} orders</p>
                      <p className="text-xs text-stone-500">Last: {customer.lastOrder ? new Date(customer.lastOrder).toLocaleDateString() : '-'}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="font-medium text-amber-900">Rs. {customer.totalSpent?.toLocaleString() || 0}</p>
                      <p className="text-xs text-stone-500">{customer.loyaltyPoints?.toLocaleString() || 0} points</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium tracking-[0.05em] uppercase ${getStatusColor(customer.status)}`}>{customer.status || 'Active'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs text-stone-500">{customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : '-'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button onClick={() => { setSelectedCustomer(customer); setShowDetailModal(true); }} className="px-2 py-1 border border-amber-900 text-amber-900 hover:bg-amber-50 text-xs rounded">View</button>
                      <button onClick={() => { setSelectedCustomer(customer); setShowEditModal(true); }} className="px-2 py-1 border border-amber-900 text-amber-900 hover:bg-amber-50 text-xs rounded">Edit</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
        {sortedCustomers.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Users size={48} className="text-stone-400 mx-auto mb-4" />
            <h3 className="text-xl font-light text-stone-600 mb-2">No customers found</h3>
            <p className="text-stone-500">Try adjusting your search or sort criteria.</p>
          </motion.div>
        )}
      </div>
      {showDetailModal && <CustomerDetailModal />}
      {showEditModal && <CustomerEditModal />}
    </div>
  );
};

export default AdminCustomers;