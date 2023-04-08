import Slider from 'react-slick'
import MoreJourney from '@/modules/JourneyPage/MoreJourney'
import SelectSide from '@/modules/JourneyPage/SelectSide'
import { defaultValueProp, randomTourProp } from '@/util/types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsLink45Deg, BsHeart, BsPlusLg, BsListCheck } from 'react-icons/bs'
import { getRandomTours, getShareTours, postTours } from '@/util/tourApi'
import { useRouter } from 'next/router'
import { defaultValues } from '@/util/selectData'
import TypeLabel from '@/modules/Banner/TypeLabel'
import OpenFormBtn from '@/common/components/OpenFormBtn'
import Image from 'next/image'
import BannerSelectorMobile from '@/modules/Banner/BannerSelectorMobile'

export default function RandomTourIndex({
  data: originData,
}: {
  data: randomTourProp[]
}) {
  const router = useRouter()
  console.log(router)

  console.log(originData)
  const [data, setData] = useState(originData)
  const [isHidden, setIsHidden] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, setValue, watch } = useForm<defaultValueProp>(
    { defaultValues: defaultValues }
  )
  const {
    register: register2,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleSubmit: handleSubmit2,
    watch: watch2,
    setValue: setValue2,
    formState: { errors: errors2 },
  } = useForm<defaultValueProp>({
    defaultValues,
  })
  const formIdMobile = 'random-tour-form'
  const handleErrors2 = (e: { preventDefault: () => void }) => {
    // 判斷2個都為false時
    if (!watch('nearBy') && !watch('DistrictName').length) {
      alert('錯誤，表單填寫不完整 區域')
      e.preventDefault()
      return
    }
    // 判斷有無沒填寫
    if (Object.keys(errors2).length) {
      alert('錯誤，表單填寫不完整 Type')
    }
  }
  const formId = 'random-tour-form'

  const settings = {
    // className: 'center',
    // centerMode: true,
    // centerPadding: '60px',
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    // rows: 4,
  }
  const settings2 = {
    // className: 'center',
    // centerMode: true,
    // centerPadding: '60px',
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 4,
  }
  useEffect(() => {
    console.log(data)
    // alert('每次setData,重整google地圖')
  }, [data])

  useEffect(() => {
    if (isHidden) {
      document.body.style.overflow = 'auto'
    }
  }, [isHidden])

  return (
    <div className="container lg:pt-20 pt-12 pb-[160px]">
      {/* 手機版表單 */}
      <BannerSelectorMobile
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        formIdMobile={formIdMobile}
        register={register2}
        watch={watch2}
        setValue={setValue2}
        handleErrors={handleErrors2}
      />
      {/* 手機版上方介面 */}
      <div className="lg:hidden mb-14">
        <div className="mb-5">
          <TypeLabel register={register} setValue={setValue} watch={watch} />
        </div>
        <div className="md:mb-6 mb-5">
          <OpenFormBtn isHidden={isHidden} setIsHidden={setIsHidden} />
        </div>
        <button className="w-full bg-primary text-white py-2 rounded-[10px] mb-6">
          隨機產生行程
        </button>
        <Slider {...settings2}>
          {data.map((item, i) => {
            return (
              <div key={i} className="min-w-[180px] h-[180px] relative">
                <div className="absolute text-white left-2">{i}</div>
                <div className="absolute text-center min-w-[180px] max-w-[180px] bottom-1 left-1/2 translate-x-[-50%] text-white ">
                  {item.AttractionName}
                </div>
                <Image
                  alt=""
                  src={item.ImageUrl}
                  width={652}
                  height={180}
                  className="object-cover w-full h-full"
                />
              </div>
            )
          })}
        </Slider>
      </div>

      <div className="flex flex-wrap mb-[60px] lg:mb-[180px]">
        {/* 排行程及連結 100% */}
        <div className="hidden lg:flex w-full mb-3 space-x-6 items-center bg-red-100">
          {/* 排行程文字 */}
          <div className="lg:w-[264px]">
            <h2 className="hidden lg:flex items-center text-xl">
              <BsListCheck className="mr-2 text-2xl" />
              排行程
            </h2>
          </div>
          {/* 懶人行程連結 */}
          <div className="flex-grow">
            <button
              className="flex px-2 items-center text-xl border border-black rounded-md"
              onClick={handleLink}
            >
              <BsLink45Deg className="mr-2 text-2xl" />
              複製連結
            </button>
          </div>
        </div>
        {/* 篩選器及其按鈕 3/12 */}
        <div className="mr-6 hidden lg:block">
          <SelectSide
            formId={formId}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            setValue={setValue}
            watch={watch}
          />
          <button
            form={formId}
            className="text-lg lg:text-xl py-2 lg:py-3 w-full bg-primary text-white rounded-md"
          >
            隨機產生行程
          </button>
        </div>
        <div className="flex-grow">
          {/* Swiper圖片 */}
          <div className="hidden lg:block max-w-[840px] max-h-[180px] w-full mb-8 ">
            <Slider {...settings}>
              {data.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="min-w-[180px] h-[180px] relative cursor-grab"
                  >
                    <div className="absolute left-2 text-white ">{i + 1}</div>

                    <div className="absolute text-center min-w-[180px] max-w-[180px] bottom-1 left-1/2 translate-x-[-50%] text-red-100 ">
                      {item.AttractionName}
                    </div>
                    <Image
                      alt=""
                      src={item.ImageUrl}
                      width={652}
                      height={180}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )
              })}
            </Slider>
          </div>
          {/* 地圖 */}
          <div className="mb-12 min-h-[336px] lg:min-h-[576px] bg-[#D7D7D7] rounded-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d14459.774055448219!2d121.49936893054726!3d25.035990943540952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x3442a94a4ed4888b%3A0x7880a95f29f4878e!2z5Zyw5bmz57ea5Z-65Zyw!3m2!1d25.0239646!2d121.5094846!4m5!1s0x3442a90e8737b2f7%3A0x6b6ee112e9e7c58b!2z5bCP5ZCz54mb6IKJ6bq1IDEwOOWPsOWMl-W4guiQrOiPr-WNgOa0m-mZveihlzQ1LTEx6Jmf!3m2!1d25.047628399999997!2d121.508326!5e0!3m2!1szh-TW!2stw!4v1680440395475!5m2!1szh-TW!2stw"
              className="w-full h-full min-h-[336px] lg:min-h-[576px] rounded-md"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          {/* 邀請收藏按鈕 */}
          <div className="flex justify-end">
            <button className="inline-flex bg-primary py-2 lg:py-3 px-6 lg:px-10 mr-10 justify-center items-center rounded-md text-white">
              <BsPlusLg className="text-lg mr-2" />
              邀請
            </button>
            <button
              className="inline-flex bg-primary py-2 lg:py-3 px-6 lg:px-10 justify-center items-center rounded-md text-white"
              onClick={hadlePostTour}
            >
              <BsHeart className="text-lg mr-2" />
              收藏
            </button>
          </div>
        </div>
      </div>
      <MoreJourney />
    </div>
  )

  async function onSubmit(data: defaultValueProp) {
    try {
      setLoading(true)
      // 缺geo,故先判斷鄰近值,在做函式返回newData
      const newData = data.nearBy ? handleNearBy(true) : handleNearBy(false)
      alert(JSON.stringify(newData))
      const res = await getRandomTours(newData)
      if (res.ok) {
        const resJSON = await res.json()
        alert(JSON.stringify(resJSON))
        setData(resJSON)
        setLoading(false)
        return
      }
      throw new Error('錯誤,or沒找到景點')
    } catch (err) {
      setLoading(false)
      alert(err)
    }

    function handleNearBy(bool: boolean) {
      let newData
      // 目前只有false狀態，尚缺true狀態
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
  }

  async function handleLink() {
    const idParams = data
      .map((item) => {
        return `id=${item.AttractionId}`
      })
      .join('&')
    // 複製連結
    navigator.clipboard.writeText(
      `http://localhost:3000/random-tour?${idParams}`
    )
  }

  async function hadlePostTour() {
    try {
      // const token = getCookie() 看是要onclick再拿,還是一進來就拿(應該一進來)
      const token =
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VyR3VpZCI6IjA0MWNhOTEyLWJhMjctNDMzNC1iZmNlLTA3YzMyNjYwZTNhNzc1IiwiQWNjb3VudCI6InVzZXJAZXhhbXBsZS5jb20iLCJVc2VyTmFtZSI6IuWwj-aYjiIsIlByb2ZpbGVQaWN0dXJlIjpudWxsLCJFeHAiOiI0LzQvMjAyMyAzOjU4OjAyIEFNIn0.eCE4R1QKfOzud2c7Sgl_MbXTI8iwJpalxDNWrgKrtsgC8qZdGFb1YlQzlKkZsRaKMl17paXPJYQqH6IzTkMzNA'

      // 用戶輸入行程名稱
      const TourName = prompt(
        '即將創建收藏行程，請輸入行程名稱',
        '未命名的行程'
      )
      if (TourName === null || TourName === '') {
        return //break out of the function early
      }
      // 行程id陣列
      const AttractionId = data.map(
        (item: { AttractionId: number }) => item.AttractionId
      )

      const res = await postTours(token, TourName, AttractionId)
      console.log(res.status)

      if (res.ok) {
        //200
        const resJSON = await res.json()
        alert(res.status) //200
        alert(JSON.stringify(resJSON))
        router.push(`random-tour/${resJSON.TourId}`)
        return
      }
      throw new Error('不知名錯誤')
    } catch (err) {
      // 請登入
      alert('錯誤')
      alert(err)
      router.push('/login')
    }
  }
}

