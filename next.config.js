const withNextIntl = require('next-intl/plugin')(
  './i18n/request.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = withNextIntl(nextConfig);


