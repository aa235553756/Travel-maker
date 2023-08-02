import CustomStar from '@/common/components/CustomStar'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

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
  AttractionId,
}: {
  AttractionId: number
  CommentData: { Comments: CommentsProp[]; AverageScore: number }
}) {
  const { query } = useRouter()

  const [comments, setComments] = useState(CommentData.Comments)
  const [page, setPage] = useState(2)
  const [islockMore, setIsLockMore] = useState(false)
  const [moretext, setMoretext] = useState('查看更多')

  useEffect(() => {
    setComments(CommentData.Comments)
  }, [query, CommentData.Comments])

  useEffect(() => {
    setPage(2)
    setIsLockMore(false)
    setMoretext('查看更多')
  }, [query])

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
        {/* <select
          name=""
          id="scoreSort"
          className="px-4 py-[10px] pr-9 rounded-md hidden md:inline-flex items-center font-normal bg-[#D7D7D7] appearance-none bg-[url('/downArrow.svg')] bg-[18px]  bg-no-repeat select-bg"
        >
          <option value="">最高分至最低分</option>
          <option value="">最低分至最高分</option>
        </select> */}
      </div>
      {/* 這是評論小卡區 */}
      <div className="mb-6">
        {comments?.map((item: CommentsProp, index: number) => {
          return (
            <div
              key={item.AttractionCommentId}
              className={`${
                index === comments.length - 1 ? '' : 'border-b'
              } flex pt-5 md:pt-9 pb-8 md:pb-9`}
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
        disabled={islockMore}
        className={`flex mx-auto px-5 py-1 z-1 relative rounded-md text-lg items-center bg-[#EAEAEA] text-gray-A8 md:py-[10px]  ${
          islockMore
            ? ''
            : 'group hover:bg-secondary hover:text-black duration-150'
        }`}
        onClick={async () => {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_baseUrl}/attractions/comments`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': ' application/json',
                },
                body: JSON.stringify({
                  AttractionId,
                  // 控制由最高排序or最低排序
                  Order: 'higher',
                  Page: page,
                }),
              }
            )
            // ==res.ok==
            if (res.ok) {
              const resJSON = await res.json()
              // ==comment state增加==
              setComments(() => {
                const newData = [...comments]
                return newData.concat(resJSON)
              })
              // ==頁數+1==
              setPage(page + 1)
              return
            }
            // ==throw Error==
            throw new Error('不知名錯誤')
          } catch (err) {
            setMoretext('已無更多評論')
            setIsLockMore(true)
          }
        }}
      >
        <span className="pr-2">{moretext}</span>
        <FaChevronDown className="text-lg text-gray-A8 group-hover:text-black duration-150" />
      </button>
    </div>
  )
}
