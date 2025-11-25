

"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";
import { getAllProductsForAdmin, deleteProduct } from "@/lib/api";
import {
  Package,
  PlusCircle,
  Edit,
  Trash2,
  Loader2,
  Search,
  Eye,
} from "lucide-react";

const ManageProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();

   

  useEffect(() => {
    if (!authLoading && !currentUser) router.replace("/login");
  }, [currentUser, authLoading, router]);

  const fetchAllProducts = useCallback(async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError("");
      const allProducts = await getAllProductsForAdmin(); // Latest first guaranteed
      setProducts(allProducts);
    } catch (err) {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) fetchAllProducts();
  }, [currentUser, fetchAllProducts]);

  const handleDelete = async (id) => {
    if (!confirm("Do You Want this Product Permanently?")) return;

    try {
      setDeletingId(id);
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Product deleted successfully!");
    } catch (err) {
      alert("Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const term = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.title?.toLowerCase().includes(term) ||
        p._id?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  if (authLoading || (!currentUser && !loading)) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <Package className="w-10 h-10 text-indigo-600" />
              Manage Products
            </h1>
            <p className="text-gray-600 mt-2">
              Total:{" "}
              <span className="font-bold text-indigo-600">
                {products.length}
              </span>{" "}
              products
            </p>
          </div>

          <Link href="/dashboard/add-product">
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition">
              <PlusCircle className="w-5 h-5" />
              Add New Product
            </button>
          </Link>
        </div>

        <div className="mb-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, ID, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-20">
                      <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto mb-4" />
                      <p className="text-gray-600">Loading products...</p>
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-24 text-gray-500 text-lg"
                    >
                      {searchTerm
                        ? `No results for "${searchTerm}"`
                        : "No products found"}
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-12 h-12 rounded-lg object-cover border shadow-sm"
                          />
                          <div>
                            <div className="font-medium text-gray-900 line-clamp-1">
                              {product.title}
                            </div>
                            <div className="text-xs text-gray-500 font-mono">
                              ID: {product._id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <span className="font-bold text-gray-900">
                            ৳{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="block text-xs text-gray-500 line-through">
                              ৳{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            product.stock > 10
                              ? "bg-green-100 text-green-800"
                              : product.stock > 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.stock || 0} in stock
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            href={`/products/${product._id}`}
                            className="text-gray-500 hover:text-indigo-600"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                          <Link
                            href={`/dashboard/manage-products/${product._id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            disabled={deletingId === product._id}
                            className="text-red-600 hover:text-red-800 disabled:opacity-50"
                          >
                            {deletingId === product._id ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <Trash2 className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProductsPage;
