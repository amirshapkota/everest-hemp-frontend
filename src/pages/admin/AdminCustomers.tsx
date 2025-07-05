import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Mail, Phone, MapPin, Calendar, Eye, Edit, Package as PackageIcon } from 'lucide-react';

const AdminCustomers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const customers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '+1 (555) 123-4567',
      location: 'Boulder, CO',
      joinDate: '2024-01-10',
      totalOrders: 5,
      totalSpent: 895000,
      lastOrder: '2024-01-15',
      status: 'Active',
      loyaltyPoints: 895
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@email.com',
      phone: '+1 (555) 234-5678',
      location: 'Denver, CO',
      joinDate: '2023-12-15',
      totalOrders: 8,
      totalSpent: 1245000,
      lastOrder: '2024-01-15',
      status: 'VIP',
      loyaltyPoints: 1245
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma@email.com',
      phone: '+1 (555) 345-6789',
      location: 'Fort Collins, CO',
      joinDate: '2023-11-20',
      totalOrders: 3,
      totalSpent: 567000,
      lastOrder: '2024-01-14',
      status: 'Active',
      loyaltyPoints: 567
    },
    {
      id: 4,
      name: 'David Brown',
      email: 'david@email.com',
      phone: '+1 (555) 456-7890',
      location: 'Aspen, CO',
      joinDate: '2024-01-05',
      totalOrders: 2,
      totalSpent: 318000,
      lastOrder: '2024-01-14',
      status: 'New',
      loyaltyPoints: 318
    },
    {
      id: 5,
      name: 'Lisa Garcia',
      email: 'lisa@email.com',
      phone: '+1 (555) 567-8901',
      location: 'Vail, CO',
      joinDate: '2023-10-30',
      totalOrders: 12,
      totalSpent: 1875000,
      lastOrder: '2024-01-13',
      status: 'VIP',
      loyaltyPoints: 1875
    }
  ];

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
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'totalSpent': return b.totalSpent - a.totalSpent;
      case 'totalOrders': return b.totalOrders - a.totalOrders;
      case 'joinDate': return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      default: return 0;
    }
  });

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowViewModal(true);
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowEditModal(true);
  };

  const ViewCustomerModal = () => {
    if (!selectedCustomer) return null;
    
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
              Customer Details
            </h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Customer Name</label>
                  <p className="text-stone-700">{selectedCustomer.name}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Email</label>
                  <p className="text-stone-700">{selectedCustomer.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Phone</label>
                  <p className="text-stone-700">{selectedCustomer.phone}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Location</label>
                  <p className="text-stone-700">{selectedCustomer.location}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Status</label>
                  <span className={`px-3 py-1 text-xs font-medium tracking-[0.05em] uppercase ${getStatusColor(selectedCustomer.status)}`}>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Join Date</label>
                  <p className="text-stone-700">{new Date(selectedCustomer.joinDate).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Total Orders</label>
                  <p className="text-stone-700">{selectedCustomer.totalOrders}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Total Spent</label>
                  <p className="text-stone-700">Rs. {selectedCustomer.totalSpent.toLocaleString()}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Last Order</label>
                  <p className="text-stone-700">{new Date(selectedCustomer.lastOrder).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">Loyalty Points</label>
                  <p className="text-stone-700">{selectedCustomer.loyaltyPoints.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-stone-200">
              <h3 className="text-lg font-medium text-amber-900 mb-4">Customer Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => alert('Sending email to customer...')}
                  className="flex items-center justify-center space-x-2 px-4 py-2 border border-amber-900 text-amber-900 hover:bg-amber-50 transition-colors"
                >
                  <Mail size={16} />
                  <span>Send Email</span>
                </button>
                
                <button
                  onClick={() => alert('Viewing customer orders...')}
                  className="flex items-center justify-center space-x-2 px-4 py-2 border border-amber-900 text-amber-900 hover:bg-amber-50 transition-colors"
                >
                  <PackageIcon size={16} />
                  <span>View Orders</span>
                </button>
                
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditCustomer(selectedCustomer);
                  }}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-amber-900 text-white hover:bg-amber-800 transition-colors"
                >
                  <Edit size={16} />
                  <span>Edit Customer</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-stone-200 flex justify-end">
            <button
              onClick={() => setShowViewModal(false)}
              className="px-6 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const EditCustomerModal = () => {
    if (!selectedCustomer) return null;
    
    return (
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowEditModal(false)}
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
              Edit Customer: {selectedCustomer.name}
            </h2>
          </div>
          
          <form className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Customer Name *
                </label>
                <input
                  type="text"
                  defaultValue={selectedCustomer.name}
                  className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  defaultValue={selectedCustomer.email}
                  className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  defaultValue={selectedCustomer.phone}
                  className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  defaultValue={selectedCustomer.location}
                  className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Status *
                </label>
                <select
                  defaultValue={selectedCustomer.status}
                  className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors"
                >
                  <option value="Active">Active</option>
                  <option value="VIP">VIP</option>
                  <option value="New">New</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Loyalty Points
                </label>
                <input
                  type="number"
                  defaultValue={selectedCustomer.loyaltyPoints}
                  className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Notes
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border border-stone-300 focus:outline-none focus:border-amber-900 transition-colors resize-none"
                placeholder="Add notes about this customer..."
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
                alert('Customer updated successfully!');
                setShowEditModal(false);
              }}
              className="px-6 py-2 bg-amber-900 text-white hover:bg-amber-800 transition-colors"
            >
              Update Customer
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
          <div className="flex items-center space-x-4">
            <img 
              src="/public/logo-nobg.png" 
              alt="Everest Hemp" 
              className="h-14 w-14 sm:h-16 sm:w-16 lg:h-18 lg:w-18"
            />
            <div>
              <h1 className="text-3xl font-light text-amber-900 tracking-[0.1em]">
                Customer Management
              </h1>
              <p className="text-stone-600 tracking-[0.02em]">
                View and manage customer accounts
              </p>
            </div>
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
                  {customers.length}
                </p>
                <p className="text-sm text-stone-600 uppercase tracking-[0.05em]">
                  Total Customers
                </p>
              </div>
              <Users size={24} className="text-amber-900" />
            </div>
          </div>

          <div className="bg-white p-6 shadow-lg border border-stone-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-light text-amber-900">
                  {customers.filter(c => c.status === 'VIP').length}
                </p>
                <p className="text-sm text-stone-600 uppercase tracking-[0.05em]">
                  VIP Customers
                </p>
              </div>
              <Users size={24} className="text-amber-600" />
            </div>
          </div>

          <div className="bg-white p-6 shadow-lg border border-stone-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-light text-amber-900">
                  {customers.filter(c => c.status === 'New').length}
                </p>
                <p className="text-sm text-stone-600 uppercase tracking-[0.05em]">
                  New This Month
                </p>
              </div>
              <Users size={24} className="text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 shadow-lg border border-stone-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-light text-amber-900">
                  Rs. {Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length).toLocaleString()}
                </p>
                <p className="text-sm text-stone-600 uppercase tracking-[0.05em]">
                  Avg. Lifetime Value
                </p>
              </div>
              <Users size={24} className="text-green-600" />
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="bg-white p-6 shadow-lg border border-stone-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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

            <div className="flex space-x-2">
              <button className="flex-1 px-4 py-2 border border-amber-900 text-amber-900 hover:bg-amber-50 transition-colors text-sm">
                Export CSV
              </button>
              <button className="flex-1 px-4 py-2 border border-amber-900 text-amber-900 hover:bg-amber-50 transition-colors text-sm">
                Send Email
              </button>
            </div>
          </div>
        </motion.div>

        {/* Customers Table */}
        <motion.div
          className="bg-white shadow-lg border border-stone-200 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {sortedCustomers.map((customer, index) => (
                  <motion.tr
                    key={customer.id}
                    className="hover:bg-stone-50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-stone-100 rounded-full flex items-center justify-center">
                          <span className="text-amber-900 font-medium text-sm">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-amber-900 tracking-[0.05em]">
                            {customer.name}
                          </p>
                          <p className="text-xs text-stone-500 flex items-center">
                            <Calendar size={12} className="mr-1" />
                            Joined {new Date(customer.joinDate).toLocaleDateString()}
                          </p>
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
                          {customer.phone}
                        </p>
                        <p className="text-sm text-stone-500 flex items-center">
                          <MapPin size={12} className="mr-2 text-stone-400" />
                          {customer.location}
                        </p>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-amber-900">
                          {customer.totalOrders} orders
                        </p>
                        <p className="text-xs text-stone-500">
                          Last: {new Date(customer.lastOrder).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-amber-900">
                          Rs. {customer.totalSpent.toLocaleString()}
                        </p>
                        <p className="text-xs text-stone-500">
                          {customer.loyaltyPoints.toLocaleString()} points
                        </p>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium tracking-[0.05em] uppercase ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <motion.button
                          className="p-2 text-amber-900 hover:bg-amber-50 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          title="View Details"
                          onClick={() => handleViewCustomer(customer)}
                        >
                          <Eye size={16} />
                        </motion.button>
                        <motion.button
                          className="p-2 text-amber-900 hover:bg-amber-50 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          title="Edit Customer"
                          onClick={() => handleEditCustomer(customer)}
                        >
                          <Edit size={16} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {sortedCustomers.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Users size={48} className="text-stone-400 mx-auto mb-4" />
            <h3 className="text-xl font-light text-stone-600 mb-2">
              No customers found
            </h3>
            <p className="text-stone-500">
              Try adjusting your search criteria.
            </p>
          </motion.div>
        )}
        
        {/* View Customer Modal */}
        {showViewModal && <ViewCustomerModal />}
        
        {/* Edit Customer Modal */}
        {showEditModal && <EditCustomerModal />}
      </div>
    </div>
  );
};

export default AdminCustomers;