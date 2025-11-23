import { Geist, Geist_Mono } from "next/font/google";
import "@/Styles/globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import { AuthProvider } from "@/Context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FlixoCart",
  description: "Full Stack Shopping App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
       
          <Navbar />

          {/* Main content */}
          <main className=" max-w-7xl mx-auto flex-1 pt-24">{children}</main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
