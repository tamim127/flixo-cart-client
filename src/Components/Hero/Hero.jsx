import { ChevronRight, Zap, Truck, Shield, Clock } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative h-[800px] w-full">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1920&h=1080&fit=crop"
          alt="Mega Sale"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <p className="text-yellow-400 font-bold text-lg mb-2 tracking-wider">
              LIMITED TIME OFFER
            </p>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              FLASH SALE
              <br />
              <span className="text-6xl md:text-8xl text-red-500">
                UP TO 80% OFF
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Ends in{" "}
              <span className="text-yellow-400 font-bold">23h 45m 12s</span>
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <button className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 rounded-xl text-xl font-bold flex items-center gap-3 shadow-2xl transform hover:scale-105 transition">
                  Shop Now <ChevronRight className="w-8 h-8" />
                </button>
              </Link>
              <Link href="/categories">
                <button className="border-4 border-white text-white px-10 py-6 rounded-xl text-xl font-bold hover:bg-white hover:text-black transition">
                  All Categories
                </button>
              </Link>
            </div>
          </div>

          {/* Mini Promo Cards */}
          <div className="grid grid-cols-2 gap-6 text-black">
            {[
              {
                title: "Free Shipping",
                desc: "Orders over ৳999",
                icon: Truck,
              },
              {
                title: "7 Days Return",
                desc: "No questions asked",
                icon: Clock,
              },
              {
                title: "Secure Payment",
                desc: "100% Protected",
                icon: Shield,
              },
              { title: "24/7 Support", desc: "Dedicated help", icon: Zap },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl"
              >
                <item.icon className="w-12 h-12 text-red-600 mb-3" />
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
