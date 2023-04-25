import Image from 'next/image'
import React from 'react'
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io'

// 這個我先放到common可能會用到

export default function AttrImageContainer({
  className,
  ImageUrl,
}: {
  className?: string
  ImageUrl: string[]
}) {
  return (
    <div className={className ?? ''}>
      {/* <span className="absolute text-white top-0">
        這個是外框
        <br />
        可以防止圖片大小不一
        <br />
        所造成的壓縮
        <br />
        <div className="bg-red-400">
          更正圖片一樣會被放大失真
          <br />
          但外匡設21/9吃滿寬度比較好看
          <br />
          再者我們都找長尺寸圖片應該還好
        </div>
      </span> */}

      <Image
        width="1128"
        height="480"
        src={ImageUrl[0]}
        alt="圖片"
        className="w-auto h-full mx-auto"
        priority
      ></Image>

      <button className="w-[30px] h-[30px] p-[5px] bg-red-300 border border-black rounded-full top-5 right-5 absolute">
        <IoMdHeart className="text-[19px] text-red-600" />
      </button>
      <button className="w-[30px] h-[30px] p-[5px] border border-white rounded-full top-20 right-5 absolute">
        <IoMdHeartEmpty className="text-[19px]" />
      </button>
    </div>
  )
}
