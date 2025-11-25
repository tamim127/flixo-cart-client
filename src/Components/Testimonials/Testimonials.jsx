import { Star } from 'lucide-react';
import React from 'react'

export default function Testimonials() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-16">
          Loved by Thousands
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              name: "Rahim Khan",
              rating: 5,
              text: "Best prices in Bangladesh! Fast delivery",
            },
            {
              name: "Ayesha Siddika",
              rating: 5,
              text: "Original products, 100% trusted store",
            },
            {
              name: "Karim Ahmed",
              rating: 5,
              text: "Customer support is amazing!",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl hover:bg-white/20 transition"
            >
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-lg italic mb-6">"{t.text}"</p>
              <p className="font-bold text-xl">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
