import React from 'react'
import JourneyCard from '@/common/components/JourneyCard'

export default function MoreJourney() {
  return (
    <div>
      <div className="container">
        <h2 className="text-2xl font-bold mb-8">更多隨心所欲行程</h2>
        <div className="flex flex-col space-y-5 mb-[100px] md:flex-row md:space-y-0 md:space-x-6 md:mb-[160px]">
          <JourneyCard title="好瘋狂熱血少年" number={4} favorites={100} />
          <JourneyCard title="好瘋狂熱血少年" number={4} favorites={100} />
          <JourneyCard title="好瘋狂熱血少年" number={4} favorites={100} />
        </div>
      </div>
    </div>
  )
}
