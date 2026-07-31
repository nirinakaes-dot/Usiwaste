import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Star, Tag } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, accountType } = useAuth();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reserving, setReserving] = useState(false);

  // Fetch the single listing. This endpoint is public - no login needed to
  // browse - so we don't guard it.
  useEffect(() => {
    let active = true;
    api
      .get(`/listings/${id}`)
      .then((r) => active && setListing(r.data.listing))
      .catch(() => active && toast.error("Could not load this listing"))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  async function handleReserve() {
    // Only customers can reserve. Send them to login first if needed.
    if (!isAuthenticated) {
      toast("Log in to reserve", { icon: "🔒" });
      return navigate("/login");
    }
    if (accountType !== "user") {
      return toast.error("Only customer accounts can reserve");
    }
    setReserving(true);
    try {
      await api.post("/orders", { listing_id: listing.listing_id, quantity_ordered: 1 });
      toast.success("Reserved. Check your orders to pay and collect.");
    } catch (err) {
      toast.error(err.response?.data?.error || "Could not reserve");
    } finally {
      setReserving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-gray-500">
        Loading…
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 text-center">
        <p className="text-gray-600">This listing could not be found.</p>
        <Link to="/" className="mt-4 font-semibold text-green-700 hover:underline">
          Back to listings
        </Link>
      </div>
    );
  }

  const soldOut =
    listing.status !== "available" || listing.quantity_available <= 0;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        {listing.image_url ? (
          <img
            src={listing.image_url}
            alt={listing.item_name}
            className="h-56 w-full object-cover"
          />
        ) : (
          <div className="flex h-56 w-full items-center justify-center bg-slate-100 text-gray-400">
            No image
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {listing.item_name}
              </h1>
              {listing.business && (
                <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  {listing.business.business_name}
                  {listing.business.location ? `, ${listing.business.location}` : ""}
                </p>
              )}
            </div>
            {listing.business?.average_rating != null && (
              <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-gray-700">
                <Star className="h-4 w-4 text-yellow-500" />
                {listing.business.average_rating}
              </span>
            )}
          </div>

          {listing.description && (
            <p className="mt-4 text-gray-600">{listing.description}</p>
          )}

          <div className="mt-6 flex items-center gap-3">
            <span className="text-3xl font-bold text-green-600">
              KES {listing.discounted_price}
            </span>
            {listing.original_price > listing.discounted_price && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  KES {listing.original_price}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-sm font-semibold text-green-700">
                  <Tag className="h-3.5 w-3.5" />
                  {listing.discount_percent}% off
                </span>
              </>
            )}
          </div>

          <div className="mt-4 space-y-1 text-sm text-gray-500">
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Collect before{" "}
              {listing.pickup_deadline
                ? new Date(listing.pickup_deadline).toLocaleString()
                : "the deadline"}
            </p>
            <p>{listing.quantity_available} left</p>
          </div>

          <button
            onClick={handleReserve}
            disabled={soldOut || reserving}
            className="mt-6 w-full rounded-2xl bg-green-600 px-5 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {soldOut
              ? "Sold out"
              : reserving
              ? "Reserving…"
              : "Reserve"}
          </button>
        </div>
      </div>
    </div>
  );
}
