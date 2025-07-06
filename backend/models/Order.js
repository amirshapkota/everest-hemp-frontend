const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: String,
      price: Number,
      quantity: Number,
      color: String,
      size: String,
      image: String
    }
  ],
  shippingInfo: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentMethod: { type: String },
  paymentStatus: { type: String, default: 'pending' },
  shippingMethod: { type: String },
  shippingStatus: { type: String, default: 'processing' },
  total: { type: Number, required: true },
  orderNotes: { type: String },
  tracking: { type: String },
  deliveredAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema); 