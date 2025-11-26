// components/Navbar/Navbar.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  PlusCircle,
  Package,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/Context/CartContext";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLoginClick = () => {
    const redirectTo = encodeURIComponent(
      pathname === "/" ? "/dashboard" : pathname
    );
    router.push(`/login?redirect=${redirectTo}`);
  };

  return (
    <>
      {/* Main Navbar */}
      <header className="fixed left-0 right-0 top-0 bg-white/95 backdrop-blur-md shadow-lg z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 lg:w-12 lg:h-12">
                <Image
                  src="/logo.png"
                  alt="FlixoCart"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                FlixoCart
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {["Home", "Products", "Dashboard", "About", "Contact"].map(
                (item) => (
                  <Link
                    key={item}
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-gray-700 font-medium hover:text-red-600 transition relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300" />
                  </Link>
                )
              )}
            </nav>

            {/* Desktop Right Icons */}
            <div className="hidden lg:flex items-center gap-4">
              <button className="p-3 hover:bg-gray-100 rounded-full transition">
                <Search size={22} />
              </button>

              <Link
                href="/cart"
                className="relative p-3 hover:bg-gray-100 rounded-full transition group"
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User Dropdown */}
              {currentUser ? (
                <div className="relative group">
                  <button className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-full transition">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {currentUser.displayName?.[0] ||
                        currentUser.email[0].toUpperCase()}
                    </div>
                    <span className="font-medium hidden xl:block">
                      {currentUser.displayName ||
                        currentUser.email.split("@")[0]}
                    </span>
                  </button>

                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                    <div className="p-4 border-b bg-gradient-to-r from-red-50 to-pink-50">
                      <p className="font-bold text-gray-900">
                        {currentUser.displayName || "Seller"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {currentUser.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50"
                    >
                      <User className="w-5 h-5" /> My Dashboard
                    </Link>
                    <Link
                      href="/dashboard/add-product"
                      className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50"
                    >
                      <PlusCircle className="w-5 h-5" /> Add Product
                    </Link>
                    <Link
                      href="/dashboard/manage-products"
                      className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50"
                    >
                      <Package className="w-5 h-5" /> Manage Products
                    </Link>
                    <div className="border-t mt-2 pt-2">
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-600 font-medium"
                      >
                        <LogOut className="w-5 h-5" /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-full hover:shadow-xl hover:shadow-red-600/30 transition active:scale-95"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-3 hover:bg-gray-100 rounded-full transition"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <Link
                href="/"
                className="flex items-center gap-3"
                onClick={() => setIsOpen(false)}
              >
                <div className="relative w-12 h-12">
                  <Image
                    src="/logo.png"
                    alt="FlixoCart"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-black text-red-600">
                  FlixoCart
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 hover:bg-gray-100 rounded-full"
              >
                <X size={28} />
              </button>
            </div>

            <nav className="p-6 space-y-4">
              {["Home", "Products", "Dashboard", "About", "Contact"].map(
                (item) => (
                  <Link
                    key={item}
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="block py-4 px-2 text-lg font-medium text-gray-800 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                  >
                    {item}
                  </Link>
                )
              )}

              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-4 px-2 text-lg font-medium text-gray-800 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6" />
                  <span>My Cart</span>
                </div>
                {totalItems > 0 && (
                  <span className="bg-red-600 text-white text-sm px-3 py-1 rounded-full font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>

              <div className="pt-6 border-t">
                {currentUser ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                        {currentUser.displayName?.[0] ||
                          currentUser.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold">
                          {currentUser.displayName || "Seller"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/dashboard/add-product"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 py-3 px-4 hover:bg-gray-100 rounded-xl"
                    >
                      <PlusCircle className="w-5 h-5 text-red-600" /> Add
                      Product
                    </Link>
                    <Link
                      href="/dashboard/manage-products"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 py-3 px-4 hover:bg-gray-100 rounded-xl"
                    >
                      <Package className="w-5 h-5 text-red-600" /> Manage
                      Products
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 py-3 px-4 hover:bg-red-50 text-red-600 font-medium rounded-xl"
                    >
                      <LogOut className="w-5 h-5" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleLoginClick();
                      }}
                      className="w-full text-center py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl transition"
                    >
                      Login
                    </button>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="block text-center py-4 border-2 border-red-600 text-red-600 font-bold rounded-xl hover:bg-red-50 transition"
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
