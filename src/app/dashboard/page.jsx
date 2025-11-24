// src/app/dashboard/page.jsx
import Link from "next/link";
import { ShoppingBag, Package, Heart, ArrowRight } from "lucide-react";

const stats = [
  {
    name: "Total Orders",
    value: 48,
    icon: ShoppingBag,
    href: "/dashboard/orders",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Pending Delivery",
    value: 8,
    icon: Package,
    href: "/dashboard/orders?status=pending",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Wishlist Items",
    value: 23,
    icon: Heart,
    href: "/dashboard/wishlist",
    color: "from-pink-500 to-rose-500",
  },
];

const recentOrders = [
  {
    id: "ORD-2025-001",
    date: "Nov 24, 2025",
    amount: "৳ 8,499",
    status: "Delivered",
    badge: "bg-green-100 text-green-800",
  },
  {
    id: "ORD-2025-002",
    date: "Nov 23, 2025",
    amount: "৳ 5,299",
    status: "Shipped",
    badge: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "ORD-2025-003",
    date: "Nov 22, 2025",
    amount: "৳ 12,999",
    status: "Processing",
    badge: "bg-blue-100 text-blue-800",
  },
];

export default function DashboardHome() {
  return (
    <div className=" max-w-6xl space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link href={stat.href} key={stat.name}>
            <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}
                >
                  <stat.icon className="h-8 w-8" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition" />
              </div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stat.value}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
          <Link
            href="/dashboard/orders"
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900 text-lg">{order.id}</p>
                  <p className="text-sm text-gray-500 mt-1">{order.date}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${order.badge}`}
                  >
                    {order.status}
                  </span>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {order.amount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
