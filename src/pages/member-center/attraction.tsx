import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import MemberLayout from '@/modules/MemberCenterPage/MemberLayout'
import AttrCard from '@/common/components/card/AttrCard'
import {
  MemberCountProps,
  AttrDataProps,
  RoomDataProps,
} from '@/util/memberTypes'
import { CustomModal } from '@/common/components/CustomModal'
import { BsBookmarkX, BsXCircle } from 'react-icons/bs'
import { MdKeyboardArrowUp } from 'react-icons/md'

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
  // 無資料時
  const [isNo, setIsNo] = useState(false)

  // 將行程及房間數量往 MemberLayout 傳
  const [countData, setCountData] = useState(memberCountData)
  useEffect(() => {
    setCountData(countData)
    setIsNo(!isNo)
  }, [countData])

  const [modal, setModal] = useState(false)

  const [addTourTagStyle, setAddTourTagStyle] = useState<{
    [index: number]: boolean
  }>({})

  const [collectCancel, setCollectCancel] = useState(false)
  const [modalText, setModalText] = useState('取消收藏')

  // 獲取更多資料
  const token = getCookie('auth')
  const [moreAttrData, setMoreAttrData] = useState(attrData.AttractionData)
  const [page, setPage] = useState(2)
  const [isLoading, setIsLoading] = useState(false)
  const [noData, setNoData] = useState(false)
  const [toTop, setToTop] = useState(false)

  const getMoreAttrData = async (page: number) => {
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

    const newAttrs = await res.json()

    if (newAttrs.TourData) {
      setMoreAttrData((prevAttrs) => [...prevAttrs, ...newAttrs.TourData])
      setPage((prevPage) => prevPage + 1)
      setIsLoading(true)
    }

    if (newAttrs.Message === '已無我的行程') {
      setIsLoading(false)
      setNoData(true)
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
        getMoreAttrData(page)
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
  }, [moreAttrData])

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
              {moreAttrData?.map((item) => {
                return (
                  <div
                    key={item.AttractionId}
                    className="w-full py-3 lg:w-1/2 lg:px-3"
                  >
                    <AttrCard
                      id={item.AttractionId}
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
                        setCollectCancel(!collectCancel)
                      }}
                    />
                  </div>
                )
              })}
              {isNo && (
                <p className="text-lg text-center text-gray-B8">無資料</p>
              )}
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
            {roomData?.RoomData?.map((item, index) => {
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
      {/* 無行程提醒 */}
      <CustomModal modal={noData} setModal={setNoData} wrapper>
        <div className="w-[300px] p-7 bg-white rounded-xl">
          <div className="flex flex-col items-center space-y-4">
            <BsXCircle className="text-5xl text-highlight" />
            <span className="text-2xl">已無行程</span>
          </div>
        </div>
      </CustomModal>

      {/* 收藏提醒 */}
      <CustomModal modal={collectCancel} setModal={setCollectCancel} wrapper>
        <div className="w-[408px] h-[288px] bg-white flex flex-col justify-center items-center space-y-6 rounded-xl">
          <BsBookmarkX className="text-[64px] text-highlight" />
          <p className="text-2xl">{modalText}</p>
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
              共有{memberCountData.AttCounts}個收藏景點
            </div>
          </div>
          {/* 詳細資訊區 */}
          <div>
            <div className="flex flex-wrap -my-3 mb-[60px] justify-center lg:-mx-3">
              {moreAttrData?.map((item) => {
                return (
                  <div
                    key={item.AttractionId}
                    className="w-full py-3 cursor-pointer lg:w-1/2 lg:px-3 hover:opacity-80 hover:duration-500 hover:-translate-y-1"
                  >
                    <AttrCard
                      id={item.AttractionId}
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
                        setCollectCancel(!collectCancel)
                        setModalText('取消收藏')
                      }}
                    />
                  </div>
                )
              })}

              {isNo && (
                <p className="text-lg text-center text-gray-B8">無資料</p>
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
            {isLoading && <p className="text-lg text-center">loading...</p>}
          </div>
        </div>
      </MemberLayout>
    </div>
  )
}
