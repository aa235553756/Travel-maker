import React from 'react'
import ChageButton from '@/common/components/ChageButton'

export default function WhereIGO() {
  return (
    <div className="pt-11 pb-9 lg:pt-36 lg:pb-24 bg-[#EFEFEF]">
      <div className="container lg:flex lg:items-end">
        <div>
          <h3 className="text-[22px] mb-2 lg:h-[52px] lg:text-4xl">
            我想去哪裡...
          </h3>
          <p className="text-[#646464] mb-10 lg:text-2xl">
            開啟隨機產生器，讓你每天生活有樂趣。
          </p>
          <ChageButton lg_display={true} />
        </div>
        <div className="w-[316px] relative mx-auto md:w-auto lg:mr-0">
          <div className="flex flex-wrap justify-center md:justify-start md:flex-nowrap mb-8 lg:-mb-5">
            {Array(4)
              .fill('')
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-[148px] h-[148px] mr-5 even:mr-0 mb-5 md:even:mr-5 [&:nth-child(4)]:mr-0 custom-shadow relative"
                  >
                    <img
                      className="object-cover h-full"
                      src="https://www.travel.taipei/image/222058/?r=1637650550884"
                      alt=""
                    />
                  </div>
                )
              })}
          </div>
          <p className="text-[#4B673B] absolute -bottom-2 right-0 lg:right-auto lg:top-auto lg:bottom-0 lg:-translate-x-[calc(100%+8px)]">
            放鬆療癒
          </p>
        </div>
        <ChageButton />
      </div>
    </div>
  )
}
