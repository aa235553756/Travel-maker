import SearchButton from '@/common/components/searchButton'
import React, { useState } from 'react'
import Select from 'react-select'
import TourCard from '@/common/components/card/TourCard'
import ReactPaginate from 'react-paginate'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

export default function HotTopics() {
  const TypeOptions = [
    { value: '城市走走', label: '城市走走' },
    { value: '拍照聖地', label: '拍照聖地' },
    { value: '放鬆療癒', label: '放鬆療癒' },
  ]
  const AreaOptions = [
    { value: '大安區', label: '大安區' },
    { value: '中山區', label: '中山區' },
    { value: '中正區', label: '中正區' },
  ]
  const AttrOptions = [
    { value: '大安森林公園', label: '大安森林公園' },
    { value: '中山蝴蝶園', label: '中山蝴蝶園' },
    { value: '中正藝廊', label: '中正藝廊' },
  ]

  const [tabPos, setTabPos] = useState('行程')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState(0)

  const handlePageClick = (data: { selected: number }) => {
    console.log(data)
    setCurrentPage(data.selected)
  }

  return (
    <div className="container pt-[104px] pb-[100px] md:pt-20 md:pb-[160px]">
      {/* 三個Select */}
      <div className="flex mb-7 flex-wrap md:mb-11 md:flex-nowrap md:space-x-6">
        <Select
          instanceId="selectbox"
          options={TypeOptions}
          placeholder="類別"
          className="w-full mb-7 md:mb-0 md:w-1/4"
          isMulti={true}
          onChange={(item) => {
            console.log(item)
          }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              // 用法
              borderColor: state.isFocused ? 'grey' : 'red',
              height: '60px',
            }),
          }}
        />
        <Select
          instanceId="selectbox"
          options={AreaOptions}
          placeholder="區域"
          isMulti={true}
          className="w-full mb-7 md:mb-0 md:w-1/4"
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              height: '60px',
            }),
          }}
        />
        <Select
          instanceId="selectbox"
          options={AttrOptions}
          isSearchable={true}
          placeholder="請輸入關鍵字"
          className="w-full md:w-1/3 mb-7 md:mb-0"
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              height: '60px',
            }),
          }}
        />

        <SearchButton />
      </div>
      {/* 切換tab籤 */}
      <ul className="flex mb-10 md:mb-15">
        {['行程', '景點', '遊記'].map((item, index) => {
          return (
            <li
              key={index}
              className={`duration-150 py-4 w-[25%] md:w-1/6 text-center md:text-xl border-b cursor-pointer
              ${tabPos === item ? `border-[#1890FF]` : null}`}
              onClick={() => {
                setTabPos(item)
              }}
            >
              {item}
            </li>
          )
        })}

        <div className="flex-grow border-b"></div>
      </ul>

      {/* 各種卡片 */}
      <div className="flex flex-wrap -my-5 mb-[100px] lg:-mx-3">
        {Array(9)
          .fill('')
          .map((item, index) => {
            return (
              <div key={index} className="w-full py-5 lg:w-1/3 lg:px-3">
                <TourCard
                  likes={1.5}
                  countAttr={1}
                  tourName={'大安森林公園'}
                  showLike={true}
                  creator={''}
                  showCreator={false}
                />
              </div>
            )
          })}
      </div>

      {/* 頁籤元件 */}
      <div className="flex justify-center mt-8">
        <ReactPaginate
          previousLabel={
            <span className="mx-2 w-[32px] h-[32px] border flex justify-center items-center border-[#D7D7D7] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <BsChevronLeft />
            </span>
          }
          nextLabel={
            <span className="mx-2 w-[32px] h-[32px] border flex justify-center items-center border-[#D7D7D7] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <BsChevronRight />
            </span>
          }
          breakClassName={
            'mx-2 w-[32px] h-[32px] border flex justify-center items-center border-[#D7D7D7] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }
          breakLabel={<span className="">...</span>}
          pageCount={50}
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName="flex"
          pageClassName="mx-2 w-[32px] h-[32px] border flex justify-center items-center border-[#D7D7D7] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          activeLinkClassName="w-[32px] h-[32px] flex justify-center items-center bg-gray-200 border border-blue-500"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  )
}
