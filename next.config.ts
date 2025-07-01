import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arthurfrost.qflo.co.za',
        port: '',
        pathname: '/Images/**',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
