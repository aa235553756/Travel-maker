import AttrCard from '@/common/components/card/AttrCard'
import React from 'react'
import { BsFillStarFill, BsStar, BsGeoAltFill } from 'react-icons/bs'

export default function HotAttract() {
  return (
    <div>
      <div className="container">
        <div className="pb-[100px] lg:pb-[160px]">
          <h2 className="flex text-[22px] mb-8 lg:mb-12 -ml-2 justify-center items-center">
            <BsGeoAltFill className="text-xl mr-3" />
            尚夯ㄟ景點
          </h2>
          <ul className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-8 lg:space-x-0 items-center justify-between">
            {Array(3)
              .fill('')
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    className="md:[&:nth-child(3)]:hidden lg:[&:nth-child(3)]:block"
                  >
                    <AttrCard
                      attractName="彩虹橋"
                      district="大安"
                      rating={1.5}
                    />
                  </div>
                )
              })}
          </ul>
        </div>
      </div>
    </div>
  )
}
