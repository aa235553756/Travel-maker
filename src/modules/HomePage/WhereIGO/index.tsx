import React from 'react'
import ChageButton from '@/common/ChageButton'

export default function WhereIGO() {
  return (
    <div className="pt-5 pb-9 lg:pt-[108px] lg:pb-[114px] bg-[#EFEFEF]">
      <div className="container md:max-w-[calc(652px+32px)] lg:max-w-[calc(1128px+224px)] lg:flex lg:items-end">
        <div>
          <h3 className="text-[22px] mb-6 xl:text-4xl">我想去哪裡...</h3>
          <p className="text-[#9F9F9F] mb-10 xl:text-2xl">
            開啟隨機產生器，讓你每天生活有樂趣。
          </p>
          <ChageButton lg_display={true} />
        </div>
        <div className="w-[316px] relative mx-auto md:w-auto lg:mr-0">
          <div className="flex flex-wrap justify-center md:justify-start space-x-5 space-y-5 md:flex-nowrap md:space-y-0 mb-[60px] lg:mb-0">
            <img src="https://fakeimg.pl/148/" alt="" />
            <img className="!mt-0" src="https://fakeimg.pl/148/" alt="" />
            <img
              className="!ml-0 md:!ml-5"
              src="https://fakeimg.pl/148/"
              alt=""
            />
            <img src="https://fakeimg.pl/148/" alt="" />
          </div>
          <p className="text-[#737373]  absolute top-[calc(100%+8px)] right-0 lg:right-auto lg:top-auto lg:bottom-0 lg:-translate-x-[calc(100%+8px)]">
            放鬆療癒
          </p>
        </div>
        <ChageButton />
      </div>
    </div>
  )
}
