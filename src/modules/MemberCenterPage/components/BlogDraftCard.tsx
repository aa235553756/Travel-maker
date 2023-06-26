import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DeleteBtn from '@/common/components/button/DeleteBtn'

export default function BlogDraftCard({
  showDelete,
  blogName,
  poster,
  time,
  userProfilePicture,
  blogCover,
  blogGuid,
  setDeleteConfirm,
  setDeleteBlogGuid,
}: {
  showDelete: boolean
  blogName: string
  poster: string
  time: string
  userProfilePicture: string
  blogCover: string
  blogGuid: string
  setDeleteConfirm: React.Dispatch<boolean>
  setDeleteBlogGuid: React.Dispatch<string>
}) {
  return (
    <div className="border border-gray-E7 shadow-[1px_1px_15px_1px_rgba(0,0,0,0.08)] rounded-md relative">
      {/* 刪除遊記 */}
      <div className="absolute top-5 right-5 flex space-x-2 z-30">
        {showDelete && (
          <DeleteBtn
            onClick={() => {
              setDeleteConfirm(true)
              setDeleteBlogGuid(blogGuid)
            }}
          />
        )}
      </div>
      <Link href={`/blog/post-blog/${blogGuid}`}>
        {/* 遊記圖片 */}
        <div className="relative w-full">
          <div className="absolute top-0 left-0 w-full h-[60px] bg-gradient-to-b  from-[rgba(15,11,11,1)] to-[rgba(2,0,0,0)] rounded-md"></div>
          {blogCover ? (
            <Image
              src={blogCover}
              alt="圖片"
              width={328}
              height={260}
              className="w-full h-[260px] max-h-[260px] rounded-t-md  border-b "
            ></Image>
          ) : (
            <Image
              src={'/blurLogo.png'}
              alt="圖片"
              width={328}
              height={260}
              className="w-full h-[260px] max-h-[260px] rounded-t-md object-contain border-b "
            ></Image>
          )}
        </div>
        {/* 遊記資訊 */}
        <div className="px-4 py-3 md:py-6 flex flex-col space-y-2 md:space-y-3">
          <p className="text-lg">{blogName}</p>
          <div className="flex items-center space-x-3">
            <div className="flex item-center space-x-2">
              <Image
                src={
                  userProfilePicture !== ''
                    ? userProfilePicture
                    : '/userDefault.png'
                }
                alt="圖片"
                width={20}
                height={20}
                className="rounded-full"
              ></Image>
              <span className="text-sm text-[rgba(0,0,0,0.45)]">{poster}</span>
            </div>
            <span className="text-sm text-gray-D9">{time}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
