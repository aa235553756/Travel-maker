import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CollectBtn from '../button/CollectBtn'
import SocialMedia from '../SocialMedia'
import TypeTag from '../TypeTag'

export default function BlogCard({
  showCollect,
  blogName,
  poster,
  time,
}: {
  showCollect: boolean
  blogName: string
  poster: string
  time: string
}) {
  return (
    <div className="border border-gray-E7 shadow-[1px_1px_15px_1px_rgba(0,0,0,0.08)] rounded-xl relative">
      {/* 收藏遊記 */}
      <div className="absolute top-10 right-10 flex space-x-2 z-30 md:top-5 md:right-5">
        {showCollect && <CollectBtn />}
      </div>
      <Link href="../blog/view-blog/1">
        {/* 遊記圖片 */}
        <div className="relative w-full p-5 pb-0 md:p-4 md:pb-0">
          <div className="absolute top-5 left-5 w-[calc(100%-40px)] h-9 bg-gradient-to-b from-[rgba(15,11,11,1)] to-[rgba(2,0,0,0)] rounded-xl z-20 md:top-4 md:left-4 md:w-[calc(100%-32px)] md:h-[45px]"></div>
          <Image
            src="https://www.travel.taipei/content/images/attractions/222058/1024x768_attractions-image-hbt3wz-7l0yeewd968btkw.jpg"
            alt="圖片"
            width={328}
            height={260}
            className="w-full min-h-[260px] rounded-xl"
          ></Image>
        </div>
        {/* 遊記資訊 */}
        <div className="p-5 pt-4 flex flex-col space-y-3 md:p-4 md:pb-3">
          <p className="text-lg">{blogName}</p>
          <div className="flex items-center space-x-3">
            <div className="flex item-center space-x-2">
              <Image
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                alt="圖片"
                width={20}
                height={20}
                className="rounded-full"
              ></Image>
              <span className="text-sm text-[rgba(0,0,0,0.45)]">{poster}</span>
            </div>
            <span className="text-sm text-gray-D9">{time}</span>
          </div>
          <SocialMedia view={156} like={156} comment={42} />
          <div className="inline-block !mt-2">
            <TypeTag type="城市走走" />
          </div>
        </div>
      </Link>
    </div>
  )
}
