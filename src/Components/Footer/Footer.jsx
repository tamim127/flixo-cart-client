
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-2xl font-black mb-6">FLIXO</h3>
          <p className="text-gray-400">Your #1 online shopping destination</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Customer Care</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="/returns" className="hover:text-white">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-white">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Follow Us</h4>
          <p className="text-gray-400">Stay connected for latest deals</p>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-10 border-t border-gray-800 pt-8">
        © 2025 Flixo Cart. All rights reserved.
      </div>
    </footer>
  );
}
