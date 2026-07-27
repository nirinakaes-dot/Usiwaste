import React from "react";
import {ArrowRight} from "lucide-react";

export default function Hero() {
    return (
        <div className= "pb-2">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Browse Food</h1>
                <button className="border border-black bg-[#DEC8C8] hover:bg-[#C0A0A0] text-black py-2 px-4 rounded-full flex items-center gap-2 cursor-pointer transition-colors duration-300">
                    Log Out <ArrowRight className="h-4 w-4" />
                </button>
            </div>
            <p>Find quality food approaching expiry at a discounted price.</p>
        </div>
    )
}