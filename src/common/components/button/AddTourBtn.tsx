import React from 'react'
import { MdAdd } from 'react-icons/md'

export default function AddTourBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      className="bg-glass text-primary rounded-full p-2 w-[36px] h-[36px] z-50"
      onClick={onClick}
    >
      <MdAdd className="text-xl" />
    </button>
  )
}
