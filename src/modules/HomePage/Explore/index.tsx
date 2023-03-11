import React from 'react'
import ExploreCarousel from '../../../package/HomePage/ExploreCarousel'

export default function Explore() {
  return (
    <div>
      <div className="pb-[100px]">
        <div className="container">
          <div className="md:flex mb-8">
            <div className="flex items-end mb-5 w-full md:flex-col md:items-start md:w-1/3">
              <h2 className="font-bold text-[22px] mr-5 md:mb-4 md:text-4xl">Explore</h2>
              <p className="text-lg md:text-4xl">探索臺北每個角落</p>
            </div>
            <div className="w-full md:w-5/12">
              <p className="mb-6 md:text-lg">
                熱鬧繁榮的台北，充滿各種自然景致，還有文藝氣息的文創園區與在地必嚐美食，等待著體驗歷史人文的靈魂旅行。想要來場隨機之旅嗎？在台灣這片土地上探索台北的每個角落，快來一起朝聖。
              </p>
              <button className="border py-4 w-[170px] mx-auto hidden md:block md:float-right">
                更多行程
              </button>
            </div>
          </div>
        </div>
        <ExploreCarousel />
        <button className="border py-4 w-[170px] mx-auto block mt-12 md:hidden md:float-right md:mt-0">
                更多行程
              </button>
      </div>
    </div>
  )
}
