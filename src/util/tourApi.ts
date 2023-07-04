import { geoDefaultValueProp } from "@/util/types"

export function getRandomTours(data: geoDefaultValueProp | undefined) {
  return fetch(
    `${process.env.NEXT_PUBLIC_baseUrl}/tours/make`,
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
    `${process.env.NEXT_PUBLIC_baseUrl}/tours/share?${data}`
  )
}

export function postTours(token: string, TourName: string, AttractionId: number[]) {
  return fetch(
    `${process.env.NEXT_PUBLIC_baseUrl}/tours`,
    {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        TourName,
        AttractionId
      }),
    }
  )
}

export function postModifyTour(
  TourId: number,
  token: string,
  TourName: string,
  AttractionId: number[]
) {
  return fetch(
    `${process.env.NEXT_PUBLIC_baseUrl}/tours/${TourId}/modify`,
    {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        TourName,
        AttractionId,
      }),
    }
  )
}

export function postRoomApi(token: string, RoomName: string, Attractions: number[]) {
  return fetch(
    `${process.env.NEXT_PUBLIC_baseUrl}/rooms`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        RoomName,
        Attractions
      }),
    }
  )
}