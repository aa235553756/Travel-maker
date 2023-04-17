import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import MemberLayout from '@/modules/MemberCenterPage/MemberLayout'
import BlogCard from '@/common/components/card/BlogCard'
import BlogDraftCard from '@/modules/MemberCenterPage/components/BlogDraftCard'
import SeeMore from '@/common/components/SeeMore'
import { BlogDataProps, MemberCountProps } from '@/pages/member-center/types'

export async function getServerSideProps({
  req,
  res,
}: {
  req: undefined
  res: undefined
}) {
  const token = getCookie('auth', { req, res })

  // 【API】取得我的收藏遊記
  const resBlogData = await fetch(
    `https://travelmaker.rocket-coding.com/api/users/blogCollections/1`,
    {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
  const blogData = await resBlogData.json()

  // 【API】會員中心左邊選單各項數量
  const resMemberCountData = await fetch(
    `https://travelmaker.rocket-coding.com/api/users/dataCounts`,
    {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
  const memberCountData = await resMemberCountData.json()

  return {
    props: {
      blogData,
      memberCountData,
    },
  }
}

export default function Blog({
  blogData,
  memberCountData,
}: {
  blogData: BlogDataProps
  memberCountData: MemberCountProps
}) {
  // tab  class 切換
  const [activeTab, setActiveTab] = useState(1)

  // 將行程及房間數量往 MemberLayout 傳
  const [countData, setCountData] = useState(memberCountData)
  useEffect(() => {
    setCountData(countData)
  }, [countData])

  // 卡片連結
  const router = useRouter()

  return (
    <div>
      {/* 手機版 */}
      <div className="container">
        <div className="md:hidden mt-8 mb-[100px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">
              我的遊記({memberCountData.BlogCounts})
            </h2>
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
                  activeTab === 1
                    ? 'border-primary text-primary'
                    : 'border-gray-E2 text-gray-A8'
                } p-4 mb-7`}
                onClick={() => {
                  setActiveTab(1)
                }}
              >
                收藏遊記({blogData.CollectCounts})
              </button>
              <button
                type="button"
                className={`w-full text-center border-b-2 ${
                  activeTab === 2
                    ? 'border-primary text-primary'
                    : 'border-gray-E2 text-gray-A8'
                } p-3 mb-7`}
                onClick={() => {
                  setActiveTab(2)
                }}
              >
                草稿遊記({blogData.DraftCounts})
              </button>
            </div>
            {/* tab 內容 */}
            {activeTab === 1 && (
              <div className="flex flex-col space-y-6">
                {blogData?.BlogData.map((item) => {
                  return (
                    <a
                      key={item.BlogGuid}
                      onClick={(e) => {
                        e.preventDefault()
                        router.push(`/blog/view-blog/${item.BlogGuid}`)
                      }}
                    >
                      <BlogCard
                        key={item.BlogGuid}
                        showCollect={true}
                        blogName={item.Title}
                        poster={item.UserName}
                        time={item.InitDate}
                        type={item.Category}
                        imageUrl={item.ProfilePicture}
                        view={item.Sees}
                        like={item.Likes}
                        comment={item.Comments}
                      />
                    </a>
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
      <MemberLayout
        path="Blog"
        countData={countData}
        setCountData={setCountData}
      >
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
            <div className="md:px-10 md:py-6">
              共有{memberCountData.BlogCounts}則遊記
            </div>
          </div>
          {/* 詳細資訊區 */}
          <div className="md:flex md:flex-col">
            {/* tab 按鈕 */}
            <div className="md:flex md:w-full">
              <button
                type="button"
                className={`w-1/2 text-center border-b-2 ${
                  activeTab === 1
                    ? 'border-primary text-primary'
                    : 'border-gray-E2 text-gray-A8'
                } p-4 mb-10`}
                onClick={() => {
                  setActiveTab(1)
                }}
              >
                收藏遊記({blogData.CollectCounts})
              </button>
              <button
                type="button"
                className={`w-1/2 text-center border-b-2 ${
                  activeTab === 2
                    ? 'border-primary text-primary'
                    : 'border-gray-E2 text-gray-A8'
                } p-4 mb-10`}
                onClick={() => {
                  setActiveTab(2)
                }}
              >
                草稿遊記({blogData.DraftCounts})
              </button>
            </div>
            {/* tab 內容 */}
            {activeTab === 1 && (
              <div className="flex flex-wrap -my-3 mb-16 lg:-mx-3">
                {blogData?.BlogData.map((item) => {
                  return (
                    <a
                      key={item.BlogGuid}
                      onClick={(e) => {
                        e.preventDefault()
                        router.push(`/blog/view-blog/${item.BlogGuid}`)
                      }}
                      className="w-full py-3 lg:w-1/2 lg:px-3 cursor-pointer hover:opacity-80 hover:duration-500 hover:-translate-y-1"
                    >
                      <BlogCard
                        showCollect={true}
                        blogName={item.Title}
                        poster={item.UserName}
                        time={item.InitDate}
                        type={item.Category}
                        imageUrl={item.ProfilePicture}
                        view={item.Sees}
                        like={item.Likes}
                        comment={item.Comments}
                      />
                    </a>
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
