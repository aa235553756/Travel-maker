import React from 'react'
import { BsChevronDown } from 'react-icons/bs'
export default function OpenFormBtn({
  setIsHidden,
  isHidden,
}: {
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
  isHidden: boolean
}) {
  return (
    <button
      type="button"
      className="bg-[#d7d7d7] w-full px-5 py-4 mb-6 flex items-center justify-between md:hidden"
      onClick={() => {
        setIsHidden(!isHidden)
        // document.body.style.overflow = 'hidden'
      }}
    >
      請選擇行程 / 距離 / 區域
      <BsChevronDown />
    </button>
  )
}
