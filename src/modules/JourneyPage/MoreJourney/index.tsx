import React from 'react'
import TourCard from '@/common/components/card/TourCard'
import { TbMapSearch } from 'react-icons/tb'
import { MoreTourProp } from '@/util/types'

export default function MoreJourney({
  moreData,
}: {
  moreData: MoreTourProp[]
}) {
  return (
    <div>
      <h2 className="flex items-center space-x-2 mb-4">
        <TbMapSearch className="text-xl" />
        <span className="text-xl">更多隨心所欲行程</span>
      </h2>
      <div className="flex flex-col space-y-5 mb-[100px] md:flex-row md:space-y-0 md:space-x-6 md:mb-[160px]">
        {moreData.map((item: MoreTourProp) => {
          return (
            <div
              key={item.TourId}
              className="w-[calc(33%-16px)] flex-grow flex-shrink-0"
            >
              <TourCard
                id={item.TourId}
                tourName={item.TourName}
                countAttr={item.AttrCounts}
                likes={item.Likes}
                isLike={false}
                showLike={false}
                creator={''}
                showCreator={false}
                imagesUrl={item.ImageUrl}
              />
            </div>
          )
        })}
        {/* <TourCard
          tourName="好瘋狂熱血少年"
          countAttr={4}
          likes={100}
          isLike={true}
          showLike={true}
          creator={''}
          showCreator={false}
          imagesUrl={['/logo.png']}
        />
        <div className="hidden lg:block">
          <TourCard
            tourName="好瘋狂熱血少年"
            countAttr={4}
            likes={100}
            isLike={true}
            showLike={true}
            creator={''}
            showCreator={false}
            imagesUrl={['/logo.png']}
          /> */}
      </div>
    </div>
  )
}
