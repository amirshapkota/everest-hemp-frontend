import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp, 
  ShoppingBag, 
  Star,
  AlertCircle,
  Eye,
  ArrowRight
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Revenue', value: 'Rs. 12,489,000', change: '+12.5%', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Total Orders', value: '1,247', change: '+8.2%', icon: Package, color: 'bg-blue-500' },
    { label: 'Total Customers', value: '892', change: '+15.3%', icon: Users, color: 'bg-purple-500' },
    { label: 'Products Sold', value: '2,156', change: '+6.7%', icon: ShoppingBag, color: 'bg-amber-500' }
  ];

  const quickActions = [
    { title: 'Manage Orders', description: 'View and process customer orders', icon: Package, link: '/admin/orders', color: 'bg-blue-50 text-blue-700', stats: '24 pending' },
    { title: 'Product Catalog', description: 'Add and edit product inventory', icon: ShoppingBag, link: '/admin/products', color: 'bg-green-50 text-green-700', stats: '156 products' },
    { title: 'Customer Management', description: 'View and manage customers', icon: Users, link: '/admin/customers', color: 'bg-purple-50 text-purple-700', stats: '892 customers' },
    { title: 'Analytics Dashboard', description: 'Sales and performance metrics', icon: TrendingUp, link: '/admin/analytics', color: 'bg-amber-50 text-amber-700', stats: 'View reports' },
    { title: 'Category Management', description: 'Organize product categories', icon: Star, link: '/admin/categories', color: 'bg-indigo-50 text-indigo-700', stats: '10 categories' }
  ];

  const recentOrders = [
    { id: '#EH001', customer: 'Sarah Johnson', amount: 'Rs. 289,000', status: 'Processing', date: '2024-01-15' },
    { id: '#EH002', customer: 'Michael Chen', amount: 'Rs. 189,000', status: 'Shipped', date: '2024-01-15' },
    { id: '#EH003', customer: 'Emma Wilson', amount: 'Rs. 348,000', status: 'Delivered', date: '2024-01-14' },
    { id: '#EH004', customer: 'David Brown', amount: 'Rs. 129,000', status: 'Processing', date: '2024-01-14' },
    { id: '#EH005', customer: 'Lisa Garcia', amount: 'Rs. 215,000', status: 'Shipped', date: '2024-01-13' }
  ];

  const alerts = [
    { type: 'warning', message: '5 products are low in stock', action: 'View Inventory' },
    { type: 'info', message: '12 new customer reviews pending', action: 'Review' },
    { type: 'success', message: 'Monthly sales target achieved', action: 'View Report' }
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
          <div className="flex items-center space-x-4">
            <img 
              src="/logo-nobg.png" 
              alt="Everest Hemp" 
              className="h-14 w-14 sm:h-16 sm:w-16 lg:h-18 lg:w-18"
            />
            <div>
              <h1 className="text-3xl font-light text-amber-900 tracking-[0.1em]">
                Admin Dashboard
              </h1>
              <p className="text-stone-600 tracking-[0.02em]">
                Welcome back, manage your store
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white p-6 shadow-lg border border-stone-200"
              whileHover={{ y: -5, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-light text-amber-900 tracking-[0.05em]">
                    {stat.value}
                  </p>
                  <p className="text-sm text-stone-600 tracking-[0.05em] uppercase mt-1">
                    {stat.label}
                  </p>
                  <p className="text-sm text-green-600 font-medium mt-2">
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color} text-white`}>
                  <stat.icon size={24} />
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
            <h2 className="text-2xl font-light text-amber-900 mb-6 tracking-[0.1em]">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    className="block bg-white p-6 shadow-lg border border-stone-200 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-3 rounded-full ${action.color}`}>
                          <action.icon size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-amber-900 mb-2 tracking-[0.05em]">
                            {action.title}
                          </h3>
                          <p className="text-stone-600 text-sm mb-2">
                            {action.description}
                          </p>
                          <p className="text-xs text-amber-700 font-medium">
                            {action.stats}
                          </p>
                        </div>
                      </div>
                      <motion.div
                        className="text-amber-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <ArrowRight size={20} />
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Admin Navigation Grid */}
            <div className="mt-12">
              <h2 className="text-2xl font-light text-amber-900 mb-6 tracking-[0.1em]">
                Admin Tools
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { name: 'Orders', icon: Package, link: '/admin/orders', count: '24' },
                  { name: 'Products', icon: ShoppingBag, link: '/admin/products', count: '156' },
                  { name: 'Customers', icon: Users, link: '/admin/customers', count: '892' },
                  { name: 'Analytics', icon: TrendingUp, link: '/admin/analytics', count: 'Reports' },
                  { name: 'Categories', icon: Star, link: '/admin/categories', count: '10' }
                ].map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                  >
                    <Link
                      to={tool.link}
                      className="block bg-gradient-to-br from-amber-900 to-stone-900 text-white p-6 hover:from-amber-800 hover:to-stone-800 transition-all duration-300 group"
                    >
                      <div className="text-center">
                        <motion.div
                          className="mb-4"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <tool.icon size={32} className="mx-auto" />
                        </motion.div>
                        <h3 className="text-lg font-medium mb-2 tracking-[0.05em]">
                          {tool.name}
                        </h3>
                        <p className="text-sm opacity-80">
                          {tool.count}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-12">
              <h2 className="text-2xl font-light text-amber-900 mb-6 tracking-[0.1em]">
                Today's Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'New Orders', value: '8', change: '+12%', color: 'text-blue-600' },
                  { label: 'Revenue Today', value: 'Rs. 1,245,000', change: '+8%', color: 'text-green-600' },
                  { label: 'New Customers', value: '3', change: '+25%', color: 'text-purple-600' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="bg-white p-6 shadow-lg border border-stone-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
                  >
                    <h3 className="text-sm text-stone-600 tracking-[0.05em] uppercase mb-2">
                      {stat.label}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-light text-amber-900">
                        {stat.value}
                      </span>
                      <span className={`text-sm font-medium ${stat.color}`}>
                        {stat.change}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light text-amber-900 tracking-[0.1em]">
                Recent Orders
              </h2>
              <Link
                to="/admin/orders"
                className="text-amber-900 hover:text-amber-700 transition-colors text-sm font-medium tracking-[0.05em] uppercase flex items-center space-x-2"
              >
                <span>View All</span>
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="bg-white shadow-lg border border-stone-200">
              <div className="p-6">
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      className="border-b border-stone-200 last:border-b-0 pb-4 last:pb-0 group"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-amber-900 text-sm tracking-[0.05em]">
                            {order.id}
                          </p>
                          <p className="text-xs text-stone-500">
                            {order.customer}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium tracking-[0.05em] uppercase ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {order.status}
                          </span>
                          <Link
                            to={`/admin/orders`}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-amber-50 rounded"
                          >
                            <Eye size={14} className="text-amber-900" />
                          </Link>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-amber-900">
                          {order.amount}
                        </p>
                        <p className="text-xs text-stone-500">
                          {order.date}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Link
                  to="/admin/orders"
                  className="block mt-6 text-center text-amber-900 hover:text-amber-700 transition-colors text-sm font-medium tracking-[0.05em] uppercase flex items-center justify-center space-x-2"
                >
                  <Eye size={16} />
                  <span>View All Orders</span>
                </Link>
              </div>
            </div>

            {/* Alerts */}
            <div className="mt-8">
              <h2 className="text-2xl font-light text-amber-900 mb-6 tracking-[0.1em]">
                Alerts & Notifications
              </h2>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 border-l-4 ${
                      alert.type === 'warning' ? 'bg-amber-50 border-amber-400' :
                      alert.type === 'info' ? 'bg-blue-50 border-blue-400' :
                      'bg-green-50 border-green-400'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <AlertCircle size={20} className={
                          alert.type === 'warning' ? 'text-amber-600' :
                          alert.type === 'info' ? 'text-blue-600' :
                          'text-green-600'
                        } />
                        <p className="text-stone-800">{alert.message}</p>
                      </div>
                      <button className={`text-sm font-medium ${
                        alert.type === 'warning' ? 'text-amber-600 hover:text-amber-700' :
                        alert.type === 'info' ? 'text-blue-600 hover:text-blue-700' :
                        'text-green-600 hover:text-green-700'
                      } transition-colors`}>
                        {alert.action}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;