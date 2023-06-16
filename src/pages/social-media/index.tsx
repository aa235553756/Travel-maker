import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import BlogCard from '@/common/components/card/BlogCard'
import Follows from '@/modules/BlogPage/components/Follows'
import Fans from '@/modules/BlogPage/components/Fans'
import { getCookie } from 'cookies-next'

interface BlogDataProps {
  BlogGuid: string
  IsCollect: boolean
  Cover: string
  Title: string
  Profile: string
  UserName: string
  InitDate: string
  Sees: number
  Likes: number
  Comments: number
  Category: string[]
}

interface BlogsDataProps {
  ProfilePicture: string
  UserName: string
  IsFollow: boolean
  Blogs: number
  Fans: number
  Follows: number
  BlogData: BlogDataProps[]
}

interface FanDatProps {
  UserGuid: string
  UserName: string
  ProfilePicture: string
  IsFollow: boolean
}

interface FansDataProps {
  UserName: string
  ProfilePicture: string
  BlogCounts: number
  Fans: number
  Followers: number
  FanData: FanDatProps[]
}

interface FollowDataProps {
  UserGuid: string
  UserName: string
  ProfilePicture: string
  IsFollow: boolean
}

interface FollowsDataProps {
  UserName: string
  ProfilePicture: string
  BlogCounts: number
  Fans: number
  Followers: number
  FollowData: FollowDataProps[]
}

