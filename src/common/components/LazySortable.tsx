import Image from 'next/image'
import React, { useState } from 'react'
import { ReactSortable } from 'react-sortablejs'

interface ItemType {
  id: number
  name: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Sortable({ data }) {
  const [state, setState] = useState<ItemType[]>([
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
    { id: 7, name: '7' },
    { id: 8, name: '8' },
  ])

  return (
    <ReactSortable
      list={state}
      setList={setState}
      // 這之後要換swiper請無視gap
      className="flex overflow-x-scroll max-w-[840px] max-lg:w-[828px] gap-x-10 md:gap-x-9 gap-y-6"
    >
      {state.map((item, index) => (
        <div
          key={item.id}
          className="min-w-[180px] w-[calc(25%-30px)] cursor-pointer duration-150 relative"
        >
          <div className="absolute bottom-2 left-1/2 translate-x-[-50%]  whitespace-nowrap text-white custohadow text-lg">
            {data[index]?.AttractionName}
          </div>
          <Image
            src={data[index]?.ImageUrl}
            alt="slide 1"
            width={180}
            height={180}
            className="object-cover w-full h-full "
          />
        </div>
      ))}
    </ReactSortable>
  )
}
