// import AttrCard from '@/common/components/card/AttrCard'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsFillGeoAltFill } from 'react-icons/bs'

interface AttrAroundsProp {
  AttractionId: string
  ImageUrl: string
  AttractionName: string
  City: string
}

export default function AttrArounds({
  MoreAttractions,
}: {
  MoreAttractions: AttrAroundsProp[]
}) {
  return (
    <div>
      <h4 className="mb-6 text-lg text-black font-bold md:text-2xl md:mb-7">
        更多周邊景點
      </h4>
      <ul className="flex flex-wrap md:flex-nowrap md:space-x-6 space-y-5 md:space-y-0">
        {/* 這是一張周邊景點卡片 */}
        {MoreAttractions.map((item: AttrAroundsProp, index) => {
          return (
            // <div key={index} className="max-w-[360px] min-w-[360px]">
            //   <AttrCard
            //     district={item.City}
            //     attractName={item.AttractionName}
            //     rating={0}
            //     imagesUrl={item.ImageUrl}
            //     type={[]}
            //   />
            // </div>
            <li
              key={index}
              className={`shadow-lg flex-grow w-full relative rounded-md ${
                index === 2 ? `md:hidden lg:block` : null
              }`}
            >
              <Link href={`/hot-topics/attractions/${item.AttractionId}`}>
                <Image
                  src={item.ImageUrl}
                  alt={item.AttractionName}
                  width={360}
                  height={163}
                  className="object-cover rounded-t-md min-h-[163px] max-h-[163px]"
                ></Image>
                <div className="px-4 py-2">
                  <h5 className="mb-2 text-lg md:text-xl font-bold line-clamp-1">
                    {item.AttractionName}
                  </h5>
                  <div className="flex items-center">
                    <BsFillGeoAltFill className="mr-2 text-primary" />
                    <span className="text-gray-73">{item.City}</span>
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
