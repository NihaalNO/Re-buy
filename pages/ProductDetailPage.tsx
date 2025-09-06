
import React, { useContext, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';
import { AuthContext } from '../contexts/AuthContext';
import { ReviewContext } from '../contexts/ReviewContext';
import { PlusIcon } from '../components/ui/Icons';
import StarRating from '../components/ui/StarRating';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productContext = useContext(ProductContext);
  const cart = useContext(CartContext);
  const auth = useContext(AuthContext);
  const reviewContext = useContext(ReviewContext);

  const product = productContext?.products.find(p => p.id === id);
  const productReviews = useMemo(() => {
    if (!id || !reviewContext) return [];
    return reviewContext.getReviewsByProductId(id);
  }, [id, reviewContext]);

  const averageRating = useMemo(() => {
    if (productReviews.length === 0) return 0;
    const total = productReviews.reduce((sum, review) => sum + review.rating, 0);
    return total / productReviews.length;
  }, [productReviews]);
  
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
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
            <img src={product.imageUrl} alt={product.title} className="w-full h-auto object-cover rounded-lg shadow-md" />
            </div>
            <div className="md:w-1/2">
            <span className="text-sm text-gray-500 bg-brand-gray px-3 py-1 rounded-full">{product.category}</span>
            <h1 className="text-4xl font-bold text-gray-800 mt-4 mb-2">{product.title}</h1>
            
            <div className="flex items-center gap-2 mb-4">
                {productReviews.length > 0 ? (
                    <>
                        <StarRating rating={averageRating} />
                        <span className="text-gray-600">({productReviews.length} {productReviews.length === 1 ? 'review' : 'reviews'})</span>
                    </>
                ) : (
                     <span className="text-gray-500">No reviews yet</span>
                )}
            </div>

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

      <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
          {auth?.user ? (
            <ReviewForm productId={product.id} />
          ) : (
            <p className="text-center bg-gray-100 p-4 rounded-md">
                <Link to="/login" className="font-semibold text-brand-green hover:underline">Log in</Link> to leave a review.
            </p>
          )}
          <div className="border-t my-6"></div>
          <ReviewList productId={product.id} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
