import React, { useState } from 'react'
import Image from 'next/image'
import BlogCard from '@/common/components/card/BlogCard'
import SeeMore from '@/common/components/SeeMore'
import Follows from '@/modules/BlogPage/components/Follows'
import Fans from '@/modules/BlogPage/components/Fans'

export default function MyBlog() {
  // tab class 切換
  const [activeTab, setActiveTab] = useState(1)
  const tabState = (tabIndex: number): void => {
    setActiveTab(tabIndex)
  }

  return (
    <div className="container">
      <div className="w-full pt-10 pb-[100px] mx-auto md:w-2/3 md:pb-[160px]">
        {/* 用戶 */}
        <div className="flex items-center space-x-[60px] pb-10">
          <Image
            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
            alt="圖片"
            width={90}
            height={90}
            className="rounded-full min-h-[90px]"
          ></Image>
          <h2 className="text-[22px] font-bold">小熊軟糖</h2>
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
          <div className="flex flex-col space-y-6 lg:mb-8 lg:flex-row lg:flex-wrap lg:space-x-6">
            <BlogCard
              showCollect={false}
              blogName="好瘋狂熱血少年"
              poster="老頭阿迪"
              time="2023-03-01 18:00"
              type={['城市走走']}
              view={10}
              like={10}
              comment={10}
              blogImage={''}
              userImage={''}
            />
            <BlogCard
              showCollect={false}
              blogName="好瘋狂熱血少年"
              poster="老頭阿迪"
              time="2023-03-01 18:00"
              type={['城市走走']}
              view={10}
              like={10}
              comment={10}
              blogImage={''}
              userImage={''}
            />
            <BlogCard
              showCollect={false}
              blogName="好瘋狂熱血少年"
              poster="老頭阿迪"
              time="2023-03-01 18:00"
              type={['城市走走']}
              view={10}
              like={10}
              comment={10}
              blogImage={''}
              userImage={''}
            />
          </div>
        )}

        {/* 粉絲 */}
        {activeTab === 2 && (
          <div className="flex flex-col space-y-6 lg:mb-8 lg:flex-row lg:flex-wrap">
            <Fans user="老頭阿迪" />
            <Fans user="珍珠五十嵐" />
            <Fans user="木村倒頭栽" />
            <Fans user="有春地瓜" />
          </div>
        )}

        {/* 追蹤 */}
        {activeTab === 3 && (
          <div className="flex flex-col space-y-6 lg:mb-8 lg:flex-row lg:flex-wrap">
            <Follows user="蘋果牛奶糖" />
            <Follows user="臺北的韓國歐巴" />
            <Follows user="環遊小世界的少年" />
            <Follows user="蛋捲珍好甲" />
          </div>
        )}

        <div className="hidden lg:block">
          <SeeMore />
        </div>
      </div>
    </div>
  )
}
