import React from 'react'
import { BsGeoAltFill } from 'react-icons/bs'

export default function ViewAttr({
  attractName,
  content,
}: {
  attractName: string
  content: string
}) {
  return (
    <div className="flex flex-col space-y-4">
      {/* 景點 */}
      <div className="flex items-center space-x-2">
        <BsGeoAltFill />
        <span className="text-lg">{attractName}</span>
      </div>

      {/* 照片 */}
      <div className="bg-[#d7d7d7] h-[160px]">這是照片</div>
      
      {/* 內容 */}
      <p>{content}</p>
    </div>
  )
}
