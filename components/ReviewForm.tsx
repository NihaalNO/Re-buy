
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ReviewContext } from '../contexts/ReviewContext';
import StarRating from './ui/StarRating';

interface ReviewFormProps {
    productId: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const auth = useContext(AuthContext);
    const reviewContext = useContext(ReviewContext);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth?.user || !reviewContext) return;
        
        if (rating === 0) {
            setError('Please select a star rating.');
            return;
        }
        if (!comment.trim()) {
            setError('Please enter a comment.');
            return;
        }

        reviewContext.addReview({
            productId,
            userId: auth.user.id,
            username: auth.user.username,
            rating,
            comment,
        });

        // Reset form
        setRating(0);
        setComment('');
        setError('');
    };

    return (
        <div className="bg-gray-50 p-6 rounded-lg mt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Leave a Review</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                    <StarRating rating={rating} onRatingChange={setRating} interactive={true} size="h-8 w-8" />
                </div>
                <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Your Comment</label>
                    <textarea
                        id="comment"
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green"
                        placeholder="Share your thoughts on this product..."
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-brand-green text-white font-bold py-2 px-4 rounded-full hover:bg-brand-green-light transition duration-300"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
