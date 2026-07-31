import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import { resetPassword } from "../services/auth";

// Step 2: user arrives from the emailed link carrying ?token=&account_type=.
// They set a new password; the token is single-use.
export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token") || "";
  const accountType = params.get("account_type") || "user";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (password !== confirm) return toast.error("Passwords do not match");

    setLoading(true);
    try {
      await resetPassword({
        token,
        new_password: password,
        account_type: accountType,
      });
      toast.success("Password updated, please log in");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Reset link is invalid or expired");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <p className="text-gray-600">This reset link is missing its token.</p>
        <Link
          to="/forgot-password"
          className="mt-4 font-semibold text-green-700 hover:underline"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Choose a new password
        </h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex items-center gap-2 rounded-2xl border border-gray-200 px-4 focus-within:border-green-500">
            <Lock className="h-5 w-5 text-gray-400" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full bg-transparent py-3 outline-none"
            />
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-gray-200 px-4 focus-within:border-green-500">
            <Lock className="h-5 w-5 text-gray-400" />
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm new password"
              className="w-full bg-transparent py-3 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-green-600 px-5 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95 disabled:opacity-60"
          >
            {loading ? "Updating…" : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}
