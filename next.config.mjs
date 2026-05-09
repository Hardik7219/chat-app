/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
    turbo: false,   // disable turbopack
  },
  swcMinify: false, 
};

export default nextConfig;
