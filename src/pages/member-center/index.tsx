import React, { useState } from 'react'
import Image from 'next/image'
import MemberLayout from '@/modules/MemberCenterPage/MemberLayout'
import { BsLightbulb, BsExclamationCircle } from 'react-icons/bs'
import { useRouter } from 'next/router'

export default function MemberCenter() {
  const router = useRouter()
  console.log(router)
  // 編輯暱稱
  const [editNickname, setEditNickname] = useState(false)

  return (
    <div>
      {/* 手機版 */}
      <div className="container mt-8 mb-[100px] md:mt-[96px]">
        <h2 className="text-lg font-bold mb-7 md:hidden">帳號設定</h2>
        <div className="member-shadow rounded-md px-5 py-7 flex flex-col space-y-6 w-full md:hidden">
          <div className="flex items-center">
            <div className="w-[80px]">頭像</div>
            <Image
              width="56"
              height="56"
              src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
              alt="圖片"
              className="h-[56px] rounded-full"
            ></Image>
          </div>
          {/* 編輯暱稱 */}
          {editNickname ? (
            <div className="flex items-center">
              <div className="w-[80px]">暱稱</div>
              <input
                type="text"
                placeholder="小熊軟糖"
                className="input-style !p-3 w-[128px] mr-3"
              />
              <button
                className="border-[1px] border-primary text-primary px-4 py-3 rounded-md block"
                onClick={() => {
                  setEditNickname(!editNickname)
                }}
              >
                儲存
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="w-[80px]">暱稱</div>
              <span className="w-[140px]">小熊軟糖</span>
              <button
                className="border-[1px] border-primary text-primary px-4 py-3 rounded-md block"
                onClick={() => {
                  setEditNickname(!editNickname)
                }}
              >
                編輯
              </button>
            </div>
          )}
          <div className="flex items-center">
            <div className="w-[80px]">電子信箱</div>
            <span>fufuco89@gmail.com</span>
          </div>
          <div className="flex items-center text-highlight !mt-1">
            <div className="w-[80px]"></div>
            <BsExclamationCircle />
            <span className="ml-2">無法變更</span>
          </div>
          <button className="bg-primary text-white px-6 py-3 rounded-md block mr-auto">
            修改密碼
          </button>
        </div>
      </div>

      <MemberLayout path="/">
        <div className="md:flex md:flex-col md:space-y-7 md:w-2/3">
          {/* 分類資訊區 */}
          <div className="md:member-shadow md:rounded-md">
            <h2 className="md:text-2xl md:px-10 md:py-8">帳號設定</h2>
            <hr className="md:w-full md:border-gray-E2" />
            <div className="md:flex md:items-center md:space-x-2 md:px-10 md:py-6 md:text-gray-73">
              <BsLightbulb />
              <p>為了確保用戶身份的真實性，您無法變更電子信箱。</p>
            </div>
          </div>
          {/* 詳細資訊區 */}
          <div className="md:member-shadow md:rounded-md md:flex md:flex-col md:space-y-12 md:px-10 md:py-16">
            <div className="md:flex md:items-center">
              <div className="md:w-[100px] lg:w-[200px]">頭像</div>
              <Image
                width="100"
                height="100"
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                alt="圖片"
                className="h-[100px] rounded-full"
              ></Image>
            </div>
            {/* 編輯暱稱 */}
            {editNickname ? (
              <div className="md:flex md:items-center">
                <div className="md:w-[100px] lg:w-[200px]">暱稱</div>
                <div className="md:flex md:items-center md:space-x-3">
                  <input
                    type="text"
                    placeholder="小熊軟糖"
                    className="input-style !p-3 md:w-[152px] lg:w-[238px]"
                  />
                  <button
                    className="border border-transparent bg-primary text-white px-4 py-3 rounded-md block"
                    onClick={() => {
                      setEditNickname(!editNickname)
                    }}
                  >
                    儲存
                  </button>
                </div>
              </div>
            ) : (
              <div className="md:flex md:items-center">
                <div className="md:w-[100px] lg:w-[200px]">暱稱</div>
                <div className="md:flex md:items-center">
                  <span className="md:w-[162px] lg:w-[250px]">小熊軟糖</span>
                  <button
                    className="border border-primary text-primary px-4 py-3 rounded-md block"
                    onClick={() => {
                      setEditNickname(!editNickname)
                    }}
                  >
                    編輯
                  </button>
                </div>
              </div>
            )}
            <div className="md:flex md:items-center">
              <div className="md:w-[100px] lg:w-[200px]">電子信箱</div>
              <span className="md:w-[172px] lg:w-[250px]">
                fufuco89@gmail.com
              </span>
              <div className="hidden lg:flex lg:items-center lg:space-x-2 lg:text-highlight">
                <BsExclamationCircle />
                <span>無法變更</span>
              </div>
            </div>
            <div className="flex items-center text-highlight !mt-1 lg:hidden">
              <div className="w-[100px]"></div>
              <BsExclamationCircle />
              <span className="ml-2">無法變更</span>
            </div>
            <button className="bg-primary text-white px-6 py-3 rounded-md block mr-auto">
              修改密碼
            </button>
          </div>
        </div>
      </MemberLayout>
    </div>
  )
}
