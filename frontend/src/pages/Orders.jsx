import React from 'react';
import {Clock, CircleCheckBig, Calendar} from 'lucide-react';
import Cart from "../components/cart";
import ListingCard from "../components/ListingCard";

export default function Orders() {
    return (
        <div className="bg-white p-4 flex rounded-3xl">
            <Clock className='text-yellow-300 h-7 w-7 font-bold mr-1 '/>
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
}
