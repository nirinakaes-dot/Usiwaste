import { useAuth } from "../context/AuthContext";

/**
 * Placeholder protected page. It exists so login/register have somewhere to
 * land and so ProtectedRoute has something to guard. Your teammates building
 * the Home feed and dashboard will replace this.
 */
export default function Home() {
  const { account, accountType, logout } = useAuth();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100 px-4 text-center">
      <div className="flex h-14 w-36 items-center justify-center rounded-md bg-brand font-semibold text-white">
        LOGO
      </div>
      <h1 className="text-2xl font-semibold text-gray-800">
        You're logged in 🎉
      </h1>
      <p className="text-gray-600">
        {accountType === "business" ? "Business" : "Customer"}:{" "}
        <strong>{account?.full_name || account?.business_name}</strong>
        <br />
        {account?.email}
      </p>
      <p className="max-w-sm text-sm text-gray-500">
        This is a placeholder. The Home feed and dashboard get built by the rest
        of the team — your authentication work is what got the user here.
      </p>
      <button
        onClick={logout}
        className="rounded-md bg-brand px-6 py-2 font-medium text-white hover:bg-brand-dark"
      >
        Log out
      </button>
    </div>
  );
}
