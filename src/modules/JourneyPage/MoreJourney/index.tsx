import React from 'react'
import JourneyCard from '@/common/components/JourneyCard'
import { TbMapSearch } from 'react-icons/tb'

export default function MoreJourney() {
  return (
    <div>
      <h2 className="flex items-center space-x-2 mb-4">
        <TbMapSearch className="text-xl" />
        <span className="font-bold text-xl">更多隨心所欲行程</span>
      </h2>
      <div className="flex flex-col space-y-5 mb-[100px] md:flex-row md:space-y-0 md:space-x-6 md:mb-[160px]">
        <JourneyCard
          title="好瘋狂熱血少年"
          number={4}
          favorites={100}
          extraClassName="lg:w-[calc(33%-12px)] md:w-[calc(50%-12px)]"
        />
        <JourneyCard
          title="好瘋狂熱血少年"
          number={4}
          favorites={100}
          extraClassName="lg:w-[calc(33%-12px)] mr-6 md:w-[calc(50%-12px)]"
        />
        <JourneyCard
          title="好瘋狂熱血少年"
          number={4}
          favorites={100}
          extraClassName="lg:block lg:w-[calc(33%-12px)] mr-6 hidden"
        />
      </div>
    </div>
  )
}
