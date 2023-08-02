import SearchButton from '@/common/components/searchButton'
import React, { useState } from 'react'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import {
  BsBookmarkCheck,
  BsBookmarkX,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs'
import { getCookie } from 'cookies-next'
import AttrCard from '@/common/components/card/AttrCard'
import { CustomModal } from '@/common/components/CustomModal'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface Attractions {
  IsCollect: boolean
  AttractionId: number
  AttractionName: string
  CityDistrict: string
  AverageScore: number
  Category: string[]
  ImageUrl: string
}

interface HotAttrProps {
  TotalPages: number
  TotalItem: number
  Attractions: Attractions[]
}

interface RoomDataProp {
  RoomGuid: string
  RoomName: string
  IsExisted: boolean
}

export async function getServerSideProps({
  req,
  res,
}: {
  req: undefined
  res: undefined
}) {
  try {
    const token = getCookie('auth', { res, req })
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers.Authorization = `${token}`
    }

    // 【API】給參數搜尋景點
    const resHotAttrData = await fetch(
      `${process.env.NEXT_PUBLIC_baseUrl}/attractions/search?Page=1`,
      {
        headers: {
          Authorization: `${token ?? undefined}`,
        },
      }
    )
    const hotAttrData = await resHotAttrData.json()

    if (resHotAttrData.ok) {
      return {
        props: {
          hotAttrData,
        },
      }
    }
    throw new Error('不知名錯誤')
  } catch (error) {
    return {
      props: {
        data: {},
      },
    }
  }
}

