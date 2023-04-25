import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

export default function SeeMore() {
  return (
      <div className="flex justify-center items-center space-x-2 text-gray-73 cursor-pointer p-2">
        <p>滾動觀看更多</p>
        <MdKeyboardArrowDown />
      </div>
  )
}
