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

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
      },
      {
        protocol: "https",
        hostname: "www.nme.com",
      },
      {
        protocol: "https",
        hostname: "www.meatlesskingdom.com",
      },
      {
        protocol: "https",
        hostname: "variety.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
    // Additional options (if needed):
    minimumCacheTTL: 60, // Cache for 60 seconds
    formats: ["image/webp"], // Automatically convert to webp
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Responsive breakpoints
  },

  reactStrictMode: true,
  // swcMinify: true,
};

module.exports = nextConfig;
