import React from 'react'
import { CategoryId as CategoryAry } from '@/util/selectData'
import { SeeOthersCard } from './SeeOthersCard'

interface SeeOthersProp {
  TourName: string
  CategoryId: number
  Like: number
  ImageUrl: string
}

export interface SeeOthersCardProp {
  TourName: string
  Category: string
  Like: number
  ImageUrl: string
}

const data = [
  {
    TourName: '進香團跟著走',
    CategoryId: 1,
    Like: 143,
    ImageUrl:
      'https://www.travel.taipei/content/images/attractions/282180/1024x768_attractions-image--rznjhetiuoqnzoyqppjgw.jpg',
  },
  {
    TourName: '進香團跟著走',
    CategoryId: 2,
    Like: 143,
    ImageUrl: 'https://www.travel.taipei/image/222058/?r=1637650550884',
  },
  {
    TourName: '進香團跟著走',
    CategoryId: 3,
    Like: 143,
    ImageUrl:
      'https://www.travel.taipei/content/images/attractions/64607/1024x768_attractions-image-jjmofe2wt0calhfnw2cfca.jpg',
  },
  {
    TourName: '進香團跟著走',
    CategoryId: 4,
    Like: 143,
    ImageUrl:
      'https://www.travel.taipei/content/images/attractions/282180/1024x768_attractions-image--rznjhetiuoqnzoyqppjgw.jpg',
  },
]

export default function SeeOthers({}: SeeOthersProp) {
  return (
    <div className="container pb-[80px]">
      <h3 className="text-[22px] mb-5 text-center font-bold md:mb-12 lg:text-4xl">
        看別人怎麼玩
      </h3>
      <div className="md:flex">
        {/* 這是地圖 */}
        <div className="bg-gray-E7 h-[324px] mb-6 order-1 flex-grow md:mb-0 md:h-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1872701.4985836851!2d120.6402133!3d23.546162!3m2!1i1024!2i768!4f13.1!5e0!3m2!1szh-TW!2stw!4v1680247548163!5m2!1szh-TW!2stw"
            allowFullScreen={true}
            loading="lazy"
            className="w-full h-full"
          ></iframe>
        </div>

        {/* 這是別人行程卡片 */}
        <ul className="-mb-4 flex flex-wrap md:mr-6 md:max-w-[190px] lg:max-w-[360px]">
          {data.map((item, index) => {
            return (
              <SeeOthersCard
                TourName={item.TourName}
                Category={CategoryAry[item.CategoryId].name}
                Like={item.Like}
                ImageUrl={item.ImageUrl}
                key={index}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}
