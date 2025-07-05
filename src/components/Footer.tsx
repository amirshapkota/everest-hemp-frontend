import React from 'react';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "Women", path: "/women" },
        { name: "Men", path: "/men" },
      ]
    },
    {
      title: "Support", 
      links: [
        { name: "Contact Us", path: "/contact" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Sustainability", path: "/sustainability" },
      ]
    }
  ];

  const socialIcons = [
    { Icon: Instagram, href: "#" },
    { Icon: Facebook, href: "#" },
    { Icon: Twitter, href: "#" },
    { Icon: Youtube, href: "#" }
  ];

  return (
    <footer className="bg-gradient-to-br from-amber-900 to-stone-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20l10-10v20l-10-10zm0 0l-10 10v-20l10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 lg:space-x-3 mb-6">
              <motion.img 
                src="/logo-nobg.png" 
                alt="Everest Hemp" 
                className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              />
              <h3 className="text-xl lg:text-2xl font-bold tracking-[0.1em] text-amber-300">
                EVEREST HEMP
              </h3>
            </div>
            <p className="text-white/80 mb-6 lg:mb-8 text-sm leading-relaxed tracking-[0.02em]">
              Sustainable luxury clothing inspired by the majesty of mountain peaks. 
              Where heritage craftsmanship meets modern sustainability.
            </p>
            <div className="flex space-x-3 lg:space-x-4">
              {socialIcons.map(({ Icon, href }, index) => (
                <motion.a 
                  key={index}
                  href={href} 
                  className="text-white/60 hover:text-amber-300 transition-colors p-1.5 lg:p-2 hover:bg-white/10 rounded-full"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon size={16} className="lg:w-[18px] lg:h-[18px]" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-medium mb-6 lg:mb-8 tracking-[0.15em] uppercase text-amber-300">
                {section.title}
              </h3>
              <ul className="space-y-3 lg:space-y-4">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      to={link.path}
                      className="text-white/70 hover:text-amber-300 transition-colors text-sm tracking-[0.02em] block"
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="block"
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="border-t border-white/20 mt-12 lg:mt-16 pt-8 lg:pt-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-white/60 text-sm tracking-[0.05em]">
            © 2024 Everest Hemp. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((item, index) => (
              <motion.a 
                key={item}
                href="#" 
                className="text-white/60 hover:text-amber-300 transition-colors text-sm tracking-[0.02em]"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;