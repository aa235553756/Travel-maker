import React from 'react'
import MemberLayout from '@/modules/MemberCenterPage/MemberLayout'
import AttractCard from '@/common/components/AttractCard'
import { MdKeyboardArrowDown } from 'react-icons/md'

export default function Attract() {
  return (
    <div>
      {/* 手機版 */}
      <div className="container">
        <h2 className="text-lg font-bold mt-8 mb-4 md:hidden">我的收藏景點</h2>
        {/* 詳細資訊區 */}
        <div className="flex flex-col md:hidden">
          <div className="flex flex-col space-y-6">
            <AttractCard
              showSelect={true}
              showCollect={true}
              showDetail={true}
              location="大安區"
              attractName="大安森林公園"
              type="城市走走"
            />
            <AttractCard
              showSelect={false}
              showCollect={false}
              showDetail={false}
              location="大安區"
              attractName="大安森林公園"
              type="城市走走"
            />
            <AttractCard
              showSelect={false}
              showCollect={false}
              showDetail={false}
              location="大安區"
              attractName="大安森林公園"
              type="城市走走"
            />
          </div>
          <div className="flex items-center justify-center space-x-2 mt-7 mb-[100px]">
            <p>查看更多</p>
            <MdKeyboardArrowDown />
          </div>
        </div>
      </div>
      {/* 電腦版 */}
      <MemberLayout path="Attract">
        <div className="md:flex md:flex-col md:space-y-7 md:w-2/3">
          {/* 分類資訊區 */}
          <div className="md:bg-[#d7d7d7]">
            <h2 className="md:text-xl md:font-bold md:px-10 md:py-8">
              我的收藏景點
            </h2>
            <hr className="md:w-full " />
            <div className="md:px-10 md:py-6">共有5個收藏景點</div>
          </div>
          {/* 詳細資訊區 */}
          <div>
            <div className="md:flex md:flex-col md:space-y-6 lg:flex-row lg:flex-wrap lg:space-x-6">
              <AttractCard
                showSelect={true}
                showCollect={true}
                showDetail={true}
                location="大安區"
                attractName="大安森林公園"
                type="城市走走"
              />
              <AttractCard
                showSelect={true}
                showCollect={true}
                showDetail={true}
                location="大安區"
                attractName="大安森林公園"
                type="城市走走"
              />
              <AttractCard
                showSelect={true}
                showCollect={true}
                showDetail={true}
                location="大安區"
                attractName="大安森林公園"
                type="城市走走"
              />
            </div>
            <div className="flex items-center justify-center space-x-2 mt-7 mb-[100px]">
              <p>查看更多</p>
              <MdKeyboardArrowDown />
            </div>
          </div>
        </div>
      </MemberLayout>
    </div>
  )
}