import React from 'react'
import { IoShareSocialSharp } from 'react-icons/io5'

export default function ShareBtn() {
  return (
    <button type="button" className="border border-black rounded-full p-2 w-[34px] h-[34px]">
      <IoShareSocialSharp />
    </button>
  )
}