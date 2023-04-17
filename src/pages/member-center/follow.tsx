import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import MemberLayout from '@/modules/MemberCenterPage/MemberLayout'
import FollowUserCard from '@/modules/MemberCenterPage/components/FollowUserCard'
import SeeMore from '@/common/components/SeeMore'
import { MemberCountProps } from '@/pages/member-center/types'

export async function getServerSideProps({
  req,
  res,
}: {
  req: undefined
  res: undefined
}) {
  const token = getCookie('auth', { req, res })

  // 【API】會員中心左邊選單各項數量
  const resMemberCountData = await fetch(
    `https://travelmaker.rocket-coding.com/api/users/dataCounts`,
    {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
  const memberCountData = await resMemberCountData.json()

  return {
    props: {
      memberCountData,
    },
  }
}

export default function Track({
  memberCountData,
}: {
  memberCountData: MemberCountProps
}) {
  // 將行程及房間數量往 MemberLayout 傳
  const [countData, setCountData] = useState(memberCountData)
  useEffect(() => {
    setCountData(countData)
  }, [countData])

  return (
    <div>
      {/* 手機版 */}
      <div className="container">
        <div className="md:hidden mt-8 mb-[100px]">
          <h2 className="text-lg font-bold mb-7">我的追蹤({memberCountData.FollowCounts})</h2>
          {/* 詳細資訊區 */}
          <div className="flex flex-col">
            <div className="flex flex-col space-y-6">
              {Array(20)
                .fill('')
                .map((item, index) => {
                  return (
                    <div key={index}>
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
          </div>
        </div>
      </div>
      {/* 電腦版 */}
      <MemberLayout
        path="Track"
        countData={countData}
        setCountData={setCountData}
      >
        <div className="md:flex md:flex-col md:space-y-10 md:w-2/3">
          {/* 分類資訊區 */}
          <div className="md:member-shadow md:rounded-md">
            <h2 className="md:text-xl md:px-10 md:py-8">我的追蹤</h2>
            <hr className="md:w-full md:border-gray-E2" />
            <div className="md:px-10 md:py-6">共有{memberCountData.FollowCounts}個追蹤</div>
          </div>
          {/* 詳細資訊區 */}
          <div className="md:flex md:flex-col">
            <div className="flex flex-wrap -my-3 mb-[60px] lg:-mx-3">
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
