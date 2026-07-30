import React, { useState } from "react";
import ListingCard from "../../components/ListingCard";
import Hero from "../../components/hero";
import SearchBar from "../../components/SearchBar";
import Cart from "../../components/cart";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchListings } from "../../services/listings";

export default function Home (){
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [listings, setListings] = useState([]);

    useEffect(() => {
    fetchListings({ status: "available" }).then((r) => {
      if (r.ok) setListings(r.data.listings);
        });
    }, []);
    
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

// Function to remove items
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="min-h-screen bg-[#D9D9D9] p-8">
            <Hero />
            <SearchBar />
            {/* Section for Cart Icon and Total Items */}
        <div className="flex justify-end m-4">
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex m-2 items-center gap-2 bg-green-700 hover:bg-green-900 text-white font-medium px-5 py-2.5 rounded-full shadow-md transition-colors cursor-pointer hover:-translate-y-1 transition-all duration-300"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>View Cart</span>
          {totalItems > 0 && (
            <span className="text-white text-s font-bold">
              ({totalItems})
            </span>
          )}
        </button>  
        </div>
            <p className="text-2xl font-bold mb-4">Available Products</p>
            <ListingCard onAdd={addToCart}/>
                  {/* Passing cart state down to Cart component */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
        </div>
    )
}