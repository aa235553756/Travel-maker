import React, { ReactNode, useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import ViewAttr from '@/modules/BlogPage/components/ViewAttr'
import SocialMedia from '@/common/components/SocialMedia'
import TypeTag from '@/common/components/TypeTag'
import PostComment from '@/modules/BlogPage/components/PostComment'
import {
  BsBookmarkCheck,
  BsBookmarkX,
  BsExclamationCircle,
  BsGeoAltFill,
} from 'react-icons/bs'
import { getCookie } from 'cookies-next'
import CollectBtn from '@/common/components/button/CollectBtn'
import ShareBtn from '@/common/components/button/ShareBtn'
import { CustomModal } from '@/common/components/CustomModal'
import Head from 'next/head'
import router from 'next/router'

interface AttractionDataProps {
  AttractionId: number
  AttractionName: string
  Description: string
  ImageUrl: string[]
}

interface ViewBlogDataProps {
  IsCollect: boolean
  BlogGuid: string
  Cover: string
  Title: string
  Category: string[]
  CityAndDistricts: string
  UserGuid: string
  UserName: string
  ProfilePicture: string
  InitDate: string
  Sees: number
  Likes: number
  CommentCounts: number
  AttractionData: AttractionDataProps[]
  Comments: string[]
  IsLike: boolean
}

interface BlogCommentDataProps {
  Message: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter(arg0: (item: any) => boolean): unknown
  length: ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map(arg0: (item: any) => JSX.Element): React.ReactNode
  IsMyComment: boolean
  BlogCommentId: number
  UserGuid: string
  UserName: string
  InitDate: string
  ProfilePicture: string
  Comment: string
  Replies: BlogReply[]
}

interface BlogReply {
  IsMyComment: boolean
  BlogReplyId: number
  UserGuid: string
  UserName: string
  InitDate: string
  ProfilePicture: string
  Reply: string
}

export async function getServerSideProps({
  params,
  req,
  res,
}: {
  params: { id: string }
  req: undefined
  res: undefined
}) {
  const { id } = params
  const token = getCookie('auth', { res, req })

  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `${token}`
  }

  // 【API】取得單一遊記資訊
  const resViewBlogData = await fetch(
    `${process.env.NEXT_PUBLIC_baseUrl}/blogs/${id}`,
    {
      headers,
    }
  )
  const viewBlogData = await resViewBlogData.json()

  // 【API】取得更多遊記評論
  const resBlogCommentData = await fetch(
    `${process.env.NEXT_PUBLIC_baseUrl}/blogs/${id}/comments/1`,
    {
      headers,
    }
  )
  const blogCommentData = await resBlogCommentData.json()

  if (blogCommentData === '尚無評論') {
    return
  }

  return {
    props: {
      viewBlogData,
      blogCommentData,
    },
  }
}

