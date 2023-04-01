import React from 'react'
import { BsHeart } from 'react-icons/bs'
import { SeeOthersHoverEffect } from '@/modules/SeeOthersHoverEffect'
import { SeeOthersCardProp } from './index'

export function SeeOthersCard({
  TourName,
  Category,
  Like,
  ImageUrl,
}: SeeOthersCardProp) {
  return (
    <li className="mr-4 mb-4 even:mr-0 md:mr-0 w-[calc(50%-8px)] md:w-full rounded-xl">
      <a
        href=""
        className="py-4 pl-3 pr-2 lg:pt-7 lg:pb-5 lg:px-5 bg-cover bg-center rounded-xl block group relative"
        style={{
          backgroundImage: `url(${ImageUrl})`,
        }}
      >
        <div className="absolute bottom-0 left-0 w-full h-[105px] bg-gradient-to-b from-[rgba(255,255,255,0.0)] to-black rounded-xl"></div>
        {/* hover效果,這邊問設計 */}
        <SeeOthersHoverEffect />
        {/* 資訊文字 */}
        <div className="relative group-hover:opacity-20 group-hover:back">
          <h4 className="text-lg mb-3 lg:text-xl text-white lg:mb-5">
            {TourName}
          </h4>
          <div className="flex justify-between text-[#737373]">
            <span className="text-white  text-sm rounded-2xl py-[2px] lg:py-2 px-3 lg:px-7 lg:text-base border border-white lg:rounded-[20px]">
              {Category}
            </span>
            <div className="flex items-center">
              <BsHeart className="text-lg mr-1 md:mr-2 text-white" />
              <span className="Roboto text-white">{Like}</span>
            </div>
          </div>
        </div>
      </a>
    </li>
  )
}
