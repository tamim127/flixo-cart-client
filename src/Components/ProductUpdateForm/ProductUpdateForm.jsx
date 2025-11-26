// src/Components/ProductUpdateForm/ProductUpdateForm.jsx
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
        <div className="text-center">
          <Loader2 className="w-20 h-20 animate-spin text-red-600" />
          <p className="mt-6 text-2xl font-bold text-gray-700">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          href="/dashboard/manage-products"
          className="inline-flex items-center text-red-600 hover:text-red-700 font-bold text-lg mb-6"
        >
          <ArrowLeft className="w-6 h-6 mr-2" /> Back to Products
        </Link>

        <h1 className="text-5xl font-black text-gray-900 flex items-center gap-4 mb-10">
          <Package className="w-14 h-14 text-purple-600" />
          Edit Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Image Preview */}
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-96 object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview("");
                  setFormData((prev) => ({ ...prev, thumbnail: "" }));
                }}
                className="absolute top-6 right-6 bg-red-600 text-white p-4 rounded-full hover:bg-red-700 shadow-2xl"
              >
                <X className="w-7 h-7" />
              </button>
            </div>
          )}

          <div className="p-8 lg:p-12 space-y-10">
            {/* Product Details */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Product Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Title"
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
                  label="Category"
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
              <div className="mt-6">
                <label className="block text-gray-700 font-semibold mb-3">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-6 py-5 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition text-lg"
                  placeholder="Write a detailed description..."
                />
              </div>
            </section>

            {/* Pricing & Stock */}
            <section className="bg-gradient-to-r from-red-50 to-pink-50 p-8 rounded-3xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Pricing & Inventory
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  label="Price (৳)"
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
                  label="Stock"
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Upload className="w-8 h-8 text-purple-600" /> Product Image
              </h2>
              <Input
                label="Image URL"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                Use imgbb.com or Cloudinary
              </p>
            </section>

            {/* Submit */}
            <div className="flex justify-end pt-8 border-t">
              <button
                type="submit"
                disabled={submitting}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-14 py-6 rounded-2xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition disabled:opacity-70 flex items-center gap-4"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-8 h-8 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-8 h-8" />
                    Update Product
                  </>
                )}
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
    <span className="text-gray-700 font-semibold mb-2 block">{label}</span>
    <input
      className="w-full px-6 py-5 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
      {...props}
    />
  </label>
);

export default ProductUpdateForm;
