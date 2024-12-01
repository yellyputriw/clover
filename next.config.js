/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos'],
  },
  transpilePackages: ['ahooks'],
};

module.exports = nextConfig;
