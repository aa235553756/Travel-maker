import React from 'react'
import { BsList } from 'react-icons/bs'
import { MdOutlineCancel } from 'react-icons/md'

export default function PlanningTourStoreTours() {
  return (
    <div className="flex flex-wrap mb-12 py-5 px-7 max-h-[312px] scrollbar-style overflow-y-scroll bg-gray-D9">
      {Array(15)
        .fill('')
        .map((item, index) => {
          let className = `flex relative items-center justify-center w-[124px] h-[124px] bg-[#ECECEC] mb-6 mr-10` // 逢4 mr-0

          if (index % 5 === 4) {
            className += ' !mr-0'
          }

          return (
            <div key={index} className={className}>
              <MdOutlineCancel className="absolute text-xl top-1 right-1" />
              大安森林公園
              <BsList className="absolute text-xl bottom-1 left-[50%] -translate-x-[50%]" />
            </div>
          )
        })}
    </div>
  )
}
