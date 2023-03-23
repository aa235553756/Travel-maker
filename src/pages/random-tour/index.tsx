import LazySortable from '@/common/components/LazySortable'
import MoreJourney from '@/modules/JourneyPage/MoreJourney'
import SelectSide from '@/modules/JourneyPage/SelectSide'
import { IFormInput } from '@/util/types'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { BsLink45Deg, BsHeart, BsPlusLg } from 'react-icons/bs'

export default function RandomTourIndex() {
  const { register, handleSubmit } = useForm<IFormInput>()
  // 這邊打POST，取得隨機行程
  const formId = 'random-tour-form'
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  return (
    <div className="container pt-20 pb-[160px]">
      <div className="flex mb-[180px]">
        {/* 篩選器及其按鈕 */}
        <div className="mr-6 hidden md:block">
          <SelectSide
            formId={formId}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
          />
          <button form={formId} className="py-4 w-full bg-[#737373] text-white">
            隨機產生行程
          </button>
        </div>
        {/* 拖拉 */}
        <div className="flex flex-col">
          {/* 懶人行程連結 */}
          <h2 className="!hidden inline-flex px-1 -my-1 items-center mb-3 text-xl border rounded-md">
            <BsLink45Deg className="mr-2 text-2xl" />
            複製連結
          </h2>
          {/* 房間行程連結，應該兩邊都一樣 */}
          <h2 className="flex items-center mb-3 text-xl font-bold">
            <BsLink45Deg className="mr-2 text-lg border w-[28px] h-[28px] rounded-md" />
            行程名稱：美食吃透透
          </h2>
          {/* 拖拉 */}
          <div className="mb-6 max-lg:max-w-[396px] max-lg:overflow-x-scroll max-lg:mb-4">
            <LazySortable />
          </div>
          {/* 地圖 */}
          <div className="mb-12 h-full bg-[#D7D7D7]">我是地圖</div>
          <div className="ml-auto">
            <button className="inline-flex mr-11 justify-center px-10 py-4 items-center bg-[#D9D9D9]">
              <BsPlusLg className="text-lg mr-2" />
              邀請
            </button>
            <button className="inline-flex justify-center px-10 py-4 items-center bg-[#D9D9D9]">
              <BsHeart className="text-lg mr-2" />
              收藏
            </button>
          </div>
        </div>
      </div>
      <MoreJourney />
    </div>
  )
}
