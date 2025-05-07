// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
// };

// module.exports = {
//   // ...
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'img.youtube.com',
//       },
//     ],
//   },
// }

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: 'www.nme.com',
      },
      {
        protocol: 'https',
        hostname: 'www.meatlesskingdom.com',
      },
      {
        protocol: 'https',
        hostname: 'variety.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // ✅ ditambahkan di sini
      }
    ],
    // Opsi tambahan (jika diperlukan):
    minimumCacheTTL: 60, // Cache selama 60 detik
    formats: ['image/webp'], // Otomatis konversi ke webp
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Breakpoint responsive
  },
  
  reactStrictMode: true,
  // swcMinify: true,
};

module.exports = nextConfig;