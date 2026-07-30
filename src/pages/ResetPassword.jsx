import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { api } from "../api/client";

/**
 * Step 2 of the reset flow. The user arrives here from the emailed link,
 * which carries ?token=...&account_type=... in the URL. They set a new
 * password; we send it with the token.
 *
 * The token is single-use and expires - if it's stale the backend returns a
 * clear error, which we show.
 */
export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token") || "";
  const accountType = params.get("account_type") || "user";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs = {};
    if (password.length < 6) errs.password = "At least 6 characters";
    if (password !== confirm) errs.confirm = "Passwords do not match";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await api.resetPassword({
        token,
        new_password: password,
        account_type: accountType,
      });
      setDone(true);
      // Send them to login after a moment so they can sign in with the new one.
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Guard: someone opened /reset-password with no token in the URL.
  if (!token) {
    return (
      <AuthCard>
        <Alert>
          This reset link is missing its token. Request a new one from the
          forgot-password page.
        </Alert>
        <Link
          to="/forgot-password"
          className="block text-center text-sm text-brand-dark hover:underline"
        >
          Request a new link
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <h1 className="mb-6 text-center text-xl font-semibold text-gray-800">
        Choose a new password
      </h1>

      {done ? (
        <Alert kind="success">
          Password updated. Taking you to the login page…
        </Alert>
      ) : (
        <>
          <Alert>{error}</Alert>
          <form onSubmit={handleSubmit}>
            <FormInput
              label="New password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={fieldErrors.password}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            <FormInput
              label="Confirm new password"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              error={fieldErrors.confirm}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            <Button type="submit" loading={loading}>
              UPDATE PASSWORD
            </Button>
          </form>
        </>
      )}
    </AuthCard>
  );
}
