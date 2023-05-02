import SearchButton from '@/common/components/searchButton'
import React, { useRef, useState } from 'react'
import Select from 'react-select'
import TourCard from '@/common/components/card/TourCard'
import ReactPaginate from 'react-paginate'
import {
  BsBookmarkCheck,
  BsBookmarkX,
  BsChevronLeft,
  BsChevronRight,
  BsFillCheckCircleFill,
  BsFillXCircleFill,
} from 'react-icons/bs'
import { getCookie } from 'cookies-next'
import AttrCard from '@/common/components/card/AttrCard'
import BlogCard from '@/common/components/card/BlogCard'
import { CustomModal } from '@/common/components/CustomModal'
import Head from 'next/head'
import router from 'next/router'
import LoadingAnimate from '@/common/components/LoadingAnimate'
import Image from 'next/image'

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

interface Tours {
  IsLike: boolean
  TourId: number
  TourName: string
  AttrCounts: number
  Likes: number
  ImageUrl: string[]
}

interface HotTourProps {
  TotalPages: number
  TotalItem: number
  Tours: Tours[]
}

interface Blogs {
  IsCollect: boolean
  BlogGuid: string
  Title: string
  Cover: string
  UserGuid: string
  UserName: string
  ProfilePicture: string
  InitDate: string
  Sees: number
  Likes: number
  Comments: number
  Category: string[]
}

interface HotBlogProps {
  TotalPages: number
  TotalItem: number
  Tours: Blogs[]
}

