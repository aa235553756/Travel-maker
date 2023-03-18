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
        <div className="hidden md:flex md:space-x-6 md:mt-[80px] mb-[160px]">
          <div className="md:w-1/3 md:flex md:flex-col md:space-y-7">
            {/* 個人資訊區 */}
            <div className="md:bg-[#d7d7d7] md:px-7 md:py-12 md:flex md:flex-col md:space-y-4">
              <div className="md:bg-[#ccc] rounded-full md:w-[164px] md:h-[164px] md:flex md:flex-col md:items-center md:justify-center md:space-y-2 md:mb-0 md:mx-auto">
                <p>頭貼</p>
                <div className="md:border md:border-[#fff] md:rounded-full md:bg-[#fff] md:p-2">
                  <BsFillCameraFill />
                </div>
              </div>
              <div className="md:flex md:flex-col md:space-y-4 md:text-center">
                <h3 className="md:text-lg md:font-bold">會員中心-我的帳戶</h3>
                <p className="md:text-lg">暱稱:小熊軟糖</p>
              </div>
            </div>
            {/* 會員中心分類 */}
            <div className="md:text-center md:bg-[#d7d7d7]">
              <ul className="md:py-8 md:inline-flex md:flex-col md:cursor-pointer">
                <li>
                  <Link
                    href="/MemberCenter"
                    className="md:flex md:space-x-3 md:py-4 md:items-center"
                  >
                    <SlSettings className="md:text-lg" />
                    <span
                      className={`md:font-${path === '/' ? 'bold' : 'normal'}`}
                    >
                      帳號設定
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/MemberCenter/Journey"
                    className="md:flex md:space-x-3 md:py-4 md:items-center"
                  >
                    <AiOutlineHeart className="md:text-lg" />
                    <span
                      className={`md:font-${
                        path === 'Journey' ? 'bold' : 'normal'
                      }`}
                    >
                      我的收藏行程(6)
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/MemberCenter/Attract"
                    className="md:flex md:space-x-3 md:py-4 md:items-center"
                  >
                    <GrLocation className="md:text-lg" />
                    <span
                      className={`md:font-${
                        path === 'Attract' ? 'bold' : 'normal'
                      }`}
                    >
                      我的收藏景點(5)
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/MemberCenter/Blog"
                    className="md:flex md:space-x-3 md:py-4 md:items-center"
                  >
                    <BsPencil className="md:text-lg" />
                    <span
                      className={`md:font-${
                        path === 'Blog' ? 'bold' : 'normal'
                      }`}
                    >
                      我的遊記(6)
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/MemberCenter/Track"
                    className="md:flex md:space-x-3 md:py-4 md:items-center"
                  >
                    <BsBookmarkHeart className="md:text-lg" />
                    <span
                      className={`md:font-${
                        path === 'Track' ? 'bold' : 'normal'
                      }`}
                    >
                      我的追蹤(3)
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/MemberCenter/Comment"
                    className="md:flex md:space-x-3 md:py-4 md:items-center"
                  >
                    <FaRegCommentDots className="md:text-lg" />
                    <span
                      className={`md:font-${
                        path === 'Comment' ? 'bold' : 'normal'
                      }`}
                    >
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
