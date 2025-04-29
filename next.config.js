/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  // Enable both App Router and Pages Router
  experimental: {
    appDir: true,
  },
  // Add custom error handling
  onDemandEntries: {
    // Handle errors
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  }
};

module.exports = nextConfig; 