// src/app/page.jsx
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Zap, Truck, Shield, Clock, Star } from "lucide-react";
import { getProducts } from "@/lib/api"; // API ফাংশন ইম্পোর্ট

// ডামি ক্যাটাগরি ডেটা (কারণ আপনার সার্ভারে ক্যাটাগরি রুট নেই)
const DUMMY_CATEGORIES = [
  {
    name: "Kitchen Accessories",
    count: 30,
    img: "https://images.unsplash.com/photo-1586023492125-27b2c486e5c7?w=600",
  },
  {
    name: "Groceries",
    count: 27,
    img: "https://images.unsplash.com/photo-1542838132-92c5338b0c89?w=600",
  },
  {
    name: "Sports Accessories",
    count: 17,
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
  },
  {
    name: "Smartphones",
    count: 16,
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
  },
  {
    name: "Mobile Accessories",
    count: 14,
    img: "https://images.unsplash.com/photo-1583391733981-c94e4058629b?w=600",
  },
  {
    name: "Men's Watches",
    count: 6,
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600",
  },
  {
    name: "Beauty & Health",
    count: 10,
    img: "https://images.unsplash.com/photo-1596462502278-ffb48ada4f1f?w=600",
  },
  {
    name: "Furniture",
    count: 5,
    img: "https://images.unsplash.com/photo-1555041469-0d0a8f3b2b6c?w=600",
  },
];

export default async function HomePage() {
  // --- Server Side Data Fetching ---
const { products } = await getProducts({});
  // এই products অ্যারেতেই আপনার MongoDB থেকে আসা সমস্ত ডেটা থাকবে
  const flashSaleProducts = products.slice(0, 12); // প্রথম 12টি পণ্য Flash Sale-এর জন্য ব্যবহার করা হলো
  // --- End Data Fetching ---

  return (
    <section className="w-full">
      {/* Mega Hero Carousel (No data change needed here) */}
      <section className=" relative h-[800px] w-full">
        {/* ... Hero Section UI remains the same ... */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1920&h=1080&fit=crop"
            alt="Mega Sale"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <p className="text-yellow-400 font-bold text-lg mb-2 tracking-wider">
                LIMITED TIME OFFER
              </p>
              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                FLASH SALE
                <br />
                <span className="text-6xl md:text-8xl text-red-500">
                  UP TO 80% OFF
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Ends in{" "}
                <span className="text-yellow-400 font-bold">23h 45m 12s</span>
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/deals">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 rounded-xl text-xl font-bold flex items-center gap-3 shadow-2xl transform hover:scale-105 transition">
                    Shop Now <ChevronRight className="w-8 h-8" />
                  </button>
                </Link>
                <Link href="/categories">
                  <button className="border-4 border-white text-white px-10 py-6 rounded-xl text-xl font-bold hover:bg-white hover:text-black transition">
                    All Categories
                  </button>
                </Link>
              </div>
            </div>

            {/* Mini Promo Cards (Hardcoded Data OK) */}
            <div className="grid grid-cols-2 gap-6 text-black">
              {[
                {
                  title: "Free Shipping",
                  desc: "Orders over ৳999",
                  icon: Truck,
                },
                {
                  title: "7 Days Return",
                  desc: "No questions asked",
                  icon: Clock,
                },
                {
                  title: "Secure Payment",
                  desc: "100% Protected",
                  icon: Shield,
                },
                { title: "24/7 Support", desc: "Dedicated help", icon: Zap },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl"
                >
                  <item.icon className="w-12 h-12 text-red-600 mb-3" />
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Massive Category Cards (Uses DUMMY_CATEGORIES) */}
      <section className="py-20 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black text-center mb-4">
            Shop by Category
          </h2>
          <p className="text-center text-gray-600 text-xl mb-12">
            24 Categories • {products.length}+ Products
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {DUMMY_CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/category/${cat.name
                  .toLowerCase()
                  .replace(/ & /g, "-")
                  .replace(/ /g, "-")}`}
                className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4"
              >
                <Image
                  src={cat.img}
                  alt={cat.name}
                  width={600}
                  height={600}
                  className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl font-black mb-2">{cat.name}</h3>
                  <p className="text-5xl font-black text-yellow-400">
                    {cat.count}+
                  </p>
                  <p className="text-lg opacity-90">Products Available</p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition translate-y-4 group-hover:translate-y-0">
                    <span className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold">
                      Explore Now <ChevronRight />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/categories">
              <button className="bg-black text-white px-16 py-6 rounded-full text-xl font-bold hover:bg-gray-800 transition">
                View All 24 Categories →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Flash Sale / Trending Products (Now using API data) */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <Zap className="w-12 h-12 text-red-600" />
              <h2 className="text-5xl font-black">Flash Sale Ends Soon!</h2>
            </div>
            <Link
              href="/deals"
              className="text-red-600 font-bold text-xl hover:underline"
            >
              View All →
            </Link>
          </div>

          {flashSaleProducts.length === 0 ? (
            <div className="text-center py-10 text-gray-600 text-xl">
              No Data Found!
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {flashSaleProducts.map((product) => {
                const discount = Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
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
                          product.imageUrl 
                          
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
                              s < rating
                                ? "fill-yellow-500 text-yellow-500"
                                : "text-gray-300"
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
              })}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter (No data change needed here) */}
      <section className="py-24 bg-black text-white">
        {/* ... Newsletter UI remains the same ... */}
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-6xl font-black mb-6">Get Exclusive Deals</h2>
          <p className="text-2xl mb-10 opacity-90">
            First order 15% OFF + Free Shipping
          </p>
          <form className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-8 py-6 rounded-full text-black text-xl"
            />
            <button className="bg-red-600 hover:bg-red-700 px-12 py-6 rounded-full text-xl font-bold">
              Subscribe Now
            </button>
          </form>
        </div>
      </section>
    </section>
  );
}
