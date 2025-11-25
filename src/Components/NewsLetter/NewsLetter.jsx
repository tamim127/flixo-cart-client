export default function Newsletter() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-5xl md:text-6xl font-black mb-6">
          Get Exclusive Deals
        </h2>
        <p className="text-2xl mb-10 opacity-90">
          First Order 15% OFF + Free Shipping on $99+
        </p>
        <form className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-8 py-6 rounded-full text-black text-xl outline-none"
          />
          <button className="bg-red-600 hover:bg-red-700 px-12 py-6 rounded-full text-xl font-bold transition">
            Subscribe Now
          </button>
        </form>
      </div>
    </section>
  );
}
