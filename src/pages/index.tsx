import SeeOthers from '@/modules/SeeOthers'
import HotAttract from '@/modules/HotAttract'
import WhereIGO from '@/modules/WhereIGO'
import Explore from '@/modules/Explore'
import Feature from '@/modules/Feature'
import Banner from '@/modules/Banner'
import React, { useState } from 'react'
import CustomHead from '@/common/components/CustomHead'

interface AttractionDataProps {
  AttractionId: number
  AttractionName: string
  ImageUrl: string
}

interface TryDataProps {
  Category: string
  AttractionData: AttractionDataProps[]
}

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

interface AttractionDetails {
  IsCollect: boolean
  AttractionId: number
  AttractionName: string
  CityDistrict: string
  AverageScore: number
  Category: string[]
  ImageUrl: string
}

interface HotDataProps {
  Tours: Tour[]
  Attractions: AttractionDetails[]
}

export async function getStaticProps() {
  // 【API】試玩行程
  const resTryData = await fetch(
    `https://travelmaker.rocket-coding.com/api/tours/try`
  )
  const tryData = await resTryData.json()

  // 【API】首頁 - 取得熱門行程及熱門景點
  const resHotData = await fetch(
    `https://travelmaker.rocket-coding.com/api/tours/homepage`
  )
  const hotData = await resHotData.json()

  return {
    props: {
      tryData,
      hotData,
    },
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Home({
  tryData,
  hotData,
}: {
  tryData: TryDataProps
  hotData: HotDataProps
}) {
  // 試玩行程種類 state
  const [tryPlayCategoryData, setTryPlayCategoryData] = useState(
    tryData.Category
  )
  // 試玩行程景點 state
  const [tryPlayData, setTryPlayData] = useState(tryData.AttractionData)
  const [isLoading, setIsLoading] = useState(false)

  // 點擊換一組
  const handleTry = async () => {
    setIsLoading(true)

    const resTryData = await fetch(
      `https://travelmaker.rocket-coding.com/api/tours/try`
    )
    const newData = await resTryData.json()

    setTimeout(() => {
      if (resTryData.ok) {
        setTryPlayCategoryData(newData.Category)
        setTryPlayData(newData.AttractionData)
        setIsLoading(false)
      }
    }, 3000)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hotTourData, setHotTourData] = useState(hotData.Tours)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hotAttrData, setHotAttrData] = useState(hotData.Attractions)

  return (
    <>
      <CustomHead />
      <div>
        <Banner />
        <WhereIGO
          tryPlayCategoryData={tryPlayCategoryData}
          tryPlayData={tryPlayData}
          onClick={() => handleTry()}
          isLoading={isLoading}
        />
        <Feature />
        <Explore />
        {/* <SeeOthers TourName={''} CategoryId={0} Like={0} ImageUrl={''} /> */}
        <SeeOthers hotTourData={hotTourData} />
        <HotAttract hotAttrData={hotAttrData} />
      </div>
    </>
  )
}
