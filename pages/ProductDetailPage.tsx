import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';
import { PlusIcon } from '../components/ui/Icons';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productContext = useContext(ProductContext);
  const product = productContext?.products.find(p => p.id === id);
  const cart = useContext(CartContext);

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-8 text-center">
        <h2 className="text-3xl font-bold">Product not found</h2>
        <Link to="/" className="text-brand-green hover:underline mt-4 inline-block">Back to Home</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    cart?.addToCart(product);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2">
          <img src={product.imageUrl} alt={product.title} className="w-full h-auto object-cover rounded-lg shadow-md" />
        </div>
        <div className="md:w-1/2">
          <span className="text-sm text-gray-500 bg-brand-gray px-3 py-1 rounded-full">{product.category}</span>
          <h1 className="text-4xl font-bold text-gray-800 mt-4 mb-2">{product.title}</h1>
          <p className="text-sm text-gray-600 mb-6">Sold by <span className="font-semibold text-brand-green">{product.sellerName}</span></p>
          <p className="text-gray-700 text-lg mb-6">{product.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-extrabold text-brand-green">${product.price.toFixed(2)}</p>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-brand-green text-white font-bold py-3 px-6 rounded-full hover:bg-brand-green-light transition duration-300 transform hover:scale-105"
            >
              <PlusIcon className="h-5 w-5"/>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
