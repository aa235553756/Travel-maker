import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CollectBtn from '@/common/components/button/CollectBtn'
import SocialMedia from '@/common/components/SocialMedia'
import TypeTag from '@/common/components/TypeTag'

export default function BlogCard({
  id,
  showCollect,
  blogName,
  poster,
  time,
  type,
  imageUrl,
  view,
  like,
  comment,
}: {
  id?: number
  showCollect: boolean
  blogName: string
  poster: string
  time: string
  type: string[]
  imageUrl: string
  view: number
  like: number
  comment: number
}) {
  const router = useRouter()

  return (
    <div className="border border-gray-E7 shadow-[1px_1px_15px_1px_rgba(0,0,0,0.08)] rounded-xl relative">
      <a
        onClick={(e) => {
          e.preventDefault()
          router.push(`/blog/view-blog/${id}`)
        }}
        className="absolute w-full h-full z-10"
      ></a>
      {/* 收藏遊記 */}
      <div className="absolute top-10 right-10 flex space-x-2 z-30 md:top-5 md:right-5">
        {showCollect && <CollectBtn />}
      </div>
      <Link href="../blog/view-blog/1">
        {/* 遊記圖片 */}
        <div className="relative w-full p-5 pb-0 md:p-4 md:pb-0">
          <div className="absolute top-5 left-5 w-[calc(100%-40px)] h-9 bg-gradient-to-b from-[rgba(15,11,11,1)] to-[rgba(2,0,0,0)] rounded-xl md:top-4 md:left-4 md:w-[calc(100%-32px)] md:h-[45px]"></div>
          <Image
            src={imageUrl}
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
          <SocialMedia view={view} like={like} comment={comment} />
          <div className="!mt-2 flex space-x-3">
            {type?.slice(0, 3).map((item, index) => {
              return <TypeTag type={item} key={index} />
            })}
          </div>
        </div>
      </Link>
    </div>
  )
}
