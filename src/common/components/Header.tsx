import React, { useState, useEffect, useRef } from 'react'
import { deleteCookie, getCookie, hasCookie } from 'cookies-next'
import { FcMenu } from 'react-icons/fc'
import { FaBloggerB } from 'react-icons/fa'
import {
  BsSearch,
  BsFillFlagFill,
  BsPencil,
  BsBookmarkHeart,
  BsGeoAlt,
} from 'react-icons/bs'
import { IoHomeOutline, IoLocationSharp } from 'react-icons/io5'
import { FaUserCircle, FaRegCommentDots } from 'react-icons/fa'
import { SlSettings } from 'react-icons/sl'
import { AiOutlineHeart, AiOutlineSetting } from 'react-icons/ai'

import { BiLogOut } from 'react-icons/bi'
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineCancel,
} from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()
  // 漢堡條

  const [isHam, setIsHam] = useState(false)
  const hamState = () => {
    setIsHam(!isHam)
    setIsMember(false)
    document.body.style.overflow = 'hidden'
  }

  // 手機版搜尋
  const [isSearching, setIsSearching] = useState(false)
  const searchingState = () => {
    setIsSearching(!isSearching)
    inputRef?.current?.focus()
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
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isHam) {
      document.body.style.overflow = 'auto'
    }
  }, [isHam])

  // 判斷有無取得 cookie
  const user = getCookie('user') ? JSON.parse(String(getCookie('user'))) : null
  const auth = hasCookie('auth')

  // 取得會員頭貼
  const [picture, setPicture] = useState('')
  useEffect(() => setPicture(user?.ProfilePicture), [user])
  const [token, setToken] = useState(false)
  useEffect(() => setToken(auth), [auth])
  // 判斷是否在會員中心導向至登入註冊

  // 關鍵字搜尋
  const refKeyWord = useRef<HTMLInputElement | null>(null)

  return (
    <div className="z-30 relative overflow-hidden lg:overflow-visible">
      {/* 電腦版 */}
      <div className="z-10 top-0 w-full hidden shadow border-b-[1px] border-gray-E7 md:h-[120px] md:bg-glass-45 md:items-center md:justify-between lg:flex">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* logo+名稱 */}
            <Link
              href="/"
              className="flex items-center md:space-x-2 lg:space-x-6 flex-shrink-0  duration-300 rounded-md hover:px-2"
            >
              {/* <div className="md:w-[60px] md:h-[60px] lg:w-[102px] lg:h-[102px] bg-[#ccc] rounded-full"></div> */}

              <h1 className="max-w-[210px] max-h-[100px]">
                <Image
                  src="/logo.png"
                  alt="還在為了聚會行程煩惱嗎？ Travel Maker 五秒鐘搞定行程！"
                  width={210}
                  height={100}
                  priority
                />
              </h1>
            </Link>
            <div className="flex space-x-5 items-center">
              {/* 搜尋bar */}
              <div className=" relative max-w-full w-[228px] h-10 group">
                <input
                  className="group-hover:ring-1 absolute border-b placeholder-[#ccc] px-5 py-1 w-full h-full rounded-md bg-glass focus-visible:bg-white"
                  placeholder="搜尋"
                  ref={refKeyWord}
                />
                <div className="absolute top-3 right-5">
                  <BsSearch
                    className="opacity-50 group-hover:opacity-100 cursor-pointer "
                    onClick={async () => {
                      const keyWordValue = refKeyWord.current?.value
                      const Keyword = keyWordValue === '' ? '' : keyWordValue
                      const Page = 1
                      await router.push({
                        pathname: '/hot-topics',
                        query: { Keyword, Page },
                      })
                      if (refKeyWord.current !== null) {
                        refKeyWord.current.value = ''
                      }
                    }}
                  />
                </div>
              </div>
              {/* 功能 */}
              <ul className="flex flex-shrink-0 space-x-5">
                <li>
                  <Link
                    href="/random-tour"
                    className="flex space-x-2 items-center py-10 group hover:animate-navbar-hover relative "
                  >
                    <div className="flex space-x-2 items-center  duration-300 relative py-1 pr-2  rounded-md ">
                      <div className="absolute translate-y-8 group-hover:translate-y-5 group-hover:opacity-100  w-0 opacity-0 bg-highlight h-[2px] group-hover:w-[calc(100%-16px)] left-3  duration-500"></div>
                      <IoLocationSharp className="text-lg text-primary group-hover:text-highlight duration-150" />
                      <span className="text-xl group-hover:text-highlight/80">
                        規劃行程
                      </span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hot-topics"
                    className="flex space-x-2 items-center py-10 group hover:animate-navbar-hover relative "
                  >
                    <div className="flex space-x-2 items-center  duration-300 relative py-1 pr-2  rounded-md ">
                      <div className="absolute translate-y-8 group-hover:translate-y-5 group-hover:opacity-100  w-0 opacity-0 bg-highlight h-[2px] group-hover:w-[calc(100%-16px)] left-3  duration-500"></div>
                      <BsFillFlagFill className="text-lg text-primary group-hover:text-highlight duration-150" />
                      <span className="text-xl group-hover:text-highlight/80">
                        熱門話題
                      </span>
                    </div>
                  </Link>
                </li>
                {token ? (
                  <li className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        showMemberState()
                      }}
                      className="flex space-x-2 items-center py-10 group hover:animate-navbar-hover relative "
                    >
                      <div className="flex space-x-2 items-center  duration-300 relative py-1 pr-2  rounded-md ">
                        <div className="absolute translate-y-8 group-hover:translate-y-5 group-hover:opacity-100  w-0 opacity-0 bg-highlight h-[2px] group-hover:w-[calc(100%-12px)] left-2  duration-500"></div>
                        <FaUserCircle className="text-lg text-primary group-hover:text-highlight duration-150" />
                        <span className="text-xl group-hover:text-highlight/80">
                          會員中心
                        </span>
                      </div>
                    </button>
                    {showMember ? (
                      <div className="w-[300px] border ml-auto absolute right-0 top-[78px] z-10 rounded-lg shadow-lg bg-white">
                        <Link
                          href="/member-center"
                          onClick={() => {
                            showMemberState()
                          }}
                        >
                          <div className="flex justify-between items-center px-5 py-4 hover:bg-gray-100 cursor-pointer">
                            <div className="flex space-x-6 items-center">
                              <Image
                                width="52"
                                height="52"
                                src={picture}
                                alt="圖片"
                                className="h-[52px] rounded-full"
                              ></Image>
                              <span className="text-xl">會員設定</span>
                            </div>
                            <AiOutlineSetting />
                          </div>
                        </Link>
                        <hr />
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
                        <hr />
                        <button
                          className="block w-full text-left px-5 py-4 hover:bg-gray-100"
                          role="menuitem"
                          onClick={() => {
                            deleteCookie('auth')
                            deleteCookie('user')
                            setToken(false)
                            setPicture('')
                            if (router.pathname.includes('/member-center')) {
                              router.push('/login')
                            }
                          }}
                        >
                          登出
                        </button>
                      </div>
                    ) : null}
                  </li>
                ) : null}
                {token ? null : (
                  <li>
                    <Link
                      href="/login"
                      className="ml-2 flex h-full group items-center relative hover:animate-navbar-hover"
                    >
                      <div className="block  text-lg text-white  py-2 px-4 bg-primary rounded-md group-hover:bg-primary-tint duration-300">
                        登入註冊
                      </div>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 手機版 */}
      <div
        className={`${
          isHam || isSearching ? 'bg-white' : null
        } top-0 w-full  z-50 block bg-glass-45 lg:hidden duration-300`}
      >
        <div className="container">
          <div className="flex justify-between items-center h-16">
            <FcMenu
              className="text-2xl cursor-pointer"
              onClick={() => {
                hamState()
              }}
            />
            <Link href="/" className={isSearching ? 'hidden' : ''}>
              <h2 className="text-xl max-w-[150px] md:max-w-[170px]">
                <Image
                  src="/logo.png"
                  alt="Travel Maker 五秒鐘搞定行程！"
                  width={170}
                  height={60}
                  priority
                />
              </h2>
            </Link>
            <div
              className={`${
                isSearching ? 'left-1/2 translate-x-[-50%] opacity-100' : null
              } absolute right-0 opacity-0 max-w-full w-[228px] h-10 duration-150`}
            >
              {/* 不要刪除這個，防止手機版誤觸input搜尋bar */}
              {isSearching ? null : (
                <div className="absolute w-full h-full bg-transparent"></div>
              )}
              <input
                className="-z-10 overflow-hidden absolute border placeholder-[#ccc] px-5 py-1 w-full h-full duration-300 focus-visible:outline-secondary"
                placeholder="搜尋"
                ref={inputRef}
              />
              <div className="absolute top-3 right-5">
                <BsSearch />
              </div>
            </div>
            {isSearching ? (
              <MdOutlineCancel
                className="text-2xl"
                onClick={() => {
                  searchingState()
                }}
              />
            ) : (
              <BsSearch
                className="text-2xl z-10"
                onClick={() => {
                  searchingState()
                }}
              />
            )}
          </div>
        </div>
        <hr />
        {isHam || isSearching ? (
          <div
            className="fixed bg-black opacity-50 w-screen h-screen top-0 -z-10"
            onClick={() => {
              setIsHam(false)
              setIsMember(false)
              setIsSearching(false)
            }}
          ></div>
        ) : null}

        <div
          className={`${
            isHam ? null : 'left-[-256px]'
            // 前面className都是新增的
          } -z-10 min-w-[256px] left-0 top-0 pt-[74px] duration-700 p-5 h-full text-center overflow-auto text-gray-73 fixed bg-white`}
        >
          <ul className="inline-flex flex-col ">
            <li className="flex space-x-3 py-4 items-center">
              <Link
                href="/"
                className="flex space-x-2 items-center"
                onClick={() => {
                  hamState()
                }}
              >
                <IoHomeOutline className="text-lg" />
                <span>回首頁</span>
              </Link>
            </li>

            {token ? null : (
              <li className="flex space-x-3 py-4 items-center">
                <Link
                  href="/login"
                  className="flex space-x-2 items-center"
                  onClick={() => {
                    hamState()
                  }}
                >
                  <FaUserCircle className="text-lg" />
                  <span>登入/註冊</span>
                </Link>
              </li>
            )}
            {token ? (
              <li
                className="flex space-x-3 py-4 items-center cursor-pointer"
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
            ) : null}

            {isMember && isHam ? (
              <div className="translate-x-4">
                <li className="flex space-x-3 py-4 items-center">
                  <Link
                    href="/member-center"
                    className="flex space-x-2 items-center"
                    onClick={() => {
                      hamState()
                    }}
                  >
                    <SlSettings className="text-lg" />
                    <span>帳號設定</span>
                  </Link>
                </li>
                <li className="flex space-x-3 py-4 items-center">
                  <Link
                    href="/member-center/tour"
                    className="flex space-x-2 items-center"
                    onClick={() => {
                      hamState()
                    }}
                  >
                    <AiOutlineHeart className="text-lg" />
                    <span>我的收藏行程</span>
                  </Link>
                </li>
                <li className="flex space-x-3 py-4 items-center">
                  <Link
                    href="/member-center/attraction"
                    className="flex space-x-2 items-center"
                    onClick={() => {
                      hamState()
                    }}
                  >
                    <BsGeoAlt className="text-lg" />
                    <span>我的收藏景點</span>
                  </Link>
                </li>
                <li className="flex space-x-3 py-4 items-center">
                  <Link
                    href="/member-center/blog"
                    className="flex space-x-2 items-center"
                    onClick={() => {
                      hamState()
                    }}
                  >
                    <BsPencil className="text-lg" />
                    <span>收藏遊記&草稿</span>
                  </Link>
                </li>
                <li className="flex space-x-3 py-4 items-center">
                  <Link
                    href="/member-center/follow"
                    className="flex space-x-2 items-center"
                    onClick={() => {
                      hamState()
                    }}
                  >
                    <BsBookmarkHeart className="text-lg" />
                    <span>我的追蹤</span>
                  </Link>
                </li>
                <li className="flex space-x-3 py-4 items-center">
                  <Link
                    href="/member-center/comment"
                    className="flex space-x-2 items-center"
                    onClick={() => {
                      hamState()
                    }}
                  >
                    <FaRegCommentDots className="text-lg" />
                    <span>我的景點評論</span>
                  </Link>
                </li>
                <li className="flex space-x-3 py-4 items-center">
                  <Link
                    href="/social-media"
                    className="flex space-x-2 items-center"
                    onClick={() => {
                      hamState()
                    }}
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
                href="/random-tour"
                className="flex space-x-2 items-center"
                onClick={() => {
                  hamState()
                }}
              >
                <IoLocationSharp className="text-lg" />
                <span>規劃行程</span>
              </Link>
            </li>
            <li className="flex space-x-3 py-4 items-center">
              <Link
                href="/hot-topics"
                className="flex space-x-2 items-center"
                onClick={() => {
                  hamState()
                }}
              >
                <BsFillFlagFill className="text-lg" />
                <span>熱門話題</span>
              </Link>
            </li>
          </ul>
          {token ? (
            <>
              <hr />
              <ul className="inline-flex flex-col w-[122px]">
                <li className="flex space-x-3 py-4 items-center cursor-pointer">
                  <div
                    className="flex space-x-2 items-center"
                    onClick={() => {
                      deleteCookie('auth')
                      deleteCookie('user')
                      setToken(false)
                      setPicture('')
                      if (router.pathname.includes('/member-center')) {
                        router.push('/login')
                      }
                    }}
                  >
                    <BiLogOut className="text-lg" />
                    <span>登出</span>
                  </div>
                </li>
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
