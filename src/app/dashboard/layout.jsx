// app/dashboard/layout.jsx
"use client";

import { useState, useEffect } from "react";
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
  Home,
} from "lucide-react";
import { useAuth } from "@/Context/AuthContext";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Add Product", href: "/dashboard/add-product", icon: PlusCircle },
  {
    name: "Manage Products",
    href: "/dashboard/manage-products",
    icon: Package,
  },
  
  { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { name: "Addresses", href: "/dashboard/addresses", icon: MapPin },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout, loading } = useAuth();

  // Protected Route + Redirect
  useEffect(() => {
    if (!loading && !currentUser) {
      const currentPath = window.location.pathname + window.location.search;
      router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [currentUser, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!currentUser) return null;

  const userName =
    currentUser.displayName || currentUser.email?.split("@")[0] || "Seller";

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 z-50 w-64 sm:w-72 h-full bg-white shadow-xl transform transition-transform duration-300 ease-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-red-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-black bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                FlixoCart
              </h1>
              <p className="text-xs text-gray-500">Seller Dashboard</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* User Info */}
        <div className="px-4 py-4 sm:px-6 sm:py-6 border-b bg-red-50/50">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-md">
              {userName[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900 truncate">{userName}</p>
              <p className="text-xs sm:text-sm text-gray-600">Seller Account</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 sm:px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow"
                    : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
                }`}
              >
                <item.icon
                  className={`w-4 sm:w-5 h-4 sm:h-5 ${
                    isActive ? "text-white" : "group-hover:text-red-600"
                  }`}
                />
                <span className="truncate">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 sm:px-4 py-3 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 font-medium transition"
          >
            <LogOut className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="text-sm sm:text-base">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 min-h-screen">
        {/* Mobile Topbar */}
        <header className="lg:hidden fixed top-16 left-0 right-0 z-30 bg-white/95 backdrop-blur px-3 sm:px-6 py-2.5 sm:py-3 shadow-md flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-1">
            <Menu className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
          </button>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
            Seller Dashboard
          </h2>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm sm:text-lg">
            {userName[0].toUpperCase()}
          </div>
        </header>

        {/* Page Content */}
        <main className="pt-20 lg:pt-24 px-2 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
