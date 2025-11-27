import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <div className="text-6xl sm:text-7xl md:text-9xl mb-6 sm:mb-8 font-extrabold text-red-600">
          Thank You
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 sm:mb-6">
          Order Successful!
        </h1>
        <p className="text-lg sm:text-xl md:text-3xl text-gray-700 mb-6 sm:mb-10">
          We have received your order. It will be delivered shortly.
        </p>
        <Link href="/">
          <button className="bg-red-600 text-white px-8 sm:px-12 md:px-16 py-3 sm:py-5 md:py-8 rounded-full text-lg sm:text-2xl md:text-3xl font-bold hover:bg-red-700 transition">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
