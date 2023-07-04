import React from 'react'
import Skeleton from 'react-loading-skeleton'

export function HeaderCustomSkeleton() {
  return (
    <>
      <li className=" min-h-[66px] border-b border-[#F5F5F5] px-5 py-2 flex justify-between items-center">
        {/* 用戶圖片及通知文字 */}
        <div className="flex items-center w-full">
          <Skeleton circle className="!w-[40px] h-[40px] mr-2" />
          {/* <div className="flex flex-col justify-center"> */}
          <div className="w-full">
            <Skeleton />
            <Skeleton className="!w-14" />
          </div>
          {/* 佔位 */}
          <div className="pl-2 min-w-[16px]"></div>
        </div>
      </li>
      <li className=" min-h-[66px] border-b border-[#F5F5F5] px-5 py-2 flex justify-between items-center">
        {/* 用戶圖片及通知文字 */}
        <div className="flex items-center w-full">
          <Skeleton circle className="!w-[40px] h-[40px] mr-2" />
          {/* <div className="flex flex-col justify-center"> */}
          <div className="w-full">
            <Skeleton />
            <Skeleton className="!w-14" />
          </div>
          {/* 佔位 */}
          <div className="pl-2 min-w-[16px]"></div>
        </div>
      </li>
    </>
  )
}
