import React from 'react'
import { MdModeEdit } from 'react-icons/md'

export default function EditBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      className="text-primary border border-primary rounded-full p-2 w-[36px] h-[36px]"
      onClick={onClick}
    >
      <MdModeEdit className='text-xl' />
    </button>
  )
}
