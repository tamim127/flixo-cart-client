// src/app/dashboard/layout.jsx (Updated)
"use client";

import Link from "next/link";

import { redirect, usePathname } from "next/navigation";
import {
  Package,
  ShoppingBag,
  User,
  Settings,
  PlusCircle,
  LayoutDashboard,
  LogOut,
  Heart,
  MapPin,
  ListPlus, // নতুন আইকন
} from "lucide-react";
import { signOut } from "firebase/auth";
// import LoadingSpinner from '@/components/LoadingSpinner';

const adminNavItems = [
  { name: "Admin Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Add Product (C)", href: "/dashboard/add-product", icon: PlusCircle },
  {
    name: "Manage Products (RUD)",
    href: "/dashboard/manage-products",
    icon: Package,
  },
];

const userNavItems = [
  { name: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { name: "Addresses", href: "/dashboard/addresses", icon: MapPin },
  { name: "Profile Settings", href: "/dashboard/profile", icon: User },
];

const DashboardLayout = ({ children }) => {

  const pathname = usePathname();

  // (Loading and authentication check logic remains the same)
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }
  

  return (
    <div className="max-w-7xl mx-auto flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-4 fixed h-full hidden lg:block overflow-y-auto">
        <div className="mb-8 pt-4">
          <h1 className="text-2xl font-bold text-indigo-700">
            Flixo Dashboard
          </h1>
        </div>

        {/* --- 📦 ADMIN Navigation --- */}
        <h3 className="text-xs font-semibold uppercase text-gray-400 mb-2 mt-4">
          Admin & Inventory
        </h3>
        <nav className="space-y-2">
          {adminNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition duration-150 ease-in-out ${
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href))
                  ? "bg-indigo-50 text-indigo-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* --- 👤 USER Navigation --- */}
        <h3 className="text-xs font-semibold uppercase text-gray-400 mb-2 mt-6">
          My Account
        </h3>
        <nav className="space-y-2">
          {userNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition duration-150 ease-in-out ${
                pathname === item.href
                  ? "bg-indigo-50 text-indigo-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Logout Button (Positioning adjusted for scroll) */}
        <div className="py-4 border-t mt-8">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center px-3 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition duration-150"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content (The structure remains the same) */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <header className="bg-white p-6 rounded-xl shadow-md mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            Welcome, {"Admin"}!
          </h2>
        </header>
        <div className="max-w-7xl mx-auto  bg-white  p-6 rounded-xl shadow-md min-h-[80vh]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
