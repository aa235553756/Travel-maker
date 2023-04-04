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
        <div className="md:hidden mt-24 mb-[100px] ">
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
            {activeTab === 1 && (
              <div className="flex flex-col space-y-6">
                {Array(20)
                  .fill('')
                  .map((item, index) => {
                    return (
                      <TourCard
                        key={index}
                        likes={235}
                        countAttr={4}
                        tourName={'小孩瘋愛好玩公園'}
                        showLike={true}
                        creator={''}
                        showCreator={false}
                      />
                    )
                  })}
              </div>
            )}
            {activeTab === 2 && (
              <div className="flex flex-col space-y-6">
                {Array(20)
                  .fill('')
                  .map((item, index) => {
                    return (
                      <TourCard
                        key={index}
                        likes={1.5}
                        countAttr={1}
                        tourName={'大安森林公園'}
                        showLike={false}
                        creator={'阿洋小公主'}
                        showCreator={true}
                      />
                    )
                  })}
              </div>
            )}
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
            {activeTab === 1 && (
              <div className="flex flex-wrap -my-3 mb-16 lg:-mx-3">
                {Array(20)
                  .fill('')
                  .map((item, index) => {
                    return (
                      <div key={index} className="w-full py-3 lg:w-1/2 lg:px-3">
                        <TourCard
                          likes={235}
                          countAttr={4}
                          tourName={'小孩瘋愛好玩公園'}
                          showLike={true}
                          creator={''}
                          showCreator={false}
                        />
                      </div>
                    )
                  })}
              </div>
            )}
            {activeTab === 2 && (
              <div className="flex flex-wrap -my-3 mb-16 lg:-mx-3">
                {Array(20)
                  .fill('')
                  .map((item, index) => {
                    return (
                      <div key={index} className="w-full py-3 lg:w-1/2 lg:px-3">
                        <TourCard
                          likes={1.5}
                          countAttr={1}
                          tourName={'大安森林公園'}
                          showLike={false}
                          creator={'阿洋小公主'}
                          showCreator={true}
                        />
                      </div>
                    )
                  })}
              </div>
            )}
            <SeeMore />
          </div>
        </div>
      </MemberLayout>
    </div>
  )
}
