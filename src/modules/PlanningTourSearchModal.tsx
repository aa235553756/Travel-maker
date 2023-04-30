import React, { useRef, useState } from 'react'
import Select from 'react-select'
import SearchButton from '@/common/components/searchButton'
import ReactPaginate from 'react-paginate'
import AttrCard from '@/common/components/card/AttrCard'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { getCookie } from 'cookies-next'

// =========搜尋 Select=========
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

interface storeTourProp {
  AttractionId: number
  UserGuid: string
  AttractionName: string
  ImageUrl: string
  Order: number
}

interface setStoreToursProp {
  AttractionId: number
  UserGuid: string
  AttractionName: string
  ImageUrl: string
  Order: number
  Elong?: number
  Nlat?: number
}

export default function PlanningTourSearchModal({
  hotAttrData,
  storeTours,
  setStoreTours,
  setUnSaved,
  setSuccessConfirmModal,
  setSuccessConfirmText,
  setSuccessConfirmWarn,
}: {
  hotAttrData: HotAttrProps
  storeTours: storeTourProp[]
  setStoreTours: React.Dispatch<setStoreToursProp[]>
  setUnSaved: React.Dispatch<boolean>
  setSuccessConfirmModal: React.Dispatch<boolean>
  setSuccessConfirmText: React.Dispatch<string>
  setSuccessConfirmWarn: React.Dispatch<boolean>
}) {
  // ======use Cookies=========
  const user = getCookie('user')
    ? JSON.parse(String(getCookie('user')))
    : undefined

  // ======搜尋景點資料state & 查無資料state=========
  const [attrData, setAttrData] = useState(hotAttrData.Attractions)
  const [noData, setNoData] = useState(false)

  // ======給參數搜尋景點=========
  const [selectedType, setSelectedType] = useState<string[]>([])
  const [selectedDistrict, setSelectedDistrict] = useState<string[]>([])
  const keywordRef = useRef<HTMLInputElement>(null)

  // ======取得景點下一頁資訊======
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState(0)
  const [attrPage, setAttrPage] = useState(hotAttrData.TotalPages)

  // ======取得景點下一頁資訊======
  const attrCardDIVRef = useRef<HTMLDivElement>(null)

  return (
    <div className="px-10 max-w-[calc(744px+80px)] min-w-[calc(744px+80px)] /container pt-[56px] pb-[56px] bg-white rounded-md">
      {/* 三個Select */}
      <div className="w-full flex mb-7 flex-wrap md:flex-nowrap md:space-x-6">
        <Select
          instanceId="selectbox"
          options={TypeOptions}
          placeholder="類別"
          className="w-full mb-7 md:mb-0 md:w-1/3"
          isMulti={true}
          onChange={(type) => {
            // 3個state
            console.log('item', type)
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
          className="z-[10] w-full mb-7 md:mb-0 md:w-1/3"
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
            // value={keyWordValue}
            ref={keywordRef}
            // onChange={(e) => {
            //   setKeyWordValue(e.target.value)
            // }}
            className=" border border-[#cccccc] placeholder-[#808080]  rounded-xl p-2 h-full focus:outline-none focus:bg-white focus:border-[#2684ff] focus:border-2"
          />
        </div>
        <SearchButton
          onClick={() => {
            attrCardDIVRef?.current?.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
            handleAttrPageClick({ selected: 0 })
          }}
        />
      </div>
      {/* 切換tab籤 */}
      <ul className="flex mb-10 md:mb-15">
        {['景點'].map((item, index) => {
          return (
            <li
              key={index}
              className="duration-150 py-4 w-[25%] md:w-1/6 text-center md:text-xl border-b cursor-pointer border-primary text-primary"
            >
              {item}
            </li>
          )
        })}

        <div className="flex-grow border-b"></div>
      </ul>

      {/* 景點卡片 */}

      <div>
        {noData ? (
          <p className="text-center text-gray-A8 text-lg lg:-mx-3  min-h-[475px]">
            查無資料，請重新篩選
          </p>
        ) : (
          <div>
            {/* 卡片內容 */}
            <div
              ref={attrCardDIVRef}
              className="flex flex-wrap relative z-0 -my-5 lg:-mx-3 overflow-y-scroll max-h-[455px] min-h-[455px]"
            >
              {attrData.map((item: Attractions, index: number) => {
                //attrData
                return (
                  <div
                    key={item.AttractionId}
                    className="w-full py-5 lg:w-1/2 lg:px-3"
                  >
                    <AttrCard
                      id={item.AttractionId}
                      showSelect
                      hideCollectPlanning
                      showCollect={item.IsCollect}
                      district={item.CityDistrict}
                      attractName={item.AttractionName}
                      rating={item.AverageScore}
                      imagesUrl={item.ImageUrl}
                      type={item.Category}
                      // 新增景點 (加景點進房間)
                      onClick={async () => {
                        const obj = {
                          AttractionId: item.AttractionId,
                          UserGuid: String(user.UserGuid),
                          AttractionName: item.AttractionName,
                          ImageUrl: item.ImageUrl,
                          Order: index + 1,
                        }
                        // ==新增景點至storeTours==
                        setStoreTours([...storeTours, obj])
                        setUnSaved(true)
                        setSuccessConfirmModal(true)
                        setSuccessConfirmWarn(false)
                        setSuccessConfirmText('新增備用景點成功')
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
                pageCount={attrPage} //attrPage
                marginPagesDisplayed={1}
                pageRangeDisplayed={5}
                onPageChange={handleAttrPageClick} //handleAttrPageClick
                containerClassName="flex"
                pageClassName="mx-2 w-[32px] h-[32px] border flex justify-center items-center border-[#D7D7D7] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                activeLinkClassName="w-[32px] h-[32px] flex justify-center items-center bg-gray-200 bg-primary text-white"
                disabledClassName="opacity-50 cursor-not-allowed"
                onClick={() => {
                  attrCardDIVRef?.current?.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  })
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
  // ======handle搜尋按鈕or點擊頁面======
  async function handleAttrPageClick(data: { selected: number }) {
    try {
      // 将 type 和 district 的值轉為 &=
      const typeParams = selectedType
        .map((type) => `Type=${encodeURIComponent(type)}`)
        .join('&')
      const districtParams = selectedDistrict
        .map((district) => `District=${encodeURIComponent(district)}`)
        .join('&')
      const keyWordParams = keywordRef.current?.value
        ? `&Keyword=${encodeURIComponent(keywordRef.current?.value)}`
        : ''
      const queryParams = `?&${typeParams}&${districtParams}&${keyWordParams}`

      //【API】給參數搜尋景點
      const resSearchAttrData = await fetch(
        `https://travelmaker.rocket-coding.com/api/attractions/search${queryParams}&Page=${
          data.selected + 1
        }`,
        {
          method: 'GET',
          headers: {
            Authorization: `${getCookie('auth')}`,
            'Content-Type': 'application/json',
          },
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
    } catch (err) {
      setNoData(true)
      alert(err)
    }
  }
}
