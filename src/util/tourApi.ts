import { geoDefaultValueProp } from "@/util/types"

export function getRandomTours(data: geoDefaultValueProp | undefined) {
  return fetch(
    'https://travelmaker.rocket-coding.com/api/tours/make',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )
}

export function getShareTours(data: string) {
  return fetch(
    `https://travelmaker.rocket-coding.com/api/tours/share?${data}`
  )
}

export function postTours(token: string, TourName: string, AttractionId: number[]) {
  return fetch(
    'https://travelmaker.rocket-coding.com/api/tours',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        TourName,
        AttractionId
      }),
    }
  )
}

