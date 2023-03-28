import React, { useState, useEffect } from 'react'
import { FcMenu } from 'react-icons/fc'
import { FaBloggerB } from 'react-icons/fa'
import {
  BsSearch,
  BsFillFlagFill,
  BsPencil,
  BsBookmarkHeart,
} from 'react-icons/bs'
import { IoHomeOutline, IoLocationSharp } from 'react-icons/io5'
import { FaUserCircle, FaRegCommentDots } from 'react-icons/fa'
import { SlSettings } from 'react-icons/sl'
import { AiOutlineHeart, AiOutlineSetting } from 'react-icons/ai'
import { GrLocation } from 'react-icons/gr'
import { BiLogOut } from 'react-icons/bi'
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineCancel,
} from 'react-icons/md'
import Link from 'next/link'

export default function Header() {
  // 漢堡條
  const [isHam, setIsHam] = useState(false)
  const hamState = () => {
    setIsHam(!isHam)
    document.body.style.overflow = 'hidden'
  }

  // 手機版搜尋
  const [isSearching, setIsSearching] = useState(false)
  const searchingState = () => {
    setIsSearching(!isSearching)
  }
  // 會員中心
  const [isMember, setIsMember] = useState(false)
  const memberState = () => {
    setIsMember(!isMember)
  }

  const [showMember, setShowMember] = useState(false)
  const showMemberState = () => {
    setShowMember(!showMember)
  }

  useEffect(() => {
    if (!isHam) {
      document.body.style.overflow = 'auto'
    }
  }, [isHam])

  return (
    <div className="md:mt-[120px]">
      {/* 電腦版 */}
      <div className="fixed z-10 top-0 w-full hidden lg:flex  md:h-[120px] md:bg-glass-45 md:items-center md:justify-between">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* logo+名稱 */}
            <Link
              href="/"
              className="flex items-center md:space-x-2 lg:space-x-6 flex-shrink-0"
            >
              <div className="md:w-[60px] md:h-[60px] lg:w-[102px] lg:h-[102px] bg-[#ccc] rounded-full"></div>

              <h1 className="text-xl">名稱名稱</h1>
            </Link>
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
                    href="/planning-tour/1"
                    className="flex space-x-2 items-center"
                  >
                    <IoLocationSharp className="text-lg" />
                    <span className="text-xl">規劃行程</span>
                  </Link>
                </li>
                <li className="flex space-x-2 items-center">
                  <Link
                    href="/hot-topics/attractions"
                    className="flex space-x-2 items-center"
                  >
                    <BsFillFlagFill className="text-lg" />
                    <span className="text-xl">熱門話題</span>
                  </Link>
                </li>
                <li className="flex space-x-2 items-center relative">
                  <button
                    type="button"
                    className="flex space-x-2 items-center"
                    onClick={() => {
                      showMemberState()
                    }}
                  >
                    <IoLocationSharp className="text-lg" />
                    <span className="text-xl">會員中心</span>
                  </button>
                  {showMember ? (
                    <div className="w-[300px] border ml-auto absolute right-0 top-[82px] z-10 rounded-lg shadow-lg bg-white">
                      <Link
                        href="/member-center"
                        onClick={() => {
                          showMemberState()
                        }}
                      >
                        <div className="flex justify-between items-center px-5 py-4 hover:bg-gray-100 cursor-pointer">
                          <div className="flex space-x-6 items-center">
                            <div className="bg-[#ccc] rounded-full w-[52px] h-[52px]"></div>
                            <span className="text-xl">會員設定</span>
                          </div>
                          <AiOutlineSetting />
                        </div>
                      </Link>
                      <hr className="mx-[-20px]" />
                      <Link
                        href="/social-media"
                        className="block px-5 py-4 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => {
                          showMemberState()
                        }}
                      >
                        我的社群
                      </Link>
                      <hr className="mx-[-20px]" />
                      <Link
                        href="/login"
                        className="block px-5 py-4 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => {
                          showMemberState()
                        }}
                      >
                        登出{' '}
                      </Link>
                    </div>
                  ) : null}
                </li>
                <li>
                  <Link href="/login" className="block text-lg border p-2">
                    登入註冊
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* 手機版 */}
      <div className="fixed top-0 w-full z-10 block lg:hidden">
        <div className="container">
          {isSearching ? (
            <div className="flex justify-between items-center h-16">
              <FcMenu
                className="text-2xl"
                onClick={() => {
                  hamState()
                }}
              />
              <div className="relative max-w-full w-[228px] h-10">
                <input
                  className="absolute border placeholder-[#ccc] px-5 py-1 w-full h-full"
                  placeholder="搜尋"
                />
                <div className="absolute top-3 right-5">
                  <BsSearch />
                </div>
              </div>
              <MdOutlineCancel
                className="text-2xl"
                onClick={() => {
                  searchingState()
                }}
              />
            </div>
          ) : (
            <div className="flex justify-between items-center h-16">
              <FcMenu
                className="text-2xl"
                onClick={() => {
                  hamState()
                }}
              />
              <h1 className="text-xl">名稱名稱</h1>
              <BsSearch
                className="text-2xl"
                onClick={() => {
                  searchingState()
                }}
              />
            </div>
          )}
        </div>
        <hr />

        {isHam ? (
          <div className="p-5 h-[calc(100vh-64px)] text-center overflow-auto">
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
                    <Link
                      href="/member-center"
                      className="flex space-x-2 items-center"
                    >
                      <SlSettings className="text-lg" />
                      <span>帳號設定</span>
                    </Link>
                  </li>
                  <li className="flex space-x-3 py-4 items-center">
                    <Link
                      href="/member-center/tour"
                      className="flex space-x-2 items-center"
                    >
                      <AiOutlineHeart className="text-lg" />
                      <span>我的收藏行程</span>
                    </Link>
                  </li>
                  <li className="flex space-x-3 py-4 items-center">
                    <Link
                      href="/member-center/attraction"
                      className="flex space-x-2 items-center"
                    >
                      <GrLocation className="text-lg" />
                      <span>我的收藏景點</span>
                    </Link>
                  </li>
                  <li className="flex space-x-3 py-4 items-center">
                    <Link
                      href="/member-center/blog"
                      className="flex space-x-2 items-center"
                    >
                      <BsPencil className="text-lg" />
                      <span>我的遊記</span>
                    </Link>
                  </li>
                  <li className="flex space-x-3 py-4 items-center">
                    <Link
                      href="/member-center/follow"
                      className="flex space-x-2 items-center"
                    >
                      <BsBookmarkHeart className="text-lg" />
                      <span>我的追蹤</span>
                    </Link>
                  </li>
                  <li className="flex space-x-3 py-4 items-center">
                    <Link
                      href="/member-center/comment"
                      className="flex space-x-2 items-center"
                    >
                      <FaRegCommentDots className="text-lg" />
                      <span>我的評論</span>
                    </Link>
                  </li>
                  <li className="flex space-x-3 py-4 items-center">
                    <Link
                      href="/social-media"
                      className="flex space-x-2 items-center"
                    >
                      <FaBloggerB className="text-lg" />
                      <span>我的社群</span>
                    </Link>
                  </li>
                </div>
              ) : null}
            </ul>
            <hr />
            <ul className="inline-flex flex-col w-[122px]">
              <li className="flex space-x-3 py-4 items-center">
                <Link
                  href="/planning-tour/1"
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
