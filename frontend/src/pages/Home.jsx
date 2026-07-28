import React, { useState } from "react";
import ListingCard from "../components/ListingCard";
import Hero from "../components/hero";
import SearchBar from "../components/SearchBar";
import Cart from "../components/cart";
import { ShoppingCart } from "lucide-react";

export default function Home (){
     const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

  // Function to handle adding items
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

    return (
        <div className="min-h-screen bg-[#D9D9D9] p-8">
            <Hero />
            <SearchBar />
            <p className="text-2xl font-bold mb-4">Available Products</p>
            <ListingCard />
        </div>
    )
}