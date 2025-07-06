const express = require('express');
const User = require('../models/User');
const Order = require('../models/Order');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { auth, admin } = require('../middleware/auth');
const router = express.Router();

// Get analytics summary
router.get('/summary', auth, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalSalesAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalSales = totalSalesAgg[0]?.total || 0;
    const totalCategories = await Category.countDocuments();
    const totalProducts = await Product.countDocuments();
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name email');

    // Top products aggregation
    const topProductsAgg = await Order.aggregate([
      { $unwind: '$items' },
      { $group: {
          _id: '$items.product',
          name: { $first: '$items.name' },
          sales: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
        }
      },
      { $sort: { sales: -1 } },
      { $limit: 5 }
    ]);
    const topProducts = topProductsAgg.map(p => ({
      productId: p._id,
      name: p.name,
      sales: p.sales,
      revenue: p.revenue
    }));

    // Today's Overview
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const newOrdersToday = await Order.countDocuments({ createdAt: { $gte: startOfToday } });
    const revenueTodayAgg = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfToday } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const revenueToday = revenueTodayAgg[0]?.total || 0;
    const newCustomersToday = await User.countDocuments({ createdAt: { $gte: startOfToday } });

    res.json({ totalUsers, totalOrders, totalSales, totalCategories, totalProducts, recentOrders, topProducts, newOrdersToday, revenueToday, newCustomersToday });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 