import React, { useState } from 'react'
import VoteDate from '@/modules/JourneyPage/VoteDate'
import InvitePeople from '@/modules/JourneyPage/InvitePeople'
import MoreJourney from '@/modules/JourneyPage/MoreJourney'
import SelectSide from '@/modules/JourneyPage/SelectSide'
import Sortable from '@/common/components/Sortable'
import { BsLink45Deg, BsList } from 'react-icons/bs'
import { MdSave, MdOutlineCancel } from 'react-icons/md'
import { defaultValueProp } from '@/util/types'
import { useForm, SubmitHandler } from 'react-hook-form'

export default function PlanningTour() {
  const [tabPos, setTabPos] = useState('備用景點')
  const { register, handleSubmit, setValue, watch } =
    useForm<defaultValueProp>()
  // 這邊打POST取得隨機行程
  const formId = 'planning-tour-form'
  const onSubmit: SubmitHandler<defaultValueProp> = (data) => console.log(data)

  return (
    <div>
      <div className="container">
        <div className="block mt-4 lg:flex lg:space-x-6 lg:mb-20 md:mt-[80px]">
          <VoteDate />
          <InvitePeople />
        </div>
        {/* 中間拖拉 & 篩選區塊 */}
        <div className="flex mb-[200px]">
          {/* 篩選器及其按鈕 */}
          <div className="mr-6 hidden md:block">
            <SelectSide
              formId={formId}
              handleSubmit={handleSubmit}
              register={register}
              onSubmit={onSubmit}
              setValue={setValue}
              watch={watch}
            />
            <button
              type="submit"
              form={formId}
              className="py-4 w-full bg-gray-73 text-white"
            >
              隨機產生行程
            </button>
          </div>
          {/* 拖拉 */}
          <div className="flex flex-col">
            {/* 房間行程連結，應該兩邊都一樣 */}
            <h2 className="flex items-center mb-3 text-xl font-bold">
              <BsLink45Deg className="mr-2 text-lg border w-[28px] h-[28px] rounded-md" />
              行程名稱：美食吃透透
            </h2>
            {/* 拖拉1 max-lg為1280以下出現x軸 */}
            <div className="mb-6 h-full lg:h-auto scrollbar-style max-lg:max-w-[396px] max-lg:overflow-x-scroll max-lg:mb-4">
              <Sortable />
            </div>
            <ul className="flex mb-6">
              {['備用景點', '地圖'].map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`duration-150 pb-4 w-[25%] md:w-1/6 text-center border-b-2 cursor-pointer mb-[2px]
                      ${tabPos === item ? `border-[#1890FF]` : null}`}
                    onClick={() => {
                      setTabPos(item)
                    }}
                  >
                    {item}
                  </li>
                )
              })}

              <div className="flex-grow border-b-2 mb-[2px]"></div>
            </ul>
            {/* 拖拉2，備用景點 & 地圖 */}
            {tabPos === '備用景點' ? (
              <div className="flex flex-wrap mb-12 py-5 px-7 max-h-[312px] scrollbar-style overflow-y-scroll bg-gray-D9">
                {Array(15)
                  .fill('')
                  .map((item, index) => {
                    let className = `flex relative items-center justify-center w-[124px] h-[124px] bg-[#ECECEC] mb-6 mr-10`
                    // 逢4 mr-0
                    if (index % 5 === 4) {
                      className += ' !mr-0'
                    }
                    return (
                      <div key={index} className={className}>
                        <MdOutlineCancel className="absolute text-xl top-1 right-1" />
                        大安森林公園
                        <BsList className="absolute text-xl bottom-1 left-[50%] -translate-x-[50%]" />
                      </div>
                    )
                  })}
              </div>
            ) : (
              <div className="w-full h-full mb-12 bg-gray-D9">我是地圖爹斯</div>
            )}
            <button className="inline-flex justify-center ml-auto px-10 py-4 items-center bg-gray-D9">
              <MdSave className="text-lg mr-2" />
              儲存
            </button>
          </div>
        </div>
        <MoreJourney />
      </div>
    </div>
  )
}
