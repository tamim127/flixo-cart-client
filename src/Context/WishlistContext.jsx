"use client";

import { createContext, useState, useEffect, useContext } from "react";

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // LocalStorage load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(stored);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const addToWishlist = (item) => {
    setWishlist((prev) => [...prev.filter((p) => p._id !== item._id), item]);
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((p) => p._id !== id));
  };

  const isInWishlist = (id) => wishlist.some((p) => p._id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
