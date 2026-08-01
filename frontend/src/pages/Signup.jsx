import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload =
        role === "user"
          ? { name: form.name, email: form.email, password: form.password, phone: form.phone }
          : { name: form.name, email: form.email, password: form.password, phone: form.phone, address: form.address };
      await signup(role, payload);
      navigate(role === "business" ? "/dashboard" : "/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="form-card">
        <h2>Join usiwaste</h2>
        <div className="sub">Rescue food, or list your own surplus.</div>

        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <button type="button" className={`pill ${role === "user" ? "active" : ""}`} onClick={() => setRole("user")}>
            I'm a customer
          </button>
          <button type="button" className={`pill ${role === "business" ? "active" : ""}`} onClick={() => setRole("business")}>
            I'm a business
          </button>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={submit}>
          <div className="field">
            <label>{role === "business" ? "Business name" : "Full name"}</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <div className="field">
            <label>Phone (optional)</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          {role === "business" && (
            <div className="field">
              <label>Pickup address</label>
              <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
          )}
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <div className="switch">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}
