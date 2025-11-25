import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";


export default function ProductCard({ product }) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  const rating = product.rating || 4;

  return (
    <Link
      key={product._id}
      href={`/products/${product._id}`}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group"
    >
      <div className="relative">
        <Image
          src={
            product.imageUrl || "https://via.placeholder.com/300?text=No+Image"
          }
          alt={product.title}
          width={300}
          height={300}
          className="w-full h-64 object-cover"
        />
        <span className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
          -{discount}% OFF
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, s) => (
            <Star
              key={s}
              className={`w-4 h-4 ${
                s < rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black">
            ${product.price.toLocaleString()}
          </span>
          <span className="text-gray-500 line-through">
            ${product.originalPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
