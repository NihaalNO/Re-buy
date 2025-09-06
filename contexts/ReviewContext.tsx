
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Review } from '../types';

interface ReviewContextType {
  reviews: Review[];
  addReview: (reviewData: Omit<Review, 'id' | 'date'>) => void;
  getReviewsByProductId: (productId: string) => Review[];
}

export const ReviewContext = createContext<ReviewContextType | null>(null);

const REVIEW_STORAGE_KEY = 'eco-reviews';

export const ReviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const storedReviews = localStorage.getItem(REVIEW_STORAGE_KEY);
      if (storedReviews) {
        return JSON.parse(storedReviews);
      }
    } catch (error) {
      console.error("Failed to parse reviews from localStorage", error);
      localStorage.removeItem(REVIEW_STORAGE_KEY);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(reviews));
  }, [reviews]);


  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `review-${Date.now()}`,
      date: new Date().toISOString(),
    };
    setReviews(prevReviews => [newReview, ...prevReviews]);
  };
  
  const getReviewsByProductId = (productId: string): Review[] => {
      return reviews.filter(review => review.productId === productId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  return (
    <ReviewContext.Provider value={{ reviews, addReview, getReviewsByProductId }}>
      {children}
    </ReviewContext.Provider>
  );
};
