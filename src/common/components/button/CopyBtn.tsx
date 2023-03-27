import React from 'react'
import { MdContentCopy } from 'react-icons/md'

export default function CopyBtn() {
  return (
    <button type="button" className="border border-black rounded-full p-2 w-[34px] h-[34px]">
      <MdContentCopy />
    </button>
  )
}
