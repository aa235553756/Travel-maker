import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { BsLink45Deg, BsListCheck } from 'react-icons/bs'
export default function PlanningTourTitle({ RoomName }: { RoomName: string }) {
  const router = useRouter()
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : ''
  const URL = `${origin}`
  const [linkEffect, setLinkEffect] = useState(false)

  return (
    <div className="hidden lg:flex w-full mb-3 space-x-6 items-center">
      <div className="lg:w-[264px]">
        <h2 className="hidden lg:flex items-center text-xl ">
          <BsListCheck className="mr-2 text-2xl " />
          排行程
        </h2>
      </div>
      <h2 className="flex items-center text-xl font-bold  relative">
        <button
          className="flex items-center group hover:text-primary active:text-primary-tint"
          onClick={() => {
            setLinkEffect(true)
            navigator.clipboard.writeText(`${URL}${router.asPath}`)
          }}
        >
          <BsLink45Deg className="mr-2 text-lg border border-black w-[28px] h-[28px] rounded-md group-active:text-primary-tint group-hover:text-primary" />
          行程名稱：
        </button>
        <span>{RoomName}</span>

        <div
          onAnimationEnd={() => {
            setLinkEffect(false)
          }}
          className={`${
            linkEffect && 'animate-fade-in-out'
          } z-[-1] absolute text-normal !text-primary opacity-0 top-0 left-[calc(100%+8px)]`}
        >
          copied
        </div>
      </h2>
    </div>
  )
}
