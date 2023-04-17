import React, { useState } from 'react'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import EditBtn from '@/common/components/button/EditBtn'
import DeleteBtn from '@/common/components/button/DeleteBtn'
import MoreBtn from '@/common/components/button/MoreBtn'
import CustomStar from '@/common/components/CustomStar'

export default function CommentCard({
  id,
  user,
  attraction,
  comment,
  time,
  star,
  onClick,
}: {
  id: number
  user: string | undefined
  attraction: string
  comment: string
  time: string
  star: number
  onClick?: () => void
}) {
  // 切換編輯狀態 css
  const [isEditComment, setIsEditComment] = useState(false)

  // 修改 textarea value
  const [commentValue, setCommentValue] = useState(`${comment}`)

  // 修改景點星等
  // const [starValue, setStarValue] = useState(`${star}`)

  const token = getCookie('auth')

  // 【API】取得我的景點評論
  fetch(`https://travelmaker.rocket-coding.com/api/users/comments/1`, {
    method: 'GET',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
  })

  // 【API】編輯評論
  const resEditCommentData = async () => {
    const response = await fetch(
      `https://travelmaker.rocket-coding.com/api/attractions/comments/edit`,
      {
        method: 'PUT',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          AttractionCommentId: id,
          Comment: commentValue,
          Score: star,
        }),
      }
    )
    const data = await response.json()
    console.log(data)
  }

  return (
    <div className="shadow-[1px_1px_15px_1px_rgba(1,1,15,0.08)] rounded-md p-5 w-full md:p-10">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-3">
          <Image
            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
            alt="圖片"
            width={52}
            height={52}
            className="rounded-full min-h-[52px]"
          ></Image>
          {/* 手機版 */}
          <div className="flex flex-col lg:hidden">
            <span className="text-sm text-[#737373]">{user}</span>
            <div className="flex items-center space-x-3">
              <p className="font-bold">{attraction}</p>
            </div>
          </div>
          {/* 電腦版 */}
          <div className="hidden lg:flex lg:flex-col">
            <span className="text-sm">{user}</span>
            <div className="flex items-center space-x-3">
              <p>{attraction}</p>
              {/* 編輯時，取消星等顯示 */}
              {isEditComment ? null : (
                <div className="leading-3">
                  <CustomStar rating={star} />
                </div>
              )}
              <p className="text-gray-A8">{time}</p>
            </div>
          </div>
        </div>
        {/* 點擊編輯，進入編輯狀態，編輯及刪除按鈕隱藏 */}
        {isEditComment ? null : (
          <div className="hidden lg:flex lg:space-x-5">
            <div className="border border-primary rounded-full hover:bg-primary-tint hover:duration-500">
              <EditBtn
                onClick={() => {
                  setIsEditComment(!isEditComment)
                }}
              />
            </div>

            <div className="border border-primary rounded-full hover:bg-primary-tint hover:duration-500">
              <DeleteBtn onClick={onClick} />
            </div>
          </div>
        )}
        <div className="lg:hidden">
          <MoreBtn></MoreBtn>
        </div>
      </div>
      <div className="pl-[64px]">
        <div className="flex space-x-3 mb-2 lg:hidden">
          {/* 編輯時，取消星等顯示 */}
          {isEditComment ? null : (
            <div className="leading-3">
              <CustomStar rating={star} />
            </div>
          )}
          <p className="text-gray-A8">{time}</p>
        </div>
        {/* 點擊編輯，進入編輯狀態，出現評價星等.textArea及儲存按鈕 */}
        {isEditComment ? (
          <div>
            <CustomStar rating={star} clickable={true} starDimension={'30px'} />

            <textarea
              id="story"
              name="story"
              rows="10"
              cols="70"
              className="input-style resize-none w-full mt-2"
              value={commentValue}
              onChange={(e) => {
                setCommentValue(e.target.value)
              }}
            ></textarea>
            <button
              className="bg-primary text-white block w-full py-3 rounded-md mt-2 hover:bg-primary-tint hover:duration-500"
              onClick={() => {
                setIsEditComment(!isEditComment)
                resEditCommentData()
              }}
            >
              儲存
            </button>
          </div>
        ) : (
          <div className="w-full">{commentValue}</div>
        )}
      </div>
    </div>
  )
}