export async function getServerSideProps(context: {
  query: { data: string; id: number[] }
}) {
  try {
    // 由首頁送來表單data
    if (context.query.hasOwnProperty('data')) {
      const data = JSON.parse(context.query.data)
      const res = await getRandomTours(data)
      if (res.ok) {
        const resJSON = await res.json()
        return {
          props: {
            data: resJSON,
          },
        }
      }
    }
    // 由網址送來指定id
    if (context.query.hasOwnProperty('id')) {
      const data = context.query.id
        .map((item) => {
          return `id=${item}`
        })
        .join('&')
      const res = await getShareTours(data)
      if (res.ok) {
        const resJSON = await res.json()
        return {
          props: {
            data: resJSON,
          },
        }
      }
    }
    throw new Error('不知名錯誤')
  } catch (err) {
    return {
      props: {
        data: [],
      },
    }
  }
}

// todo 依照用戶這頁可以點擊的順序，來補全
// 先拆嗎??
// 手機版表單被iphone擋到
// 手機版swiper 4個or2個
// header z-index修正

// ?其他
// ServerSideProp 錯誤後如何處理?? (錯誤,體驗,重要) --目前先回傳空陣列
// 切換至其他頁 並回原頁面，要儲存Redux (體驗,重要)
// 並且 表單紀錄也要儲存redux (體驗,最後)
// 沒有匹配到景點資料，請重新整理 可以做成彈窗(錯誤,體驗,最後)
