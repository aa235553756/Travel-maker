import React from 'react'
import Image from 'next/image'
import { BsGeoAltFill } from 'react-icons/bs'

export default function ViewAttr({
  attractName,
  content,
  imageUrl,
}: {
  attractName: string
  content: string
  imageUrl: string[]
}) {
  return (
    <div className="flex flex-col space-y-6">
      {/* 景點 */}
      <div className="flex items-center space-x-2">
        <BsGeoAltFill className="text-highlight" />
        <span className="text-lg font-bold">{attractName}</span>
      </div>

      {/* 如果照片為1張 */}
      {imageUrl.length === 1 && (
        <div>
          {imageUrl.map((item, index) => {
            return (
              <Image
                key={index}
                src={item}
                alt="圖片"
                width={264}
                height={132}
                className="w-full rounded-md h-[132] max-h-[132px] object-cover bg-black"
              ></Image>
            )
          })}
        </div>
      )}

      {/* 如果照片為2張 */}
      {imageUrl.length === 2 && (
        <div className="flex-wrap space-y-6 lg:flex lg:flex-row lg:space-x-6 lg:space-y-0">
          {imageUrl.map((item, index) => {
            return (
              <Image
                key={index}
                src={item}
                alt="圖片"
                width={264}
                height={132}
                className="w-full lg:w-[calc(50%-12px)] rounded-md h-[132] max-h-[132px] object-cover bg-black"
              ></Image>
            )
          })}
        </div>
      )}

      {/* 如果照片為3張 */}
      {imageUrl.length === 3 && (
        <div className="flex-wrap space-y-6 lg:flex lg:flex-row lg:space-x-6 lg:space-y-0">
          {imageUrl.map((item, index) => {
            return (
              <Image
                key={index}
                src={item}
                alt="圖片"
                width={168}
                height={132}
                className="w-full lg:w-[calc(33.33%-16px)] rounded-md h-[132] max-h-[132px] object-cover bg-black"
              ></Image>
            )
          })}
        </div>
      )}

      {/* 內容 */}
      <p>{content}</p>
    </div>
  )
}
