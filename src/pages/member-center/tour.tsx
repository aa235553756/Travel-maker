import React, { useState } from 'react'
import MemberLayout from '@/modules/MemberCenterPage/MemberLayout'
import TourCard from '@/common/components/card/TourCard'
import SeeMore from '@/common/components/SeeMore'

export default function Journey() {
  // tab class 切換
  const [activeTab, setActiveTab] = useState(1)
  const tabState = (tabIndex: number): void => {
    setActiveTab(tabIndex)
  }

  return (
    <div>
      {/* 手機版 */}
      <div className="container">
        <div className="pt-8 pb-[158px] md:hidden">
          {' '}
          <h2 className="text-lg font-bold mb-4">我的收藏行程</h2>
          {/* 詳細資訊區 */}
          <div className="flex flex-col">
            {/* tab 按鈕 */}
            <div className="flex w-full">
              <button
                type="button"
                className={`w-full text-center border-b-2 ${
                  activeTab === 1 ? 'border-[#000]' : 'border-[#ccc]'
                } p-4 mb-10`}
                onClick={() => {
                  tabState(1)
                }}
              >
                一般模式(3)
              </button>
              <button
                type="button"
                className={`w-full text-center border-b-2 ${
                  activeTab === 2 ? 'border-[#000]' : 'border-[#ccc]'
                } p-4 mb-10`}
                onClick={() => {
                  tabState(2)
                }}
              >
                房間模式(3)
              </button>
            </div>
            {/* tab 內容 */}
            <div>
              <div className="flex flex-col space-y-6 mb-8">
                <TourCard
                  tourName="好瘋狂熱血少年"
                  countAttr={4}
                  likes={100}
                  showLike={false}
                />
                <TourCard
                  tourName="好瘋狂熱血少年"
                  countAttr={4}
                  likes={100}
                  showLike={false}
                />
                <TourCard
                  tourName="好瘋狂熱血少年"
                  countAttr={4}
                  likes={100}
                  showLike={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 電腦版 */}
      <MemberLayout path="Journey">
        <div className="md:flex md:flex-col md:space-y-7 md:w-2/3">
          {/* 分類資訊區 */}
          <div className="md:bg-[#d7d7d7]">
            <h2 className="md:text-xl md:font-bold md:px-10 md:py-8">
              我的收藏行程
            </h2>
            <hr className="md:w-full" />
            <div className="md:px-10 md:py-6">共有6個收藏行程</div>
          </div>
          {/* 詳細資訊區 */}
          <div className="md:flex md:flex-col">
            {/* tab 按鈕 */}
            <div className="md:flex md:w-full">
              <button
                type="button"
                className={`w-1/2 text-center border-b-2 ${
                  activeTab === 1 ? 'border-[#000]' : 'border-[#ccc]'
                } p-4 mb-10`}
                onClick={() => {
                  tabState(1)
                }}
              >
                一般模式(3)
              </button>
              <button
                type="button"
                className={`w-1/2 text-center border-b-2 ${
                  activeTab === 2 ? 'border-[#000]' : 'border-[#ccc]'
                } p-4 mb-10`}
                onClick={() => {
                  tabState(2)
                }}
              >
                房間模式(3)
              </button>
            </div>
            {/* tab 內容 */}
            <div>
              <div className="md:flex md:flex-col md:space-y-6 md:mb-16 lg:flex-row lg:flex-wrap lg:space-x-6">
                <TourCard
                  tourName="好瘋狂熱血少年"
                  countAttr={4}
                  likes={100}
                  showLike={false}
                />
                <TourCard
                  tourName="好瘋狂熱血少年"
                  countAttr={4}
                  likes={100}
                  showLike={false}
                />
                <TourCard
                  tourName="好瘋狂熱血少年"
                  countAttr={4}
                  likes={100}
                  showLike={false}
                />
              </div>
              <SeeMore />
            </div>
          </div>
        </div>
      </MemberLayout>
    </div>
  )
}
