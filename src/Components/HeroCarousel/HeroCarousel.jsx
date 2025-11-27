
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";


import "swiper/css";
import "swiper/css/autoplay";

const slides = [
  {
    title: "MEGA FLASH SALE",
    highlight: "UP TO 80% OFF",
    desc: "Biggest deals of the year – Limited stock!",
    img: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1920&h=1080&fit=crop",
  },
  {
    title: "NEW SEASON ARRIVALS",
    highlight: "FRESH DROPS",
    desc: "Latest fashion, electronics & home essentials",
    img: "https://images.unsplash.com/photo-1611403570720-162d8829689a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHNhbGVzfGVufDB8fDB8fHww?w=1920&h=1080&fit=crop",
  },
  {
    title: "FREE SHIPPING NATIONWIDE",
    highlight: "ON ORDERS $99+",
    desc: "Fast delivery • 100% secure payment",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=1080&fit=crop",
  },
  {
    title: "ELECTRONICS BLOWOUT",
    highlight: "UP TO 70% OFF",
    desc: "Phones, laptops, gadgets – Best prices guaranteed",
    img: "https://plus.unsplash.com/premium_photo-1673429738836-b3581b1b6636?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA5fHxzaG9wfGVufDB8fDB8fHww?w=1920&h=1080&fit=crop",
  },
  {
    title: "FASHION FRENZY",
    highlight: "STARTING $9.99",
    desc: "Trendy outfits for men, women & kids",
    img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=1080&fit=crop",
  },
];

export default function HeroCarousel() {
  return (
    <div className="relative h-[70vh] md:h-[85vh] lg:h-[90vh] overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={1000}
        grabCursor={true}
        className="h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full">
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                priority={i === 0}
                className="object-cover brightness-[0.7]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white">
                  <div className="max-w-4xl">
                    <p className="text-yellow-400 font-bold text-sm sm:text-lg uppercase tracking-widest mb-4">
                      Limited Time Only
                    </p>
                    <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black leading-tight mb-6">
                      {slide.title}
                      <br />
                      <span className="text-red-500">{slide.highlight}</span>
                    </h1>
                    <p className="text-lg sm:text-2xl mb-10 max-w-2xl opacity-90">
                      {slide.desc}
                    </p>
                    <Link href="/products">
                      <button className="bg-red-600 hover:bg-red-700 px-8 py-5 rounded-full text-xl font-bold flex items-center gap-3 shadow-2xl hover:scale-105 transition">
                        Shop Now <ChevronRight size={32} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
