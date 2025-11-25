// app/products/[id]/page.js   ← এই ফাইলটা পুরোটা কপি-পেস্ট করে রাখ

import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, Truck, Shield, RefreshCw, Clock, Package } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getProduct(id) {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.title} - ${product.brand} | YourStore`,
    description: product.description.slice(0, 160),
    openGraph: {
      images: [product.thumbnail],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  const discountPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-xl">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg animate-pulse">
                  -{Math.round(product.discountPercentage)}%
                </div>
              )}
            </div>

            {/* Small Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-orange-500 transition"
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Brand & Title */}
            <div>
              <p className="text-orange-600 font-semibold text-lg">
                {product.brand}
              </p>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mt-2">
                {product.title}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.round(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium">
                {product.rating} ({product.reviews?.length || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-black text-red-600">
                ${discountPrice.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-3xl text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-green-600 font-bold text-xl">
                    Save ${(product.price - discountPrice).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-lg text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="bg-white p-4 rounded-xl shadow">
                <Truck className="w-8 h-8 mx-auto text-orange-600 mb-2" />
                <p className="text-sm font-medium">
                  {product.shippingInformation}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow">
                <Shield className="w-8 h-8 mx-auto text-green-600 mb-2" />
                <p className="text-sm font-medium">
                  {product.warrantyInformation}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow">
                <RefreshCw className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                <p className="text-sm font-medium">{product.returnPolicy}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow">
                <Package className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                <p className="text-sm font-medium">
                  Min. {product.minimumOrderQuantity} pcs
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl py-5 rounded-full transition transform hover:scale-105 shadow-lg">
                Add to Cart
              </button>
              <button className="px-8 bg-gray-200 hover:bg-gray-300 rounded-full transition text-2xl">
                ♡
              </button>
            </div>

            {/* Stock & SKU */}
            <div className="flex justify-between text-sm font-medium text-gray-600">
              <span>
                Availability:{" "}
                <span className="text-green-600 font-bold">
                  {product.availabilityStatus}
                </span>
              </span>
              <span>
                Stock: <span className="font-bold">{product.stock} pcs</span>
              </span>
              <span>SKU: {product.sku}</span>
            </div>
          </div>
        </div>

        {/* Reviews Section (Optional) */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-black mb-6">Customer Reviews</h2>
            <div className="space-y-6">
              {product.reviews.slice(0, 3).map((review, i) => (
                <div key={i} className="border-b pb-6 last:border-0">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold">{review.reviewerName}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${
                              j < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
