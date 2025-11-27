
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function CategoryGrid({ categories = [] }) {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No categories found</p>
      </div>
    );
  }

  return (
    <section>
      <div
        className="
      grid grid-cols-2        
      sm:grid-cols-3            
      lg:grid-cols-4            
      gap-4 sm:gap-5 lg:gap-7   
    "
      >
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/categories/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="
            group relative block overflow-hidden rounded-2xl 
            shadow-md hover:shadow-xl 
            transition-all duration-500 
            hover:-translate-y-2 
            bg-white
          "
          >
            {/* Image */}
            <div className="relative aspect-square">
              <Image
                src={cat.img || "/placeholder-category.jpg"}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 25vw"
                className="object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6 text-white">
              {/* Category Name */}
              <h3
                className="
    font-black 
    text-lg           
    sm:text-xl 
    lg:text-2xl 
    xl:text-3xl 
    leading-tight 
    line-clamp-2 
    drop-shadow-lg
  "
              >
                {cat.name}
              </h3>

              {/* Product Count - */}
              <p
                className="
    font-black text-yellow-400 
    text-lg          
    sm:text-4xl 
    lg:text-5xl 
    xl:text-6xl 
    leading-none 
    mt-1 
    drop-shadow-2xl
  "
              >
                {cat.count}+
              </p>

              <p
                className="
    text-sm           /* Mobile: */
    sm:text-base 
    lg:text-lg 
    opacity-90 
    mt-1 
    font-medium 
    tracking-wider
  "
              >
                Products
              </p>

              <div
                className="
    mt-4 
    translate-y-8 opacity-0 
    group-hover:translate-y-0 group-hover:opacity-100 
    transition-all duration-500 ease-out
  "
              >
                <span
                  className="
      inline-flex items-center gap-2 
      bg-white text-black font-bold 
      px-4 py-2.5           
      sm:px-5 sm:py-3 
      lg:px-6 lg:py-3.5 
      rounded-full 
      text-sm sm:text-base 
      shadow-xl 
      hover:shadow-2xl 
      hover:bg-gray-100 
      transition-all duration-300 
      active:scale-95
    "
                >
                  Shop Now
                  <ChevronRight
                    className="
          w-4 h-4 
          sm:w-5 sm:h-5 
          transition-transform group-hover:translate-x-1
        "
                  />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex mt-8 justify-center items-center ">
        <Link href="/categories">
          <button className=" bg-black text-white outline-1 outline-orange-600 hover:bg-red-700  px-8 py-5 rounded-2xl text-xl font-bold flex items-center gap-3 shadow-2xl hover:scale-105 transition">
            All Categories <ChevronRight size={32} />
          </button>
        </Link>
      </div>
    </section>
  );
}
