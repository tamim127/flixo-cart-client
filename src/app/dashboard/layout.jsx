// src/app/dashboard/layout.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  ShoppingBag,
  Heart,
  MapPin,
  User,
  LogOut,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/Context/AuthContext";

const adminNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Add Product", href: "/dashboard/add-product", icon: PlusCircle },
  {
    name: "Manage Products",
    href: "/dashboard/manage-products",
    icon: Package,
  },
];

const userNavItems = [
  { name: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { name: "Addresses", href: "/dashboard/addresses", icon: MapPin },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, loading, logout } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login"); // ✅ safe in useEffect
    }
  }, [currentUser, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  // currentUser না থাকলে loading spinner বা null দেখাও
  if (!currentUser) return null;


  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const isActive = (path) =>
    pathname === path || pathname.startsWith(path + "/");
  const userName =
    currentUser.displayName || currentUser.email?.split("@")[0] || "User";

  return (
    <div className="  max-w-7xl bg-gray-50 flex flex-col lg:flex-row">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Flixo
            </h1>
            <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-8">
            {/* Admin Section */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">
                Management
              </h3>
              {adminNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-md border border-indigo-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 transition-colors ${
                      isActive(item.href)
                        ? "text-indigo-700"
                        : "text-gray-500 group-hover:text-gray-700"
                    }`}
                  />
                  <span>{item.name}</span>
                  {isActive(item.href) && (
                    <div className="ml-auto w-1 h-8 bg-indigo-600 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* User Section */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">
                My Account
              </h3>
              {userNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-md border border-indigo-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 transition-colors ${
                      isActive(item.href)
                        ? "text-indigo-700"
                        : "text-gray-500 group-hover:text-gray-700"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Logout */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar - Mobile Menu Button */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 lg:hidden flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 hover:text-indigo-600"
          >
            <Menu className="h-7 w-7" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Welcome back,{" "}
                <span className="text-indigo-600">{userName}!</span>
              </h1>
              <p className="text-gray-600 mt-2">
                Here's what's happening with your store today.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 min-h-[600px]">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
