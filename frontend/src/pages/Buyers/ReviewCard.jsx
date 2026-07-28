import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function Review({ bookingId, existingReview, onSubmitReview }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // If a review has already been submitted, display it
  if (existingReview) {
    return (
      <div className="bg-gray-50 p-4 rounded-2xl mt-2">
        <p className="text-xs font-semibold text-gray-500 mb-1">Your Review:</p>
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < existingReview.rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-700 italic">"{existingReview.comment}"</p>
      </div>
    );
  }

  // Otherwise, render the form to submit a review
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    onSubmitReview(bookingId, {
      rating,
      comment,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-2xl mt-2 space-y-3">
      <p className="text-xs font-semibold text-gray-700">
        Leave a review for this meal/service:
      </p>

      {/* Star Rating Selection */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none"
          >
            <Star
              className={`h-5 w-5 ${
                star <= rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Textarea for Comments */}
      <textarea
        rows={2}
        placeholder="How was the meal/service?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full text-sm p-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-green-700 hover:bg-green-900 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer"
      >
        Submit Review
      </button>
    </form>
  );
}
