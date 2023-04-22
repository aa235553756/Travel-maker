import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { ReactNode } from 'react'
import { BsList } from 'react-icons/bs'

export default function Draggable(props: { children: ReactNode; id: number }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  })

  // Within your component that receives `transform` from `useDraggable`:
  const style = {
    transform: CSS.Translate.toString(transform),
  }
  // const style = transform ? {
  //   transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  // } : undefined;

  return (
    <button ref={setNodeRef} style={style}>
      {/* <button style={{ padding: '20px' }} >
        Drag handle
      </button> */}
      <div
        {...listeners}
        {...attributes}
        className="shadow absolute p-1 w-full text-white text-xl bottom-0 pb-1 left-[50%] -translate-x-[50%] z-20 hover:bg-white active:bg-white duration-200 group flex justify-center cursor-grab active:cursor-grabbing"
      >
        <BsList className="group-hover:text-black" />
      </div>
      {props.children}
    </button>
  )
}
