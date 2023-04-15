import React from 'react'
import { getRandomTours, getShareTours } from '@/util/tourApi'
import RandamTourLayout from '@/modules/RandomTourLayout'
import { randomTourProp } from '@/util/types'

export default function RandamTour({ data }: { data: randomTourProp[] }) {
  return (
    <div>
      <RandamTourLayout data={data} />
    </div>
  )
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
        data: Array(8)
          .fill('')
          .map(() => {
            return {
              ImageUrl:
                'https://fakeimg.pl/200x100/?retina=1&text=示範圖&font=noto',
              AttractionName: '景點名稱',
            }
          }),
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
