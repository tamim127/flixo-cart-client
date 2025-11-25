

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Utility: Calculate original price
function calculateOriginalPrice(price, discountPercentage) {
    if (discountPercentage > 0 && price > 0) {
        return Math.round((price / (1 - discountPercentage / 100)) * 100) / 100;
    }
    return price;
}

// Process product + extract createdAt from meta
function processProduct(product) {
    if (!product) return product;

    return {
        ...product,
        originalPrice: calculateOriginalPrice(product.price, product.discountPercentage || 0),
        imageUrl: product.thumbnail || product.images?.[0] || "https://via.placeholder.com/300?text=No+Image",
        createdAt: product.meta?.createdAt || product.createdAt || new Date().toISOString(),
    };
}

// 1. Homepage - 24 products
export async function getProducts(options = {}) {
    const limit = options.limit || 24;
    const skip = options.skip || 0;

    const res = await fetch(`${API_BASE_URL}/products?limit=${limit}&skip=${skip}`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    const processed = data.products.map(processProduct);

    // Optional: Oldest first on homepage too (চাইলে এটাও চেঞ্জ করতে পারো)
    processed.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return {
        products: processed,
        total: data.total,
        limit: data.limit || limit,
        skip: data.skip || skip,
    };
}

// 2. Admin Dashboard - ALL products + OLDEST FIRST 
export async function getAllProductsForAdmin() {
    const res = await fetch(`${API_BASE_URL}/products?limit=9999`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch all products for admin");

    const data = await res.json();
    let products = data.products || data || [];


    products.sort((a, b) => {
        const dateA = new Date(a.meta?.createdAt || a.createdAt || 0).getTime();
        const dateB = new Date(b.meta?.createdAt || b.createdAt || 0).getTime();
        return dateA - dateB;
    });

    return products.map(processProduct);
}

// Single product
export async function getProductById(id) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Product not found");
    return processProduct(await res.json());
}

// CRUD Operations
export async function createProduct(productData) {
    const res = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error("Failed to create product");
    return res.json();
}

export async function updateProduct(id, updatedData) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });
    if (!res.ok) throw new Error("Failed to update product");
    return res.json();
}

export async function deleteProduct(id) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete product");
    return res.json();
}

// Extra
export async function getCategories() {
    const res = await fetch(`${API_BASE_URL}/categories`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
}

export async function getProductsByCategory(category, options = {}) {
    const limit = options.limit || 24;
    const res = await fetch(`${API_BASE_URL}/products/category/${category}?limit=${limit}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to load category products");
    const data = await res.json();
    const processed = data.products.map(processProduct);
    processed.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Oldest first
    return { products: processed, total: data.total };
}

export async function searchProducts(query) {
    const res = await fetch(`${API_BASE_URL}/products/search?q=${query}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Search failed");
    const data = await res.json();
    const processed = (data.products || data).map(processProduct);
    processed.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    return processed;
}