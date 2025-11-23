import React from "react";
import { ShoppingBag, Heart, Package, ArrowRight } from "lucide-react";
import Link from "next/link";

// ডামি ডেটা (প্রোডাকশনে আপনার API থেকে ফেচ করতে হবে)
const stats = [
  {
    name: "Total Orders",
    value: 12,
    icon: ShoppingBag,
    href: "/dashboard/orders",
  },
  {
    name: "Pending Shipments",
    value: 3,
    icon: Package,
    href: "/dashboard/orders?status=pending",
  },
  {
    name: "Items in Wishlist",
    value: 15,
    icon: Heart,
    href: "/dashboard/wishlist",
  },
];

const DashboardHome = () => {
  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-4">
        Welcome Back!
      </h2>

      {/* 📊 Key Stats Section */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-10">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-indigo-50 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="flex items-center justify-between">
              <item.icon className="h-8 w-8 text-indigo-600" />
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">
                  {item.name}
                </p>
                <p className="text-3xl font-bold text-gray-900">{item.value}</p>
              </div>
            </div>
            <Link
              href={item.href}
              className="mt-4 flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
            >
              View Details
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>

      {/* 📦 Recent Orders Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Recent Orders
        </h3>
        <div className="bg-white border rounded-lg overflow-hidden">
          {/* ডামি অর্ডার তালিকা (প্রোডাকশনে ডেটা ফেচ করে এখানে টেবিল বা লিস্ট ব্যবহার করুন) */}
          <ul className="divide-y divide-gray-200">
            <li className="p-4 flex justify-between items-center hover:bg-gray-50">
              <div>
                <p className="font-semibold text-gray-900">Order #ABCD123</p>
                <p className="text-sm text-gray-500">Date: Nov 22, 2025</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Delivered
                </span>
                <p className="font-bold text-lg">৳ 5,200</p>
              </div>
            </li>
            <li className="p-4 flex justify-between items-center hover:bg-gray-50">
              <div>
                <p className="font-semibold text-gray-900">Order #WXYZ987</p>
                <p className="text-sm text-gray-500">Date: Nov 15, 2025</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  Shipped
                </span>
                <p className="font-bold text-lg">৳ 3,450</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/dashboard/oders"
            className="inline-flex items-center text-base font-medium text-indigo-600 hover:text-indigo-800"
          >
            View All Orders
            <ArrowRight className="ml-1 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
