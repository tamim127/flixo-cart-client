// app/checkout/page.js   → localhost:3000/checkout

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState(1); // 1=Delivery, 2=Payment, 3=Confirm
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Dhaka",
    note: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // কার্ট লোড
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = subtotal >= 999 ? 0 : 80;
  const total = subtotal + delivery;

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    // এখানে পরে API কল করবে
    alert("অর্ডার সফলভাবে প্লেস হয়েছে! ধন্যবাদ");
    localStorage.removeItem("cart");
    window.location.href = "/thank-you";
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl font-black mb-8">কার্ট খালি আছে!</p>
          <Link href="/products">
            <button className="bg-red-600 text-white px-12 py-6 rounded-full text-2xl font-bold">
              প্রোডাক্ট দেখুন
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
          {/* Progress Bar */}
          <div className="flex items-center justify-center mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black ${
                    step >= s
                      ? "bg-red-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-32 h-2 ${
                      step > s ? "bg-red-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-2xl p-10">
                {/* Step 1: Delivery */}
                {step === 1 && (
                  <div>
                    <h2 className="text-4xl font-black mb-8">
                      ডেলিভারি ঠিকানা
                    </h2>
                    <div className="space-y-6">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInput}
                        placeholder="পুরো নাম"
                        className="w-full px-6 py-5 border-2 rounded-2xl text-xl"
                        required
                      />
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInput}
                        placeholder="মোবাইল নম্বর (017...)"
                        className="w-full px-6 py-5 border-2 rounded-2xl text-xl"
                        required
                      />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInput}
                        placeholder="বিস্তারিত ঠিকানা (বাড়ি নং, রোড, এলাকা)"
                        rows="4"
                        className="w-full px-6 py-5 border-2 rounded-2xl text-xl"
                        required
                      />
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInput}
                        placeholder="শহর (ঢাকা/চট্টগ্রাম)"
                        className="w-full px-6 py-5 border-2 rounded-2xl text-xl"
                      />
                      <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleInput}
                        placeholder="অর্ডার নোট (অপশনাল)"
                        rows="3"
                        className="w-full px-6 py-5 border-2 rounded-2xl text-xl"
                      />

                      <button
                        onClick={() => setStep(2)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-2xl text-2xl font-black mt-8"
                      >
                        পরবর্তী → পেমেন্ট
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                  <div>
                    <h2 className="text-4xl font-black mb-8">পেমেন্ট মেথড</h2>
                    <div className="space-y-6">
                      {/* Cash on Delivery */}
                      <label
                        className={`block border-4 rounded-3xl p-8 cursor-pointer transition ${
                          paymentMethod === "cod"
                            ? "border-red-600 bg-red-50"
                            : "border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-6 h-6 text-red-600"
                        />
                        <span className="text-2xl font-black ml-4">
                          ক্যাশ অন ডেলিভারি (COD)
                        </span>
                        <p className="text-gray-600 mt-2">
                          ডেলিভারি পেয়ে টাকা পরিশোধ করুন
                        </p>
                      </label>

                      {/* Bkash */}
                      <label
                        className={`block border-4 rounded-3xl p-8 cursor-pointer transition ${
                          paymentMethod === "bkash"
                            ? "border-red-600 bg-red-50"
                            : "border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="bkash"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-6 h-6 text-red-600"
                        />
                        <span className="text-2xl font-black ml-4">
                          বিকাশ / নগদ / রকেট
                        </span>
                        <p className="text-gray-600 mt-2">
                          মোবাইল ব্যাংকিং দিয়ে পেমেন্ট
                        </p>
                      </label>

                      {/* Card */}
                      <label
                        className={`block border-4 rounded-3xl p-8 cursor-pointer transition ${
                          paymentMethod === "card"
                            ? "border-red-600 bg-red-50"
                            : "border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-6 h-6 text-red-600"
                        />
                        <span className="text-2xl font-black ml-4">
                          ক্রেডিট / ডেবিট কার্ড
                        </span>
                      </label>

                      <div className="flex gap-4">
                        <button
                          onClick={() => setStep(1)}
                          className="flex-1 border-2 border-black py-6 rounded-2xl text-xl font-bold"
                        >
                          ← পিছনে
                        </button>
                        <button
                          onClick={() => setStep(3)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-6 rounded-2xl text-2xl font-black"
                        >
                          পরবর্তী → রিভিউ
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Confirm */}
                {step === 3 && (
                  <div>
                    <h2 className="text-4xl font-black mb-8">
                      অর্ডার কনফার্ম করুন
                    </h2>
                    <div className="bg-gray-50 rounded-3xl p-8 space-y-6 text-xl">
                      <div>
                        <strong>নাম:</strong> {formData.name}
                      </div>
                      <div>
                        <strong>মোবাইল:</strong> {formData.phone}
                      </div>
                      <div>
                        <strong>ঠিকানা:</strong> {formData.address},{" "}
                        {formData.city}
                      </div>
                      <div>
                        <strong>পেমেন্ট:</strong>{" "}
                        {paymentMethod === "cod"
                          ? "ক্যাশ অন ডেলিভারি"
                          : paymentMethod === "bkash"
                          ? "মোবাইল ব্যাংকিং"
                          : "কার্ড"}
                      </div>
                      <div>
                        <strong>মোট টাকা:</strong>{" "}
                        <span className="text-3xl font-black text-red-600">
                          ৳{total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-10">
                      <button
                        onClick={() => setStep(2)}
                        className="flex-1 border-2 border-black py-6 rounded-2xl text-xl font-bold"
                      >
                        ← পিছনে
                      </button>
                      <button
                        onClick={placeOrder}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-6 rounded-2xl text-2xl font-black shadow-2xl"
                      >
                        কনফার্ম অর্ডার প্লেস করুন
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-2xl p-8 sticky top-6">
                <h3 className="text-3xl font-black mb-6">অর্ডার সামারি</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.img}
                          alt=""
                          fill
                          className="rounded-xl object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-gray-600">Qty: {item.qty}</p>
                        <p className="font-bold">
                          ৳{(item.price * item.qty).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t-4 border-dashed mt-8 pt-6 space-y-4 text-xl">
                  <div className="flex justify-between">
                    <span>সাবটোটাল</span>{" "}
                    <strong>৳{subtotal.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>ডেলিভারি</span>{" "}
                    <span className={delivery === 0 ? "text-green-600" : ""}>
                      {delivery === 0 ? "ফ্রি" : `৳${delivery}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-3xl font-black text-red-600">
                    <span>মোট</span>
                    <span>৳{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
