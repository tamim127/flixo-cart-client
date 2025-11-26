// app/page.jsx
import { ChevronRight, Zap } from "lucide-react";
import { getProducts } from "@/lib/api";

import HeroCarousel from "@/Components/HeroCarousel/HeroCarousel";
import CategoryGrid from "@/Components/CategoryGrid/CategoryGrid";
import ProductCard from "@/Components/ProductCard/ProductCard";
import Newsletter from "@/Components/NewsLetter/NewsLetter";
import Link from "next/link";
import Features from "@/Components/Features/Features";
import Testimonials from "@/Components/Testimonials/Testimonials";
import BrandSlider from "@/Components/Ui/BrandSlider/BrandSlider";



export const revalidate = 60;

export default async function HomePage() {
  let products = [];
  try {
    const data = await getProducts({ limit: 9999 });
    products = data?.products || [];
  } catch (err) {
    console.error("Failed to load products:", err);
  }

  // Top Categories
  const categoriesMap = products.reduce((acc, p) => {
    if (p.category) {
      if (!acc[p.category])
        acc[p.category] = { name: p.category, count: 0, img: p.imageUrl };
      acc[p.category].count += 1;
    }
    return acc;
  }, {});

  const topCategories = Object.values(categoriesMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const flashSaleProducts = products.slice(0, 12);

  return (
    <>
      {/* Hero Carousel - Full bleed, no extra padding */}
      <HeroCarousel />

      {/* Top Categories */}
      <section className="py-16 md:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
              Shop by Top Categories
            </h2>
            <p className="mt-3 text-lg sm:text-xl text-gray-600">
              {topCategories.length} Categories •{" "}
              {products.length.toLocaleString()}+ Products
            </p>
          </div>
          <CategoryGrid categories={topCategories} />
        </div>
      </section>

      {/* Brands */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-10">Trusted Brands</h1>
      <div className="my-10 p-6 md:p-12">
        <BrandSlider />
      </div>

      {/* Flash Sale */}
      <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-br from-red-50 via-pink-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 lg:mb-16 gap-6">
            <div className="flex items-center gap-4">
              <Zap className="w-12 h-12 lg:w-16 lg:h-16 text-red-600 animate-pulse" />
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                Flash Sale Ends Soon!
              </h2>
            </div>
            <p className="text-lg lg:text-xl font-bold text-red-600 bg-red-100 px-6 py-3 rounded-full">
              Up to 80% OFF • Limited Time Only
            </p>
          </div>

          {/* Perfect responsive grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
            {flashSaleProducts.length > 0 ? (
              flashSaleProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-xl text-gray-500">
                  No products available right now
                </p>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="flex mt-8 justify-center items-center ">
            <Link href="/products">
              <button className=" bg-black text-white outline-1 outline-orange-600 hover:bg-red-700  px-8 py-5 rounded-2xl text-xl font-bold flex items-center gap-3 shadow-2xl hover:scale-105 transition">
                See All <ChevronRight size={32} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Features Section */}
      <Features />

      {/* Newsletter - Full width with proper spacing */}
      <Newsletter />
    </>
  );
}
