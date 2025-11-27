// app/dashboard/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/Context/AuthContext";
import { getMyProducts } from "@/lib/api";
import toast from "react-hot-toast";
import {
  Package,
  PlusCircle,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Loader2,
} from "lucide-react";

export default function DashboardHome() {
  const { currentUser, loading: authLoading } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const userName =
    currentUser?.displayName || currentUser?.email?.split("@")[0] || "Seller";

  useEffect(() => {
    if (!currentUser?.uid) return;

    const loadProducts = async () => {
      try {
        setLoading(true);
        const { products } = await getMyProducts(currentUser.uid, 1, 1000);
        setProducts(products);
      } catch (err) {
        console.error("Failed to load products:", err);
        toast.error("Failed to load your store data");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [currentUser?.uid]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-red-600 mx-auto" />
          <p className="mt-6 text-xl font-semibold text-gray-700">
            Loading your store...
          </p>
        </div>
      </div>
    );
  }

  // Calculations
  const myAddedProducts = products.filter(
    (p) => p.sellerId === currentUser?.uid
  );
  const totalProducts = products.length;
  const inStock = products.filter((p) => p.stock > 0).length;
  const totalValue = myAddedProducts.reduce(
    (sum, p) => sum + (p.price || 0) * (p.stock || 0),
    0
  );

  return (
    <div className="space-y-10 pb-16">
      {/* Welcome */}
      <div className="px-2 sm:px-0">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            {userName}!
          </span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mt-2">
          Here's your store overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        <StatCard
          icon={Package}
          title="Your Products"
          value={myAddedProducts.length}
          color="from-purple-500 to-pink-500"
          gradient
        />
        <StatCard
          icon={ShoppingBag}
          title="Total Listed"
          value={totalProducts}
          color="from-blue-500 to-cyan-500"
          gradient
        />
        <StatCard
          icon={TrendingUp}
          title="In Stock"
          value={inStock}
          color="from-orange-500 to-red-500"
          gradient
        />
        <StatCard
          icon={DollarSign}
          title="Total Value"
          value={`$ ${totalValue.toLocaleString()}`}
          color="from-green-500 to-emerald-500"
          gradient
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto px-2 sm:px-0">
        <Link
          href="/dashboard/add-product"
          className="group relative overflow-hidden bg-gradient-to-br from-red-600 to-pink-600 text-white rounded-2xl p-8 sm:p-12 text-center hover:scale-[1.02] transition-all duration-500 shadow-xl"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <PlusCircle className="w-14 sm:w-20 h-14 sm:h-20 mx-auto mb-4 sm:mb-6 relative z-10" />
          <h3 className="text-xl sm:text-3xl font-bold relative z-10">
            Add New Product
          </h3>
          <p className="text-white/90 mt-2 sm:mt-3 text-sm sm:text-lg relative z-10">
            Expand your inventory
          </p>
        </Link>

        <Link
          href="/dashboard/manage-products"
          className="group relative overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-2xl p-8 sm:p-12 text-center hover:scale-[1.02] transition-all duration-500 shadow-xl"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <Package className="w-14 sm:w-20 h-14 sm:h-20 mx-auto mb-4 sm:mb-6 relative z-10" />
          <h3 className="text-xl sm:text-3xl font-bold relative z-10">
            Manage Products
          </h3>
          <p className="text-white/90 mt-2 sm:mt-3 text-sm sm:text-lg relative z-10">
            Edit, update or remove items
          </p>
        </Link>
      </div>

      {/* Empty State */}
      {myAddedProducts.length === 0 && (
        <div className="text-center py-10 sm:py-16 px-2">
          <p className="text-2xl sm:text-3xl font-bold text-gray-600">
            Your store is empty
          </p>
          <p className="text-base sm:text-xl text-gray-500 mt-2 sm:mt-4">
            Add your first product and start selling!
          </p>
        </div>
      )}
    </div>
  );
}

// ================= STAT CARD =================

function StatCard({ icon: Icon, title, value, color, gradient }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:p-8 border hover:shadow-xl transition-all duration-300 ${
        gradient ? "hover:scale-[1.02]" : ""
      }`}
    >
      <div
        className={`p-3 sm:p-4 rounded-xl bg-gradient-to-br ${color} text-white w-fit shadow-lg`}
      >
        <Icon className="w-8 h-8 sm:w-12 sm:h-12" />
      </div>

      <p className="text-gray-600 mt-4 sm:mt-6 text-sm sm:text-lg font-medium">
        {title}
      </p>

      <p className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 mt-2 sm:mt-3">
        {value}
      </p>
    </div>
  );
}
