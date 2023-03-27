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
  showDetail,
  district,
  attractName,
}: {
  showSelect: boolean
  showCollect: boolean
  showDetail: boolean
  district: string
  attractName: string
}) {
  return (
    <div className="rounded-md w-full shadow-xl lg:w-[calc(50%-12px)] lg:[&:nth-child(2)]:!mt-0 lg:odd:!ml-0">
      <div className="relative w-full">
        <Image
          src="https://www.travel.taipei/content/images/attractions/222058/1024x768_attractions-image-hbt3wz-7l0yeewd968btkw.jpg"
          alt="圖片"
          width={360}
          height={210}
          className="w-full min-h-[210px] rounded-t-md"
        ></Image>
        <div className="absolute top-5 right-5 flex space-x-2">
          {showCollect && <CollectBtn />}
          {showSelect && <AddTourBtn />}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2 space-x-3">
          <BsGeoAltFill />
          <p className="font-bold">臺北市 {district}</p>
        </div>
        <p className="text-lg mb-3">{attractName}</p>
        <div className="mb-3">
          <CustomStar rating={4} />
        </div>
        <div className="flex space-x-2 mb-7">
          <TypeTag type="城市走走"></TypeTag>
          <TypeTag type="放鬆療癒"></TypeTag>
        </div>
        {/* 顯示查看詳情 */}
        {showDetail && (
          <Link href="/hot-topics/attractions/1">
            <button className="bg-[#ccc] px-11 py-4 mx-auto block">
              查看詳情
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}
