// next.config.js

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
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "www.statesman.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    minimumCacheTTL: 60,
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  reactStrictMode: true,
  // swcMinify: true, // Uncomment if needed
};

module.exports = nextConfig;
