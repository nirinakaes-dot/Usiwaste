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
  
    // Function to handle changing quantities
  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + amount;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
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