/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',    // আগের image sources
      'res.cloudinary.com',     // cloudinary images
      'cdn.dummyjson.com',      // dummyjson images
      'via.placeholder.com',    // placeholder fallback
      'www.google.com',         // তোমার Google link এর জন্য
    ],
  },
};

export default nextConfig;
