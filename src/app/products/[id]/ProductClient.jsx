"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Star,
  Truck,
  Shield,
  RefreshCw,
  Package,
  Loader2,
  Heart,
} from "lucide-react";

import toast from "react-hot-toast";
import { useCart } from "@/Context/CartContext";
import { useWishlist } from "@/Context/WishlistContext";




export default function ProductClient({
  product,
  discountPrice,
  hasDiscount,
  inStock,
}) {

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isWishlisted = wishlist.some((p) => p._id === product._id);

  const { addToCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    product?.thumbnail || product?.images?.[0]
  );

  const handleAddToCart = async () => {
    if (!inStock) {
      toast.error("Out of stock!");
      return;
    }

    setLoading(true);
    try {
      addToCart({
        _id: product._id,
        title: product.title,
        price: discountPrice,
        imageUrl: selectedImage || product.thumbnail,
        stock: product.stock,
      });

      toast.success("Added to cart! Redirecting...", { duration: 1500 });

      setTimeout(() => {
        router.push("/cart");
      }, 1000);
    } catch (err) {
      toast.error("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600">
            The product data is missing. Check console for details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 px-4 sm:px-6 lg:px-0 py-8 lg:py-12">
      {/* Left - Images */}
      <div className="space-y-4">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-xl">
          <Image
            src={selectedImage}
            alt={product.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {hasDiscount && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-lg z-10">
              -{Math.round(product.discountPercentage)}%
            </div>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
              <span className="text-white text-4xl font-black">Sold Out</span>
            </div>
          )}
        </div>

        {(product.images?.length > 1 || product.thumbnail) && (
          <div className="grid grid-cols-5 gap-3">
            {[product.thumbnail, ...(product.images || [])]
              .slice(0, 5)
              .map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-4 transition-all duration-300 ${
                    selectedImage === img
                      ? "border-orange-500 shadow-lg"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Right - Info */}
      <div className="space-y-6 lg:space-y-8">
        <div>
          <p className="text-orange-600 font-semibold text-lg sm:text-xl">
            {product.brand}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-1 sm:mt-2">
            {product.title}
          </h1>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  i < Math.round(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm sm:text-base font-medium">
            {product.rating} ({product.reviews?.length || 0} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 sm:gap-4">
          <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-red-600">
            ${discountPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <>
              <span className="text-lg sm:text-xl line-through text-gray-500">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-green-600 font-bold text-lg sm:text-xl">
                Save ${(product.price - discountPrice).toFixed(2)}
              </span>
            </>
          )}
        </div>

        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          {product.description}
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-3 sm:p-4 rounded-xl shadow text-center">
            <Truck className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-orange-600 mb-1 sm:mb-2" />
            <p className="text-xs sm:text-sm">Free Delivery</p>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-xl shadow text-center">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-green-600 mb-1 sm:mb-2" />
            <p className="text-xs sm:text-sm">7 Days Return</p>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-xl shadow text-center">
            <RefreshCw className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-blue-600 mb-1 sm:mb-2" />
            <p className="text-xs sm:text-sm">Easy Return</p>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-xl shadow text-center">
            <Package className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-purple-600 mb-1 sm:mb-2" />
            <p className="text-xs sm:text-sm">
              Min. {product.minimumOrderQuantity} pcs
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleAddToCart}
            disabled={loading || !inStock}
            className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 rounded-full font-bold text-lg sm:text-xl transition-transform duration-300 shadow-lg ${
              inStock
                ? "bg-orange-600 hover:bg-orange-700 text-white hover:scale-105"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
            ) : (
              "Add to Cart"
            )}
          </button>
          <button
            onClick={() =>
              isWishlisted
                ? removeFromWishlist(product._id)
                : addToWishlist({
                    _id: product._id,
                    title: product.title,
                    price: discountPrice,
                    thumbnail: selectedImage,
                    stock: product.stock,
                  })
            }
            className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 rounded-full font-bold text-lg sm:text-xl transition-transform duration-300 ${
              isWishlisted
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <Heart
              className={`w-5 h-5 sm:w-6 sm:h-6 ${
                isWishlisted ? "fill-red-600 text-red-600" : "text-red-600"
              }`}
            />
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </button>
        </div>

        {/* Stock Info */}
        <div className="bg-white p-4 sm:p-6 rounded-xl text-sm sm:text-base font-medium text-gray-600 space-y-2">
          <div>
            Availability:{" "}
            <span
              className={
                inStock ? "text-green-600 font-bold" : "text-red-600 font-bold"
              }
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <div>Stock: {product.stock} pcs</div>
          <div>SKU: {product.sku}</div>
        </div>
      </div>
    </div>
  );
}
