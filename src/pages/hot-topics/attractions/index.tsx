import SearchButton from '@/common/components/searchButton'
import React, { useState } from 'react'
import Select from 'react-select'
import JourneyCard from '@/common/components/JourneyCard'
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
    <div className="container pt-10 pb-[100px] md:pt-20 md:pb-[160px]">
      {/* 三個Select */}
      <div className="flex mb-7 flex-wrap md:mb-11 md:flex-nowrap md:space-x-6">
        <Select
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
      <div className="flex flex-wrap justify-center space-y-10 border-content md:space-x-6 mb-[72px] md:mb-25">
        {Array(9)
          .fill('')
          .map((item, index) => {
            let extraClassName = ''
            // 電腦版判斷
            if (index === 1 || index === 2) {
              extraClassName += 'lg:!mt-0'
            }
            if (index === 3 || index === 6) {
              extraClassName += ' lg:!ml-0'
            }
            // 平板版判斷
            if (index === 1) {
              extraClassName += ' md:!mt-0'
            }
            if (index === 2 || index == 4 || index == 6 || index === 8) {
              // 平板以下ml0
              extraClassName += ' max-lg:!ml-0'
            }

            return (
              <JourneyCard
                key={index}
                favorites={1.5}
                number={1}
                title={'大安森林公園'}
                extraClassName={
                  extraClassName + ' md:w-[calc(50%-12px)] lg:max-w-[360px]'
                }
              />
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
