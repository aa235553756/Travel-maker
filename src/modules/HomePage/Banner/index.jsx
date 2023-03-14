import BannerTitle from './components/BannerTitle'
import React, { useEffect, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import {
  MdDirectionsRun,
  MdBarChart,
  MdDeck,
  MdLocalBar,
  MdAccountBalance,
  MdDirectionsBike,
} from 'react-icons/md'
import { FaCameraRetro } from 'react-icons/fa'
import { HiUserGroup } from 'react-icons/hi'
import { useForm } from 'react-hook-form'
import { area, journeys, transports } from '../../../util/selectData'
import TypeLabel from './components/TypeLabel'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BannerSelectorMobile } from './components/BannerSelectorMobile'

export default function Banner() {
  // 這邊是ReactHookForm，有分電腦版,手機版
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register, handleSubmit, watch, setValue } = useForm()
  const onSubmit = (data) => console.log(data)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmitMobile = (data) => console.log(data)

  const [isHidden, setIsHidden] = useState(true)

  const iconArray = [
    <MdDirectionsRun key={0} />,
    <MdBarChart key={1} />,
    <FaCameraRetro key={2} />,
    <MdDeck key={3} />,
    <MdLocalBar key={4} />,
    <MdAccountBalance key={5} />,
    <HiUserGroup key={6} />,
    <MdDirectionsBike key={7} />,
  ]

  // Toggle 選擇行程 & 距離下拉選單 以及 Toggle 選擇區域下拉選單
  const [isToggle, setIsToggle] = useState(false)
  const [areaToggle, setAreaToggle] = useState(false)
  const toggleState = () => {
    setIsToggle(!isToggle)
    setAreaToggle(false)
  }
  const areaToggleState = () => {
    setAreaToggle(!areaToggle)
    setIsToggle(false)
  }

  useEffect(() => {
    if (isHidden) {
      document.body.style.overflow = 'auto'
    }
  }, [isHidden])

  return (
    <div className="container">
      <div className="pb-[60px] w-full mx-auto lg:w-2/3 md:pb-[100px]">
        <BannerTitle />

        {/* 行程類別 */}
        <form onSubmit={handleSubmit(onSubmit)} id="TypeForm">
          <div className="hidden md:flex space-x-4 mb-4 overflow-scroll md:overflow-auto">
            {iconArray.map((item, index) => {
              return (
                <TypeLabel
                  key={index}
                  index={index}
                  item={item}
                  register={register}
                  watch={watch}
                />
              )
            })}
          </div>
        </form>

        {/* 手機版行程類別 */}
        {/* <form onSubmit={handleSubmit(onSubmitMobile)} id="TypeFormMobile">
          <div className="flex space-x-4 mb-4 overflow-scroll md:overflow-auto">
            {iconArray.map((item, index) => {
              return (
                <TypeLabel
                  key={index}
                  index={index}
                  item={item}
                  register={register}
                />
              )
            })}
          </div>
        </form> */}

        {/* 搜尋欄 */}
        <div className="hidden w-full md:h-[86px] md:bg-[#ccc] md:flex md:p-4 md:space-x-4">
          <button
            className="bg-[#d7d7d7] w-2/5 px-5 py-4 flex items-center justify-between"
            onClick={() => {
              toggleState()
            }}
          >
            行程/距離
            <BsChevronDown />
          </button>
          <button
            className="bg-[#d7d7d7] w-2/5 px-5 py-4 flex items-center justify-between"
            onClick={() => {
              areaToggleState()
            }}
          >
            請選擇區域
            <BsChevronDown />
          </button>
          {/* 電腦版開始規劃按鈕 */}
          <button
            type="submit"
            form="TypeForm"
            className="w-1/5 bg-[#d7d7d7] p-4 block"
          >
            開始規劃
          </button>
        </div>
        <button
          className="bg-[#d7d7d7] w-full px-5 py-4 mb-6 flex items-center justify-between md:hidden"
          onClick={() => {
            setIsHidden(!isHidden)
            document.body.style.overflow = 'hidden'
          }}
        >
          請選擇行程 / 距離 / 區域
          <BsChevronDown />
        </button>
        {/* 手機版開始規劃按鈕 */}
        <button
          form="TypeFormMoblie"
          className="w-full bg-[#d7d7d7] p-4 md:hidden"
        >
          開始規劃
        </button>

        {/* 選擇行程 & 距離下拉選單 */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className={isToggle ? 'w-full bg-[#d7d7d7] px-5 py-6' : 'hidden'}
          >
            {/* 選擇行程 */}
            <p className="text-xl mb-2 font-bold">
              選擇行程<span>(必選)</span>
            </p>
            <div className="flex space-x-5 mb-5">
              {journeys.map((item, index) => (
                <label key={index} className="w-20 py-1 border text-center">
                  <input
                    type="radio"
                    {...register('journeys')}
                    value={item}
                    defaultChecked={index === 1 ? true : null}
                  />
                  {item}
                </label>
              ))}
            </div>
            {/* 選擇交通工具 */}
            <p className="text-xl mb-2 font-bold">選擇交通工具</p>
            <div className="flex space-x-5 mb-6">
              {transports.map((item, index) => (
                <label key={index} className="w-20 py-1 border text-center">
                  <input
                    type="radio"
                    {...register('transports')}
                    value={item}
                    defaultChecked={index === 0 ? true : false}
                  />
                  {item}
                </label>
              ))}
            </div>
            <hr className="mb-6" />
            <button
              className="px-7 py-3 bg-[#ccc] block ml-auto"
              onClick={() => {
                toggleState()
              }}
            >
              OK
            </button>
          </div>
        </form>

        {/* 選擇區域下拉選單 */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className={areaToggle ? 'w-full bg-[#d7d7d7] px-5 py-6' : 'hidden'}
          >
            <p className="text-xl mb-2 font-bold">
              選擇區域<span>(複選)</span>
            </p>
            <div className="flex space-x-5 mb-5">
              <label className="w-20 py-1 border border-black text-center">
                <input
                  type="checkbox"
                  {...register('nearBy')}
                  onClick={() => {
                    setValue('area', false)
                  }}
                />
                鄰近
              </label>
            </div>
            <hr className="mb-5" />
            <div className="flex flex-wrap space-x-5 space-y-5 mb-6">
              {area.map((item, index) => {
                const marginTopAry = [1, 2, 3, 4, 5]
                const marginLeftAry = [6, 12]
                let className
                if (marginTopAry.includes(index)) {
                  className = 'w-20 py-1 border text-center !mt-0'
                } else if (marginLeftAry.includes(index)) {
                  className = 'w-20 py-1 border text-center !ml-0'
                } else {
                  className = 'w-20 py-1 border text-center '
                }

                return (
                  <label key={index} className={className}>
                    <input
                      type="checkbox"
                      value={item}
                      {...register('area')}
                      onClick={() => {
                        setValue('nearBy', false)
                      }}
                      defaultChecked={index === 0 ? true : false}
                    />
                    {item}
                  </label>
                )
              })}
            </div>
            <hr className="mb-6" />
            <button
              className="px-7 py-3 bg-[#ccc] block ml-auto"
              onClick={() => {
                areaToggleState()
              }}
            >
              OK
            </button>
          </div>
        </form>

        {/* 手機版顯示下拉選單 Modal */}
        <BannerSelectorMobile
          onSubmit={onSubmitMobile}
          isHidden={isHidden}
          setIsHidden={setIsHidden}
        />
      </div>
    </div>
  )
}

//todo
// 把type東西加回另一個表單
