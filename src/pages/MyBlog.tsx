import React, { useState } from 'react'
import BlogCard from '../common/components/BlogCard'
import SeeMore from '@/common/components/SeeMoreButton'
import Follows from '@/modules/BlogPage/components/Follows'
import Fans from '@/modules/BlogPage/components/Fans'

export default function MyBlog() {
  // 追蹤 css 狀態
  const [isTrack, setIsTrack] = useState(true)
  const trackState = () => {
    setIsTrack(!isTrack)
  }

  // tab class 切換
  const [activeTab, setActiveTab] = useState(1)
  const tabState = (tabIndex: number): void => {
    setActiveTab(tabIndex)
  }

  return (
    <div className="container">
      <div className="w-full pt-10 pb-[100px] mx-auto md:w-2/3 md:pb-[160px]">
        {/* 用戶 */}
        <div className="flex space-x-[60px] pb-10">
          <div className="w-[90px] h-[90px] bg-[#d7d7d7] rounded-full"></div>
          <div className="flex flex-col space-y-5">
            <h2 className="text-[22px] font-bold">老頭阿迪</h2>
            {/* 追蹤與取消追蹤 */}
            {isTrack ? (
              <button
                className="bg-[#d7d7d7] px-6 py-2 w-[104px]"
                onClick={() => {
                  trackState()
                }}
              >
                追蹤中
              </button>
            ) : (
              <button
                className="border border-black px-6 py-2 w-[104px]"
                onClick={() => {
                  trackState()
                }}
              >
                追蹤
              </button>
            )}
          </div>
        </div>
        {/* 頁籤 */}
        <div className="pb-10">
          <div className="flex justify-between pb-2">
            <button
              type="button"
              className={`w-1/3 border-b text-center p-4 ${
                activeTab === 1 ? 'border-[#000]' : 'border-[#ccc]'
              }`}
              onClick={() => {
                tabState(1)
              }}
            >
              <p>6</p>
              <p>遊記</p>
            </button>
            <button
              type="button"
              className={`w-1/3 border-b text-center p-4 ${
                activeTab === 2 ? 'border-[#000]' : 'border-[#ccc]'
              }`}
              onClick={() => {
                tabState(2)
              }}
            >
              <p>10</p>
              <p>粉絲</p>
            </button>
            <button
              type="button"
              className={`w-1/3 border-b text-center p-4 ${
                activeTab === 3 ? 'border-[#000]' : 'border-[#ccc]'
              }`}
              onClick={() => {
                tabState(3)
              }}
            >
              <p>4</p>
              <p>追蹤</p>
            </button>
          </div>
        </div>

        {/* 貼文 */}
        {activeTab === 1 && (
          <div className="flex flex-col space-y-6 lg:flex-row lg:flex-wrap lg:space-x-6">
            <BlogCard
              showCollect={false}
              blogName="好瘋狂熱血少年"
              poster="老頭阿迪"
              time="2023-03-01 18:00"
            />
            <BlogCard
              showCollect={false}
              blogName="好瘋狂熱血少年"
              poster="老頭阿迪"
              time="2023-03-01 18:00"
            />
            <BlogCard
              showCollect={false}
              blogName="好瘋狂熱血少年"
              poster="老頭阿迪"
              time="2023-03-01 18:00"
            />
          </div>
        )}

        {/* 粉絲 */}
        {activeTab === 2 && (
          <div className="flex flex-col space-y-6 lg:flex-row lg:flex-wrap">
            <Fans user="老頭阿迪" />
            <Fans user="珍珠五十嵐" />
            <Fans user="木村倒頭栽" />
            <Fans user="有春地瓜" />
          </div>
        )}

        {/* 追蹤 */}
        {activeTab === 3 && (
          <div className="flex flex-col space-y-6 lg:flex-row lg:flex-wrap">
            <Follows user="蘋果牛奶糖" />
            <Follows user="臺北的韓國歐巴" />
            <Follows user="環遊小世界的少年" />
            <Follows user="蛋捲珍好甲" />
          </div>
        )}

        <SeeMore />
      </div>
    </div>
  )
}
