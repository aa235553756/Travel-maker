import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

export default function SeeMore() {
  return (
      <button className="flex items-center space-x-2 mx-auto p-7">
        <p>查看更多</p>
        <MdKeyboardArrowDown />
      </button>
  )
}
