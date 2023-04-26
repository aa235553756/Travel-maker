import { RoomAttractionsProp } from '@/util/types'
import Image from 'next/image'
import React from 'react'

export default function DragStateDIV({ item }: { item: RoomAttractionsProp }) {
  return (
    <div
      key={item.AttractionId}
      style={{
        width: '180px',
        height: '180px',
        position: 'relative',
      }}
    >
      <div className="h-full">
        <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-b from-[rgba(255,255,255,0.0)] to-black"></div>

        <div className="absolute line-clamp-2 px-1 text-center min-w-[180px] max-w-[180px] bottom-2 left-1/2 translate-x-[-50%] text-white ">
          {item.AttractionName}
        </div>
        <Image
          alt=""
          src={item.ImageUrl}
          width={180}
          height={180}
          className="object-cover w-full h-full"
          priority
          blurDataURL="/blurLogo.png"
          placeholder="blur"
        />
      </div>
    </div>
  )
}
