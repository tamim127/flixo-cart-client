import { ShoppingCart } from 'lucide-react';
import React from 'react';

const Button = () => {
    return (
      <div className="px-2 pb-3 sm:px-3 sm:pb-4 mt-auto">
        <button
          className="
    w-full group relative overflow-hidden
    bg-gradient-to-r from-black to-gray-900 hover:from-red-600 hover:to-red-700
    text-white font-bold rounded-2xl shadow-lg hover:shadow-xl
    flex items-center justify-center gap-2
    transition-all duration-400 active:scale-95
    py-3 text-xs sm:text-sm md:text-base
    tracking-wide
  "
        >
          <ShoppingCart className="size-4 sm:size-5 md:size-6 transition-transform group-hover:translate-x-1 duration-300" />
          <span className="relative">
            Add to Cart
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-12 transition-transform duration-700 group-hover:translate-x-[100%]" />
        </button>
      </div>
    );
};

export default Button;