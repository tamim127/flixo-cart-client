import "@/Styles/globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import { AuthProvider } from "@/Context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "FlixoCart",
  description: "Full Stack Shopping App",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body cz-shortcut-listen="true">
        <div className="max-w-7xl mx-auto flex flex-col min-h-screen">
          <AuthProvider>
            <Navbar />
            <Toaster />
            <div className=" max-w-7xl mx-auto  ">{children}</div>
            <Footer />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
