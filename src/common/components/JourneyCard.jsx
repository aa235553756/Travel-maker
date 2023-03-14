import React from 'react'
import { BsHeart } from 'react-icons/bs'

export default function JourneyCard({ title, number, favorites  }) {
  return (
    <div className="bg-[#d7d7d7] rounded-lg w-full">
      <div className="flex flex-col space-y-2 w-full">
        <div className="w-full h-[240px] bg-[#ccc] rounded-t-lg">這是圖片</div>
        <div className="flex space-x-2">
          <div className="w-1/2 bg-[#ccc] h-[120px]">
            這是圖片
          </div>
          <div className="w-1/2 bg-[#ccc] h-[120px]">
            這是圖片
          </div>
        </div>
      </div>
      <div className="px-5 py-3">
        <p className="text-lg mb-2">{title}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg">{number}個景點</span>
          <div className="flex items-center space-x-2">
            <BsHeart />
            <span className="text-lg">{favorites}</span>
          </div>
        </div>
      </div>
    </div>
  )
}