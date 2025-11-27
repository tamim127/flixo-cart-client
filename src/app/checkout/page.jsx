
"use client";

import CheckoutContent from "@/Components/CheckoutContent/CheckoutContent";
import ProtectedRoute from "@/Components/ProtectedRoute/ProtectedRoute";

export default function CheckoutPage() {
  return (
  
    <ProtectedRoute>
      <CheckoutContent />
    </ProtectedRoute>
  );
}
