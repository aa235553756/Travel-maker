import React from 'react'
import { MdAdd } from 'react-icons/md'

export default function AddTourBtn() {
  return (
    <button
      type="button"
      className="border border-black rounded-full p-2 w-[34px] h-[34px]"
    >
      <MdAdd />
    </button>
  )
}
