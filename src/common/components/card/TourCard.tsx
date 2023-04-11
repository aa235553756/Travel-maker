import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LikeBtn from '../button/LikeBtn'
import DeleteBtn from '../button/DeleteBtn'
import { RiUser3Fill } from 'react-icons/ri'

export default function TourCard({
  tourName,
  countAttr,
  likes,
  showLike,
  creator,
  showCreator,
}: {
  tourName: string
  countAttr: number
  likes: number
  showLike: boolean
  creator: string
  showCreator: boolean
}) {
  return (
    <div className="shadow-[1px_2px_12px_1px_rgba(0,0,0,0.25)] rounded-xl relative">
      {/* 刪除行程 */}
      <div className="absolute top-5 md:top-8 right-5 md:right-8 z-30">
        <DeleteBtn
          onClick={() => {
            alert('確定要刪除，刪除後將無法復原?')
          }}
        />
      </div>

      <div className='absolute bottom-3 md:bottom-7 right-5 z-30'>
        {showLike && (
          <>
            <LikeBtn /> <span>{likes}</span>
          </>
        )}
      </div>
      <Link href="/hot-topics/attractions/1">
        {/* 行程圖片 */}
        <div className="flex flex-wrap w-full p-0 md:p-3">
          {/* 第一張圖片 */}
          <div className="relative w-full">
            <div className="absolute top-0 left-0 w-full h-[60px] bg-gradient-to-b from-[rgba(15,11,11,1)] to-[rgba(2,0,0,0)] rounded-xl z-20"></div>
            <Image
              src="https://www.travel.taipei/content/images/tours/178997/1024x768_tours-image-rbohiozkb0gqzidrctcozg.jpg"
              alt="圖片"
              width={360}
              height={243}
              className="w-full min-h-[240px] rounded-t-xl md:rounded-xl mb-0 md:mb-3"
            ></Image>
          </div>
          {/* 第二張圖片 */}
          <Image
            src="https://www.travel.taipei/image/193216/?r=1605151040689"
            alt="圖片"
            width={175}
            height={117}
            className="w-[calc(50%-6px)] min-h-[120px] rounded-xl mr-[6px] hidden md:block"
          ></Image>
          {/* 第三張圖片 */}
          <Image
            src="https://www.travel.taipei/image/176951/?r=1590134596966"
            alt="圖片"
            width={175}
            height={117}
            className="w-[calc(50%-6px)] min-h-[120px] rounded-xl ml-[6px] hidden md:block"
          ></Image>
        </div>
        {/* 行程資訊 */}
        <div className="px-5 py-3 md:pt-1 md:pb-7">
          <p className="text-lg mb-3 md:mb-2">{tourName}</p>
          <div className="flex justify-between items-center">
            <span className="text-gray-B8">{countAttr}個景點</span>
            <div className="flex items-center space-x-2">
              {showCreator && (
                <>
                  <RiUser3Fill /> <span>{creator}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
