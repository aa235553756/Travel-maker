import React from 'react'
import VoteDate from '@/modules/JourneyPage/VoteDate'
import InvitePeople from '@/modules/JourneyPage/InvitePeople'
import MoreJourney from '@/modules/JourneyPage/MoreJourney'
import SelectSide from '@/modules/JourneyPage/SelectSide'

export default function PlanningTour() {
  return (
    <div>
      <div className="container">
        <div className="block lg:flex lg:space-x-6 lg:mb-20 mt-[80px]">
          <VoteDate />
          <InvitePeople />
        </div>
        <div className="flex mb-[200px]">
          <div className="mr-6">
            <SelectSide />
            <button className="py-4 w-full bg-[#737373] text-white">
              隨機產生行程
            </button>
          </div>
          <div>123</div>
        </div>
        <MoreJourney />
      </div>
    </div>
  )
}
