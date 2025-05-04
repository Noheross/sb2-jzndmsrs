import React, { useEffect, useState } from 'react';
import ProductGrid from '../ui/ProductGrid';
import { getNewProducts } from '../../data/products';
import type { Product } from '../../types';

const NewArrivals: React.FC = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const products = await getNewProducts();
        setNewProducts(products);
      } catch (error) {
        console.error('Error fetching new products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, []);
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">New Arrivals</h2>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <ProductGrid products={newProducts} />
        )}
      </div>
    </section>
  );
};

export default NewArrivals;