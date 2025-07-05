import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, Filter, Eye, Edit, Truck, CheckCircle, Clock, X, User, Mail, MapPin, Phone } from 'lucide-react';

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const orders = [
    {
      id: '#EH001',
      customer: 'Sarah Johnson',
      email: 'sarah@email.com',
      date: '2024-01-15',
      status: 'Processing',
      total: 289000,
      items: 1,
      products: ['Hemp Blazer - Sage (M)'],
      address: '123 Main St, Boulder, CO 80301',
      customerInfo: {
        name: 'Sarah Johnson',
        email: 'sarah@email.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, Boulder, CO 80301'
      },
      orderNotes: 'Please handle with care - gift wrapping requested'
    },
    {
      id: '#EH002',
      customer: 'Michael Chen',
      email: 'michael@email.com',
      date: '2024-01-15',
      status: 'Shipped',
      total: 348000,
      items: 2,
      products: ['Organic Cotton Dress - Natural (S)', 'Hemp Trousers - Stone (S)'],
      address: '456 Oak Ave, Denver, CO 80202',
      tracking: 'EH123456790',
      customerInfo: {
        name: 'Michael Chen',
        email: 'michael@email.com',
        phone: '+1 (555) 234-5678',
        address: '456 Oak Ave, Denver, CO 80202'
      },
      orderNotes: 'Express shipping requested'
    },
    {
      id: '#EH003',
      customer: 'Emma Wilson',
      email: 'emma@email.com',
      date: '2024-01-14',
      status: 'Delivered',
      total: 189000,
      items: 1,
      products: ['Sustainable Cardigan - Cream (M)'],
      address: '789 Pine St, Fort Collins, CO 80521',
      tracking: 'EH123456791',
      customerInfo: {
        name: 'Emma Wilson',
        email: 'emma@email.com',
        phone: '+1 (555) 345-6789',
        address: '789 Pine St, Fort Collins, CO 80521'
      },
      orderNotes: 'Standard delivery'
    },
    {
      id: '#EH004',
      customer: 'David Brown',
      email: 'david@email.com',
      date: '2024-01-14',
      status: 'Processing',
      total: 129000,
      items: 1,
      products: ['Hemp Silk Blouse - Ivory (L)'],
      address: '321 Elm Dr, Aspen, CO 81611',
      customerInfo: {
        name: 'David Brown',
        email: 'david@email.com',
        phone: '+1 (555) 456-7890',
        address: '321 Elm Dr, Aspen, CO 81611'
      },
      orderNotes: 'First time customer'
    },
    {
      id: '#EH005',
      customer: 'Lisa Garcia',
      email: 'lisa@email.com',
      date: '2024-01-13',
      status: 'Shipped',
      total: 215000,
      items: 1,
      products: ['Organic Wool Coat - Camel (M)'],
      address: '654 Maple Ln, Vail, CO 81657',
      tracking: 'EH123456792',
      customerInfo: {
        name: 'Lisa Garcia',
        email: 'lisa@email.com',
        phone: '+1 (555) 567-8901',
        address: '654 Maple Ln, Vail, CO 81657'
      },
      orderNotes: 'VIP customer - priority handling'
    }
  ];

  const statusOptions = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  const dateOptions = ['All', 'Today', 'This Week', 'This Month'];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing': return Clock;
      case 'Shipped': return Truck;
      case 'Delivered': return CheckCircle;
      default: return Package;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing': return 'bg-amber-100 text-amber-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    console.log(`Update order ${orderId} to ${newStatus}`);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const OrderDetailsModal = () => {
    if (!selectedOrder) return null;

    return (
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowOrderModal(false)}
      >
        <motion.div
          className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/public/logo-nobg.png" 
                alt="Everest Hemp" 
                className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
              />
              <div>
                <h2 className="text-2xl font-light text-amber-900 tracking-[0.1em]">
                  Order Details
                </h2>
                <p className="text-stone-600 text-sm">
                  {selectedOrder.id} • {new Date(selectedOrder.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowOrderModal(false)}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors"
            >
              <X size={20} className="text-stone-600" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Information */}
              <div>
                <h3 className="text-xl font-light text-amber-900 mb-6 tracking-[0.1em]">
                  Order Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-stone-50 border border-stone-200">
                    <span className="text-stone-600">Order ID</span>
                    <span className="font-medium text-amber-900">{selectedOrder.id}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-stone-50 border border-stone-200">
                    <span className="text-stone-600">Status</span>
                    <span className={`px-3 py-1 text-xs font-medium tracking-[0.05em] uppercase ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-stone-50 border border-stone-200">
                    <span className="text-stone-600">Total Amount</span>
                    <span className="font-medium text-amber-900">$ {selectedOrder.total.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-stone-50 border border-stone-200">
                    <span className="text-stone-600">Items</span>
                    <span className="font-medium text-amber-900">{selectedOrder.items} item{selectedOrder.items > 1 ? 's' : ''}</span>
                  </div>
                  
                  {selectedOrder.tracking && (
                    <div className="flex justify-between items-center p-4 bg-stone-50 border border-stone-200">
                      <span className="text-stone-600">Tracking Number</span>
                      <span className="font-medium text-amber-900">{selectedOrder.tracking}</span>
                    </div>
                  )}
                </div>

                {/* Order Notes */}
                {selectedOrder.orderNotes && (
                  <div className="mt-6">
                    <h4 className="text-lg font-light text-amber-900 mb-3 tracking-[0.05em]">
                      Order Notes
                    </h4>
                    <div className="p-4 bg-amber-50 border border-amber-200">
                      <p className="text-stone-700">{selectedOrder.orderNotes}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="text-xl font-light text-amber-900 mb-6 tracking-[0.1em]">
                  Customer Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-stone-50 border border-stone-200">
                    <User size={18} className="text-amber-900" />
                    <div>
                      <p className="font-medium text-amber-900">{selectedOrder.customerInfo.name}</p>
                      <p className="text-sm text-stone-600">Customer Name</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-stone-50 border border-stone-200">
                    <Mail size={18} className="text-amber-900" />
                    <div>
                      <p className="font-medium text-amber-900">{selectedOrder.customerInfo.email}</p>
                      <p className="text-sm text-stone-600">Email Address</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-stone-50 border border-stone-200">
                    <Phone size={18} className="text-amber-900" />
                    <div>
                      <p className="font-medium text-amber-900">{selectedOrder.customerInfo.phone}</p>
                      <p className="text-sm text-stone-600">Phone Number</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 bg-stone-50 border border-stone-200">
                    <MapPin size={18} className="text-amber-900 mt-1" />
                    <div>
                      <p className="font-medium text-amber-900">{selectedOrder.customerInfo.address}</p>
                      <p className="text-sm text-stone-600">Shipping Address</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="mt-8">
              <h3 className="text-xl font-light text-amber-900 mb-6 tracking-[0.1em]">
                Order Items
              </h3>
              
              <div className="space-y-4">
                {selectedOrder.products.map((product, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-stone-50 border border-stone-200">
                    <div className="w-16 h-20 bg-stone-200 flex items-center justify-center">
                      <Package size={24} className="text-stone-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-amber-900">{product}</h4>
                      <p className="text-sm text-stone-600">Quantity: 1</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-amber-900">$ {(selectedOrder.total / selectedOrder.items).toLocaleString()}</p>
                      <p className="font-medium text-amber-900">Rs. {(selectedOrder.total / selectedOrder.items).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <select
                value={selectedOrder.status}
                onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                className="flex-1 px-4 py-3 border border-stone-300 text-amber-900 bg-white focus:outline-none focus:border-amber-900 transition-colors"
              >
                {statusOptions.slice(1).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              
              <button className="flex-1 bg-amber-900 text-white py-3 px-6 hover:bg-amber-800 transition-colors text-sm font-medium tracking-[0.1em] uppercase">
                Update Order
              </button>
              
              <button className="flex-1 border border-amber-900 text-amber-900 py-3 px-6 hover:bg-amber-50 transition-colors text-sm font-medium tracking-[0.1em] uppercase">
                Print Invoice
              </button>
            </div>
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
                Order Management
              </h1>
              <p className="text-stone-600 tracking-[0.02em]">
                View and manage customer orders
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="bg-white p-6 shadow-lg border border-stone-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 transition-colors"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-stone-300 text-amber-900 bg-white focus:outline-none focus:border-amber-900 transition-colors"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status} Status</option>
              ))}
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-stone-300 text-amber-900 bg-white focus:outline-none focus:border-amber-900 transition-colors"
            >
              {dateOptions.map(date => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>

            <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-amber-900 text-amber-900 hover:bg-amber-50 transition-colors">
              <Filter size={16} />
              <span>More Filters</span>
            </button>
          </div>
        </motion.div>

        {/* Orders Table */}
        <motion.div
          className="bg-white shadow-lg border border-stone-200 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredOrders.map((order, index) => {
                  const StatusIcon = getStatusIcon(order.status);
                  
                  return (
                    <motion.tr
                      key={order.id}
                      className="hover:bg-stone-50 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <StatusIcon size={16} className="text-amber-900" />
                          <div>
                            <p className="font-medium text-amber-900 tracking-[0.05em]">
                              {order.id}
                            </p>
                            <p className="text-xs text-stone-500">
                              {order.items} item{order.items > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="font-medium text-stone-900">
                            {order.customer}
                          </p>
                          <p className="text-sm text-stone-500">
                            {order.email}
                          </p>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`px-3 py-1 text-xs font-medium tracking-[0.05em] uppercase border-0 focus:outline-none ${getStatusColor(order.status)}`}
                        >
                          {statusOptions.slice(1).map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium text-amber-900">
                          Rs. {order.total.toLocaleString()}
                        </p>
                        {order.tracking && (
                          <p className="text-xs text-stone-500">
                            Tracking: {order.tracking}
                          </p>
                        )}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <motion.button
                            onClick={() => viewOrderDetails(order)}
                            className="p-2 text-amber-900 hover:bg-amber-50 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            title="View Details"
                          >
                            <Eye size={16} />
                          </motion.button>
                          <motion.button
                            className="p-2 text-amber-900 hover:bg-amber-50 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            title="Edit Order"
                           onClick={() => console.log('Edit order:', order.id)}
                          >
                            <Edit size={16} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Order Details Modal */}
        {showOrderModal && <OrderDetailsModal />}

        {filteredOrders.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Package size={48} className="text-stone-400 mx-auto mb-4" />
            <h3 className="text-xl font-light text-stone-600 mb-2">
              No orders found
            </h3>
            <p className="text-stone-500">
              Try adjusting your search or filter criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;