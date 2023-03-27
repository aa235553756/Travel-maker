import React from 'react'
import PostAttr from '@/modules/BlogPage/components/PostAttr'
import AddAttr from '@/modules/BlogPage/components/AddAttr'
import UploadCover from '@/modules/BlogPage/components/UploadCover'
import { MdAdd, MdHorizontalRule } from 'react-icons/md'

export default function PostBlog() {
  return (
    <div className="container">
      <div className="md:pt-7 pb-[100px] lg:pb-[160px]">
        {/* 上傳封面 */}
        <div className="mb-[60px] mx-auto  lg:w-2/3">
          <UploadCover />
        </div>

        <div className="w-full mx-auto lg:w-1/2">
          <div className="flex flex-col space-y-8 mb-[72px]">
            {/* 遊記標題 */}
            <div className="flex flex-col space-y-4">
              <label className="text-lg" htmlFor="title">
                遊記的標題
              </label>
              <input
                id="title"
                type="text"
                className="border px-3 py-4"
                placeholder="請輸入遊記標題"
              />
            </div>

            {/* 遊記類別 */}
            <div className="flex flex-col space-y-4">
              <label className="text-lg">類別</label>
              <div className="flex justify-between space-x-4">
                <select className="w-full border px-3 py-4">
                  <option value="城市走走">請選擇行程類別</option>
                  <option value="城市走走">城市走走</option>
                  <option value="拍照聖地">拍照聖地</option>
                  <option value="放鬆療癒">放鬆療癒</option>
                  <option value="夜間首選">夜間首選</option>
                  <option value="文藝青年">文藝青年</option>
                  <option value="親子互動">親子互動</option>
                  <option value="冒險活潑">冒險活潑</option>
                </select>
                <button className="border p-4">
                  <MdAdd className="text-2xl" />
                </button>
              </div>
              <div className="flex justify-between space-x-4">
                <select className="w-full border px-3 py-4">
                  <option value="城市走走">請選擇行程類別</option>
                  <option value="城市走走">城市走走</option>
                  <option value="拍照聖地">拍照聖地</option>
                  <option value="放鬆療癒">放鬆療癒</option>
                  <option value="夜間首選">夜間首選</option>
                  <option value="文藝青年">文藝青年</option>
                  <option value="親子互動">親子互動</option>
                  <option value="冒險活潑">冒險活潑</option>
                </select>
                <button className="border p-4">
                  <MdHorizontalRule className="text-2xl" />
                </button>
              </div>
            </div>
          </div>

          {/* 景點 */}
          <div className="flex flex-col space-y-10">
            <PostAttr attractName="大安森林公園" />
            <PostAttr attractName="中正紀念堂" />
            <PostAttr attractName="台北101" />
            <PostAttr attractName="松山文創園區" />
            <AddAttr />
          </div>

          {/* 按鈕們 */}
          <div className="flex justify-end space-x-6 mt-[40px]">
            <input type="submit" value="刪除" className="px-5 py-2 border" />
            <input type="submit" value="草稿" className="px-5 py-2 border" />
            <input type="submit" value="發布" className="px-5 py-2 border" />
          </div>
        </div>
      </div>
    </div>
  )
}
