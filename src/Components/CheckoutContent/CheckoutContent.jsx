"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Truck,
  CreditCard,
  Wallet,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/Context/CartContext";

export default function CheckoutContent() {
  const { cart, totalPrice, totalItems, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Dhaka",
    zip: "",
    notes: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const deliveryCharge = totalPrice >= 50 ? 0 : 8;
  const finalTotal = totalPrice + deliveryCharge;

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill all required fields!");
      return;
    }

    setLoading(true);
    try {
    
      toast.success(
        "Order placed successfully! Thank you for shopping with us."
      );
      clearCart();
      setTimeout(() => (window.location.href = "/thank-you"), 1500);
    } catch (err) {
      toast.error("Failed to place order. Try again!");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-5xl font-black mb-6">Your cart is empty</h1>
          <p className="text-xl text-gray-600 mb-8">
            Add some products to continue
          </p>
          <Link href="/products">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 sm:px-12 py-5 rounded-full text-xl font-bold transition transform hover:scale-105">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-center mb-10 flex-wrap gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-xl lg:text-2xl font-black transition-all ${
                  step >= s
                    ? "bg-red-600 text-white scale-110 shadow-lg"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {step > s ? <Check className="w-6 h-6 lg:w-8 lg:h-8" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 lg:w-24 h-2 transition-all ${
                    step > s ? "bg-red-600" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-black">
                    Shipping Address
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInput}
                      placeholder="Full Name"
                      className="w-full px-4 sm:px-6 py-3 sm:py-5 border-2 border-gray-300 rounded-2xl text-lg focus:border-red-600 focus:outline-none transition"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInput}
                      placeholder="Email Address"
                      className="w-full px-4 sm:px-6 py-3 sm:py-5 border-2 border-gray-300 rounded-2xl text-lg focus:border-red-600 focus:outline-none transition"
                    />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInput}
                      placeholder="Phone Number"
                      className="w-full px-4 sm:px-6 py-3 sm:py-5 border-2 border-gray-300 rounded-2xl text-lg focus:border-red-600 focus:outline-none transition"
                      required
                    />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInput}
                      placeholder="City"
                      className="w-full px-4 sm:px-6 py-3 sm:py-5 border-2 border-gray-300 rounded-2xl text-lg focus:border-red-600 focus:outline-none transition"
                    />
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInput}
                      placeholder="ZIP Code"
                      className="w-full px-4 sm:px-6 py-3 sm:py-5 border-2 border-gray-300 rounded-2xl text-lg focus:border-red-600 focus:outline-none transition"
                    />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInput}
                      placeholder="Full Delivery Address"
                      rows={4}
                      className="sm:col-span-2 w-full px-4 sm:px-6 py-3 sm:py-5 border-2 border-gray-300 rounded-2xl text-lg focus:border-red-600 focus:outline-none transition resize-none"
                      required
                    />
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInput}
                      placeholder="Order Notes (Optional)"
                      rows={3}
                      className="sm:col-span-2 w-full px-4 sm:px-6 py-3 sm:py-5 border-2 border-gray-300 rounded-2xl text-lg focus:border-red-600 focus:outline-none transition resize-none"
                    />
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 sm:py-6 rounded-2xl text-xl sm:text-2xl font-black flex items-center justify-center gap-2 sm:gap-3 transition transform hover:scale-105"
                  >
                    Next: Payment{" "}
                    <ArrowRight className="w-5 sm:w-8 h-5 sm:h-8" />
                  </button>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-black">
                    Payment Method
                  </h2>
                  <div className="space-y-4 sm:space-y-6">
                    {/* COD */}
                    <label
                      className={`flex items-center gap-4 sm:gap-6 p-4 sm:p-6 border-4 rounded-3xl cursor-pointer transition-all ${
                        paymentMethod === "cod"
                          ? "border-red-600 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-6 h-6 sm:w-8 sm:h-8 text-red-600"
                      />
                      <Truck className="w-8 sm:w-12 h-8 sm:h-12 text-red-600" />
                      <div>
                        <p className="text-lg sm:text-2xl font-black">
                          Cash on Delivery (COD)
                        </p>
                        <p className="text-gray-600 text-sm sm:text-base">
                          Pay when you receive your order
                        </p>
                      </div>
                    </label>

                    {/* Mobile Banking */}
                    <label
                      className={`flex items-center gap-4 sm:gap-6 p-4 sm:p-6 border-4 rounded-3xl cursor-pointer transition-all ${
                        paymentMethod === "mobile"
                          ? "border-red-600 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="mobile"
                        checked={paymentMethod === "mobile"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-6 h-6 sm:w-8 sm:h-8 text-red-600"
                      />
                      <Wallet className="w-8 sm:w-12 h-8 sm:h-12 text-green-600" />
                      <div>
                        <p className="text-lg sm:text-2xl font-black">
                          bKash / Nagad / Rocket
                        </p>
                        <p className="text-gray-600 text-sm sm:text-base">
                          Mobile banking payment
                        </p>
                      </div>
                    </label>

                    {/* Card */}
                    <label
                      className={`flex items-center gap-4 sm:gap-6 p-4 sm:p-6 border-4 rounded-3xl cursor-pointer transition-all ${
                        paymentMethod === "card"
                          ? "border-red-600 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-6 h-6 sm:w-8 sm:h-8 text-red-600"
                      />
                      <CreditCard className="w-8 sm:w-12 h-8 sm:h-12 text-blue-600" />
                      <div>
                        <p className="text-lg sm:text-2xl font-black">
                          Credit / Debit Card
                        </p>
                        <p className="text-gray-600 text-sm sm:text-base">
                          Visa, MasterCard, Amex
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border-2 border-black py-4 sm:py-5 rounded-2xl text-xl sm:text-lg font-bold flex items-center justify-center gap-2 sm:gap-3"
                    >
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 sm:py-5 rounded-2xl text-xl sm:text-2xl font-black flex items-center justify-center gap-2 sm:gap-3 transition transform hover:scale-105"
                    >
                      Review Order{" "}
                      <ArrowRight className="w-5 sm:w-8 h-5 sm:h-8" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-black">
                    Review Your Order
                  </h2>
                  <div className="bg-gray-50 rounded-3xl p-6 sm:p-8 space-y-4 text-lg">
                    <div>
                      <strong>Name:</strong> {formData.name}
                    </div>
                    <div>
                      <strong>Phone:</strong> {formData.phone}
                    </div>
                    <div>
                      <strong>Address:</strong> {formData.address},{" "}
                      {formData.city}
                    </div>
                    <div>
                      <strong>Payment:</strong>{" "}
                      {paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : paymentMethod === "mobile"
                        ? "Mobile Banking"
                        : "Card"}
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-red-600 pt-4 border-t-2 border-dashed">
                      Total: ${finalTotal.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 border-2 border-black py-4 sm:py-5 rounded-2xl text-xl sm:text-lg font-bold flex items-center justify-center gap-2 sm:gap-3"
                    >
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button
                      onClick={placeOrder}
                      disabled={loading}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 sm:py-5 rounded-2xl text-xl sm:text-2xl font-black shadow-2xl transition transform hover:scale-105 disabled:opacity-70"
                    >
                      {loading ? "Placing Order..." : "Confirm & Place Order"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 sticky top-4 sm:top-6">
              <h3 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6">
                Order Summary ({totalItems} items)
              </h3>
              <div className="max-h-80 sm:max-h-96 overflow-y-auto space-y-4 sm:space-y-6 mb-4 sm:mb-6">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 pb-4 sm:pb-6 border-b last:border-0"
                  >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden">
                      <Image
                        src={item.imageUrl || "/placeholder.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm sm:text-lg line-clamp-2">
                        {item.title}
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Qty: {item.quantity}
                      </p>
                      <p className="font-black text-lg sm:text-xl">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-4 border-dashed pt-4 sm:pt-6 space-y-2 sm:space-y-4 text-lg sm:text-xl">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <strong>${totalPrice.toFixed(2)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span
                    className={
                      deliveryCharge === 0 ? "text-green-600 font-bold" : ""
                    }
                  >
                    {deliveryCharge === 0 ? "FREE" : `$${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between text-2xl sm:text-3xl font-black text-red-600 pt-2 sm:pt-4 border-t-2 border-dashed">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
