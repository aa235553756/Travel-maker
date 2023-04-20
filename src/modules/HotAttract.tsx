import AttrCard from '@/common/components/card/AttrCard'
import React from 'react'

export default function HotAttract() {
  return (
    <div>
      <div className="container">
        <div className="pb-[100px] lg:pb-[160px]">
          <h2 className="flex lg:text-[36px] font-bold text-[22px] mb-8 lg:mb-12 -ml-2 justify-center items-center">
            {/* <BsGeoAltFill className="text-xl mr-3" /> */}
            尚夯ㄟ景點
          </h2>
          <ul className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-8 lg:space-x-0 items-center justify-between">
            {Array(3)
              .fill('')
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    className="max-w-[328px] md:[&:nth-child(3)]:hidden lg:[&:nth-child(3)]:block"
                  >
                    <AttrCard
                      attractName="彩虹橋"
                      district="大安"
                      rating={1.5}
                      imagesUrl="/logo"
                      type={['城市走走']}
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
