import React from 'react'
import { IoMdNotifications } from 'react-icons/io'

export default function HeaderNotifi() {
  return (
    <li className="relative">
      <button
        type="button"
        onClick={() => {
          // showMemberState()
        }}
        className="flex space-x-2 items-center py-10 group hover:animate-navbar-hover relative "
      >
        <div className="flex space-x-2 items-center  duration-300 relative py-1 pr-2  rounded-md ">
          <div className="absolute translate-y-8 group-hover:translate-y-5 group-hover:opacity-100  w-0 opacity-0 bg-highlight h-[2px] group-hover:w-[calc(100%-12px)] left-2  duration-500"></div>
          <IoMdNotifications className="text-2xl text-primary group-hover:text-highlight duration-150" />
          <span className="text-xl group-hover:text-highlight/80">通知</span>
        </div>
      </button>
      {true ? (
        <div className="w-[356px] h-[520px] border ml-auto absolute right-0 top-[78px] z-10 rounded-lg shadow-lg bg-white"></div>
      ) : null}
    </li>
  )
}
