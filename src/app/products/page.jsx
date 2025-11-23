// app/products/page.js  ← পুরো ফাইলটা এই কোড দিয়ে রিপ্লেস কর

import Image from "next/image";
import Link from "next/link";
import { Package, Star, TrendingUp } from "lucide-react";

// Server-side data fetching (Fast + SEO friendly)
async function getProducts({ limit = 30, skip = 0 }) {
  const res = await fetch(
    `http://localhost:5000/products?limit=${limit}&skip=${skip}`,
    { next: { revalidate: 60 } } 
  );
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default async function ProductsPage({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const limit = 30;
  const skip = (page - 1) * limit;

  let products = [];
  let total = 0;

  try {
    const data = await getProducts({ limit, skip });
    products = data.products || [];
    total = data.total || 0;
  } catch (err) {
    console.error(err);
  }

  const hasMore = skip + products.length < total;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-4 animate-fade-in">
            All Products
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            {total.toLocaleString()} Items Available • Free Shipping on Orders
            $999+
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-orange-600" />
            <span className="text-2xl font-bold">
              {total.toLocaleString()} Products
            </span>
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <span className="text-lg font-medium text-green-600">
              Hot Deals Live Now!
            </span>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 md:gap-7">
            {products.map((product) => {
              const discountedPrice =
                product.price -
                (product.price * product.discountPercentage) / 100;

              return (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square bg-gray-100">
                    <Image
                      src={
                        product.thumbnail ||
                        product.images?.[0] ||
                        "/placeholder.jpg"
                      }
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      priority={page === 1}
                    />

                    {/* Discount Badge */}
                    {product.discountPercentage > 0 && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg animate-bounce">
                        -{Math.round(product.discountPercentage)}%
                      </div>
                    )}

                    {/* Quick Add Button */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-full text-sm shadow-lg">
                        Quick Add
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-lg line-clamp-2 group-hover:text-orange-600 transition">
                      {product.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(product.rating || 4)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        ({product.reviews?.length || 0})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-black text-red-600">
                        ${discountedPrice.toFixed(0)}
                      </span>
                      {product.discountPercentage > 0 && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.price}
                        </span>
                      )}
                    </div>

                    {/* Brand / Category */}
                    <p className="text-xs text-gray-500 truncate">
                      {product.brand || product.category}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-6">No products found</div>
            <p className="text-xl text-gray-500">
              Try adjusting your filters or come back later!
            </p>
          </div>
        )}

        {/* Load More / Pagination */}
        {hasMore && (
          <div className="flex justify-center mt-16">
            <Link
              href={`/products?page=${page + 1}`}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl px-12 py-5 rounded-full shadow-2xl transition transform hover:scale-105"
            >
              Load More Products
            </Link>
          </div>
        )}

        {!hasMore && products.length > 0 && (
          <div className="text-center py-16 text-2xl font-bold text-gray-600">
            You've seen all {total.toLocaleString()} products!
          </div>
        )}
      </div>
    </div>
  );
}
