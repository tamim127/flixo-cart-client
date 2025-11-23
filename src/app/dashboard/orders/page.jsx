import React from "react";
import { ShoppingBag, Search } from "lucide-react";
import Link from "next/link";
// যদি Shadcn UI ব্যবহার করেন, তবে Table কম্পোনেন্ট ইম্পোর্ট করুন
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const OrdersPage = () => {
  // প্রোডাকশন লেভেলে এই ডেটা API থেকে ফেচ করা হবে
  const orders = [
    { id: "#ABCD123", date: "Nov 22, 2025", total: 5200, status: "Delivered" },
    { id: "#WXYZ987", date: "Nov 15, 2025", total: 3450, status: "Shipped" },
    { id: "#EFGH456", date: "Nov 10, 2025", total: 1890, status: "Processing" },
    { id: "#IJKL789", date: "Oct 30, 2025", total: 7800, status: "Canceled" },
  ];

  const getStatusBadge = (status) => {
    let colorClass = "";
    switch (status) {
      case "Delivered":
        colorClass = "bg-green-100 text-green-800";
        break;
      case "Shipped":
        colorClass = "bg-yellow-100 text-yellow-800";
        break;
      case "Processing":
        colorClass = "bg-blue-100 text-blue-800";
        break;
      case "Canceled":
        colorClass = "bg-red-100 text-red-800";
        break;
      default:
        colorClass = "bg-gray-100 text-gray-800";
    }
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
          <ShoppingBag className="h-7 w-7 mr-3 text-indigo-600" />
          My Orders
        </h2>
        {/* সার্চ বার (প্রোডাকশনে ফর্মে মুভ করতে হবে) */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Order Table (Tailwind CSS based) */}
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-gray-900">
                  ৳ {order.total.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/dashboard/orders/${order.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* পেজিনেশন কম্পোনেন্ট এখানে যুক্ত করুন */}
      {/* <Pagination /> */}
    </div>
  );
};

export default OrdersPage;
