import React from 'react'

export function SeeOthersHoverEffect({ TourId }: { TourId: number }) {
  return (
    <>
      <div
        id={TourId}
        className="z-10 absolute top-0 left-0 w-full h-full group-hover:backdrop-blur-[1px] group-hover:bg-[rgba(0,0,0,0.1)] rounded-xl"
      ></div>
      <div className="z-10 text-lg hidden whitespace-nowrap absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] group-hover:block text-white ">
        <button className="py-2 px-4 border border-white bg-primary rounded-md">
          查看行程資訊
        </button>
      </div>
    </>
  )
}
