import React from 'react'
import { MdModeEdit } from 'react-icons/md'

export default function EditBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      className="border border-black rounded-full p-2 w-[34px] h-[34px]"
      onClick={onClick}
    >
      <MdModeEdit />
    </button>
  )
}
