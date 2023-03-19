import CustomStar from '@/common/components/CustomStar'
import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

// 這個檔案比較複雜，之後要拆

interface OtherCommentProp {
  attractionInfoScore: number
  userName: string
  userComment: string
}

export default function OtherComment({
  attractionInfoScore,
  userName,
  userComment,
}: OtherCommentProp) {
  const [isCommToggle, setIsCommToggle] = useState(false)

  function handleOnclick() {
    setIsCommToggle(!isCommToggle)
  }
  return (
    <div className="pb-[60px] border-b mb-10">
      {/* 這是評論標題 */}
      <div className="flex font-bold mb-5 items-center justify-between md:text-xl md:mb-0">
        <div className="flex items-center">
          <h3 className="inline text-lg mr-3 md:text-xl">旅客評論</h3>
          <span className="inline-block mr-3 rounded-md px-1 bg-[#D7D7D7]">
            {attractionInfoScore}
          </span>
          <CustomStar rating={3.45} />
        </div>
        {/* 這是排序評論,記得放icon */}
        <select
          name=""
          id="scoreSort"
          className="px-4 py-[10px] pr-9 rounded-md hidden md:inline-flex items-center font-normal bg-[#D7D7D7] appearance-none bg-[url('/downArrow.svg')] bg-[18px]  bg-no-repeat select-bg"
        >
          <option value="">最高分至最低分</option>
          <option value="">最低分至最高分</option>
        </select>
      </div>
      {/* 這是評論小卡區 */}
      <div className="mb-6">
        <div className="flex pt-5 md:pt-9 pb-8 border-b md:pb-9">
          <div className="w-[60px] h-[60px] mr-3 rounded-full flex-shrink-0 bg-[#D7D7D7] md:mr-5"></div>
          <div className="w-full">
            {/* 這是用戶名稱 */}
            <div className="flex justify-between mb-1">
              <h4 className="font-bold">{userName}</h4>
            </div>
            <div className="flex mb-2">
              <div className="mr-3">
                <CustomStar rating={3.2} />
              </div>
              <span className="pt-[2px] text-[#D7D7D7]">2022/03</span>
            </div>
            <div>{userComment}</div>
          </div>
        </div>
        <div
          className={`flex pt-5 md:pt-9 pb-8 md:pb-9 ${
            isCommToggle ? '' : 'border-b'
          }`}
        >
          <div className="bg-[#D7D7D7] w-[60px] h-[60px] rounded-full flex-shrink-0 mr-3"></div>
          <div className="w-full">
            {/* 這是用戶名稱 */}
            <div className="flex justify-between mb-1">
              <h4 className="font-bold">{userName}</h4>
            </div>
            <div className="flex mb-2">
              <div className="mr-3">
                <CustomStar rating={4.6} />
              </div>
              <span className="pt-[2px] text-[#D7D7D7]">2022/03</span>
            </div>
            <div>{userComment}</div>
          </div>
        </div>

        <div
          className={`flex pt-5 md:pt-9 pb-8 md:pb-9 duration-100 ${
            isCommToggle ? 'h-0 opacity-0 !p-0' : 'h-auto'
          }`}
        >
          <div className="bg-[#D7D7D7] w-[60px] h-[60px] rounded-full flex-shrink-0 mr-3"></div>
          <div className="w-full">
            {/* 這是用戶名稱 */}
            <div className="flex justify-between mb-1">
              <h4 className="font-bold">{userName}</h4>
            </div>
            <div className="flex mb-2">
              <div className="mr-3">
                <CustomStar rating={4.6} />
              </div>
              <span className="pt-[2px] text-[#D7D7D7]">2022/03</span>
            </div>
            <div>{userComment}</div>
          </div>
        </div>
      </div>

      <button
        className="flex mx-auto px-5 py-1 z-1 relative rounded-lg text-lg items-center bg-[#D7D7D7] md:py-[10px]"
        onClick={handleOnclick}
      >
        {isCommToggle ? (
          <>
            <span className="pr-2">查看更多</span>
            <FaChevronDown className="text-lg" />
          </>
        ) : (
          <>
            <span className="pr-2">收合</span>
            <FaChevronUp className="text-lg" />
          </>
        )}
      </button>
    </div>
  )
}