export async function getServerSideProps({
  req,
  res,
  query,
}: {
  req: undefined
  res: undefined
  query: { Keyword: string }
}) {
  try {
    const token = getCookie('auth', { res, req })
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers.Authorization = `${token}`
    }

    // 【API】給參數搜尋行程
    const resHotTourData = await fetch(
      `https://travelmaker.rocket-coding.com/api/tours/search?&Keyword=${
        query.Keyword ? query.Keyword : ''
      }&Page=1`,
      {
        headers,
      }
    )
    const hotTourData = await resHotTourData.json()

    // 【API】給參數搜尋景點
    const resHotAttrData = await fetch(
      `https://travelmaker.rocket-coding.com/api/attractions/search?&Keyword=${
        query.Keyword ? query.Keyword : ''
      }&Page=1`,
      {
        headers,
      }
    )
    const hotAttrData = await resHotAttrData.json()

    // 【API】給參數搜尋遊記
    const resHotBlogData = await fetch(
      `https://travelmaker.rocket-coding.com/api/blogs/search?&Keyword=${
        query.Keyword ? query.Keyword : ''
      }&Page=1`,
      {
        headers,
      }
    )
    const hotBlogData = await resHotBlogData.json()

    if (resHotTourData.ok && resHotAttrData.ok && resHotBlogData.ok) {
      return {
        props: {
          hotTourData,
          hotAttrData,
          hotBlogData,
          query,
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
  hotTourData,
  hotAttrData,
  hotBlogData,
}: {
  hotTourData: HotTourProps
  hotAttrData: HotAttrProps
  hotBlogData: HotBlogProps
  Keyword: string
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

  const [tabPos, setTabPos] = useState('行程')

  const token = getCookie('auth')
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `${token}`
  }

  //  ----------------- 有關搜尋 -----------------
  const [tourData, setTourData] = useState(
    hotTourData?.Tours ? hotTourData?.Tours : []
  )
  const [attrData, setAttrData] = useState(
    hotAttrData?.Attractions ? hotAttrData?.Attractions : []
  )
  const [blogData, setBlogData] = useState(
    hotBlogData?.Tours ? hotBlogData?.Tours : []
  )
  const [tourNoData, setTourNoData] = useState(false)
  const [attrNoData, setAttrNoData] = useState(false)
  const [blogNoData, setBlogNoData] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // hotTourData.Tours ? hotTourData.Tours : ''

  // 取得景點下一頁資訊
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState(0)
  const [tourPage, setTourPage] = useState(hotTourData?.TotalPages)
  const [attrPage, setAttrPage] = useState(hotAttrData?.TotalPages)
  const [blogPage, setBlogPage] = useState(hotBlogData?.TotalPages)

  // 搜尋條件
  const [selectedType, setSelectedType] = useState<string[]>([])
  const [selectedDistrict, setSelectedDistrict] = useState<string[]>([])

  const baseTourUrl = 'https://travelmaker.rocket-coding.com/api/tours/search'
  const baseAttrUrl =
    'https://travelmaker.rocket-coding.com/api/attractions/search'
  const baseBlogUrl = 'https://travelmaker.rocket-coding.com/api/blogs/search'

  // 關鍵字搜尋
  const refKeyWord = useRef<HTMLInputElement>(null)

  // 接 API 用，将 type 和 district 的值轉為 &=
  const typeParams = selectedType
    .map((type) => `Type=${encodeURIComponent(type)}`)
    .join('&')
  const districtParams = selectedDistrict
    .map((district) => `District=${encodeURIComponent(district)}`)
    .join('&')

  const queryParams = `?&${typeParams}&${districtParams}`

  //  ----------------- 有關行程的分隔線 -----------------
  // 控制換頁 & 點擊搜尋查詢行程
  const handleTourPageClick = async (data: { selected: number }) => {
    setIsLoading(true)

    const keyWordValue = refKeyWord.current?.value

    // 搜尋時更改路由
    const Type = selectedType ?? ''
    const District = selectedDistrict ?? ''
    const Keyword = keyWordValue === '' ? '' : keyWordValue
    const Page = data.selected + 1
    router.push({
      pathname: '/hot-topics',
      query: { Type, District, Keyword, Page },
    })

    try {
      // 【API】給參數搜尋行程
      const resSearchTourData = await fetch(
        `${baseTourUrl}${queryParams}&Keyword=${keyWordValue}&Page=${
          data.selected + 1
        }`,
        {
          headers,
        }
      )
      const searchTourData = await resSearchTourData.json()

      if (resSearchTourData.ok) {
        setTourData(searchTourData.Tours)
        setTourPage(searchTourData.TotalPages)
        // setTourNoData(false)
      } else {
        if (!resSearchTourData.ok) {
          setTourNoData(true)
        }
      }
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false)
  }

  // 複製行程
  const [loginConflirm, setLoginConflirm] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  // 對行程按愛心或取消愛心
  const handleClickLiked = async (IsLike: boolean, TourId: number) => {
    if (!IsLike) {
      //【API】用戶把行程按愛心
      fetch(`https://travelmaker.rocket-coding.com/api/tours/${TourId}/like`, {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      })
      const newTours = tourData.map((item) => {
        if (item.TourId === TourId) {
          return { ...item, Likes: item.Likes + 1 }
        } else {
          return item
        }
      })
      setTourData(newTours)
    } else if (IsLike) {
      //【API】用戶取消行程愛心
      fetch(`https://travelmaker.rocket-coding.com/api/tours/${TourId}/like`, {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      })
      const newTours = tourData.map((item) => {
        if (item.TourId === TourId) {
          return { ...item, Likes: item.Likes - 1 }
        } else {
          return item
        }
      })
      setTourData(newTours)
    }
  }

  // 複製行程
  const handleCopyTour = async (TourId: number) => {
    //【API】用戶複製行程
    const resCopyTourData = await fetch(
      `https://travelmaker.rocket-coding.com/api/tours/${TourId}/duplicate`,
      {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify('未命名的行程'),
      }
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const copyTourData = await resCopyTourData.json()

    if (resCopyTourData.ok && token) {
      setCopySuccess(true)
    }
  }

  //  ----------------- 有關景點的分隔線 -----------------
  // 控制換頁 & 點擊搜尋查詢景點
  const handleAttrPageClick = async (data: { selected: number }) => {
    setIsLoading(true)

    const keyWordValue = refKeyWord.current?.value

    // 搜尋時更改路由
    const Type = selectedType ?? ''
    const District = selectedDistrict ?? ''
    const Keyword = keyWordValue === '' ? '' : keyWordValue
    const Page = data.selected + 1
    router.push({
      pathname: '/hot-topics',
      query: { Type, District, Keyword, Page },
    })

    try {
      // 【API】給參數搜尋景點
      const resSearchAttrData = await fetch(
        `${baseAttrUrl}${queryParams}&Keyword=${keyWordValue}&Page=${
          data.selected + 1
        }`,
        {
          headers,
        }
      )
      const searchAttrData = await resSearchAttrData.json()

      if (resSearchAttrData.ok) {
        setAttrData(searchAttrData.Attractions)
        setAttrPage(searchAttrData.TotalPages)
        // setTourNoData(false)
        // setAttrNoData(false)
        // setBlogNoData(false)
      } else {
        if (!resSearchAttrData.ok) {
          setAttrNoData(true)
        }
      }
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false)
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
    if (!IsCollect) {
      //【API】收藏景點
      const resCollectAttrData = await fetch(
        `https://travelmaker.rocket-coding.com/api/attractions/${AttractionId}/collect`,
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
        `https://travelmaker.rocket-coding.com/api/attractions/${AttractionId}/collect`,
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
  const [success, setSuccess] = useState(true)
  const [modalText, setModalText] = useState('登入成功，自動跳轉...')
  const [addTourSuccess, setAddTourSuccess] = useState(false)

  const handleGetRoomData = async (AttractionId: number) => {
    setRoomData([])

    // 【API】主揪.被揪加景點進房間前需要get所在的房間
    const resGetRoomData = await fetch(
      `https://travelmaker.rocket-coding.com/api/rooms/getRooms/${AttractionId}`,
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
    //【API】主揪.被揪加景點進房間
    const resAddAttrData = await fetch(
      `https://travelmaker.rocket-coding.com/api/rooms/addAttractions`,
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
      setAddTourSuccess(true)
      setSuccess(true)
      setModalText(addAttrData.Message)
    }

    if (!resAddAttrData.ok) {
      setAddTourSuccess(true)
      setSuccess(false)
      setModalText(addAttrData.Message)
    }
  }

  //  ----------------- 有關遊記的分隔線 -----------------
  // 控制換頁& 點擊搜尋查詢遊記
  const handleBlogPageClick = async (data: { selected: number }) => {
    setIsLoading(true)

    const keyWordValue = refKeyWord.current?.value

    // 搜尋時更改路由
    const Type = selectedType ?? ''
    const District = selectedDistrict ?? ''
    const Keyword = keyWordValue === '' ? '' : keyWordValue
    const Page = data.selected + 1
    router.push({
      pathname: '/hot-topics',
      query: { Type, District, Keyword, Page },
    })

    try {
      // 【API】給參數搜尋景點
      const resSearchBlogData = await fetch(
        `${baseBlogUrl}${queryParams}&Keyword=${keyWordValue}&Page=${
          data.selected + 1
        }`,
        {
          headers,
        }
      )
      const searchBlogData = await resSearchBlogData.json()

      if (resSearchBlogData.ok) {
        setBlogData(searchBlogData.Tours)
        setBlogPage(searchBlogData.TotalPages)
        setCurrentPage(data.selected)
        setBlogNoData(false)
      } else {
        if (!resSearchBlogData.ok) {
          setBlogNoData(true)
        }
      }
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false)
  }

  // 收藏彈窗
  const [blogCollectSuccess, setBlogCollectSuccess] = useState(false)
  const [blogCollectCancel, setBlogCollectCancel] = useState(false)

  // 收藏 & 取消收藏遊記
  const handleCollectBlog = async (
    BlogGuid: string,
    IsCollect: boolean,
    index: number
  ) => {
    if (!IsCollect) {
      //【API】收藏遊記
      const resCollectBlogData = await fetch(
        `https://travelmaker.rocket-coding.com/api/blogs/${BlogGuid}/collect`,
        {
          method: 'POST',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            BlogGuid: BlogGuid,
            IsCollect: !IsCollect,
          }),
        }
      )
      const collectBlogData = await resCollectBlogData.json()

      if (resCollectBlogData.ok) {
        setBlogData(blogData)
        blogData[index].IsCollect = !IsCollect
        setBlogCollectSuccess(!blogCollectSuccess)
      }
      if (!collectBlogData) {
        return
      }
    } else if (IsCollect) {
      //【API】取消收藏遊記
      const resCancelCollectBlogData = await fetch(
        `https://travelmaker.rocket-coding.com/api/blogs/${BlogGuid}/collect`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            BlogGuid: BlogGuid,
            IsCollect: !IsCollect,
          }),
        }
      )
      const cancelCollectBlogData = await resCancelCollectBlogData.json()

      if (resCancelCollectBlogData.ok) {
        setBlogData(blogData)
        blogData[index].IsCollect = !IsCollect
        setBlogCollectCancel(!blogCollectCancel)
      }

      if (!cancelCollectBlogData) {
        return
      }
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

      {isLoading && <LoadingAnimate isLoading={isLoading} />}

      <div className="container pt-[104px] pb-[100px] md:pt-20 md:pb-[160px]">
        {/* 三個Select */}
        <div className="flex mb-7 flex-wrap md:mb-11 md:flex-nowrap md:space-x-6">
          <Select
            instanceId="selectbox"
            options={TypeOptions}
            placeholder="類別"
            className="w-full mb-7 md:mb-0 md:w-1/4 z-40"
            isMulti={true}
            onChange={(type) => {
              const typeValue = type.map((type) => type.value)
              setSelectedType(typeValue)
            }}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                // 用法
                // borderColor: state.isFocused ? 'grey' : 'red',
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
            className="w-full mb-7 md:mb-0 md:w-1/4 z-40"
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
              ref={refKeyWord}
              className=" border border-[#cccccc] placeholder-[#808080]  rounded-xl p-2 h-full focus:outline-none focus:bg-white focus:border-[#2684ff] focus:border-2"
            />
          </div>
          <SearchButton
            onClick={() => {
              handleAttrPageClick({ selected: 0 })
              handleTourPageClick({ selected: 0 })
              handleBlogPageClick({ selected: 0 })
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
                  setTourData(hotTourData.Tours)
                  setAttrData(hotAttrData.Attractions)
                  setBlogData(hotBlogData.Tours)
                }}
              >
                {item}
              </li>
            )
          })}

          <div className="flex-grow border-b"></div>
        </ul>

        {/* 行程卡片 */}
        {tabPos === '行程' && (
          <div>
            {tourNoData ? (
              <Image
                width={394}
                height={437}
                alt="圖片"
                src={'/no-data.png'}
                className="mx-auto pt-[80px]"
              />
            ) : (
              <div>
                <div className="flex flex-wrap -my-5 mb-[100px] lg:-mx-3">
                  {tourData?.map((item) => {
                    return (
                      <div
                        key={item.TourId}
                        className="w-full py-5 lg:w-1/3 lg:px-3"
                      >
                        <TourCard
                          id={item.TourId}
                          likes={item.Likes}
                          countAttr={item.AttrCounts}
                          tourName={item.TourName}
                          isLike={item.IsLike}
                          imagesUrl={item.ImageUrl}
                          showCopy
                          onClickTourLike={() => {
                            handleClickLiked(item.IsLike, item.TourId)
                          }}
                          onCopyTour={() => {
                            if (token) {
                              handleCopyTour(item.TourId)
                            } else if (!token) {
                              setLoginConflirm(true)
                              setTimeout(() => {
                                router.push('/login')
                              }, 2000)
                              return
                            }
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
                    pageCount={tourPage}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={5}
                    onPageChange={handleTourPageClick}
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

        {/* 複製行程成功 */}
        <CustomModal modal={copySuccess} setModal={setCopySuccess} wrapper>
          <div className="w-[408px] h-[288px] bg-white flex flex-col justify-center items-center space-y-6 rounded-xl">
            <BsFillCheckCircleFill className="text-[64px] text-[#74c041]" />
            <p className="text-2xl">複製行程成功</p>
            <span className="text-lg px-4">
              請至會員中心 - 我的收藏行程(一般模式)查看
            </span>
          </div>
        </CustomModal>

        {/* 複製行程失敗 */}
        <CustomModal
          modal={loginConflirm}
          setModal={setLoginConflirm}
          typeConfirm
          typeConfirmWarnIcon
          overflowOpen
          typeConfirmText={'請先登入，自動跳轉中...'}
          onConfirm={() => {
            setLoginConflirm(false)
          }}
        />
        {/* 景點卡片 */}
        {tabPos === '景點' && (
          <div>
            {attrNoData ? (
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
                            if (token) {
                              setModal(!modal)
                              handleGetRoomData(item.AttractionId)
                              setAddAttrId(item.AttractionId)
                            } else if (!token) {
                              setLoginConflirm(true)
                              setTimeout(() => {
                                router.push('/login')
                              }, 2000)
                              return
                            }
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
                            if (token) {
                              handleCollectAttr(
                                item.AttractionId,
                                item.IsCollect,
                                index
                              )
                            } else if (!token) {
                              setLoginConflirm(true)
                              setTimeout(() => {
                                router.push('/login')
                              }, 2000)
                              return
                            }
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

        {/* 佳景店進房間成功或失敗訊息 */}
        <CustomModal
          modal={addTourSuccess}
          setModal={setAddTourSuccess}
          wrapper
        >
          <div className="w-[408px] h-[288px] bg-white flex flex-col justify-center items-center space-y-6 rounded-xl">
            {success ? (
              <BsFillCheckCircleFill className="text-[64px] text-[#74C041]" />
            ) : (
              <BsFillXCircleFill className="text-[64px] text-highlight" />
            )}
            <p className="text-2xl">{modalText}</p>
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

        {/* 遊記卡片 */}
        {tabPos === '遊記' && (
          <div>
            {blogNoData ? (
              <Image
                width={394}
                height={437}
                alt="圖片"
                src={'/no-data.png'}
                className="mx-auto pt-[80px]"
              />
            ) : (
              <div>
                <div className="flex flex-wrap -my-5 mb-[100px] lg:-mx-3">
                  {blogData?.map((item, index) => {
                    return (
                      <div
                        key={item.BlogGuid}
                        className="w-full py-5 lg:w-1/3 lg:px-3"
                      >
                        <BlogCard
                          id={item.BlogGuid}
                          showCollect={item.IsCollect}
                          blogName={item.Title}
                          poster={item.UserName}
                          time={'2023-03-12 10:00'}
                          type={item.Category}
                          blogImage={item.Cover?.toString() ?? ''}
                          userImage={item.ProfilePicture?.toString() ?? ''}
                          view={item.Sees}
                          like={item.Likes}
                          comment={item.Comments}
                          // 收藏遊記
                          onClick={async () => {
                            if (item.IsCollect) {
                              setCollectModal(!collectModal)
                              setCollectContent(!collectContent)
                            } else if (!item.IsCollect) {
                              setCollectModal(!collectModal)
                              setCollectContent(!collectContent)
                            }
                            if (token) {
                              handleCollectBlog(
                                item.BlogGuid,
                                item.IsCollect,
                                index
                              )
                            } else if (!token) {
                              setLoginConflirm(true)
                              setTimeout(() => {
                                router.push('/login')
                              }, 2000)
                              return
                            }
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
                    pageCount={blogPage}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={5}
                    onPageChange={handleBlogPageClick}
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

        {/* 遊記收藏成功提醒 Modal */}
        <CustomModal
          modal={blogCollectSuccess}
          setModal={setBlogCollectSuccess}
          wrapper
        >
          <div className="w-[408px] h-[288px] bg-white flex flex-col justify-center items-center space-y-6 rounded-xl">
            <BsBookmarkCheck className="text-[64px] text-[#74c041]" />
            <p className="text-2xl">收藏遊記成功</p>
          </div>
        </CustomModal>

        {/* 遊記取消收藏提醒 Modal */}
        <CustomModal
          modal={blogCollectCancel}
          setModal={setBlogCollectCancel}
          wrapper
        >
          <div className="w-[408px] h-[288px] bg-white flex flex-col justify-center items-center space-y-6 rounded-xl">
            <BsBookmarkX className="text-[64px] text-highlight" />
            <p className="text-2xl">取消收藏遊記</p>
          </div>
        </CustomModal>
      </div>
    </>
  )
}
