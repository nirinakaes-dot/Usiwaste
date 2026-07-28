import React from 'react';
import {Clock, CircleCheckBig, Calendar} from 'lucide-react';
import Cart from "../components/cart";
import ListingCard from "../components/ListingCard";

export default function Orders() {
    return (
        <div className="bg-white p-4 flex">
            <Clock text-yellow-400 h-4 />
           <div>
            <p>Samosas</p>
            <div className="flex gap-3 items-center">
                <span>Qty: 4</span>
                <span>Price: 240</span> 
                <Calendar/>
                <span text-red-500 h-4 flex items-center> 29/07/2026 </span>
            </div>
           </div>
        </div>
    )
}
