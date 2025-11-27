
"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = currentUser?.uid;

  // cart load
  useEffect(() => {
    const loadCart = async () => {
      if (userId) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart?userId=${userId}`
          );
          const data = await res.json();
          const serverItems = data.items || [];

          const localCart = JSON.parse(
            localStorage.getItem("guestCart") || "[]"
          );
          if (localCart.length > 0) {
            for (const item of localCart) {
              await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, product: item }),
              });
            }
            localStorage.removeItem("guestCart");
          }
          setCart(serverItems.length > 0 ? serverItems : localCart);
        } catch (err) {
          console.error("Cart load failed:", err);
          setCart([]);
        }
      } else {
        const local = JSON.parse(localStorage.getItem("guestCart") || "[]");
        setCart(local);
      }
      setLoading(false);
    };

    loadCart();
  }, [userId]);

  // for guest user save on localStorage
  useEffect(() => {
    if (!userId && !loading) {
      localStorage.setItem("guestCart", JSON.stringify(cart));
    }
  }, [cart, userId, loading]);

  // Add to Cart + redirect
  const addToCart = async (product) => {
    const item = {
      productId: product._id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
    };

    // move to server for login user
    if (userId) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, product: item }),
        });
      } catch (err) {
        toast.error("Failed to sync with server");
      }
    }

    // frontend update
    setCart((prev) => {
      const exists = prev.find((p) => p.productId === item.productId);
      if (exists) {
        return prev.map((p) =>
          p.productId === item.productId
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    // toast + redirect
    toast.success("Added to cart!", { duration: 1500 });
    setTimeout(() => {
      router.push("/cart");
    }, 1600);
  };

  // Remove from MongoDB with error handeling
  const removeFromCart = async (productId) => {
    if (userId) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/item`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, productId }),
          }
        );

        if (!res.ok) throw new Error("Server delete failed");
      } catch (err) {
        console.error("Failed to remove from server:", err);
        toast.error("Removed locally only");
      }
    }

    // remove from frontend
    setCart((prev) => prev.filter((p) => p.productId !== productId));

    // For guest remove from localStorage
    if (!userId) {
      const updated = cart.filter((p) => p.productId !== productId);
      localStorage.setItem("guestCart", JSON.stringify(updated));
    }

    toast.success("Removed from cart");
  };

  const clearCart = async () => {
    if (userId) {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/clear`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      }).catch(() => {});
    }
    setCart([]);
    localStorage.removeItem("guestCart");
    toast.success("Cart cleared!");
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
