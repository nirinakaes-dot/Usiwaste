import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("user");
  const [name, setName] = useState(""); // full_name or business_name
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // Client-side checks before hitting the API.
    if (name.trim().length < 2) return toast.error("Enter your name");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (password !== confirm) return toast.error("Passwords do not match");

    setLoading(true);
    try {
      // Backend wants full_name for customers, business_name for businesses.
      const fields =
        accountType === "business"
          ? { business_name: name, email, password, phone_number: phone }
          : { full_name: name, email, password, phone_number: phone };

      await register({ accountType, ...fields });
      toast.success("Account created");
      navigate(accountType === "business" ? "/dashboard" : "/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Could not create account");
    } finally {
      setLoading(false);
    }
  }

  const field =
    "flex items-center gap-2 rounded-2xl border border-gray-200 px-4 focus-within:border-green-500";
  const input = "w-full bg-transparent py-3 outline-none";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Create your account
        </h1>

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
              {accountType === "business" ? "Business name" : "Full name"}
            </label>
            <div className={field}>
              <User className="h-5 w-5 text-gray-400" />
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={
                  accountType === "business" ? "Quickmart Kilimani" : "Jane Doe"
                }
                className={input}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className={field}>
              <Mail className="h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={input}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Phone number
            </label>
            <div className={field}>
              <Phone className="h-5 w-5 text-gray-400" />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0712345678"
                className={input}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className={field}>
              <Lock className="h-5 w-5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={input}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <div className={field}>
              <Lock className="h-5 w-5 text-gray-400" />
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                className={input}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-green-600 px-5 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95 disabled:opacity-60"
          >
            {loading ? "Creating…" : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-green-700 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
