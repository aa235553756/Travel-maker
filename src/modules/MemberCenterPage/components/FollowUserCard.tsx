import React from 'react'
import Image from 'next/image'
import FollowBtn from '@/common/components/button/FollowBtn'

export default function FollowUserCard({
  poster,
  posts,
  fans,
  followers,
}: {
  poster: string
  posts: number
  fans: number
  followers: number
}) {
  return (
    <div className="w-full border rounded-md lg:w-[calc(50%-12px)] lg:[&:nth-child(2)]:!mt-0 lg:odd:!ml-0">
      <div className="bg-[#ccc] h-[240px] rounded-t-md">
        <div className="p-10">
          <div className="flex flex-col items-center space-y-9">
            <div className="flex justify-center items-center space-x-7">
              <Image
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                alt="圖片"
                width={58}
                height={58}
                className="rounded-full min-h-[58px]"
              ></Image>
              <span>{poster}</span>
            </div>
            <FollowBtn />
          </div>
        </div>
      </div>
      <div className="py-10">
        <ul className="flex justify-center">
          <li className="text-center px-10">
            <p>{posts}</p>
            <p>遊記</p>
          </li>
          <li className="text-center border-x-[1px] px-10">
            <p>{fans}</p>
            <p>粉絲</p>
          </li>
          <li className="text-center px-10">
            <p>{followers}</p>
            <p>追蹤</p>
          </li>
        </ul>
      </div>
    </div>
  )
}
