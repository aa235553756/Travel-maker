import React from 'react'
import Image from 'next/image'
// import { useRouter } from 'next/router'
import CollectBtn from '@/common/components/button/CollectBtn'
import AddTourBtn from '@/common/components/button/AddTourBtn'
import TypeTag from '@/common/components/TypeTag'
import CustomStar from '@/common/components/CustomStar'
import { BsGeoAltFill } from 'react-icons/bs'

export default function AttractCard({
  id,
  showSelect,
  showCollect,
  district,
  attractName,
  rating,
  imagesUrl,
  type,
  onClick,
  onClick1,
  hideCollectPlanning,
}: {
  id?: number
  showSelect?: boolean
  showCollect?: boolean
  showDetail?: boolean
  hideCollectPlanning?: boolean
  district: string
  attractName: string
  rating: number
  imagesUrl: string
  type: string[]
  onClick?: () => void
  onClick1?: () => void
}) {
  // const router = useRouter()

  return (
    <div className="shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)] rounded-md relative hover:opacity-80 hover:duration-500 hover:-translate-y-1">
      <a
        target="_blank"
        href={`/hot-topics/attractions/${id}`}
        // onClick={(e) => {
        //   e.preventDefault()
        //   router.push(`/hot-topics/attractions/${id}`)
        // }}
        className="absolute w-full h-full z-10 cursor-pointer"
      ></a>
      {/* 收藏 & 加入行程 */}

      <div className="absolute top-5 right-5 flex space-x-3 z-30">
        {hideCollectPlanning ? null : (
          <CollectBtn onClick1={onClick1} showCollect={showCollect} />
        )}
        {showSelect && <AddTourBtn onClick={onClick} />}
      </div>

      {/* 景點圖片 */}
      <div className="relative w-full">
        <div className="absolute top-0 left-0 w-full h-[60px] bg-gradient-to-b from-[rgba(15,11,11,1)] to-[rgba(2,0,0,0)] rounded-md"></div>
        <Image
          src={imagesUrl}
          alt="圖片"
          width={360}
          height={210}
          className="w-full h-[210px] min-h-[210px] rounded-t-md object-contain bg-black lg:object-none"
        ></Image>
      </div>
      {/* 景點資訊 */}
      <div className="px-4 pt-3 pb-6 md:px-6 md:pt-5 md:pb-6">
        <div className="flex items-center mb-2 space-x-3">
          <BsGeoAltFill className="text-highlight" />
          <p className="font-bold">{district}</p>
        </div>
        <p className="text-lg mb-2 line-clamp-1">{attractName}</p>
        <div className="mb-6">
          <CustomStar rating={rating} />
        </div>
        <div className="flex space-x-3">
          {/* 最多顯示兩個類別，以防爆版 */}
          {type.length >= 1
            ? type?.slice(0, 2).map((item: string, index: number) => {
                return <TypeTag type={item} key={index} />
              })
            : type?.map((item: string, index: number) => {
                return <TypeTag type={item} key={index} />
              })}
        </div>
      </div>
    </div>
  )
}
