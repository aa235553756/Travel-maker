import React from 'react'
import { IoShareSocialSharp } from 'react-icons/io5'

export default function ShareBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      className="bg-glass text-primary rounded-full p-2 w-[36px] h-[36px]"
      onClick={onClick}
    >
      <IoShareSocialSharp className="text-xl" />
    </button>
  )
}
