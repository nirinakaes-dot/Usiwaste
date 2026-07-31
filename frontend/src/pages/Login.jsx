import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // The backend keeps customers and businesses in separate tables, so every
  // login has to say which one. This toggle drives that.
  const [accountType, setAccountType] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password, accountType });
      toast.success("Welcome back");
      navigate(accountType === "business" ? "/dashboard" : "/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Could not log in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
        <h1 className="text-center text-2xl font-bold text-gray-900">Log in</h1>
        <p className="mt-1 text-center text-sm text-gray-500">
          Welcome back to Usiwaste
        </p>

        {/* customer / business switch */}
        <div className="my-6 flex rounded-2xl bg-slate-100 p-1">
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
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
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center gap-2 rounded-2xl border border-gray-200 px-4 focus-within:border-green-500">
              <Lock className="h-5 w-5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent py-3 outline-none"
              />
            </div>
            <div className="mt-2 text-right">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-green-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-green-600 px-5 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95 disabled:opacity-60"
          >
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          No account?{" "}
          <Link to="/signup" className="font-semibold text-green-700 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
