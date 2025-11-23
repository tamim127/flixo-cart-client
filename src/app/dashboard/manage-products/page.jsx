// src/app/dashboard/manage-products/page.jsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";
import { getProducts, deleteProduct } from "@/lib/api";
import {
  Package,
  PlusCircle,
  Edit,
  Trash2,
  Loader2,
  Search,
  Eye,
} from "lucide-react";

// Loading Row
const LoadingRow = () => (
  <tr>
    <td colSpan="5" className="px-6 py-16 text-center">
      <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mx-auto mb-4" />
      <p className="text-gray-600">Loading products...</p>
    </td>
  </tr>
);

// Empty State
const EmptyState = ({ message = "No products available yet." }) => (
  <tr>
    <td colSpan="5" className="px-6 py-24 text-center">
      <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <p className="text-lg text-gray-500">{message}</p>
    </td>
  </tr>
);

// Product Row Component
const ProductRow = ({ product, isDeleting, onDelete }) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4">
      <div className="flex items-center gap-4">
        <img
          src={product.imageUrl || "https://via.placeholder.com/40"}
          alt={product.title}
          className="h-10 w-10 rounded-lg object-cover border"
        />
        <div>
          <div className="font-medium text-gray-900">{product.title}</div>
          <div className="text-xs text-gray-500 font-mono">
            ID: {product._id}
          </div>
        </div>
      </div>
    </td>

    <td className="px-6 py-4 text-sm font-bold text-gray-900">
      ${product.price?.toLocaleString() || "0"}
    </td>

    <td className="px-6 py-4 text-sm text-gray-600">
      {product.discountPercentage ? `${product.discountPercentage}%` : "—"}
    </td>

    <td className="px-6 py-4 text-sm">
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
      <div className="flex items-center justify-end gap-4">
        <Link
          href={`/products/${product._id}`}
          className="text-gray-500 hover:text-indigo-600"
          title="View"
        >
          <Eye className="w-5 h-5" />
        </Link>

        <Link
          href={`/dashboard/manage-products/${product._id}`}
          className="text-indigo-600 hover:text-indigo-900"
          title="Edit"
        >
          <Edit className="w-5 h-5" />
        </Link>

        <button
          onClick={() => onDelete(product._id)}
          disabled={isDeleting}
          className="text-red-600 hover:text-red-800 disabled:opacity-50"
          title="Delete"
        >
          {isDeleting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Trash2 className="w-5 h-5" />
          )}
        </button>
      </div>
    </td>
  </tr>
);

const ManageProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect unauthenticated users
  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, authLoading, router]);

  // Fetch products with robust response handling
  const fetchProducts = useCallback(async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError("");

      const response = await getProducts();

      // Handle all possible API response formats safely
      let productList = [];

      if (Array.isArray(response)) {
        productList = response;
      } else if (response && typeof response === "object") {
        productList =
          response.products ||
          response.data ||
          response.result ||
          response.items ||
          [];
      }

      setProducts(productList);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products. Please try again later.");
      setProducts([]); // Always keep it as array
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && !authLoading) {
      fetchProducts();
    }
  }, [currentUser, authLoading, fetchProducts]);

  // Delete handler
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this product?")) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Failed to delete product. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Search filter (100% safe)
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    if (!searchTerm.trim()) return products;

    const term = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.title?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term) ||
        p._id?.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  // Auth loading screen
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Package className="w-10 h-10 text-indigo-600" />
            Manage Products
            <span className="text-xl font-normal text-gray-500 ml-2">
              ({products.length})
            </span>
          </h1>

          <Link href="/dashboard/add-product">
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition">
              <PlusCircle className="w-5 h-5" />
              Add New Product
            </button>
          </Link>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, category, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <LoadingRow />
                ) : filteredProducts.length === 0 ? (
                  <EmptyState
                    message={
                      searchTerm
                        ? `No products found for "${searchTerm}"`
                        : "No products available yet."
                    }
                  />
                ) : (
                  filteredProducts.map((product) => (
                    <ProductRow
                      key={product._id}
                      product={product}
                      isDeleting={deletingId === product._id}
                      onDelete={handleDelete}
                    />
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
