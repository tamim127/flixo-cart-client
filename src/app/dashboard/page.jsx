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
        const { products } = await getMyProducts(currentUser.uid, 1, 1000); // 1000 limit for all products
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

  // Wait for auth
  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="text-center">
          <Loader2 className="w-20 h-20 animate-spin text-red-600 mx-auto" />
          <p className="mt-8 text-2xl font-bold text-gray-700">
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
    <div className="space-y-12 pb-20">
      {/* Welcome */}
      <div>
        <h1 className="text-5xl font-black text-gray-900">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
            {userName}!
          </span>
        </h1>
        <p className="text-xl text-gray-600 mt-3">Here's your store overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
          value={`৳ ${totalValue.toLocaleString()}`}
          color="from-green-500 to-emerald-500"
          gradient
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link
          href="/dashboard/add-product"
          className="group relative overflow-hidden bg-gradient-to-br from-red-600 to-pink-600 text-white rounded-3xl p-12 text-center hover:scale-105 transition-all duration-500 shadow-2xl"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <PlusCircle className="w-20 h-20 mx-auto mb-6 relative z-10" />
          <h3 className="text-3xl font-bold relative z-10">Add New Product</h3>
          <p className="text-white/90 mt-3 text-lg relative z-10">
            Expand your inventory
          </p>
        </Link>

        <Link
          href="/dashboard/manage-products"
          className="group relative overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-3xl p-12 text-center hover:scale-105 transition-all duration-500 shadow-2xl"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <Package className="w-20 h-20 mx-auto mb-6 relative z-10" />
          <h3 className="text-3xl font-bold relative z-10">Manage Products</h3>
          <p className="text-white/90 mt-3 text-lg relative z-10">
            Edit, update or remove items
          </p>
        </Link>
      </div>

      {/* Empty State */}
      {myAddedProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-3xl font-bold text-gray-600">
            Your store is empty
          </p>
          <p className="text-xl text-gray-500 mt-4">
            Add your first product and start selling!
          </p>
        </div>
      )}
    </div>
  );
}

// Stat Card Component
function StatCard({ icon: Icon, title, value, color, gradient }) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-xl p-8 border hover:shadow-2xl transition-all duration-300 ${
        gradient ? "hover:scale-105" : ""
      }`}
    >
      <div
        className={`p-4 rounded-2xl bg-gradient-to-br ${color} text-white w-fit shadow-lg`}
      >
        <Icon className="w-12 h-12" />
      </div>
      <p className="text-gray-600 mt-6 text-lg font-medium">{title}</p>
      <p className="text-5xl font-black text-gray-900 mt-3">{value}</p>
    </div>
  );
}
