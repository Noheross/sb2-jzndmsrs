import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import NewArrivals from '../components/home/NewArrivals';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedCategories />
      <NewArrivals />
    </Layout>
  );
};

export default HomePage;