import ProductCard from "@/Components/ProductCard/ProductCard";
import { getProducts } from "@/lib/api";
import { notFound } from "next/navigation";

function slugToTitle(slug) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}



function createSlug(name) {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .trim();
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  if (!slug) notFound();

  const { products: allProducts } = await getProducts({ limit: 1000 });

  const products = allProducts.filter((p) => {
    const productCat = p.category?.trim();
    if (!productCat) return false;
    return createSlug(productCat) === slug;
  });

  if (products.length === 0) {
    notFound();
  }

  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-black mb-6 capitalize">
          {slugToTitle(slug)} ({products.length})
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
