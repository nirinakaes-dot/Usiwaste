import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";
import { forgotPassword } from "../services/auth";

// Step 1 of the reset flow: enter email, backend emails a reset link.
// The backend always responds 200 (even for unknown emails) so this can't be
// used to discover who has an account. In dev it returns the link directly.
export default function ForgotPassword() {
  const [accountType, setAccountType] = useState("user");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [devLink, setDevLink] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await forgotPassword({ email, account_type: accountType });
      setSent(true);
      if (data.dev_only_reset_link) setDevLink(data.dev_only_reset_link);
    } catch {
      toast.error("Something went wrong, try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Reset your password
        </h1>

        {sent ? (
          <div className="mt-6 space-y-4 text-center">
            <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-800">
              If that account exists, a reset link has been sent to {email}.
            </p>
            {devLink && (
              <p className="break-all rounded-2xl bg-yellow-50 px-4 py-3 text-xs text-yellow-900">
                <strong>Dev only:</strong>{" "}
                <Link
                  to={devLink.replace(/^https?:\/\/[^/]+/, "")}
                  className="font-medium text-green-700 underline"
                >
                  {devLink}
                </Link>
              </p>
            )}
            <Link to="/login" className="text-sm font-medium text-green-700 hover:underline">
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="my-2 flex rounded-2xl bg-slate-100 p-1">
              {[
                { key: "user", label: "Customer" },
                { key: "business", label: "Business" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setAccountType(opt.key)}
                  className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    accountType === opt.key
                      ? "bg-green-600 text-white shadow"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-gray-200 px-4 focus-within:border-green-500">
              <Mail className="h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent py-3 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-green-600 px-5 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95 disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send reset link"}
            </button>
            <p className="text-center text-sm text-gray-600">
              Remembered it?{" "}
              <Link to="/login" className="font-semibold text-green-700 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
