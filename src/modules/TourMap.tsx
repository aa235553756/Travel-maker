import { RoomAttractionsProp } from '@/util/types'
import React from 'react'
export default function TourMap({ data }: { data: RoomAttractionsProp[] }) {
  const newData = data.sort(
    (a: RoomAttractionsProp, b: RoomAttractionsProp) => a.Order - b.Order
  )

  const waypoint =
    newData.length >= 2
      ? '&waypoints=' +
        newData
          .filter((item: RoomAttractionsProp, i: number) => {
            if (i === 0 || i === newData.length - 1) {
              return false
            }
            return item.AttractionName
          })
          .map((item: RoomAttractionsProp) =>
            item.AttractionName.replace(/&/g, ' ')
          )
          .join(' 台北市|') +
        ' 台北市'
      : ''

  return (
    <div className="w-full h-full max-w-[840px] max-h-[312px] mb-12 bg-gray-D9  rounded-md">
      <iframe
        src={`https://www.google.com/maps/embed/v1/directions?key=${
          process.env.NEXT_PUBLIC_YANG_GOOGLE_KEY
        }&origin=${(newData[0]
          ? newData[0]?.AttractionName + ' 台北市'
          : '台北市'
        ).replace(/&/g, ' ')}${waypoint}&destination=${(newData[0]
          ? newData[newData.length - 1]?.AttractionName + ' 台北市'
          : '台北市'
        ).replace(/&/g, ' ')}`}
        // &mode=${'walking'}
        className="w-full h-full  rounded-md"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  )
}
