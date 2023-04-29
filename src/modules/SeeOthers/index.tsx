import React, { useState } from 'react'
import { SeeOthersCard } from './SeeOthersCard'

interface Attraction {
  AttractionName: string
  Elong: number
  Nlat: number
}

interface Tour {
  TourId: number
  TourName: string
  ImageUrl: string
  Category: string
  Likes: number
  IsLike: boolean
  Attractions: Attraction[]
}

interface hotTourDataProps {
  hotTourData: Tour[]
}

export default function SeeOthers({
  hotTourData,
}: hotTourDataProps) {
  const tourData1 = hotTourData[0].Attractions
  const tourData2 = hotTourData[1].Attractions
  const tourData3 = hotTourData[2].Attractions
  const tourData4 = hotTourData[3].Attractions
  const [showMap, setShowMap] = useState(hotTourData[0].TourId)

  return (
    <div className="container lg:pb-[160px] pb-[80px]">
      <h3 className="text-[22px] mb-5 text-center font-bold md:mb-12 lg:text-4xl">
        看別人怎麼玩
      </h3>
      <div className="md:flex">
        {/* 這是地圖們 */}
        <div
          className={`bg-gray-E7 h-[324px] mb-6 order-1 flex-grow rounded-xl md:mb-0 md:h-auto ${
            showMap !== hotTourData[0].TourId && 'hidden'
          }`}
          id={hotTourData[0].TourId.toString()}
        >
          <iframe
            src={`https://www.google.com/maps/embed/v1/directions?key=${
              process.env.NEXT_PUBLIC_YANG_GOOGLE_KEY
            }&origin=${tourData1[0].AttractionName + ' 台北市'}&waypoints=${
              tourData1[1].AttractionName + ' 台北市'
            }|${tourData1[2].AttractionName + ' 台北市'}&destination=${
              tourData1[3].AttractionName + ' 台北市'
            }`}
            // &mode=${'walking'}
            className="w-full h-full min-h-[336px] lg:min-h-[576px] rounded-xl"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div
          className={`bg-gray-E7 h-[324px] mb-6 order-1 flex-grow rounded-xl md:mb-0 md:h-auto ${
            showMap !== hotTourData[1].TourId && 'hidden'
          }`}
          id={hotTourData[0].TourId.toString()}
        >
          <iframe
            src={`https://www.google.com/maps/embed/v1/directions?key=${
              process.env.NEXT_PUBLIC_YANG_GOOGLE_KEY
            }&origin=${tourData2[0].AttractionName + ' 台北市'}&waypoints=${
              tourData2[1].AttractionName + ' 台北市'
            }|${tourData2[2].AttractionName + ' 台北市'}&destination=${
              tourData2[3].AttractionName + ' 台北市'
            }`}
            // &mode=${'walking'}
            className="w-full h-full min-h-[336px] lg:min-h-[576px] rounded-xl"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div
          className={`bg-gray-E7 h-[324px] mb-6 order-1 flex-grow rounded-xl md:mb-0 md:h-auto ${
            showMap !== hotTourData[2].TourId && 'hidden'
          }`}
          id={hotTourData[0].TourId.toString()}
        >
          <iframe
            src={`https://www.google.com/maps/embed/v1/directions?key=${
              process.env.NEXT_PUBLIC_YANG_GOOGLE_KEY
            }&origin=${tourData3[0].AttractionName + ' 台北市'}&waypoints=${
              tourData3[1].AttractionName + ' 台北市'
            }|${tourData3[2].AttractionName + ' 台北市'}&destination=${
              tourData3[3].AttractionName + ' 台北市'
            }`}
            // &mode=${'walking'}
            className="w-full h-full min-h-[336px] lg:min-h-[576px] rounded-xl"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div
          className={`bg-gray-E7 h-[324px] mb-6 order-1 flex-grow rounded-xl md:mb-0 md:h-auto ${
            showMap !== hotTourData[3].TourId && 'hidden'
          }`}
          id={hotTourData[0].TourId.toString()}
        >
          <iframe
            src={`https://www.google.com/maps/embed/v1/directions?key=${
              process.env.NEXT_PUBLIC_YANG_GOOGLE_KEY
            }&origin=${tourData4[0].AttractionName + ' 台北市'}&waypoints=${
              tourData4[1].AttractionName + ' 台北市'
            }|${tourData4[2].AttractionName + ' 台北市'}&destination=${
              tourData4[3].AttractionName + ' 台北市'
            }`}
            // &mode=${'walking'}
            className="w-full h-full min-h-[336px] lg:min-h-[576px] rounded-xl"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* 這是別人行程卡片 */}
        <ul className="-mb-4 flex flex-wrap md:mr-6 md:max-w-[190px] lg:max-w-[360px]">
          {hotTourData.map((item, index) => {
            return (
              <SeeOthersCard
                TourName={item.TourName}
                Category={item.Category}
                Like={item.Likes}
                ImageUrl={item.ImageUrl}
                key={index}
                TourId={item.TourId}
                setShowMap={setShowMap}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}
