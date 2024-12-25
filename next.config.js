/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 如果你使用了 basePath
  // basePath: '',
}

module.exports = nextConfig 