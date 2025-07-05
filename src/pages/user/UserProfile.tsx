import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Camera, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    address: '123 Mountain View Drive',
    city: 'Boulder',
    state: 'Colorado',
    zipCode: '80301',
    birthDate: '1990-01-01'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                Profile Settings
              </h1>
              <p className="text-stone-600 tracking-[0.02em]">
                Manage your personal information
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white p-6 shadow-lg border border-stone-200">
              <h2 className="text-xl font-light text-amber-900 mb-6 tracking-[0.1em]">
                Profile Picture
              </h2>
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User size={48} className="text-amber-900" />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-amber-900 text-white p-2 rounded-full hover:bg-amber-800 transition-colors">
                    <Camera size={16} />
                  </button>
                </div>
                <p className="text-sm text-stone-600 mb-4">
                  Upload a new profile picture
                </p>
                <button className="text-amber-900 hover:text-amber-700 transition-colors text-sm font-medium tracking-[0.05em] uppercase">
                  Change Photo
                </button>
              </div>
            </div>

            {/* Account Stats */}
            <div className="bg-white p-6 shadow-lg border border-stone-200 mt-6">
              <h2 className="text-xl font-light text-amber-900 mb-6 tracking-[0.1em]">
                Account Stats
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-stone-600">Member Since</span>
                  <span className="text-amber-900 font-medium">Jan 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Total Orders</span>
                  <span className="text-amber-900 font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Loyalty Points</span>
                  <span className="text-amber-900 font-medium">2,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Account Status</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white p-6 shadow-lg border border-stone-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-light text-amber-900 tracking-[0.1em]">
                  Personal Information
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-amber-900 hover:text-amber-700 transition-colors text-sm font-medium tracking-[0.05em] uppercase"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2 tracking-[0.05em]">
                      Full Name
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border-2 border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 transition-colors bg-white disabled:bg-stone-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2 tracking-[0.05em]">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border-2 border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 transition-colors bg-white disabled:bg-stone-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2 tracking-[0.05em]">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border-2 border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 transition-colors bg-white disabled:bg-stone-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2 tracking-[0.05em]">
                      Birth Date
                    </label>
                    <div className="relative">
                      <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border-2 border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 transition-colors bg-white disabled:bg-stone-50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2 tracking-[0.05em]">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 border-2 border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 transition-colors bg-white disabled:bg-stone-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2 tracking-[0.05em]">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 transition-colors bg-white disabled:bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2 tracking-[0.05em]">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 transition-colors bg-white disabled:bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2 tracking-[0.05em]">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 transition-colors bg-white disabled:bg-stone-50"
                    />
                  </div>
                </div>

                {isEditing && (
                  <motion.button
                    type="submit"
                    className="w-full bg-amber-900 text-white py-3 text-sm font-medium tracking-[0.1em] uppercase hover:bg-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Save size={18} />
                    <span>Save Changes</span>
                  </motion.button>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;