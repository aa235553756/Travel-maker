import React from 'react'
import MemberLayout from '@/modules/MemberCenterPage/MemberLayout'
import { BsLightbulb } from 'react-icons/bs'
import { useRouter } from 'next/router'

export default function MemberCenter() {
  const router = useRouter()
  console.log(router)

  return (
    <div>
      {/* 手機版 */}
      <div className="container">
        <h2 className="text-lg font-bold mt-8 mb-4 md:hidden">帳號設定</h2>
        <div className="bg-[#d7d7d7] px-7 py-5 flex flex-col space-y-4 w-full md:hidden">
          <div className="flex items-center">
            <div className="w-[80px]">頭像</div>
            <div className="w-[56px] h-[56px] bg-[#ccc] rounded-full"></div>
          </div>
          <div className="flex items-center">
            <div className="w-[80px]">暱稱</div>
            <span>小熊軟糖</span>
          </div>
          <div className="flex items-center">
            <div className="w-[80px]">電子信箱</div>
            <span>fufuco89@gmail.com</span>
          </div>
          <button className="bg-[#ccc] px-8 py-2 block mx-auto">編輯</button>
        </div>
      </div>

      <MemberLayout path="/">
        <div className="md:flex md:flex-col md:space-y-7 md:w-2/3">
          {/* 分類資訊區 */}
          <div className="md:bg-[#d7d7d7]">
            <h2 className="md:text-2xl md:font-bold md:px-10 md:py-8">
              帳號設定
            </h2>
            <hr className="md:w-full " />
            <div className="md:flex md:items-center md:space-x-2  md:px-10 md:py-6">
              <BsLightbulb />
              <p>為了確保用戶身份的真實性，您無法變更電子信箱。</p>
            </div>
          </div>
          {/* 詳細資訊區 */}
          <div className="md:bg-[#d7d7d7] md:flex md:flex-col md:space-y-12 md:px-10 md:py-16">
            <div className="md:flex md:items-center">
              <div className="md:w-[180px]">頭像</div>
              <div className="md:w-[56px] md:h-[56px] md:bg-[#ccc] md:rounded-full"></div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-[180px]">暱稱</div>
              <span>小熊軟糖</span>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-[180px]">電子信箱</div>
              <span>fufuco89@gmail.com</span>
            </div>
            <button className="md:bg-[#ccc] md:px-8 md:py-2 md:block md:mr-auto">
              編輯
            </button>
          </div>
        </div>
      </MemberLayout>
    </div>
  )
}