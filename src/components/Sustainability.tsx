import React from 'react';
import { motion } from 'framer-motion';

const Sustainability = () => {
  const features = [
    {
      title: "100% Organic Hemp",
      description: "Sourced from regenerative farms that restore soil health and biodiversity"
    },
    {
      title: "Carbon Neutral",
      description: "Every piece offset through verified mountain reforestation projects"
    },
    {
      title: "Ethical Production",
      description: "Fair wages and safe working conditions for all mountain artisans"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-amber-900 to-stone-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-15v30l-15-15zm0 0l-15 15v-30l15 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.img
                src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                alt="Sustainable hemp farming"
                className="w-full h-96 lg:h-[600px] object-cover rounded-lg shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent rounded-lg" />
              
              {/* Logo overlay */}
              <motion.div
                className="absolute top-6 left-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <img 
                  src="/logo-nobg.png" 
                  alt="Everest Hemp" 
                  className="h-12 w-12 opacity-80"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-light mb-8 tracking-[0.15em] uppercase"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Sustainable Luxury
            </motion.h2>
            
            <motion.p 
              className="text-xl mb-12 leading-relaxed opacity-90 tracking-[0.02em]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              At Everest Hemp, we redefine luxury through sustainability. Our commitment 
              to environmental responsibility is woven into every fiber, creating pieces 
              that honor both mountain craftsmanship and our planet.
            </motion.p>
            
            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="border-l-4 border-amber-300 pl-8 group"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                >
                  <h3 className="text-2xl font-light mb-3 tracking-[0.05em] group-hover:text-amber-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="opacity-80 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.button 
              className="mt-12 border-2 border-amber-300 text-amber-300 px-12 py-4 text-sm font-medium tracking-[0.2em] uppercase hover:bg-amber-300 hover:text-amber-900 transition-all duration-300 shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;