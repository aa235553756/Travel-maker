import React, { useState } from 'react'
import Image from 'next/image'
import EditBtn from '@/common/components/button/EditBtn'
import DeleteBtn from '@/common/components/button/DeleteBtn'
import MoreBtn from '@/common/components/button/MoreBtn'

export default function PostComment({
  user,
  comment,
}: {
  user: string
  comment: string
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
        <div className="bg-[#d7d7d7] rounded-md px-5 py-4 w-full relative">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              {/* 頭貼 */}
              <Image
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
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
                    className="font-bold cursor-pointer"
                    onClick={() => {
                      replyState(true)
                    }}
                  >
                    回覆
                  </a>
                </div>
                <p>2023.03.11</p>
              </div>
            </div>

            {/* 編輯 & 刪除 */}
            <div className="hidden md:flex md:space-x-2">
              <EditBtn
                onClick={() => {
                  replyState(true)
                }}
              />
              <DeleteBtn
                onClick={() => {
                  alert('確定要刪除，刪除後將無法復原?')
                }}
              />
            </div>
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
          <div className="pl-[48px] mb-3">{comment}</div>

          {/* 回覆 */}
          <div className="flex items-center space-x-2 pl-12">
            <Image
              src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
              alt="圖片"
              width={40}
              height={40}
              className="rounded-full min-h-[40px]"
            ></Image>
            <div className="flex flex-col text-sm">
              <div className="flex space-x-5">
                <span>老頭阿迪</span>
                <span>三天前</span>
              </div>
              <p>感謝留言，歡迎追蹤。</p>
            </div>
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
