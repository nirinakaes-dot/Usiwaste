import React, { useState } from "react";
import ListingCard from "../components/ListingCard";
import Hero from "../components/hero";
import SearchBar from "../components/SearchBar";
import Cart from "../components/cart";
import { ShoppingCart } from "lucide-react";

export default function Home (){
    return (
        <div className="min-h-screen bg-[#D9D9D9] p-8">
            <Hero />
            <SearchBar />
            <p className="text-2xl font-bold mb-4">Available Products</p>
            <ListingCard />
        </div>
    )
}