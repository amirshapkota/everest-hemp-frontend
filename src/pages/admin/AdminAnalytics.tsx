import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Package, Users, ShoppingBag, Star } from 'lucide-react';

const AdminAnalytics = () => {
  const metrics = [
    { label: 'Revenue', value: 'Rs. 12,489,000', change: '+12.5%', trend: 'up', icon: DollarSign },
    { label: 'Orders', value: '1,247', change: '+8.2%', trend: 'up', icon: Package },
    { label: 'Customers', value: '892', change: '+15.3%', trend: 'up', icon: Users },
    { label: 'Avg Order Value', value: 'Rs. 15,600', change: '-2.1%', trend: 'down', icon: ShoppingBag },
    { label: 'Conversion Rate', value: '3.2%', change: '+0.8%', trend: 'up', icon: TrendingUp },
    { label: 'Customer Rating', value: '4.8', change: '+0.2', trend: 'up', icon: Star }
  ];

  const topProducts = [
    { name: 'Hemp Blazer', sales: 156, revenue: 45084000, growth: '+23%' },
    { name: 'Organic Cotton Dress', sales: 134, revenue: 25326000, growth: '+18%' },
    { name: 'Hemp Trousers', sales: 98, revenue: 15582000, growth: '+12%' },
    { name: 'Sustainable Cardigan', sales: 87, revenue: 11223000, growth: '+8%' },
    { name: 'Hemp Silk Blouse', sales: 76, revenue: 7524000, growth: '+15%' }
  ];

  const salesData = [
    { month: 'Jan', sales: 4500000 },
    { month: 'Feb', sales: 5200000 },
    { month: 'Mar', sales: 4800000 },
    { month: 'Apr', sales: 6100000 },
    { month: 'May', sales: 5500000 },
    { month: 'Jun', sales: 6700000 },
    { month: 'Jul', sales: 7200000 },
    { month: 'Aug', sales: 6900000 },
    { month: 'Sep', sales: 7800000 },
    { month: 'Oct', sales: 8500000 },
    { month: 'Nov', sales: 9200000 },
    { month: 'Dec', sales: 9800000 }
  ];

  const maxSales = Math.max(...salesData.map(d => d.sales));

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
                Analytics Dashboard
              </h1>
              <p className="text-stone-600 tracking-[0.02em]">
                Business insights and performance metrics
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="bg-white p-6 shadow-lg border border-stone-200"
              whileHover={{ y: -5, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <metric.icon size={24} className="text-amber-900" />
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <p className="text-2xl font-light text-amber-900 mb-1">
                {metric.value}
              </p>
              <p className="text-xs text-stone-600 uppercase tracking-[0.05em]">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Chart */}
          <motion.div
            className="bg-white p-6 shadow-lg border border-stone-200"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-light text-amber-900 mb-6 tracking-[0.1em]">
              Monthly Sales
            </h2>
            <div className="h-64 flex items-end justify-between space-x-2">
              {salesData.map((data, index) => (
                <motion.div
                  key={data.month}
                  className="flex-1 bg-gradient-to-t from-amber-900 to-amber-600 flex flex-col justify-end items-center"
                  style={{ height: `${(data.sales / maxSales) * 100}%` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.sales / maxSales) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                >
                  <div className="text-white text-xs font-medium mb-2 opacity-0 hover:opacity-100 transition-opacity">
                    Rs. {(data.sales / 100000).toFixed(0)}L
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              {salesData.map((data) => (
                <span key={data.month} className="text-xs text-stone-500 flex-1 text-center">
                  {data.month}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Top Products */}
          <motion.div
            className="bg-white p-6 shadow-lg border border-stone-200"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-light text-amber-900 mb-6 tracking-[0.1em]">
              Top Products
            </h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  className="flex items-center justify-between p-4 border border-stone-200 hover:bg-stone-50 transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-amber-900 tracking-[0.05em]">
                      {product.name}
                    </h3>
                    <p className="text-sm text-stone-600">
                      {product.sales} sales • Rs. {product.revenue.toLocaleString()} revenue
                    </p>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {product.growth}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional Analytics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Customer Segments */}
          <div className="bg-white p-6 shadow-lg border border-stone-200">
            <h3 className="text-xl font-light text-amber-900 mb-6 tracking-[0.1em]">
              Customer Segments
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-stone-600">VIP Customers</span>
                <span className="font-medium text-amber-900">15%</span>
              </div>
              <div className="w-full bg-stone-200 h-2">
                <div className="bg-amber-900 h-2" style={{ width: '15%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-stone-600">Regular Customers</span>
                <span className="font-medium text-amber-900">65%</span>
              </div>
              <div className="w-full bg-stone-200 h-2">
                <div className="bg-amber-700 h-2" style={{ width: '65%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-stone-600">New Customers</span>
                <span className="font-medium text-amber-900">20%</span>
              </div>
              <div className="w-full bg-stone-200 h-2">
                <div className="bg-amber-500 h-2" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white p-6 shadow-lg border border-stone-200">
            <h3 className="text-xl font-light text-amber-900 mb-6 tracking-[0.1em]">
              Traffic Sources
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-stone-600">Organic Search</span>
                <span className="font-medium text-amber-900">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-600">Social Media</span>
                <span className="font-medium text-amber-900">25%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-600">Direct</span>
                <span className="font-medium text-amber-900">20%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-600">Email</span>
                <span className="font-medium text-amber-900">10%</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 shadow-lg border border-stone-200">
            <h3 className="text-xl font-light text-amber-900 mb-6 tracking-[0.1em]">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-stone-600">New order #EH001</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-stone-600">Product review submitted</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-sm text-stone-600">Inventory alert: Hemp Trousers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-stone-600">New customer registered</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAnalytics;