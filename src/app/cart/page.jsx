"use client";

import { useCart } from "@/Context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, totalItems, totalPrice, loading } =
    useCart();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE20") {
      setDiscount(20);
    } else if (coupon.toUpperCase() === "FREE50") {
      setDiscount(50);
    } else {
      alert("Invalid coupon code");
      setDiscount(0);
    }
    setCoupon("");
  };

  const subtotal = totalPrice;
  const discountAmount = discount > 0 ? (subtotal * discount) / 100 : 0;
  const deliveryCharge = subtotal >= 50 ? 0 : 8; // $50+ = Free delivery
  const finalTotal = subtotal - discountAmount + deliveryCharge;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-3xl font-bold text-gray-600">Loading cart...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl sm:text-9xl mb-8">🛒</div>
          <p className="text-2xl sm:text-3xl text-gray-600 mb-8">
            Your cart is empty
          </p>
          <Link href="/products">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-full text-xl sm:text-2xl font-bold transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black mb-8 text-center">
          Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 hover:shadow-2xl transition"
              >
                <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                  <Image
                    src={item.imageUrl || "/placeholder.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xl sm:text-2xl font-black text-red-600 mb-3">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-between sm:justify-start mt-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center border-2 border-gray-300 rounded-full">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            removeFromCart(item.productId);
                            for (let i = 0; i < item.quantity - 1; i++) {
                              addToCart({ ...item, _id: item.productId });
                            }
                          } else {
                            removeFromCart(item.productId);
                          }
                        }}
                        className="w-10 sm:w-12 h-10 sm:h-12 hover:bg-gray-100 rounded-full text-lg sm:text-xl font-bold"
                      >
                        −
                      </button>
                      <span className="w-12 sm:w-16 text-center text-lg sm:text-xl font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          addToCart({ ...item, _id: item.productId })
                        }
                        className="w-10 sm:w-12 h-10 sm:h-12 hover:bg-gray-100 rounded-full text-lg sm:text-xl font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-red-600 hover:text-red-800 font-bold"
                    >
                      Remove
                    </button>

                    {/* Total for this item */}
                    <p className="text-lg sm:text-2xl font-black sm:ml-auto text-right sm:text-left mt-2 sm:mt-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 sticky top-6">
              <h2 className="text-2xl sm:text-3xl font-black mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 text-lg sm:text-xl">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span className="font-bold">
                      -${discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span
                    className={
                      deliveryCharge === 0 ? "text-green-600 font-bold" : ""
                    }
                  >
                    {deliveryCharge === 0 ? "FREE" : `$${deliveryCharge}`}
                  </span>
                </div>
                <div className="border-t-2 border-dashed pt-4">
                  <div className="flex justify-between text-2xl sm:text-3xl font-black">
                    <span>Total</span>
                    <span className="text-red-600">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Coupon */}
              <div className="mt-6 sm:mt-8">
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && applyCoupon()}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-300 rounded-full text-base sm:text-lg focus:outline-none focus:border-black"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-gray-800 transition"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  Try:{" "}
                  <code className="bg-gray-200 px-2 py-1 rounded">SAVE20</code>{" "}
                  or{" "}
                  <code className="bg-gray-200 px-2 py-1 rounded">FREE50</code>
                </p>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout">
                <button className="w-full mt-6 sm:mt-8 bg-red-600 hover:bg-red-700 text-white py-4 sm:py-6 rounded-full text-xl sm:text-2xl font-black shadow-2xl hover:shadow-red-600/50 transition transform hover:scale-105">
                  Proceed to Checkout
                </button>
              </Link>

              <Link href="/products">
                <button className="w-full mt-4 border-2 border-black py-3 sm:py-5 rounded-full text-base sm:text-xl font-bold hover:bg-black hover:text-white transition">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
