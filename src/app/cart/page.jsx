// app/cart/page.js   → localhost:3000/cart

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // লোকালস্টোরেজ থেকে কার্ট লোড
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      // ডেমোর জন্য কিছু প্রোডাক্ট দিলাম
      const demoCart = [
        {
          id: 1,
          name: "Stainless Steel Cookware Set",
          price: 2890,
          qty: 1,
          img: "https://images.unsplash.com/photo-1586023492125-27b2c486e5c7?w=400",
        },
        {
          id: 2,
          name: "Bluetooth Earbuds Pro",
          price: 1490,
          qty: 2,
          img: "https://images.unsplash.com/photo-1606220588913-b474e1f88c8f?w=400",
        },
        {
          id: 3,
          name: "Men's Cotton T-Shirt (Pack of 3)",
          price: 890,
          qty: 1,
          img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
        },
        {
          id: 4,
          name: "LED Desk Lamp Touch Control",
          price: 1290,
          qty: 1,
          img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400",
        },
      ];
      setCart(demoCart);
      localStorage.setItem("cart", JSON.stringify(demoCart));
    }
  }, []);

  // কার্ট আপডেট হলে লোকালস্টোরেজে সেভ
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCart(
      cart.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

 

  const applyCoupon = () => {
    if (coupon === "SAVE20" || coupon === "save20") {
      setDiscount(20);
      alert("কুপন সফলভাবে যোগ হয়েছে! ২০% ডিসকাউন্ট পেয়েছেন");
    } else if (coupon === "FREE50" || coupon === "free50") {
      setDiscount(50);
      alert("৫০% ডিসকাউন্ট পেয়েছেন!");
    } else {
      alert("ভুল কুপন কোড");
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountAmount = discount > 0 ? (subtotal * discount) / 100 : 0;
  const deliveryCharge = subtotal > 999 ? 0 : 80;
  const total = subtotal - discountAmount + deliveryCharge;

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
            Your Cart ({cart.length} items)
          </h1>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-xl p-6 flex gap-6 hover:shadow-2xl transition"
                >
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-2xl font-black text-red-600 mb-4">
                      ৳{item.price.toLocaleString()}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border-2 border-gray-300 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, item.qty - 1)}
                          className="w-12 h-12 hover:bg-gray-100 rounded-full text-xl font-bold"
                        >
                          -
                        </button>
                        <span className="w-16 text-center text-xl font-bold">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.qty + 1)}
                          className="w-12 h-12 hover:bg-gray-100 rounded-full text-xl font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-black">
                      ৳{(item.price * item.qty).toLocaleString()}
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
                    <span className="font-bold">
                      ৳{subtotal.toLocaleString()}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount}%)</span>
                      <span className="font-bold">
                        -৳{discountAmount.toFixed(0)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Charge</span>
                    <span
                      className={deliveryCharge === 0 ? "text-green-600" : ""}
                    >
                      {deliveryCharge === 0 ? "FREE" : `৳${deliveryCharge}`}
                    </span>
                  </div>
                  <div className="border-t-2 border-dashed pt-4">
                    <div className="flex justify-between text-3xl font-black">
                      <span>Total</span>
                      <span className="text-red-600">
                        ৳{total.toLocaleString()}
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
                      placeholder="Enter coupon code"
                      className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-full text-lg"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Try: SAVE20 or FREE50
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
