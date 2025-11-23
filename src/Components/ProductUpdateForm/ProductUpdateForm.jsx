"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Save, Loader2, ArrowLeft } from "lucide-react";

// --- DUMMY API MOCKS (হার্ডকোডেড ডেটা) ---
const DUMMY_PRODUCT = {
  _id: "prod123",
  title: "Smart Fitness Tracker Pro",
  shortDescription: "Advanced health monitoring and long-lasting battery.",
  fullDescription:
    "This fitness tracker features a built-in ECG, blood oxygen saturation (SpO2) monitoring, and over 50 sports modes. Integrated GPS allows you to track your outdoor workouts accurately. Comes with a stylish metal alloy casing.",
  price: 8990,
  priority: "high",
  imageUrl: "https://via.placeholder.com/400x300?text=Loaded+Product+Image",
};

// সিমুলেশন: ডেটাবেস থেকে পণ্য লোড হচ্ছে
const mockGetProductById = (id) =>
  new Promise((resolve) => {
    console.log(`Simulating fetch for product ID: ${id}`);
    setTimeout(() => resolve(DUMMY_PRODUCT), 800); // 0.8 সেকেন্ড লোডিং সিমুলেট
  });

// সিমুলেশন: ডেটা আপডেট হচ্ছে
const mockUpdateProduct = (id, data) =>
  new Promise((resolve) => {
    console.log(`Simulating update for product ID: ${id}`, data);
    setTimeout(() => resolve({ ...data, _id: id }), 500);
  });
// --- END MOCKS ---

const ProductUpdateForm = ({ productId }) => {
  // যেহেতু এটি Update Form, তাই initial state ডামি ডেটা দিয়ে শুরু করা হলো
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

  // --- 1. ডেটা লোডিং লজিক (Read Operation) ---
  const fetchProductData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockGetProductById(productId);
      setFormData(data); // লোড হওয়া ডেটা ফর্মের স্টেটে সেট করা হলো
    } catch (err) {
      setError("Failed to load product details for editing.");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // --- 2. আপডেট সেভ লজিক (Update Operation) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await mockUpdateProduct(productId, formData); // ডেটা আপডেটের জন্য API/Mock কল
      alert(`Product "${formData.title}" updated successfully! (Simulated)`);
      // Optionally redirect here
    } catch (error) {
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mx-auto" />
        <p className="mt-2 text-gray-600">Fetching product details...</p>
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-8 rounded-xl relative">
        <h2 className="text-xl font-bold mb-3">Error Loading Product</h2>
        <p className="mb-4">{error}</p>
        <Link
          href="/dashboard/manage-products"
          className="text-indigo-600 hover:text-indigo-800 flex items-center font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Go back to Manage Products
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Link
        href="/dashboard/manage-products"
        className="text-indigo-600 hover:text-indigo-800 flex items-center mb-6 font-medium"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Product List
      </Link>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-4 border-b pb-4">
        Edit Product: {formData.title}
      </h1>

      {/* Image Preview (যদি URL থাকে) */}
      {formData.imageUrl && (
        <div className="mb-6 border p-4 rounded-lg bg-gray-50">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Current Image Preview
          </label>
          <img
            src={formData.imageUrl}
            alt="Product"
            className="w-40 h-auto object-contain rounded-md border shadow-sm"
          />
        </div>
      )}

      {/* Title (এই ডেটাটিই আপনি আপডেট করতে চান) */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Short Description */}
      <div>
        <label
          htmlFor="shortDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Short Description
        </label>
        <textarea
          name="shortDescription"
          id="shortDescription"
          rows="2"
          value={formData.shortDescription}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>

      {/* Full Description */}
      <div>
        <label
          htmlFor="fullDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Full Description
        </label>
        <textarea
          name="fullDescription"
          id="fullDescription"
          rows="5"
          value={formData.fullDescription}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>

      {/* Price & Priority */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price (৳)
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700"
          >
            Priority
          </label>
          <select
            name="priority"
            id="priority"
            value={formData.priority}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border bg-white focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* --- 💾 সেভ বাটন --- */}
      <div className="pt-5 border-t mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center items-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 transition duration-150"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <Save className="h-5 w-5 mr-2" />
          )}
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProductUpdateForm;
