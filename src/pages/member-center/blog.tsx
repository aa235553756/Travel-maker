import React, { useState } from 'react'
import Link from 'next/link'
import MemberLayout from '@/modules/MemberCenterPage/MemberLayout'
import BlogCard from '@/common/components/card/BlogCard'
import BlogDraftCard from '@/modules/MemberCenterPage/components/BlogDraftCard'
import SeeMore from '@/common/components/SeeMore'

export default function Blog() {
  // tab  class 切換
  const [activeTab, setActiveTab] = useState(1)

  return (
    <div>
      {/* 手機版 */}
      <div className="container">
        <div className="md:hidden mt-8 mb-[100px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">我的遊記(2)</h2>
            <button className="border border-gray-73 px-4 py-2 rounded-md text-gray-73">
              新增遊記
            </button>
          </div>
          {/* 詳細資訊區 */}
          <div className="flex flex-col">
            {/* tab 按鈕 */}
            <div className="flex w-full">
              <button
                type="button"
                className={`w-full text-center border-b-2 ${
                  activeTab === 1 ? 'border-primary text-primary' : 'border-gray-E2 text-gray-A8'
                } p-4 mb-7`}
                onClick={() => {
                  setActiveTab(1)
                }}
              >
                收藏遊記(3)
              </button>
              <button
                type="button"
                className={`w-full text-center border-b-2 ${
                  activeTab === 2 ? 'border-primary text-primary' : 'border-gray-E2 text-gray-A8'
                } p-3 mb-7`}
                onClick={() => {
                  setActiveTab(2)
                }}
              >
                草稿遊記(1)
              </button>
            </div>
            {/* tab 內容 */}
            {activeTab === 1 && (
              <div className="flex flex-col space-y-6">
                {Array(20)
                  .fill('')
                  .map((item, index) => {
                    return (
                      <BlogCard
                        key={index}
                        showCollect={true}
                        blogName="好瘋狂熱血少年"
                        poster="老頭阿迪"
                        time="2023-03-01 18:00"
                      />
                    )
                  })}
              </div>
            )}
            {activeTab === 2 && (
              <div className="flex flex-col space-y-10">
                {Array(20)
                  .fill('')
                  .map((item, index) => {
                    return (
                      <BlogDraftCard
                        key={index}
                        showDelete={true}
                        blogName="漫步鳥語人森"
                        poster="小熊的旅行食蹤"
                        time="2023-03-01 18:00"
                      />
                    )
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 電腦版 */}
      <MemberLayout path="Blog">
        <div className="md:flex md:flex-col md:space-y-10 md:w-2/3">
          {/* 分類資訊區 */}
          <div className="md:member-shadow md:rounded-md">
            <div className="md:flex md:justify-between md:items-center md:px-10 md:py-8">
              <h2 className="md:text-xl">我的遊記</h2>
              <Link href="../blog/post-blog">
                <button className="md:border md:border-gray-73 md:px-4 md:py-2 md:rounded-md md:text-gray-73">
                  新增遊記
                </button>
              </Link>
            </div>
            <hr className="md:w-full md:border-gray-E2" />
            <div className="md:px-10 md:py-6">共有6則遊記</div>
          </div>
          {/* 詳細資訊區 */}
          <div className="md:flex md:flex-col">
            {/* tab 按鈕 */}
            <div className="md:flex md:w-full">
              <button
                type="button"
                className={`w-1/2 text-center border-b-2 ${
                  activeTab === 1 ? 'border-primary text-primary' : 'border-gray-E2 text-gray-A8'
                } p-4 mb-10`}
                onClick={() => {
                  setActiveTab(1)
                }}
              >
                收藏遊記(1)
              </button>
              <button
                type="button"
                className={`w-1/2 text-center border-b-2 ${
                  activeTab === 2 ? 'border-primary text-primary' : 'border-gray-E2 text-gray-A8'
                } p-4 mb-10`}
                onClick={() => {
                  setActiveTab(2)
                }}
              >
                草稿遊記(1)
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
                        <BlogCard
                          showCollect={true}
                          blogName="大小朋友手作烘焙DIY"
                          poster="阿如小日子"
                          time="2023-02-12 17:00"
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
                        <BlogDraftCard
                          showDelete={true}
                          blogName="漫步鳥語人森"
                          poster="小熊的旅行食蹤"
                          time="2023-03-01 18:00"
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
