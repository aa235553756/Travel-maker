import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CollectBtn from '@/common/components/button/CollectBtn'
import SocialMedia from '@/common/components/SocialMedia'
import TypeTag from '@/common/components/TypeTag'
import DeleteBtn from '../button/DeleteBtn'
import { getCookie } from 'cookies-next'
import { CustomModal } from '../CustomModal'
import { BsExclamationCircle } from 'react-icons/bs'

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

// interface BlogsDataProps {
//   ProfilePicture: string
//   UserName: string
//   IsFollow: boolean
//   Blogs: number
//   Fans: number
//   Follows: number
//   BlogData: BlogDataProps[]
// }

export default function BlogCard({
  id,
  showCollect,
  draft,
  blogName,
  poster,
  time,
  type,
  blogImage,
  userImage,
  view,
  like,
  comment,
  onClick,
  blog,
  setBlog,
}: {
  id?: number | string
  showCollect?: boolean
  draft?: boolean
  blogName: string
  poster: string
  time: string
  type: string[]
  blogImage: string
  userImage: string
  view: number
  like: number
  comment: number
  onClick?: () => void
  blog: BlogDataProps[]
  setBlog: React.Dispatch<React.SetStateAction<BlogDataProps[]>>
}) {
  const router = useRouter()
  const token = getCookie('auth')
  const [typeConfirmText, setTypeConfirmText] = useState('')
  const [deleteBlogConfirm, setDeleteBlogConfirm] = useState(false)
  const [delBlogFail, setDelBlogFail] = useState(false)

  const handleDelBlog = async (id: number) => {
    try {
      // 【 API 】刪除遊記
      const resDelBlogData = await fetch(
        `https://travelmaker.rocket-coding.com/api/blogs/remove/${id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      const delBlogData = await resDelBlogData.json()

      if (resDelBlogData.ok) {
        const updatedBlogs = blog.filter((item) => item.BlogGuid !== String(id))
        // 使用斷言解決 setBlog 與 updatedBlogs 型別不同的問題
        // setBlog(updatedBlogs as BlogsDataProps[])
        setBlog(updatedBlogs)
      }
      if (!resDelBlogData.ok) {
        setTypeConfirmText(delBlogData.Message)
        setDelBlogFail(true)
        return
      }
      throw new Error('不知名錯誤')
    } catch (error) {}
  }

  return (
    <div>
      <div className="border border-gray-E7 shadow-[1px_1px_15px_1px_rgba(0,0,0,0.08)] rounded-md relative hover:opacity-80 hover:duration-500 hover:-translate-y-1">
        <a
          onClick={(e) => {
            e.preventDefault()
            router.push(`/blog/view-blog/${id}`)
          }}
          className="absolute w-full h-full z-10 cursor-pointer"
        ></a>
        {/* 收藏遊記 */}
        <div className="absolute top-10 right-10 flex space-x-2 z-30 md:top-5 md:right-5">
          {/* {showCollect && <CollectBtn showCollect={false} />} */}
          {!draft && (
            <CollectBtn onClick1={onClick} showCollect={showCollect} />
          )}
          {draft && (
            <DeleteBtn
              onClick={() => {
                setDeleteBlogConfirm(!deleteBlogConfirm)
              }}
            />
          )}
        </div>
        <Link href="../blog/view-blog/1">
          {/* 遊記圖片 */}
          <div className="relative w-full p-5 pb-0 md:p-4 md:pb-0">
            <div className="absolute top-5 left-5 w-[calc(100%-40px)] h-9 bg-gradient-to-b from-[rgba(15,11,11,1)] to-[rgba(2,0,0,0)] rounded-md md:top-4 md:left-4 md:w-[calc(100%-32px)] md:h-[45px]"></div>
            <Image
              src={blogImage}
              alt="圖片"
              width={328}
              height={260}
              className="w-full h-[260px] min-h-[260px] rounded-md  object-contain bg-black lg:object-none"
            ></Image>
          </div>
          {/* 遊記資訊 */}
          <div className="p-5 pt-4 flex flex-col space-y-3 md:p-4 md:pb-3">
            <p className="text-lg line-clamp-1">{blogName}</p>
            <div className="flex items-center space-x-3">
              <div className="flex item-center space-x-2">
                <Image
                  src={userImage}
                  alt="圖片"
                  width={20}
                  height={20}
                  className="rounded-full"
                ></Image>
                <span className="text-sm text-[rgba(0,0,0,0.45)]">
                  {poster}
                </span>
              </div>
              <span className="text-sm text-gray-D9">{time}</span>
            </div>
            <SocialMedia view={view} like={like} comment={comment} />
            <div className="!mt-4 flex space-x-3">
              {type?.slice(0, 3).map((item, index) => {
                return <TypeTag type={item} key={index} />
              })}
            </div>
          </div>
        </Link>
      </div>
      {/* 刪除留言 */}
      <CustomModal
        modal={deleteBlogConfirm}
        setModal={setDeleteBlogConfirm}
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
                setDeleteBlogConfirm(!deleteBlogConfirm)
              }}
            >
              取消
            </button>
            <button
              className="bg-primary border border-transparent text-white text-xl px-9 py-3 font-bold rounded-md hover:bg-primary-tint hover:duration-500"
              onClick={() => {
                setDeleteBlogConfirm(false)
                handleDelBlog(id as number)
              }}
            >
              刪除
            </button>
          </div>
        </div>
      </CustomModal>
      {/* 刪除部落格失敗 */}
      <CustomModal
        modal={delBlogFail}
        setModal={setDelBlogFail}
        typeConfirm
        typeConfirmWarnIcon
        overflowOpen
        typeConfirmText={typeConfirmText}
        onConfirm={() => {
          setDelBlogFail(false)
        }}
      />
    </div>
  )
}
