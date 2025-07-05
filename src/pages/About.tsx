import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, Leaf, Users, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Mountain,
      title: "Mountain Heritage",
      description: "Inspired by the majesty and resilience of mountain peaks, our designs embody strength and timeless beauty."
    },
    {
      icon: Leaf,
      title: "Sustainable Luxury",
      description: "We prove that luxury and sustainability can coexist, creating beautiful pieces that respect our planet."
    },
    {
      icon: Users,
      title: "Ethical Craftsmanship",
      description: "Every piece is crafted by skilled artisans who are fairly compensated and work in safe conditions."
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "We use only the finest organic materials and time-tested techniques to ensure lasting quality."
    }
  ];

  const timeline = [
    {
      year: "2018",
      title: "The Vision",
      description: "Founded with a mission to create sustainable luxury clothing inspired by mountain landscapes."
    },
    {
      year: "2019",
      title: "First Collection",
      description: "Launched our inaugural hemp-based collection, setting new standards for sustainable fashion."
    },
    {
      year: "2021",
      title: "Carbon Neutral",
      description: "Achieved carbon neutrality through innovative production methods and reforestation projects."
    },
    {
      year: "2023",
      title: "Global Recognition",
      description: "Received international awards for sustainable fashion innovation and ethical business practices."
    },
    {
      year: "2024",
      title: "Mountain Expansion",
      description: "Opened our flagship mountain workshop, bringing production closer to our inspiration source."
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-amber-900 to-stone-900 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 to-amber-900/60" />
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/public/logo-nobg.png" 
              alt="Everest Hemp" 
              className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-36 lg:w-36 mx-auto opacity-90"
            />
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-light mb-8 tracking-[0.25em] uppercase drop-shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Our Story
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-12 font-light tracking-[0.15em] opacity-90 max-w-4xl drop-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Where mountain majesty meets sustainable luxury, creating timeless pieces that honor both craftsmanship and our planet
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-light text-amber-900 mb-8 tracking-[0.15em] uppercase">
                Our Mission
              </h2>
              <p className="text-xl text-stone-600 leading-relaxed mb-8">
                At Everest Hemp, we believe that true luxury lies not just in beauty and quality, 
                but in the responsibility we hold toward our planet and communities. We are 
                committed to creating exceptional clothing that tells a story of sustainability, 
                craftsmanship, and respect for the natural world.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                Every piece we create is a testament to our belief that fashion can be a force 
                for positive change, combining the timeless elegance of mountain-inspired design 
                with innovative sustainable practices.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                  alt="Sustainable hemp farming"
                  className="w-full h-96 lg:h-[500px] object-cover shadow-2xl"
                />
                <div className="absolute top-6 left-6">
                  <img 
                    src="/public/logo-nobg.png" 
                    alt="Everest Hemp" 
                    className="h-12 w-12 opacity-80"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-light text-amber-900 mb-6 tracking-[0.15em] uppercase">
              Our Values
            </h2>
            <p className="text-xl text-stone-600 tracking-[0.05em] max-w-3xl mx-auto">
              The principles that guide every decision we make and every piece we create
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 text-center group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <value.icon size={48} className="text-amber-900 mx-auto" />
                </motion.div>
                <h3 className="text-xl font-light text-amber-900 mb-4 tracking-[0.05em]">
                  {value.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-to-br from-amber-900 to-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-[0.15em] uppercase">
              Our Journey
            </h2>
            <p className="text-xl opacity-90 tracking-[0.05em] max-w-3xl mx-auto">
              From vision to reality: the milestones that shaped Everest Hemp
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-300 opacity-30"></div>
            
            <div className="space-y-16">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <motion.div
                      className="bg-white/10 backdrop-blur-sm p-8 border border-white/20"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-3xl font-light mb-4 tracking-[0.1em] text-amber-300">
                        {item.year}
                      </h3>
                      <h4 className="text-xl font-medium mb-3 tracking-[0.05em]">
                        {item.title}
                      </h4>
                      <p className="opacity-90 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                  
                  <div className="relative z-10">
                    <motion.div
                      className="w-6 h-6 bg-amber-300 rounded-full border-4 border-white"
                      whileHover={{ scale: 1.5 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src="/public/logo-nobg.png" 
              alt="Everest Hemp" 
              className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 mx-auto mb-8 opacity-80"
            />
            <h2 className="text-5xl md:text-6xl font-light text-amber-900 mb-8 tracking-[0.15em] uppercase">
              Join Our Journey
            </h2>
            <p className="text-xl text-stone-600 mb-12 max-w-3xl mx-auto tracking-[0.02em] leading-relaxed">
              Be part of a movement that's redefining luxury fashion through sustainability, 
              craftsmanship, and respect for our planet
            </p>
            <motion.button 
              className="bg-amber-900 text-white px-16 py-5 text-sm font-medium tracking-[0.2em] uppercase hover:bg-amber-800 transition-all duration-300 shadow-xl hover:shadow-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Collection
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;