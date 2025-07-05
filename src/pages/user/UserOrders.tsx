import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, Eye, Download, X, User, Mail, Phone, MapPin } from 'lucide-react';

const UserOrders = () => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const orders = [
    {
      id: '#EH001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 289000,
      items: [
        { name: 'Hemp Blazer', size: 'M', color: 'Sage', price: 289000, image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=200&h=250&fit=crop' }
      ],
      tracking: 'EH123456789',
      deliveryDate: '2024-01-18',
      customerInfo: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, Boulder, CO 80301'
      }
    },
    {
      id: '#EH002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 348000,
      items: [
        { name: 'Organic Cotton Dress', size: 'S', color: 'Natural', price: 189000, image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=200&h=250&fit=crop' },
        { name: 'Hemp Trousers', size: 'S', color: 'Stone', price: 159000, image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=200&h=250&fit=crop' }
      ],
      tracking: 'EH123456790',
      estimatedDelivery: '2024-01-20',
      customerInfo: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, Boulder, CO 80301'
      }
    },
    {
      id: '#EH003',
      date: '2024-01-05',
      status: 'Processing',
      total: 129000,
      items: [
        { name: 'Sustainable Cardigan', size: 'M', color: 'Cream', price: 129000, image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=200&h=250&fit=crop' }
      ],
      customerInfo: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, Boulder, CO 80301'
      }
    }
  ];

  const statusOptions = ['All', 'Processing', 'Shipped', 'Delivered'];

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
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  const filteredOrders = selectedStatus === 'All' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const handleViewOrder = (order) => {
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
                    <span className="font-medium text-amber-900">Rs. {selectedOrder.total.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-stone-50 border border-stone-200">
                    <span className="text-stone-600">Items</span>
                    <span className="font-medium text-amber-900">{selectedOrder.items.length} item{selectedOrder.items.length > 1 ? 's' : ''}</span>
                  </div>
                  
                  {selectedOrder.tracking && (
                    <div className="flex justify-between items-center p-4 bg-stone-50 border border-stone-200">
                      <span className="text-stone-600">Tracking Number</span>
                      <span className="font-medium text-amber-900">{selectedOrder.tracking}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="text-xl font-light text-amber-900 mb-6 tracking-[0.1em]">
                  Shipping Information
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
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-stone-50 border border-stone-200">
                    <div className="w-16 h-20 bg-stone-200 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-amber-900">{item.name}</h4>
                      <p className="text-sm text-stone-600">Size: {item.size} • Color: {item.color}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-amber-900">Rs. {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {selectedOrder.tracking && (
                <button 
                  onClick={() => window.open(`https://track.example.com/${selectedOrder.tracking}`, '_blank')}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 hover:bg-blue-700 transition-colors text-sm font-medium tracking-[0.1em] uppercase"
                >
                  <Truck size={16} />
                  <span>Track Package</span>
                </button>
              )}
              
              {selectedOrder.status === 'Delivered' && (
                <button 
                  onClick={() => console.log('Download invoice:', selectedOrder.id)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-amber-900 text-white py-3 px-6 hover:bg-amber-800 transition-colors text-sm font-medium tracking-[0.1em] uppercase"
                >
                  <Download size={16} />
                  <span>Download Invoice</span>
                </button>
              )}
              
              <button 
                onClick={() => console.log('Reorder items:', selectedOrder.id)}
                className="flex-1 border border-amber-900 text-amber-900 py-3 px-6 hover:bg-amber-50 transition-colors text-sm font-medium tracking-[0.1em] uppercase"
              >
                Reorder Items
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };
  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                My Orders
              </h1>
              <p className="text-stone-600 tracking-[0.02em]">
                Track and manage your orders
              </p>
            </div>
          </div>
        </motion.div>

        {/* Status Filter */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-3">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-6 py-2 text-sm font-medium tracking-[0.1em] uppercase transition-all duration-300 ${
                  selectedStatus === status
                    ? 'bg-amber-900 text-white shadow-lg'
                    : 'bg-white text-amber-900 border border-amber-900 hover:bg-amber-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order, index) => {
            const StatusIcon = getStatusIcon(order.status);
            
            return (
              <motion.div
                key={order.id}
                className="bg-white shadow-lg border border-stone-200 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Order Header */}
                <div className="p-6 border-b border-stone-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                      <div className="flex items-center space-x-3">
                        <StatusIcon size={20} className="text-amber-900" />
                        <div>
                          <h3 className="text-lg font-medium text-amber-900 tracking-[0.05em]">
                            Order {order.id}
                          </h3>
                          <p className="text-sm text-stone-600">
                            Placed on {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 text-xs font-medium tracking-[0.05em] uppercase ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <p className="text-lg font-medium text-amber-900">
                        Rs. {order.total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-20 object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-amber-900 tracking-[0.05em]">
                            {item.name}
                          </h4>
                          <p className="text-sm text-stone-600">
                            Size: {item.size} • Color: {item.color}
                          </p>
                          <p className="text-sm font-medium text-amber-900">
                            Rs. {item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="mt-6 pt-6 border-t border-stone-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                      <div className="text-sm text-stone-600">
                        {order.tracking && (
                          <p>Tracking: <span className="font-medium text-amber-900">{order.tracking}</span></p>
                        )}
                        {order.deliveryDate && (
                          <p>Delivered on {new Date(order.deliveryDate).toLocaleDateString()}</p>
                        )}
                        {order.estimatedDelivery && (
                          <p>Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                        )}
                      </div>
                      
                      <div className="flex space-x-3">
                        <motion.button
                          className="flex items-center space-x-2 px-4 py-2 border border-amber-900 text-amber-900 hover:bg-amber-50 transition-colors text-sm tracking-[0.05em]"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleViewOrder(order)}
                        >
                          <Eye size={16} />
                          <span>View Details</span>
                        </motion.button>
                        
                        {order.status === 'Delivered' && (
                          <motion.button
                            className="flex items-center space-x-2 px-4 py-2 bg-amber-900 text-white hover:bg-amber-800 transition-colors text-sm tracking-[0.05em]"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                           onClick={() => console.log('Download invoice:', order.id)}
                          >
                            <Download size={16} />
                            <span>Invoice</span>
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

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
              {selectedStatus === 'All' 
                ? "You haven't placed any orders yet."
                : `No orders with status "${selectedStatus}".`
              }
            </p>
          </motion.div>
        )}
        
        {/* Order Details Modal */}
        {showOrderModal && <OrderDetailsModal />}
      </div>
    </div>
  );
};

export default UserOrders;