import React from 'react'
import { BsHeart } from 'react-icons/bs'

export default function SeeOthers() {
  return (
    <div className="container pb-[80px]">
      <h3 className="text-[22px] mb-5 text-center font-bold md:mb-8 lg:mb-[68px] lg:text-4xl">
        看別人怎麼玩
      </h3>
      <div className="md:flex">
        {/* 這是地圖 */}
        <div className="bg-[#E7E7E7] h-[324px] mb-6 order-1 flex-grow md:mb-0 md:h-auto">
          我是地圖
        </div>

        {/* 這是別人行程卡片 */}
        <ul className="flex flex-wrap space-x-4 space-y-5  md:mr-6 md:max-w-[190px] lg:max-w-[360px]">
          <li className="w-[calc(50%-8px)] p-4 pr-2 bg-[#E7E7E7] lg:py-7 md:w-full">
            <h4 className="text-lg mb-3 lg:text-xl lg:mb-5">好瘋狂熱血青年</h4>
            <div className="flex justify-between text-[#737373]">
              <span className="bg-[#D9D9D9] text-sm rounded-2xl py-[2px] px-3 lg:text-base">
                城市走走
              </span>
              <div className="flex items-center">
                <BsHeart className="text-lg mr-2" />
                <span>100</span>
              </div>
            </div>
          </li>
          {/* 這邊到時候用map跑時，當為index(1,2,3)，增加以下不同className */}
          <li className="w-[calc(50%-8px)] p-4 pr-2 bg-[#E7E7E7] lg:py-7 max-md:!mt-0 md:!ml-0 md:w-full">
            <h4 className="text-lg mb-3 lg:text-xl lg:mb-5">好瘋狂熱血青年</h4>
            <div className="flex justify-between text-[#737373]">
              <span className="bg-[#D9D9D9] text-sm rounded-2xl py-[2px] px-3 lg:text-base">
                城市走走
              </span>
              <div className="flex items-center">
                <BsHeart className="text-lg mr-2" />
                <span>100</span>
              </div>
            </div>
          </li>
          {/* 這邊到時候用map跑時，當為index(1,2,3)，增加以下不同className */}
          <li className="w-[calc(50%-8px)] p-4 pr-2 bg-[#E7E7E7] lg:py-7 !ml-0 md:w-full">
            <h4 className="text-lg mb-3 lg:text-xl lg:mb-5">好瘋狂熱血青年</h4>
            <div className="flex justify-between text-[#737373]">
              <span className="bg-[#D9D9D9] text-sm rounded-2xl py-[2px] px-3 lg:text-base">
                城市走走
              </span>
              <div className="flex items-center">
                <BsHeart className="text-lg mr-2" />
                <span>100</span>
              </div>
            </div>
          </li>
          {/* 這邊到時候用map跑時，當為index(1,2,3)，增加以下不同className */}
          <li className="w-[calc(50%-8px)] p-4 pr-2 bg-[#E7E7E7] lg:py-7 md:!ml-0 md:w-full">
            <h4 className="text-lg mb-3 lg:text-xl lg:mb-5">好瘋狂熱血青年</h4>
            <div className="flex justify-between text-[#737373]">
              <span className="bg-[#D9D9D9] text-sm rounded-2xl py-[2px] px-3 lg:text-base">
                城市走走
              </span>
              <div className="flex items-center">
                <BsHeart className="text-lg mr-2" />
                <span>100</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
