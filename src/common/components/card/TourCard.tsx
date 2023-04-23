import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import LikeBtn from '@/common/components/button/LikeBtn'
import DeleteBtn from '@/common/components/button/DeleteBtn'
import { RiUser3Fill } from 'react-icons/ri'

export default function TourCard({
  id,
  tourName,
  countAttr,
  likes,
  showLike,
  creator,
  showCreator,
  imagesUrl,
  room,
  roomId,
  showDelete,
  onClick,
}: {
  id?: number
  tourName: string
  countAttr: number
  likes: number
  showLike: boolean
  creator: string
  showCreator: boolean
  imagesUrl: string[]
  room?: boolean
  roomId?: number | string
  showDelete?: boolean
  onClick?: () => void
  onClickTour?: () => void
  onClickRoom?: () => void
}) {
  const router = useRouter()

  return (
    <div className="shadow-[1px_2px_12px_1px_rgba(0,0,0,0.25)] rounded-md relative z-0">
      {room && (
        <a
          onClick={(e) => {
            e.preventDefault()
            router.push(`/planning-tour/${roomId}`)
          }}
          className="absolute w-full h-full z-10"
        ></a>
      )}
      {!room && (
        <a
          onClick={(e) => {
            e.preventDefault()
            router.push(`/random-tour/${id}`)
          }}
          className="absolute w-full h-full z-10"
        ></a>
      )}

      {/* 刪除行程 */}
      <div className="absolute top-5 md:top-8 right-5 md:right-8 z-30">
        {showDelete && <DeleteBtn onClick={onClick} />}
      </div>

      <div className="absolute bottom-3 md:bottom-7 right-5 z-10">
        {showLike && (
          <>
            <LikeBtn /> <span>{likes}</span>
          </>
        )}
      </div>

      {/* 判斷行程圖片為1,2,3張時的排版 */}
      {imagesUrl?.length === 1 && (
        <div className="w-full p-0 md:p-3">
          {/* 第一張圖片 */}
          <div className="relative w-full">
            <div className="absolute top-0 left-0 w-full h-[60px] bg-gradient-to-b from-[rgba(15,11,11,1)] to-[rgba(2,0,0,0)] rounded-md"></div>
            <Image
              src={imagesUrl[0]}
              alt="圖片"
              width={336}
              height={335}
              className="w-full h-[348px] min-h-[348px] rounded-t-xl object-cover md:rounded-md"
            ></Image>
          </div>
        </div>
      )}
      {imagesUrl?.length === 2 && (
        <div className="w-full p-0 md:p-3">
          {/* 第一張圖片 */}
          <div className="relative w-full">
            <div className="absolute top-0 left-0 w-full h-[60px] bg-gradient-to-b from-[rgba(15,11,11,1)] to-[rgba(2,0,0,0)] rounded-md"></div>
            <Image
              src={imagesUrl[0]}
              alt="圖片"
              width={336}
              height={228}
              className="w-full h-[228px] min-h-[228px] rounded-t-xl object-cover md:rounded-md mb-0 md:mb-3"
            ></Image>
          </div>
          {/* 第二張圖片 */}
          <Image
            src={imagesUrl[1]}
            alt="圖片"
            width={336}
            height={108}
            className="w-full h-[108px] min-h-[108px] rounded-md hidden object-cover md:block"
          ></Image>
        </div>
      )}
      {imagesUrl?.length === 3 && (
        <div className="flex flex-wrap w-full p-0 md:p-3">
          {/* 第一張圖片 */}
          <div className="relative w-full">
            <div className="absolute top-0 left-0 w-full h-[60px] bg-gradient-to-b from-[rgba(15,11,11,1)] to-[rgba(2,0,0,0)] rounded-md"></div>
            <Image
              src={imagesUrl[0]}
              alt="圖片"
              width={336}
              height={228}
              className="w-full h-[228px] min-h-[228px] rounded-t-xl object-cover md:rounded-md mb-0 md:mb-3"
            ></Image>
          </div>
          {/* 第二張圖片 */}
          <Image
            src={imagesUrl[1]}
            alt="圖片"
            width={162}
            height={108}
            className="w-[calc(50%-6px)] h-[108px] min-h-[108px] rounded-md mr-[6px] hidden object-cover md:block"
          ></Image>
          {/* 第三張圖片 */}
          <Image
            src={imagesUrl[2]}
            alt="圖片"
            width={162}
            height={108}
            className="w-[calc(50%-6px)] h-[108px] min-h-[108px] rounded-md ml-[6px] hidden object-cover md:block"
          ></Image>
        </div>
      )}
      {/* 行程資訊 */}
      <div className="px-5 py-3 md:pt-1 md:pb-7">
        <p className="text-lg mb-3 md:mb-2">{tourName}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-B8">{countAttr}個景點</span>
          <div className="flex items-center space-x-2">
            {showCreator && (
              <>
                <RiUser3Fill /> <span>{creator}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
