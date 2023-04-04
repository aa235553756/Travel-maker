import Link from 'next/link'
import React from 'react'
import { BsFillGeoAltFill } from 'react-icons/bs'

interface attrAroundsProp {
  attrArounds: attractionAroundsProp[]
}

interface attractionAroundsProp {
  attractionAroundName: string
  city: string
}

export default function AttrArounds({ attrArounds }: attrAroundsProp) {
  return (
    <div>
      <h4 className="mb-6 text-lg text-gray-73 font-bold md:text-2xl md:mb-7">
        更多周邊景點
      </h4>
      <ul className="flex flex-wrap md:flex-nowrap md:space-x-6 space-y-5 md:space-y-0">
        {/* 這是一張周邊景點卡片 */}
        {attrArounds.map((item, index) => {
          return (
            <li
              key={index}
              className={`shadow-lg flex-grow w-full relative rounded-md ${
                index === 2 ? `md:hidden lg:block` : null
              }`}
            >
              <Link href="./">
                <div className="mb-2 min-h-[163px] rounded-t-md bg-[#D7D7D7]">
                  我是圖片
                </div>
                <div className="px-4 py-2">
                  <h5 className="mb-2 text-lg md:text-xl font-bold">
                    {item.attractionAroundName}
                  </h5>
                  <div className="flex items-center">
                    <BsFillGeoAltFill className="mr-2" />
                    <span>{item.city}</span>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
