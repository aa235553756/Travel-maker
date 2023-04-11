import React, { ReactNode } from 'react'
import Link from 'next/link'
import { BsPencil, BsBookmarkHeart, BsFillCameraFill } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'
import { SlSettings } from 'react-icons/sl'
import { AiOutlineHeart } from 'react-icons/ai'
import { GrLocation } from 'react-icons/gr'

type Props = {
  children: ReactNode
  path?: string
}

export default function MemberLayout({ children, path }: Props) {
  return (
    <div>
      <div className="container">
        {/* 電腦版 */}
        <div className="hidden md:flex md:space-x-6 md:mt-[80px] md:mb-[160px]">
          <div className="md:w-1/3 md:flex md:flex-col md:space-y-7">
            {/* 個人資訊區 */}
            <div className="md:member-shadow md:rounded-md md:px-7 md:py-12 md:flex md:flex-col md:space-y-4">
              <div className="md:bg-gray-D9 rounded-full md:w-[164px] md:h-[164px] md:flex md:flex-col md:items-center md:justify-center md:space-y-2 md:mb-0 md:mx-auto">
                <p className='md:text-gray-73 md:text-2xl'>頭貼</p>
                <div className="md:border md:border-[#fff] md:rounded-full md:bg-[#fff] md:p-2">
                  <BsFillCameraFill className='md:text-gray-73' />
                </div>
              </div>
              <div className="md:flex md:flex-col md:space-y-4 md:text-center">
                <h3 className="md:text-lg md:font-bold">會員中心-我的帳戶</h3>
                <p className="md:text-lg">暱稱:小熊軟糖</p>
              </div>
            </div>
            {/* 會員中心分類 */}
            <div className="md:text-center md:member-shadow md:rounded-md">
              <ul className="md:py-8 md:inline-flex md:flex-col md:cursor-pointer">
                <li>
                  <Link
                    href="/member-center"
                    className={`flex space-x-3 py-4 items-center text-${
                      path === '/' ? 'primary' : 'gray-73'
                    }`}
                  >
                    <SlSettings className="md:text-lg" />
                    <span>帳號設定</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/member-center/tour"
                     className={`flex space-x-3 py-4 items-center text-${
                      path === 'Journey' ? 'primary' : 'gray-73'
                    }`}
                  >
                    <AiOutlineHeart className="md:text-lg" />
                    <span>
                      我的收藏行程(6)
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/member-center/attraction"
                     className={`flex space-x-3 py-4 items-center text-${
                      path === 'Attract' ? 'primary' : 'gray-73'
                    }`}
                  >
                    <GrLocation className="md:text-lg" />
                    <span>
                      我的收藏景點(5)
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/member-center/blog"
                     className={`flex space-x-3 py-4 items-center text-${
                      path === 'Blog' ? 'primary' : 'gray-73'
                    }`}
                  >
                    <BsPencil className="md:text-lg" />
                    <span>
                      我的遊記(6)
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/member-center/follow"
                     className={`flex space-x-3 py-4 items-center text-${
                      path === 'Track' ? 'primary' : 'gray-73'
                    }`}
                  >
                    <BsBookmarkHeart className="md:text-lg" />
                    <span>
                      我的追蹤(3)
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/member-center/comment"
                     className={`flex space-x-3 py-4 items-center text-${
                      path === 'Comment' ? 'primary' : 'gray-73'
                    }`}
                  >
                    <FaRegCommentDots className="md:text-lg" />
                    <span>
                      我的評論(9)
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
