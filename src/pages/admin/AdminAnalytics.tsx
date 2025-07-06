import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Package, Users, ShoppingBag, Star } from 'lucide-react';

const AdminAnalytics = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [topProducts, setTopProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/analytics/summary', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch analytics');
        const data = await res.json();
        setMetrics({
          revenue: data.totalSales,
          orders: data.totalOrders,
          users: data.totalUsers,
          productsSold: data.totalProductsSold || 0,
          categories: data.totalCategories || 0,
          avgOrderValue: data.totalOrders ? Math.round(data.totalSales / data.totalOrders) : 0,
        });
        setRecentOrders(data.recentOrders || []);
        setTopProducts(data.topProducts || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch analytics');
      }
      setLoading(false);
    };
    fetchAnalytics();
  }, []);

  // Static data for now (top products, salesData, customer segments)
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
          <motion.div
            className="bg-white p-6 shadow-lg border border-stone-200"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <DollarSign size={24} className="text-amber-900" />
            </div>
            <p className="text-2xl font-light text-amber-900 mb-1">
              Rs. {metrics?.revenue?.toLocaleString() || 0}
            </p>
            <p className="text-xs text-stone-600 uppercase tracking-[0.05em]">
              Revenue
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 shadow-lg border border-stone-200"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <Package size={24} className="text-amber-900" />
            </div>
            <p className="text-2xl font-light text-amber-900 mb-1">
              {metrics?.orders?.toLocaleString() || 0}
            </p>
            <p className="text-xs text-stone-600 uppercase tracking-[0.05em]">
              Orders
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 shadow-lg border border-stone-200"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <Users size={24} className="text-amber-900" />
            </div>
            <p className="text-2xl font-light text-amber-900 mb-1">
              {metrics?.users?.toLocaleString() || 0}
            </p>
            <p className="text-xs text-stone-600 uppercase tracking-[0.05em]">
              Customers
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 shadow-lg border border-stone-200"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <ShoppingBag size={24} className="text-amber-900" />
            </div>
            <p className="text-2xl font-light text-amber-900 mb-1">
              {metrics?.productsSold?.toLocaleString() || 0}
            </p>
            <p className="text-xs text-stone-600 uppercase tracking-[0.05em]">
              Products Sold
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 shadow-lg border border-stone-200"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <Star size={24} className="text-amber-900" />
            </div>
            <p className="text-2xl font-light text-amber-900 mb-1">
              {metrics?.categories?.toLocaleString() || 0}
            </p>
            <p className="text-xs text-stone-600 uppercase tracking-[0.05em]">
              Categories
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 shadow-lg border border-stone-200"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp size={24} className="text-amber-900" />
            </div>
            <p className="text-2xl font-light text-amber-900 mb-1">
              Rs. {metrics?.avgOrderValue?.toLocaleString() || 0}
            </p>
            <p className="text-xs text-stone-600 uppercase tracking-[0.05em]">
              Avg Order Value
            </p>
          </motion.div>
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
              {topProducts.length === 0 ? (
                <div className="text-stone-400 text-center">No top products found.</div>
              ) : topProducts.map((product, index) => (
                <motion.div
                  key={product.productId || product.name}
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
                      {product.sales} sales • Rs. {product.revenue?.toLocaleString() || 0} revenue
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Orders from backend */}
        <motion.div
          className="bg-white p-6 shadow-lg border border-stone-200 mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-light text-amber-900 mb-6 tracking-[0.1em]">
            Recent Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-amber-900 font-mono text-xs">{order._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.user?.name || 'N/A'}<br /><span className="text-xs text-stone-500">{order.user?.email}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap">Rs. {order.total?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}</td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-stone-400">No recent orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAnalytics;