import RandomTourLayout from '@/modules/RandomTourLayout'
import { MoreTourProp, randomTourProp } from '@/util/types'
import React from 'react'

export interface randomTourIdProp {
  Attractions: randomTourProp[]
  TourId: number
  TourName: string
  UserGuid: string
}

export default function randomTourId({
  data,
  moreData,
}: {
  data: randomTourIdProp
  moreData: MoreTourProp[]
}) {
  // 同random-index
  console.log(moreData)

  return (
    <div>
      {!data.TourId ? '！錯誤，沒有此行程' : null}

      <RandomTourLayout
        moreData={moreData}
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
    const resMore = await fetch(
      'https://travelmaker.rocket-coding.com/api/tours/hot'
    )

    const resJSON = await res.json()
    const resMoreJSON = await resMore.json()

    if (res.ok && resMore.ok) {
      return {
        props: {
          data: resJSON,
          moreData: resMoreJSON,
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
