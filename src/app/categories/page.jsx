import Link from "next/link";
import { getProducts } from "@/lib/api";

// slug বানানোর ফাংশন – TypeScript সরানো হয়েছে
function createSlug(name) {
  if (!name) return "uncategorized";
  return name
    .toLowerCase()
    .replace(/\s+/g, "-") // space → -
    .replace(/[^\w\-]+/g, "") // special char remove
    .replace(/\-\-+/g, "-") // multiple - → single
    .trim();
}




export default async function AllCategoriesPage() {
  let categories = [];

  try {
    const { products } = await getProducts({ limit: 1000 });
    const categoryMap = {};

    products.forEach((product) => {
      const cat = product.category?.trim() || "Uncategorized";
      const slug = createSlug(cat);

      if (!categoryMap[cat]) {
        categoryMap[cat] = {
          name: cat,
          slug: slug,
          count: 0,
          img:
            product.thumbnail ||
            product.images?.[0] ||
            "https://via.placeholder.com/300?text=No+Image",
        };
      }
      categoryMap[cat].count += 1;
    });

    categories = Object.values(categoryMap).sort((a, b) => b.count - a.count);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-black text-center mb-12">
          All Categories
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-3xl font-black mb-2">{cat.name}</h3>
                <p className="text-5xl font-black text-yellow-400">
                  {cat.count}+
                </p>
                <p className="text-lg opacity-90">Products Available</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
