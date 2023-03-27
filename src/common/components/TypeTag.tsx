import React from 'react'

export default function TypeTag({ type }: { type: string }) {
  return (
    <div className="bg-[#ccc] px-5 py-2 rounded-full text-sm inline-block">
      {type}
    </div>
  )
}
