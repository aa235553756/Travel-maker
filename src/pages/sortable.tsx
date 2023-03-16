import React, { FC, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'

interface ItemType {
  id: number
  name: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BasicFunction: FC = (props) => {
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
    <div className="container">
      <ReactSortable
        list={state}
        setList={setState}
        className="flex flex-wrap gap-5"
      >
        {state.map((item) => (
          <div key={item.id} className="w-[20%] cursor-pointer duration-150">
            <img
              src={`https://picsum.photos/id/10${item.id}/600/600`}
              alt="slide 1"
            />
          </div>
        ))}
      </ReactSortable>
    </div>
  )
}
export default BasicFunction
