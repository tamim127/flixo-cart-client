// app/layout.jsx
import "@/Styles/globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import { AuthProvider } from "@/Context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import { CartProvider } from "@/Context/CartContext";
import { WishlistProvider } from "@/Context/WishlistContext";
import { UserProvider } from "@/Context/UserContext";

// Best font for modern e-commerce
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "FlixoCart - Premium Online Shopping",
  description: "Next.js Full-Stack E-commerce Store with Cart",
  keywords: "ecommerce, shopping, online store, nextjs, react",
  authors: [{ name: "FlixoCart Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const revalidate = 60;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        cz-shortcut-listen="true"
        className={`${inter.className} bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <UserProvider>
                {/* Sticky Navbar */}
                <Navbar />

                {/* Toast Notifications */}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: "#1f2937",
                      color: "#fff",
                      fontWeight: "500",
                    },
                    success: {
                      iconTheme: { primary: "#10b981", secondary: "#fff" },
                    },
                  }}
                />

                {/* Main Content - Full Width + Responsive Padding */}
                <main className="min-h-screen pt-16 lg:pt-20  sm:px-6 lg:px-8">
                  <div className="max-w-[1920px] mx-auto  sm:px-6 lg:px-8">
                    {children}
                  </div>
                </main>

                {/* Footer */}
                <Footer />
              </UserProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
