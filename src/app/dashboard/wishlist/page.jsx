"use client";

import { useWishlist } from "@/Context/WishlistContext";
import { useCart } from "@/Context/CartContext";
import { ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart({
      _id: item._id,
      title: item.title,
      price: item.price,
      imageUrl: item.thumbnail,
      stock: item.stock ?? true, // default true
    });
    toast.success(`Added "${item.title}" to cart`);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-4xl mb-4">❤️</p>
        <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500">Start adding products you love!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-0 py-8">
      {wishlist.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105"
        >
          {/* Product Image */}
          <div className="relative w-full aspect-square bg-gray-100">
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="p-4 flex flex-col flex-1">
            <h3 className="text-lg font-semibold truncate">{item.title}</h3>
            <p className="text-red-600 font-bold text-xl mt-2">
              $ {item.price.toLocaleString()}
            </p>

            {/* Action Buttons */}
            <div className="mt-auto flex gap-3">
              <button
                onClick={() => handleAddToCart(item)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>

              <button
                onClick={() => {
                  removeFromWishlist(item._id);
                  toast.success(`Removed "${item.title}" from wishlist`);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition"
              >
                <Trash2 className="w-5 h-5" />
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
