import AttrCard from '@/common/components/card/AttrCard'
import React from 'react'

export default function HotAttract() {
  const hotAttr = [
    {
      guid: 446,
      attractName: '社子島迎星碼頭',
      district: '台北市士林區',
      rating: 4,
      imagesUrl: '/attr1.jpg',
      type: ['城市走走', '親子互動'],
    },
    {
      guid: 224,
      attractName: '南機場夜市',
      district: '台北市中正區',
      rating: 2,
      imagesUrl: '/attr2.jpg',
      type: ['夜間首選'],
    },
    {
      guid: 121,
      attractName: '五指山系_金面山親山步道',
      district: '台北市內湖區',
      rating: 4,
      imagesUrl: '/attr3.jpg',
      type: ['冒險活潑'],
    },
  ]
  return (
    <div>
      <div className="container">
        <div className="pb-[100px] lg:pb-[160px]">
          <h2 className="flex lg:text-[36px] font-bold text-[22px] mb-8 lg:mb-12 -ml-2 justify-center items-center">
            {/* <BsGeoAltFill className="text-xl mr-3" /> */}
            尚夯ㄟ景點
          </h2>
          <ul className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-8 lg:space-x-0 items-center justify-between cursor-pointer">
            {hotAttr.map((item, index) => {
              return (
                <div
                  key={index}
                  className="max-w-[328px] md:[&:nth-child(3)]:hidden lg:[&:nth-child(3)]:block"
                >
                  <AttrCard
                    id={item.guid}
                    attractName={item.attractName}
                    district={item.district}
                    rating={item.rating}
                    imagesUrl={item.imagesUrl}
                    type={item.type}
                  />
                </div>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
