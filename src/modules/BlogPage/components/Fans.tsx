import React from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import FollowBtn from '@/common/components/button/FollowBtn'

export default function Fans({ user }: { user: string }) {
  return (
    <div className="w-full bg-[#ccc] p-6 lg:px-15">
      <div className="flex flex-col space-y-3 lg:flex-row lg:items-center">
        <div className="flex items-center space-x-4 lg:space-x-12">
          <div className="w-[60px] h-[60px] bg-[#d7d7d7] rounded-full"></div>
          <p className="text-lg w-[150px]">{user}</p>
        </div>
        <div className="flex space-x-9 ml-[84px] lg:space-x-[100px] lg:ml-[100px]">
          <FollowBtn />
          <div className="flex items-center space-x-2 shrink-0">
            <MdOutlineCancel />
            <p>移除</p>
          </div>
        </div>
      </div>
    </div>
  )
}
