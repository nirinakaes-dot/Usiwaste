import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { reviewsApi } from "../services/listings";
import ReviewCard from "../components/ReviewCard";

export default function Reviews() {
  const { listingId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    reviewsApi.forListing(listingId).then(setReviews).catch((err) => setError(err.message));
  }, [listingId]);

  return (
    <div className="page">
      <h2>Reviews</h2>
      {error && <div className="error-banner" style={{ marginTop: 16 }}>{error}</div>}
      {!reviews && !error && <div className="loading-text">loading…</div>}
      {reviews && reviews.length === 0 && <p style={{ color: "var(--text-dim)" }}>No reviews yet.</p>}
      {reviews && reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
    </div>
  );
}
