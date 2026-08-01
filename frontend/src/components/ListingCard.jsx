import { Link } from "react-router-dom";
import { formatRemaining } from "../utils/helpers";
import { useState, useEffect } from "react";

function CountdownBadge({ deadline }) {
  const [state, setState] = useState(() => formatRemaining(deadline));

  useEffect(() => {
    const id = setInterval(() => setState(formatRemaining(deadline)), 30000);
    return () => clearInterval(id);
  }, [deadline]);

  const cls = state.expired ? "expired" : state.urgent ? "urgent" : "";
  return <span className={`countdown ${cls}`}>{state.expired ? "closed" : state.label}</span>;
}

export default function ListingCard({ listing }) {
  return (
    <Link to={`/listings/${listing.id}`} className="listing-card">
      <div className="top-row">
        <div>
          <div className="item-name">{listing.item_name}</div>
          <div className="business-name">{listing.business?.name}</div>
        </div>
        <CountdownBadge deadline={listing.pickup_deadline} />
      </div>
      {listing.description && <div className="desc">{listing.description}</div>}
      <div className="price-row">
        <span className="discounted">KES {listing.discounted_price}</span>
        <span className="original">KES {listing.original_price}</span>
      </div>
      <span className="status-tag">{listing.quantity} left · {listing.status}</span>
    </Link>
  );
}
