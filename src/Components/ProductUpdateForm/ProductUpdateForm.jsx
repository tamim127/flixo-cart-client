// src/app/dashboard/manage-products/[id]/page.jsx   (এই ফোল্ডার স্ট্রাকচারে রাখো)

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"; // এইটা দরকার!
import { Save, Loader2, ArrowLeft } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProductUpdateForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: 0,
    priority: "medium",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    if (!id) {
      setError("Product ID not found in URL");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch product: ${res.status} ${errorText}`);
      }

      const data = await res.json();

      if (!data || Object.keys(data).length === 0) {
        throw new Error("Product not found");
      }

      setFormData({
        title: data.title || "",
        shortDescription: data.shortDescription || "",
        fullDescription: data.fullDescription || "",
        price: data.price || 0,
        priority: data.priority || "medium",
        imageUrl: data.imageUrl || "",
      });
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to load product. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Update failed: ${res.status} ${errorText}`);
      }

      alert("Product updated successfully!");
      router.push("/dashboard/manage-products");
    } catch (err) {
      console.error(err);
      setError("Failed to update product: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
        <p className="mt-4 text-gray-600">Loading product details...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-700 px-6 py-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Error Loading Product</h2>
        <p className="mb-6">{error}</p>
        <Link
          href="/dashboard/manage-products"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Product List
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/dashboard/manage-products"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Product List
      </Link>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">
        Edit Product:{" "}
        <span className="text-indigo-600">
          {formData.title || "Loading..."}
        </span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-8 rounded-2xl shadow-lg border"
      >
        {formData.imageUrl && (
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Current Image
            </label>
            <img
              src={formData.imageUrl}
              alt="Product preview"
              className="w-48 h-auto rounded-lg border shadow-md object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (৳)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description
          </label>
          <textarea
            name="shortDescription"
            rows="3"
            value={formData.shortDescription}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Description
          </label>
          <textarea
            name="fullDescription"
            rows="6"
            value={formData.fullDescription}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="pt-6 border-t">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition shadow-md"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-3" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdateForm;
