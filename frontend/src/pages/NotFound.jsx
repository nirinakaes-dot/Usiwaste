import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <p className="text-6xl font-bold text-green-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-2 max-w-sm text-gray-500">
        The page you're after doesn't exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-6 flex items-center gap-2 rounded-2xl bg-green-600 px-5 py-2.5 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95"
      >
        <Home className="h-5 w-5" />
        Back to listings
      </Link>
    </div>
  );
}
