import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="dot" />
        usiwaste
      </Link>
      <nav>
        <Link to="/">Browse</Link>
        {session?.role === "user" && (
          <>
            <Link to="/orders">Orders</Link>
            <Link to="/favorites">Favorites</Link>
          </>
        )}
        {session?.role === "business" && <Link to="/dashboard">Dashboard</Link>}

        {session ? (
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Log out ({session.identity.name})
          </button>
        ) : (
          <>
            <Link to="/login" className="pill">Log in</Link>
            <Link to="/signup" className="pill active">Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
