import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@everesthemp.com", "support@everesthemp.com"],
      description: "Get in touch for any inquiries"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Speak with our customer service team"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Mountain View Drive", "Boulder, CO 80301"],
      description: "Our flagship store and headquarters"
    },
    {
      icon: Clock,
      title: "Store Hours",
      details: ["Mon-Sat: 10AM - 8PM", "Sunday: 12PM - 6PM"],
      description: "Mountain Time (MT)"
    }
  ];

  const subjects = [
    "General Inquiry",
    "Product Information",
    "Order Support",
    "Sustainability Questions",
    "Press & Media",
    "Wholesale Opportunities",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-amber-900 to-stone-900 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop')`
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 to-amber-900/60" />
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/logo-nobg.png" 
              alt="Everest Hemp" 
              className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 mx-auto opacity-90"
            />
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-7xl font-light mb-6 tracking-[0.25em] uppercase drop-shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Contact Us
          </motion.h1>
          
          <motion.p 
            className="text-xl tracking-[0.15em] opacity-90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            We'd love to hear from you
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-light text-amber-900 mb-8 tracking-[0.1em] uppercase">
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-amber-900 mb-2 tracking-[0.05em]">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 transition-colors bg-white"
                    placeholder="Your full name"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-amber-900 mb-2 tracking-[0.05em]">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 transition-colors bg-white"
                    placeholder="your@email.com"
                  />
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-amber-900 mb-2 tracking-[0.05em]">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-stone-300 text-amber-900 focus:outline-none focus:border-amber-900 transition-colors bg-white"
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-amber-900 mb-2 tracking-[0.05em]">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 transition-colors bg-white resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </motion.div>
              
              <motion.button
                type="submit"
                className="w-full bg-amber-900 text-white py-4 text-sm font-medium tracking-[0.1em] uppercase hover:bg-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={18} />
                <span>Send Message</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl font-light text-amber-900 mb-8 tracking-[0.1em] uppercase">
              Get in Touch
            </h2>
            
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-200"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start space-x-4">
                    <motion.div
                      className="p-3 bg-amber-900 text-white rounded-full"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <info.icon size={24} />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-light text-amber-900 mb-2 tracking-[0.05em]">
                        {info.title}
                      </h3>
                      <div className="space-y-1 mb-3">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-stone-600 font-medium">
                            {detail}
                          </p>
                        ))}
                      </div>
                      <p className="text-sm text-stone-500">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map placeholder */}
            <motion.div
              className="mt-12 bg-white p-6 shadow-lg border border-stone-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl font-light text-amber-900 mb-4 tracking-[0.05em]">
                Find Our Store
              </h3>
              <div className="bg-stone-100 h-64 flex items-center justify-center border border-stone-200">
                <div className="text-center">
                  <MapPin size={48} className="text-amber-900 mx-auto mb-4" />
                  <p className="text-stone-600">Interactive map coming soon</p>
                  <p className="text-sm text-stone-500 mt-2">
                    123 Mountain View Drive, Boulder, CO 80301
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;