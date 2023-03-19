import React, { useState } from 'react'
import { FcMenu } from 'react-icons/fc'
import {
  BsSearch,
  BsFillFlagFill,
  BsPencil,
  BsBookmarkHeart,
} from 'react-icons/bs'
import { IoHomeOutline, IoLocationSharp } from 'react-icons/io5'
import { FaUserCircle, FaRegCommentDots } from 'react-icons/fa'
import { SlSettings } from 'react-icons/sl'
import { AiOutlineHeart } from 'react-icons/ai'
import { GrLocation } from 'react-icons/gr'
import { BiLogOut } from 'react-icons/bi'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import Link from 'next/link'

export default function Header() {
  const [isHam, setIsHam] = useState(false)
  const hamState = () => {
    setIsHam(!isHam)
  }

  const [isMember, setIsMember] = useState(false)
  const memberState = () => {
    setIsMember(!isMember)
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
              <ul className="flex flex-shrink-0 space-x-5">
                <li className="flex space-x-2 items-center">
                  <Link
                    href="/PlanJourney"
                    className="flex space-x-2 items-center"
                  >
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
        <hr />
        {isHam ? (
          <div className="p-5 h-screen text-center">
            <ul className="inline-flex flex-col ">
              <li className="flex space-x-3 py-4 items-center">
                <Link href="/" className="flex space-x-2 items-center">
                  <IoHomeOutline className="text-lg" />
                  <span>回首頁</span>
                </Link>
              </li>
              <li className="flex space-x-3 py-4 items-center">
                <Link
                  href="/LoginAndSignUp"
                  className="flex space-x-2 items-center"
                >
                  <FaUserCircle className="text-lg" />
                  <span>登入/註冊</span>
                </Link>
              </li>
              <li
                className="flex space-x-3 py-4 items-center"
                onClick={() => {
                  memberState()
                }}
              >
                <FaUserCircle className="text-lg" />
                <div className="flex items-center space-x-3">
                  <span>會員中心</span>
                  {isMember ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </div>
              </li>
              {isMember ? (
                <div>
                  <li className="flex space-x-3 py-4 items-center">
                    <SlSettings className="text-lg" />
                    <span>帳號設定</span>
                  </li>
                  <li className="flex space-x-3 py-4 items-center">
                    <AiOutlineHeart className="text-lg" />
                    <span>我的收藏行程</span>
                  </li>
                  <li className="flex space-x-3 py-4 items-center">
                    <GrLocation className="text-lg" />
                    <span>我的收藏景點</span>
                  </li>
                  <li className="flex space-x-3 py-4 items-center">
                    <BsPencil className="text-lg" />
                    <span>我的遊記</span>
                  </li>
                  <li className="flex space-x-3 py-4 items-center">
                    <BsBookmarkHeart className="text-lg" />
                    <span>我的追蹤</span>
                  </li>
                  <li className="flex space-x-3 py-4 items-center">
                    <FaRegCommentDots className="text-lg" />
                    <span>我的評論</span>
                  </li>
                </div>
              ) : null}
            </ul>
            <hr />
            <ul className="inline-flex flex-col w-[122px]">
              <li className="flex space-x-3 py-4 items-center">
                <Link
                  href="/PlanJourney"
                  className="flex space-x-2 items-center"
                >
                  <IoLocationSharp className="text-lg" />
                  <span>規劃行程</span>
                </Link>
              </li>
              <li className="flex space-x-3 py-4 items-center">
                <BsFillFlagFill className="text-lg" />
                <span>熱門話題</span>
              </li>
            </ul>
            <hr />
            <ul className="inline-flex flex-col w-[122px]">
              <li className="flex space-x-3 py-4 items-center">
                <Link
                  href="/LoginAndSignUp"
                  className="flex space-x-2 items-center"
                >
                  <BiLogOut className="text-lg" />
                  <span>登出</span>
                </Link>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}
