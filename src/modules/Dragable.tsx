import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { ReactNode } from 'react'

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
    <button ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {/* <button style={{ padding: '20px' }} >
        Drag handle
      </button> */}
      {props.children}
    </button>
  )
}
