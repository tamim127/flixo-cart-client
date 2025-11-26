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
  { name: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { name: "Addresses", href: "/dashboard/addresses", icon: MapPin },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout, loading } = useAuth();

  // Protected Route + Redirect to exact page after login
  useEffect(() => {
    if (!loading && !currentUser) {
      const currentPath = window.location.pathname + window.location.search;
      router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [currentUser, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed mt-16 inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-400 ease-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                FlixoCart
              </h1>
              <p className="text-xs text-gray-500">Seller Dashboard</p>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="w-7 h-7 text-gray-600" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b bg-gradient-to-r from-red-50 to-pink-50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {userName[0].toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-gray-900">{userName}</p>
              <p className="text-sm text-gray-600 font-medium">
                Seller Account
              </p>
            </div>
          </div>
        </div>

        {/* Navigation - সবার জন্যই দেখাবে */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 group ${
                  isActive
                    ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    isActive ? "text-white" : "group-hover:text-red-600"
                  }`}
                />
                <span>{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-red-600 hover:bg-red-50 font-semibold transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72 min-h-screen">
        {/* Mobile Top Bar */}
        <header className="lg:hidden bg-white shadow-md px-6 py-4 flex items-center justify-between fixed top-16 left-0 right-0 z-30 bg-white/95 backdrop-blur">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-8 h-8 text-gray-700" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">Seller Dashboard</h2>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center text-white font-bold">
            {userName[0].toUpperCase()}
          </div>
        </header>

        {/* Page Content */}
        <main className="pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
