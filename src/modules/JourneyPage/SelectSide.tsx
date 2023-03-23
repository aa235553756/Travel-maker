import React from 'react'
import { tourType, transports, area, tourNumber } from '@/util/selectData'
import { BsListCheck } from 'react-icons/bs'
import {
  UseFormRegister,
  UseFormHandleSubmit,
  SubmitHandler,
} from 'react-hook-form'
import { IFormInput } from '@/util/types'

interface SelectSideProp {
  formId: string
  register: UseFormRegister<IFormInput>
  handleSubmit: UseFormHandleSubmit<IFormInput>
  onSubmit: SubmitHandler<IFormInput>
}

export default function SelectSide({
  formId,
  handleSubmit,
  register,
  onSubmit,
}: SelectSideProp) {
  // 這邊會有兩頁共用此元件,故RHF往外擺
  return (
    <>
      <div>
        <h2 className="flex items-center mb-3 text-xl">
          <BsListCheck className="mr-2 text-2xl" />
          排行程
        </h2>
        <form
          id={formId}
          onSubmit={handleSubmit(onSubmit)}
          className="mb-12 md:w-[218px] lg:w-[264px] bg-[#D9D9D9]"
        >
          <h3 className="py-2 px-4">篩選內容</h3>
          <div className="py-1 px-4 bg-[#C4C4C4]">選擇行程（必選）</div>
          <LabelRadio register={register} />
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

function LabelRadio({ register }: { register: UseFormRegister<IFormInput> }) {
  return (
    <div className="flex flex-wrap px-4 py-3 pb-5 space-y-4">
      {tourNumber.map((item, index) => {
        return (
          <label
            key={index}
            className="w-[85px] ml-4 odd:!ml-0 flex items-center [&:nth-child(2)]:!mt-0"
          >
            <input
              {...register('Journeys')}
              type="radio"
              defaultChecked={index === 0 ? true : false}
              value={item.value}
              className="mr-2"
            />
            {item.number}
          </label>
        )
      })}
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
