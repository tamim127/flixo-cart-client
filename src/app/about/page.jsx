"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Truck,
  Shield,
  Clock,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import teamImg from "../../../src/assets/team.jpg";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-pink-600 to-purple-700 text-white py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute top-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 tracking-tight">
              About AMR FLIXO CART
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light max-w-3xl sm:max-w-4xl mx-auto opacity-95">
              Bangladesh's Fastest Growing Online Shopping Destination
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 mt-8 sm:mt-10 text-2xl sm:text-3xl font-bold">
              <div>
                <span className="block text-3xl sm:text-5xl">500K+</span>
                <span className="text-sm sm:text-lg">Happy Customers</span>
              </div>
              <div>
                <span className="block text-3xl sm:text-5xl">50K+</span>
                <span className="text-sm sm:text-lg">Daily Orders</span>
              </div>
              <div>
                <span className="block text-3xl sm:text-5xl">64</span>
                <span className="text-sm sm:text-lg">Districts Covered</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6 sm:mb-8">
                We Deliver Happiness at Your Doorstep
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                Founded in 2023, AMR FLIXO CART started with a simple mission —
                to make online shopping easy, fast, and affordable for every
                Bangladeshi.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                Today, we are one of the fastest-growing e-commerce platforms in
                Bangladesh, delivering joy to over half a million customers
                across all 64 districts.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                From fashion to electronics, groceries to gadgets — we bring
                everything you love, right to your doorstep with love.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
                <Image
                  src={teamImg}
                  alt="Team"
                  className="rounded-3xl w-full h-auto object-cover"
                />
                <div className="absolute -bottom-4 -left-4 bg-orange-600 text-white px-6 py-2 sm:px-8 sm:py-4 rounded-2xl shadow-2xl text-lg sm:text-2xl font-bold">
                  Since 2023
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 sm:mb-4">
              Why Millions Trust FLIXO CART
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              We don't just sell products — we deliver trust
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-7xl mx-auto">
            {[
              {
                icon: Truck,
                title: "Fastest Delivery",
                desc: "Same day delivery in Dhaka, 2-3 days nationwide",
              },
              {
                icon: Shield,
                title: "100% Authentic Products",
                desc: "Direct from brands & authorized distributors",
              },
              {
                icon: CheckCircle,
                title: "Easy Returns",
                desc: "7 days hassle-free return & refund policy",
              },
              {
                icon: Clock,
                title: "24/7 Customer Support",
                desc: "Call, chat or email — we're always here",
              },
              {
                icon: Award,
                title: "Best Price Guaranteed",
                desc: "Found cheaper? We'll match it!",
              },
              {
                icon: Users,
                title: "500,000+ Happy Customers",
                desc: "Join Bangladesh's favorite shopping family",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                  <item.icon className="w-7 h-7 sm:w-9 sm:h-9 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-orange-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-10 border border-white/20"
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                Our Mission
              </h3>
              <p className="text-base sm:text-xl leading-relaxed opacity-95">
                To make quality products accessible to every Bangladeshi with
                the fastest delivery, best price, and world-class customer
                service.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-10 border border-white/20"
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                Our Vision
              </h3>
              <p className="text-base sm:text-xl leading-relaxed opacity-95">
                To become Bangladesh's #1 most trusted and loved online shopping
                destination by 2030.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Ready to Shop with Confidence?
            </h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-10 text-gray-300">
              Join 500,000+ happy customers who trust AMR FLIXO CART every day
            </p>
            <button className="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white font-bold text-base sm:text-xl px-8 sm:px-12 py-3 sm:py-5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 sm:gap-3 mx-auto">
              Start Shopping Now
              <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
