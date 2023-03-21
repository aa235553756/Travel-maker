/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 這個只是先讓台北旅遊網的圖片可以放上來
    domains: ['www.travel.taipei'],
  },
}

module.exports = nextConfig
