"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  Loader2,
  ArrowLeft,
  PlusCircle,
  Edit,
  Package,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";
import { createProduct, updateProduct, getProductById } from "@/lib/api";

// Initial form structure
const initialFormData = {
  title: "",
  description: "",
  category: "",
  price: "",
  discountPercentage: 0,
  stock: "",
  brand: "",
  thumbnail: "",
  tags: "",
};

// Reusable input field
const InputField = ({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
}) => (
  <div className="flex flex-col">
    <label className="font-semibold text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="rounded-xl border border-gray-300 px-4 py-2 sm:px-5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm sm:text-lg shadow-sm"
    />
  </div>
);

const ProductForm = ({ productId = null }) => {
  const isEditing = !!productId;
  const router = useRouter();
  const { currentUser, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !currentUser) {
      toast.error("Please login to continue");
      router.push("/login");
    }
  }, [currentUser, authLoading, router]);

  // Fetch product for editing
  const fetchProduct = useCallback(async () => {
    if (!isEditing || !currentUser?.uid) return;
    setLoading(true);
    try {
      const product = await getProductById(productId);
      if (product.sellerId && product.sellerId !== currentUser.uid) {
        toast.error("You can only edit your own products!");
        router.push("/dashboard/manage-products");
        return;
      }
      setFormData({
        title: product.title || "",
        description: product.description || "",
        category: product.category || "",
        price: product.price || "",
        discountPercentage: product.discountPercentage || 0,
        stock: product.stock || "",
        brand: product.brand || "",
        thumbnail: product.thumbnail || product.images?.[0] || "",
        tags: Array.isArray(product.tags) ? product.tags.join(", ") : "",
      });
      setImagePreview(product.thumbnail || product.images?.[0] || "");
    } catch (err) {
      toast.error(err.message || "Product not found");
      router.push("/dashboard/manage-products");
    } finally {
      setLoading(false);
    }
  }, [isEditing, productId, currentUser?.uid, router]);

  useEffect(() => {
    if (currentUser?.uid) fetchProduct();
  }, [fetchProduct, currentUser?.uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "thumbnail") setImagePreview(value.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser?.uid) return;

    if (
      !formData.title ||
      !formData.price ||
      !formData.stock ||
      !formData.thumbnail
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category.trim(),
      price: parseFloat(formData.price),
      discountPercentage: parseFloat(formData.discountPercentage) || 0,
      stock: parseInt(formData.stock),
      brand: formData.brand.trim(),
      thumbnail: formData.thumbnail.trim(),
      images: [formData.thumbnail.trim()],
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (isEditing) await updateProduct(productId, payload, currentUser.uid);
      else await createProduct(payload, currentUser.uid);

      toast.success(
        isEditing
          ? "Product updated successfully!"
          : "Product added successfully!"
      );
      router.push("/dashboard/manage-products");
    } catch (err) {
      toast.error(err.message || "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-pink-50">
        <Loader2 className="w-16 h-16 sm:w-20 sm:h-20 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50 py-8 sm:py-12 px-3 sm:px-6">
      <div className="max-w-4xl sm:max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <Link
            href="/dashboard/manage-products"
            className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold text-sm sm:text-lg mb-4 sm:mb-6 hover:underline"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-2" /> Back to
            Products
          </Link>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 flex items-center gap-3 sm:gap-5">
            {isEditing ? (
              <Edit className="w-10 h-10 sm:w-14 sm:h-14 text-purple-600" />
            ) : (
              <PlusCircle className="w-10 h-10 sm:w-14 sm:h-14 text-red-600" />
            )}
            {isEditing ? "Edit Product" : "Add New Product"}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Image Preview */}
          {imagePreview && (
            <div className="relative w-full h-64 sm:h-96">
              <img
                src={imagePreview}
                alt="Product Preview"
                className="w-full h-full object-cover"
                onError={() => setImagePreview("")}
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview("");
                  setFormData((prev) => ({ ...prev, thumbnail: "" }));
                }}
                className="absolute top-3 sm:top-6 right-3 sm:right-6 bg-red-600 text-white p-2 sm:p-4 rounded-full hover:bg-red-700 shadow-lg transition"
              >
                <X className="w-4 h-4 sm:w-7 sm:h-7" />
              </button>
            </div>
          )}

          <div className="p-6 sm:p-14 space-y-8 sm:space-y-12">
            {/* Product Info */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-8 flex items-center gap-2 sm:gap-4">
                <Package className="w-6 h-6 sm:w-10 sm:h-10 text-red-600" />{" "}
                Product Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                <InputField
                  label="Product Title *"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                />
                <InputField
                  label="Category *"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Stock *"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  type="number"
                />
                <InputField
                  label="Price *"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  type="number"
                />
                <InputField
                  label="Discount (%)"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  type="number"
                />
                <InputField
                  label="Thumbnail URL *"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Tags (comma separated)"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* Description */}
            <section>
              <label className="font-semibold text-gray-700 mb-1 sm:mb-2 block text-sm sm:text-base">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-xl border border-gray-300 px-4 py-2 sm:px-5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm sm:text-lg shadow-sm"
              />
            </section>

            {/* Submit */}
            <section className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-10 py-3 sm:py-5 rounded-2xl text-sm sm:text-xl font-bold shadow-md sm:shadow-xl flex items-center gap-2 sm:gap-3 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 sm:w-6 h-4 sm:h-6 animate-spin" />
                ) : (
                  <Save className="w-4 sm:w-6 h-4 sm:h-6" />
                )}
                {isEditing ? "Update Product" : "Add Product"}
              </button>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
