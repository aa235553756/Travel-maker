import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import MemberLayout from '@/modules/MemberCenterPage/MemberLayout'
import AttrCard from '@/common/components/card/AttrCard'
import SeeMore from '@/common/components/SeeMore'
import {
  MemberCountProps,
  AttrDataProps,
  RoomDataProps,
} from '@/pages/member-center/types'
import { CustomModal } from '@/common/components/CustomModal'
import { BsBookmarkCheck } from 'react-icons/bs'

export async function getServerSideProps({
  req,
  res,
}: {
  req: undefined
  res: undefined
}) {
  const token = getCookie('auth', { req, res })

  // 【API】取得我的收藏景點
  const resAttrData = await fetch(
    `https://travelmaker.rocket-coding.com/api/users/attractions/1`,
    {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
  const attrData = await resAttrData.json()

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

  // 【API】取得我的收藏房間
  const resRoomData = await fetch(
    `https://travelmaker.rocket-coding.com/api/users/rooms/1`,
    {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
  const roomData = await resRoomData.json()

  return {
    props: {
      attrData,
      memberCountData,
      roomData,
    },
  }
}

export default function Attract({
  attrData,
  memberCountData,
  roomData,
}: {
  attrData: AttrDataProps
  memberCountData: MemberCountProps
  roomData: RoomDataProps
}) {
  // 將行程及房間數量往 MemberLayout 傳
  const [countData, setCountData] = useState(memberCountData)
  useEffect(() => {
    setCountData(countData)
  }, [countData])

  console.log(roomData.RoomData)

  // 卡片連結
  const router = useRouter()

  const [modal, setModal] = useState(false)

  // const [addTour, setAddTour] = useState(false)
  const [addTourTagStyle, setAddTourTagStyle] = useState<{
    [index: number]: boolean
  }>({})
  const [collectConfirm, setCollectConfirm] = useState(false)

  return (
    <div>
      {/* 手機版 */}
      <div className="container">
        <div className="md:hidden mt-8 mb-[100px]">
          <h2 className="text-lg font-bold mb-7">
            我的收藏景點({memberCountData.AttCounts})
          </h2>
          {/* 詳細資訊區 */}
          <div className="flex flex-col">
            <div className="flex flex-col space-y-6">
              {attrData?.AttractionData.map((item) => {
                return (
                  <a
                    key={item.AttractionId}
                    onClick={(e) => {
                      e.preventDefault()
                      router.push(
                        `/hot-topics/attractions/${item.AttractionId}`
                      )
                    }}
                    className="w-full py-3 lg:w-1/2 lg:px-3"
                  >
                    <AttrCard
                      showSelect={true}
                      showCollect={true}
                      attractName={item.AttractionName}
                      district={item.CityDistrict}
                      rating={item.AverageScore}
                      imagesUrl={item.ImageUrl}
                      type={item.Category}
                    />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 電腦版 */}
      {/* 景點加入房間 */}
      <CustomModal modal={modal} setModal={setModal} wrapper>
        <div className="w-[260px] min-h-[260px] p-7 bg-white rounded-xl ">
          {/* 標題 */}
          <h4 className="text-xl mb-2">選擇要加入的行程</h4>
          <hr />
          {/* 按鈕 */}
          <div className="flex flex-col space-y-3 mt-3 pr-3 h-[200px] overflow-y-auto">
            {roomData.RoomData.map((item, index) => {
              const isActive = addTourTagStyle[index]
              return (
                <button
                  className={`${
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-gray-A8 text-gray-A8'
                  } w-full block border px-2 py-1 rounded-xl `}
                  onClick={() => {
                    setAddTourTagStyle({
                      ...addTourTagStyle,
                      [index]: !isActive,
                    })
                  }}
                  key={index}
                >
                  {item.RoomName}
                </button>
              )
            })}
          </div>
        </div>
      </CustomModal>
      {/* 收藏提醒 */}
      <CustomModal modal={collectConfirm} setModal={setCollectConfirm} wrapper>
        <div className="w-[500px] p-7 bg-white rounded-xl">
          <div className="flex items-center space-x-2">
            <BsBookmarkCheck className="text-3xl text-secondary" />
            <span>收藏成功</span>
          </div>
        </div>
      </CustomModal>

      <MemberLayout
        path="Attract"
        countData={countData}
        setCountData={setCountData}
      >
        <div className="md:flex md:flex-col md:space-y-10 md:w-2/3">
          {/* 分類資訊區 */}
          <div className="md:member-shadow md:rounded-md">
            <h2 className="md:text-xl md:px-10 md:py-8">我的收藏景點</h2>
            <hr className="md:w-full md:border-gray-E2" />
            <div className="md:px-10 md:py-6">
              共有{attrData.AttCounts}個收藏景點
            </div>
          </div>
          {/* 詳細資訊區 */}
          <div>
            <div className="flex flex-wrap -my-3 mb-[60px] lg:-mx-3">
              {attrData?.AttractionData.map((item) => {
                return (
                  <div
                    key={item.AttractionId}
                    // onClick={(e) => {
                    //   e.preventDefault()
                    //   router.push(`/hot-topics/attractions/${item.AttractionId}`)
                    // }}
                    className="w-full py-3 lg:w-1/2 lg:px-3 cursor-pointer hover:opacity-80 hover:duration-500 hover:-translate-y-1"
                  >
                    <AttrCard
                      showSelect={true}
                      showCollect={true}
                      attractName={item.AttractionName}
                      district={item.CityDistrict}
                      rating={item.AverageScore}
                      imagesUrl={item.ImageUrl}
                      type={item.Category}
                      onClick={() => {
                        setModal(!modal)
                      }}
                      onClick1={() => {
                        setCollectConfirm(!collectConfirm)
                      }}
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