export default function HotTopics({
  hotAttrData,
}: {
  hotAttrData: HotAttrProps
}) {
  // 搜尋 Select
  const TypeOptions = [
    { value: '城市走走', label: '城市走走' },
    { value: '拍照聖地', label: '拍照聖地' },
    { value: '放鬆療癒', label: '放鬆療癒' },
    { value: '夜間首選', label: '夜間首選' },
    { value: '文藝青年', label: '文藝青年' },
    { value: '親子互動', label: '親子互動' },
    { value: '冒險活潑', label: '冒險活潑' },
  ]
  const AreaOptions = [
    { value: '中山區', label: '中山區' },
    { value: '大安區', label: '大安區' },
    { value: '信義區', label: '信義區' },
    { value: '士林區', label: '士林區' },
    { value: '大同區', label: '大同區' },
    { value: '萬華區', label: '萬華區' },
    { value: '松山區', label: '松山區' },
    { value: '文山區', label: '文山區' },
    { value: '內湖區', label: '內湖區' },
    { value: '北投區', label: '北投區' },
    { value: '南港區', label: '南港區' },
    { value: '中正區', label: '中正區' },
  ]

  const [tabPos, setTabPos] = useState('景點')
  const router = useRouter()

  const token = getCookie('auth')
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers.Authorization = `${token}`
  }

  //  ----------------- 有關景點的分隔線 -----------------
  const [attrData, setAttrData] = useState(hotAttrData.Attractions)
  // console.log('景點卡片', attrData)

  // 給參數搜尋景點
  const [selectedType, setSelectedType] = useState<string[]>([])
  const [selectedDistrict, setSelectedDistrict] = useState<string[]>([])
  const [keyWordValue, setKeyWordValue] = useState('')

  const baseAttrUrl = `${process.env.NEXT_PUBLIC_baseUrl}/attractions/search`

  // 将 type 和 district 的值轉為 &=
  const typeParams = selectedType
    .map((type) => `Type=${encodeURIComponent(type)}`)
    .join('&')
  const districtParams = selectedDistrict
    .map((district) => `District=${encodeURIComponent(district)}`)
    .join('&')
  const keyWordParams = keyWordValue
    ? `&Keyword=${encodeURIComponent(keyWordValue)}`
    : ''

  const queryParams = `?&${typeParams}&${districtParams}&${keyWordParams}`

  // 取得景點下一頁資訊
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState(0)
  const [attrPage, setAttrPage] = useState(hotAttrData.TotalPages)

  const [noData, setNoData] = useState(false)

  // 控制換頁 & 點擊搜尋查詢景點
  const handleAttrPageClick = async (data: { selected: number }) => {
    //【API】給參數搜尋景點
    const resSearchAttrData = await fetch(
      `${baseAttrUrl}${queryParams}&Page=${data.selected + 1}`,
      {
        method: 'GET',
        headers,
      }
    )
    const searchAttrData = await resSearchAttrData.json()

    if (resSearchAttrData.ok) {
      setAttrData(searchAttrData.Attractions)
      setAttrPage(searchAttrData.TotalPages)
      setCurrentPage(data.selected)
      setNoData(false)
    }
    if (!resSearchAttrData.ok) {
      setNoData(true)
    }
  }

  // 收藏 & 加入行程 彈窗
  const [modal, setModal] = useState(false)
  const [collectModal, setCollectModal] = useState(false)
  const [attrCollectSuccess, setAttrCollectSuccess] = useState(false)
  const [attrCollectCancel, setAttrCollectCancel] = useState(false)
  // 渲染每張卡片的收藏彈窗內容
  const [collectContent, setCollectContent] = useState(false)

  // 收藏 & 取消收藏景點
  const handleCollectAttr = async (
    AttractionId: number,
    IsCollect: boolean,
    index: number
  ) => {
    if (!token) {
      alert('請先登入，自動跳轉中...')
      return
    }
    if (!IsCollect) {
      //【API】收藏景點
      const resCollectAttrData = await fetch(
        `${process.env.NEXT_PUBLIC_baseUrl}/attractions/${AttractionId}/collect`,
        {
          method: 'POST',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            AttractionId: AttractionId,
            IsCollect: !IsCollect,
          }),
        }
      )
      const collectAttrData = await resCollectAttrData.json()

      if (resCollectAttrData.ok) {
        setAttrData(attrData)
        attrData[index].IsCollect = !IsCollect
        setAttrCollectSuccess(!attrCollectSuccess)
      }
      if (!collectAttrData) {
        return
      }
    } else if (IsCollect) {
      //【API】取消收藏景點
      const resCancelCollectAttrData = await fetch(
        `${process.env.NEXT_PUBLIC_baseUrl}/attractions/${AttractionId}/collect`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            AttractionId: AttractionId,
            IsCollect: !IsCollect,
          }),
        }
      )
      const cancelCollectAttrData = await resCancelCollectAttrData.json()

      if (resCancelCollectAttrData.ok) {
        setAttrData(attrData)
        attrData[index].IsCollect = !IsCollect
        setAttrCollectCancel(!attrCollectCancel)
      }

      if (!cancelCollectAttrData) {
        return
      }
    }
  }

  // 取得房間名稱
  const [roomData, setRoomData] = useState<RoomDataProp[] | undefined>([])
  const handleGetRoomData = async (AttractionId: number) => {
    if (!token) {
      alert('請先登入，自動跳轉中...')
      return
    }
    // 【API】主揪.被揪加景點進房間前需要get所在的房間
    const resGetRoomData = await fetch(
      `${process.env.NEXT_PUBLIC_baseUrl}/rooms/getRooms/${AttractionId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    const getRoomData = await resGetRoomData.json()
    setRoomData(getRoomData)
  }

  // 加景點進房間
  const [addAttrId, setAddAttrId] = useState(0)
  const handleAddAttr = async (RoomGuid: string, addAttrId: number) => {
    if (!token) {
      alert('請先登入，自動跳轉中...')
      return
    }
    //【API】主揪.被揪加景點進房間
    const resAddAttrData = await fetch(
      `${process.env.NEXT_PUBLIC_baseUrl}/rooms/addAttractions`,
      {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          RoomGuid: RoomGuid,
          AttractionId: addAttrId,
          IsExisted: true,
        }),
      }
    )
    const addAttrData = await resAddAttrData.json()

    if (resAddAttrData.ok) {
      handleGetRoomData(addAttrId)
      alert(addAttrData.Message)
    }

    if (!resAddAttrData.ok) {
      alert(addAttrData.Message)
    }
  }

  return (
    <>
      <Head>
        <title>Travel Maker | 熱門話題</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Group 340.png" />
      </Head>

      <div className="container pt-[104px] pb-[100px] md:pt-20 md:pb-[160px]">
        {/* 三個Select */}
        <div className="flex mb-7 flex-wrap md:mb-11 md:flex-nowrap md:space-x-6">
          <Select
            instanceId="selectbox"
            options={TypeOptions}
            placeholder="類別"
            className="w-full mb-7 md:mb-0 md:w-1/4"
            isMulti={true}
            onChange={(type) => {
              // 3個state
              // console.log('item', type)
              const typeValue = type.map((type) => type.value)
              setSelectedType(typeValue)
            }}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                // 用法
                borderColor: state.isFocused ? 'grey' : 'red',
                height: '100%',
                borderRadius: '12px',
              }),
            }}
          />
          <Select
            instanceId="selectbox"
            options={AreaOptions}
            placeholder="區域"
            isMulti={true}
            className="w-full mb-7 md:mb-0 md:w-1/4"
            onChange={(district) => {
              const districtValue = district.map((district) => district.value)
              setSelectedDistrict(districtValue)
            }}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                height: '100%',
                borderRadius: '12px',
              }),
            }}
          />
          <div>
            <input
              type="text"
              placeholder="請輸入關鍵字"
              value={keyWordValue}
              onChange={(e) => {
                setKeyWordValue(e.target.value)
              }}
              className=" border border-[#cccccc] placeholder-[#808080]  rounded-xl p-2 h-full focus:outline-none focus:bg-white focus:border-[#2684ff] focus:border-2"
            />
          </div>
          <SearchButton
            onClick={() => {
              handleAttrPageClick({ selected: 0 })
            }}
          />
        </div>
        {/* 切換tab籤 */}
        <ul className="flex mb-10 md:mb-15">
          {['行程', '景點', '遊記'].map((item, index) => {
            return (
              <li
                key={index}
                className={`duration-150 py-4 w-[25%] md:w-1/6 text-center md:text-xl border-b cursor-pointer
              ${tabPos === item ? `border-primary text-primary` : null}`}
                onClick={() => {
                  setTabPos(item)
                  if (item === '行程') {
                    router.push('/hot-topics/tours')
                  }
                  if (item === '景點') {
                    router.push('/hot-topics/attractions')
                  }
                  if (item === '遊記') {
                    router.push('/hot-topics/blogs')
                  }
                }}
              >
                {item}
              </li>
            )
          })}

          <div className="flex-grow border-b"></div>
        </ul>

        {/* 景點卡片 */}
        {tabPos === '景點' && (
          <div>
            {noData ? (
              <Image
                width={394}
                height={437}
                alt="圖片"
                src={'/no-data.png'}
                className="mx-auto pt-[80px]"
              />
            ) : (
              <div>
                {/* 卡片內容 */}
                <div className="flex flex-wrap -my-5 mb-[100px] lg:-mx-3">
                  {attrData?.map((item, index) => {
                    return (
                      <div
                        key={item.AttractionId}
                        className="w-full py-5 lg:w-1/3 lg:px-3"
                      >
                        <AttrCard
                          id={item.AttractionId}
                          showSelect
                          showCollect={item.IsCollect}
                          district={item.CityDistrict}
                          attractName={item.AttractionName}
                          rating={item.AverageScore}
                          imagesUrl={item.ImageUrl}
                          type={item.Category}
                          // 新增景點
                          onClick={async () => {
                            setModal(!modal)
                            handleGetRoomData(item.AttractionId)
                            setRoomData(roomData)
                            setAddAttrId(item.AttractionId)
                          }}
                          // 收藏景點
                          onClick1={() => {
                            if (item.IsCollect) {
                              setCollectModal(!collectModal)
                              setCollectContent(!collectContent)
                            } else if (!item.IsCollect) {
                              setCollectModal(!collectModal)
                              setCollectContent(!collectContent)
                            }
                            handleCollectAttr(
                              item.AttractionId,
                              item.IsCollect,
                              index
                            )
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
                {/* 頁籤元件 */}
                <div className="flex justify-center mt-8">
                  <ReactPaginate
                    previousLabel={
                      <span className="mx-2 w-[32px] h-[32px] border flex justify-center items-center border-[#D7D7D7] bg-white rounded-tl-md rounded-bl-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <BsChevronLeft />
                      </span>
                    }
                    nextLabel={
                      <span className="mx-2 w-[32px] h-[32px] border flex justify-center items-center border-[#D7D7D7] bg-white rounded-tr-md rounded-br-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <BsChevronRight />
                      </span>
                    }
                    breakClassName={
                      'mx-2 w-[32px] h-[32px] border flex justify-center items-center border-[#D7D7D7] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    }
                    breakLabel={<span className="">...</span>}
                    pageCount={attrPage}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={5}
                    onPageChange={handleAttrPageClick}
                    containerClassName="flex"
                    pageClassName="mx-2 w-[32px] h-[32px] border flex justify-center items-center border-[#D7D7D7] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    activeLinkClassName="w-[32px] h-[32px] flex justify-center items-center bg-gray-200 bg-primary text-white"
                    disabledClassName="opacity-50 cursor-not-allowed"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      })
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* 景點加入房間 Modal */}
        <CustomModal modal={modal} setModal={setModal} wrapper>
          <div className="w-[260px] min-h-[260px] p-7 bg-white rounded-xl ">
            {/* 標題 */}
            <h4 className="text-xl mb-2">選擇要加入的行程</h4>
            <hr />
            {/* 按鈕 */}
            <div className="flex flex-col space-y-3 mt-3 pr-3 h-[200px] overflow-y-auto">
              {roomData?.map((item) => {
                // const isActive = addTourTagStyle[item.RoomGuid]
                return (
                  <button
                    className={`${
                      item.IsExisted
                        ? 'bg-primary text-white'
                        : 'border-gray-A8 text-gray-A8'
                    } w-full block border px-2 py-1 rounded-xl `}
                    onClick={() => {
                      handleAddAttr(item.RoomGuid, addAttrId)
                    }}
                    key={item.RoomGuid}
                  >
                    {item.RoomName}
                  </button>
                )
              })}
            </div>
          </div>
        </CustomModal>

        {/* 景點收藏成功提醒 Modal */}
        <CustomModal
          modal={attrCollectSuccess}
          setModal={setAttrCollectSuccess}
          wrapper
        >
          <div className="w-[408px] h-[288px] bg-white flex flex-col justify-center items-center space-y-6 rounded-xl">
            <BsBookmarkCheck className="text-[64px] text-[#74c041]" />
            <p className="text-2xl">收藏景點成功</p>
          </div>
        </CustomModal>

        {/* 景點取消收藏提醒 Modal */}
        <CustomModal
          modal={attrCollectCancel}
          setModal={setAttrCollectCancel}
          wrapper
        >
          <div className="w-[408px] h-[288px] bg-white flex flex-col justify-center items-center space-y-6 rounded-xl">
            <BsBookmarkX className="text-[64px] text-highlight" />
            <p className="text-2xl">取消收藏景點</p>
          </div>
        </CustomModal>
      </div>
    </>
  )
}
