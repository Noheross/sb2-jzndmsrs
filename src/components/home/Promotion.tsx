import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Promotion: React.FC = () => {
  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative rounded-lg overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg')",
              filter: "brightness(0.7)"
            }}
          />
          
          <div className="relative py-16 px-6 md:px-12 lg:px-16">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold text-white mb-4">Spring Collection</h2>
              <p className="text-white text-lg mb-8">
                Discover our latest spring collection featuring fresh styles and vibrant designs.
              </p>
              <Link to="/category/new">
                <Button variant="primary" size="lg" className="bg-white text-black hover:bg-gray-100">
                  Explore Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotion;