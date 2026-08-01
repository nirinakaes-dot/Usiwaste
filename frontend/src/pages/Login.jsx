import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password, role);
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
        <h2>Welcome back</h2>
        <div className="sub">Log in to reserve food or manage your listings.</div>

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
            <label>Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>

        <div className="switch">
          No account yet? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
