import React from 'react'
import { BsTrash } from 'react-icons/bs'

export default function DeleteBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      className="bg-glass text-primary rounded-full p-2 w-[36px] h-[36px]"
      onClick={onClick}
    >
      <BsTrash className='text-xl' />
    </button>
  )
} 
