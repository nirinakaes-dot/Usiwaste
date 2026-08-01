import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { ordersApi, reviewsApi } from "../services/listings";

export default function Orders() {
  const { session } = useAuth();
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");
  const [reviewDraft, setReviewDraft] = useState({});

  const load = () => ordersApi.mine(session.token).then(setOrders).catch((err) => setError(err.message));
  useEffect(() => { load(); }, []);

  const cancel = async (orderId) => {
    try {
      await ordersApi.update(orderId, { status: "cancelled" }, session.token);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const submitReview = async (orderId) => {
    const draft = reviewDraft[orderId] || { rating: 5, comment: "" };
    try {
      await reviewsApi.create({ order_id: orderId, rating: Number(draft.rating), comment: draft.comment }, session.token);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <h2>Your orders</h2>
      {error && <div className="error-banner" style={{ marginTop: 16 }}>{error}</div>}
      {!orders && <div className="loading-text">loading…</div>}
      {orders && orders.length === 0 && (
        <div className="empty-state">
          <h3>No reservations yet</h3>
          <p>Browse the feed and grab something before it's gone.</p>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        {orders && orders.map((o) => (
          <div key={o.id} className="detail-card" style={{ marginTop: 12 }}>
            <div className="dash-row" style={{ borderBottom: "none", padding: 0 }}>
              <div className="info">
                <span className="name">{o.listing.item_name}</span>
                <span className="sub">{o.listing.business?.name} · KES {o.listing.discounted_price}</span>
              </div>
              <span className={`badge ${o.status}`}>{o.status}</span>
            </div>

            {o.status === "reserved" && (
              <div style={{ marginTop: 12 }}>
                <button className="btn btn-danger" onClick={() => cancel(o.id)}>Cancel reservation</button>
              </div>
            )}

            {o.status === "picked_up" && (
              <div style={{ marginTop: 14 }}>
                <div className="section-title" style={{ margin: "0 0 8px" }}>Leave a review</div>
                <select
                  value={reviewDraft[o.id]?.rating || 5}
                  onChange={(e) => setReviewDraft({ ...reviewDraft, [o.id]: { ...reviewDraft[o.id], rating: e.target.value } })}
                  style={{ background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: 8, padding: 8, marginBottom: 8, color: "var(--text)" }}
                >
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} star{n > 1 ? "s" : ""}</option>)}
                </select>
                <div className="field">
                  <textarea
                    rows={2}
                    placeholder="How was it?"
                    value={reviewDraft[o.id]?.comment || ""}
                    onChange={(e) => setReviewDraft({ ...reviewDraft, [o.id]: { ...reviewDraft[o.id], comment: e.target.value } })}
                  />
                </div>
                <button className="btn btn-outline" onClick={() => submitReview(o.id)}>Submit review</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
