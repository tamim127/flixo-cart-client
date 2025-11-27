
import ProductClient from "./ProductClient";
import { notFound } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getProduct(id) {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}


export async function generateMetadata({ params }) {
  const { id } = await params; // এখানে await
  if (!id) return { title: "Product Not Found" };

  const product = await getProduct(id);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.title} - ${product.brand} | Flixo Cart`,
    description: product.description?.slice(0, 160),
    openGraph: { images: [product.thumbnail] },
  };
}


export default async function ProductDetailPage({ params }) {
  const { id } = await params; // এখানে await
  if (!id) notFound();

  const product = await getProduct(id);
  if (!product) notFound();

  const discountPrice =
    product.price - (product.price * (product.discountPercentage || 0)) / 100;
  const hasDiscount = (product.discountPercentage || 0) > 0;
  const inStock = product.stock > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <ProductClient
          product={product}
          discountPrice={discountPrice}
          hasDiscount={hasDiscount}
          inStock={inStock}
        />
      </div>
    </div>
  );
}
