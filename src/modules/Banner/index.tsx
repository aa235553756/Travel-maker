import React, { useEffect, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import {
  defaultValues,
  DistrictName,
  AttrCounts,
  Transports,
} from '@/util/selectData'
import TypeLabel from './TypeLabel'
import BannerSelectorMobile from '@/modules/Banner/BannerSelectorMobile'
import BannerTitle from '@/modules/Banner/BannerTitle'
import OpenFormBtn from '@/common/components/OpenFormBtn'
import { defaultValueProp } from '@/util/types'
import { useRouter } from 'next/router'

export default function Banner() {
  const router = useRouter()
  // 這邊是ReactHookForm，有分電腦版,手機版
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<defaultValueProp>({
    defaultValues,
  })
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    watch: watch2,
    setValue: setValue2,
    formState: { errors: errors2 },
  } = useForm<defaultValueProp>({
    defaultValues,
  })
  const formId = 'banner-form'
  const formIdMobile = 'banner-form-mobile'
  // 這邊打POST,取得隨機行程 (鄰近為true要處理經緯度)
  const onSubmit = async (data: defaultValueProp) => {
    // 缺geo,故先判斷鄰近值,在做函式返回newData
    const newData = data.nearBy ? handleNearBy(true) : handleNearBy(false)
    // alert(JSON.stringify(newData))
    setScreen(!screen)

    function handleNearBy(bool: boolean) {
      let newData
      // 目前只有false狀態
      if (!bool) {
        // 取得google定位，設定經緯度
        newData = { Nlat: 0, Elong: 0, ...data }
        // 取得鎖點(懶人頁較簡易）
        newData.AttractionId = Array(4).fill(0)
        //刪除鄰近
        delete newData.nearBy
      }
      return newData
    }

    // 這邊就算找不到景點也會導航到/random-tour
    router.push({
      pathname: '/random-tour',
      query: {
        data: JSON.stringify(newData),
      },
    })
  }

  // state
  const [isHidden, setIsHidden] = useState(true)

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

  const handleErrors = (e: { preventDefault: () => void }) => {
    // 判斷2個都為false時
    if (!watch('nearBy') && !watch('DistrictName').length) {
      alert('錯誤，表單填寫不完整 區域')
      e.preventDefault()
      return
    }
    // 判斷有無沒填寫
    if (Object.keys(errors).length) {
      alert('錯誤，表單填寫不完整 Type')
    }
  }
  // 表單2
  const handleErrors2 = (e: { preventDefault: () => void }) => {
    // 判斷2個都為false時
    if (!watch2('nearBy') && !watch2('DistrictName').length) {
      alert('錯誤，表單填寫不完整 區域')
      e.preventDefault()
      return
    }
    // 判斷有無沒填寫
    if (Object.keys(errors2).length) {
      alert('錯誤，表單填寫不完整 Type')
    }
  }

  const [screen, setScreen] = useState(false)

  useEffect(() => {
    if (isHidden) {
      document.body.style.overflow = 'auto'
    }
  }, [isHidden])

  return (
    // bg圖片待討論，給設計看2560px
    <div className="bg-banner mt-[-64px] pt-[64px] md:pt-[120px] md:mt-[-120px] lg:h-screen xl:h-auto bg-right bg-no-repeat">
      {/* loading動畫示範 */}
      {screen && (
        <div className="bg-glass-45 top-0 fixed w-screen h-screen z-50">
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-full h-[200px] w-[200px] bg-primary text-xl animate-pulse">
            <span className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white">
              loading
            </span>
          </div>
        </div>
      )}

      <div className="container">
        <div className="w-full lg:w-2/3 mx-auto pt-16 xl:pt-20 pb-16 md:pb-36">
          <BannerTitle />
          {/* 電腦版行程類別 */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            id={formId}
            className="hidden md:block mb-4"
          >
            <TypeLabel register={register} watch={watch} setValue={setValue} />
          </form>

          {/* 手機版行程類別 */}
          <form onSubmit={handleSubmit2(onSubmit)} id={formIdMobile}>
            <div className="flex md:hidden space-x-2 mb-4 overflow-scroll md:overflow-auto">
              <TypeLabel
                register={register2}
                watch={watch2}
                setValue={setValue2}
              />
            </div>
          </form>

          {/* 電腦版toggle下拉-按鈕 */}
          <div className="hidden w-full rounded-xl md:h-[86px] md:bg-glass-45 md:flex md:p-4">
            <a
              href="#bannerTitle"
              className="bg-white text-[#9F9F9F] rounded-xl w-2/5 px-5 py-4 flex items-center justify-between md:text-xl"
              onClick={() => {
                toggleState()
              }}
            >
              行程/距離
              <BsChevronDown />
            </a>
            <a
              href="#bannerTitle"
              className="bg-white text-[#9F9F9F] ml-5 rounded-xl w-2/5 px-5 py-4 flex items-center justify-between md:text-xl"
              onClick={() => {
                areaToggleState()
              }}
            >
              請選擇區域
              <BsChevronDown />
            </a>
            {/* 電腦版開始規劃按鈕 */}
            <button
              form={formId}
              className="w-1/5 ml-6 bg-primary text-white px-4 block rounded-md md:text-xl"
              onClick={handleErrors}
            >
              開始規劃
            </button>
          </div>
          {/* 手機版toggle篩選表單 */}
          <div className="md:mb-6 mb-4 md:hidden">
            <OpenFormBtn setIsHidden={setIsHidden} isHidden={isHidden} />
          </div>
          {/* 手機版開始規劃按鈕 */}
          <button
            form={formIdMobile}
            className="block p-[5.5px] ml-auto text-white bg-glass-45 rounded-xl md:hidden"
            onClick={handleErrors2}
          >
            <div className="py-2 px-4 bg-primary rounded-lg">開始規劃</div>
          </button>
          {/* 電腦版選擇行程/距離 下拉選單 */}
          <div className="w-full relative">
            <form
              className={
                isToggle
                  ? 'absolute z-10 px-5 py-6 bg-[#d7d7d7] hidden md:block'
                  : 'hidden'
              }
            >
              {/* 選擇行程 */}
              <p className="text-xl mb-2 font-bold">
                選擇行程<span>(必選)</span>
              </p>
              <div className="flex space-x-5 mb-5">
                {AttrCounts.map((item, index) => {
                  let className = 'w-20 py-1 border text-center'
                  className +=
                    watch('AttrCounts') === item.value ? ' border-red-600' : ''
                  return (
                    <label key={index} className={className}>
                      <input
                        type="radio"
                        className="hidden"
                        {...register('AttrCounts', { required: true })}
                        value={item.value}
                        defaultChecked={item.checked}
                      />
                      {item.name}
                    </label>
                  )
                })}
              </div>
              {/* 選擇交通工具 */}
              <p className="text-xl mb-2 font-bold">選擇交通工具</p>
              <div className="flex space-x-5 mb-6">
                {Transports.map((item, index) => {
                  let className = 'w-20 py-1 border text-center'
                  // 判斷表單是否有相同值，加上對應className
                  className +=
                    watch('Transports') === item.value ? ' border-red-600' : ''
                  return (
                    <label key={index} className={className}>
                      <input
                        type="radio"
                        className="hidden"
                        {...register('Transports', { required: true })}
                        value={item.value}
                        defaultChecked={item.checked}
                      />
                      {item.name}
                    </label>
                  )
                })}
              </div>
              <hr className="mb-6" />
              <button
                type="button"
                className="px-7 py-3 bg-[#ccc] block ml-auto"
                onClick={() => {
                  areaToggleState()
                }}
              >
                OK！下一步
              </button>
            </form>
          </div>

          {/* 電腦版選擇區域 下拉選單 */}

          <div className="w-full relative">
            <form
              className={
                areaToggle
                  ? 'absolute z-10 px-5 py-6 bg-[#d7d7d7] hidden md:block'
                  : 'hidden'
              }
            >
              {/* 選擇區域複選 */}
              <p className="text-xl mb-2 font-bold">
                選擇區域<span>(複選)</span>
              </p>
              {/* 鄰近Label */}
              {/* 這邊為了做判斷，而一定要使用陣列回傳  */}
              {[''].map((index) => {
                let className = 'block w-20 py-1 mb-5 border text-center'
                // 判斷表單值，賦予對應className
                className += watch('nearBy') ? ' border-red-600' : ''
                return (
                  <label key={index} className={className}>
                    <input
                      type="checkbox"
                      className="hidden"
                      {...register('nearBy')}
                      onClick={() => {
                        setValue('DistrictName', [])
                      }}
                    />
                    鄰近
                  </label>
                )
              })}

              <hr className="mb-5" />
              {/* 區域Label */}
              <div className="flex flex-wrap mb-1">
                {DistrictName.map((item, index) => {
                  const DistrictName = { ...register('DistrictName') }
                  let className = 'w-20 py-1 border text-center mr-5 mb-5'
                  className += watch('DistrictName').includes(item)
                    ? ' border-red-600'
                    : ''
                  const handleOnChange = (
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    function setCurrentValue(bool: boolean) {
                      DistrictName.onChange(e)
                      const data = watch('DistrictName')
                      setValue('nearBy', false)
                      // 篩選data，設定表單
                      setValue(
                        'DistrictName',
                        data.filter((item) => {
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
                    <label key={index} className={className}>
                      <input
                        type="checkbox"
                        className="hidden"
                        value={item}
                        {...register('DistrictName')}
                        onChange={handleOnChange}
                      />
                      {item}
                    </label>
                  )
                })}
              </div>
              <hr className="mb-6" />
              {/* OK按鈕 */}
              <button
                className="px-7 py-3 bg-[#ccc] block ml-auto"
                type="button"
                onClick={() => {
                  areaToggleState()
                }}
              >
                OK！開始規劃
              </button>
            </form>
          </div>

          {/* 手機版顯示下拉選單 Modal */}
          <BannerSelectorMobile
            isHidden={isHidden}
            setIsHidden={setIsHidden}
            formIdMobile={formIdMobile}
            register={register2}
            watch={watch2}
            setValue={setValue2}
            handleErrors={handleErrors2}
          />
        </div>
      </div>
    </div>
  )
}

//todo
// ?重要
// 任務拆分
// 寫出geo Promise，按下鄰近按鈕時取得or送出時
// 測試 假資料 & 真資料版本
// 重設selectData
// 優化程式碼成 function (目的是newData後 送出表單)
// 送出後跳轉至規劃並呈現三張圖 (首先確定路由)

// ?次要
// 限制最多三個選項
// 按下ok或下一個後，把字印回下拉選單中 (使用者體驗，晚做)

// !geoPromise
// const geoPromise = new Promise<void>((reslove, reject) => {
//   navigator.geolocation.getCurrentPosition(
//     (data) => {
//       const latitude = data.coords.latitude
//       const longitude = data.coords.longitude
//       console.log('緯度：', latitude)
//       console.log('經度：', longitude)
//       reslove()
//     },
//     () => {
//       reject()
//     }
//   )
// })
