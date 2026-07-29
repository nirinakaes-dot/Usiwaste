import React, { useState } from "react";
import {Clock,plus, X, CircleCheckBig, Calendar, Star} from 'lucide-react';
import Dashboard from "./Dashboard";
import Bookings from "./Bookings";
import ProductCard from "..../components/ProductCard";

export default function Listings() {
    return(
        <div>
            <div>
                <div>
                {/* (Store Name) */}
                <h1>Naivas</h1>
                <p>
                    {/* (Category) */}
                    <span>Supermarket</span>
                    
                </p>
                </div>
                <button>
                    <X className="h-5 w-5 text-white" />
                    <span className="text-white">Add Product</span>
                </button>
            </div>
            <div>
            <Dashboard />
            </div>
            <div>
                {/* Product Card */}
                <ProductCard />
            </div>
            <div>
            <Bookings />
            </div>
        </div>
    )
}

