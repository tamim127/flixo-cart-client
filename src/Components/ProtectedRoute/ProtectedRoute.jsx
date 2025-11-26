// src/components/ProtectedRoute.jsx
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Loader2 } from "lucide-react";
import { useAuth } from "@/Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // বর্তমান পাথটি পাওয়ার জন্য

  useEffect(() => {
    // যদি Auth স্টেট লোডিং শেষ হয় এবং কোনো ইউজার না থাকে
    if (!loading && !currentUser) {
      // বর্তমান URL-টি সংরক্ষণ করুন (যেমন: /checkout)
      const redirectPath = encodeURIComponent(pathname);

      // ইউজারকে লগইন পেজে পাঠান এবং redirect URL যোগ করুন
      router.replace(`/login?redirect=${redirectPath}`);
    }
  }, [currentUser, loading, router, pathname]);

  // Auth স্টেট লোড হচ্ছে: লোডিং স্ক্রিন দেখান
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-red-600" />
      </div>
    );
  }

  // ইউজার লগইন করে আছে: চাইল্ড কম্পোনেন্ট দেখান (CheckoutContent)
  if (currentUser) {
    return <>{children}</>;
  }

  // যদি লগইন না থাকে এবং রিডাইরেক্ট হয়ে যায়, তখন null রিটার্ন করুন (এটি মূলত উপরে router.replace() হওয়ার পরেই ঘটবে)
  return null;
};

export default ProtectedRoute;
