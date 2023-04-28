import React from 'react'
import { IoCopyOutline } from 'react-icons/io5'

export default function CopyBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      className="bg-glass text-primary rounded-full p-2 w-[36px] h-[36px] hover:bg-primary hover:text-white hover:duration-500"
      onClick={onClick}
    >
      <IoCopyOutline className="text-xl" />
    </button>
  )
}
