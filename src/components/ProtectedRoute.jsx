import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Wraps any page that requires a login. If there's no authenticated account,
 * it bounces to /login. While the initial token check is still running it
 * shows nothing, so protected pages don't flash the login screen on refresh.
 *
 * These are the "protected routes" the module spec asks for (3.01).
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // could be a spinner
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}
