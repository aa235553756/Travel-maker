import React, { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import MemberLayout from '@/modules/MemberCenterPage/MemberLayout'
import TourCard from '@/common/components/card/TourCard'
import SeeMore from '@/common/components/SeeMore'
import {
  TourDataProps,
  RoomDataProps,
  MemberCountProps,
} from '@/pages/member-center/types'
import { BsExclamationCircle } from 'react-icons/bs'
import { CustomModal } from '@/common/components/CustomModal'
import { GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res, params } = context
  const token = getCookie('auth', { res, req })

  // 取得 query string 的 page 參數
  const page = params

  // 【API】取得我的收藏行程
  const resTourData = await fetch(
    `https://travelmaker.rocket-coding.com/api/users/tours/${page}`,
    {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
  const tourData = await resTourData.json()

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
      tourData,
      roomData,
      memberCountData,
    },
  }
}

export default function Journey({
  tourData,
  roomData,
  memberCountData,
}: {
  tourData: TourDataProps
  roomData: RoomDataProps
  memberCountData: MemberCountProps
}) {
  // tab class 切換
  const [activeTab, setActiveTab] = useState(1)

  // 將行程及房間數量往 MemberLayout 傳
  const [countData, setCountData] = useState(memberCountData)
  useEffect(() => {
    setCountData(countData)
  }, [countData])

  // 卡片連結
  const router = useRouter()
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  // 獲取更多資料
  // const token = getCookie('auth')
  // const [tours, setTours] = useState(tourData)
  // const handleLoadMore = async () => {
  //   console.log(tours)
  //   // const nextPage = tours.current_page + 1
  //   const res = await fetch(
  //     `https://travelmaker.rocket-coding.com/api/users/tours/2`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   )
  //   const newTours = await res.json()
  //   setTours((prevTours) => ({
  //     ...newTours,
  //     data: [...prevTours.TourData, ...newTours],
  //   }))
  // }

  return (
    <div>
      {/* 手機版 */}
      <div className="container">
        <div className="md:hidden mt-8 mb-[100px]">
          <h2 className="text-lg font-bold mb-4">
            我的收藏行程({memberCountData.TourCounts})
          </h2>
          {/* 詳細資訊區 */}
          <div className="flex flex-col">
            {/* tab 按鈕 */}
            <div className="flex w-full">
              <button
                type="button"
                className={`w-full text-center border-b-2 ${
                  activeTab === 1
                    ? 'border-primary text-primary'
                    : 'border-gray-E2 text-gray-A8'
                } p-4 mb-7`}
                onClick={() => {
                  setActiveTab(1)
                }}
              >
                一般模式({tourData.TourCounts})
              </button>
              <button
                type="button"
                className={`w-full text-center border-b-2 ${
                  activeTab === 2
                    ? 'border-primary text-primary'
                    : 'border-gray-E2 text-gray-A8'
                } p-4 mb-7`}
                onClick={() => {
                  setActiveTab(2)
                }}
              >
                房間模式({tourData.RoomCounts})
              </button>
            </div>
            {/* tab 內容 */}
            {activeTab === 1 && (
              <div className="flex flex-col space-y-6">
                {tourData?.TourData?.map((item) => {
                  return (
                    <a
                      key={item.TourId}
                      onClick={(e) => {
                        e.preventDefault()
                        router.push(`/random-tour/${item.TourId}`)
                      }}
                    >
                      <TourCard
                        key={item.TourId}
                        likes={item.Likes}
                        countAttr={item.AttrCounts}
                        tourName={item.TourName}
                        showLike={true}
                        creator={''}
                        showCreator={false}
                        imagesUrl={item.ImageUrl}
                        onClick={() => {
                          setDeleteConfirm(!deleteConfirm)
                        }}
                      />
                    </a>
                  )
                })}
              </div>
            )}
            {activeTab === 2 && (
              <div className="flex flex-col space-y-10">
                {roomData?.RoomData?.map((item) => {
                  return (
                    <a
                      key={item.RoomGuid}
                      onClick={(e) => {
                        e.preventDefault()
                        router.push(`/planning-tour/${item.RoomGuid}`)
                      }}
                    >
                      <TourCard
                        key={item.RoomGuid}
                        likes={0}
                        tourName={item.RoomName}
                        countAttr={item.AttrCounts}
                        showLike={false}
                        creator={item.CreaterName}
                        showCreator={true}
                        imagesUrl={item.ImageUrl}
                        onClick={() => {
                          setDeleteConfirm(!deleteConfirm)
                        }}
                      />
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 電腦版 */}
      {/* 刪除行程 */}
      <CustomModal modal={deleteConfirm} setModal={setDeleteConfirm} wrapper>
        <div className="w-[552px] pt-8 p-7 bg-white rounded-xl">
          <div className="flex items-center space-x-2 mb-5">
            <BsExclamationCircle className="text-[32px] text-highlight" />
            <h4 className="text-xl">確定要刪除嗎？</h4>
          </div>
          <hr />
          <span className="p-8 block">刪除後將無法復原，是否確認刪除?</span>
          <div className="flex justify-end space-x-9">
            <button
              className="border border-primary text-primary text-xl px-9 py-3 font-bold rounded-md hover:border-primary-tint hover:text-primary-tint hover:duration-500"
              onClick={() => {
                setDeleteConfirm(!deleteConfirm)
              }}
            >
              取消
            </button>
            <button className="bg-primary border border-transparent text-white text-xl px-9 py-3 font-bold rounded-md hover:bg-primary-tint hover:duration-500">
              刪除
            </button>
          </div>
        </div>
      </CustomModal>
      <MemberLayout
        path="Journey"
        countData={countData}
        setCountData={setCountData}
      >
        <div className="md:flex md:flex-col md:space-y-10 md:w-2/3">
          {/* 分類資訊區 */}
          <div className="md:member-shadow md:rounded-md">
            <h2 className="md:text-xl md:font-bold md:px-10 md:py-8">
              我的收藏行程
            </h2>
            <hr className="md:w-full md:border-gray-E2" />
            <div className="md:px-10 md:py-6">
              共有{tourData.TourCounts + tourData.RoomCounts}個收藏行程
            </div>
          </div>
          {/* 詳細資訊區 */}
          <div className="md:flex md:flex-col">
            {/* tab 按鈕 */}
            <div className="md:flex md:w-full">
              <button
                type="button"
                className={`w-1/2 text-center border-b-2 ${
                  activeTab === 1
                    ? 'border-primary text-primary'
                    : 'border-gray-E2 text-gray-A8'
                } p-4 mb-10`}
                onClick={() => {
                  setActiveTab(1)
                }}
              >
                一般模式({tourData.TourCounts})
              </button>
              <button
                type="button"
                className={`w-1/2 text-center border-b-2 ${
                  activeTab === 2
                    ? 'border-primary text-primary'
                    : 'border-gray-E2 text-gray-A8'
                } p-4 mb-10`}
                onClick={() => {
                  setActiveTab(2)
                }}
              >
                房間模式({tourData.RoomCounts})
              </button>
            </div>
            {/* tab 內容 */}
            {activeTab === 1 && (
              <div className="flex flex-wrap -my-3 mb-[60px] lg:-mx-3">
                {tourData?.TourData?.map((item) => {
                  return (
                    <a
                      key={item.TourId}
                      onClick={(e) => {
                        e.preventDefault()
                        router.push(`/random-tour/${item.TourId}`)
                      }}
                      className="w-full py-3 cursor-pointer z-0 lg:w-1/2 lg:px-3 hover:opacity-80 hover:duration-500 hover:-translate-y-1"
                    >
                      <TourCard
                        likes={item.Likes}
                        countAttr={item.AttrCounts}
                        tourName={item.TourName}
                        showLike={true}
                        creator={''}
                        showCreator={false}
                        imagesUrl={item.ImageUrl}
                        onClick={() => {
                          setDeleteConfirm(!deleteConfirm)
                        }}
                      />
                    </a>
                  )
                })}
              </div>
            )}
            {activeTab === 2 && (
              <div className="flex flex-wrap -my-3 mb-[60px] lg:-mx-3">
                {roomData?.RoomData?.map((item) => {
                  return (
                    <a
                      key={item.RoomGuid}
                      onClick={(e) => {
                        e.preventDefault()
                        router.push(`/planning-tour/${item.RoomGuid}`)
                      }}
                      className="w-full py-3 lg:w-1/2 lg:px-3 cursor-pointer hover:opacity-80 hover:duration-500 hover:-translate-y-1"
                    >
                      <TourCard
                        likes={0}
                        tourName={item.RoomName}
                        countAttr={item.AttrCounts}
                        showLike={false}
                        creator={item.CreaterName}
                        showCreator={true}
                        imagesUrl={item.ImageUrl}
                        onClick={() => {
                          setDeleteConfirm(!deleteConfirm)
                        }}
                      />
                    </a>
                  )
                })}
              </div>
            )}

            {/* {loading && <p>loading</p>}

            {!loading && (
              <div
                onClick={() => {
                  setPage((prevPage) => prevPage + 1)
                }}
              >
                <SeeMore />
              </div>
            )} */}

            <div
              // onClick={() => {
              //   handleLoadMore()
              // }}
            >
              <SeeMore />
            </div>
          </div>
        </div>
      </MemberLayout>
    </div>
  )
}
