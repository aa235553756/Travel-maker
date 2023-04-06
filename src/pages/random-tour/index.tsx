import LazySortable from '@/common/components/LazySortable'
import MoreJourney from '@/modules/JourneyPage/MoreJourney'
import SelectSide from '@/modules/JourneyPage/SelectSide'
import { defaultValueProp, randomTourProp } from '@/util/types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsLink45Deg, BsHeart, BsPlusLg } from 'react-icons/bs'
import { getRandomTours, getShareTours, postTours } from '@/util/tourApi'
import { useRouter } from 'next/router'
import { defaultValues } from '@/util/selectData'

export default function RandomTourIndex({
  data: originData,
}: {
  data: randomTourProp[]
}) {
  const router = useRouter()
  console.log(router)

  console.log(originData)
  const [data, setData] = useState(originData)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, setValue, watch } = useForm<defaultValueProp>(
    { defaultValues: defaultValues }
  )
  const formId = 'random-tour-form'

  useEffect(() => {
    // alert('每次setData,重整google地圖')
  }, [data])

  return (
    <div className="container pt-20 pb-[160px]">
      {/* 景點名稱 */}
      <div>
        {/* 這個可以做成modal */}
        {data.length === 0 ? <h1>沒有匹配到景點資料，請重新整理</h1> : null}
        {/* {data?.map((item: { AttractionName: string }, index: number) => {
          return <h1 key={index}>{item.AttractionName}</h1>
        })} */}
      </div>

      <div className="flex mb-[180px]">
        {/* 篩選器及其按鈕 */}
        <div className="mr-6 hidden md:block">
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
        {/* 拖拉 */}
        <div className="flex flex-col">
          {/* 懶人行程連結 */}
          <div>
            <button
              className="flex px-2 items-center mb-3 text-xl border border-black rounded-md"
              onClick={handleLink}
            >
              <BsLink45Deg className="mr-2 text-2xl" />
              複製連結
            </button>
          </div>
          {/* 房間行程連結，應該兩邊都一樣 */}
          {/* <h2 className="flex items-center mb-3 text-xl font-bold">
            <BsLink45Deg className="mr-2 text-lg border w-[28px] h-[28px] rounded-md" />
            行程名稱：美食吃透透
          </h2> */}
          {/* 拖拉 */}
          <div className="mb-6 max-lg:overflow-x-scroll max-lg:mb-4">
            {loading ? (
              <div className="w-[840px] h-[180px] text-center text-2xl">
                正在幫您安排行程
              </div>
            ) : (
              <LazySortable data={data} />
            )}
          </div>
          {/* 地圖 */}
          <div className="mb-12 h-full bg-[#D7D7D7]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d14459.774055448219!2d121.49936893054726!3d25.035990943540952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x3442a94a4ed4888b%3A0x7880a95f29f4878e!2z5Zyw5bmz57ea5Z-65Zyw!3m2!1d25.0239646!2d121.5094846!4m5!1s0x3442a90e8737b2f7%3A0x6b6ee112e9e7c58b!2z5bCP5ZCz54mb6IKJ6bq1IDEwOOWPsOWMl-W4guiQrOiPr-WNgOa0m-mZveihlzQ1LTEx6Jmf!3m2!1d25.047628399999997!2d121.508326!5e0!3m2!1szh-TW!2stw!4v1680440395475!5m2!1szh-TW!2stw"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="ml-auto">
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
// 切換至其他頁 並回原頁面，要儲存Redux (體驗,重要)
// 手機版
// header
// 其他? 好像有點空??
// 房間版懶人行程

// ?其他
// ServerSideProp 錯誤後如何處理?? (錯誤,體驗,重要)
// 並且 表單紀錄也要儲存redux (體驗,最後)
// 沒有匹配到景點資料，請重新整理 可以做成彈窗(錯誤,體驗,最後)
