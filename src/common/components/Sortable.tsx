import React, { useState } from 'react'
import { ReactSortable } from 'react-sortablejs'

interface ItemType {
  id: number
  name: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Sortable() {
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
      className="flex flex-wrap max-lg:w-[828px] lg:-mb-6 md:-mb-6"
    >
      {state.map((item, index) => {
        let className =
          'max-lg:min-w-[180px] w-[calc(25%-30px)] lg:mr-10 md:mr-9 mb-6 cursor-pointer duration-150'
        if (index % 4 === 3) {
          className += ' !mr-0'
        }
        if ([4, 5, 6, 7].includes(index)) {
          className += ' max-lg:!mb-0'
        }
        return (
          <div key={item.id} className={className}>
            <img
              src={`https://picsum.photos/id/1${item.id}/600/600`}
              alt="slide 1"
            />
          </div>
        )
      })}
    </ReactSortable>
  )
}
