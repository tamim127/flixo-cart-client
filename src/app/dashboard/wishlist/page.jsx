"use client";

import React from "react";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// ডামি ডেটা (প্রোডাকশনে API থেকে ফেচ করা হবে)
const wishlistItems = [
  {
    id: 101,
    name: "Men’s Regular Fit Casual Shirt",
    price: 1850,
    imageUrl: "/images/product-shirt.jpg", // আপনার ইমেজ পাথ পরিবর্তন করুন
    stock: true,
  },
  {
    id: 102,
    name: "Wireless Bluetooth Headphone",
    price: 4500,
    imageUrl: "/images/product-headphone.jpg", // আপনার ইমেজ পাথ পরিবর্তন করুন
    stock: false,
  },
  {
    id: 103,
    name: "Smart Watch Series 7",
    price: 12999,
    imageUrl: "/images/product-watch.jpg", // আপনার ইমেজ পাথ পরিবর্তন করুন
    stock: true,
  },
];

const WishlistPage = () => {
  // আইটেম রিমুভ করার ডামি ফাংশন
  const handleRemove = (itemId) => {
    console.log(`Removing item: ${itemId}`);
    // এখানে API কল করে উইশলিস্ট থেকে আইটেম রিমুভ করার লজিক যুক্ত হবে।
  };

  // কার্টে অ্যাড করার ডামি ফাংশন
  const handleAddToCart = (item) => {
    console.log(`Adding to cart: ${item.name}`);
    // এখানে API কল করে কার্টে অ্যাড করার লজিক যুক্ত হবে।
  };

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-900 flex items-center mb-6 border-b pb-4">
        <Heart className="h-7 w-7 mr-3 text-indigo-600 fill-indigo-500" />
        My Wishlist ({wishlistItems.length} items)
      </h2>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed">
          <Heart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            Your Wishlist is Empty
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Start adding products you love to your wishlist.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <ArrowRight className="h-5 w-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition duration-200"
            >
              {/* Product Image */}
              <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                {/* Next.js Image Component ব্যবহার করুন */}
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="object-cover object-center"
                />
              </div>

              {/* Product Details */}
              <div className="ml-4 flex-1 min-w-0">
                <Link
                  href={`/product/${item.id}`}
                  className="text-lg font-medium text-gray-900 hover:text-indigo-600"
                >
                  {item.name}
                </Link>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ৳ {item.price.toLocaleString()}
                </p>
                <p
                  className={`text-sm mt-1 font-medium ${
                    item.stock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.stock ? "In Stock" : "Out of Stock"}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.stock}
                  className={`flex items-center justify-center p-2 rounded-md text-white text-sm transition duration-150 ${
                    item.stock
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="flex items-center justify-center p-2 rounded-md text-red-600 border border-red-200 hover:bg-red-50 text-sm transition duration-150"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
