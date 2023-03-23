import React from 'react'
import { tourType, transports, area } from '@/util/selectData'
import { BsListCheck } from 'react-icons/bs'

export default function SelectSide() {
  return (
    <>
      <div>
        <h2 className="flex items-center mb-3 text-xl">
          <BsListCheck className="mr-2 text-2xl" />
          排行程
        </h2>
        <form className="mb-12 md:w-[218px] lg:w-[264px] bg-[#D9D9D9]">
          <h3 className="py-2 px-4">篩選內容</h3>
          <div className="py-1 px-4 bg-[#C4C4C4]">選擇行程（必選）</div>
          <LabelRadio />
          <div className="py-1 px-4 bg-[#C4C4C4]">選擇類型（複選）</div>
          <LableType />
          <div className="py-1 px-4 bg-[#C4C4C4]">選擇交通工具</div>
          <LableTransport />
          <div className="py-1 px-4 bg-[#C4C4C4]">選擇地區（複選）</div>
          <LableArea />
        </form>
      </div>
    </>
  )
}

function LabelRadio({}) {
  return (
    <div className="flex flex-wrap px-4 py-3 pb-5 space-y-4">
      <label className="w-[85px] flex items-center">
        <input name="tourNumber" type="radio" value={2} className="mr-2" />
        2個景點
      </label>
      <label className="ml-4 !mt-0 w-[85px]">
        <input name="tourNumber" type="radio" value={4} className="mr-2" />
        4個景點
      </label>
      <label className="w-[85px]">
        <input name="tourNumber" type="radio" value={6} className="mr-2" />
        6個景點
      </label>
      <label className="ml-4 w-[85px]">
        <input name="tourNumber" type="radio" value={8} className="mr-2" />
        8個景點
      </label>
    </div>
  )
}

function LableType() {
  return (
    <div className="flex flex-wrap px-4 py-3 pb-5 space-y-3">
      {/* tourType map */}
      {tourType.map((item, index) => {
        return (
          <label
            key={index}
            className="ml-4 odd:!ml-0 [&:nth-child(1)]:w-[85px] [&:nth-child(2)]:!mt-0"
          >
            <input
              name="tourNumber"
              type="checkbox"
              value={index}
              className="mr-2"
            />
            {item}
          </label>
        )
      })}
    </div>
  )
}

function LableTransport({}) {
  return (
    <div className="flex flex-wrap px-4 py-3 pb-5 space-y-3">
      {transports.map((item, index) => {
        return (
          <label
            key={index}
            className="w-[85px] ml-4 odd:!ml-0 [&:nth-child(2)]:!mt-0"
          >
            <input
              name="transports"
              type="radio"
              value={item}
              className="mr-2"
            />
            {item}
          </label>
        )
      })}
    </div>
  )
}

function LableArea({}) {
  return (
    <div className="flex flex-wrap px-4 pt-2 pb-5 space-y-3">
      {area.map((item, index) => {
        if (index === 0 || index === 1) {
          return (
            <label
              key={index}
              className="ml-4 odd:!ml-0 w-[85px] [&:nth-child(2)]:!mt-0"
            >
              <input
                name="tourNumber"
                type="radio"
                value={2}
                className="mr-2"
              />
              {item}
            </label>
          )
        }

        return (
          <label
            key={index}
            className="ml-4 odd:!ml-0 w-[85px] [&:nth-child(2)]:!mt-0"
          >
            <input name="area" type="checkbox" value={2} className="mr-2" />
            {item}
          </label>
        )
      })}
    </div>
  )
}
