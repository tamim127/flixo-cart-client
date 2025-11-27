"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";
import { Save, Loader2, ArrowLeft, Upload, X, Package } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProductUpdateForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: 0,
    stock: "",
    brand: "",
    thumbnail: "",
    tags: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id || !currentUser) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const product = await res.json();

        // Only owner can edit
        if (product.sellerId && product.sellerId !== currentUser.uid) {
          toast.error("You can only edit your own products!");
          router.replace("/dashboard/manage-products");
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
        toast.error("Failed to load product");
        router.replace("/dashboard/manage-products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, currentUser, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "thumbnail") setImagePreview(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock) || 0,
      discountPercentage: parseFloat(formData.discountPercentage) || 0,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      images: formData.thumbnail ? [formData.thumbnail] : [],
      updatedAt: new Date(),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("Product updated successfully!");
      router.push("/dashboard/manage-products");
    } catch (err) {
      toast.error("Failed to update product");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Loader2 className="w-16 h-16 sm:w-20 sm:h-20 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12 px-3 sm:px-6">
      <div className="max-w-4xl sm:max-w-5xl mx-auto">
        <Link
          href="/dashboard/manage-products"
          className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold text-sm sm:text-lg mb-4 sm:mb-6"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-2" /> Back to Products
        </Link>

        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 flex items-center gap-3 sm:gap-5 mb-8 sm:mb-10">
          <Package className="w-10 h-10 sm:w-14 sm:h-14 text-purple-600" />
          Edit Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Image Preview */}
          {imagePreview && (
            <div className="relative w-full h-64 sm:h-96">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-t-3xl"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview("");
                  setFormData((prev) => ({ ...prev, thumbnail: "" }));
                }}
                className="absolute top-3 sm:top-6 right-3 sm:right-6 bg-red-600 text-white p-2 sm:p-4 rounded-full hover:bg-red-700 shadow-lg transition"
              >
                <X className="w-4 sm:w-7 h-4 sm:h-7" />
              </button>
            </div>
          )}

          <div className="p-6 sm:p-12 space-y-8 sm:space-y-10">
            {/* Product Details */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                Product Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Input
                  label="Title *"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                />
                <Input
                  label="Category *"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Tags (comma separated)"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4 sm:mt-6">
                <label className="block text-gray-700 font-semibold mb-2 sm:mb-3">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 sm:px-6 py-2 sm:py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition text-sm sm:text-lg"
                  placeholder="Write a detailed description..."
                />
              </div>
            </section>

            {/* Pricing & Stock */}
            <section className="bg-gradient-to-r from-red-50 to-pink-50 p-6 sm:p-8 rounded-3xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                Pricing & Inventory
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <Input
                  label="Price (৳) *"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Discount (%)"
                  name="discountPercentage"
                  type="number"
                  min="0"
                  max="90"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                />
                <Input
                  label="Stock *"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </section>

            {/* Image */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <Upload className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600" />{" "}
                Product Image
              </h2>
              <Input
                label="Image URL *"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
              />
              <p className="text-sm text-gray-500 mt-1 sm:mt-2">
                Use imgbb.com or Cloudinary
              </p>
            </section>

            {/* Submit */}
            <div className="flex justify-end pt-6 sm:pt-8 border-t">
              <button
                type="submit"
                disabled={submitting}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 sm:px-14 py-4 sm:py-6 rounded-2xl font-bold text-base sm:text-xl hover:shadow-2xl transform hover:scale-105 transition disabled:opacity-70 flex items-center gap-3 sm:gap-4"
              >
                {submitting ? (
                  <Loader2 className="w-5 sm:w-8 h-5 sm:h-8 animate-spin" />
                ) : (
                  <Save className="w-5 sm:w-8 h-5 sm:h-8" />
                )}
                {submitting ? "Updating..." : "Update Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <label className="block">
    <span className="text-gray-700 font-semibold mb-1 sm:mb-2 block">
      {label}
    </span>
    <input
      className="w-full px-4 sm:px-6 py-2 sm:py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition text-sm sm:text-lg"
      {...props}
    />
  </label>
);

export default ProductUpdateForm;
