const withNextIntl = require('next-intl/plugin')('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@tsparticles/react', '@tsparticles/engine', '@tsparticles/slim'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/images/favicon.png',
      },
    ];
  },
  webpack: (config) => {
    // Force bypass of the corrupted .next/cache folder
    config.cache = false;
    return config;
  },
};

module.exports = withNextIntl(nextConfig);


