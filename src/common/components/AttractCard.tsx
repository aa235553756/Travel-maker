import React, { useState } from 'react'
import {
  BsHeart,
  BsGeoAltFill,
  BsFillStarFill,
  BsStar,
  BsFillSuitHeartFill,
  BsPlusLg,
} from 'react-icons/bs'

interface AttractCardProps {
  showSelect: boolean
  showCollect: boolean
  showDetail: boolean
  location: string
  attractName: string
  type: string
}

const AttractCard: React.FC<AttractCardProps> = ({
  showSelect,
  showCollect,
  showDetail,
  location,
  attractName,
  type,
}) => {
  // 收藏 css 狀態
  const [isCollect, setIsCollect] = useState(false)
  const collectState = () => {
    setIsCollect(!isCollect)
  }
  return (
    <div className="border rounded-lg w-full lg:w-[calc(50%-12px)] lg:even:!mt-0 lg:odd:!ml-0">
      <div className="bg-[#ccc] h-[240px] rounded-t-lg">
        <div className="flex justify-end space-x-4 p-4">
          {/* 顯示加入行程 */}
          {showSelect && (
            <button className="border border-black rounded-full p-2 w-[34px] h-[34px]">
            <BsPlusLg />
          </button>
          )}
         

          {/* 顯示收藏 */}
          {showCollect && (
            <button
              className="border border-black rounded-full p-2 w-[34px] h-[34px]"
              onClick={() => {
                collectState()
              }}
            >
              {isCollect ? (
                <BsFillSuitHeartFill className="text-red-700" />
              ) : (
                <BsHeart />
              )}
            </button>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2 space-x-3">
          <BsGeoAltFill />
          <p className="font-bold">臺北市 {location}</p>
        </div>
        <p className="text-lg mb-3">{attractName}</p>
        <p className="mb-3 flex space-x-2">
          <BsFillStarFill />
          <BsFillStarFill />
          <BsFillStarFill />
          <BsFillStarFill />
          <BsStar />
        </p>
        <div className="flex text-sm space-x-2 mb-7">
          <span className="bg-[#ccc] px-3 py-1">{type}</span>
          <span className="bg-[#ccc] px-3 py-1">{type}</span>
        </div>
        {/* 顯示查看詳情 */}
        {showDetail && (
          <button className="bg-[#ccc] px-11 py-4 mx-auto block">
            查看詳情
          </button>
        )}
      </div>
    </div>
  )
}

export default AttractCard
