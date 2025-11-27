// src/components/ProtectedRoute.jsx
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Loader2 } from "lucide-react";
import { useAuth } from "@/Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !currentUser) {
      const redirectPath = encodeURIComponent(pathname);

      router.replace(`/login?redirect=${redirectPath}`);
    }
  }, [currentUser, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-red-600" />
      </div>
    );
  }

  if (currentUser) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;
