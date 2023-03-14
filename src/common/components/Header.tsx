import React, { useState } from 'react'
import { FcMenu } from 'react-icons/fc'
import { BsSearch } from 'react-icons/bs'
import { MdOutlineCancel } from 'react-icons/md'
import { IoHomeOutline } from 'react-icons/io5'
import { FaUserCircle } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { BsFillFlagFill } from 'react-icons/bs'
import Link from 'next/link'

export default function Header() {
  const [isHam, setIsHam] = useState(false)
  const hamState = () => {
    setIsHam(!isHam)
  }

  return (
    <div>
      <div className="hidden md:h-[120px] md:bg-[#d9d9d9] md:flex md:items-center md:justify-between">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* logo+名稱 */}
            <div className="flex items-center md:space-x-2 lg:space-x-6 flex-shrink-0">
              <div className="md:w-[60px] md:h-[60px] lg:w-[102px] lg:h-[102px] bg-[#ccc] rounded-full"></div>
              <h1 className="text-xl">名稱名稱</h1>
            </div>
            <div className="flex space-x-5">
              {/* 搜尋bar */}
              <div className="relative max-w-full w-[228px] h-10">
                <input
                  className="absolute border placeholder-[#ccc] px-5 py-1 w-full h-full"
                  placeholder="搜尋"
                />
                <div className="absolute top-3 right-5">
                  <BsSearch />
                </div>
              </div>
              {/* 功能 */}
              <ul className="flex flex-shrink-0  space-x-5">
                <li className='flex'>
                  <Link href="/PlanJourney" className="flex space-x-2 items-center">
                    <IoLocationSharp className="text-lg" />
                    <span className="text-xl">規劃行程</span>
                  </Link>
                </li>
                <li className="flex space-x-2 items-center">
                  <BsFillFlagFill className="text-lg" />
                  <span className="text-xl">熱門話題</span>
                </li>
                <li>
                  <button className="text-lg border p-2">登入註冊</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="block md:hidden">
        <div className="container">
          <div className="flex justify-between items-center h-16">
            <FcMenu
              className="text-2xl"
              onClick={() => {
                hamState()
              }}
            />
            <h1 className="text-xl">名稱名稱</h1>
            <BsSearch className="text-2xl" />
          </div>
        </div>
        <hr className="pb-6" />
        {isHam ? (
          <div className="p-5 h-screen">
            <MdOutlineCancel
              className="text-lg"
              onClick={() => {
                hamState()
              }}
            />
            <ul className="flex flex-col items-center">
              <li className="flex space-x-3 py-4 items-center">
                <IoHomeOutline className="text-lg" />
                <span>回首頁</span>
              </li>
              <li className="flex space-x-3 py-4 items-center">
                <FaUserCircle className="text-lg" />
                <span>登入/註冊</span>
              </li>
              <li className="flex space-x-3 py-4 items-center">
                <IoLocationSharp className="text-lg" />
                <span>規劃行程</span>
              </li>
              <li className="flex space-x-3 py-4 items-center">
                <BsFillFlagFill className="text-lg" />
                <span>熱門話題</span>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}
