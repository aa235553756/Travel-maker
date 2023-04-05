import React from 'react'

export default function AttrIntro({
  attractionInfo,
}: {
  attractionInfo: string
}) {
  return (
    <div className="mb-9 md:mb-10">
      <h3 className="mb-4  text-lg font-bold text-gray-73 md:text-xl md:mb-6">
        景點介紹
      </h3>
      {/* 景點介紹文字內容如何處理 */}
      <p>{attractionInfo}</p>
    </div>
  )
}
