import React from 'react'
import MemberLayout from '@/modules/MemberCenterPage/MemberLayout'
import AttrCard from '@/common/components/card/AttrCard'
import SeeMore from '@/common/components/SeeMore'

export default function Attract() {
  return (
    <div>
      {/* 手機版 */}
      <div className="container">
        <div className="md:hidden mt-8 mb-[100px]">
          <h2 className="text-lg font-bold mb-7">我的收藏景點(2)</h2>
          {/* 詳細資訊區 */}
          <div className="flex flex-col">
            <div className="flex flex-col space-y-6">
              {Array(20)
                .fill('')
                .map((item, index) => {
                  return (
                    <div key={index} className="w-full py-3 lg:w-1/2 lg:px-3">
                      <AttrCard
                        showSelect={true}
                        showCollect={true}
                        district="大安區"
                        attractName="大安森林公園"
                        rating={1.5}
                      />
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>

      {/* 電腦版 */}
      <MemberLayout path="Attract">
        <div className="md:flex md:flex-col md:space-y-10 md:w-2/3">
          {/* 分類資訊區 */}
          <div className="md:member-shadow md:rounded-md">
            <h2 className="md:text-xl md:px-10 md:py-8">我的收藏景點</h2>
            <hr className="md:w-full md:border-gray-E2" />
            <div className="md:px-10 md:py-6">共有5個收藏景點</div>
          </div>
          {/* 詳細資訊區 */}
          <div>
            <div className="flex flex-wrap -my-3 mb-[60px] lg:-mx-3">
              {Array(20)
                .fill('')
                .map((item, index) => {
                  return (
                    <div key={index} className="w-full py-3 lg:w-1/2 lg:px-3">
                      <AttrCard
                        showSelect={true}
                        showCollect={true}
                        district="大安區"
                        attractName="大安森林公園"
                        rating={1.5}
                      />
                    </div>
                  )
                })}
            </div>
            <SeeMore />
          </div>
        </div>
      </MemberLayout>
    </div>
  )
}
