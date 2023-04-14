import React from 'react'

export default function TypeTag({ type }: { type: string }) {
  return (
    <div className="border border-primary-tint text-primary-tint px-3 py-2 rounded-full text-sm inline-block">
      {type}
    </div>
  )
}
