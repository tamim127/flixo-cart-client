import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function CategoryGrid({ categories }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {categories.map((cat) => (
        <Link
          key={cat.name}
          href={`/categories/${cat.name.toLowerCase().replace(/ /g, "-")}`}
          className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4"
        >
          <Image
            src={cat.img || "https://via.placeholder.com/600x600?text=No+Image"}
            alt={cat.name}
            width={600}
            height={600}
            className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="text-3xl font-black mb-2">{cat.name}</h3>
            <p className="text-5xl font-black text-yellow-400">{cat.count}+</p>
            <p className="text-lg opacity-90">Products Available</p>
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition translate-y-4 group-hover:translate-y-0">
              <span className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold">
                Explore Now <ChevronRight />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
