import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { favoritesApi } from "../services/listings";
import ListingCard from "../components/ListingCard";

export default function Favorites() {
  const { session } = useAuth();
  const [favorites, setFavorites] = useState(null);
  const [error, setError] = useState("");

  const load = () => favoritesApi.mine(session.token).then(setFavorites).catch((err) => setError(err.message));
  useEffect(() => { load(); }, []);

  const remove = async (favId) => {
    try {
      await favoritesApi.remove(favId, session.token);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <h2>Your favorites</h2>
      {error && <div className="error-banner" style={{ marginTop: 16 }}>{error}</div>}
      {!favorites && <div className="loading-text">loading…</div>}
      {favorites && favorites.length === 0 && (
        <div className="empty-state">
          <h3>No favorites yet</h3>
        </div>
      )}
      <div className="listing-grid">
        {favorites && favorites.map((f) => (
          <div key={f.id} style={{ position: "relative" }}>
            <ListingCard listing={f.listing} />
            <button
              className="btn btn-outline"
              style={{ marginTop: 8, width: "100%" }}
              onClick={(e) => { e.preventDefault(); remove(f.id); }}
            >
              Remove from favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
