import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, price, main_image, qc_image_group_map } = product;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);

  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith('product_image')) {
      return `https://d1mxsdfi62lbg7.cloudfront.net/${imageUrl}`;
    }
    return imageUrl;
  };

  const images = qc_image_group_map?.images 
    ? qc_image_group_map.images.map(getImageUrl)
    : [getImageUrl(main_image)];

  return (
    <Link to={`/product/${id}`} className="group block">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={images[0]}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        </div>
        <div className="text-sm font-medium">
          <span className="text-gray-900">{formattedPrice}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;