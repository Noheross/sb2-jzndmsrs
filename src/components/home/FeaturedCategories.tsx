import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'shoes',
    name: 'Shoes',
    image: 'images/shoes.jpeg',
    path: '/category/shoes'
  },
  {
    id: 'tshirt',
    name: 'T-Shirts',
    image: 'images/tshirt.jpeg',
    path: '/category/t_shirt'
  },
  {
    id: 'pants',
    name: 'Pants & Shorts',
    image: 'images/pants.jpeg',
    path: '/category/pants'
  },
  {
    id: 'hoodies',
    name: 'Hoodies & Sweaters',
    image: 'images/hoodies.jpeg',
    path: '/category/hoodies'
  },
  {
    id: 'jackets',
    name: 'Jackets',
    image: '/images/jackets.jpeg',
    path: '/category/jackets'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: '/images/accessories.jpeg',
    path: '/category/accessories'
  },
  {
    id: 'others',
    name: 'Others',
    image: '/images/others.jpeg',
    path: '/category/others'
  }
];

const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center">Featured Categories</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {categories.map(category => (
            <Link 
              key={category.id} 
              to={category.path} 
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-h-1 aspect-w-1 w-full h-32 sm:h-40 md:h-64 overflow-hidden">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-sm sm:text-lg md:text-xl font-bold bg-black bg-opacity-50 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-sm transform transition-transform duration-300 group-hover:scale-110">
                    {category.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;