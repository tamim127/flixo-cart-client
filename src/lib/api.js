
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;

// -------------------------
// Utility Functions


// Calculate original price from discount
function calculateOriginalPrice(price, discountPercentage) {
    if (discountPercentage > 0 && price > 0) {
        return Math.round((price / (1 - discountPercentage / 100)) * 100) / 100;
    }
    return price;
}

// Process single product
function processProduct(product) {
    if (!product) return null;

    return {
        ...product,
        originalPrice: calculateOriginalPrice(product.price, product.discountPercentage || 0),
        imageUrl: product.thumbnail || product.images?.[0] || "https://via.placeholder.com/300?text=No+Image",
        createdAt: product.meta?.createdAt || product.createdAt || new Date().toISOString(),
        rating: product.rating || 4.5,
    };
}

// -------------------------
//  Get All Products
// -------------------------
export async function getProducts({ limit = 24, skip = 0 } = {}) {
    const res = await fetch(`${API_BASE_URL}/products?limit=${limit}&skip=${skip}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    const processed = (data.products || []).map(processProduct);
    processed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return {
        products: processed,
        total: data.total || processed.length,
        limit: data.limit || limit,
        skip: data.skip || skip,
    };
}

// -------------------------
//  Get My Products (Pagination Ready)
// -------------------------
export async function getMyProducts(sellerId, page = 1, limit = 12) {
    if (!sellerId) throw new Error("Seller ID required");

    const res = await fetch(
        `${API_BASE_URL}/my-products?sellerId=${sellerId}&page=${page}&limit=${limit}`,
        { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to load your products");

    const data = await res.json();
    const productsArray = Array.isArray(data) ? data : data.products || [];
    const processed = productsArray.map(processProduct);

    return {
        products: processed,
        total: data.total || processed.length,
        hasMore: data.hasMore ?? processed.length === limit,
    };
}

// -------------------------
//  Get Single Product
// -------------------------
export async function getProductById(id) {
    if (!id) throw new Error("Product ID required");

    const res = await fetch(`${API_BASE_URL}/products/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Product not found");

    const data = await res.json();
    return processProduct(data);
}

// -------------------------
//  CRUD Operations
// -------------------------
export async function createProduct(productData, sellerId) {
    const payload = { ...productData, sellerId, createdAt: new Date(), updatedAt: new Date() };
    const res = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Failed to create product");
    }

    return res.json();
}

export async function updateProduct(id, updatedData, sellerId) {
    const payload = { ...updatedData, sellerId, updatedAt: new Date() };
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Failed to update product");
    }

    return res.json();
}

export async function deleteProduct(id) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete product");
    return res.json();
}

// -------------------------
//  Categories
// -------------------------
export async function getCategories() {
    const res = await fetch(`${API_BASE_URL}/categories`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch categories");

    const data = await res.json();
    return Array.isArray(data) ? data : [];
}

// -------------------------
//  Get Products by Category
// -------------------------
export async function getProductsByCategory(category, { limit = 24, skip = 0 } = {}) {
    if (!category) return { products: [], total: 0 };

    const res = await fetch(`${API_BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load category products");

    const data = await res.json();
    const processed = (data.products || []).map(processProduct);
    processed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return { products: processed, total: data.total || processed.length };
}

// -------------------------
//  Search Products
// -------------------------
export async function searchProducts(query) {
    if (!query) return [];

    const res = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Search failed");

    const data = await res.json();
    const processed = (Array.isArray(data) ? data : data.products || []).map(processProduct);
    processed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return processed;
}

// -------------------------
//  Filter Products
// -------------------------
export async function getProductsByPrice(minPrice = 0, maxPrice = 999999) {
    const res = await fetch(`${API_BASE_URL}/products/filter?minPrice=${minPrice}&maxPrice=${maxPrice}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Filtering failed");

    const data = await res.json();
    const processed = (Array.isArray(data) ? data : []).map(processProduct);
    processed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return processed;
}

export async function getProductsByBrand(brand) {
    if (!brand) return [];
    const res = await fetch(`${API_BASE_URL}/products/brand/${brand}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Brand filter failed");
    const data = await res.json();
    return (Array.isArray(data) ? data : []).map(processProduct);
}

export async function getProductsByTag(tag) {
    if (!tag) return [];
    const res = await fetch(`${API_BASE_URL}/products/tags/${tag}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Tag filter failed");
    const data = await res.json();
    return (Array.isArray(data) ? data : []).map(processProduct);
}
