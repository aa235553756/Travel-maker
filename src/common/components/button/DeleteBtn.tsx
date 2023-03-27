import React from 'react'
import { BsTrash } from 'react-icons/bs'

export default function DeleteBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      className="border border-black rounded-full p-2 w-[34px] h-[34px]"
      onClick={onClick}
    >
      <BsTrash />
    </button>
  )
}
