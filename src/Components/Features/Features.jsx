import { Headphones, RefreshCw, Shield, Truck } from 'lucide-react';
import React from 'react'

export default function Features() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-16">
          Why Shop With Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Truck,
              title: "Free Shipping",
              desc: "On all orders over $99",
            },
            {
              icon: Shield,
              title: "100% Secure",
              desc: "SSL encrypted payment",
            },
            {
              icon: RefreshCw,
              title: "Easy Returns",
              desc: "30 days return policy",
            },
            {
              icon: Headphones,
              title: "24/7 Support",
              desc: "We're always here to help",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-white p-8 rounded-2xl text-center shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
            >
              <item.icon className="w-16 h-16 mx-auto mb-6 text-red-600 group-hover:scale-110 transition" />
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
