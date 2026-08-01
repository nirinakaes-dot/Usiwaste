import { useEffect, useState } from "react";
import { listingsApi } from "../services/listings";
import ListingCard from "../components/ListingCard";

export default function Home() {
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
      <section className="hero">
        <div className="eyebrow">before it's binned, before it's gone</div>
        <h1>Food's still good. The clock's still ticking.</h1>
        <p>
          Nearby shops post what's left over at closing time, discounted. Reserve it, walk in,
          pick it up — before someone else does, or the deadline does.
        </p>
      </section>

      {error && <div className="error-banner">{error}</div>}
      {!listings && !error && <div className="loading-text">loading nearby listings…</div>}
      {listings && listings.length === 0 && (
        <div className="empty-state">
          <h3>Nothing on the shelf right now</h3>
          <p>Check back closer to closing time — that's when the good stuff shows up.</p>
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
