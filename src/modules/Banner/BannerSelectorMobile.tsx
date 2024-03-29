import React from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import { DistrictName, AttrCounts, Transports } from '@/util/selectData'
import {
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
  UseFormHandleSubmit,
  SubmitHandler,
  FieldErrors,
} from 'react-hook-form'
import { defaultValueProp } from '@/util/types'

interface BannerSelectorMobileProp {
  isHidden: boolean
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
  formIdMobile: string
  register: UseFormRegister<defaultValueProp>
  watch: UseFormWatch<defaultValueProp>
  setValue: UseFormSetValue<defaultValueProp>
  handleSubmit: UseFormHandleSubmit<defaultValueProp>
  onSubmit: SubmitHandler<defaultValueProp>
  errors: FieldErrors
  // handleErrors: (e: { preventDefault: () => void }) => void
}

// 這邊有兩顆按鈕會觸發onSubmit
export default function BannerSelectorMobile({
  isHidden,
  setIsHidden,
  watch,
  setValue,
  register,
  formIdMobile,
  // handleErrors,
  handleSubmit,
  onSubmit,
  errors,
}: BannerSelectorMobileProp) {
  const handleErrors = (e: { preventDefault: () => void }) => {
    // 判斷2個都為false時
    if (!watch('nearBy') && !watch('DistrictName').length) {
      alert('錯誤，表單填寫不完整 區域')
      e.preventDefault()
      return
    }
    // 判斷有無沒填寫
    // if (!errors) {
    //   return
    // }

    if (Object.keys(errors).length) {
      alert('錯誤，表單填寫不完整 Type')
    }
  }
  return (
    <>
      <form
        id={formIdMobile}
        className={`${isHidden ? 'hidden' : ''}  z-40 relative`}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <div className="fixed px-10 py-8 top-0 right-0 w-screen h-screen z-[10]"> */}
        {isHidden ? null : (
          <div
            className="fixed top-0 bg-[rgba(0,0,0,0.2)] left-0 w-full h-full !overflow-y-scroll z-[-1]"
            onClick={() => {
              setIsHidden(!isHidden)
            }}
          ></div>
        )}
        {/* 表單本體 */}
        <div className="w-[345px] h-[80vh] fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 flex flex-col">
          <button
            className="bg-white w-full py-2 pr-1 items-center border-b flex justify-end text-2xl"
            onClick={(e) => {
              e.preventDefault()
              setIsHidden(!isHidden)
            }}
          >
            <MdOutlineCancel />
          </button>
          <div className="bg-white overflow-y-scroll z-[10]">
            <div className="mb-4">
              <p className="px-4 py-2 border-b-2 font-bold">選擇行程(必選)</p>
              {AttrCounts.map((item, index) => {
                return (
                  <label key={index} className="flex justify-between px-4 py-2">
                    {item.name}
                    <input
                      type="radio"
                      value={item.value}
                      {...register('AttrCounts', { required: true })}
                    />
                  </label>
                )
              })}
            </div>
            <div className="mb-4">
              <p className="px-4 py-2 border-y-2 font-bold">選擇交通工具</p>
              {Transports.map((item, index) => {
                return (
                  <label key={index} className="flex justify-between px-4 py-2">
                    {item.name}
                    <input
                      type="radio"
                      value={item.value}
                      {...register('Transports', { required: true })}
                    />
                  </label>
                )
              })}
            </div>

            <div className="mb-6">
              <p className="px-4 py-2 border-y-2 font-bold">選擇區域(必選)</p>
              <label className="flex justify-between px-4 py-2 border-b-2">
                鄰近
                <input
                  type="checkbox"
                  {...register('nearBy')}
                  onClick={() => {
                    setValue('DistrictName', [])
                  }}
                />
              </label>
              {DistrictName.map((item, index) => {
                const handleOnChange = (
                  e: React.ChangeEvent<HTMLInputElement>
                ) => {
                  const DistrictName = { ...register('DistrictName') }
                  function setCurrentValue(bool: boolean) {
                    DistrictName.onChange(e)
                    const data = watch('DistrictName')
                    setValue('nearBy', false)
                    // 篩選data，設定表單
                    setValue(
                      'DistrictName',
                      data.filter((item: string) => {
                        return bool ? item !== '不限' : item === '不限'
                      })
                    )
                  }
                  // 判斷是否為'不限'，執行不同參數函式
                  item !== '不限'
                    ? setCurrentValue(true)
                    : setCurrentValue(false)
                }
                return (
                  <label key={index} className="flex justify-between px-4 py-2">
                    {item}
                    <input
                      type="checkbox"
                      value={item}
                      {...register('DistrictName')}
                      onChange={handleOnChange}
                    />
                  </label>
                )
              })}
            </div>

            {/* <hr /> */}
          </div>
          <div className="flex bg-white border-t justify-between px-4 py-4">
            <button type="button" className="underline">
              清除全部(預設值)
            </button>
            <button
              // type="button"
              // form={formIdMobile}
              className="bg-[#ccc] px-8 py-2"
              onClick={(e) => {
                handleErrors(e)
              }}
            >
              送出
            </button>
          </div>
        </div>
        {/* </div> */}
      </form>
    </>
  )
}

//todo
// *先所有變成map
// *優化-z-index矯正
// *優化-送出那行矯正
// *-表單錯誤alert
// *1鄰近區域判斷
// *送出按鈕handle
// *晚點再修667高度差距
// *tsProp
// 彈出的感覺
// 清除按鈕-設為初始值
