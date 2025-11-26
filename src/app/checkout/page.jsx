// src/app/checkout/page.js
"use client";

import CheckoutContent from "@/Components/CheckoutContent/CheckoutContent";
import ProtectedRoute from "@/Components/ProtectedRoute/ProtectedRoute";

export default function CheckoutPage() {
  return (
    // CheckoutContent-কে ProtectedRoute এর ভেতরে রাখুন
    <ProtectedRoute>
      <CheckoutContent />
    </ProtectedRoute>
  );
}
