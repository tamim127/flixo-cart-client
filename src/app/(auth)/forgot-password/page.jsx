"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { useAuth } from "@/Context/AuthContext";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { resetPassword, currentUser } = useAuth();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (currentUser) {
    router.push("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await resetPassword(email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back to Login */}
        <button
          onClick={() => router.push("/login")}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Login
        </button>

        {/* লোগো + টাইটেল */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-pink-600 rounded-3xl shadow-2xl mb-6">
            <Mail className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Forgot Password?
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {message ? "Check your email!" : "We'll send you a reset link"}
          </p>
        </div>

        {/* মেইন কার্ড */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-center font-medium">
              {error}
            </div>
          )}

          {message ? (
            // Success state
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-3">
                Email Sent!
              </h3>
              <p className="text-gray-700">
                Check your inbox (and spam) for the reset link.
              </p>
            </div>
          ) : (
            // Form
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-500 transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-red-600/30 transform hover:scale-[1.02] transition disabled:opacity-70 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Email"
                )}
              </button>
            </form>
          )}

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Remember your password?{" "}
              <a
                href="/login"
                className="font-bold text-red-600 hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>

        <p className="text-center mt-10 text-gray-600">
          © 2025 FlixoCart • Sell Anything, Anywhere
        </p>
      </div>
    </div>
  );
}
