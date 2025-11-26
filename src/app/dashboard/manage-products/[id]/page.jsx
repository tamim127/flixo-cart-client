import ProductUpdateForm from "@/Components/ProductUpdateForm/ProductUpdateForm";
import React from "react";

export default async function EditProductPage({ params }) {
  const { id } = await params;
  return <ProductUpdateForm productId={id} />;
}
