// app/cart/page.js
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-9xl mb-8">Shopping Cart</div>
          <p className="text-3xl text-gray-600 mb-8">Your cart is empty</p>
          <Link href="/products">
            <button className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 rounded-full text-2xl font-bold">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-black mb-10 text-center">
            Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
          </h1>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white rounded-3xl shadow-xl p-6 flex flex-col sm:flex-row gap-6 hover:shadow-2xl transition"
                >
                  <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                    <Image
                      src={item.imageUrl || "/placeholder.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-2xl font-black text-red-600 mb-4">
                      ${item.price.toFixed(2)}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center border-2 border-gray-300 rounded-full">
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              //  remove + add (quantity - 1)
                              removeFromCart(item.productId);
                              for (let i = 0; i < item.quantity - 1; i++) {
                                addToCart({ ...item, _id: item.productId });
                              }
                            } else {
                              removeFromCart(item.productId);
                            }
                          }}
                          className="w-12 h-12 hover:bg-gray-100 rounded-full text-xl font-bold"
                        >
                          −
                        </button>
                        <span className="w-16 text-center text-xl font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            addToCart({ ...item, _id: item.productId })
                          }
                          className="w-12 h-12 hover:bg-gray-100 rounded-full text-xl font-bold"
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
                    </div>
                  </div>

                  <div className="text-right sm:text-left">
                    <p className="text-2xl font-black">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-2xl p-8 sticky top-6">
                <h2 className="text-3xl font-black mb-6">Order Summary</h2>

                <div className="space-y-4 text-xl">
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
                    <div className="flex justify-between text-3xl font-black">
                      <span>Total</span>
                      <span className="text-red-600">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Coupon */}
                <div className="mt-8">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && applyCoupon()}
                      placeholder="Enter coupon code"
                      className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-full text-lg focus:outline-none focus:border-black"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Try:{" "}
                    <code className="bg-gray-200 px-2 py-1 rounded">
                      SAVE20
                    </code>{" "}
                    or{" "}
                    <code className="bg-gray-200 px-2 py-1 rounded">
                      FREE50
                    </code>
                  </p>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout">
                  <button className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white py-6 rounded-full text-2xl font-black shadow-2xl hover:shadow-red-600/50 transition transform hover:scale-105">
                    Proceed to Checkout
                  </button>
                </Link>

                <Link href="/products">
                  <button className="w-full mt-4 border-2 border-black py-5 rounded-full text-xl font-bold hover:bg-black hover:text-white transition">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
