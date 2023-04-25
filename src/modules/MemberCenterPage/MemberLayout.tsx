import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCookie } from 'cookies-next'
import { BsPencil, BsBookmarkHeart, BsFillCameraFill } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'
import { SlSettings } from 'react-icons/sl'
import { AiOutlineHeart } from 'react-icons/ai'
import { IoLocationOutline } from 'react-icons/io5'
import { MemberLayoutProps } from '@/util/memberTypes'

export default function MemberLayout({
  children,
  path,
  countData,
}: MemberLayoutProps): JSX.Element {
  // 判斷有無取得 cookie
  const user = getCookie('user') ? JSON.parse(String(getCookie('user'))) : null

  // 這邊避免使用三元運算會報出伺服器與本地 HTML 渲染不一致的問題
  // 可參考 https://nextjs.org/docs/messages/react-hydration-error
  const [userName, setUserName] = useState()
  useEffect(() => setUserName(user.UserName), [user])

  return (
    <div>
      <div className="container">
        {/* 電腦版 */}
        <div className="hidden md:flex md:space-x-6 md:mt-[80px] md:mb-[160px]">
          <div className="md:w-1/3 md:flex md:flex-col md:space-y-7">
            {/* 個人資訊區 */}
            <div className="md:member-shadow md:rounded-md md:px-7 md:py-12 md:flex md:flex-col md:space-y-4">
              <div className="md:bg-gray-D9 rounded-full md:w-[164px] md:h-[164px] md:flex md:flex-col md:items-center md:justify-center md:space-y-2 md:mb-0 md:mx-auto">
                <p className="md:text-gray-73 md:text-2xl">頭貼</p>
                <div className="md:border md:border-[#fff] md:rounded-full md:bg-[#fff] md:p-2">
                  <BsFillCameraFill className="md:text-gray-73" />
                </div>
              </div>
              <div className="md:flex md:flex-col md:space-y-4 md:text-center">
                <h3 className="md:text-lg md:font-bold">會員中心-我的帳戶</h3>
                <p className="md:text-lg">暱稱:{userName}</p>
              </div>
            </div>
            {/* 會員中心分類 */}
            <div className="md:text-center md:member-shadow md:rounded-md">
              <ul className="md:py-8 md:inline-flex md:flex-col md:cursor-pointer">
                <li>
                  <Link
                    href="/member-center"
                    className={`flex space-x-3 py-4 items-center hover:text-primary hover:font-bold ${
                      path === '/' ? 'text-primary font-bold' : 'text-gray-73'
                    }`}
                  >
                    <SlSettings className="md:text-lg" />
                    <span>帳號設定</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/member-center/tour"
                    className={`flex space-x-3 py-4 items-center hover:text-primary hover:font-bold ${
                      path === 'Journey'
                        ? 'text-primary font-bold'
                        : 'text-gray-73'
                    }`}
                  >
                    <AiOutlineHeart className="md:text-lg" />
                    <span>我的收藏行程({countData?.TourCounts})</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/member-center/attraction"
                    className={`flex space-x-3 py-4 items-center hover:text-primary hover:font-bold ${
                      path === 'Attract'
                        ? 'text-primary font-bold'
                        : 'text-gray-73'
                    }`}
                  >
                    <IoLocationOutline className="md:text-lg" />
                    <span>我的收藏景點({countData?.AttCounts})</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/member-center/blog"
                    className={`flex space-x-3 py-4 items-center hover:text-primary hover:font-bold ${
                      path === 'Blog'
                        ? 'text-primary font-bold'
                        : 'text-gray-73'
                    }`}
                  >
                    <BsPencil className="md:text-lg" />
                    <span>我的遊記({countData?.BlogCounts})</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/member-center/follow"
                    className={`flex space-x-3 py-4 items-center hover:text-primary hover:font-bold ${
                      path === 'Track'
                        ? 'text-primary font-bold'
                        : 'text-gray-73'
                    }`}
                  >
                    <BsBookmarkHeart className="md:text-lg" />
                    <span>我的追蹤({countData?.FollowCounts})</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/member-center/comment"
                    className={`flex space-x-3 py-4 items-center hover:text-primary hover:font-bold ${
                      path === 'Comment'
                        ? 'text-primary font-bold'
                        : 'text-gray-73'
                    }`}
                  >
                    <FaRegCommentDots className="md:text-lg" />
                    <span>我的評論({countData?.AttCommentCounts})</span>
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