export async function getServerSideProps({
  req,
  res,
}: {
  req: undefined
  res: undefined
}) {
  const token = getCookie('auth', { res, req })
  const user = getCookie('user', { res, req })
    ? JSON.parse(String(getCookie('user', { res, req })))
    : null

  // 【API】取得單一用戶社群頁面(遊記)
  const resBlogsData = await fetch(
    `https://travelmaker.rocket-coding.com/api/blogs/profile/${user.UserGuid}`,
    {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
  const blogsData = await resBlogsData.json()

  // 【API】顯示粉絲
  const resFansData = await fetch(
    `https://travelmaker.rocket-coding.com/api/blogs/${user.UserGuid}/fans/1`,
    {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
  const fansData = await resFansData.json()

  // 【API】顯示追蹤
  const resFollowsData = await fetch(
    `https://travelmaker.rocket-coding.com/api/blogs/${user.UserGuid}/follows/1`,
    {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
  const followsData = await resFollowsData.json()

  return {
    props: {
      blogsData,
      fansData,
      followsData,
    },
  }
}

export default function MyBlog({
  blogsData,
  fansData,
  followsData,
}: {
  blogsData: BlogsDataProps
  fansData: FansDataProps
  followsData: FollowsDataProps
}) {
  const token = getCookie('auth')
  const user = getCookie('user') ? JSON.parse(String(getCookie('user'))) : null

  const [activeTab, setActiveTab] = useState(1)
  const [page, setPage] = useState(2)
  const [blog, setBlog] = useState(blogsData.BlogData)
  const [fan, setFan] = useState(fansData.FanData)
  const [follow, setFollow] = useState(followsData.FollowData)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fanNum, setFanNum] = useState(fansData.Fans)
  const [followNum, setFollowNum] = useState(followsData.Followers)
  const [loading, setLoading] = useState(false)

  // 節流 : 每隔設定的秒數才執行函數
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const throttle = <T extends any[]>(
    callback: (...args: T) => void,
    time = 1000
  ) => {
    let timer: NodeJS.Timeout | null = null
    return (...args: T) => {
      if (timer) {
        return
      }

      timer = setTimeout(() => {
        timer = null
        callback(...args)
      }, time)
    }
  }

  useEffect(() => {
    const handleScroll = async () => {
      const clientHeight = document.documentElement.clientHeight
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight

      if (scrollTop + clientHeight + 100 >= scrollHeight) {
        setLoading(true)
        const data = await fetch(
          `https://travelmaker.rocket-coding.com/api/blogs/profile/${user.UserGuid}/${page}`,
          {
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        const moreData = await data.json()

        if (data.ok) {
          setBlog((prevData) => [...prevData, ...moreData])
          setPage((prevPage) => prevPage + 1)
        }
      }
    }

    const throttledScrollHandler = throttle(handleScroll)

    const scrollEventListener = () => {
      throttledScrollHandler()
    }

    window.addEventListener('scroll', scrollEventListener)

    return () => {
      window.removeEventListener('scroll', scrollEventListener)
    }
  }, [user, token, page, setBlog, setPage])

  return (
    <div className="container">
      <div className="w-full pt-10 pb-[100px] mx-auto md:w-2/3 md:pb-[160px]">
        {/* 用戶 */}
        <div className="flex items-center space-x-[60px] pb-10">
          <Image
            src={blogsData.ProfilePicture}
            width={90}
            height={90}
            className="rounded-full min-h-[90px]"
            alt="圖片"
          ></Image>
          <h2 className="text-[22px] font-bold">{blogsData.UserName}</h2>
        </div>

        {/* 頁籤 */}
        <div className="pb-10">
          <div className="flex justify-between pb-2">
            <button
              type="button"
              className={`w-1/3 border-b text-center p-4 ${
                activeTab === 1
                  ? 'border-primary text-primary'
                  : 'border-gray-E2 text-gray-A8'
              }`}
              onClick={() => {
                setActiveTab(1)
              }}
            >
              <p>{blogsData.Blogs}</p>
              <p>遊記</p>
            </button>
            <button
              type="button"
              className={`w-1/3 border-b text-center p-4 ${
                activeTab === 2
                  ? 'border-primary text-primary'
                  : 'border-gray-E2 text-gray-A8'
              }`}
              onClick={async () => {
                setActiveTab(2)
                const resFansData = await fetch(
                  `https://travelmaker.rocket-coding.com/api/blogs/${user.UserGuid}/fans/1`,
                  {
                    headers: {
                      Authorization: `${token}`,
                      'Content-Type': 'application/json',
                    },
                  }
                )
                const fansData = await resFansData.json()
                setFan(fansData.FanData)
              }}
            >
              <p>{fanNum}</p>
              <p>粉絲</p>
            </button>
            <button
              type="button"
              className={`w-1/3 border-b text-center p-4 ${
                activeTab === 3
                  ? 'border-primary text-primary'
                  : 'border-gray-E2 text-gray-A8'
              }`}
              onClick={async () => {
                setActiveTab(3)
                const resFollowsData = await fetch(
                  `https://travelmaker.rocket-coding.com/api/blogs/${user.UserGuid}/follows/1`,
                  {
                    headers: {
                      Authorization: `${token}`,
                      'Content-Type': 'application/json',
                    },
                  }
                )
                const followsData = await resFollowsData.json()
                setFollow(followsData.FollowData)
                setFollowNum(followsData.Followers)
              }}
            >
              <p>{followNum}</p>
              <p>追蹤</p>
            </button>
          </div>
        </div>

        {/* 貼文 */}
        {activeTab === 1 && (
          <div className="flex flex-wrap -my-5 mb-[100px] lg:-mx-3">
            {blog?.map((item, index) => {
              return (
                <div className="w-full py-5 lg:w-1/2 lg:px-3" key={index}>
                  <BlogCard
                    draft
                    id={item.BlogGuid}
                    blogName={item.Title}
                    poster={item.UserName}
                    time={item.InitDate}
                    type={item.Category}
                    view={item.Sees}
                    like={item.Likes}
                    comment={item.Comments}
                    blogImage={item.Cover}
                    userImage={item.Profile}
                    blog={blog}
                    setBlog={setBlog}
                  />
                </div>
              )
            })}
          </div>
        )}

        {/* 粉絲 */}
        {activeTab === 2 && (
          <div className="flex flex-col space-y-10 lg:mb-8 lg:flex-wrap">
            {fan?.map((item) => {
              return (
                <div key={item.UserGuid}>
                  <Fans
                    id={item.UserGuid}
                    user={item.UserName}
                    userImage={item.ProfilePicture}
                    isFollow={item.IsFollow}
                  />
                </div>
              )
            })}
          </div>
        )}

        {/* 追蹤 */}
        {activeTab === 3 && (
          <div className="flex flex-col space-y-10 lg:mb-8 lg:flex-wrap">
            {follow?.map((item, index) => {
              return (
                <div key={index}>
                  <Follows
                    id={item.UserGuid}
                    user={item.UserName}
                    userImage={item.ProfilePicture}
                    isFollow={item.IsFollow}
                  />
                </div>
              )
            })}
          </div>
        )}

        {loading ? null : <p className="text-center">loading...</p>}
      </div>
    </div>
  )
}
