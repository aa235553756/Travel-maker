import React, { useEffect } from 'react'
import { getRandomTours, getShareTours } from '@/util/tourApi'
import RandamTourLayout from '@/modules/RandomTourLayout'
import { MoreTourProp, randomTourProp } from '@/util/types'
import { saveTours } from '@/redux/randomTourSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getIsQuery, setIsQuery } from '@/redux/isQuerySlice'
import CustomHead from '@/common/components/CustomHead'

export default function RandamTour({
  data,
  isLink,
  moreData,
}: {
  data: randomTourProp[]
  isLink?: boolean
  moreData: MoreTourProp[]
}) {
  const dispatch = useDispatch()
  const isQuery = useSelector(getIsQuery)

  useEffect(() => {
    if (isQuery || isLink) {
      //===設定什麼時候要設置true 只有從Ｂanner過來的時候,或其他間接會回到這頁===
      dispatch(saveTours(data))
      dispatch(setIsQuery(false))
    }
  }, [])

  return (
    <>
      <CustomHead
        title={'Travel Maker | 規劃行程'}
        h1={'還在為了聚會行程煩惱嗎？ Travel Maker 五秒鐘搞定行程！'}
        description={'你的朋友分享了一個新行程'}
      />
      <div>
        <RandamTourLayout data={data} moreData={moreData} />
      </div>
    </>
  )
}

export async function getServerSideProps(context: {
  query: { data: string; id: number[] }
}) {
  try {
    const resMore = await fetch(
      'https://travelmaker.rocket-coding.com/api/tours/hot/0'
    )
    // 由首頁送來表單data
    if (context.query.hasOwnProperty('data')) {
      const data = JSON.parse(context.query.data)
      const res = await getRandomTours(data)

      if (res.ok && resMore.ok) {
        const resMoreJSON = await resMore.json()
        const resJSON = await res.json()
        return {
          props: {
            data: resJSON,
            moreData: resMoreJSON,
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
      if (res.ok && resMore.ok) {
        const resMoreJSON = await resMore.json()
        const resJSON = await res.json()
        return {
          props: {
            data: resJSON,
            isLink: true,
            moreData: resMoreJSON,
          },
        }
      }
    }
    throw new Error('不知名錯誤')
  } catch (err) {
    const resMore = await fetch(
      'https://travelmaker.rocket-coding.com/api/tours/hot/0'
    )
    const resMoreJSON = await resMore.json()
    return {
      props: {
        data: Array(8)
          .fill('')
          .map(() => {
            return {
              ImageUrl: '/blurLogo.png',
              AttractionName: '',
            }
          }),
        moreData: resMoreJSON,
      },
    }
  }
}
