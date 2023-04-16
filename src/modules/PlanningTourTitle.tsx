import React from 'react'
import { BsLink45Deg, BsListCheck } from 'react-icons/bs'
export default function PlanningTourTitle({ RoomName }: { RoomName: string }) {
  return (
    <div className="hidden lg:flex w-full mb-3 space-x-6 items-center">
      <div className="lg:w-[264px]">
        <h2 className="hidden lg:flex items-center text-xl">
          <BsListCheck className="mr-2 text-2xl" />
          排行程
        </h2>
      </div>
      <h2 className="flex items-center text-xl font-bold">
        <BsLink45Deg className="mr-2 text-lg border border-black w-[28px] h-[28px] rounded-md" />
        行程名稱：{RoomName}
      </h2>
    </div>
  )
}
