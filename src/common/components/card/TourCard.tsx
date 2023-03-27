import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LikeBtn from '../button/LikeBtn'
import DeleteBtn from '../button/DeleteBtn'

export default function TourCard({
  tourName,
  countAttr,
  likes,
  showLike,
}: {
  tourName: string
  countAttr: number
  likes: number
  showLike: boolean
}) {
  return (
    <div className="bg-[#d7d7d7] rounded-md w-full relative lg:w-[calc(50%-12px)]  lg:even:!mt-0 lg:odd:!ml-0">
      <div className="absolute top-5 right-5 z-10">
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
            className="w-[calc(50%-4px)] min-h-[120px] mr-1"
          ></Image>
          <Image
            src="https://www.travel.taipei/image/176951/?r=1590134596966"
            alt="圖片"
            width={175}
            height={117}
            className="w-[calc(50%-4px)] min-h-[120px] ml-1"
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
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
