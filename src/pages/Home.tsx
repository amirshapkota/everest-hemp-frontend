import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import CategoryShowcase from '../components/CategoryShowcase';
import Sustainability from '../components/Sustainability';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CategoryShowcase />
      <Sustainability />
      <Newsletter />
    </>
  );
};

export default Home;