import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { listingsApi } from "../services/listings";

export default function Dashboard() {
  const { session } = useAuth();
  const [listings, setListings] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ item_name: "", description: "", quantity: 1, original_price: "", discounted_price: "", pickup_deadline: "" });
  const [posting, setPosting] = useState(false);

  const load = () => listingsApi.mine(session.token).then(setListings).catch((err) => setError(err.message));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setPosting(true);
    setError("");
    try {
      await listingsApi.create(
        { ...form, quantity: Number(form.quantity), original_price: Number(form.original_price), discounted_price: Number(form.discounted_price) },
        session.token
      );
      setForm({ item_name: "", description: "", quantity: 1, original_price: "", discounted_price: "", pickup_deadline: "" });
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setPosting(false);
    }
  };

  const remove = async (id) => {
    try {
      await listingsApi.remove(id, session.token);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <h2>Your listings</h2>
      {error && <div className="error-banner" style={{ marginTop: 16 }}>{error}</div>}

      <div className="form-card" style={{ maxWidth: 460, marginLeft: 0 }}>
        <h2>Post surplus food</h2>
        <form onSubmit={submit}>
          <div className="field">
            <label>Item name</label>
            <input required value={form.item_name} onChange={(e) => setForm({ ...form, item_name: e.target.value })} />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div className="field" style={{ flex: 1 }}>
              <label>Quantity</label>
              <input type="number" min={1} required value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            </div>
            <div className="field" style={{ flex: 1 }}>
              <label>Original price</label>
              <input type="number" min={0} required value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })} />
            </div>
            <div className="field" style={{ flex: 1 }}>
              <label>Discounted price</label>
              <input type="number" min={0} required value={form.discounted_price} onChange={(e) => setForm({ ...form, discounted_price: e.target.value })} />
            </div>
          </div>
          <div className="field">
            <label>Pickup deadline</label>
            <input type="datetime-local" required value={form.pickup_deadline} onChange={(e) => setForm({ ...form, pickup_deadline: e.target.value })} />
          </div>
          <button className="btn btn-primary btn-block" disabled={posting}>{posting ? "Posting…" : "Post listing"}</button>
        </form>
      </div>

      {!listings && <div className="loading-text">loading…</div>}
      <div className="detail-card" style={{ marginTop: 20 }}>
        {listings && listings.map((l) => (
          <div key={l.id} className="dash-row">
            <div className="info">
              <span className="name">{l.item_name}</span>
              <span className="sub">KES {l.discounted_price} · {l.quantity} left</span>
            </div>
            <div className="actions">
              <span className={`badge ${l.status}`}>{l.status}</span>
              <button className="btn btn-danger" onClick={() => remove(l.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
