
import React, { useContext } from 'react';
import { ReviewContext } from '../contexts/ReviewContext';
import StarRating from './ui/StarRating';

interface ReviewListProps {
    productId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ productId }) => {
    const reviewContext = useContext(ReviewContext);
    const reviews = reviewContext?.getReviewsByProductId(productId) || [];

    if (reviews.length === 0) {
        return <p className="text-gray-600 mt-4">No reviews yet. Be the first to leave one!</p>;
    }

    return (
        <div className="space-y-6 mt-6">
            {reviews.map(review => (
                <div key={review.id} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-brand-green">{review.username}</span>
                            <span className="text-gray-400 text-sm">-</span>
                            <span className="text-gray-500 text-sm">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                        <StarRating rating={review.rating} />
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
