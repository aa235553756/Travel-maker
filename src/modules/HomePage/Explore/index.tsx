import Link from 'next/link'
import React from 'react'
import ExploreCarousel from '../../../package/HomePage/ExploreCarousel'

export default function Explore() {
  return (
    <div>
      <div className="pt-[50px] lg:pt-0 pb-[70px] lg:pb-[210px]">
        <div className="container">
          <div className="lg:flex mx-auto lg:w-10/12 justify-between mb-6 lg:mb-8">
            {/* title */}
            <div className="flex items-center mb-5 w-full lg:flex-col lg:items-start lg:w-1/3">
              <h3 className="font-bold text-[22px] mr-5 lg:mb-8 lg:text-4xl text-primary">
                Explore
              </h3>
              <p className="text-lg md:text-[22px] lg:text-4xl">
                探索臺北每個角落
              </p>
            </div>
            {/* param */}
            <div className="w-full lg:w-[456px]">
              <p className="mb-12 lg:mb-6 md:text-lg lg:text-xl lg:leading-[1.5] text-gray-73">
                熱鬧繁榮的台北，充滿各種自然景致，還有文藝氣息的文創園區與在地必嚐美食，等待著體驗歷史人文的靈魂旅行。想要來場隨機之旅嗎？在台灣這片土地上探索台北的每個角落，快來一起朝聖。
              </p>
              <div className="mx-auto hidden lg:block lg:float-right">
                <ExploreOutlineBtn />
              </div>
            </div>
          </div>
        </div>
        <ExploreCarousel />
        <div className="text-center mt-14 lg:hidden">
          <ExploreOutlineBtn />
        </div>
      </div>
    </div>
  )
}

function ExploreOutlineBtn({}) {
  return (
    <Link
      href="/hot-topics"
      className="inline-block text-lg lg:text-base py-2 px-5 border border-primary text-primary rounded-md"
    >
      更多行程
    </Link>
  )
}
