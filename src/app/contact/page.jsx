"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form Data:", data);
    toast.success("Thank you! Your message has been sent successfully!");
    reset();
    setIsSubmitting(false);
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-light opacity-90 max-w-2xl sm:max-w-3xl mx-auto">
              Have a question? We're here 24/7 to help you with anything
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 sm:p-16 md:p-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
            {[
              {
                icon: Phone,
                title: "Call Us",
                gradient: "from-emerald-500 to-teal-600",
                details: ["+880 1999-123456", "+880 1611-123456"],
              },
              {
                icon: Mail,
                title: "Email Us",
                gradient: "from-blue-500 to-cyan-500",
                details: ["support@amrflixocart.com", "hello@amrflixocart.com"],
              },
              {
                icon: MapPin,
                title: "Visit Us",
                gradient: "from-purple-500 to-pink-600",
                details: ["147/3 Green Road", "Dhaka 1205, Bangladesh"],
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.7 }}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 sm:p-10 text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/95">
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-br ${item.gradient} p-4 sm:p-5 shadow-2xl group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}
                  >
                    <item.icon className="w-6 sm:w-10 h-6 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">
                    {item.title}
                  </h3>
                  {item.details.map((line, i) => (
                    <p
                      key={i}
                      className="text-gray-600 text-sm sm:text-base font-medium"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-12 border border-gray-100">
                <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-center mb-6 sm:mb-10 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Send us a Message
                </h2>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5 sm:space-y-7"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-7">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Full Name
                      </label>
                      <input
                        {...register("name", {
                          required: "Please enter your name",
                        })}
                        placeholder="John Doe"
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-gray-800 placeholder-gray-400"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Phone Number
                      </label>
                      <input
                        {...register("phone", {
                          required: "Phone number required",
                          pattern: {
                            value: /^01[3-9]\d{8}$/,
                            message: "Invalid BD number",
                          },
                        })}
                        placeholder="01999-123456"
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email",
                        },
                      })}
                      placeholder="you@example.com"
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                      Subject
                    </label>
                    <input
                      {...register("subject", {
                        required: "Please write a subject",
                      })}
                      placeholder="Order issue / Refund / General inquiry"
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                      Your Message
                    </label>
                    <textarea
                      {...register("message", {
                        required: "Please write your message",
                        minLength: {
                          value: 15,
                          message: "At least 15 characters",
                        },
                      })}
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all resize-none text-gray-800"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white font-bold text-lg sm:text-xl py-3 sm:py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 sm:gap-3 transition-transform duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 sm:w-6 h-5 sm:h-6 animate-spin" />
                    ) : (
                      <Send className="w-5 sm:w-6 h-5 sm:h-6" />
                    )}
                    {isSubmitting ? " Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Map + Support Hours */}
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-10"
            >
              {/* Map */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 sm:border-8 border-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.531445667649!2d90.389781614964!3d23.762175984583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bcd6817fcb%3A0x8ac3d93e2c1e4c92!2sGreen%20Road%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1730000000000"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Our Location"
                ></iframe>
              </div>

              {/* Support Hours */}
              <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-3xl shadow-xl p-6 sm:p-10 border border-orange-100">
                <div className="flex items-center gap-3 sm:gap-5 mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Clock className="w-5 sm:w-9 h-5 sm:h-9 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Support Hours
                  </h3>
                </div>
                <div className="space-y-4 sm:space-y-6 text-sm sm:text-base">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">
                      Saturday – Thursday
                    </span>
                    <span className="font-bold text-orange-600">
                      9:00 AM – 10:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Friday</span>
                    <span className="font-bold text-red-600">Closed</span>
                  </div>
                  <div className="pt-4 sm:pt-6 border-t-2 border-orange-200 flex items-center gap-2 sm:gap-3 text-green-600 font-bold text-base sm:text-xl">
                    <CheckCircle className="w-5 sm:w-8 h-5 sm:h-8" />
                    Live Chat Available 24/7
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
