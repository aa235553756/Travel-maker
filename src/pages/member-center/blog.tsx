import React, { useState } from 'react'
import MemberLayout from '@/modules/MemberCenterPage/MemberLayout'
import BlogCard from '@/common/components/BlogCard'
import SeeMore from '@/common/components/SeeMoreButton'
import { MdKeyboardArrowDown } from 'react-icons/md'
import Link from 'next/link'

export default function Blog() {
  // tab  class 切換
  const [activeTab, setActiveTab] = useState(1)
  const tabState = (tabIndex: number): void => {
    setActiveTab(tabIndex)
  }

  return (
    <div>
      {/* 手機版 */}
      <div className="container">
        <div className="flex justify-between items-center md:hidden">
          <h2 className="text-lg font-bold mt-8 mb-4 ">我的遊記</h2>
          <button className="border px-5 py-2">新增遊記</button>
        </div>
        {/* 詳細資訊區 */}
        <div className="flex flex-col md:hidden">
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
              全部遊記(3)
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
              收藏遊記(3)
            </button>
            <button
              type="button"
              className={`w-full text-center border-b-2 ${
                activeTab === 3 ? 'border-[#000]' : 'border-[#ccc]'
              } p-4 mb-10`}
              onClick={() => {
                tabState(3)
              }}
            >
              貼文遊記(1)
            </button>
            <button
              type="button"
              className={`w-full text-center border-b-2 ${
                activeTab === 4 ? 'border-[#000]' : 'border-[#ccc]'
              } p-4 mb-10`}
              onClick={() => {
                tabState(4)
              }}
            >
              草稿遊記(1)
            </button>
          </div>
          {/* tab 內容 */}
          <div>
            <div className="flex flex-col space-y-6">
              <BlogCard
                showCollect={true}
                blogName="台北中山區巷弄隱藏美食一日遊"
                poster="魔法公主"
                time="2022-10-01 18:00"
              />
              <BlogCard
                showCollect={true}
                blogName="台北中山區巷弄隱藏美食一日遊"
                poster="魔法公主"
                time="2022-10-01 18:00"
              />
              <BlogCard
                showCollect={true}
                blogName="台北中山區巷弄隱藏美食一日遊"
                poster="魔法公主"
                time="2022-10-01 18:00"
              />
            </div>
            <div className="flex items-center justify-center space-x-2 mt-7 mb-[100px]">
              <p>查看更多</p>
              <MdKeyboardArrowDown />
            </div>
          </div>
        </div>
      </div>
      {/* 電腦版 */}
      <MemberLayout path="Blog">
        <div className="md:flex md:flex-col md:space-y-7 md:w-2/3">
          {/* 分類資訊區 */}
          <div className="md:bg-[#d7d7d7]">
            <div className="md:flex md:justify-between md:items-center md:px-10 md:py-8">
              <h2 className="md:text-xl md:font-bold">我的遊記</h2>
              <Link href="../blog/post-blog">
                <button className="md:border md:px-5 md:py-2">新增遊記</button>
              </Link>
            </div>
            <hr className="md:w-full" />
            <div className="md:px-10 md:py-6">共有6則遊記</div>
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
                全部遊記(3)
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
                收藏遊記(1)
              </button>
              <button
                type="button"
                className={`w-1/2 text-center border-b-2 ${
                  activeTab === 3 ? 'border-[#000]' : 'border-[#ccc]'
                } p-4 mb-10`}
                onClick={() => {
                  tabState(3)
                }}
              >
                貼文遊記(1)
              </button>
              <button
                type="button"
                className={`w-1/2 text-center border-b-2 ${
                  activeTab === 4 ? 'border-[#000]' : 'border-[#ccc]'
                } p-4 mb-10`}
                onClick={() => {
                  tabState(4)
                }}
              >
                草稿遊記(1)
              </button>
            </div>
            <div className="md:flex md:flex-col md:space-y-6 lg:flex-row lg:flex-wrap lg:space-x-6">
              <Link href="../blog/view-blog/1">
                <BlogCard
                  showCollect={true}
                  blogName="台北中山區巷弄隱藏美食一日遊"
                  poster="魔法公主"
                  time="2022-10-01 18:00"
                />
              </Link>
              <Link href="../blog/view-blog/1">
                <BlogCard
                  showCollect={true}
                  blogName="台北中山區巷弄隱藏美食一日遊"
                  poster="魔法公主"
                  time="2022-10-01 18:00"
                />
              </Link>
              <Link href="../blog/view-blog/1">
                <BlogCard
                  showCollect={true}
                  blogName="台北中山區巷弄隱藏美食一日遊"
                  poster="魔法公主"
                  time="2022-10-01 18:00"
                />
              </Link>
            </div>
            <SeeMore />
          </div>
        </div>
      </MemberLayout>
    </div>
  )
}
