// src/lib/api.js
const API_BASE_URL = "http://localhost:5000";

// --- Utility Functions ---

/**
 * Helper to calculate original price from current price and discount percentage.
 * @param {number} price 
 * @param {number} discountPercentage 
 * @returns {number} Calculated original price.
 */
function calculateOriginalPrice(price, discountPercentage) {
    if (discountPercentage > 0 && price > 0) {
        // Formula: Original Price = Current Price / (1 - Discount Percentage / 100)
        let originalPrice = price / (1 - discountPercentage / 100);
        return Math.round(originalPrice * 100) / 100; // Round to 2 decimal places
    }
    return price;
}

/**
 * Maps the raw product data from the backend to the structure expected by the frontend UI.
 * @param {Object} product 
 * @returns {Object} Processed product object.
 */
function processProduct(product) {
    // If the product object is not valid, return it as is
    if (!product || typeof product.price !== 'number') return product;

    // Calculate originalPrice and map thumbnail to imageUrl
    const processedProduct = {
        ...product,
        originalPrice: calculateOriginalPrice(product.price, product.discountPercentage),
        imageUrl: product.thumbnail || product.images?.[0] || 'https://via.placeholder.com/300?text=No+Image',
        // Ensure price is a number for safety
        price: product.price,
    };
    return processedProduct;
}


// --- CRUD API Functions ---

/**
 * C: Create a new product. (POST /products)
 */
export async function createProduct(productData) {
    const res = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });

    if (!res.ok) {
        throw new Error(`Failed to create product. Status: ${res.status}`);
    }
    return res.json();
}

/**
 * R: Fetch all products. (GET /products)
 */
export async function getProducts(options = {}) {
    // এখন limit এবং skip default values ব্যবহার করবে যদি options-এ না থাকে।
    const limit = options.limit || 24;
    const skip = options.skip || 0;

    const res = await fetch(`${API_BASE_URL}/products?limit=${limit}&skip=${skip}`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch products. Status: ${res.status}`);
    }

    const data = await res.json();

    // প্রোডাক্টগুলো process করা হলো
    const processedProducts = data.products.map(processProduct);

    return {
        products: processedProducts,
        total: data.total,
        limit: data.limit,
        skip: data.skip
    };
}

/**
 * R: Fetch a single product by ID. (GET /products/:id)
 */
export async function getProductById(id) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, { cache: "no-store" });

    if (!res.ok) {
        throw new Error(res.status === 404 ? "Product Not Found" : "Server Error");
    }

    const data = await res.json();
    return processProduct(data);
}

/**
 * U: Update an existing product. (PUT /products/:id)
 */
export async function updateProduct(id, updatedData) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
        throw new Error(`Failed to update product ${id}. Status: ${res.status}`);
    }
    return res.json();
}

/**
 * D: Delete a product. (DELETE /products/:id)
 */
export async function deleteProduct(id) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error(`Failed to delete product ${id}. Status: ${res.status}`);
    }
    return res.json();
}