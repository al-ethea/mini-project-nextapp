import type { NextConfig } from "next";

const nextConfig: NextConfig = {
};

module.exports = {
  // ...
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
}

export default nextConfig;


