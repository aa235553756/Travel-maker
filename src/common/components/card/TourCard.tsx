import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LikeBtn from '../button/LikeBtn'
import DeleteBtn from '../button/DeleteBtn'
import { RiUser3Fill } from "react-icons/ri";

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
    <div className="bg-[#d7d7d7] rounded-md relative">
      <div className="absolute top-5 right-5 z-5">
        <DeleteBtn
          onClick={() => {
            alert('確定要刪除，刪除後將無法復原?')
          }}
        />
      </div>
      <Link href="/hot-topics/attractions/1">
        <div className="flex flex-wrap w-full">
          <div className="w-full">
            <Image
              src="https://www.travel.taipei/content/images/tours/178997/1024x768_tours-image-rbohiozkb0gqzidrctcozg.jpg"
              alt="圖片"
              width={360}
              height={243}
              className="w-full min-h-[240px] rounded-t-md mb-2"
            ></Image>
          </div>
          <Image
            src="https://www.travel.taipei/image/193216/?r=1605151040689"
            alt="圖片"
            width={175}
            height={117}
            className="w-[calc(50%-4px)] min-h-[120px] mr-1 hidden md:block"
          ></Image>
          <Image
            src="https://www.travel.taipei/image/176951/?r=1590134596966"
            alt="圖片"
            width={175}
            height={117}
            className="w-[calc(50%-4px)] min-h-[120px] ml-1 hidden md:block"
          ></Image>
        </div>
        <div className="p-4">
          <p className="text-lg mb-2">{tourName}</p>
          <div className="flex justify-between items-center">
            <span>{countAttr}個景點</span>
            <div className="flex items-center space-x-2">
              {showLike && (
                <>
                  <LikeBtn /> <span>{likes}</span>
                </>
              )}
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
