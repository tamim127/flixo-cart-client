"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/Context/AuthContext";
import toast from "react-hot-toast";
import { getMyProducts, deleteProduct } from "@/lib/api";
import {
  Package,
  PlusCircle,
  Trash2,
  Edit,
  Search,
  Loader2,
  X,
} from "lucide-react";

export default function ManageProducts() {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const page = useRef(1);
  const limit = 12;

  const fetchProducts = useCallback(
    async (pageNum = 1, append = false) => {
      if (!currentUser?.uid) return;

      try {
        pageNum === 1 ? setLoading(true) : setLoadingMore(true);

        const { products: newProducts, hasMore: more } = await getMyProducts(
          currentUser.uid,
          pageNum,
          limit
        );

        setProducts((prev) =>
          append ? [...prev, ...newProducts] : newProducts
        );
        setHasMore(more);
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Failed to load your products");
        setHasMore(false);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [currentUser?.uid]
  );

  useEffect(() => {
    if (currentUser?.uid) {
      page.current = 1;
      setProducts([]);
      fetchProducts(1, false);
    }
  }, [currentUser?.uid, fetchProducts]);

  const observer = useRef();
  const lastProductRef = useCallback(
    (node) => {
      if (loadingMore || !hasMore || searchTerm) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          page.current += 1;
          fetchProducts(page.current, true);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingMore, hasMore, fetchProducts, searchTerm]
  );

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeletingId(id);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Loader2 className="w-20 h-20 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br rounded-2xl from-gray-50 via-white to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-5xl font-black text-gray-900 flex items-center gap-4">
              <Package className="w-14 h-14 text-red-600" />
              My Products
            </h1>
            <p className="text-xl text-gray-600 mt-3">
              You have{" "}
              <span className="font-bold text-red-600">{products.length}</span>{" "}
              products live
            </p>
          </div>

          <Link href="/dashboard/add-product">
            <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:scale-105 transition flex items-center gap-3">
              <PlusCircle className="w-8 h-8" /> Add New Product
            </button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mb-10">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, brand, category or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-12 py-5 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-red-200 focus:border-red-500 text-lg shadow-lg transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <div className="bg-gray-100 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
              <Package className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-700 mb-4">
              {searchTerm ? "No products found" : "No products yet"}
            </h3>
            <p className="text-gray-500 text-lg mb-8">
              {searchTerm
                ? "Try searching with different keywords"
                : "Start selling by adding your first product!"}
            </p>
            {!searchTerm && (
              <Link href="/dashboard/add-product">
                <button className="bg-red-600 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-red-700 shadow-xl">
                  Add Your First Product
                </button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product._id}
                ref={
                  index === filteredProducts.length - 1 ? lastProductRef : null
                }
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 relative"
              >
                <div className="relative">
                  <Image
                    src={
                      product.thumbnail ||
                      product.images?.[0] ||
                      "/placeholder.jpg"
                    }
                    alt={product.title}
                    width={400}
                    height={300}
                    className="w-full h-64 md:h-72 lg:h-80 xl:h-96 object-cover"
                    placeholder="blur"
                    blurDataURL="/placeholder.jpg"
                  />
                  {/* Always show buttons on mobile */}
                  <div className="absolute bottom-3 left-3 flex gap-3">
                    <Link
                      href={`/dashboard/manage-products/${product._id}`}
                      className="bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      disabled={deletingId === product._id}
                      className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 disabled:opacity-70"
                    >
                      {deletingId === product._id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {product.brand} • {product.category}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-3xl font-black text-gray-900">
                        ${product.price.toLocaleString()}
                      </span>
                      {product.discountPercentage > 0 && (
                        <span className="block text-sm text-gray-500 line-through">
                          $
                          {product.originalPrice?.toLocaleString() ||
                            Math.round(
                              product.price /
                                (1 - product.discountPercentage / 100)
                            ).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold ${
                        product.stock > 10
                          ? "bg-green-100 text-green-800"
                          : product.stock > 0
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock} left
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {loadingMore && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-red-600" />
          </div>
        )}
      </div>
    </div>
  );
}
