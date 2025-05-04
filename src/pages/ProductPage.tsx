import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import BuyLinks from '../components/ui/BuyLinks';
import SkuSelector from '../components/ui/SkuSelector';
import { getProductById } from '../data/products';
import { Product, QCImage } from '../types';

interface AttrValue {
  attrId: number;
  attrValue: string;
  img?: string;
  isShowHotTag: boolean;
}

interface AttrOption {
  attrTitle: string;
  attrValues: AttrValue[];
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [showBuyLinks, setShowBuyLinks] = useState(false);
  const [skuOptions, setSkuOptions] = useState<AttrOption[]>([]);
  const [selectedSkuValues, setSelectedSkuValues] = useState<Record<string, AttrValue>>({});
  const [loadingSku, setLoadingSku] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isTouching, setIsTouching] = useState(false);
  const mainImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          setLoading(true);
          const productData = await getProductById(id);
          setProduct(productData);
          if (productData) {
            setSelectedImage(getImageUrl(productData.main_image));
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchSkuInfo = async () => {
      if (product?.channel_item_no) {
        try {
          setLoadingSku(true);
          const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-sku-info?itemId=${product.channel_item_no}`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              },
            }
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch SKU info');
          }
          
          const data = await response.json();
          
          if (data?.result?.attrList) {
            setSkuOptions(data.result.attrList);
          }
        } catch (error) {
          console.error('Error fetching SKU info:', error);
        } finally {
          setLoadingSku(false);
        }
      }
    };

    fetchSkuInfo();
  }, [product]);

  const handleSkuChange = (attrTitle: string, value: AttrValue) => {
    setSelectedSkuValues(prev => ({
      ...prev,
      [attrTitle]: value
    }));
    
    if (value.img) {
      setSelectedImage(value.img);
    }
  };

  const handleSkuImageClick = (img: string) => {
    setSelectedImage(img);
    setShowImagePreview(true);
  };

  const getImageUrl = (imageUrl: string) => {
    if (imageUrl?.startsWith('product_image')) {
      return `https://d1mxsdfi62lbg7.cloudfront.net/${imageUrl}`;
    }
    return imageUrl;
  };

  const getQCImages = (product: Product): QCImage[] => {
    if (!product.qc_image_group_map) return [];
    
    const groupCode = Object.keys(product.qc_image_group_map)[0];
    return product.qc_image_group_map[groupCode] || [];
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching) return;
    e.preventDefault();
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchEnd = () => {
    if (!product || !isTouching) return;
    
    const touchDiffX = touchStart.x - touchEnd.x;
    const touchDiffY = touchStart.y - touchEnd.y;
    const minSwipeDistance = 50;
    
    if (Math.abs(touchDiffX) < minSwipeDistance || Math.abs(touchDiffY) > Math.abs(touchDiffX)) {
      setIsTouching(false);
      return;
    }

    const images = [getImageUrl(product.main_image), ...getQCImages(product).map(img => `https://d1mxsdfi62lbg7.cloudfront.net/${img.webpUrl}`)];
    const currentIndex = images.indexOf(selectedImage);
    
    if (touchDiffX > 0) {
      // Swipe left - next image
      const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      setSelectedImage(images[nextIndex]);
    } else {
      // Swipe right - previous image
      const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      setSelectedImage(images[prevIndex]);
    }
    
    setIsTouching(false);
  };

  const handleImageNavigation = (e: React.MouseEvent, direction: 'prev' | 'next') => {
    e.stopPropagation();
    if (!product) return;

    const images = [getImageUrl(product.main_image), ...getQCImages(product).map(img => `https://d1mxsdfi62lbg7.cloudfront.net/${img.webpUrl}`)];
    const currentIndex = images.indexOf(selectedImage);

    if (direction === 'next') {
      const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      setSelectedImage(images[nextIndex]);
    } else {
      const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      setSelectedImage(images[prevIndex]);
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <p>Product not found</p>
        </div>
      </Layout>
    );
  }
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(Number(product.price));

  const qcImages = getQCImages(product);
  const images = [getImageUrl(product.main_image), ...qcImages.map(img => `https://d1mxsdfi62lbg7.cloudfront.net/${img.webpUrl}`)];
  const currentImageIndex = images.indexOf(selectedImage);
  const showNavigation = images.length > 1;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 md:py-12 pb-24 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Product Images */}
          <div>
            <div 
              ref={mainImageRef}
              className="relative w-full h-[350px] md:h-[500px] mb-4 bg-gray-200 rounded-lg overflow-hidden touch-pan-x touch-none group"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={selectedImage}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
                onClick={() => setShowImagePreview(true)}
                draggable={false}
              />

              {/* Navigation Buttons */}
              {showNavigation && (
                <>
                  {/* Mobile Navigation */}
                  <button
                    onClick={(e) => handleImageNavigation(e, 'prev')}
                    className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => handleImageNavigation(e, 'next')}
                    className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Desktop Navigation */}
                  <div className="hidden md:block">
                    <button
                      onClick={(e) => handleImageNavigation(e, 'prev')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => handleImageNavigation(e, 'next')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </>
              )}

              {/* Image Counter - Mobile Only */}
              {showNavigation && (
                <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>
            
            {/* Thumbnail Images - Hidden on Mobile */}
            <div className="hidden md:grid grid-cols-6 gap-2">
              <div 
                className={`aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer ${
                  selectedImage === getImageUrl(product.main_image) ? 'ring-2 ring-black' : ''
                }`}
                onClick={() => setSelectedImage(getImageUrl(product.main_image))}
              >
                <img
                  src={getImageUrl(product.main_image)}
                  alt={product.title}
                  className="h-full w-full object-cover object-center hover:opacity-75 transition-opacity"
                />
              </div>
              
              {qcImages.map((image, index) => (
                <div 
                  key={image.id}
                  className={`aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer ${
                    selectedImage === `https://d1mxsdfi62lbg7.cloudfront.net/${image.webpUrl}` ? 'ring-2 ring-black' : ''
                  }`}
                  onClick={() => setSelectedImage(`https://d1mxsdfi62lbg7.cloudfront.net/${image.webpUrl}`)}
                >
                  <img
                    src={`https://d1mxsdfi62lbg7.cloudfront.net/${image.webpUrl}`}
                    alt={`${product.title} ${index + 1}`}
                    className="h-full w-full object-cover object-center hover:opacity-75 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Information */}
          <div className="flex flex-col h-[calc(100vh-200px)]">
            <div className="flex-none">
              <h1 className="text-xl md:text-3xl font-bold mb-2">{product.title}</h1>
              
              {/* Price */}
              <div className="mb-6">
                <span className="text-xl md:text-2xl font-bold">{formattedPrice}</span>
              </div>
            </div>

            {/* Scrollable SKU Selection */}
            <div className="flex-grow overflow-y-auto mb-6">
              {loadingSku ? (
                <div className="mb-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-20 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : skuOptions.length > 0 ? (
                <div className="pr-4">
                  <SkuSelector
                    options={skuOptions}
                    selectedValues={selectedSkuValues}
                    onChange={handleSkuChange}
                    onImageClick={handleSkuImageClick}
                  />
                </div>
              ) : null}
            </div>
            
            {/* Fixed Buy Button - Only visible on desktop */}
            <div className="flex-none hidden md:block">
              {product.channel_item_no && (
                <div className="mb-6">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => setShowBuyLinks(true)}
                  >
                    Buy Link
                  </Button>
                </div>
              )}
              
              {/* Additional Information */}
              <div className="pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold">Shipping</h4>
                    <p className="text-sm text-gray-600">Ships within 2-3 business days</p>
                    <p className="text-sm text-gray-600">30-day return window</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Buy Button on Mobile */}
      {product.channel_item_no && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:hidden">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => setShowBuyLinks(true)}
          >
            Buy Link
          </Button>
        </div>
      )}
      
      {/* Buy Links Modal */}
      <BuyLinks
        itemNo={product.channel_item_no || ''}
        isOpen={showBuyLinks}
        onClose={() => setShowBuyLinks(false)}
      />

      {/* Full Screen Image Preview */}
      {showImagePreview && (
        <div 
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setShowImagePreview(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white z-10"
            onClick={() => setShowImagePreview(false)}
          >
            <X size={24} />
          </button>
          <img
            src={selectedImage}
            alt={product.title}
            className="max-h-screen max-w-full object-contain"
          />
        </div>
      )}
    </Layout>
  );
};

export default ProductPage;