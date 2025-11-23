import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-blue-500 mb-4">FlixoCart</h2>
          <p className="text-gray-400">
            Your one-stop online shop. Quality products delivered fast.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-blue-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-blue-500 transition">
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="hover:text-blue-500 transition"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-blue-500 transition">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <p>Email: support@flixocart.com</p>
          <p>Phone: +880 123 456 789</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-blue-500 transition">
              Facebook
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              Twitter
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} FlixoCart. All rights reserved.
      </div>
    </footer>
  );
}
