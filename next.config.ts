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
    domains: ['arthurfrost.qflo.co.za'],
  },
  /* config options here */
};

export default nextConfig;
