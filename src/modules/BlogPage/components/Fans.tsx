import React from 'react'
import Image from 'next/image'
import FollowBtn from '@/common/components/button/FollowBtn'

export default function Fans({
  id,
  user,
  userImage,
  isFollow,
}: {
  id: string
  user: string
  userImage: string
  isFollow: boolean
}) {
  return (
    <div className="w-full shadow-[1px_1px_10px_0px_rgba(0,0,0,0.08)] rounded-md p-6 lg:px-[60px]">
      <div className="flex items-center space-x-4 lg:space-x-12">
        <Image
          src={userImage}
          width={60}
          height={60}
          className="rounded-full min-h-[60px] border"
          alt="圖片"
        ></Image>
        <p className="text-lg line-clamp-1 flex-1">{user}</p>
        <FollowBtn isFollow={isFollow} id={id} />
      </div>
    </div>
  )
}
