const withPWA = require('next-pwa')({
  dest: 'public',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    runtime: 'nodejs',
  },
};

module.exports = withPWA(nextConfig);
