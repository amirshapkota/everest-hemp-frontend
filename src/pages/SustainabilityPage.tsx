import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Recycle, Heart, Globe, Award, Users } from 'lucide-react';

const SustainabilityPage = () => {
  const initiatives = [
    {
      icon: Leaf,
      title: "100% Organic Materials",
      description: "All our hemp is grown without pesticides or synthetic fertilizers, supporting soil health and biodiversity.",
      impact: "50,000 acres of regenerative farmland supported"
    },
    {
      icon: Recycle,
      title: "Circular Production",
      description: "Zero-waste manufacturing process where every fiber is utilized and all byproducts are repurposed.",
      impact: "95% waste reduction in our production facilities"
    },
    {
      icon: Globe,
      title: "Carbon Negative",
      description: "We remove more carbon from the atmosphere than we produce through reforestation and soil sequestration.",
      impact: "10,000 tons of CO2 removed annually"
    },
    {
      icon: Users,
      title: "Fair Trade Certified",
      description: "Every artisan in our supply chain receives fair wages and works in safe, dignified conditions.",
      impact: "500+ artisan families supported globally"
    },
    {
      icon: Heart,
      title: "Community Investment",
      description: "10% of profits go directly to mountain communities for education and sustainable development.",
      impact: "$2M invested in community programs"
    },
    {
      icon: Award,
      title: "Certified B-Corp",
      description: "Legally committed to balancing profit with purpose, meeting the highest standards of social and environmental performance.",
      impact: "Top 5% of B-Corp sustainability scores"
    }
  ];

  const certifications = [
    { name: "GOTS Certified", description: "Global Organic Textile Standard" },
    { name: "Fair Trade", description: "Ethical labor practices" },
    { name: "B-Corp", description: "Benefit Corporation certification" },
    { name: "Carbon Neutral", description: "Net-zero carbon emissions" },
    { name: "Cradle to Cradle", description: "Circular design principles" },
    { name: "OEKO-TEX", description: "Textile safety standards" }
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
              src="/logo-nobg.png" 
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
            Sustainability
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-12 font-light tracking-[0.15em] opacity-90 max-w-4xl drop-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Our commitment to the planet runs as deep as mountain roots
          </motion.p>
        </div>
      </section>

      {/* Impact Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-light text-amber-900 mb-6 tracking-[0.15em] uppercase">
              Our Impact
            </h2>
            <p className="text-xl text-stone-600 tracking-[0.05em] max-w-3xl mx-auto">
              Measurable change through sustainable luxury fashion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={index}
                className="bg-stone-50 p-8 hover:bg-white hover:shadow-2xl transition-all duration-500 group border border-stone-200"
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
                  <initiative.icon size={48} className="text-amber-900" />
                </motion.div>
                
                <h3 className="text-xl font-light text-amber-900 mb-4 tracking-[0.05em]">
                  {initiative.title}
                </h3>
                
                <p className="text-stone-600 leading-relaxed mb-6">
                  {initiative.description}
                </p>
                
                <div className="border-t border-amber-200 pt-4">
                  <p className="text-sm font-medium text-amber-900 tracking-[0.05em]">
                    {initiative.impact}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-stone-100 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-light text-amber-900 mb-8 tracking-[0.15em] uppercase">
                Our Process
              </h2>
              
              <div className="space-y-8">
                <div className="border-l-4 border-amber-900 pl-8">
                  <h3 className="text-2xl font-light text-amber-900 mb-3 tracking-[0.05em]">
                    Regenerative Farming
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    Our hemp is grown using regenerative agriculture practices that restore soil health, 
                    increase biodiversity, and sequester carbon from the atmosphere.
                  </p>
                </div>
                
                <div className="border-l-4 border-amber-900 pl-8">
                  <h3 className="text-2xl font-light text-amber-900 mb-3 tracking-[0.05em]">
                    Clean Manufacturing
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    Our production facilities run on 100% renewable energy and use closed-loop 
                    water systems to minimize environmental impact.
                  </p>
                </div>
                
                <div className="border-l-4 border-amber-900 pl-8">
                  <h3 className="text-2xl font-light text-amber-900 mb-3 tracking-[0.05em]">
                    Ethical Craftsmanship
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    Every piece is handcrafted by skilled artisans who are paid fair wages and 
                    work in safe, dignified conditions.
                  </p>
                </div>
              </div>
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
                  className="w-full h-96 lg:h-[600px] object-cover shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent" />
                <div className="absolute top-6 left-6">
                  <img 
                    src="/logo-nobg.png" 
                    alt="Everest Hemp" 
                    className="h-12 w-12 opacity-80"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-light text-amber-900 mb-6 tracking-[0.15em] uppercase">
              Certifications
            </h2>
            <p className="text-xl text-stone-600 tracking-[0.05em] max-w-3xl mx-auto">
              Third-party verified standards that hold us accountable
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="bg-stone-50 p-8 text-center hover:bg-amber-50 hover:shadow-lg transition-all duration-300 border border-stone-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-light text-amber-900 mb-3 tracking-[0.05em]">
                  {cert.name}
                </h3>
                <p className="text-stone-600">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-amber-900 to-stone-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src="/logo-nobg.png" 
              alt="Everest Hemp" 
              className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 mx-auto mb-8 opacity-90"
            />
            <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-[0.15em] uppercase">
              Join the Movement
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto tracking-[0.02em] leading-relaxed opacity-90">
              Every purchase supports regenerative agriculture, fair labor practices, 
              and carbon sequestration. Together, we're proving that luxury and sustainability 
              can create a better future.
            </p>
            <motion.button 
              className="border-2 border-amber-300 text-amber-300 px-16 py-5 text-sm font-medium tracking-[0.2em] uppercase hover:bg-amber-300 hover:text-amber-900 transition-all duration-300 shadow-xl hover:shadow-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Shop Sustainably
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SustainabilityPage;