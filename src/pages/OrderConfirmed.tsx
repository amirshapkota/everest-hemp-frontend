import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Mail, Download, ArrowRight } from 'lucide-react';

const OrderConfirmed = () => {
  const orderDetails = {
    orderNumber: '#EH001234',
    orderDate: new Date().toLocaleDateString(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    trackingNumber: 'EH123456789',
    email: 'customer@example.com',
    total: 478000,
    items: [
      {
        id: 1,
        name: "Hemp Blazer",
        price: 289000,
        image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=200&h=250&fit=crop",
        color: "Sage",
        size: "M",
        quantity: 1
      },
      {
        id: 2,
        name: "Organic Cotton Dress",
        price: 189000,
        image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=200&h=250&fit=crop",
        color: "Natural",
        size: "S",
        quantity: 1
      }
    ]
  };

  const nextSteps = [
    {
      icon: Mail,
      title: "Order Confirmation",
      description: "We've sent a confirmation email to your inbox",
      status: "completed"
    },
    {
      icon: Package,
      title: "Processing",
      description: "Your order is being prepared with care",
      status: "current"
    },
    {
      icon: Truck,
      title: "Shipping",
      description: "Your order will be shipped within 2-3 business days",
      status: "upcoming"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <CheckCircle size={40} className="text-green-600" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-light text-amber-900 mb-4 tracking-[0.15em] uppercase">
            Order Confirmed!
          </h1>
          
          <p className="text-xl text-stone-600 mb-6">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <img 
              src="/public/logo-nobg.png" 
              alt="Everest Hemp" 
              className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 mx-auto mb-8 opacity-90"
            />
            <div className="text-left">
              <p className="text-lg font-medium text-amber-900">
                Order {orderDetails.orderNumber}
              </p>
              <p className="text-sm text-stone-600">
                Placed on {orderDetails.orderDate}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Order Progress */}
        <motion.div
          className="bg-white p-8 shadow-lg border border-stone-200 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-light text-amber-900 mb-8 tracking-[0.1em]">
            Order Progress
          </h2>
          
          <div className="relative">
            <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-stone-200"></div>
            
            <div className="space-y-8">
              {nextSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 ${
                    step.status === 'completed' ? 'bg-green-100 text-green-600' :
                    step.status === 'current' ? 'bg-amber-100 text-amber-600' :
                    'bg-stone-100 text-stone-400'
                  }`}>
                    <step.icon size={20} />
                  </div>
                  
                  <div className="flex-1 pt-2">
                    <h3 className={`text-lg font-medium mb-1 ${
                      step.status === 'completed' ? 'text-green-700' :
                      step.status === 'current' ? 'text-amber-700' :
                      'text-stone-500'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-stone-600">{step.description}</p>
                  </div>
                  
                  {step.status === 'completed' && (
                    <CheckCircle size={20} className="text-green-600 mt-3" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <motion.div
            className="bg-white p-8 shadow-lg border border-stone-200"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-2xl font-light text-amber-900 mb-6 tracking-[0.1em]">
              Order Details
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-stone-600">Order Number</span>
                <span className="font-medium text-amber-900">{orderDetails.orderNumber}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-stone-600">Order Date</span>
                <span className="font-medium text-amber-900">{orderDetails.orderDate}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-stone-600">Estimated Delivery</span>
                <span className="font-medium text-amber-900">{orderDetails.estimatedDelivery}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-stone-600">Tracking Number</span>
                <span className="font-medium text-amber-900">{orderDetails.trackingNumber}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-stone-600">Email</span>
                <span className="font-medium text-amber-900">{orderDetails.email}</span>
              </div>
              
              <div className="border-t border-stone-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-amber-900">Total</span>
                  <span className="text-lg font-medium text-amber-900">Rs. {orderDetails.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <motion.button
                className="w-full bg-amber-900 text-white py-3 text-sm font-medium tracking-[0.1em] uppercase hover:bg-amber-800 transition-colors flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={16} />
                <span>Download Invoice</span>
              </motion.button>
              
              <Link to="/orders">
                <motion.button
                  className="w-full border-2 border-amber-900 text-amber-900 py-3 text-sm font-medium tracking-[0.1em] uppercase hover:bg-amber-50 transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Package size={16} />
                  <span>Track Order</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Order Items */}
          <motion.div
            className="bg-white p-8 shadow-lg border border-stone-200"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h2 className="text-2xl font-light text-amber-900 mb-6 tracking-[0.1em]">
              Your Items
            </h2>
            
            <div className="space-y-6">
              {orderDetails.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-amber-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-stone-600 mb-2">
                      Color: {item.color} • Size: {item.size}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-stone-600">
                        Qty: {item.quantity}
                      </span>
                      <span className="font-medium text-amber-900">
                        Rs. {item.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Next Steps */}
        <motion.div
          className="bg-gradient-to-br from-amber-900 to-stone-900 text-white p-8 mt-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <h2 className="text-2xl font-light mb-6 tracking-[0.1em] uppercase">
            What's Next?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <Mail size={32} className="mx-auto mb-4 opacity-80" />
              <h3 className="text-lg font-medium mb-2">Check Your Email</h3>
              <p className="text-sm opacity-80">
                We've sent order confirmation and tracking details
              </p>
            </div>
            
            <div className="text-center">
              <Package size={32} className="mx-auto mb-4 opacity-80" />
              <h3 className="text-lg font-medium mb-2">Track Your Order</h3>
              <p className="text-sm opacity-80">
                Monitor your order status in your account
              </p>
            </div>
            
            <div className="text-center">
              <Truck size={32} className="mx-auto mb-4 opacity-80" />
              <h3 className="text-lg font-medium mb-2">Delivery Updates</h3>
              <p className="text-sm opacity-80">
                Get notified when your order ships and arrives
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/all-products">
              <motion.button
                className="border-2 border-amber-300 text-amber-300 px-8 py-3 text-sm font-medium tracking-[0.1em] uppercase hover:bg-amber-300 hover:text-amber-900 transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Continue Shopping</span>
                <ArrowRight size={16} />
              </motion.button>
            </Link>
            
            <Link to="/dashboard">
              <motion.button
                className="bg-amber-300 text-amber-900 px-8 py-3 text-sm font-medium tracking-[0.1em] uppercase hover:bg-amber-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                View Account
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmed;