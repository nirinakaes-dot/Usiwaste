import React from "react";
import {ArrowRight} from "lucide-react";
import ListingCard from "../components/ListingCard";
import Cart from "../components/cart";
import Orders from "./Orders";
import { useEffect, useState } from "react";
import { fetchMyOrders } from "../../services/orders";

export default function MyBookings() {
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
            <p className="text-2xl font-bold mb-4">Activity(0)</p>
            <div className="bg-red-900 p-1">
                <Orders />
            </div>
            </div>
        </div>
    )
}
