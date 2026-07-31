import React from "react";
import {ArrowRight} from "lucide-react";
import ListingCard from "../components/ListingCard";
import Cart from "../components/cart";
import Orders from "./Orders";
import { useEffect, useState } from "react";
import { fetchMyOrders } from "../../services/orders";
import Bookings from "../Store/Bookings";

export default function MyBookings() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

 // Fetch user orders on component mount 
  useEffect(() => {
    fetchMyOrders().then((r) => {
      if (r.ok) setOrders(r.data);
      setLoading(false);
    });
  }, []);

  // map backend order -> the shape the existing Bookings/Orders UI expects
  const bookings = orders.map((o) => ({
    bookingId: o.id,
    name: o.listing?.item_name,
    quantity: o.listing?.quantity ?? 1,
    price: o.listing?.discounted_price ?? 0,
    expiry: o.listing?.pickup_deadline?.slice(0, 10),
    status: o.status === "picked_up" ? "collected" : o.status,
  }));

    return (
        <div className= "min-h-screen bg-[#D9D9D9] p-8">
            <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-bold">My Bookings</h1>
                <button className="border border-black bg-[#DEC8C8] hover:bg-[#C0A0A0] text-black py-2 px-4 rounded-full flex items-center gap-2 cursor-pointer transition-colors duration-300 hover:font-bold">
                    Log Out <ArrowRight className="h-4 w-4" />
                </button>
            </div>
            <p>Track your booked items and collection status here.</p>
            </div>
            <div>
            <p className="text-2xl font-bold mb-4">Activity({bookings.length})</p>
            <div className="">
                      {loading ? (
                        <p>Loading…</p>
                    ) : (
                <Orders bookings={bookings} onConfirmCollection={/* add later */}/>
                    )}
            </div>
            </div>
        </div>
    )
}
