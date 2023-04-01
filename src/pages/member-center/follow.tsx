import React from 'react'
import MemberLayout from '@/modules/MemberCenterPage/MemberLayout'
import FollowUserCard from '@/modules/MemberCenterPage/components/FollowUserCard'
import SeeMore from '@/common/components/SeeMore'

export default function Track() {
  return (
    <div>
      {/* 手機版 */}
      <div className="container">
        <div className="md:hidden mt-24 mb-[100px] ">
          {' '}
          <h2 className="text-lg font-bold mb-4">我的追蹤</h2>
          {/* 詳細資訊區 */}
          <div className="flex flex-col">
            <div className="flex flex-col space-y-6">
              <FollowUserCard
                poster="DesignLab"
                posts={2}
                fans={10}
                followers={1}
              />
              <FollowUserCard
                poster="DesignLab"
                posts={2}
                fans={10}
                followers={1}
              />
              <FollowUserCard
                poster="DesignLab"
                posts={2}
                fans={10}
                followers={1}
              />
            </div>
          </div>
        </div>
      </div>
      {/* 電腦版 */}
      <MemberLayout path="Track">
        <div className="md:flex md:flex-col md:space-y-7 md:w-2/3">
          {/* 分類資訊區 */}
          <div className="md:bg-[#d7d7d7]">
            <h2 className="md:text-xl md:font-bold md:px-10 md:py-8">
              我的追蹤
            </h2>
            <hr className="md:w-full" />
            <div className="md:px-10 md:py-6">共有7個追蹤</div>
          </div>
          {/* 詳細資訊區 */}
          <div className="md:flex md:flex-col">
            <div className="flex flex-wrap -my-3 mb-16 lg:-mx-3">
              {Array(20)
                .fill('')
                .map((item, index) => {
                  return (
                    <div key={index} className="w-full py-3 lg:w-1/2 lg:px-3">
                      <FollowUserCard
                        poster="DesignLab"
                        posts={2}
                        fans={10}
                        followers={1}
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
