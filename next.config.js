/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Force bypass of the corrupted .next/cache folder
    config.cache = false;
    return config;
  },
}

module.exports = nextConfig;
