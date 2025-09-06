
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative">
          <img src={product.imageUrl} alt={product.title} className="w-full h-56 object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <p className="text-xl font-bold text-brand-green">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
