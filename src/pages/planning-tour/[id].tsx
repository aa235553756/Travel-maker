import React from 'react'
import VoteDate from '@/modules/JourneyPage/VoteDate'
import InvitePeople from '@/modules/JourneyPage/InvitePeople'
import MoreJourney from '@/modules/JourneyPage/MoreJourney'

export default function PlanningTour() {
  return (
    <div>
      <div className="container">
        <div className="block mt-4 lg:flex lg:space-x-6 lg:mb-20 md:mt-[80px]">
          <VoteDate />
          <InvitePeople />
        </div>
        <div className="w-full h-[200px] bg-[#ccc] mb-20">排行程</div>
        <MoreJourney />
      </div>
    </div>
  )
}
