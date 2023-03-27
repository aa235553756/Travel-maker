import React from 'react'
import FollowBtn from '@/common/components/button/FollowBtn'

export default function Follows({ user }: { user: string }) {
  return (
    <div className="w-full bg-[#ccc] p-6 lg:px-15">
      <div className="flex flex-col space-y-3 lg:flex-row lg:items-center">
        <div className="flex items-center space-x-4 lg:space-x-12">
          <div className="w-[60px] h-[60px] bg-[#d7d7d7] rounded-full"></div>
          <p className="text-lg w-[150px]">{user}</p>
        </div>
        <div className="ml-[76px] lg:ml-[180px]">
          <FollowBtn />
        </div>
      </div>
    </div>
  )
}
