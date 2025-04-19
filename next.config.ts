import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com', // replace with actual domain
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // disables eslint build blocking
  },
};

export default nextConfig;
