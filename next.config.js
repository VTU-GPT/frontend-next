/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 't1.gstatic.com',
        port: '',
      },
    ],
  }
}

module.exports = nextConfig
