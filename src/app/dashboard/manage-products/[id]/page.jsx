// src/app/dashboard/manage-products/[id]/page.jsx
"use client";

import ProductUpdateForm from "@/Components/ProductUpdateForm/ProductUpdateForm";
import { getProductById } from "@/lib/api";
import React from "react";

const EditProductPage = ({ params }) => {
  const { id } = React.use(params);

  return <ProductUpdateForm productId={getProductById} />;
};

export default EditProductPage;
