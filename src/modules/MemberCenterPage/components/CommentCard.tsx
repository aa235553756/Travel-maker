import React from 'react'
import Image from 'next/image'
import EditBtn from '@/common/components/button/EditBtn'
import DeleteBtn from '@/common/components/button/DeleteBtn'
import MoreBtn from '@/common/components/button/MoreBtn'
import CustomStar from '@/common/components/CustomStar'

export default function CommentCard({
  user,
  attraction,
  comment,
}: {
  user: string
  attraction: string
  comment: string
}) {
  return (
    <div className="border rounded-md px-5 py-4 w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-3">
          <Image
            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
            alt="圖片"
            width={40}
            height={40}
            className="rounded-full min-h-[40px]"
          ></Image>
          {/* 手機版 */}
          <div className="flex flex-col md:hidden">
            <span className="text-sm">{user}</span>
            <div className="flex items-center space-x-3">
              <p>{attraction}</p>
            </div>
          </div>
          {/* 電腦版 */}
          <div className="hidden md:flex md:flex-col">
            <span className="text-sm">{user}</span>
            <div className="flex items-center space-x-3">
              <p>{attraction}</p>
              <div className="leading-3 md:hidden">
                <CustomStar rating={4.5} />
              </div>
              <p className=" md:hidden">5個月前</p>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:space-x-2">
          <EditBtn />
          <DeleteBtn
            onClick={() => {
              alert('確定要刪除，刪除後將無法復原?')
            }}
          />
        </div>
        <div className="lg:hidden">
          {' '}
          <MoreBtn></MoreBtn>
        </div>
      </div>
      <div className="pl-[52px]">
        <div className="flex space-x-3 mb-2 lg:hidden">
          <div className="leading-3">
            <CustomStar rating={4.5} />
          </div>
          <p>5個月前</p>
        </div>
        {comment}
      </div>
    </div>
  )
}
