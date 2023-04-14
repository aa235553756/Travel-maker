import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CollectBtn from '../button/CollectBtn'
import AddTourBtn from '../button/AddTourBtn'
import TypeTag from '../TypeTag'
import CustomStar from '../CustomStar'
import { BsGeoAltFill } from 'react-icons/bs'

export default function AttractCard({
  showSelect,
  showCollect,
  district,
  attractName,
  rating,
}: {
  showSelect?: boolean
  showCollect?: boolean
  showDetail?: boolean
  district: string
  attractName: string
  rating: number
}) {
  return (
    // 幹...這邊同一張卡片首頁是328,會員是360,
    // 我原本想下max-w-[328]在卡片上,改下在外面一層
    // omgosh,然後會員手機版是396 偶的天 (首頁手機328)
    <div className="shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)] rounded-md relative">
      {/* 收藏 & 加入行程 */}
      <div className="absolute top-5 right-5 flex space-x-3 z-30">
        {showCollect && <CollectBtn />}
        {showSelect && <AddTourBtn />}
      </div>
      <Link href="/hot-topics/attractions/1">
        {/* 景點圖片 */}
        <div className="relative w-full">
        <div className="absolute top-0 left-0 w-full h-[60px] bg-gradient-to-b from-[rgba(15,11,11,1)] to-[rgba(2,0,0,0)] rounded-xl"></div>
          <Image
            src="https://www.travel.taipei/content/images/attractions/222058/1024x768_attractions-image-hbt3wz-7l0yeewd968btkw.jpg"
            alt="圖片"
            width={360}
            height={210}
            className="w-full min-h-[210px] rounded-t-md"
          ></Image>
        </div>
        {/* 景點資訊 */}
        <div className="p-4 pb-3 md:p-6 md:pt-5 md:pb-10">
          <div className="flex items-center mb-2 space-x-3">
            <BsGeoAltFill className="text-highlight" />
            <p className="font-bold">臺北市 {district}</p>
          </div>
          <p className="text-lg mb-3">{attractName}</p>
          <div className="mb-3">
            <CustomStar rating={rating} />
          </div>
          <div className="flex space-x-3">
            <TypeTag type="城市走走"></TypeTag>
            <TypeTag type="放鬆療癒"></TypeTag>
          </div>
        </div>
      </Link>
    </div>
  )
}
