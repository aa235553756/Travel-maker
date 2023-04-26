import React, { useState } from 'react'
import Image from 'next/image'
import EditBtn from '@/common/components/button/EditBtn'
import DeleteBtn from '@/common/components/button/DeleteBtn'
import MoreBtn from '@/common/components/button/MoreBtn'

interface replyAryProps {
  IsMyComment: boolean
  BlogReplyId: number
  UserGuid: string
  UserName: string
  InitDate: string
  ProfilePicture: string
  Reply: string
}

export default function PostComment({
  user,
  userImageUrl,
  userComment,
  userTime,
  isMyComment,
  replyAry,
}: {
  user: string
  userImageUrl: string
  userComment: string
  userTime: string
  isMyComment: boolean
  replyAry: replyAryProps[]
}) {
  // 回覆
  const [isReply, setIsReply] = useState(false)
  const replyState = (status: boolean) => {
    setIsReply(status)
  }

  // 更多按鈕
  const [showMore, setShowMore] = useState(false)
  const showState = (show: boolean) => {
    setShowMore(show)
  }

  return (
    <div>
      <div className="flex flex-col space-y-6">
        <div className="shadow-[1px_1px_15px_0px_rgba(0,0,0,0.08)] rounded-md px-5 py-4 w-full relative">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              {/* 頭貼 */}
              <Image
                src={userImageUrl}
                alt="圖片"
                width={40}
                height={40}
                className="rounded-full min-h-[40px]"
              ></Image>

              {/* 使用者回覆 */}
              <div className="flex flex-col text-sm">
                <div className="flex space-x-5">
                  <p>{user}</p>
                  <a
                    className="font-bold cursor-pointer text-gray-73"
                    onClick={() => {
                      replyState(true)
                    }}
                  >
                    回覆
                  </a>
                </div>
                <p className="text-gray-A8">{userTime}</p>
              </div>
            </div>

            {/* 編輯 & 刪除 */}
            {isMyComment && (
              <div className="hidden md:flex md:space-x-5">
                <div className="border border-primary rounded-full">
                  <EditBtn
                    onClick={() => {
                      replyState(true)
                    }}
                  />
                </div>
                <div className="border border-primary rounded-full">
                  <DeleteBtn
                    onClick={() => {
                      alert('確定要刪除，刪除後將無法復原?')
                    }}
                  />
                </div>
              </div>
            )}

            <div className="md:hidden">
              <MoreBtn
                onClick={() => {
                  showState(true)
                }}
              />
            </div>

            {/* 按更多顯示編輯&刪除 */}
            {showMore && (
              <div className="w-[100px] bg-[#ccc] rounded-md shadow-md py-2 absolute top-[56px] right-5">
                <button
                  type="button"
                  className="w-full block mx-auto py-1 hover:bg-[#d7d7d7]"
                  onClick={() => {
                    replyState(true)
                    showState(false)
                  }}
                >
                  編輯
                </button>
                <button
                  type="button"
                  className="w-full block mx-auto py-1 hover:bg-[#d7d7d7]"
                  onClick={() => {
                    alert('確定要刪除，刪除後將無法復原?')
                    showState(false)
                  }}
                >
                  刪除
                </button>
              </div>
            )}
          </div>

          {/* 留言 */}
          <div className="pl-[48px] mb-9">{userComment}</div>

          {/* 回覆 */}
          <div className="flex-col space-y-5">
            {' '}
            {replyAry.map((item) => {
              return (
                <div
                  className="flex items-center space-x-2 pl-12"
                  key={item.BlogReplyId}
                >
                  <Image
                    src={item.ProfilePicture}
                    alt="圖片"
                    width={40}
                    height={40}
                    className="rounded-full min-h-[40px]"
                  ></Image>
                  <div className="flex flex-col text-sm">
                    <div className="flex space-x-5">
                      <span>{item.UserName}</span>
                      <span className="text-gray-A8">{item.InitDate}</span>
                    </div>
                    <p>{item.Reply}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* 回覆留言 input */}
          {isReply && (
            <div className="flex items-center space-x-4 mt-6">
              <input type="text" className="border p-2 grow rounded-md" />
              <button className="p-2 border rounded-md md:px-5">送出</button>
              <button
                className="p-2 border rounded-md md:px-5"
                onClick={() => {
                  replyState(false)
                }}
              >
                取消
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
