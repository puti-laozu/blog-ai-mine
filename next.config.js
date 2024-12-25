/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['raw.githubusercontent.com', 'github.com'],
  },
  output: 'standalone'
}

module.exports = nextConfig 