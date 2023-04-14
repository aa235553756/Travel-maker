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
    <div className="rounded-md relative shadow-xl">
      <div className="absolute top-5 right-5 flex space-x-2">
        {showCollect && <CollectBtn />}
        {showSelect && <AddTourBtn />}
      </div>
      <Link href="/hot-topics/attractions/1">
        <div className=" w-full">
          <Image
            src="https://www.travel.taipei/content/images/attractions/222058/1024x768_attractions-image-hbt3wz-7l0yeewd968btkw.jpg"
            alt="圖片"
            width={360}
            height={210}
            className="w-full min-h-[210px] rounded-t-md"
          ></Image>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-2 space-x-3">
            <BsGeoAltFill />
            <p className="font-bold">臺北市 {district}</p>
          </div>
          <p className="text-lg mb-3">{attractName}</p>
          <div className="mb-3">
            <CustomStar rating={rating} />
          </div>
          <div className="flex space-x-2 mb-7">
            <TypeTag type="城市走走"></TypeTag>
            <TypeTag type="放鬆療癒"></TypeTag>
          </div>
        </div>
      </Link>
    </div>
  )
}
