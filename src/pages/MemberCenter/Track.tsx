import React from 'react'
import MemberLayout from '@/modules/MemberCenterPage/MemberLayout'
import TrackCard from '@/common/components/TrackCard'
import SeeMore from '@/common/components/SeeMoreButton'
import { MdKeyboardArrowDown } from 'react-icons/md'

export default function Track() {
  return (
    <div>
      {/* 手機版 */}
      <div className="container">
        <h2 className="text-lg font-bold mt-8 mb-4 md:hidden">我的追蹤</h2>
        {/* 詳細資訊區 */}
        <div className="flex flex-col md:hidden">
          <div className="flex flex-col space-y-6">
            <TrackCard poster="DesignLab" posts={2} fans={10} trackers={1} />
            <TrackCard poster="DesignLab" posts={2} fans={10} trackers={1} />
            <TrackCard poster="DesignLab" posts={2} fans={10} trackers={1} />
          </div>
          <div className="flex items-center justify-center space-x-2 mt-7 mb-[100px]">
            <p>查看更多</p>
            <MdKeyboardArrowDown />
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
          <div>
            <div className="md:flex md:flex-col md:space-y-6 lg:flex-row lg:flex-wrap lg:space-x-6">
              <TrackCard poster="DesignLab" posts={2} fans={10} trackers={1} />
              <TrackCard poster="DesignLab" posts={2} fans={10} trackers={1} />
              <TrackCard poster="DesignLab" posts={2} fans={10} trackers={1} />
            </div>
            <SeeMore />
          </div>
        </div>
      </MemberLayout>
    </div>
  )
}
