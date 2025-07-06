import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Package, Search, Filter, Eye, Edit, Truck, CheckCircle, Clock, X, User, Mail, MapPin, Phone } from 'lucide-react';

const AdminOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch orders');
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

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

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdating(true);
    setError("");
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ shippingStatus: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update order status');
      const updated = await res.json();
      setOrders((prev) => prev.map(o => o._id === updated._id ? updated : o));
      if (selectedOrder && selectedOrder._id === updated._id) setSelectedOrder(updated);
    } catch (err: any) {
      setError(err.message || 'Failed to update order status');
    }
    setUpdating(false);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (order.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (order.user?.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.shippingStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const viewOrderDetails = (order: any) => {
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
                src="/logo-nobg.png" 
                alt="Everest Hemp" 
                className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
              />
              <div>
                <h2 className="text-2xl font-light text-amber-900 tracking-[0.1em]">
                  Order Details
                </h2>
                <p className="text-stone-600 text-sm">
                  {selectedOrder._id} • {new Date(selectedOrder.createdAt).toLocaleDateString()}
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
                    <span className="font-medium text-amber-900">{selectedOrder._id}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-stone-50 border border-stone-200">
                    <span className="text-stone-600">Status</span>
                    <span className={`px-3 py-1 text-xs font-medium tracking-[0.05em] uppercase ${getStatusColor(selectedOrder.shippingStatus)}`}>
                      {selectedOrder.shippingStatus}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-stone-50 border border-stone-200">
                    <span className="text-stone-600">Total Amount</span>
                    <span className="font-medium text-amber-900">Rs. {selectedOrder.total?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-stone-50 border border-stone-200">
                    <span className="text-stone-600">Items</span>
                    <span className="font-medium text-amber-900">{selectedOrder.items?.length || 0} item{(selectedOrder.items?.length || 0) > 1 ? 's' : ''}</span>
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
                      <p className="font-medium text-amber-900">{selectedOrder.user?.name}</p>
                      <p className="text-sm text-stone-600">Customer Name</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-stone-50 border border-stone-200">
                    <Mail size={18} className="text-amber-900" />
                    <div>
                      <p className="font-medium text-amber-900">{selectedOrder.user?.email}</p>
                      <p className="text-sm text-stone-600">Email Address</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-stone-50 border border-stone-200">
                    <Phone size={18} className="text-amber-900" />
                    <div>
                      <p className="font-medium text-amber-900">{selectedOrder.shippingInfo?.phone}</p>
                      <p className="text-sm text-stone-600">Phone Number</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-stone-50 border border-stone-200">
                    <MapPin size={18} className="text-amber-900 mt-1" />
                    <div>
                      <p className="font-medium text-amber-900">{selectedOrder.shippingInfo?.address}</p>
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
                {selectedOrder.items?.map((item: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-stone-50 border border-stone-200">
                    <div className="w-16 h-20 bg-stone-200 flex items-center justify-center">
                      <Package size={24} className="text-stone-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-amber-900">{item.name}</h4>
                      <p className="text-sm text-stone-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-amber-900">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <select
                value={selectedOrder.shippingStatus}
                onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value)}
                className="flex-1 px-4 py-3 border border-stone-300 text-amber-900 bg-white focus:outline-none focus:border-amber-900 transition-colors"
                disabled={updating}
              >
                {statusOptions.slice(1).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <button className="flex-1 bg-amber-900 text-white py-3 px-6 hover:bg-amber-800 transition-colors text-sm font-medium tracking-[0.1em] uppercase" disabled={updating}>
                {updating ? 'Updating...' : 'Update Order'}
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
            <img 
              src="/logo-nobg.png" 
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
                  const StatusIcon = getStatusIcon(order.shippingStatus);
                  return (
                    <motion.tr
                      key={order._id}
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
                              {order._id}
                            </p>
                            <p className="text-xs text-stone-500">
                              {order.items?.length || 0} item{(order.items?.length || 0) > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="font-medium text-stone-900">
                            {order.user?.name}
                          </p>
                          <p className="text-sm text-stone-500">
                            {order.user?.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.shippingStatus}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className={`px-3 py-1 text-xs font-medium tracking-[0.05em] uppercase border-0 focus:outline-none ${getStatusColor(order.shippingStatus)}`}
                          disabled={updating}
                        >
                          {statusOptions.slice(1).map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium text-amber-900">
                          Rs. {order.total?.toLocaleString()}
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
                            onClick={() => viewOrderDetails(order)}
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