import React from 'react'
import Image from 'next/image'
import ChangeButton from '@/common/components/ChangeButton'

interface AttractionDataProps {
  AttractionId: number
  AttractionName: string
  ImageUrl: string
}

interface WhereIGOProps {
  tryPlayCategoryData: string
  tryPlayData: AttractionDataProps[]
  onClick: () => void
  isLoading: boolean
}

export default function WhereIGO({
  tryPlayCategoryData,
  tryPlayData,
  onClick,
  isLoading,
}: WhereIGOProps) {
  return (
    <div className="pt-11 pb-9 lg:pt-36 lg:pb-24 bg-[#EFEFEF]">
      <div className="container lg:flex lg:items-end">
        <div>
          <h3 className="text-[22px] mb-2 lg:h-[52px] lg:text-4xl">
            我想去哪裡...
          </h3>
          <p className="text-gray-64 mb-10 lg:text-2xl">
            立馬試試，隨你骰隨你玩
            {/* 立即體驗，骰出你的行程 */}
          </p>
          <ChangeButton lg_display={true} onClick={onClick} />
        </div>

        <div className="group w-[316px] relative mx-auto md:w-auto lg:mr-0">
          {isLoading && (
            <div className="bg-black/50 backdrop-blur text-lg text-white flex justify-center items-center w-full h-[148px] absolute top-0 left-0 z-10">
              安排行程中，請您稍等 ... 
            </div>
          )}
          <div className="flex flex-wrap justify-center md:justify-start md:flex-nowrap mb-8 lg:-mb-5 relative">
            {tryPlayData?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-[148px] h-[148px] mr-5 even:mr-0 mb-5 md:even:mr-5 [&:nth-child(4)]:mr-0 custom-shadow relative"
                >
                  <Image
                    width={161}
                    height={161}
                    src={item.ImageUrl}
                    alt="圖片"
                    className="object-cover h-full absolute"
                  />
                  <div className="absolute bottom-3 text-white inline-block left-1/2 -translate-x-[50%] text-center w-full px-1 line-clamp-1">
                    {item.AttractionName}
                  </div>
                </div>
              )
            })}
          </div>
          <p className="text-[#4B673B] absolute -bottom-2 right-0 lg:right-auto lg:top-auto lg:bottom-0 lg:-translate-x-[calc(100%+8px)]">
            {tryPlayCategoryData}
          </p>
        </div>
        <ChangeButton onClick={onClick} />
      </div>
    </div>
  )
}

// todo
// 這邊換一組需要動畫
