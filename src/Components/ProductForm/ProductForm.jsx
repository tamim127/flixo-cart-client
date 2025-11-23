// src/components/ProductForm.jsx (Complete Implementation)
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  Loader2,
  ArrowLeft,
  Package,
  Edit,
  PlusCircle,
} from "lucide-react";
import { getProductById, createProduct, updateProduct } from "@/lib/api";
import { useAuth } from "@/Context/AuthContext";
 // Auth context for protection

// Initial State based on your JSON structure (minimal fields required for a form)
const initialFormData = {
  title: "",
  description: "",
  category: "",
  price: 0,
  discountPercentage: 0,
  stock: 1,
  brand: "",
  thumbnail: "", // The imageUrl source
};

const ProductForm = ({ productId = null }) => {
  const isEditing = !!productId;
  const router = useRouter();
  const { currentUser, loading: authLoading } = useAuth();

  // --- State Declarations ---
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Authentication Check ---
  useEffect(() => {
    if (!authLoading && !currentUser) {
      // Unauthenticated users redirected to login
      router.push("/login");
    }
  }, [currentUser, authLoading, router]);

  // --- R: Load Data for Editing (GET /products/:id) ---
  const fetchProductData = useCallback(async () => {
    if (!isEditing || !currentUser) return; // Only fetch if editing and authenticated

    setLoading(true);
    setError(null);
    try {
      // Note: getProductById returns the processed product, but we need raw data for the form
      const rawData = await getProductById(productId);

      // Map the processed data back to the raw form state (optional: use raw data if possible)
      setFormData({
        title: rawData.title || "",
        description: rawData.description || "",
        category: rawData.category || "",
        price: rawData.price || 0,
        discountPercentage: rawData.discountPercentage || 0,
        stock: rawData.stock || 1,
        brand: rawData.brand || "",
        thumbnail: rawData.thumbnail || "",
      });
    } catch (err) {
      setError(`Failed to load product details: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [isEditing, productId, currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchProductData();
    }
  }, [fetchProductData, currentUser]);

  // --- Input Handlers ---
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  // --- C/U: Handle Submission (POST/PUT /products) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Remove _id from data before sending to backend (if present)
    const { _id, originalPrice, imageUrl, ...dataToSend } = formData;

    try {
      if (isEditing) {
        await updateProduct(productId, dataToSend);
        alert("Product updated successfully!");
      } else {
        await createProduct(dataToSend);
        alert("Product added successfully!");
        setFormData(initialFormData); // Reset form for new addition
      }
      // Redirect after successful operation
      router.push("/dashboard/manage-products");
    } catch (error) {
      setError(`Submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="text-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mx-auto" />
        <p className="mt-4 text-xl text-gray-600">
          {isEditing ? "Loading product data..." : "Authenticating..."}
        </p>
      </div>
    );
  }

  if (!currentUser) {
    return null; // Should be redirected by useEffect
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <header className="border-b pb-5 mb-8">
        <Link
          href="/dashboard/manage-products"
          className="text-indigo-600 hover:text-indigo-800 flex items-center mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Product List
        </Link>
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
          {isEditing ? (
            <Edit className="w-8 h-8 text-indigo-600" />
          ) : (
            <PlusCircle className="w-8 h-8 text-indigo-600" />
          )}
          {isEditing ? `Edit Product: ${formData.title}` : "Add New Product"}
        </h1>
      </header>

      {error && (
        <div
          className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
          role="alert"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Basic Details Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">
            Product Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <label className="block">
              <span className="text-gray-700 font-semibold">Title</span>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>
            {/* Category */}
            <label className="block">
              <span className="text-gray-700 font-semibold">Category</span>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>
          </div>

          {/* Description */}
          <label className="block mt-6">
            <span className="text-gray-700 font-semibold">Description</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
        </div>

        {/* Pricing & Stock Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">
            Pricing & Inventory
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price */}
            <label className="block">
              <span className="text-gray-700 font-semibold">
                Current Price (৳)
              </span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>
            {/* Discount Percentage */}
            <label className="block">
              <span className="text-gray-700 font-semibold">Discount (%)</span>
              <input
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                required
                min="0"
                max="100"
                step="0.1"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>
            {/* Stock */}
            <label className="block">
              <span className="text-gray-700 font-semibold">
                Stock Quantity
              </span>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">
            Media & Brand
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Brand */}
            <label className="block">
              <span className="text-gray-700 font-semibold">Brand</span>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>
            {/* Thumbnail URL */}
            <label className="block">
              <span className="text-gray-700 font-semibold">Thumbnail URL</span>
              <input
                type="text"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>
          </div>
          {/* Optional: Add image preview here if time permits */}
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t mt-8">
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-10 rounded-lg shadow-md transition disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                {isEditing ? "Saving Changes..." : "Adding Product..."}
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-3" />
                {isEditing ? "Update Product" : "Add Product"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

// Note: To use this component for adding, use: <ProductForm />
// To use this component for editing, use: <ProductForm productId={params.id} />
