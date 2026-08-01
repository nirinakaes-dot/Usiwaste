import { useEffect, useState } from "react";
import { listingsApi } from "../services/listings";
import ListingCard from "../components/ListingCard";

export default function Listings() {
  const [listings, setListings] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    listingsApi
      .browse()
      .then((data) => setListings(data.listings))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="page">
      <h2>All listings</h2>
      {error && <div className="error-banner" style={{ marginTop: 16 }}>{error}</div>}
      {!listings && !error && <div className="loading-text">loading…</div>}
      {listings && listings.length === 0 && (
        <div className="empty-state">
          <h3>Nothing available right now</h3>
        </div>
      )}
      {listings && listings.length > 0 && (
        <div className="listing-grid">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      )}
    </div>
  );
}
