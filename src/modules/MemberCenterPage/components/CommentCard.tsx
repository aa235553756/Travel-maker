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
              <div className="leading-3">
                <CustomStar rating={4.5} />
              </div>
              <p className="text-gray-A8">5個月前</p>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:space-x-5">
          <EditBtn />
          <div className="border border-primary rounded-full">
            <DeleteBtn
              onClick={() => {
                alert('確定要刪除，刪除後將無法復原?')
              }}
            />
          </div>
        </div>
        <div className="lg:hidden">
          <MoreBtn></MoreBtn>
        </div>
      </div>
      <div className="pl-[64px]">
        <div className="flex space-x-3 mb-2 lg:hidden">
          <div className="leading-3">
            <CustomStar rating={4.5} />
          </div>
          <p className="text-gray-A8">5個月前</p>
        </div>
        {comment}
      </div>
    </div>
  )
}
