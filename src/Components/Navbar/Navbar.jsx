
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
  ChevronDown,
  Settings,
  Heart,
  History,
} from "lucide-react";
import { useAuth } from "@/Context/AuthContext";
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
            <nav className="hidden lg:flex items-center gap-10">
              {["Home", "Products", "Dashboard", "About", "Contact"].map(
                (item) => (
                  <Link
                    key={item}
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-gray-700 font-semibold hover:text-red-600 transition relative group text-base"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300" />
                  </Link>
                )
              )}
            </nav>

            {/* Desktop Right Side */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Search */}
              <button className="p-3 hover:bg-gray-100 rounded-full transition">
                <Search size={24} />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-3 hover:bg-gray-100 rounded-full transition group"
              >
                <ShoppingCart size={26} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User Dropdown - Hover + Click */}
              {currentUser ? (
                <div className="relative group">
                  <button className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-full transition-all duration-200">
                    <div className="w-11 h-11 bg-gradient-to-br from-red-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {currentUser.displayName?.[0] ||
                        currentUser.email[0].toUpperCase()}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-800">
                        {currentUser.displayName ||
                          currentUser.email.split("@")[0]}
                      </p>
                      <p className="text-xs text-gray-500">My Account</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500 group-hover:rotate-180 transition-transform" />
                  </button>

                  {/* Dropdown - Hover + Click */}
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    {/* Header */}
                    <div className="p-5 bg-gradient-to-r from-red-50 to-pink-50 border-b">
                      <p className="font-bold text-gray-900 text-lg">
                        Hello, {currentUser.displayName || "Seller"}!
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {currentUser.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition"
                      >
                        <User className="w-5 h-5 text-red-600" />
                        <span className="font-medium">My Dashboard</span>
                      </Link>
                      <Link
                        href="/dashboard/add-product"
                        className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition"
                      >
                        <PlusCircle className="w-5 h-5 text-red-600" />
                        <span className="font-medium">Add New Product</span>
                      </Link>
                      <Link
                        href="/dashboard/manage-products"
                        className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition"
                      >
                        <Package className="w-5 h-5 text-red-600" />
                        <span className="font-medium">Manage Products</span>
                      </Link>
                      
                      <Link
                        href="/dashboard/wishlist"
                        className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition"
                      >
                        <Heart className="w-5 h-5 text-red-600" />
                        <span className="font-medium">Wishlist</span>
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition"
                      >
                        <Settings className="w-5 h-5 text-red-600" />
                        <span className="font-medium">Account Settings</span>
                      </Link>
                    </div>

                    {/* Sign Out */}
                    <div className="border-t pt-2 mt-2">
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-red-50 text-red-600 font-semibold transition"
                      >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="px-8 py-3.5 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-red-600/40 transition-all active:scale-95 text-lg"
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
