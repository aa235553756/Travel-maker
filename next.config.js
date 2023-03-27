/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 這個只是先讓台北旅遊網的圖片可以放上來
    // 更新：domain 是 next 12以前的寫法，有兩個以上的網站好像會壞掉
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.travel.taipei',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
