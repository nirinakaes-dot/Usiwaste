import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import AccountTypeToggle from "../components/AccountTypeToggle";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ email, password, accountType });
      // Businesses land on their dashboard, customers on the feed.
      navigate(accountType === "business" ? "/dashboard" : "/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard>
      <h1 className="mb-6 text-center text-xl font-semibold text-gray-800">
        Log in
      </h1>

      <AccountTypeToggle value={accountType} onChange={setAccountType} />
      <Alert>{error}</Alert>

      <form onSubmit={handleSubmit}>
        {/* Figma labels this "Username", but the backend authenticates by
            email, so that's what we collect and send. */}
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
        />

        <div className="mb-4 text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-brand-dark hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" loading={loading}>
          LOGIN
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        No account?{" "}
        <Link to="/register" className="font-medium text-brand-dark hover:underline">
          Register
        </Link>
      </p>
    </AuthCard>
  );
}
