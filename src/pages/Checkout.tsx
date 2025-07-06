import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, MapPin, User, Mail, Phone, ArrowLeft, ArrowRight, Truck, Wallet, Banknote } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nepal',
    
    // Payment Information
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    esewaId: '',
    khaltiNumber: '',
    
    // Order Options
    shippingMethod: 'standard',
    giftMessage: '',
    newsletter: false
  });

  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [error, setError] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = formData.shippingMethod === 'express' ? 2500 : 0;
  const tax = subtotal * 0.13; // VAT in Nepal
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!user) {
      setError("You must be logged in to place an order.");
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Authentication token missing. Please log in again.");
      return;
    }
    const orderPayload = {
      user: user.id,
      items: cart.map(item => ({
        product: item.product,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
        image: item.image
      })),
      shippingInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      },
      paymentMethod: formData.paymentMethod,
      shippingMethod: formData.shippingMethod,
      total: total + (formData.paymentMethod === 'cod' ? 100 : 0),
      orderNotes: formData.giftMessage
    };
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderPayload)
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Order failed');
      }
      clearCart();
      navigate('/order-confirmed');
    } catch (err: any) {
      setError(err.message || 'Order failed');
    }
  };

  const steps = [
    { number: 1, title: 'Shipping', icon: MapPin },
    { number: 2, title: 'Payment', icon: CreditCard },
    { number: 3, title: 'Review', icon: Lock }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, American Express' },
    { id: 'esewa', name: 'eSewa', icon: Wallet, description: 'Digital wallet payment' },
    { id: 'khalti', name: 'Khalti', icon: Wallet, description: 'Digital wallet payment' },
    { id: 'cod', name: 'Cash on Delivery', icon: Banknote, description: 'Pay when you receive' }
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <motion.div
          className="mb-6 lg:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4 mb-6">
            <img 
              src="/logo-nobg.png" 
              alt="Everest Hemp" 
              className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
            />
            <h1 className="text-2xl lg:text-3xl font-light text-amber-900 tracking-[0.1em] uppercase">
              Checkout
            </h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 lg:space-x-8 mb-6 lg:mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <motion.div
                  className={`flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 ${
                    currentStep >= step.number
                      ? 'bg-amber-900 border-amber-900 text-white'
                      : 'border-stone-300 text-stone-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <step.icon size={16} className="lg:w-5 lg:h-5" />
                </motion.div>
                <span className={`ml-2 lg:ml-3 text-xs lg:text-sm font-medium tracking-[0.05em] uppercase ${
                  currentStep >= step.number ? 'text-amber-900' : 'text-stone-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-8 lg:w-16 h-0.5 ml-4 lg:ml-8 ${
                    currentStep > step.number ? 'bg-amber-900' : 'bg-stone-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-200 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white p-4 lg:p-8 shadow-lg border border-stone-200"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-xl lg:text-2xl font-light text-amber-900 mb-4 lg:mb-6 tracking-[0.1em]">
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 lg:w-[18px] lg:h-[18px]" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-9 lg:pl-10 pr-4 py-2.5 lg:py-3 border-2 border-stone-300 text-amber-900 focus:outline-none focus:border-amber-900 transition-colors text-sm lg:text-base"
                          placeholder="John"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 lg:py-3 border-2 border-stone-300 text-amber-900 focus:outline-none focus:border-amber-900 transition-colors text-sm lg:text-base"
                        placeholder="Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 lg:w-[18px] lg:h-[18px]" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-9 lg:pl-10 pr-4 py-2.5 lg:py-3 border-2 border-stone-300 text-amber-900 focus:outline-none focus:border-amber-900 transition-colors text-sm lg:text-base"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 lg:w-[18px] lg:h-[18px]" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-9 lg:pl-10 pr-4 py-2.5 lg:py-3 border-2 border-stone-300 text-amber-900 focus:outline-none focus:border-amber-900 transition-colors text-sm lg:text-base"
                          placeholder="+977 98XXXXXXXX"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-6">
                    <label className="block text-sm font-medium text-amber-900 mb-2">
                      Address *
                    </label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 lg:w-[18px] lg:h-[18px]" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-9 lg:pl-10 pr-4 py-2.5 lg:py-3 border-2 border-stone-300 text-amber-900 focus:outline-none focus:border-amber-900 transition-colors text-sm lg:text-base"
                        placeholder="Thamel, Kathmandu"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-4 lg:mt-6">
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 lg:py-3 border-2 border-stone-300 text-amber-900 focus:outline-none focus:border-amber-900 transition-colors text-sm lg:text-base"
                        placeholder="Kathmandu"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Province *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 lg:py-3 border-2 border-stone-300 text-amber-900 focus:outline-none focus:border-amber-900 transition-colors text-sm lg:text-base"
                      >
                        <option value="">Select Province</option>
                        <option value="Province 1">Province 1</option>
                        <option value="Madhesh">Madhesh</option>
                        <option value="Bagmati">Bagmati</option>
                        <option value="Gandaki">Gandaki</option>
                        <option value="Lumbini">Lumbini</option>
                        <option value="Karnali">Karnali</option>
                        <option value="Sudurpashchim">Sudurpashchim</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 lg:py-3 border-2 border-stone-300 text-amber-900 focus:outline-none focus:border-amber-900 transition-colors text-sm lg:text-base"
                        placeholder="44600"
                      />
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="mt-6 lg:mt-8">
                    <h3 className="text-base lg:text-lg font-medium text-amber-900 mb-4 tracking-[0.05em]">
                      Shipping Method
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center p-3 lg:p-4 border border-stone-300 cursor-pointer hover:bg-stone-50 transition-colors">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="standard"
                          checked={formData.shippingMethod === 'standard'}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="font-medium text-amber-900 text-sm lg:text-base">Standard Shipping</span>
                            <span className="text-green-600 font-medium text-sm lg:text-base">Free</span>
                          </div>
                          <p className="text-xs lg:text-sm text-stone-600">5-7 business days</p>
                        </div>
                      </label>

                      <label className="flex items-center p-3 lg:p-4 border border-stone-300 cursor-pointer hover:bg-stone-50 transition-colors">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="express"
                          checked={formData.shippingMethod === 'express'}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="font-medium text-amber-900 text-sm lg:text-base">Express Shipping</span>
                            <span className="text-amber-900 font-medium text-sm lg:text-base">Rs. 2,500</span>
                          </div>
                          <p className="text-xs lg:text-sm text-stone-600">2-3 business days</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-xl lg:text-2xl font-light text-amber-900 mb-4 lg:mb-6 tracking-[0.1em]">
                    Payment Information
                  </h2>

                  {/* Payment Method Selection */}
                  <div className="mb-6 lg:mb-8">
                    <h3 className="text-base lg:text-lg font-medium text-amber-900 mb-4 tracking-[0.05em]">
                      Choose Payment Method
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                      {paymentMethods.map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center p-3 lg:p-4 border-2 cursor-pointer transition-all duration-300 ${
                            formData.paymentMethod === method.id
                              ? 'border-amber-900 bg-amber-50'
                              : 'border-stone-300 hover:border-amber-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={formData.paymentMethod === method.id}
                            onChange={handleInputChange}
                            className="mr-3"
                          />
                          <method.icon size={20} className="text-amber-900 mr-3" />
                          <div className="flex-1">
                            <div className="font-medium text-amber-900 text-sm lg:text-base">
                              {method.name}
                            </div>
                            <div className="text-xs lg:text-sm text-stone-600">
                              {method.description}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="space-y-4 lg:space-y-6">
                    {formData.paymentMethod === 'card' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4 lg:space-y-6"
                      >
                        <div>
                          <label className="block text-sm font-medium text-amber-900 mb-2">
                            Card Number *
                          </label>
                          <div className="relative">
                            <CreditCard size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 lg:w-[18px] lg:h-[18px]" />
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              required
                              className="w-full pl-9 lg:pl-10 pr-4 py-2.5 lg:py-3 border-2 border-stone-300 text-amber-900 focus:outline-none focus:border-amber-900 transition-colors text-sm lg:text-base"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                          <div>
                            <label className="block text-sm font-medium text-amber-900 mb-2">
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2.5 lg:py-3 border-2 border-stone-300 text-amber-900 focus:outline-none focus:border-amber-900 transition-colors text-sm lg:text-base"
                              placeholder="MM/YY"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-amber-900 mb-2">
                              CVV *
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2.5 lg:py-3 border-2 border-stone-300 text-amber-900 focus:outline-none focus:border-amber-900 transition-colors text-sm lg:text-base"
                              placeholder="123"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-amber-900 mb-2">
                            Cardholder Name *
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2.5 lg:py-3 border-2 border-stone-300 text-amber-900 focus:outline-none focus:border-amber-900 transition-colors text-sm lg:text-base"
                            placeholder="John Doe"
                          />
                        </div>
                      </motion.div>
                    )}

                    {formData.paymentMethod === 'esewa' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div>
                          <label className="block text-sm font-medium text-amber-900 mb-2">
                            eSewa ID *
                          </label>
                          <div className="relative">
                            <Wallet size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 lg:w-[18px] lg:h-[18px]" />
                            <input
                              type="text"
                              name="esewaId"
                              value={formData.esewaId}
                              onChange={handleInputChange}
                              required
                              className="w-full pl-9 lg:pl-10 pr-4 py-2.5 lg:py-3 border-2 border-stone-300 text-amber-900 focus:outline-none focus:border-amber-900 transition-colors text-sm lg:text-base"
                              placeholder="98XXXXXXXX or your@email.com"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {formData.paymentMethod === 'khalti' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div>
                          <label className="block text-sm font-medium text-amber-900 mb-2">
                            Khalti Number *
                          </label>
                          <div className="relative">
                            <Wallet size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 lg:w-[18px] lg:h-[18px]" />
                            <input
                              type="text"
                              name="khaltiNumber"
                              value={formData.khaltiNumber}
                              onChange={handleInputChange}
                              required
                              className="w-full pl-9 lg:pl-10 pr-4 py-2.5 lg:py-3 border-2 border-stone-300 text-amber-900 focus:outline-none focus:border-amber-900 transition-colors text-sm lg:text-base"
                              placeholder="98XXXXXXXX"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {formData.paymentMethod === 'cod' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-amber-50 p-4 lg:p-6 border border-amber-200"
                      >
                        <div className="flex items-start space-x-3">
                          <Banknote size={20} className="text-amber-700 mt-1" />
                          <div>
                            <h4 className="font-medium text-amber-900 mb-2">Cash on Delivery</h4>
                            <p className="text-sm text-amber-800 leading-relaxed">
                              You will pay in cash when your order is delivered to your address. 
                              Please ensure you have the exact amount ready.
                            </p>
                            <p className="text-xs text-amber-700 mt-2">
                              Additional COD charges: Rs. 100
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="bg-amber-50 p-3 lg:p-4 border border-amber-200">
                      <div className="flex items-center space-x-2">
                        <Lock size={14} className="text-amber-700 lg:w-4 lg:h-4" />
                        <p className="text-xs lg:text-sm text-amber-800">
                          Your payment information is encrypted and secure
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-xl lg:text-2xl font-light text-amber-900 mb-4 lg:mb-6 tracking-[0.1em]">
                    Review Your Order
                  </h2>

                  {/* Shipping Address */}
                  <div className="mb-4 lg:mb-6 p-3 lg:p-4 bg-stone-50 border border-stone-200">
                    <h3 className="font-medium text-amber-900 mb-2 text-sm lg:text-base">Shipping Address</h3>
                    <p className="text-stone-700 text-sm lg:text-base">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-4 lg:mb-6 p-3 lg:p-4 bg-stone-50 border border-stone-200">
                    <h3 className="font-medium text-amber-900 mb-2 text-sm lg:text-base">Payment Method</h3>
                    <p className="text-stone-700 text-sm lg:text-base">
                      {formData.paymentMethod === 'card' && `**** **** **** ${formData.cardNumber.slice(-4)}`}
                      {formData.paymentMethod === 'esewa' && `eSewa: ${formData.esewaId}`}
                      {formData.paymentMethod === 'khalti' && `Khalti: ${formData.khaltiNumber}`}
                      {formData.paymentMethod === 'cod' && 'Cash on Delivery'}
                      <br />
                      {formData.paymentMethod === 'card' && formData.cardName}
                    </p>
                  </div>

                  {/* Gift Message */}
                  <div className="mb-4 lg:mb-6">
                    <label className="block text-sm font-medium text-amber-900 mb-2">
                      Gift Message (Optional)
                    </label>
                    <textarea
                      name="giftMessage"
                      value={formData.giftMessage}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2.5 lg:py-3 border-2 border-stone-300 text-amber-900 focus:outline-none focus:border-amber-900 transition-colors resize-none text-sm lg:text-base"
                      placeholder="Add a personal message..."
                    />
                  </div>

                  {/* Newsletter Signup */}
                  <div className="mb-4 lg:mb-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                        className="mr-3 mt-1"
                      />
                      <span className="text-sm text-stone-700">
                        Subscribe to our newsletter for exclusive offers and updates
                      </span>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-between mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-stone-200 space-y-3 sm:space-y-0">
                {currentStep > 1 && (
                  <motion.button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex items-center justify-center space-x-2 px-4 lg:px-6 py-2.5 lg:py-3 border-2 border-amber-900 text-amber-900 hover:bg-amber-50 transition-colors text-sm lg:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft size={14} className="lg:w-4 lg:h-4" />
                    <span>Previous</span>
                  </motion.button>
                )}

                {currentStep < 3 ? (
                  <motion.button
                    type="button"
                    onClick={handleNextStep}
                    className="flex items-center justify-center space-x-2 bg-amber-900 text-white px-4 lg:px-6 py-2.5 lg:py-3 hover:bg-amber-800 transition-colors ml-auto text-sm lg:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Next</span>
                    <ArrowRight size={14} className="lg:w-4 lg:h-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    className="flex items-center justify-center space-x-2 bg-amber-900 text-white px-6 lg:px-8 py-2.5 lg:py-3 hover:bg-amber-800 transition-colors ml-auto text-xs lg:text-sm font-medium tracking-[0.1em] uppercase"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Lock size={14} className="lg:w-4 lg:h-4" />
                    <span>Place Order</span>
                  </motion.button>
                )}
              </div>
            </motion.form>
          </div>

          {/* Order Summary */}
          <motion.div
            className="bg-white p-4 lg:p-8 shadow-lg border border-stone-200 h-fit"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-xl lg:text-2xl font-light text-amber-900 mb-4 lg:mb-6 tracking-[0.1em]">
              Order Summary
            </h2>

            {/* Cart Items */}
            <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
              {cart.map((item) => (
                <div key={item.product + item.size + item.color} className="flex items-center space-x-3 lg:space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-16 lg:w-16 lg:h-20 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-amber-900 text-sm lg:text-base">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-600">
                      {item.color} • {item.size} • Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-medium text-amber-900">
                      Rs. {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="space-y-2 lg:space-y-3 border-t border-stone-200 pt-3 lg:pt-4">
              <div className="flex justify-between text-sm lg:text-base">
                <span className="text-stone-600">Subtotal</span>
                <span className="text-amber-900 font-medium">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm lg:text-base">
                <span className="text-stone-600">Shipping</span>
                <span className="text-amber-900 font-medium">
                  {shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString()}`}
                </span>
              </div>
              {formData.paymentMethod === 'cod' && (
                <div className="flex justify-between text-sm lg:text-base">
                  <span className="text-stone-600">COD Charges</span>
                  <span className="text-amber-900 font-medium">Rs. 100</span>
                </div>
              )}
              <div className="flex justify-between text-sm lg:text-base">
                <span className="text-stone-600">VAT (13%)</span>
                <span className="text-amber-900 font-medium">Rs. {tax.toFixed(0)}</span>
              </div>
              <div className="border-t border-stone-200 pt-2 lg:pt-3">
                <div className="flex justify-between">
                  <span className="text-base lg:text-lg font-medium text-amber-900">Total</span>
                  <span className="text-base lg:text-lg font-medium text-amber-900">
                    Rs. {(total + (formData.paymentMethod === 'cod' ? 100 : 0)).toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;