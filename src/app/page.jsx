import { Zap } from "lucide-react";
import { getProducts } from "@/lib/api";
import Hero from "@/Components/Hero/Hero";
import CategoryGrid from "@/Components/CategoryGrid/CategoryGrid";
import ProductCard from "@/Components/ProductCard/ProductCard";

export default async function HomePage() {
  let products = [];
  try {
    const data = await getProducts({ limit: 200 });
    products = data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  // --- Extract categories with counts ---
  const categoriesMap = {};
  products.forEach((p) => {
    if (p.category) {
      if (!categoriesMap[p.category]) {
        categoriesMap[p.category] = {
          name: p.category,
          count: 1,
          img: p.imageUrl,
        };
      } else {
        categoriesMap[p.category].count += 1;
      }
    }
  });

  // Convert map to array & sort by count descending
  const categoriesArray = Object.values(categoriesMap).sort(
    (a, b) => b.count - a.count
  );

  // Top 8 categories
  const topCategories = categoriesArray.slice(0, 8);

  const flashSaleProducts = products.slice(0, 12);

  return (
    <section className="w-full">
      {/* Mega Hero */}
      <Hero />

      {/* Top Categories */}
      <section className="py-20 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black text-center mb-4">
            Shop by Top Categories
          </h2>
          <p className="text-center text-gray-600 text-xl mb-12">
            Top {topCategories.length} Categories • {products.length}+ Products
          </p>
          <CategoryGrid categories={topCategories} />
        </div>
      </section>

      {/* Flash Sale */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <Zap className="w-12 h-12 text-red-600" />
              <h2 className="text-5xl font-black">Flash Sale Ends Soon!</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {flashSaleProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-black text-white">
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
