import React from 'react'
import { MdContentCopy } from 'react-icons/md'

export default function CopyBtn() {
  return (
    <button type="button" className="border border-black rounded-full p-2 w-[36px] h-[36px]">
      <MdContentCopy className='text-xl' />
    </button>
  )
}
