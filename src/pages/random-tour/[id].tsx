import RandomTourLayout from '@/modules/RandomTourLayout'
import { randomTourProp } from '@/util/types'
import React from 'react'

export interface randomTourIdProp {
  Attractions: randomTourProp[]
  TourId: number
  TourName: string
  UserGuid: string
}

export default function randomTourId({ data }: { data: randomTourIdProp }) {
  // data
  console.log(data)

  // 同random-index
  return (
    <div>
      {!data.TourId ? '！錯誤，沒有此行程' : null}

      <RandomTourLayout
        data={data.Attractions}
        IsTourId
        TourName={data.TourName}
        TourId={data.TourId}
        UserGuid={data.UserGuid}
      />
    </div>
  )
}

export async function getServerSideProps(context: { query: { id: number } }) {
  try {
    const { id } = context.query
    const res = await fetch(
      `https://travelmaker.rocket-coding.com/api/tours/${id}`
    )
    const resJSON = await res.json()
    if (res.ok) {
      return {
        props: {
          data: resJSON,
        },
      }
    }
    throw new Error('不知名錯誤')
  } catch (err) {
    return {
      props: {
        data: {},
      },
    }
  }
}

// todo
// 更改行程名稱
// 儲存後 詢問要新建or取代
