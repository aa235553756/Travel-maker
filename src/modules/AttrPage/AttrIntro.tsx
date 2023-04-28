import React from 'react'

export default function AttrIntro({ Introduction }: { Introduction: string }) {
  return (
    <div className="mb-9 md:mb-10">
      <h3 className="mb-4 lg:text-xl text-lg font-bold md:text-xl md:mb-6">
        介紹
      </h3>
      {/* 景點介紹文字內容如何處理 */}
      <p>{Introduction}</p>
    </div>
  )
}
