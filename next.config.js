/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  // Enable App Router (no longer experimental in Next.js 13+)
  // Make sure it recognizes page.jsx as a valid page
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Add custom error handling
  onDemandEntries: {
    // Handle errors
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  }
};

module.exports = nextConfig; 