import React from 'react'
import { BsHeart } from 'react-icons/bs'

interface JourneyCardProps {
  title: string
  number: number
  favorites: number
}

const JourneyCard: React.FC<JourneyCardProps> = ({
  title,
  number,
  favorites,
}) => {
  return (
    <div className="bg-[#d7d7d7] rounded-lg w-full lg:w-[calc(50%-12px)] lg:even:!mt-0 lg:odd:!ml-0">
      <div className="flex flex-col space-y-2 w-full">
        <div className="w-full h-[240px] bg-[#ccc] rounded-t-lg">這是圖片</div>
        <div className="flex space-x-2">
          <div className="w-1/2 bg-[#ccc] h-[120px]">這是圖片</div>
          <div className="w-1/2 bg-[#ccc] h-[120px]">這是圖片</div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-lg mb-2">{title}</p>
        <div className="flex justify-between items-center">
          <span>{number}個景點</span>
          <div className="flex items-center space-x-2">
            <BsHeart />
            <span>{favorites}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JourneyCard