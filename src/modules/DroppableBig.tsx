import { useDroppable } from '@dnd-kit/core'
import { ReactNode } from 'react'

export default function DroppableBig(props: {
  children: ReactNode
  id: number
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  })

  const style = {
    // 單個
    color: isOver ? 'green' : undefined,
    // 整個
    // color: over ? "green" : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className=" w-full h-full relative shadow mr-10 mb-6 [&:nth-child(5)]:!mr-0 [&:nth-child(10)]:!mr-0 [&:nth-child(15)]:!mr-0"
    >
      {props.children}
    </div>
  )
}
