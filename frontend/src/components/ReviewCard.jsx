export default function ReviewCard({ review }) {
  return (
    <div className="review-item">
      <div className="stars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
      {review.comment && <div style={{ fontSize: 14 }}>{review.comment}</div>}
    </div>
  );
}
