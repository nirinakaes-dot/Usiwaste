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
           <div>
            <h3>{order.name}</h3>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Qty: {order.quantity}</span>
                <span className='font-bold'> Ksh {order.price * order.quantity}</span> 
                <div>
                <Calendar className='h-4 w-4 text-red-700'/>
                <span classsName = "text-red-700 ">{order.expiry}</span>
            </div>
            {/* Tagged Status Badge */}
            {/* Status BAdge will go here after order is confirmed to have been picked by store manager */}
            
            
            </div>
            <div>
           </div>
        </div>
        </div>
    )
})}

</div> )}