export default function PostBlog({
  viewBlogData,
  blogCommentData,
}: {
  viewBlogData: ViewBlogDataProps
  blogCommentData: BlogCommentDataProps[]
}) {
  // 判斷有無取得 cookie
  const token = getCookie('auth')
  const user = getCookie('user') ? JSON.parse(String(getCookie('user'))) : null

  // 取得會員頭貼
  const [picture, setPicture] = useState('')
  useEffect(() => setPicture(user?.ProfilePicture), [user])

  // 收藏 & 取消收藏遊記
  const [loginConfirm, setLoginConfirm] = useState(false)
  const handleCollectBlog = async (BlogGuid: string) => {
    if (!token) {
      setLoginConfirm(true)
      //請先登入
      setTimeout(() => {
        router.push('/login')
      }, 2000)
      return
    }
    if (!viewBlogData.IsCollect) {
      //【API】收藏遊記
      const resCollectBlogData = await fetch(
        `${process.env.NEXT_PUBLIC_baseUrl}/blogs/${BlogGuid}/collect`,
        {
          method: 'POST',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      const collectBlogData = await resCollectBlogData.json()

      if (resCollectBlogData.ok) {
        viewBlogData.IsCollect = true
        setBlogCollectSuccess(!blogCollectSuccess)
      }
      if (!collectBlogData) {
        return
      }
    } else if (viewBlogData.IsCollect) {
      //【API】取消收藏遊記
      const resCancelCollectBlogData = await fetch(
        `${process.env.NEXT_PUBLIC_baseUrl}/blogs/${BlogGuid}/collect`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      const cancelCollectBlogData = await resCancelCollectBlogData.json()

      if (resCancelCollectBlogData.ok) {
        viewBlogData.IsCollect = false
        setBlogCollectCancel(!blogCollectCancel)
      }

      if (!cancelCollectBlogData) {
        return
      }
    }
  }

  // 收藏彈窗
  const [blogCollectSuccess, setBlogCollectSuccess] = useState(false)
  const [blogCollectCancel, setBlogCollectCancel] = useState(false)

  // 留言
  const addCommentRef = useRef<HTMLInputElement>(null)
  const [comment, setComment] =
    useState<BlogCommentDataProps[]>(blogCommentData)

  // 新增留言
  const [addCommentFail, setAddCommentFail] = useState(false)
  const [typeConfirmText, setTypeConfirmText] = useState('')
  const handleAddComment = async () => {
    try {
      //【API】新增留言
      const resAddCommentData = await fetch(
        `${process.env.NEXT_PUBLIC_baseUrl}/blogs/comments/add`,
        {
          method: 'POST',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            BlogGuid: viewBlogData.BlogGuid,
            Comment: addCommentRef.current?.value,
          }),
        }
      )
      const addCommentData = await resAddCommentData.json()

      if (resAddCommentData.ok) {
        if (addCommentRef.current?.value) {
          addCommentRef.current.value = ''
        }
        // setComment((prevComments) => [...(prevComments), addCommentData])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setComment((prevComments: any) => {
          if (prevComments.Message === '尚無評論') {
            return [addCommentData]
          } else if (Array.isArray(prevComments)) {
            return [...prevComments, addCommentData]
          } else {
            return prevComments
          }
        })
      }

      if (!resAddCommentData.ok) {
        setTypeConfirmText(addCommentData.Message)
        setAddCommentFail(true)
        return
      }
      throw new Error('不知名錯誤')
    } catch (error) {}
  }

  // 刪除留言
  const [deleteCommentConfirm, setDeleteCommentConfirm] = useState(false)
  const [blogCommentIdToDelete, setBlogCommentIdToDelete] = useState<
    number | null
  >(null)
  const [delCommentFail, setDelCommentFail] = useState(false)
  const handleDelComment = async (blogCommentId: number) => {
    try {
      //【API】刪除留言
      const resDelCommentData = await fetch(
        `${process.env.NEXT_PUBLIC_baseUrl}/blogs/comments/${blogCommentId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      const delCommentData = await resDelCommentData.json()

      if (resDelCommentData.ok) {
        const updatedComments = comment.filter(
          (item) => item.BlogCommentId !== blogCommentId
        )
        setComment(updatedComments)
      }

      if (!resDelCommentData.ok) {
        setTypeConfirmText(delCommentData.Message)
        setDelCommentFail(true)
        return
      }

      throw new Error('不知名錯誤')
    } catch (error) {}
  }

  // 複製連結
  const [isCopied, setIsCopied] = useState(false)
  const handleCopyLink = () => {
    const currentURL = window.location.href
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 1000)
      })
      .catch((error) => {
        console.error('Failed to copy link: ', error)
      })
  }

  return (
    <>
      <Head>
        <title>Travel Maker | 遊記</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Group 340.png" />
      </Head>

      {/* 圖片 */}
      <div className="relative w-full mx-auto md:w-full lg:mt-7 lg:w-2/3 lg:rounded-md">
        <div className="w-full absolute top-0 left-0 h-[60px] bg-gradient-to-b from-[rgba(15,11,11,1)] to-[rgba(2,0,0,0)] lg:rounded-t-md z-20"></div>
        <div className="w-full h-full bg-black mb-8 lg:rounded-md">
          <Image
            src={viewBlogData.Cover}
            alt="圖片"
            width={744}
            height={372}
            className="w-full h-[300px] md:h-[372px] md:min-h-[372px] mx-auto relative object-cover lg:rounded-md"
          ></Image>
        </div>
        {/* 收藏 &　分享遊記 */}
        <div className="absolute top-5 right-5 space-x-4 z-20">
          <CollectBtn
            showCollect={viewBlogData.IsCollect}
            onClick1={() => {
              handleCollectBlog(viewBlogData.BlogGuid)
            }}
          />
          <ShareBtn
            onClick={() => {
              handleCopyLink()
            }}
          />

          {isCopied && (
            <div className="text-white animate-fade-in-out">Copied!</div>
          )}
        </div>
      </div>

      <div className="container">
        <div className="md:pt-7 pb-[100px] lg:mb-[160px]">
          <div className="w-full mx-auto lg:w-2/3">
            {/* 用戶 */}
            <div className="lg:w-3/4 lg:mx-auto">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="flex item-center space-x-5 mb-4 md:mb-7">
                  <Image
                    src={viewBlogData.ProfilePicture}
                    alt="圖片"
                    width={60}
                    height={60}
                    className="rounded-full min-h-[60px]"
                  ></Image>

                  <div className="flex flex-col space-y-2">
                    <span className="text-lg">{viewBlogData.UserName}</span>
                    <span className="text-gray-D9">
                      {viewBlogData.InitDate}
                    </span>
                  </div>
                </div>
                <div className="pl-20 mb-7 md:pl-0 md:mb-0">
                  <SocialMedia
                    id={viewBlogData.BlogGuid}
                    view={viewBlogData.Sees}
                    like={viewBlogData.Likes}
                    comment={viewBlogData.CommentCounts}
                    isLiked={viewBlogData.IsLike}
                  />
                </div>
              </div>
            </div>

            <hr className="mb-8" />

            {/* 遊記資訊 */}
            <div className="lg:w-3/4 lg:mx-auto">
              <div className="flex flex-col space-y-4 mb-[72px]">
                <h2 className="text-lg font-bold">{viewBlogData.Title}</h2>
                <div className="flex items-center space-x-2">
                  <BsGeoAltFill className="text-primary" />
                  <span className="text-gray-73">
                    {viewBlogData.CityAndDistricts}
                  </span>
                </div>
                <div className="flex space-x-3">
                  {viewBlogData.Category.map((item, index) => {
                    return (
                      <div key={index}>
                        <TypeTag type={item}></TypeTag>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* 景點資訊 */}
            <div className="lg:w-3/4 lg:mx-auto">
              <div className="flex flex-col space-y-10 mb-[60px]">
                {viewBlogData?.AttractionData?.map((item) => {
                  return (
                    <div key={item.AttractionId}>
                      <ViewAttr
                        attractName={item.AttractionName}
                        content={item.Description}
                        imageUrl={item.ImageUrl}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 留言 */}
            <div className="lg:w-3/4 lg:mx-auto">
              <h2 className="text-lg mb-7 font-bold">留言</h2>
              <div className="flex items-center space-x-4 mb-20 w-full">
                <Image
                  src={picture ? picture : '/userDefault.png'}
                  alt="圖片"
                  width={40}
                  height={40}
                  className="rounded-full min-h-[40px]"
                ></Image>
                <input
                  type="text"
                  placeholder="請留言"
                  className="border px-3 py-4 rounded-md flex-1 w-full"
                  ref={addCommentRef}
                />
                <button
                  className="px-2 py-4 border rounded-md bg-primary text-white md:px-5 hover:bg-primary-tint hover:duration-300"
                  onClick={() => {
                    handleAddComment()
                  }}
                >
                  發布
                </button>
              </div>
            </div>

            {comment.length >= 1 && <hr className="mb-10" />}

            {/* 其他留言 */}
            <div className="lg:w-3/4 lg:mx-auto">
              <div>
                {comment.length >= 1 && (
                  <h2 className="text-lg mb-7 font-bold">
                    其他留言({comment.length})
                  </h2>
                )}
                <div className="flex-col space-y-9">
                  {comment.length >= 0 &&
                    comment?.map((item) => {
                      return (
                        <PostComment
                          key={item.BlogCommentId}
                          blogCommentId={item.BlogCommentId}
                          user={item.UserName}
                          userImageUrl={item.ProfilePicture}
                          userComment={item.Comment}
                          userTime={item.InitDate}
                          isMyComment={item.IsMyComment}
                          replyAry={item.Replies}
                          handleDelComment={() => {
                            setDeleteCommentConfirm(true)
                            setBlogCommentIdToDelete(item.BlogCommentId)
                          }}
                        />
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 刪除留言 */}
      <CustomModal
        modal={deleteCommentConfirm}
        setModal={setDeleteCommentConfirm}
        wrapper
      >
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
                setDeleteCommentConfirm(!deleteCommentConfirm)
              }}
            >
              取消
            </button>
            <button
              className="bg-primary border border-transparent text-white text-xl px-9 py-3 font-bold rounded-md hover:bg-primary-tint hover:duration-500"
              onClick={() => {
                setDeleteCommentConfirm(false)
                if (blogCommentIdToDelete !== null) {
                  handleDelComment(blogCommentIdToDelete)
                }
              }}
            >
              刪除
            </button>
          </div>
        </div>
      </CustomModal>

      {/* 遊記收藏成功提醒 Modal */}
      <CustomModal
        modal={blogCollectSuccess}
        setModal={setBlogCollectSuccess}
        wrapper
      >
        <div className="w-[408px] h-[288px] bg-white flex flex-col justify-center items-center space-y-6 rounded-xl">
          <BsBookmarkCheck className="text-[64px] text-[#74c041]" />
          <p className="text-2xl">收藏遊記成功</p>
        </div>
      </CustomModal>

      {/* 遊記取消收藏提醒 Modal */}
      <CustomModal
        modal={blogCollectCancel}
        setModal={setBlogCollectCancel}
        wrapper
      >
        <div className="w-[408px] h-[288px] bg-white flex flex-col justify-center items-center space-y-6 rounded-xl">
          <BsBookmarkX className="text-[64px] text-highlight" />
          <p className="text-2xl">取消收藏遊記</p>
        </div>
      </CustomModal>

      {/* 收藏遊記未登入時 */}
      <CustomModal
        modal={loginConfirm}
        setModal={setLoginConfirm}
        typeConfirm
        typeConfirmWarnIcon
        overflowOpen
        typeConfirmText={'請先登入，自動跳轉中...'}
        onConfirm={() => {
          setLoginConfirm(false)
        }}
      />

      {/* 新增留言失敗 */}
      <CustomModal
        modal={addCommentFail}
        setModal={setAddCommentFail}
        typeConfirm
        typeConfirmWarnIcon
        overflowOpen
        typeConfirmText={typeConfirmText}
        onConfirm={() => {
          setAddCommentFail(false)
        }}
      />

      {/* 刪除留言失敗 */}
      <CustomModal
        modal={delCommentFail}
        setModal={setDelCommentFail}
        typeConfirm
        typeConfirmWarnIcon
        overflowOpen
        typeConfirmText={typeConfirmText}
        onConfirm={() => {
          setDelCommentFail(false)
        }}
      />
    </>
  )
}
