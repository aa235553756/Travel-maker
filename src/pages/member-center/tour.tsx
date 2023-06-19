import React, { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next'
import MemberLayout from '@/modules/MemberCenterPage/MemberLayout'
import TourCard from '@/common/components/card/TourCard'
import {
  TourDataProps,
  RoomDataProps,
  MemberCountProps,
} from '@/util/memberTypes'
import { BsExclamationCircle, BsXCircle } from 'react-icons/bs'
import { MdKeyboardArrowUp } from 'react-icons/md'

import { CustomModal } from '@/common/components/CustomModal'
import Head from 'next/head'
import Image from 'next/image'

export async function getServerSideProps({
  req,
  res,
}: {
  req: undefined
  res: undefined
}) {
  const token = getCookie('auth', { res, req })

  // 【API】取得我的收藏行程
  const resTourData = await fetch(
    `https://travelmaker.rocket-coding.com/api/users/tours/1`,
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

export default function Tour({
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

  // 無資料時
  const [noTourData, setNoTourData] = useState(false)
  const [noRoomData, setNoRoomData] = useState(false)
  // useEffect(() => {
  //   if (tourData===undefined) {
  //     setNoData(true)
  //   }
  //   if (roomData ===undefined) {
  //     setNoData(true)
  //   }
  // }, [])
  // console.log(tourData)
  // console.log(roomData)

  useEffect(() => {
    if (tourData.Message === '已無我的行程') {
      setNoTourData(true)
    }
    if (roomData.Message === '已無我的房間') {
      setNoRoomData(true)
    }
  }, [])

  // 將行程及房間數量往 MemberLayout 傳
  const [countData, setCountData] = useState(memberCountData)
  useEffect(() => {
    setCountData(countData)
  }, [countData])

  // 刪除提醒
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  // 獲取更多資料
  const token = getCookie('auth')
  const [moreTourData, setMoreTourData] = useState(tourData.TourData)
  const [moreRoomData, setMoreRoomData] = useState(roomData.RoomData)
  const [page, setPage] = useState(2)
  const [isLoading, setIsLoading] = useState(false)
  const [noDataModal, setNoDataModal] = useState(false)
  const [toTop, setToTop] = useState(false)

  const getMoreTourData = async (page: number) => {
    const res = await fetch(
      `https://travelmaker.rocket-coding.com/api/users/tours/${page}`,
      {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const newTours = await res.json()

    if (newTours.TourData) {
      setMoreTourData((prevTours) => [...prevTours, ...newTours.TourData])
      setPage((prevPage) => prevPage + 1)
      setIsLoading(true)

      if (newTours.Message === '已無我的行程') {
        setIsLoading(false)
        setNoDataModal(true)
      }
    }
  }

  const getMoreRoomData = async (page: number) => {
    const res = await fetch(
      `https://travelmaker.rocket-coding.com/api/users/rooms/${page}`,
      {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const newRooms = await res.json()

    if (newRooms.RoomData) {
      setMoreRoomData((prevRooms) => [...prevRooms, ...newRooms.RoomData])
      setPage((prevPage) => prevPage + 1)
      setIsLoading(true)
    }

    if (newRooms.Message === '已無我的行程') {
      setIsLoading(false)
      setNoDataModal(true)
    }
  }

  useEffect(() => {
    function handleScroll() {
      const body = document.body
      const html = document.documentElement
      const documentHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      )
      if (window.innerHeight + window.pageYOffset >= documentHeight) {
        getMoreTourData(page)
        getMoreRoomData(page)
        // return
      }

      if (window.pageYOffset > 1000) {
        setToTop(true)
      } else {
        setToTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [moreTourData])

  // 刪除我的行程
  const [tourId, setTourId] = useState(0)
  const handleDelTour = async (tourId: number) => {
    try {
      // 【API】刪除自己的行程
      const resDelTourData = await fetch(
        `https://travelmaker.rocket-coding.com/api/tours/${tourId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (resDelTourData.ok) {
        const updatedBlogs = moreTourData?.filter(
          (item) => item.TourId !== tourId
        )
        if (setMoreTourData !== undefined && updatedBlogs !== undefined) {
          setMoreTourData(updatedBlogs)
        }
      }

      if (resDelTourData.ok) {
        return
      }
    } catch (err) {
      alert(err)
    }
  }

  // 刪除我的房間
  const [roomGuid, setRoomGuid] = useState('')
  const handleDelRoom = async (roomGuid: string) => {
    console.log('點到了')

    try {
      // 【API】主揪刪除房間
      const resDelRoomData = await fetch(
        `https://travelmaker.rocket-coding.com/api/rooms/${roomGuid}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (resDelRoomData.ok) {
        const updatedBlogs = moreRoomData?.filter(
          (item) => item.RoomGuid !== roomGuid
        )
        if (setMoreRoomData !== undefined && updatedBlogs !== undefined) {
          setMoreRoomData(updatedBlogs)
        }

        console.log('刪除成功')
      }

      if (resDelRoomData.ok) {
        console.log('刪除失敗')

        return
      }
    } catch (err) {
      alert(err)
    }
  }

  return (
    <>
      <Head>
        <title>Travel Maker | 我的收藏行程</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Group 340.png" />
      </Head>
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
                  一般模式({moreTourData ? `${tourData.TourCounts}` : '0'})
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
                    getMoreRoomData(1)
                  }}
                >
                  房間模式({moreRoomData ? `${roomData.RoomCounts}` : '0'})
                </button>
              </div>
              {/* tab 內容 */}
              {activeTab === 1 && (
                <div className="flex flex-col space-y-6">
                  {noTourData ? (
                    <Image
                      width={394}
                      height={437}
                      alt="圖片"
                      src={'/no-data.png'}
                      className="mx-auto pt-[80px]"
                    />
                  ) : (
                    moreTourData?.map((item) => {
                      return (
                        <div
                          key={item.TourId}
                          className="w-full py-3 cursor-pointer z-0 lg:w-1/2 lg:px-3"
                        >
                          <TourCard
                            id={item.TourId}
                            likes={item.Likes}
                            countAttr={item.AttrCounts}
                            tourName={item.TourName}
                            isLike={true}
                            showLike
                            creator={''}
                            showCreator={false}
                            imagesUrl={item.ImageUrl}
                            showDelete
                            onClick={() => {
                              setDeleteConfirm(!deleteConfirm)
                              setTourId(item.TourId)
                            }}
                          />
                        </div>
                      )
                    })
                  )}
                </div>
              )}
              {activeTab === 2 && (
                <div className="flex flex-col space-y-10">
                  {noRoomData ? (
                    <Image
                      width={394}
                      height={437}
                      alt="圖片"
                      src={'/no-data.png'}
                      className="mx-auto pt-[80px]"
                    />
                  ) : (
                    moreRoomData?.map((item) => {
                      return (
                        <div
                          key={item.RoomGuid}
                          className="w-full py-3 lg:w-1/2 lg:px-3 cursor-pointer"
                        >
                          <TourCard
                            likes={0}
                            tourName={item.RoomName}
                            countAttr={item.AttrCounts}
                            isLike={false}
                            showLike={false}
                            creator={item.CreaterName}
                            showCreator
                            imagesUrl={item.ImageUrl}
                            room={true}
                            roomId={item.RoomGuid}
                            showDelete
                            onClick={() => {
                              setDeleteConfirm(!deleteConfirm)
                              setRoomGuid(item.RoomGuid)
                            }}
                          />
                        </div>
                      )
                    })
                  )}
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
              <button
                className="bg-primary border border-transparent text-white text-xl px-9 py-3 font-bold rounded-md hover:bg-primary-tint hover:duration-500"
                onClick={() => {
                  if (tourId) {
                    handleDelTour(tourId)
                  }
                  if (roomGuid) {
                    handleDelRoom(roomGuid)
                  }
                  setDeleteConfirm(!deleteConfirm)
                }}
              >
                刪除
              </button>
            </div>
          </div>
        </CustomModal>

        {/* 無行程提醒 */}
        <CustomModal modal={noDataModal} setModal={setNoDataModal} wrapper>
          <div className="w-[300px] p-7 bg-white rounded-xl">
            <div className="flex flex-col items-center space-y-4">
              <BsXCircle className="text-5xl text-highlight" />
              <span className="text-2xl">已無行程</span>
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
                共有{memberCountData.TourCounts}個收藏行程
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
                  一般模式({moreTourData ? `${tourData.TourCounts}` : '0'})
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
                  房間模式({moreRoomData ? `${roomData.RoomCounts}` : '0'})
                </button>
              </div>
              {/* tab 內容 */}
              {activeTab === 1 && (
                <div className="flex flex-wrap -my-3 mb-[60px] lg:-mx-3">
                  {noTourData ? (
                    <Image
                      width={394}
                      height={437}
                      alt="圖片"
                      src={'/no-data.png'}
                      className="mx-auto pt-[80px]"
                    />
                  ) : (
                    moreTourData?.map((item) => {
                      return (
                        <div
                          key={item.TourId}
                          className="w-full py-3 cursor-pointer z-0 lg:w-1/2 lg:px-3"
                        >
                          <TourCard
                            id={item.TourId}
                            likes={item.Likes}
                            countAttr={item.AttrCounts}
                            tourName={item.TourName}
                            isLike={true}
                            showLike
                            creator={''}
                            showCreator={false}
                            imagesUrl={item.ImageUrl}
                            showDelete
                            onClick={() => {
                              setDeleteConfirm(!deleteConfirm)
                              setTourId(item.TourId)
                            }}
                          />
                        </div>
                      )
                    })
                  )}
                  {/* GoToTop */}
                  {toTop && (
                    <button
                      type="button"
                      className="fixed bottom-5 right-5 text-primary-dark w-[60px] h-[60px] rounded-full shadow-[1px_1px_15px_1px_rgba(0,0,0,0.16)] hover:bg-primary-dark hover:duration-500 hover:text-white hover:-translate-y-2"
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth',
                        })
                      }}
                    >
                      <MdKeyboardArrowUp className="text-3xl mx-auto" />
                    </button>
                  )}
                </div>
              )}
              {activeTab === 2 && (
                <div className="flex flex-wrap -my-3 mb-[60px] lg:-mx-3">
                  {noRoomData ? (
                    <Image
                      width={394}
                      height={437}
                      alt="圖片"
                      src={'/no-data.png'}
                      className="mx-auto pt-[80px]"
                    />
                  ) : (
                    moreRoomData?.map((item) => {
                      return (
                        <div
                          key={item.RoomGuid}
                          className="w-full py-3 lg:w-1/2 lg:px-3 cursor-pointer"
                        >
                          <TourCard
                            likes={0}
                            tourName={item.RoomName}
                            countAttr={item.AttrCounts}
                            isLike={false}
                            showLike={false}
                            creator={item.CreaterName}
                            showCreator
                            imagesUrl={item.ImageUrl}
                            room={true}
                            roomId={item.RoomGuid}
                            showDelete
                            onClick={() => {
                              setDeleteConfirm(!deleteConfirm)
                              setRoomGuid(item.RoomGuid)
                            }}
                          />
                        </div>
                      )
                    })
                  )}
                  {/* GoToTop */}
                  {toTop && (
                    <button
                      type="button"
                      className="fixed bottom-5 right-5 text-primary-dark w-[60px] h-[60px] rounded-full shadow-[isLoading(0,0,0,0.16)] hover:bg-primary-dark hover:duration-500 hover:text-white hover:-translate-y-2"
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth',
                        })
                      }}
                    >
                      <MdKeyboardArrowUp className="text-3xl mx-auto" />
                    </button>
                  )}
                </div>
              )}
              {isLoading && <p className="text-lg text-center">loading...</p>}
            </div>
          </div>
        </MemberLayout>
      </div>
    </>
  )
}
