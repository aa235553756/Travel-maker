import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import MemberLayout from '@/modules/MemberCenterPage/MemberLayout'
import BlogCard from '@/common/components/card/BlogCard'
import BlogDraftCard from '@/modules/MemberCenterPage/components/BlogDraftCard'
import { BlogDataProps, MemberCountProps } from '@/util/memberTypes'
// import { CustomModal } from '@/common/components/CustomModal'
// import { BsXCircle } from 'react-icons/bs'
import { MdKeyboardArrowUp } from 'react-icons/md'
import Head from 'next/head'
import Image from 'next/image'
import { CustomModal } from '@/common/components/CustomModal'
import { useRouter } from 'next/router'
import { postNewDraftBlogApi } from '../../util/blogApi'
import { BsExclamationCircle } from 'react-icons/bs'

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

  // 【API】取得我的收藏遊記
  const resDraftBlogData = await fetch(
    ' https://travelmaker.rocket-coding.com/api/users/blogDrafts/1',
    {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    }
  )

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

  const resGetToursName = await fetch(
    'https://travelmaker.rocket-coding.com/api/blogs/tours',
    {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
  const toursNameData = await resGetToursName.json()

  const draftBlogData = await resDraftBlogData.json()
  return {
    props: {
      blogData,
      memberCountData,
      toursNameData,
      draftBlogData,
    },
  }
}

interface toursNameDataProps {
  TourId: number
  TourName: string
}

interface draftBlogProp {
  BlogGuid: string
  Title: string
  Cover: string
  InitDate: string
}

interface draftBlogAryProp {
  BlogData: draftBlogProp[]
}

export default function Blog({
  blogData,
  memberCountData,
  toursNameData,
  draftBlogData,
}: {
  blogData: BlogDataProps
  memberCountData: MemberCountProps
  toursNameData: toursNameDataProps[]
  draftBlogData: draftBlogAryProp
}) {
  const router = useRouter()
  // tab  class 切換
  const [activeTab, setActiveTab] = useState(1)

  // 無資料時
  const [noBlogData, setNoBlogData] = useState(false)
  
  // 這邊記得幫我 set 一下草稿遊記無資料時換成圖片
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [noDraftData, setNoDraftData] = useState(false)
  useEffect(() => {
    if (blogData.Message === '已無我的收藏遊記') {
      setNoBlogData(true)
    }
  }, [])

  // 將行程及房間數量往 MemberLayout 傳
  const [countData, setCountData] = useState(memberCountData)
  useEffect(() => {
    setCountData(countData)
  }, [countData])

  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleteBlogGuid, setDeleteBlogGuid] = useState('')

  // 獲取更多資料
  const token = getCookie('auth')
  const user = getCookie('user')
    ? JSON.parse(String(getCookie('user')))
    : undefined
  const [moreBlogData, setMoreBlogData] = useState(blogData.BlogData)
  const [page, setPage] = useState(2)
  const [isLoading, setIsLoading] = useState(false)
  const [toTop, setToTop] = useState(false)

  const [no, setNo] = useState(false)

  // =========Modal State=========
  const [modal, setModal] = useState(false)

  const getMoreBlogData = async (page: number) => {
    const res = await fetch(
      `https://travelmaker.rocket-coding.com/api/users/tours/${page}`,
      {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const newBlogs = await res.json()

    if (newBlogs.BlogData) {
      setMoreBlogData((prevBlogs) => [...prevBlogs, ...newBlogs.BlogData])
      setPage((prevPage) => prevPage + 1)
      setIsLoading(true)
    }

    if (newBlogs.Message === '已無我的行程') {
      setIsLoading(false)
      setNoBlogData(true)
    }

    if (!newBlogs) {
      setNo(!no)
      return
    }
  }

  useEffect(() => {
    function handleScroll() {
      const body = document.body
      const html = document.documentElement
      const documentHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      )
      if (window.innerHeight + window.pageYOffset >= documentHeight) {
        getMoreBlogData(page)
      }

      if (window.pageYOffset > 1000) {
        setToTop(true)
      } else {
        setToTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [moreBlogData])

  console.log(moreBlogData)

  return (
    <>
      <Head>
        <title>Travel Maker | 收藏遊記&草稿</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Group 340.png" />
      </Head>
      {/* 刪除草稿遊記(待完成) */}
      <CustomModal modal={deleteConfirm} setModal={setDeleteConfirm} wrapper>
        <div className="w-[552px] pt-8 p-7 bg-white rounded-xl">
          <div className="flex items-center space-x-2 mb-5">
            <BsExclamationCircle className="text-[32px] text-highlight" />
            <h4 className="text-xl">確定要刪除嗎？</h4>
          </div>
          <hr />
          <span className="p-8 block">刪除後將無法復原，是否確認刪除?</span>
          <div className="flex justify-end space-x-9">
            <button
              className="border border-primary text-primary text-xl px-9 py-3 font-bold rounded-md hover:border-primary-tint hover:text-primary-tint hover:duration-500"
              onClick={() => {
                setDeleteConfirm(!deleteConfirm)
              }}
            >
              取消
            </button>
            <button
              className="bg-primary border border-transparent text-white text-xl px-9 py-3 font-bold rounded-md hover:bg-primary-tint hover:duration-500"
              onClick={async () => {
                try {
                  const myHeaders = new Headers()
                  if (token !== undefined) {
                    myHeaders.append('Authorization', String(token))
                  }
                  const requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                  }

                  const res = await fetch(
                    `https://travelmaker.rocket-coding.com/api/blogs/remove/${deleteBlogGuid}`,
                    requestOptions
                  )

                  if (res.ok) {
                    alert('成功刪除')
                  } else {
                    throw new Error()
                  }
                } catch (err) {
                  alert('網路連線異常')
                } finally {
                  setDeleteConfirm(false)
                }
              }}
            >
              刪除
            </button>
          </div>
        </div>
      </CustomModal>
      <div>
        {/* 景點加入房間 Modal */}
        <CustomModal
          modal={modal}
          setModal={setModal}
          wrapper
          onConfirm={() => {
            setModal(false)
          }}
        >
          <div className="w-[260px] min-h-[260px] p-7 bg-white rounded-xl ">
            {/* 標題 */}
            <h4 className="text-xl mb-2">選擇行程以撰寫遊記</h4>
            <hr />
            {/* 按鈕 */}
            <div className="flex flex-col space-y-3 mt-3 pr-3 h-[200px] overflow-y-auto">
              {(toursNameData.length ? toursNameData : []).map(
                ({ TourName, TourId }: toursNameDataProps, i) => {
                  //roomData
                  // const isActive = addTourTagStyle[item.RoomGuid]
                  return (
                    <button
                      className={`${
                        // item.IsExisted
                        false
                          ? 'bg-primary text-white'
                          : 'border-gray-A8 text-gray-A8'
                      } w-full block border px-2 py-1 rounded-xl `}
                      onClick={newDraftBlog(TourId)}
                      key={i}
                    >
                      {TourName}
                      {/* {item.RoomName} */}
                    </button>
                  )
                }
              )}
              {toursNameData.length === undefined ? (
                <p className="text-center text-gray-73 p-4">您必須先創建行程</p>
              ) : null}
            </div>
          </div>
        </CustomModal>
        {/* 手機版 */}
        <div className="container">
          <div className="md:hidden mt-8 mb-[100px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                我的遊記({memberCountData.BlogCounts})
              </h2>
              <button
                className="border border-gray-73 px-4 py-2 rounded-md text-gray-73"
                onClick={() => {
                  setModal(true)
                }}
              >
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
                  收藏遊記({moreBlogData ? `${blogData.CollectCounts}` : '0'})
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
                  草稿遊記({moreBlogData ? `${blogData.DraftCounts}` : '0'})
                </button>
              </div>
              {/* tab 內容 */}
              {activeTab === 1 && (
                <div className="flex flex-col space-y-6">
                  {noBlogData ? (
                    <Image
                      width={394}
                      height={437}
                      alt="圖片"
                      src={'/no-data.png'}
                      className="mx-auto pt-[80px]"
                    />
                  ) : (
                    blogData?.BlogData?.map((item) => {
                      console.log(item.Cover)

                      return (
                        <div key={item.BlogGuid}>
                          <BlogCard
                            id={item.BlogGuid}
                            showCollect={true}
                            blogName={item.Title}
                            poster={item.UserName}
                            time={item.InitDate}
                            type={item.Category}
                            blogImage={item.Cover}
                            userImage={item.ProfilePicture}
                            view={item.Sees}
                            like={item.Likes}
                            comment={item.Comments}
                          />
                        </div>
                      )
                    })
                  )}
                </div>
              )}
              {activeTab === 2 && (
                <div className="flex flex-col space-y-10">
                  {draftBlogData?.BlogData?.map(
                    (blog: draftBlogProp, index: number) => {
                      return (
                        <BlogDraftCard
                          key={index}
                          showDelete={false}
                          blogCover={blog.Cover}
                          blogName={blog.Title}
                          poster={user.UserName}
                          userProfilePicture={user.ProfilePicture}
                          time={blog.InitDate}
                          blogGuid={blog.BlogGuid}
                          setDeleteConfirm={setDeleteConfirm}
                          setDeleteBlogGuid={setDeleteBlogGuid}
                        />
                      )
                    }
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* 電腦版 */}
        {/* 無行程提醒 */}
        {/* <CustomModal modal={noBlogData} setModal={setNoBlogData} wrapper>
          <div className="w-[300px] p-7 bg-white rounded-xl">
            <div className="flex flex-col items-center space-y-4">
              <BsXCircle className="text-5xl text-highlight" />
              <span className="text-2xl">已無行程</span>
            </div>
          </div>
        </CustomModal> */}

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
                <button
                  className="md:border md:border-gray-73 md:px-4 md:py-2 md:rounded-md md:text-gray-73"
                  onClick={() => {
                    setModal(true)
                  }}
                >
                  新增遊記
                </button>
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
                  收藏遊記({moreBlogData ? `${blogData.CollectCounts}` : '0'})
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
                  草稿遊記({moreBlogData ? `${blogData.DraftCounts}` : '0'})
                </button>
              </div>
              {/* tab 內容 */}
              {activeTab === 1 && (
                <div className="flex flex-wrap justify-center -my-3 mb-16 lg:-mx-3">
                  {noBlogData ? (
                    <Image
                      width={394}
                      height={437}
                      alt="圖片"
                      src={'/no-data.png'}
                      className="mx-auto pt-[80px]"
                    />
                  ) : (
                    moreBlogData?.map((item) => {
                      return (
                        <div
                          key={item.BlogGuid}
                          className="w-full py-3 lg:w-1/2 lg:px-3 cursor-pointer"
                        >
                          <BlogCard
                            id={item.BlogGuid}
                            showCollect={true}
                            blogName={item.Title}
                            poster={item.UserName}
                            time={item.InitDate}
                            type={item.Category}
                            blogImage={item.Cover?.toString() ?? ''}
                            userImage={item.ProfilePicture?.toString() ?? ''}
                            view={item.Sees}
                            like={item.Likes}
                            comment={item.Comments}
                          />
                        </div>
                      )
                    })
                  )}
                  {/* GoToTop */}
                  {toTop && (
                    <button
                      type="button"
                      className="fixed bottom-5 right-5 text-primary-dark w-[60px] h-[60px] rounded-full shadow-[1px_1px_15px_1px_rgba(0,0,0,0.16)] hover:bg-primary-dark hover:duration-500 hover:text-white hover:-translate-y-2"
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth',
                        })
                      }}
                    >
                      <MdKeyboardArrowUp className="text-3xl mx-auto" />
                    </button>
                  )}
                </div>
              )}
              {activeTab === 2 && (
                <div className="flex flex-wrap justify-center -my-3 mb-16 lg:-mx-3">
                  {draftBlogData?.BlogData?.map(
                    (blog: draftBlogProp, index: number) => {
                      return (
                        <div
                          key={index}
                          className="w-full py-3 lg:w-1/2 lg:px-3"
                        >
                          <BlogDraftCard
                            showDelete={false}
                            blogCover={blog.Cover}
                            blogName={blog.Title}
                            poster={user.UserName}
                            time={blog.InitDate}
                            userProfilePicture={user.ProfilePicture}
                            blogGuid={blog.BlogGuid}
                            setDeleteConfirm={setDeleteConfirm}
                            setDeleteBlogGuid={setDeleteBlogGuid}
                          />
                        </div>
                      )
                    }
                  )}
                </div>
              )}
              {isLoading && <p className="text-lg text-center">loading...</p>}
            </div>
          </div>
        </MemberLayout>
      </div>
    </>
  )

  function newDraftBlog(
    TourId: number
  ): React.MouseEventHandler<HTMLButtonElement> | undefined {
    return async () => {
      try {
        const res = await postNewDraftBlogApi(TourId, token)
        const { BlogGuid } = await res.json()
        router.push(`/blog/post-blog/${BlogGuid}`)
      } finally {
        setModal(false)
      }
    }
  }
}
