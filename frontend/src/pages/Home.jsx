import React from "react";
import ListingCard from "../components/ListingCard";
import Hero from "../components/hero";

export default function Home (){
    return (
        <div className="min-h-screen bg-[#D9D9D9] p-8">
            <Hero />
            <p className="text-2xl font-bold mb-4">Available Products</p>
            <ListingCard />
        </div>
    )
}