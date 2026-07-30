import { useState } from "react";
import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import AccountTypeToggle from "../components/AccountTypeToggle";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { api } from "../api/client";

/**
 * Step 1 of the reset flow (spec 3.01). The user enters their email; the
 * backend emails them a reset link.
 *
 * The backend always returns 200 here, even for an unknown email, so an
 * attacker can't use this to discover which addresses have accounts. We show
 * the same confirmation regardless.
 *
 * In DEBUG mode the backend also returns a dev_only_reset_link, which we
 * surface below so you can test the whole flow without a mail server.
 */
export default function ForgotPassword() {
  const [accountType, setAccountType] = useState("user");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [devLink, setDevLink] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.forgotPassword({ email, account_type: accountType });
      setSent(true);
      if (data.dev_only_reset_link) setDevLink(data.dev_only_reset_link);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard>
      <h1 className="mb-2 text-center text-xl font-semibold text-gray-800">
        Reset your password
      </h1>
      <p className="mb-6 text-center text-sm text-gray-600">
        Enter your email and we'll send you a reset link.
      </p>

      {sent ? (
        <>
          <Alert kind="success">
            If that account exists, a reset link has been sent to {email}.
          </Alert>
          {devLink && (
            <div className="mb-4 rounded-md border border-yellow-200 bg-yellow-50 p-3 text-xs text-yellow-900">
              <strong>Dev only:</strong> no mail server yet, so here's the link:
              <br />
              <Link
                to={devLink.replace(/^https?:\/\/[^/]+/, "")}
                className="break-all font-medium text-brand-dark underline"
              >
                {devLink}
              </Link>
            </div>
          )}
          <Link
            to="/login"
            className="block text-center text-sm text-brand-dark hover:underline"
          >
            Back to login
          </Link>
        </>
      ) : (
        <>
          <AccountTypeToggle value={accountType} onChange={setAccountType} />
          <Alert>{error}</Alert>
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
            <Button type="submit" loading={loading}>
              SEND RESET LINK
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Remembered it?{" "}
            <Link to="/login" className="font-medium text-brand-dark hover:underline">
              Log in
            </Link>
          </p>
        </>
      )}
    </AuthCard>
  );
}
