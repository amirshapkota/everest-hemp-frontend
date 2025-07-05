import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="py-24 bg-gradient-to-br from-stone-50 to-amber-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20">
          <img src="/public/logo-nobg.png" alt="" className="h-32 w-32 opacity-30" />
        </div>
        <div className="absolute bottom-20 right-20">
          <img src="/public/logo-nobg.png" alt="" className="h-24 w-24 opacity-20" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="mb-8"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="/public/logo-nobg.png" 
              alt="Everest Hemp" 
              className="h-18 w-18 sm:h-20 sm:w-20 lg:h-24 lg:w-24 mx-auto opacity-80"
            />
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-light text-amber-900 mb-8 tracking-[0.15em] uppercase">
            Stay Connected
          </h2>
          <p className="text-xl text-stone-600 mb-16 max-w-3xl mx-auto tracking-[0.02em] leading-relaxed">
            Be the first to discover new collections, exclusive mountain-inspired designs, 
            and sustainable luxury events
          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-5 border-2 border-stone-300 text-amber-900 placeholder-stone-400 focus:outline-none focus:border-amber-900 text-sm tracking-[0.05em] bg-white/80 backdrop-blur-sm shadow-lg"
              required
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
            <motion.button
              type="submit"
              className="bg-amber-900 text-white px-12 py-5 text-sm font-medium tracking-[0.2em] uppercase hover:bg-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.form>

        <motion.p 
          className="text-sm text-stone-500 mt-8 tracking-[0.05em]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          By subscribing, you agree to receive marketing communications from Everest Hemp
        </motion.p>
      </div>
    </section>
  );
};

export default Newsletter;