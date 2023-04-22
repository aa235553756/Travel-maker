import React, { ReactNode } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function SortableItem(props: { children: ReactNode; id: number }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id })

  const style = {
    // height: "100px",
    // background: "red",
    // border: "1px solid black",
    // margin: "12px",
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group w-1/4 z-0 bg-[#F7F7F7]  max-w-[180px] h-[180px] relative shadow mr-10 mb-6 [&:nth-child(4)]:!mr-0 [&:nth-child(8)]:!mr-0"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute  z-50 w-full h-[calc(100%-33px)] bottom-0"
      ></div>
      <div className="absolute w-[100px] h-[100px] border border-dashed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"></div>
      <div className="absolute animate-pulse top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-lg whitespace-nowrap text-black">
        拖曳景點至此
      </div>
      {props.children}
    </div>
  )
}
