
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, ChevronRight } from "lucide-react";
import Button from "../Ui/Buttons/Button";

export default function ProductCard({ product }) {
  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const rating = product.rating || 4.5;

  return (
    <section>
      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
        <Link
          href={`/products/${product._id || product.id}`}
          className="flex-1 flex flex-col"
        >
          {/* Image */}
          <div className="relative aspect-square bg-gray-100">
            <Image
              src={product.imageUrl || "/placeholder-product.jpg"}
              alt={product.title || "Product"}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition duration-500"
            />

            {/* Discount Badge */}
            {discount > 0 && (
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs sm:text-sm font-bold px-2.5 py-1 rounded-full z-10">
                -{discount}%
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4 flex-1 flex flex-col">
            <h3 className="font-bold text-sm sm:text-base lg:text-lg line-clamp-2 group-hover:text-red-600 transition">
              {product.title || "Untitled Product"}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(rating)
                      ? "fill-yellow-500 text-yellow-500"
                      : i < rating
                      ? "fill-yellow-300 text-yellow-300"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-xs text-gray-600 ml-1">({rating})</span>
            </div>

            {/* Price */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900">
                ${product.price?.toFixed(2) || "0.00"}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm sm:text-base text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </Link>

        {/* Add to Cart Button -  */}

        <Button />
      </div>
    
    </section>
  );
}
