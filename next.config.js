/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 這個只是先讓台北旅遊網的圖片可以放上來
    domains: ['www.travel.taipei'],
    // 這個是我要做揪人的頭貼
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig
