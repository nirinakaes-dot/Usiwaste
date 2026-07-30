import React from 'react';
import { ShoppingCart } from 'lucide-react';

function DiscountBadge({ percent }) {
  if (!percent || percent <= 0) return null;

  return (
    <span className="absolute top-3 left-3 bg-[#DED97A] text-[#000000] font-['Istok_Web',sans-serif] text-xs font-bold px-2 py-1 rounded-full z-10">
      {percent}% OFF
    </span>
  );
}

export default function ListingCard({ listings = [], onAdd }) {
  if (!listings || listings.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No available listings right now.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 max-w-5xl">
      {listings.map((listing) => {
        // Calculate discount percentage dynamically 
        const original = Number(listing.original_price) || 0;
        const discounted = Number(listing.discounted_price) || 0;
        const discountPercent =
          original > discounted
            ? Math.round(((original - discounted) / original) * 100)
            : 0;

        // Format expiry date / deadline
        const formattedExpiry = listing.pickup_deadline
          ? new Date(listing.pickup_deadline).toLocaleDateString()
          : 'N/A';

        const inStock = listing.quantity > 0 && listing.status === 'available';

        // Handler to match backend payload structure expected by cart
        const handleAddToCart = () => {
          if (onAdd) {
            onAdd({
              id: listing.id,
              name: listing.item_name,
              price: discounted,
              quantity: 1,
              image: "", // no image column yet(to be added in DB)
            });
          }
        };

        return (
          <div
            key={listing.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm max-w-xs w-full mx-auto hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative h-36 w-full bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80" // Fallback preview placeholder
                alt={listing.item_name}
                className="h-full w-full object-cover"
              />
              <DiscountBadge percent={discountPercent} />
            </div>

            <div className="flex flex-1 flex-col p-3">
              <h3 className="text-lg font-semibold text-gray-900">{listing.item_name}</h3>
              <p className="mt-0.5 text-xs text-gray-500">{listing.category || 'General'}</p>
              <p className="mt-2 text-xs text-gray-500">
                Expiry Date: <span className="font-medium text-red-400">{formattedExpiry}</span>
              </p>

              <div className="mt-2 flex items-center gap-1.5">
                <span className="text-lg font-bold text-green-600">Ksh {discounted}</span>
                {original > discounted && (
                  <span className="text-xs text-gray-400 line-through">Ksh {original}</span>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className="mt-3 flex w-full items-center justify-center rounded-full bg-green-700 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 disabled:cursor-not-allowed disabled:bg-gray-300 cursor-pointer"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}