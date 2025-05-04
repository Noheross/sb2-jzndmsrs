import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/ui/ProductCard';
import { getProductsByCategory, getCategoryName } from '../data/products';
import { Product } from '../types';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  
  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useCallback((node: HTMLDivElement) => {
    if (isLoading || isLoadingMore) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoading, isLoadingMore, hasMore]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      if (category) {
        try {
          setIsLoading(true);
          const result = await getProductsByCategory(category, 1);
          setProducts(result.data);
          setHasMore(result.hasMore);
          setTotalProducts(result.total);
          setPage(1);
        } catch (error) {
          console.error('Error fetching products:', error);
          setProducts([]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    const loadMoreProducts = async () => {
      if (category && page > 1) {
        try {
          setIsLoadingMore(true);
          const result = await getProductsByCategory(category, page);
          setProducts(prev => [...prev, ...result.data]);
          setHasMore(result.hasMore);
        } catch (error) {
          console.error('Error loading more products:', error);
        } finally {
          setIsLoadingMore(false);
        }
      }
    };

    loadMoreProducts();
  }, [category, page]);
  
  if (!category) {
    return <div>Category not found</div>;
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{getCategoryName(category)}</h1>
          <p className="text-gray-600">
            {totalProducts} {totalProducts === 1 ? 'Product' : 'Products'}
          </p>
        </div>
        
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  ref={index === products.length - 1 ? lastProductRef : null}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            
            {isLoadingMore && (
              <div className="flex justify-center mt-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;