import CustomStar from '@/common/components/CustomStar'
import Link from 'next/link'
import React from 'react'

export default function CommentForm({}) {
  return (
    <form className="">
      <div className="mx-auto lg:w-2/3">
        <p className="mb-6">
          您尚未登入，亦可
          <Link
            href="/login"
            className="text-blue-400 underline visited:text-blue-600"
          >
            登入
          </Link>
          留言。
        </p>
        <div className="flex flex-col mb-[30px] md:mb-6 md:flex-row">
          <div className="md:w-1/2">
            <p className="mb-5">暱稱：</p>
            {/* 這邊使用RHF，都有名字了，為什麼要暱稱 */}
            <input
              type="text"
              placeholder="請輸入暱稱"
              className="py-4 px-3 w-full md:w-3/4 mb-6 bg-[#FAFAFA] focus-visible:outline-red-400 md:mb-0"
            />
          </div>
          <div>
            <p className="mb-5">評價星號：</p>
            <div className="md:pt-2">
              <CustomStar rating={0} clickable={true} starDimension={'30px'} />
            </div>
          </div>
        </div>
        <textarea
          name=""
          id=""
          className="px-2 py-3 mb-5 block w-full min-h-[280px] resize-none bg-[#FAFAFA] md:mb-9 focus-visible:outline-red-600"
          placeholder="請輸入評價內容"
        ></textarea>
        <button className="py-2 px-8 ml-auto block bg-[#D7D7D7]">送出</button>
      </div>
    </form>
  )
}
