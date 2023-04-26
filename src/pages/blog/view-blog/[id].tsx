import React, { ReactNode, useState } from 'react'
import Image from 'next/image'
import ViewAttr from '@/modules/BlogPage/components/ViewAttr'
import SocialMedia from '@/common/components/SocialMedia'
import TypeTag from '@/common/components/TypeTag'
import PostComment from '@/modules/BlogPage/components/PostComment'
import { BsBookmarkCheck, BsBookmarkX, BsGeoAltFill } from 'react-icons/bs'
import { getCookie } from 'cookies-next'
import CollectBtn from '@/common/components/button/CollectBtn'
import ShareBtn from '@/common/components/button/ShareBtn'
import { CustomModal } from '@/common/components/CustomModal'

interface paramsProp {
  id: number
}

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
}

interface BlogCommentDataProps {
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

export async function getServerSideProps({ params }: { params: paramsProp }) {
  const { id } = params

  // 【API】取得單一遊記資訊
  const resViewBlogData = await fetch(
    `https://travelmaker.rocket-coding.com/api/blogs/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const viewBlogData = await resViewBlogData.json()

  // 【API】取得更多遊記評論
  const resBlogCommentData = await fetch(
    `https://travelmaker.rocket-coding.com/api/blogs/${id}/comments/1`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
  blogCommentData: BlogCommentDataProps
}) {
  const token = getCookie('auth')

  // 收藏 & 取消收藏遊記
  const handleCollectBlog = async (BlogGuid: string) => {
    if (!token) {
      alert('請先登入，自動跳轉中...')
      return
    }
    if (!viewBlogData.IsCollect) {
      //【API】收藏遊記
      const resCollectBlogData = await fetch(
        `https://travelmaker.rocket-coding.com/api/blogs/${BlogGuid}/collect`,
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
        `https://travelmaker.rocket-coding.com/api/blogs/${BlogGuid}/collect`,
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

  return (
    <>
      {/* 圖片 */}
      <div className="relative w-full mx-auto md:w-full lg:mt-7 lg:w-2/3 lg:rounded-md">
        <div className="w-full absolute top-0 left-0 h-[60px] bg-gradient-to-b from-[rgba(15,11,11,1)] to-[rgba(2,0,0,0)] lg:rounded-t-md z-20"></div>
        <div className="w-full h-full bg-black mb-8 lg:rounded-md">
          <Image
            src={viewBlogData.Cover}
            alt="圖片"
            width={744}
            height={372}
            className="w-full h-[300px] md:h-[372px] md:min-h-[372px] mx-auto relative object-contain lg:rounded-md"
          ></Image>
        </div>
        {/* 收藏 &　分享遊記 */}
        <div className="absolute top-5 right-5 space-x-4 z-30">
          <CollectBtn
            showCollect={viewBlogData.IsCollect}
            onClick1={() => {
              handleCollectBlog(viewBlogData.BlogGuid)
            }}
          />
          <ShareBtn />
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
                    view={viewBlogData.Sees}
                    like={viewBlogData.Likes}
                    comment={viewBlogData.CommentCounts}
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
              <div className="flex items-center space-x-4 mb-20">
                <Image
                  src={viewBlogData.ProfilePicture}
                  alt="圖片"
                  width={40}
                  height={40}
                  className="rounded-full min-h-[40px]"
                ></Image>
                <input
                  type="text"
                  placeholder="請留言"
                  className="border px-3 py-4 grow rounded-md"
                />
                <button className="px-2 py-4 border rounded-md bg-primary text-white md:px-5">
                  發布
                </button>
              </div>
            </div>

            {Array.isArray(blogCommentData) && <hr className="mb-10" />}

            {/* 其他留言 */}
            <div className="lg:w-3/4 lg:mx-auto">
              <div>
                {Array.isArray(blogCommentData) && (
                  <h2 className="text-lg mb-7 font-bold">
                    其他留言({blogCommentData.length})
                  </h2>
                )}
                <div className="flex-col space-y-9">
                  {Array.isArray(blogCommentData) &&
                    blogCommentData.map((item) => {
                      return (
                        <PostComment
                          key={item.BlogCommentId}
                          user={item.UserName}
                          userImageUrl={item.ProfilePicture}
                          userComment={item.Comment}
                          userTime={item.InitDate}
                          isMyComment={item.IsMyComment}
                          replyAry={item.Replies}
                        />
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </>
  )
}
