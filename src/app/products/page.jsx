  "use client"; 

  import Image from "next/image";
  import Link from "next/link";
  import { Zap, Star } from "lucide-react";
  import { useState, useEffect } from "react";

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  // Server API fetch function
  async function getDeals({ limit = 18, skip = 0 }) {
    const res = await fetch(
      `${API_BASE_URL}/products?limit=${limit}&skip=${skip}&deal=true`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch deals");
    return res.json();
  }

  export default function DealsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 18;

    useEffect(() => {
      let mounted = true;
      setLoading(true);

      getDeals({ limit, skip: (page - 1) * limit })
        .then((data) => {
          if (mounted) {
            setProducts((prev) => [...prev, ...(data.products || [])]);
            setTotal(data.total || 0);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });

      return () => {
        mounted = false;
      };
    }, [page]);

    const hasMore = products.length < total;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <Zap className="w-12 h-12 mx-auto mb-4" />
            <h1 className="text-5xl md:text-7xl font-black mb-4">
              Hot Deals & Flash Sale
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              {total.toLocaleString()} Deals Available • Limited Time Offers
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Products Grid */}
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
                    />

                    {product.discountPercentage > 0 && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg animate-bounce">
                        -{Math.round(product.discountPercentage)}%
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-lg line-clamp-2 group-hover:text-orange-600 transition">
                      {product.title}
                    </h3>

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

                    <p className="text-xs text-gray-500 truncate">
                      {product.brand || product.category}
                    </p>
                  </div>
                </Link>
              );
            })}

            {/* Skeleton Loader */}
            {loading &&
              [...Array(limit)].map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="animate-pulse bg-white rounded-3xl h-64"
                />
              ))}
          </div>

          {/* Load More Button */}
          {hasMore && !loading && (
            <div className="flex justify-center mt-16">
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-12 py-5 rounded-full shadow-2xl transition transform hover:scale-105"
              >
                Load More Deals
              </button>
            </div>
          )}

          {!hasMore && products.length > 0 && (
            <div className="text-center py-16 text-2xl font-bold text-gray-600">
              You've seen all {total.toLocaleString()} deals!
            </div>
          )}
        </div>
      </div>
    );
  }
