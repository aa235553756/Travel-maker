import CustomStar from '@/common/components/CustomStar'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

interface CommentsProp {
  AttractionCommentId: number
  ProfilePicture: string
  UserName: string
  Score: number
  InitDate: string
  Comment: string
}

export default function OtherComment({
  CommentData,
}: {
  CommentData: { Comments: CommentsProp[]; AverageScore: number }
}) {
  const { Comments } = CommentData

  const [isCommToggle, setIsCommToggle] = useState(false)

  function handleOnclick() {
    setIsCommToggle(!isCommToggle)
  }
  return (
    <div className="">
      {/* 這是評論標題 */}
      <div className="flex font-bold mb-5 items-center justify-between md:text-xl md:mb-0">
        <div className="flex items-center">
          <h3 className="inline text-lg mr-3 md:text-xl">旅客評論</h3>
          <span className="inline-block mr-3 rounded-md px-1 bg-primary text-white">
            {CommentData.AverageScore}
          </span>
          <CustomStar rating={CommentData.AverageScore} />
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
        {Comments?.map((item: CommentsProp) => {
          return (
            <div
              key={item.AttractionCommentId}
              className="flex pt-5 md:pt-9 pb-8 border-b md:pb-9"
            >
              <Image
                src={
                  item.ProfilePicture !== ''
                    ? item.ProfilePicture
                    : '/userDefault.png'
                }
                alt={'用戶照片'}
                width={60}
                height={60}
                className="w-[60px] h-[60px] mr-3 rounded-full flex-shrink-0 bg-[#D7D7D7] md:mr-5"
              ></Image>
              <div className="w-full">
                {/* 這是用戶名稱 */}
                <div className="flex justify-between mb-1">
                  <h4 className="font-bold">{item.UserName}</h4>
                </div>
                <div className="flex mb-2">
                  <div className="mr-3">
                    <CustomStar rating={item.Score} />
                  </div>
                  <span className="pt-[2px] text-[#D7D7D7]">
                    {item.InitDate}
                  </span>
                </div>
                <div>{item.Comment}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 查看更多按鈕 */}
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
