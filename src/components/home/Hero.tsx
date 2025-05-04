import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[80vh] md:h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center brightness-75"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg')" }}
      />
      
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 md:mb-6">
              Discover Modern Fashion
            </h1>
            <p className="text-base md:text-xl text-white opacity-90 mb-6 md:mb-8">
              Explore our Spring/Summer 2025 collection and express your unique style.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link to="/category/all" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full">
                  Browse All
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;