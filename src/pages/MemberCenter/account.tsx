import React from 'react'
import Link from 'next/link'
import {
  BsPencil,
  BsBookmarkHeart,
  BsLightbulb,
  BsFillCameraFill,
} from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'
import { SlSettings } from 'react-icons/sl'
import { AiOutlineHeart } from 'react-icons/ai'
import { GrLocation } from 'react-icons/gr'

export default function Account() {
  return (
    <div>
      <div className="container">
        {/* 手機版 */}
        <h2 className="text-lg font-bold mt-8 mb-4 md:hidden">帳號設定</h2>
        <div className="bg-[#d7d7d7] px-7 py-5 flex flex-col space-y-4 w-full md:hidden">
          <div className="flex items-center">
            <div className="w-[80px]">頭像</div>
            <div className="w-[56px] h-[56px] bg-[#ccc] rounded-full"></div>
          </div>
          <div className="flex items-center">
            <div className="w-[80px]">暱稱</div>
            <span>小熊軟糖</span>
          </div>
          <div className="flex items-center">
            <div className="w-[80px]">電子信箱</div>
            <span>fufuco89@gmail.com</span>
          </div>
          <button className="bg-[#ccc] px-8 py-2 block mx-auto">編輯</button>
        </div>
        {/* 電腦版 */}
        <div className="hidden md:flex md:space-x-6 md:mt-[80px] mb-[160px]">
          <div className="md:w-1/3 md:flex md:flex-col md:space-y-7">
            {/* 個人資訊區 */}
            <div className="md:bg-[#d7d7d7] md:px-7 md:py-12 md:flex md:flex-col md:space-y-4">
              <div className="md:bg-[#ccc] rounded-full md:w-[164px] md:h-[164px] md:flex md:flex-col md:items-center md:justify-center md:space-y-2 md:mb-0 md:mx-auto">
                <p>頭貼</p>
                <div className="md:border md:border-white md:rounded-full md:bg-white md:p-2">
                  <BsFillCameraFill />
                </div>
              </div>
              <div className="md:flex md:flex-col md:space-y-6 md:text-center">
                <h3 className="md:text-xl md:font-bold">會員中心-我的帳戶</h3>
                <p className="md:text-xl">暱稱:小熊軟糖</p>
              </div>
            </div>
            {/* 會員中心分類 */}
            <div className="md:text-center md:bg-[#d7d7d7]">
              <ul className="md:py-8 md:inline-flex md:flex-col md:cursor-pointer">
                <li>
                  <Link href="/MemberCenter" className="md:flex md:space-x-3 md:py-4 md:items-center">
                    <SlSettings className="md:text-lg" />
                    <span className="md:font-bold">帳號設定</span>
                  </Link>
                </li>
                <li>
                  <Link href="/MemberCenter/Journey" className="md:flex md:space-x-3 md:py-4 md:items-center">
                    <AiOutlineHeart className="md:text-lg" />
                    <span>我的收藏行程(6)</span>
                  </Link>
                </li>
                <li>
                  <Link href="/MemberCenter/Attract" className="md:flex md:space-x-3 md:py-4 md:items-center">
                    <GrLocation className="md:text-lg" />
                    <span>我的收藏景點(5)</span>
                  </Link>
                </li>
                <li>
                  <Link href="/MemberCenter/Blog" className="md:flex md:space-x-3 md:py-4 md:items-center">
                    <BsPencil className="md:text-lg" />
                    <span>我的遊記(6)</span>
                  </Link>
                </li>
                <li>
                  <Link href="/MemberCenter/Track" className="md:flex md:space-x-3 md:py-4 md:items-center">
                    <BsBookmarkHeart className="md:text-lg" />
                    <span>我的追蹤(3)</span>
                  </Link>
                </li>
                <li>
                  <Link href="/MemberCenter/Comment" className="md:flex md:space-x-3 md:py-4 md:items-center">
                    <FaRegCommentDots className="md:text-lg" />
                    <span>我的評論(9)</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:flex md:flex-col md:space-y-7 md:w-2/3">
            {/* 分類資訊區 */}
            <div className="md:bg-[#d7d7d7]">
              <h2 className="md:text-xl md:font-bold md:px-10 md:py-8">
                帳號設定
              </h2>
              <hr className="md:w-full " />
              <div className="md:flex md:items-center md:space-x-2  md:px-10 md:py-6">
                <BsLightbulb />
                <p>為了確保用戶身份的真實性，您無法變更電子信箱。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
