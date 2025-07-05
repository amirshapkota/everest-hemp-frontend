import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, Heart, User, ShoppingBag, Truck, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Orders', value: '12', icon: Package, color: 'bg-blue-500' },
    { label: 'Wishlist Items', value: '8', icon: Heart, color: 'bg-red-500' },
    { label: 'Loyalty Points', value: '2,450', icon: Star, color: 'bg-amber-500' },
    { label: 'Active Orders', value: '2', icon: Truck, color: 'bg-green-500' }
  ];

  const quickActions = [
    { title: 'View Orders', description: 'Track your recent purchases', icon: Package, link: '/orders', color: 'bg-blue-50 text-blue-700' },
    { title: 'Wishlist', description: 'Items you want to buy', icon: Heart, link: '/wishlist', color: 'bg-red-50 text-red-700' },
    { title: 'Profile Settings', description: 'Update your information', icon: User, link: '/profile', color: 'bg-amber-50 text-amber-700' },
    { title: 'Continue Shopping', description: 'Browse our collections', icon: ShoppingBag, link: '/women', color: 'bg-green-50 text-green-700' }
  ];

  const recentOrders = [
    { id: '#EH001', date: '2024-01-15', status: 'Delivered', total: 'Rs. 289,000', items: 'Hemp Blazer' },
    { id: '#EH002', date: '2024-01-10', status: 'Shipped', total: 'Rs. 189,000', items: 'Organic Cotton Dress' },
    { id: '#EH003', date: '2024-01-05', status: 'Processing', total: 'Rs. 159,000', items: 'Hemp Trousers' }
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <img 
                src="/public/logo-nobg.png" 
                alt="Everest Hemp" 
                className="h-14 w-14 sm:h-16 sm:w-16 lg:h-18 lg:w-18"
              />
              <div>
                <h1 className="text-3xl font-light text-amber-900 tracking-[0.1em]">
                  Welcome back, {user?.name}
                </h1>
                <p className="text-stone-600 tracking-[0.02em]">
                  Manage your account and orders
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white p-3 lg:p-6 shadow-lg border border-stone-200"
              whileHover={{ y: -5, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center">
                <div className={`p-1.5 lg:p-2 rounded-full ${stat.color} text-white mb-2 lg:mb-0 lg:mr-3 self-center lg:self-auto`}>
                  <stat.icon size={14} className="lg:w-4 lg:h-4" />
                </div>
                <div className="flex-1 min-w-0 text-center lg:text-left">
                  <p className="text-lg lg:text-2xl font-light text-amber-900 tracking-[0.05em]">
                    {stat.value}
                  </p>
                  <p className="text-xs text-stone-600 tracking-[0.05em] uppercase leading-tight">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-xl lg:text-2xl font-light text-amber-900 mb-6 tracking-[0.1em]">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <Link
                    to={action.link}
                    className="block bg-white p-4 lg:p-6 shadow-lg border border-stone-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                      <div className={`p-2.5 lg:p-3 rounded-full ${action.color} self-center sm:self-start`}>
                        <action.icon size={18} className="lg:w-5 lg:h-5" />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-base lg:text-lg font-medium text-amber-900 mb-2 tracking-[0.05em]">
                          {action.title}
                        </h3>
                        <p className="text-stone-600 text-sm">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-xl lg:text-2xl font-light text-amber-900 mb-6 tracking-[0.1em]">
              Recent Orders
            </h2>
            <div className="bg-white shadow-lg border border-stone-200">
              <div className="p-4 lg:p-6">
                <div className="space-y-3 lg:space-y-4">
                  {recentOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      className="border-b border-stone-200 last:border-b-0 pb-3 lg:pb-4 last:pb-0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-1 sm:space-y-0">
                        <div>
                          <p className="font-medium text-amber-900 text-sm tracking-[0.05em]">
                            {order.id}
                          </p>
                          <p className="text-xs text-stone-500">
                            {order.date}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium tracking-[0.05em] uppercase ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0">
                        <p className="text-sm text-stone-600">
                          {order.items}
                        </p>
                      <p className="text-sm font-medium text-amber-900">
                        {order.total}
                      </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Link
                  to="/orders"
                  className="block mt-4 lg:mt-6 text-center text-amber-900 hover:text-amber-700 transition-colors text-sm font-medium tracking-[0.05em] uppercase"
                >
                  View All Orders
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;