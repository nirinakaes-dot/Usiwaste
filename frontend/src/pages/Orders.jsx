import React from 'react';
import {Clock, CircleCheckBig, Calendar, Star} from 'lucide-react';
import Cart from "../components/cart";
import ListingCard from "../components/ListingCard";

export default function Orders({ bookings = [], onToggleStatus, onSubmitReview }) {
    
  const [reviewText, setReviewText] = useState({});
  const [rating, setRating] = useState({});

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
            return(
            <div key={order.bookingId} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <div>
                {isCollected ? (
                    <CircleCheckBig className='text-green-500 h-7 w-7 font-bold mr-1 '/>
                ) :(
        
            <Clock className='text-yellow-300 h-7 w-7 font-bold mr-1 '/>
            )}
            </div>
            <div>
           <div className='bg-yellow-700 flex justify space-between'>
            <p>Samosas</p>
            <div className="flex gap-3 items-center">
                <span>Qty: 4</span>
                <span className='font-bold'> Ksh 240</span> 
                <Calendar/>
                <span classsName = "font-red-500 h-4 flex items-center"> 29/07/2026 </span>
            </div>
            <span>Pending</span>
            </div>
           </div>
        </div>
                   
                )
            })}

        </div>
    )
}
