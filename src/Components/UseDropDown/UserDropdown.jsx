"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/Context/AuthContext";


export default function UserDropdown({ user, mobile = false }) {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth(); 
  return (
    <div className={`relative ${mobile ? "mt-2" : ""}`}>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
      >
        {user.displayName || user.email}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 flex flex-col z-50">
          <Link
            href="/dashboard/add-product"
            className="px-4 py-2 hover:bg-gray-100 transition"
          >
            Add Product
          </Link>
          <Link
            href="/dashboard/manage-products"
            className="px-4 py-2 hover:bg-gray-100 transition"
          >
            Manage Products
          </Link>
          <button
            onClick={logout}
            className="px-4 py-2 text-red-600 hover:bg-gray-100 transition text-left"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
