const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: String },
  collection: { type: String },
  colors: [{ type: String }],
  sizes: [{ type: String }],
  inStock: { type: Boolean, default: true },
  sku: { type: String },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  features: [{ type: String }],
  care: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema); 