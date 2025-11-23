import Link from "next/link";


export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-9xl mb-8">Thank You</div>
        <h1 className="text-6xl font-black mb-6">Order successful!</h1>
        <p className="text-3xl mb-10">
          We have received your order. It will be delivered shortly.
        </p>
        <Link href="/">
          <button className="bg-red-600 text-white px-16 py-8 rounded-full text-3xl font-bold">
          Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
