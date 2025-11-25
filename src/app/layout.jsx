// app/layout.jsx
import "@/Styles/globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import { AuthProvider } from "@/Context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";

// Best font for modern e-commerce
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "FlixoCart - Premium Online Shopping",
  description:
    "Next.js 14 Full-Stack E-commerce Store with Cart, Auth & Admin Panel",
  keywords: "ecommerce, shopping, online store, nextjs, react",
  authors: [{ name: "FlixoCart Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
};

export const revalidate = 60; // ISR for better performance

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        cz-shortcut-listen="true"
        className={`${inter.className} bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>
          {/* Sticky Navbar */}
          <Navbar />

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
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
          <main className="flex-1 w-full">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
