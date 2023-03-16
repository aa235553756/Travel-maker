import React from 'react'
import { BsLink45Deg } from 'react-icons/bs'

export default function copyLinkButton() {
  return (
    <div>
      <button className="py-[0.5px] px-1 mb-3 flex items-center border border-black text-[#737373]">
        <BsLink45Deg className="text-lg mr-2" />
        複製連結
      </button>
    </div>
  )
}
