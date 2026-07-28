import React, { useState } from 'react';
import { Clock, CircleCheckBig, Calendar, CheckCircle2 } from 'lucide-react';

export default function Bookings({ bookings = [], onConfirmCollection, onSubmitReview }) {
  if (bookings.length === 0) {
    return (
      <div className="bg-white p-6 rounded-3xl text-center text-gray-500">
        No active or past bookings found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((order) => {
        const isCollected = order.status === 'collected';

        return (
          <div
            key={order.bookingId}
            className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              {/* Status Indicator Icon */}
              <div className="mt-1">
                {isCollected ? (
                  <CircleCheckBig className="text-green-500 h-7 w-7 font-bold shrink-0" />
                ) : (
                  <Clock className="text-amber-500 h-7 w-7 font-bold shrink-0" />
                )}
              </div>

              {/* Booking & Item Details */}
              <div className="space-y-1">
                <h3 className="font-semibold text-gray-900 text-base">{order.name}</h3>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span>Qty: <strong>{order.quantity}</strong></span>
                  <span className="font-bold text-gray-900">Ksh {order.price * order.quantity}</span>
                  
                  <div className="flex items-center gap-1 text-red-700 font-medium">
                    <Calendar className="h-4 w-4" />
                    <span>{order.expiry}</span>
                  </div>
                </div>

                {/* Render Review component if collected */}
                {isCollected && (
                  <div className="mt-2">
                    <Review
                      bookingId={order.bookingId}
                      existingReview={order.review}
                      onSubmitReview={onSubmitReview}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Action / Badge Column */}
            <div className="flex items-center justify-end">
              {isCollected ? (
                /* Collected Status Badge */
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                  <CircleCheckBig className="h-3.5 w-3.5" />
                  Collected
                </span>
              ) : (
                /* Confirm Collection Action Button */
                <button
                  onClick={() => onConfirmCollection(order.bookingId, order.quantity)}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-2xl transition-all shadow-sm active:scale-95"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Confirm Collection
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}