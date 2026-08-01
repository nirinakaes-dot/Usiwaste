import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listingsApi, ordersApi, favoritesApi, reviewsApi } from "../services/listings";
import { useAuth } from "../hooks/useAuth";
import ReviewCard from "../components/ReviewCard";

export default function ListingDetails() {
  const { id } = useParams();
  const { session } = useAuth();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const load = () => {
    listingsApi.get(id).then(setListing).catch((err) => setError(err.message));
    reviewsApi.forListing(id).then(setReviews).catch(() => {});
  };

  useEffect(load, [id]);

  const reserve = async () => {
    if (!session) return navigate("/login");
    setBusy(true);
    setError("");
    try {
      await ordersApi.reserve(Number(id), session.token);
      setStatus("Reserved! Head to the pickup address before the deadline.");
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const favorite = async () => {
    if (!session) return navigate("/login");
    try {
      await favoritesApi.add(Number(id), session.token);
      setStatus("Saved to favorites.");
    } catch (err) {
      setError(err.message);
    }
  };

  if (error && !listing) return <div className="page"><div className="error-banner">{error}</div></div>;
  if (!listing) return <div className="page"><div className="loading-text">loading…</div></div>;

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;

  return (
    <div className="page">
      <div className="detail-card">
        <div className="meta-row">
          <div>
            <h2>{listing.item_name}</h2>
            <div style={{ color: "var(--text-dim)", marginTop: 4 }}>
              {listing.business?.name} · {listing.business?.address}
            </div>
          </div>
        </div>

        {listing.description && <p style={{ color: "var(--text-dim)" }}>{listing.description}</p>}

        <div className="big-price">
          KES {listing.discounted_price}
          <span className="original">KES {listing.original_price}</span>
        </div>

        <p style={{ fontSize: 13, color: "var(--text-dim)" }}>
          {listing.quantity} available · status: {listing.status}
          {avgRating && ` · ${avgRating}★ (${reviews.length} reviews)`}
        </p>

        {error && <div className="error-banner">{error}</div>}
        {status && <div className="success-banner">{status}</div>}

        {listing.status === "available" && (
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button className="btn btn-primary" disabled={busy} onClick={reserve}>
              {busy ? "Reserving…" : "Reserve for pickup"}
            </button>
            <button className="btn btn-outline" onClick={favorite}>Save to favorites</button>
          </div>
        )}
        {listing.status !== "available" && (
          <div className="error-banner" style={{ marginTop: 16 }}>
            This item is no longer available ({listing.status}).
          </div>
        )}

        <div className="section-title">Reviews</div>
        {reviews.length === 0 && <p style={{ color: "var(--text-dim)", fontSize: 14 }}>No reviews yet.</p>}
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </div>
  );
}
